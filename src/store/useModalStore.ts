import { create } from 'zustand';

type ModalType =
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
  | null;

interface ModalStore {
  isOpen: boolean;
  modalType: ModalType;
  buttonText: string;
  selectedId: number | null;
  setButtonText: (text: string) => void;
  openModal: (type: ModalType, id?: number | null) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>()((set) => ({
  isOpen: false,
  modalType: null,
  buttonText: '',
  selectedId: null,
  setButtonText: (text) => set({ buttonText: text }),
  openModal: (type, id = null) =>
    set({ isOpen: true, modalType: type, selectedId: id }),
  closeModal: () => set({ isOpen: false, buttonText: '', selectedId: null }),
}));
