import { create } from "zustand";

interface FormErrorState {
  error: {
    message: string;
    field: "all" | string;
  } | null;
  showError: (error: { message: string; field: string } | null) => void;
  clearError: () => void;
}

export const useFormErrorStore = create<FormErrorState>((set) => ({
  error: {
    message: "alsdk jfalsdkjf alsdkjfalsd kfjasdlf",
    field: "all",
  },
  showError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}));
