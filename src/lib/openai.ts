// OpenAI API 호출 헬퍼 (실제 API 기반, 다중 메시지 지원)
export async function fetchAiResponse(messages: Array<{ role: string; content: string }>, mbti: string): Promise<string> {
    try {
        const systemPrompt = `${mbti} 성격 유형의 사람처럼 대화하세요. 대화는 모두 한국어로 진행합니다.`;
        const fullMessages = [{ role: "system", content: systemPrompt }, ...messages];
        const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                messages: fullMessages,
                model: "gpt-3.5-turbo",
                max_tokens: 512,
                temperature: 0.7,
            }),
        });
        const data = await res.json();
        // OpenAI 응답 구조에 따라 content 추출
        if (data.choices && data.choices[0]?.message?.content) {
            return data.choices[0].message.content;
        }
        // 에러 또는 비정상 응답
        return "AI 응답을 가져올 수 없습니다.";
    } catch {
        // 모킹 응답
        const lastUserMsg = messages.filter((m) => m.role === "user").pop()?.content || "";
        return `${mbti} 스타일로 답변: "${lastUserMsg}"에 대해 공감하며 대답합니다.`;
    }
}
