import { create } from 'zustand';

interface ModalStore {
  isOpen: boolean;
  buttonText: string;
  setButtonText: (text: string) => void;
  openModal: () => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>()((set) => ({
  isOpen: false,
  buttonText: '',
  setButtonText: (text) => set({ buttonText: text }),
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false, buttonText: '' }),
}));
