import { create } from "zustand";

interface State {
    selectedMbti: string | null;
    setSelectedMbti: (mbti: string) => void;
    messageCount: number;
    incrementMessageCount: () => void;
    resetMessageCount: () => void;
}

export const useAppState = create<State>((set) => ({
    selectedMbti: null,
    setSelectedMbti: (mbti) => set({ selectedMbti: mbti }),
    messageCount: 0,
    incrementMessageCount: () => set((state) => ({ messageCount: state.messageCount + 1 })),
    resetMessageCount: () => set({ messageCount: 0 }),
}));
