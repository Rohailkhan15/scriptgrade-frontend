import { create } from "zustand";

interface GradeStore {
  activeStudentId: string | null;
  activeDebuggerTab: number;
  showFlaggedOnly: boolean;
  viewMode: "scan" | "ocr";
  search: string;
  overrides: Record<string, { score: number; note: string }>;
  setActiveStudent: (id: string) => void;
  setDebuggerTab: (n: number) => void;
  toggleFlaggedOnly: () => void;
  setViewMode: (m: "scan" | "ocr") => void;
  setSearch: (s: string) => void;
  applyOverride: (id: string, score: number, note: string) => void;
}

export const useGradeStore = create<GradeStore>((set) => ({
  activeStudentId: "STU-102",
  activeDebuggerTab: 1,
  showFlaggedOnly: false,
  viewMode: "scan",
  search: "",
  overrides: {},
  setActiveStudent: (activeStudentId) => set({ activeStudentId }),
  setDebuggerTab: (activeDebuggerTab) => set({ activeDebuggerTab }),
  toggleFlaggedOnly: () => set((s) => ({ showFlaggedOnly: !s.showFlaggedOnly })),
  setViewMode: (viewMode) => set({ viewMode }),
  setSearch: (search) => set({ search }),
  applyOverride: (id, score, note) =>
    set((s) => ({ overrides: { ...s.overrides, [id]: { score, note } } })),
}));
