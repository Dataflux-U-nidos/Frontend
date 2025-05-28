import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SurveyState {
    answers: Record<string, number | null>;
    currentPage: number;
    setAnswer: (key: string, value: number) => void;
    nextPage: () => void;
    prevPage: () => void;
    resetSurvey: () => void;
}

export const useSurveyStore = create<SurveyState>()(
    persist(
        (set) => ({
            answers: {},
            currentPage: 0,
            setAnswer: (key, value) => set((s) => ({ answers: { ...s.answers, [key]: value } })),
            nextPage: () => set((s) => ({ currentPage: s.currentPage + 1 })),
            prevPage: () => set((s) => ({ currentPage: Math.max(0, s.currentPage - 1) })),
            resetSurvey: () => set({ answers: {}, currentPage: 0 }),
        }),
        { name: "likert-survey" }
    )
);
