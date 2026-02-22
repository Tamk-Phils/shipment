"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, User, Headset, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { ChatMessage, ChatRoom } from "@/types";

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [roomId, setRoomId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<any>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Initial session check
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            if (!session) {
                setRoomId(null);
                setMessages([]);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    // Load or create room on first open
    useEffect(() => {
        if (isOpen && !roomId && user) {
            const savedRoomId = localStorage.getItem(`trackflow_chat_room_${user.id}`);
            if (savedRoomId) {
                setRoomId(savedRoomId);
                loadMessages(savedRoomId);
            } else {
                createRoom();
            }
        }
    }, [isOpen, user]);

    // Scroll to bottom when messages change
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    // Subscribe to real-time updates
    useEffect(() => {
        if (!roomId) return;

        const channel = supabase
            .channel(`room-${roomId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'chat_messages',
                    filter: `room_id=eq.${roomId}`
                },
                (payload) => {
                    setMessages(prev => [...prev, payload.new as ChatMessage]);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [roomId]);

    const createRoom = async () => {
        if (!user) return;
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('chat_rooms')
                .insert([{
                    customer_name: user.user_metadata?.full_name || user.email,
                    customer_email: user.email,
                    user_id: user.id,
                    status: 'active'
                }])
                .select()
                .single();

            if (error) throw error;
            if (data) {
                setRoomId(data.id);
                localStorage.setItem(`trackflow_chat_room_${user.id}`, data.id);
                // Send initial greeting
                await sendMessage(data.id, "Hello! How can we help you today?", 'admin');
            }
        } catch (err) {
            console.error("Error creating chat room:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const loadMessages = async (id: string) => {
        const { data, error } = await supabase
            .from('chat_messages')
            .select('*')
            .eq('room_id', id)
            .order('created_at', { ascending: true });

        if (!error && data) {
            setMessages(data);
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || !roomId) return;

        const content = inputValue.trim();
        setInputValue("");
        await sendMessage(roomId, content, 'customer');

        // Update room's last message
        await supabase
            .from('chat_rooms')
            .update({ last_message: content, updated_at: new Date().toISOString() })
            .eq('id', roomId);
    };

    const sendMessage = async (id: string, content: string, role: 'admin' | 'customer') => {
        const { error } = await supabase
            .from('chat_messages')
            .insert([{ room_id: id, content, sender_role: role }]);

        if (error) console.error("Error sending message:", error);
    };

    if (!user) return null;

    return (
        <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100] flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="mb-4 w-[calc(100vw-2rem)] sm:w-96 h-[500px] max-h-[70vh] sm:max-h-[600px] bg-white rounded-[32px] shadow-2xl border border-slate-100 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-slate-900 p-6 flex justify-between items-center text-white">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/20 rounded-xl">
                                    <Headset size={20} className="text-primary" />
                                </div>
                                <div>
                                    <p className="font-extrabold text-sm">Live Support</p>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                        <p className="text-[10px] font-bold text-slate-400">Agents Online</p>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Chat Messages */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-6 space-y-4"
                        >
                            {isLoading ? (
                                <div className="h-full flex items-center justify-center">
                                    <Loader2 className="animate-spin text-primary" size={24} />
                                </div>
                            ) : (
                                messages.map((msg, i) => (
                                    <div
                                        key={i}
                                        className={`flex ${msg.sender_role === 'customer' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`max-w-[80%] p-4 rounded-2xl text-sm font-medium ${msg.sender_role === 'customer'
                                            ? 'bg-primary text-white rounded-tr-none'
                                            : 'bg-slate-100 text-slate-900 rounded-tl-none'
                                            }`}>
                                            {msg.content}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Input Area */}
                        <form
                            onSubmit={handleSendMessage}
                            className="p-4 border-t border-slate-100 bg-slate-50 flex gap-2"
                        >
                            <input
                                type="text"
                                placeholder="Write a message..."
                                className="flex-1 bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="p-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors"
                            >
                                <Send size={18} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`p-4 rounded-full shadow-2xl flex items-center justify-center transition-all ${isOpen ? 'bg-white text-slate-900 rotate-90' : 'bg-slate-900 text-white'
                    }`}
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </motion.button>
        </div>
    );
}
