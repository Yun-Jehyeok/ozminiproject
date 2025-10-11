"use client";

import { EmailForm } from "../(components)/EmailForm";

export default function ResultPage() {
    return (
        <main className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-10 bg-gradient-to-br from-white via-[#f6f7fb] to-[#ececff]">
            <section className="w-full max-w-xl mx-auto flex flex-col items-center">
                <div className="w-full p-8 flex flex-col items-center">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-[#6366f1] mb-6 tracking-tight text-center">AI와의 대화를 마쳤어요.</h1>
                    <p className="mb-4 text-gray-700 text-center text-base">이 서비스는 사람의 성향에 맞게 대화의 어조를 조정하는 AI 커뮤니케이션 실험입니다.</p>
                </div>
                <EmailForm />
            </section>
        </main>
    );
}
