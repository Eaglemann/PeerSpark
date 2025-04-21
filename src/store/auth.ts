import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: (user, token) => {
        set({ user, token });
      },
      logout: () => {
        set({ user: null, token: null });
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
      },
    }),
    {
      name: "auth-storage", // will be the key in localStorage
      partialize: (state) => ({ user: state.user, token: state.token }), // only persist what's needed
    }
  )
);
