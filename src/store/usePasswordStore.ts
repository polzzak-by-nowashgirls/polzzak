import { create } from 'zustand';

interface PasswordStore {
  currentPw: string;
  changePw: string;
  changePwConfirm: string;
  isVisible: boolean;
  currentPwValidation: { status: string; message: string };
  changePwValidation: { status: boolean; message: string };
  changePwConfirmValidation: { status: boolean; message: string };

  setCurrentPw: (currentPw: string) => void;
  setChangePw: (changePw: string) => void;
  setChangePwConfirm: (changePwConfirm: string) => void;
  setIsVisible: (isVisible: boolean) => void;
  setCurrentPwValidation: (currentPwValidation: {
    status: boolean;
    message: string;
  }) => void;
  setChangePwValidation: (changePwValidation: {
    status: boolean;
    message: string;
  }) => void;
  setChangePwConfirmValidation: (changePwConfirmValidation: {
    status: boolean;
    message: string;
  }) => void;
}

export const usePasswordStore = create<PasswordStore>((set) => ({
  currentPw: '',
  changePw: '',
  changePwConfirm: '',
  isVisible: false,
  currentPwValidation: { status: false, message: '' },
  changePwValidation: { status: false, message: '' },
  changePwConfirmValidation: { status: false, message: '' },

  setCurrentPw: (currentPw) => set({ currentPw }),
  setChangePw: (changePw) => set({ changePw }),
  setChangePwConfirm: (changePwConfirm) => set({ changePwConfirm }),
  setIsVisible: (isVisible) => set({ isVisible }),
  setCurrentPwValidation: (currentPwValidation) => set({ currentPwValidation }),
  setChangePwValidation: (changePwValidation) => set({ changePwValidation }),
  setChangePwConfirmValidation: (changePwConfirmValidation) =>
    set({ changePwConfirmValidation }),
}));
