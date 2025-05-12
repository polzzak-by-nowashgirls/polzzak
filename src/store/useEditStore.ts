import { create } from 'zustand';

interface ValidationStatus {
  status: boolean;
  message: string;
}

interface EditStore {
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
  validationStatus: ValidationStatus;
  setValidationStatus: (validationStatus: ValidationStatus) => void;
}

export const useEditStore = create<EditStore>()((set) => ({
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
