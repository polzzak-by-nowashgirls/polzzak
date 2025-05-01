import { Session, User } from '@supabase/supabase-js';
import { create } from 'zustand';

interface AuthState {
  session: Session | null;
  user: User | null;
  isAuthenticated: boolean;
  setSession: (session: Session | null) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  isAuthenticated: false,
  setSession: (session) => set({ session, isAuthenticated: !!session }),
  setUser: (user) => set({ user }),
  logout: () => set({ session: null, user: null, isAuthenticated: false }),
}));
