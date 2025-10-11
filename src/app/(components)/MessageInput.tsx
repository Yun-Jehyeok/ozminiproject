import React, { useState } from "react";

interface MessageInputProps {
    onSend: (message: string) => void;
    disabled?: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSend, disabled }) => {
    const [value, setValue] = useState("");

    const handleSend = () => {
        if (value.trim()) {
            onSend(value);
            setValue("");
        }
    };

    return (
        <div className="flex items-center gap-3 p-4 border-t bg-white">
            <input
                type="text"
                className="flex-1 px-5 py-3 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:border-[#6366f1] text-base"
                placeholder="메시지를 입력하세요..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                disabled={disabled}
            />
            <button className="px-5 py-3 bg-[#6366f1] text-white rounded-xl font-semibold shadow hover:bg-[#4f46e5] disabled:opacity-50" onClick={handleSend} disabled={disabled}>
                보내기
            </button>
        </div>
    );
};
