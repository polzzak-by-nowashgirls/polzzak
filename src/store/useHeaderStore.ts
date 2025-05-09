import { create } from 'zustand';

type HeaderStore = {
  contentsTitle: string | null;
  setContentsTitle: (title: string | null) => void;

  isEditMode: boolean;
  setIsEditMode: (mode: boolean) => void;
  toggleEditMode: () => void;
};

export const useHeaderStore = create<HeaderStore>((set) => ({
  contentsTitle: null,
  setContentsTitle: (title) => set({ contentsTitle: title }),

  isEditMode: false,
  setIsEditMode: (mode) => set({ isEditMode: mode }),
  toggleEditMode: () => set((state) => ({ isEditMode: !state.isEditMode })),
}));
