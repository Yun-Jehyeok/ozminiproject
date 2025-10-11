import React from "react";

interface ChatBubbleProps {
    message: string;
    isUser: boolean;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isUser }) => (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
        <div
            className={`max-w-[70%] px-5 py-3 rounded-2xl shadow-sm transition-all duration-200 text-base font-medium leading-relaxed ${
                isUser ? "bg-[#6366f1] text-white rounded-br-lg shadow-md" : "bg-white text-gray-900 border border-gray-200 rounded-bl-lg shadow"
            }`}
        >
            {message}
        </div>
    </div>
);
