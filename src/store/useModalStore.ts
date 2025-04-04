import { create } from 'zustand';

type ModalType = 'folder_add' | 'folder_delete' | 'folder_edit' | null;

interface ModalStore {
  isOpen: boolean;
  modalType: ModalType;
  buttonText: string;
  setButtonText: (text: string) => void;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>()((set) => ({
  isOpen: false,
  modalType: null,
  buttonText: '',
  setButtonText: (text) => set({ buttonText: text }),
  openModal: (type) => set({ isOpen: true, modalType: type }),
  closeModal: () => set({ isOpen: false, buttonText: '' }),
}));
