import React from "react";

interface MbtiCardProps {
    type: string;
    desc: string;
    selected: boolean;
    onClick: () => void;
}

export const MbtiCard: React.FC<MbtiCardProps> = ({ type, desc, selected, onClick }) => (
    <button
        className={`w-full p-6 rounded-2xl border flex flex-col items-center justify-center bg-white shadow-sm mb-2 hover:shadow-lg hover:border-[#6366f1] focus:outline-none ${
            selected ? "border-[#6366f1] shadow-lg" : "border-gray-200"
        }`}
        onClick={onClick}
        aria-label={type}
        style={{ minHeight: 120 }}
    >
        <span className="text-xl font-extrabold text-[#6366f1] mb-2 tracking-tight">{type}</span>
        <span className="text-base text-gray-600 text-center whitespace-pre-line leading-relaxed">{desc}</span>
    </button>
);
