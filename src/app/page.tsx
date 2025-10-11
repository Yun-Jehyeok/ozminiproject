"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { mbtiList } from "../lib/mbtiData";
import { useAppState } from "../lib/state";
import { MbtiCard } from "./(components)/MbtiCard";

export default function HomePage() {
    const router = useRouter();
    const { setSelectedMbti } = useAppState();
    const [selected, setSelected] = useState<string | null>(null);

    const handleSelect = (type: string) => {
        setSelected(type);
        setSelectedMbti(type);
        setTimeout(() => router.push("/chat"), 400);
    };

    return (
        <main className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-24 bg-gradient-to-br from-white via-[#f6f7fb] to-[#ececff]">
            <section className="w-full max-w-xl mx-auto flex flex-col items-center">
                <h1 className="text-3xl md:text-4xl font-extrabold text-[#6366f1] mb-8 tracking-tight text-center">대화하고 싶은 MBTI를 선택하세요.</h1>
                <p className="mb-10 text-gray-400 text-base text-center">MBTI를 선택하면 AI와 대화를 시작할 수 있습니다.</p>

                <div className="grid grid-cols-1 gap-6 w-full">
                    {mbtiList.map((mbti) => (
                        <MbtiCard key={mbti.type} type={mbti.type} desc={mbti.desc} selected={selected === mbti.type} onClick={() => handleSelect(mbti.type)} />
                    ))}
                </div>
            </section>
        </main>
    );
}
