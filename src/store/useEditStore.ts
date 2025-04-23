import { create } from 'zustand';

interface EditStore {
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
  nickname: string;
  setNickname: (nickname: string) => void;
}

export const useEditStore = create<EditStore>()((set) => ({
  phoneNumber: '',
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  nickname: '',
  setNickname: (nickname) => set({ nickname }),
}));
