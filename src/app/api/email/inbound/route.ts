import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { supabase } from "@/lib/supabase";
import { extractThreadIdFromReplyAddress } from "@/lib/email";

export async function POST(request: NextRequest) {
    try {
        const expectedSecret = process.env.EMAIL_INBOUND_WEBHOOK_SECRET;
        if (expectedSecret) {
            const incomingSecret = request.headers.get("x-inbound-email-secret") || "";
            if (incomingSecret !== expectedSecret) {
                return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
            }
        }

        const payload = await request.json();
        const replyTo = String(payload.reply_to || payload.replyTo || payload.recipient || payload.to || "");
        const threadId = String(payload.thread_id || payload.threadId || extractThreadIdFromReplyAddress(replyTo) || "");

        if (!threadId) {
            return NextResponse.json({ success: false, error: "Missing thread identifier" }, { status: 400 });
        }

        const senderName = String(payload.from_name || payload.fromName || payload.sender_name || payload.senderName || "Customer");
        const senderEmail = String(payload.from_email || payload.fromEmail || payload.sender_email || payload.senderEmail || "");
        const subject = String(payload.subject || "Re: Direct Message");
        const content = String(payload.text || payload.message || payload.content || "");

        const { data: thread, error: threadError } = await supabase
            .from("email_threads")
            .select("*")
            .eq("id", threadId)
            .single();

        if (threadError || !thread) {
            return NextResponse.json({ success: true, ignored: true });
        }

        const now = new Date().toISOString();

        const { error: messageError } = await supabase.from("email_messages").insert({
            id: randomUUID(),
            thread_id: threadId,
            direction: "inbound",
            sender_name: senderName,
            sender_email: senderEmail,
            recipient_name: thread.sender_name,
            recipient_email: thread.sender_email,
            subject,
            content,
            created_at: now,
        });

        if (messageError) {
            return NextResponse.json({ success: false, error: messageError.message }, { status: 500 });
        }

        const { error: updateError } = await supabase
            .from("email_threads")
            .update({
                last_message: content,
                updated_at: now,
                status: "open",
            })
            .eq("id", threadId);

        if (updateError) {
            return NextResponse.json({ success: true, ignored: true });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Invalid inbound payload";
        return NextResponse.json({ success: true, ignored: true, warning: message });
    }
}