import { create } from 'zustand';

interface DialogStore {
  isOpen: boolean;
  openModal: (id?: number | null) => void;
  closeModal: () => void;
}

export const useDialogStore = create<DialogStore>()((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
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
