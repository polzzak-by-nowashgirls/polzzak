import { create } from 'zustand';

interface EditStore {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  validationStatus: { status: boolean; message: string };
  setValidationStatus: (validationStatus: {
    status: boolean;
    message: string;
  }) => void;
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
  authNumber: string;
  setAuthNumber: (authNumber: string) => void;
  nickname: string;
  setNickname: (nickname: string) => void;
  emailId: string;
  setEmailId: (emailId: string) => void;
  domain: string;
  setDomain: (domain: string) => void;
}

export const useEditStore = create<EditStore>()((set) => ({
  isVisible: false,
  setIsVisible: (isVisible) => set({ isVisible }),
  phoneNumber: '',
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  authNumber: '',
  setAuthNumber: (authNumber) => set({ authNumber }),
  nickname: '',
  setNickname: (nickname) => set({ nickname }),
  emailId: '',
  setEmailId: (emailId) => set({ emailId }),
  domain: '',
  setDomain: (domain) => set({ domain }),
  validationStatus: { status: false, message: '' },
  setValidationStatus: (validationStatus) => set({ validationStatus }),
}));
