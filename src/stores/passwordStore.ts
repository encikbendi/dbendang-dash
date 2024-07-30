import { create } from "zustand";

interface PasswordState {
  password: string;
  setPassword: (password: string) => void;
}

const usePasswordStore = create<PasswordState>()((set) => ({
  password: localStorage.getItem("password") || "",
  setPassword: (password: string) => {
    set(() => ({ password }));
  },
}));

export default usePasswordStore;
