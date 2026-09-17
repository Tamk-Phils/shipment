// @ts-nocheck
import PostalMime from "postal-mime";

export interface Env {
    INBOUND_WEBHOOK_URL: string;
    INBOUND_WEBHOOK_SECRET: string;
}

type InboundAttachment = {
    filename: string;
    mimeType: string;
    size?: number;
    disposition?: string;
    data: string; // base64
};

type InboundEmailPayload = {
    threadId?: string;
    replyTo: string;
    fromName: string;
    fromEmail: string;
    subject: string;
    text: string;
    html?: string;
    messageId?: string;
    attachments?: InboundAttachment[];
};

const extractThreadId = (address: string) => {
    if (!address) return "";
    const match = address.match(/^[^+@]+\+([a-f0-9-]{8,})@/i);
    return match?.[1] || "";
};

export default {
    async email(message: ForwardableEmailMessage, env: Env): Promise<void> {
        try {
            console.log(`[Email Worker] Processing email from ${message.from} to ${message.to}`);

            const parsed = await PostalMime.parse(message.raw);
            const subject = parsed.subject || message.headers.get("subject") || "Customer Inquiry";
            const replyTo = message.to;
            const fromEmail = parsed.from?.address || message.from;
            const fromName = parsed.from?.name || parsed.from?.address || message.headers.get("from") || "Customer";

            // Attempt to locate a thread identifier in the envelope recipient or header recipients
            const threadId =
                extractThreadId(replyTo) ||
                extractThreadId(message.headers.get("to") || "") ||
                extractThreadId(message.headers.get("delivered-to") || "") ||
                "";

            // Parse and convert attachments to base64
            const attachments: InboundAttachment[] = [];
            let totalAttachmentSize = 0;
            const MAX_TOTAL_ATTACHMENT_SIZE = 3.5 * 1024 * 1024; // 3.5 MB safety limit for serverless payloads

            if (Array.isArray(parsed.attachments)) {
                for (const att of parsed.attachments) {
                    try {
                        if (!att || !att.content) continue;
                        const byteLength = att.content.byteLength || 0;
                        if (totalAttachmentSize + byteLength > MAX_TOTAL_ATTACHMENT_SIZE) {
                            console.warn(`[Email Worker] Skipping attachment ${att.filename || "file"} (size: ${byteLength}) to stay under payload limit`);
                            continue;
                        }
                        const base64Data = Buffer.from(att.content).toString("base64");
                        attachments.push({
                            filename: att.filename || "attachment",
                            mimeType: att.mimeType || "application/octet-stream",
                            size: byteLength,
                            disposition: att.disposition || "attachment",
                            data: base64Data,
                        });
                        totalAttachmentSize += byteLength;
                    } catch (attErr) {
                        console.error("[Email Worker] Error processing attachment:", attErr);
                    }
                }
            }

            console.log(`[Email Worker] Extracted ${attachments.length} attachment(s)`);

            const payload: InboundEmailPayload = {
                threadId: threadId || undefined,
                replyTo,
                fromName,
                fromEmail,
                subject,
                text: parsed.text || "",
                html: parsed.html || undefined,
                messageId: message.headers.get("message-id") || undefined,
                attachments: attachments.length > 0 ? attachments : undefined,
            };

            const webhookUrl = env.INBOUND_WEBHOOK_URL || "https://www.globalnexustracker.com/api/email/inbound";
            console.log(`[Email Worker] Forwarding to webhook: ${webhookUrl}`);

            const response = await fetch(webhookUrl, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    ...(env.INBOUND_WEBHOOK_SECRET ? { "x-inbound-email-secret": env.INBOUND_WEBHOOK_SECRET } : {}),
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`[Email Worker] Inbound webhook rejected (${response.status}): ${errorText}`);
                throw new Error(`Inbound webhook failed: ${response.status} ${errorText}`);
            }

            const result = await response.json();
            console.log("[Email Worker] Inbound email processed successfully:", result);
        } catch (err) {
            console.error("[Email Worker] Fatal error processing email:", err);
            throw err;
        }
    },
} satisfies ExportedHandler<Env>;