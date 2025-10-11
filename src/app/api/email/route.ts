import { NextRequest, NextResponse } from "next/server";

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_URL || "";
export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();
        if (!email || typeof email !== "string" || !email.includes("@")) {
            return NextResponse.json({ error: "유효하지 않은 이메일입니다." }, { status: 400 });
        }
        // Formspree로 이메일 전송
        const res = await fetch(FORMSPREE_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });
        if (!res.ok) {
            return NextResponse.json({ error: "Formspree 전송 실패" }, { status: 500 });
        }
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: "서버 오류" }, { status: 500 });
    }
}
