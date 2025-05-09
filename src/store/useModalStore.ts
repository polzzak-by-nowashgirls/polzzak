import { create } from 'zustand';

type ModalType =
  | 'register'
  | 'certify_success'
  | 'certify_fail'
  | 'folder_add'
  | 'folder_delete'
  | 'folder_edit'
  | 'favorite'
  | 'my_polzzak'
  | 'restaurant'
  | 'festival'
  | 'tourist'
  | 'logout'
  | 'login'
  | 'delete'
  | 'calendar'
  | null;

interface ModalStore {
  isOpen: boolean;
  modalType: ModalType;
  buttonText: string;
  setButtonText: (text: string) => void;
  openModal: (type: ModalType, id?: number | null) => void;
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
