"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Inbox, Loader2, Mail, Search, Send, MessageSquare, RefreshCw, ChevronLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { EmailMessage, EmailThread } from "@/types";
import { notifyDirectEmail, replyToEmailThread } from "@/app/actions/email";

export default function EmailInboxPage() {
    const EMAIL_THREADS_KEY = "nexustrack_email_threads";
    const EMAIL_MESSAGES_KEY = "nexustrack_email_messages";

    const [threads, setThreads] = useState<EmailThread[]>([]);
    const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
    const [messages, setMessages] = useState<EmailMessage[]>([]);
    const [isLoadingThreads, setIsLoadingThreads] = useState(true);
    const [isLoadingMessages, setIsLoadingMessages] = useState(false);
    const [composeEmail, setComposeEmail] = useState("");
    const [composeName, setComposeName] = useState("");
    const [composeSubject, setComposeSubject] = useState("");
    const [composeMessage, setComposeMessage] = useState("");
    const [replyMessage, setReplyMessage] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const readLocalThreads = () => {
        if (typeof window === "undefined") return [] as EmailThread[];
        const saved = window.localStorage.getItem(EMAIL_THREADS_KEY);
        return saved ? (JSON.parse(saved) as EmailThread[]) : [];
    };

    const readLocalMessages = (threadId: string) => {
        if (typeof window === "undefined") return [] as EmailMessage[];
        const saved = window.localStorage.getItem(EMAIL_MESSAGES_KEY);
        const allMessages = saved ? (JSON.parse(saved) as EmailMessage[]) : [];
        return allMessages.filter((message) => message.thread_id === threadId);
    };

    const saveLocalThread = (thread: EmailThread) => {
        if (typeof window === "undefined") return;
        const nextThreads = [thread, ...readLocalThreads().filter((item) => item.id !== thread.id)];
        window.localStorage.setItem(EMAIL_THREADS_KEY, JSON.stringify(nextThreads));
    };

    const saveLocalMessage = (message: EmailMessage) => {
        if (typeof window === "undefined") return;
        const saved = window.localStorage.getItem(EMAIL_MESSAGES_KEY);
        const allMessages = saved ? (JSON.parse(saved) as EmailMessage[]) : [];
        const nextMessages = [message, ...allMessages.filter((item) => item.id !== message.id)];
        window.localStorage.setItem(EMAIL_MESSAGES_KEY, JSON.stringify(nextMessages));
    };

    const selectedThread = threads.find((thread) => thread.id === selectedThreadId) || null;

    const loadThreads = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from("email_threads")
                .select("*")
                .order("updated_at", { ascending: false });

            if (error) throw error;

            if (data) {
                setThreads(data);
                if (!selectedThreadId && data.length > 0) {
                    setSelectedThreadId(data[0].id);
                }
                setIsLoadingThreads(false);
                return;
            }
        } catch {
            const localThreads = readLocalThreads();
            setThreads(localThreads);
            if (!selectedThreadId && localThreads.length > 0) {
                setSelectedThreadId(localThreads[0].id);
            }
        }

        setIsLoadingThreads(false);
    }, [selectedThreadId]);

    const loadMessages = useCallback(async (threadId: string) => {
        setIsLoadingMessages(true);
        try {
            const { data, error } = await supabase
                .from("email_messages")
                .select("*")
                .eq("thread_id", threadId)
                .order("created_at", { ascending: true });

            if (error) throw error;

            if (data) {
                setMessages(data);
                setIsLoadingMessages(false);
                return;
            }
        } catch {
            setMessages(readLocalMessages(threadId));
        }

        setIsLoadingMessages(false);
    }, []);

    useEffect(() => {
        loadThreads();

        const channel = supabase
            .channel("email-threads")
            .on("postgres_changes", { event: "*", schema: "public", table: "email_threads" }, () => loadThreads())
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [loadThreads]);

    useEffect(() => {
        if (!selectedThreadId) return;

        loadMessages(selectedThreadId);

        const channel = supabase
            .channel(`email-thread-${selectedThreadId}`)
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "email_messages", filter: `thread_id=eq.${selectedThreadId}` },
                () => loadMessages(selectedThreadId)
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [selectedThreadId, loadMessages]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleNewEmail = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!composeEmail.trim() || !composeSubject.trim() || !composeMessage.trim()) return;

        setIsSending(true);
        setStatusMessage(null);

        try {
            const result = await notifyDirectEmail({
                to: composeEmail.trim(),
                subject: composeSubject.trim(),
                message: composeMessage.trim(),
                recipientName: composeName.trim() || undefined,
                senderName: "Global Nexus Tracker Support"
            });

            if (!result.success) {
                throw new Error(typeof result.error === "string" ? result.error : "Failed to send email");
            }

            saveLocalThread({
                id: result.threadId,
                recipient_name: composeName.trim() || null,
                recipient_email: composeEmail.trim(),
                sender_name: "Global Nexus Tracker Support",
                sender_email: "support@globalnexustracker.com",
                subject: composeSubject.trim(),
                reply_to: result.replyTo,
                last_message: composeMessage.trim(),
                status: "open",
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            });

            saveLocalMessage({
                id: crypto.randomUUID(),
                thread_id: result.threadId,
                direction: "outbound",
                sender_name: "Global Nexus Tracker Support",
                sender_email: "support@globalnexustracker.com",
                recipient_name: composeName.trim() || null,
                recipient_email: composeEmail.trim(),
                subject: composeSubject.trim(),
                content: composeMessage.trim(),
                created_at: new Date().toISOString(),
            });

            setStatusMessage(`Email sent successfully to ${composeEmail.trim()}.`);
            setComposeMessage("");
            setComposeSubject("");
            setComposeName("");
            setComposeEmail("");

            if (result.success && result.threadId) {
                setSelectedThreadId(result.threadId);
            }
            await loadThreads();
        } catch (error) {
            setStatusMessage(error instanceof Error ? error.message : "Failed to send email");
        } finally {
            setIsSending(false);
        }
    };

    const handleReply = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedThreadId || !replyMessage.trim()) return;

        setIsSending(true);
        setStatusMessage(null);

        try {
            const result = await replyToEmailThread({ threadId: selectedThreadId, message: replyMessage.trim() });
            if (!result.success) {
                throw new Error(typeof result.error === "string" ? result.error : "Failed to send reply");
            }

            const thread = threads.find((item) => item.id === selectedThreadId);
            if (thread) {
                saveLocalMessage({
                    id: crypto.randomUUID(),
                    thread_id: selectedThreadId,
                    direction: "outbound",
                    sender_name: thread.sender_name || "Global Nexus Tracker",
                    sender_email: thread.sender_email,
                    recipient_name: thread.recipient_name || null,
                    recipient_email: thread.recipient_email,
                    subject: thread.subject,
                    content: replyMessage.trim(),
                    created_at: new Date().toISOString(),
                });
                saveLocalThread({
                    ...thread,
                    last_message: replyMessage.trim(),
                    updated_at: new Date().toISOString(),
                });
            }

            setReplyMessage("");
            await loadMessages(selectedThreadId);
            await loadThreads();
        } catch (error) {
            setStatusMessage(error instanceof Error ? error.message : "Failed to send reply");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="space-y-8 relative">
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Email Inbox</h1>
                    <p className="text-slate-600 text-lg font-bold">Manage conversations, inbound customer emails, and replies.</p>
                </div>
                <button onClick={loadThreads} className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-slate-200 text-slate-600 font-bold hover:text-primary hover:border-primary transition-colors">
                    <RefreshCw size={18} /> Refresh
                </button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-1 bg-white rounded-[36px] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 bg-slate-50/60">
                        <div className="flex items-center gap-3 mb-4 text-slate-900 font-extrabold">
                            <Inbox className="text-primary" />
                            Threads
                        </div>
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                            <input className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-12 pr-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/5" placeholder="Search email threads..." />
                        </div>
                    </div>
                    <div className="max-h-[70vh] overflow-y-auto p-3 space-y-2">
                        {isLoadingThreads ? (
                            <div className="flex justify-center p-8"><Loader2 className="animate-spin text-slate-300" size={24} /></div>
                        ) : threads.length === 0 ? (
                            <div className="text-center p-8 text-slate-400 font-medium">
                                No email threads yet.
                            </div>
                        ) : (
                            threads.map((thread) => (
                                <button
                                    key={thread.id}
                                    onClick={() => setSelectedThreadId(thread.id)}
                                    className={`w-full text-left p-4 rounded-[24px] border transition-all ${selectedThreadId === thread.id ? "bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/10" : "bg-white border-slate-100 hover:bg-slate-50"}`}
                                >
                                    <div className="flex items-start justify-between gap-3 mb-2">
                                        <div className="min-w-0">
                                            <p className={`font-extrabold truncate ${selectedThreadId === thread.id ? "text-white" : "text-slate-900"}`}>{thread.recipient_name || thread.recipient_email}</p>
                                            <p className={`text-xs font-medium truncate ${selectedThreadId === thread.id ? "text-slate-300" : "text-slate-500"}`}>{thread.recipient_email}</p>
                                        </div>
                                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg ${selectedThreadId === thread.id ? "bg-white/10 text-slate-200" : "bg-slate-100 text-slate-500"}`}>{thread.status}</span>
                                    </div>
                                    <p className={`text-xs font-medium truncate ${selectedThreadId === thread.id ? "text-slate-300" : "text-slate-500"}`}>{thread.last_message || thread.subject}</p>
                                </button>
                            ))
                        )}
                    </div>
                </div>

                <div className="xl:col-span-2 bg-white rounded-[36px] border border-slate-100 shadow-sm overflow-hidden flex flex-col min-h-[760px]">
                    <div className="p-6 md:p-8 border-b border-slate-100 bg-white flex items-start justify-between gap-4">
                        {selectedThread ? (
                            <div>
                                <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Customer</p>
                                <h2 className="text-3xl font-extrabold text-slate-900">{selectedThread.recipient_name || selectedThread.recipient_email}</h2>
                                <p className="text-slate-500 font-medium mt-1">{selectedThread.recipient_email}</p>
                                <p className="text-xs font-bold text-slate-600 mt-2">Subject: <span className="text-slate-900">{selectedThread.subject}</span></p>
                                <p className="text-[11px] font-medium text-slate-400 mt-1">Reply Address: {selectedThread.reply_to}</p>
                            </div>
                        ) : (
                            <div>
                                <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Inbox</p>
                                <h2 className="text-3xl font-extrabold text-slate-900">Select a thread</h2>
                            </div>
                        )}
                        <button onClick={() => setSelectedThreadId(null)} className="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100">
                            <ChevronLeft size={20} />
                        </button>
                    </div>

                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-50/30 space-y-5">
                        {!selectedThread ? (
                            <div className="h-full min-h-[300px] flex items-center justify-center text-slate-400 font-medium">
                                Pick a thread to view the conversation.
                            </div>
                        ) : isLoadingMessages ? (
                            <div className="h-full min-h-[300px] flex items-center justify-center">
                                <Loader2 className="animate-spin text-primary" size={32} />
                            </div>
                        ) : messages.length === 0 ? (
                            <div className="h-full min-h-[300px] flex items-center justify-center text-slate-400 font-medium">
                                No messages in this thread yet.
                            </div>
                        ) : (
                            messages.map((message) => (
                                <div key={message.id} className={`flex ${message.direction === "outbound" ? "justify-end" : "justify-start"}`}>
                                    <div className={`max-w-[85%] md:max-w-[60%] p-4 md:p-5 rounded-[24px] shadow-sm ${message.direction === "outbound" ? "bg-slate-900 text-white rounded-tr-none" : "bg-white text-slate-900 border border-slate-100 rounded-tl-none"}`}>
                                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] mb-3 opacity-60">
                                            {message.direction === "outbound" ? <Send size={12} /> : <MessageSquare size={12} />}
                                            {message.direction === "outbound" ? "Admin reply" : "Customer reply"}
                                        </div>
                                        <p className="whitespace-pre-wrap leading-7 font-medium">{message.content}</p>
                                        <p className={`text-[10px] mt-3 opacity-40 text-right`}>{new Date(message.created_at).toLocaleString()}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="p-6 md:p-8 border-t border-slate-100 bg-white space-y-4">
                        {statusMessage && (
                            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600">
                                {statusMessage}
                            </div>
                        )}

                        <form onSubmit={handleReply} className="space-y-4">
                            <div>
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Reply</label>
                                <textarea
                                    value={replyMessage}
                                    onChange={(e) => setReplyMessage(e.target.value)}
                                    rows={5}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 font-semibold text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                                    placeholder="Type your reply to the user"
                                    disabled={!selectedThread}
                                />
                            </div>
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div className="text-xs font-bold text-slate-400">
                                    Sender: support@globalnexustracker.com
                                </div>
                                <button
                                    type="submit"
                                    disabled={!selectedThread || isSending}
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-white font-bold hover:bg-primary-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {isSending ? "Sending..." : "Send Reply"}
                                    <Send size={16} />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4 text-slate-900 font-extrabold">
                    <Mail className="text-primary" />
                    New message
                </div>
                <form onSubmit={handleNewEmail} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input value={composeName} onChange={(e) => setComposeName(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 font-semibold text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="Recipient name (optional)" />
                    <input value={composeEmail} onChange={(e) => setComposeEmail(e.target.value)} type="email" className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 font-semibold text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="Recipient email" />
                    <input value={composeSubject} onChange={(e) => setComposeSubject(e.target.value)} className="md:col-span-2 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 font-semibold text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="Subject" />
                    <textarea value={composeMessage} onChange={(e) => setComposeMessage(e.target.value)} rows={5} className="md:col-span-2 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 font-semibold text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none" placeholder="Message body" />
                    <div className="md:col-span-2 flex justify-end">
                        <button type="submit" disabled={isSending} className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                            {isSending ? "Sending..." : "Send Direct Email"}
                            <Send size={16} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}