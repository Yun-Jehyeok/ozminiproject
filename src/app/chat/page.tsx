"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChatBubble } from "../(components)/ChatBubble";
import { MessageInput } from "../(components)/MessageInput";
import { fetchAiResponse } from "../../lib/openai";
import { useAppState } from "../../lib/state";

const MAX_MESSAGES = 6;

export default function ChatPage() {
    const { selectedMbti, messageCount, incrementMessageCount, resetMessageCount } = useAppState();
    const router = useRouter();
    const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!selectedMbti) router.replace("/");
    }, [selectedMbti, router]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        if (messageCount >= MAX_MESSAGES) {
            resetMessageCount();
            router.push("/result");
        }
    }, [messageCount, resetMessageCount, router]);

    // OpenAI API용 메시지 변환
    const getOpenAiMessages = () => {
        return messages.map((m) => ({
            role: m.isUser ? "user" : "assistant",
            content: m.text,
        }));
    };

    const handleSend = async (msg: string) => {
        setMessages((prev) => [...prev, { text: msg, isUser: true }]);
        incrementMessageCount();
        setLoading(true);
        // 이전 메시지 + 새 메시지
        const openAiMessages = [...getOpenAiMessages(), { role: "user", content: msg }];
        const aiReply = await fetchAiResponse(openAiMessages, selectedMbti!);
        setMessages((prev) => [...prev, { text: aiReply, isUser: false }]);
        setLoading(false);
    };

    return (
        <main className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-10 bg-gradient-to-br from-white via-[#f6f7fb] to-[#ececff]">
            <section className="w-full max-w-2xl mx-auto flex flex-col items-center h-full">
                <div className="w-full flex flex-col h-[80vh] border border-gray-100 rounded-2xl shadow-xl bg-white overflow-hidden">
                    <div className="flex-1 p-6 overflow-y-auto">
                        {messages.map((m, i) => (
                            <ChatBubble key={i} message={m.text} isUser={m.isUser} />
                        ))}
                        <div ref={chatEndRef} />
                    </div>
                    <MessageInput onSend={handleSend} disabled={loading || messageCount >= MAX_MESSAGES} />
                </div>
                <p className="mt-8 text-gray-400 text-base text-center">AI가 선택한 MBTI 스타일로 대화합니다.</p>
                <p className="mt-2 text-gray-400 text-sm text-center">최대 6번까지 대화할 수 있습니다.</p>
            </section>
        </main>
    );
}
