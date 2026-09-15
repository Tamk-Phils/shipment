"use server";

import { randomUUID } from "crypto";
import { supabase } from "@/lib/supabase";
import { buildThreadReplyAddress, sendDirectEmail, sendShipmentCreatedEmail, sendShipmentUpdateEmail } from "@/lib/email";

type DirectEmailSuccess = {
    success: true;
    threadId: string;
    replyTo: string;
};

type DirectEmailFailure = {
    success: false;
    error: string | unknown;
};

type DirectEmailResult = DirectEmailSuccess | DirectEmailFailure;

type DirectEmailThread = {
    id: string;
    recipient_name: string | null;
    recipient_email: string;
    sender_name: string | null;
    sender_email: string;
    subject: string;
    reply_to: string;
    last_message: string | null;
    status: string;
};

const persistEmailThread = async (thread: DirectEmailThread, content: string) => {
    const now = new Date().toISOString();

    const { error: threadError } = await supabase.from("email_threads").upsert({
        ...thread,
        created_at: now,
        updated_at: now,
        last_message: content,
        status: thread.status || "open",
    });

    if (threadError) {
        console.warn("Failed to persist email thread:", threadError.message);
        return;
    }

    const { error: messageError } = await supabase.from("email_messages").insert({
        id: randomUUID(),
        thread_id: thread.id,
        direction: "outbound",
        sender_name: thread.sender_name || "Global Nexus Tracker",
        sender_email: thread.sender_email,
        recipient_name: thread.recipient_name,
        recipient_email: thread.recipient_email,
        subject: thread.subject,
        content,
        created_at: now,
    });

    if (messageError) {
        console.warn("Failed to persist outbound email message:", messageError.message);
    }
};

export async function notifyShipmentCreated(params: {
    to: string;
    subject: string;
    trackingNumber: string;
    senderName: string;
    recipientName: string;
    origin: string;
    destination: string;
}) {
    if (!process.env.RESEND_API_KEY) {
        console.warn("Email notification skipped: RESEND_API_KEY credentials not configured");
        return { success: false, error: "RESEND_API_KEY not configured" };
    }
    return await sendShipmentCreatedEmail(params);
}

export async function notifyShipmentUpdate(params: {
    to: string;
    subject: string;
    trackingNumber: string;
    recipientName: string;
    newStatus: string;
    location: string;
    description: string;
}) {
    if (!process.env.RESEND_API_KEY) {
        console.warn("Email notification skipped: RESEND_API_KEY credentials not configured");
        return { success: false, error: "RESEND_API_KEY not configured" };
    }
    return await sendShipmentUpdateEmail(params);
}

export async function notifyDirectEmail(params: {
    to: string;
    subject: string;
    message: string;
    recipientName?: string;
    senderName?: string;
}): Promise<DirectEmailResult> {
    if (!process.env.RESEND_API_KEY) {
        console.warn("Email notification skipped: RESEND_API_KEY credentials not configured");
        return { success: false, error: "RESEND_API_KEY not configured" };
    }

    const threadId = randomUUID();
    const supportEmail = process.env.FROM_EMAIL || "support@globalnexustracker.com";
    const result = await sendDirectEmail({ ...params, replyTo: supportEmail });

    if (result.success) {
        await persistEmailThread(
            {
                id: threadId,
                recipient_name: params.recipientName || null,
                recipient_email: params.to,
                sender_name: params.senderName || "Global Nexus Tracker",
                sender_email: supportEmail,
                subject: params.subject,
                reply_to: supportEmail,
                last_message: params.message,
                status: "open",
            },
            params.message
        );
    }

    if (!result.success) {
        return { success: false, error: result.error };
    }

    return { success: true, threadId, replyTo: supportEmail };
}

export async function replyToEmailThread(params: {
    threadId: string;
    message: string;
}) {
    if (!process.env.RESEND_API_KEY) {
        console.warn("Email notification skipped: RESEND_API_KEY credentials not configured");
        return { success: false, error: "RESEND_API_KEY not configured" };
    }

    const { data: thread, error: threadError } = await supabase
        .from("email_threads")
        .select("*")
        .eq("id", params.threadId)
        .single();

    if (threadError || !thread) {
        return { success: false, error: threadError?.message || "Email thread not found" };
    }

    const supportEmail = process.env.FROM_EMAIL || "support@globalnexustracker.com";
    const result = await sendDirectEmail({
        to: thread.recipient_email,
        subject: thread.subject.startsWith("Re:") ? thread.subject : `Re: ${thread.subject}`,
        message: params.message,
        recipientName: thread.recipient_name || thread.recipient_email,
        senderName: thread.sender_name || "Global Nexus Tracker",
        replyTo: supportEmail,
    });

    if (result.success) {
        const now = new Date().toISOString();
        await supabase.from("email_messages").insert({
            id: randomUUID(),
            thread_id: params.threadId,
            direction: "outbound",
            sender_name: thread.sender_name || "Global Nexus Tracker",
            sender_email: thread.sender_email || (process.env.FROM_EMAIL || "support@globalnexustracker.com"),
            recipient_name: thread.recipient_name || null,
            recipient_email: thread.recipient_email,
            subject: thread.subject,
            content: params.message,
            created_at: now,
        });

        await supabase
            .from("email_threads")
            .update({
                last_message: params.message,
                updated_at: now,
                status: "open",
            })
            .eq("id", params.threadId);
    }

    return result.success ? result : { success: false, error: result.error };
}
