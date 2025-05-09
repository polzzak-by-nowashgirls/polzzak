import { create } from 'zustand';

interface DialogStore {
  isOpen: boolean;
  isOpenId: string | null;
  openModal: (id?: string | null) => void;
  closeModal: () => void;
}

export const useDialogStore = create<DialogStore>()((set) => ({
  isOpen: false,
  isOpenId: null,
  openModal: (id) => set({ isOpen: true, isOpenId: id }),
  closeModal: () => set({ isOpen: false, isOpenId: null }),
}));

interface DialogBtnProps {
  text: string;
  onClick?: () => void;
}

export type DialogProps = {
  dimd?: boolean;
  dragIcon?: boolean;
  header: string;
  description?: string[];
  button?: DialogBtnProps[];
  buttonDirection?: 'row' | 'col';
  children?: React.ReactNode;
  className?: string;
};
