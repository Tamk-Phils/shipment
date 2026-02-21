"use client";

import { useEffect, useState, useRef } from "react";
import { MessageCircle, Send, User, Headset, Loader2, Search, Clock, ChevronRight, ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { ChatRoom, ChatMessage } from "@/types";

export default function AdminChat() {
    const [rooms, setRooms] = useState<ChatRoom[]>([]);
    const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isLoadingRooms, setIsLoadingRooms] = useState(true);
    const [isLoadingMessages, setIsLoadingMessages] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Initial load of rooms
    useEffect(() => {
        loadRooms();

        // Subscribe to new rooms/updates
        const channel = supabase
            .channel('admin-rooms')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'chat_rooms' },
                () => loadRooms()
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    // Load messages when room selection changes
    useEffect(() => {
        if (selectedRoomId) {
            loadMessages(selectedRoomId);

            // Subscribe to room messages
            const channel = supabase
                .channel(`admin-room-${selectedRoomId}`)
                .on(
                    'postgres_changes',
                    {
                        event: 'INSERT',
                        schema: 'public',
                        table: 'chat_messages',
                        filter: `room_id=eq.${selectedRoomId}`
                    },
                    (payload) => {
                        setMessages(prev => [...prev, payload.new as ChatMessage]);
                    }
                )
                .subscribe();

            return () => {
                supabase.removeChannel(channel);
            };
        }
    }, [selectedRoomId]);

    // Scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const loadRooms = async () => {
        const { data, error } = await supabase
            .from('chat_rooms')
            .select('*')
            .order('updated_at', { ascending: false });

        if (!error && data) {
            setRooms(data);
        }
        setIsLoadingRooms(false);
    };

    const loadMessages = async (id: string) => {
        setIsLoadingMessages(true);
        const { data, error } = await supabase
            .from('chat_messages')
            .select('*')
            .eq('room_id', id)
            .order('created_at', { ascending: true });

        if (!error && data) {
            setMessages(data);
        }
        setIsLoadingMessages(false);
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || !selectedRoomId) return;

        const content = inputValue.trim();
        setInputValue("");

        const { error } = await supabase
            .from('chat_messages')
            .insert([{ room_id: selectedRoomId, content, sender_role: 'admin' }]);

        if (!error) {
            await supabase
                .from('chat_rooms')
                .update({ last_message: content, updated_at: new Date().toISOString() })
                .eq('id', selectedRoomId);
        }
    };

    const selectedRoom = rooms.find(r => r.id === selectedRoomId);

    return (
        <div className="h-[calc(100vh-12rem)] min-h-[500px] flex bg-white rounded-[40px] overflow-hidden border border-slate-100 shadow-xl">
            {/* Rooms List */}
            <div className={`w-full lg:w-96 border-r border-slate-100 flex flex-col bg-slate-50/50 ${selectedRoomId ? 'hidden lg:flex' : 'flex'}`}>
                <div className="p-6 md:p-8 border-b border-slate-100 bg-white">
                    <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 flex items-center gap-3">
                        <MessageCircle className="text-primary" />
                        Conversations
                    </h2>
                    <div className="mt-4 md:mt-6 relative">
                        <input
                            type="text"
                            placeholder="Search chats..."
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-5 pl-12 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {isLoadingRooms ? (
                        <div className="flex justify-center p-8">
                            <Loader2 className="animate-spin text-slate-300" size={24} />
                        </div>
                    ) : rooms.length === 0 ? (
                        <div className="text-center p-8 space-y-2">
                            <p className="font-bold text-slate-400">No active chats</p>
                            <p className="text-xs text-slate-300 font-medium italic">New customer messages will appear here.</p>
                        </div>
                    ) : (
                        rooms.map((room) => (
                            <button
                                key={room.id}
                                onClick={() => setSelectedRoomId(room.id)}
                                className={`w-full p-6 rounded-[24px] text-left transition-all ${selectedRoomId === room.id
                                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                                    : 'bg-white hover:bg-slate-100 text-slate-900 border border-slate-100'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <p className={`font-extrabold text-sm ${selectedRoomId === room.id ? 'text-white' : 'text-slate-900'}`}>
                                        {room.customer_name}
                                    </p>
                                    <div className="flex items-center gap-1.5 opacity-50">
                                        <Clock size={12} />
                                        <p className="text-[10px] font-bold">
                                            {new Date(room.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                                <p className={`text-xs font-medium truncate ${selectedRoomId === room.id ? 'text-slate-400' : 'text-slate-500'}`}>
                                    {room.last_message || 'No messages yet'}
                                </p>
                            </button>
                        ))
                    )}
                </div>
            </div>

            {/* Chat Window */}
            <div className={`flex-1 flex flex-col bg-white ${!selectedRoomId ? 'hidden lg:flex' : 'flex'}`}>
                {selectedRoomId ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-4 md:p-8 border-b border-slate-100 flex justify-between items-center bg-white">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setSelectedRoomId(null)}
                                    className="lg:hidden p-2 -ml-2 text-slate-400 hover:text-slate-600"
                                >
                                    <ArrowLeft size={24} />
                                </button>
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                    <User size={20} className="md:hidden" />
                                    <User size={24} className="hidden md:block" />
                                </div>
                                <div>
                                    <h3 className="text-md md:text-lg font-extrabold text-slate-900">{selectedRoom?.customer_name}</h3>
                                    <p className="text-[10px] text-slate-400 font-bold tracking-tight uppercase">Room ID: {selectedRoomId.slice(0, 8)}</p>
                                </div>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-6 md:p-10 space-y-6 bg-slate-50/30"
                        >
                            {isLoadingMessages ? (
                                <div className="h-full flex items-center justify-center">
                                    <Loader2 className="animate-spin text-primary" size={32} />
                                </div>
                            ) : (
                                messages.map((msg, i) => (
                                    <div
                                        key={i}
                                        className={`flex ${msg.sender_role === 'admin' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`max-w-[85%] md:max-w-[60%] p-4 md:p-5 rounded-[24px] text-sm font-bold shadow-sm ${msg.sender_role === 'admin'
                                            ? 'bg-slate-900 text-white rounded-tr-none'
                                            : 'bg-white text-slate-900 border border-slate-100 rounded-tl-none'
                                            }`}>
                                            {msg.content}
                                            <p className={`text-[10px] mt-2 opacity-40 text-right`}>
                                                {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Reply Area */}
                        <form
                            onSubmit={handleSendMessage}
                            className="p-4 md:p-8 border-t border-slate-100 flex gap-2 md:gap-4 bg-white"
                        >
                            <input
                                type="text"
                                placeholder="Type your reply..."
                                className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl py-3 md:py-4 px-4 md:px-6 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="p-3 md:px-8 bg-primary text-white rounded-2xl font-extrabold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
                            >
                                <span className="hidden md:inline">Send Reply</span>
                                <Send size={18} />
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-20 text-center space-y-6">
                        <div className="w-24 h-24 bg-slate-50 rounded-[40px] flex items-center justify-center text-slate-200">
                            <MessageCircle size={48} />
                        </div>
                        <div className="max-w-xs space-y-2">
                            <h3 className="text-xl font-extrabold text-slate-900">Select a Conversation</h3>
                            <p className="text-sm text-slate-400 font-bold leading-relaxed">
                                Choose a customer from the left sidebar to start providing live logistics support.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
