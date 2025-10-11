import React, { useState } from "react";

export const EmailForm: React.FC = () => {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            const res = await fetch("/api/email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            if (!res.ok) {
                throw new Error("서버 오류");
            }
            setSubmitted(true);
        } catch (err) {
            console.error(err);
            setError("이메일 저장에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <form className="w-full max-w-md mx-auto p-6 bg-white rounded-2xl shadow flex flex-col gap-4" onSubmit={handleSubmit}>
            <label className="block mb-2 text-gray-500 text-[15px] text-center">서비스 소식을 받고 싶다면 이메일을 남겨주세요.</label>
            <div className="flex gap-3">
                <input
                    type="email"
                    className="flex-1 min-w-[100px] px-5 py-3 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:border-[#6366f1] text-base"
                    placeholder="이메일 입력"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={submitted}
                />
                <button type="submit" className="px-5 py-3 bg-[#6366f1] text-white rounded-xl font-semibold shadow hover:bg-[#4f46e5] disabled:opacity-50" disabled={submitted}>
                    제출
                </button>
            </div>
            {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
            {submitted && <p className="mt-2 text-[#6366f1] text-sm">감사합니다! 곧 소식을 보내드릴게요.</p>}
        </form>
    );
};
