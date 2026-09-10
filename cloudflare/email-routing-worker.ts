import PostalMime from "postal-mime";

export interface Env {
    INBOUND_WEBHOOK_URL: string;
    INBOUND_WEBHOOK_SECRET: string;
}

type InboundEmailPayload = {
    threadId: string;
    replyTo: string;
    fromName: string;
    fromEmail: string;
    subject: string;
    text: string;
    html?: string;
    messageId?: string;
};

const extractThreadId = (replyTo: string) => {
    const match = replyTo.match(/^[^+@]+\+([a-f0-9-]{8,})@/i);
    return match?.[1] || "";
};

export default {
    async email(message: ForwardableEmailMessage, env: Env): Promise<void> {
        const parsed = await PostalMime.parse(message.raw);
        const subject = parsed.subject || message.headers.get("subject") || "Re: Direct Message";
        const replyTo = message.to;
        const fromEmail = message.from;
        const fromName = parsed.from?.name || parsed.from?.address || message.headers.get("from") || "Customer";
        const threadId = extractThreadId(replyTo);

        if (!threadId) {
            message.setReject("Missing thread identifier");
            return;
        }

        const payload: InboundEmailPayload = {
            threadId,
            replyTo,
            fromName,
            fromEmail,
            subject,
            text: parsed.text || parsed.html || "",
            html: parsed.html || undefined,
            messageId: message.headers.get("message-id") || undefined,
        };

        const response = await fetch(env.INBOUND_WEBHOOK_URL, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "x-inbound-email-secret": env.INBOUND_WEBHOOK_SECRET,
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Inbound webhook failed: ${response.status} ${errorText}`);
        }
    },
} satisfies ExportedHandler<Env>;