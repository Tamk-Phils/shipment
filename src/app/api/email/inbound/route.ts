import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { supabase } from "@/lib/supabase";
import { buildThreadReplyAddress, extractThreadIdFromReplyAddress } from "@/lib/email";

function cleanMessageText(text?: string, html?: string): string {
    if (text && text.trim().length > 0) {
        return text.trim();
    }
    if (html && html.trim().length > 0) {
        return html
            .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
            .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
            .replace(/<[^>]+>/g, " ")
            .replace(/\s+/g, " ")
            .trim();
    }
    return "(No content)";
}

export async function POST(request: NextRequest) {
    try {
        const expectedSecret = process.env.EMAIL_INBOUND_WEBHOOK_SECRET;
        if (expectedSecret) {
            const incomingSecret = request.headers.get("x-inbound-email-secret") || "";
            if (incomingSecret !== expectedSecret) {
                console.warn("[Inbound Email] Unauthorized request: secret mismatch");
                return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
            }
        }

        const payload = await request.json();
        const replyTo = String(payload.reply_to || payload.replyTo || payload.recipient || payload.to || "");
        let threadId = String(payload.thread_id || payload.threadId || extractThreadIdFromReplyAddress(replyTo) || "");

        const senderEmail = String(
            payload.from_email || payload.fromEmail || payload.sender_email || payload.senderEmail || ""
        ).trim();

        if (!senderEmail) {
            console.warn("[Inbound Email] Missing sender email address in payload");
            return NextResponse.json({ success: false, error: "Missing sender email address" }, { status: 400 });
        }

        const senderName = String(
            payload.from_name || payload.fromName || payload.sender_name || payload.senderName || senderEmail.split("@")[0] || "Customer"
        ).trim();

        const subject = String(payload.subject || "Customer Inquiry").trim();
        const content = cleanMessageText(payload.text || payload.message || payload.content, payload.html);
        const now = new Date().toISOString();

        let targetThread: {
            id: string;
            sender_name: string | null;
            sender_email: string;
            recipient_name: string | null;
            recipient_email: string;
            subject: string;
            reply_to: string;
        } | null = null;

        // 1. Try finding existing thread by threadId if provided
        if (threadId) {
            const { data: foundById, error: idError } = await supabase
                .from("email_threads")
                .select("id, sender_name, sender_email, recipient_name, recipient_email, subject, reply_to")
                .eq("id", threadId)
                .maybeSingle();

            if (!idError && foundById) {
                targetThread = foundById;
            }
        }

        // 2. If thread not found by ID, look for an active conversation with this customer
        if (!targetThread) {
            const { data: foundByEmail, error: emailError } = await supabase
                .from("email_threads")
                .select("id, sender_name, sender_email, recipient_name, recipient_email, subject, reply_to")
                .or(`recipient_email.ilike.${senderEmail},sender_email.ilike.${senderEmail}`)
                .order("updated_at", { ascending: false })
                .limit(1)
                .maybeSingle();

            if (!emailError && foundByEmail) {
                targetThread = foundByEmail;
                threadId = foundByEmail.id;
            }
        }

        // 3. If still no thread exists, automatically create a new thread for this incoming message
        let createdNewThread = false;
        if (!targetThread) {
            const newThreadId = randomUUID();
            const replyAddress = process.env.FROM_EMAIL || "support@globalnexustracker.com";
            const systemSenderEmail = process.env.FROM_EMAIL || "support@globalnexustracker.com";
            const systemSenderName = process.env.FROM_NAME || "Global Nexus Tracker Support";

            const newThreadRecord = {
                id: newThreadId,
                recipient_name: senderName,
                recipient_email: senderEmail,
                sender_name: systemSenderName,
                sender_email: systemSenderEmail,
                subject: subject,
                reply_to: replyAddress,
                last_message: content,
                status: "open",
                created_at: now,
                updated_at: now,
            };

            const { error: insertThreadError } = await supabase
                .from("email_threads")
                .insert(newThreadRecord);

            if (insertThreadError) {
                console.error("[Inbound Email] Failed to create email thread:", insertThreadError.message);
                return NextResponse.json({ success: false, error: insertThreadError.message }, { status: 500 });
            }

            targetThread = newThreadRecord;
            threadId = newThreadId;
            createdNewThread = true;
        }

        // 4. Record the inbound message
        const { error: messageError } = await supabase.from("email_messages").insert({
            id: randomUUID(),
            thread_id: targetThread.id,
            direction: "inbound",
            sender_name: senderName,
            sender_email: senderEmail,
            recipient_name: targetThread.sender_name,
            recipient_email: targetThread.sender_email,
            subject,
            content,
            created_at: now,
        });

        if (messageError) {
            console.error("[Inbound Email] Failed to insert email message:", messageError.message);
            return NextResponse.json({ success: false, error: messageError.message }, { status: 500 });
        }

        // 5. Update thread status and timestamp
        await supabase
            .from("email_threads")
            .update({
                last_message: content,
                updated_at: now,
                status: "open",
            })
            .eq("id", targetThread.id);

        return NextResponse.json({
            success: true,
            threadId: targetThread.id,
            createdNewThread,
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Internal server error";
        console.error("[Inbound Email] Unexpected handler error:", errorMessage);
        return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
    }
}