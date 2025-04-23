import { create } from 'zustand';

interface registerStore {
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
  nickname: string;
  setNickname: (nickname: string) => void;
}

export const useRegisterStore = create<registerStore>()((set) => ({
  phoneNumber: '',
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  nickname: '',
  setNickname: (nickname) => set({ nickname }),
}));
