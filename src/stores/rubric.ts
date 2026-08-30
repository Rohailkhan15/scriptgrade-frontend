import { create } from "zustand";
import type { EvaluationToggles, MagicConcept } from "@/lib/types";

interface RubricStore {
  examId: string | null;
  examName: string;
  concepts: MagicConcept[];
  toggles: EvaluationToggles;
  hydrate: (examId: string, concepts: MagicConcept[]) => void;
  setExamName: (name: string) => void;
  addConcept: (c: MagicConcept) => void;
  removeConcept: (id: string) => void;
  updateConcept: (id: string, patch: Partial<MagicConcept>) => void;
  setToggle: (key: keyof EvaluationToggles, val: boolean) => void;
  reset: () => void;
}

export const useRubricStore = create<RubricStore>((set) => ({
  examId: null,
  examName: "",
  concepts: [],
  toggles: {
    spelling_correction: true,
    strict_dag_order: false,
    density_scoring: true,
  },
  hydrate: (examId, concepts) => set({ examId, concepts }),
  setExamName: (examName) => set({ examName }),
  addConcept: (c) => set((s) => ({ concepts: [...s.concepts, c] })),
  removeConcept: (id) =>
    set((s) => ({ concepts: s.concepts.filter((c) => c.id !== id) })),
  updateConcept: (id, patch) =>
    set((s) => ({
      concepts: s.concepts.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    })),
  setToggle: (key, val) => set((s) => ({ toggles: { ...s.toggles, [key]: val } })),
  reset: () => set({ examId: null, examName: "", concepts: [] }),
}));
