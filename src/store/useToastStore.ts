import { create } from 'zustand';

interface ToastState {
  message: string | null;
  position: string;
  showToast: (messate: string, position?: string) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  message: null,
  position: 'top-[64px]',
  showToast: (message, position = 'top-[64px]') => {
    set({ message, position });

    setTimeout(() => {
      set({ message: null });
    }, 1500);
  },
  hideToast: () => set({ message: null }),
}));
