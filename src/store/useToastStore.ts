import { create } from 'zustand';

interface ToastState {
  message: string | null;
  position: string;
  showToast: (messate: string, position?: string, time?: number) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  message: null,
  position: 'top-[64px]',
  showToast: (message, position = 'top-[64px]', time = 1500) => {
    set({ message, position });

    setTimeout(() => {
      set({ message: null });
    }, time);
  },
  hideToast: () => set({ message: null }),
}));
