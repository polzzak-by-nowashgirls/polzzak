import { create } from 'zustand';

type HeaderStore = {
  contentsTitle: string | null;
  setContentsTitle: (title: string | null) => void;
};

export const useHeaderStore = create<HeaderStore>((set) => ({
  contentsTitle: null,
  setContentsTitle: (title) => set({ contentsTitle: title }),
}));
