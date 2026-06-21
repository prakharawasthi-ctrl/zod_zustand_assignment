import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  streetAddress: string;
  city: string;
  zipCode: string;
  country: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export const defaultFormData: FormData = {
  fullName: "",
  email: "",
  phoneNumber: "",
  streetAddress: "",
  city: "",
  zipCode: "",
  country: "",
  username: "",
  password: "",
  confirmPassword: "",
};

interface FormStore {
  data: FormData;
  currentStep: number;
  updateData: (partial: Partial<FormData>) => void;
  setCurrentStep: (step: number) => void;
  reset: () => void;
}

export const useFormStore = create<FormStore>()(
  persist(
    (set) => ({
      data: defaultFormData,
      currentStep: 0,
      updateData: (partial) =>
        set((state) => ({ data: { ...state.data, ...partial } })),
      setCurrentStep: (step) => set({ currentStep: step }),
      reset: () => set({ data: defaultFormData, currentStep: 0 }),
    }),
    { name: "multi-step-form" }
  )
);
