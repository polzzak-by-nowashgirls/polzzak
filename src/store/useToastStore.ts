import { create } from 'zustand';

interface ToastState {
  message: string | null;
  showToast: (messate: string) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  message: null,
  showToast: (message) => {
    set({ message });

    setTimeout(() => {
      set({ message: null });
    }, 1500);
  },
  hideToast: () => set({ message: null }),
}));
