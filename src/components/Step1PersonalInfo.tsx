"use client";

import { useForm } from "react-hook-form";
import { useFormStore } from "@/lib/store";
import type { FormData } from "@/lib/store";

interface Props {
  onNext: (data: Partial<FormData>) => void;
}

export default function Step1PersonalInfo({ onNext }: Props) {
  const savedData = useFormStore((s) => s.data);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: savedData.fullName,
      email: savedData.email,
      phoneNumber: savedData.phoneNumber,
    },
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-5">
      <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
      <p className="text-gray-500 text-sm -mt-3">
        Please provide your basic contact details.
      </p>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          {...register("fullName", { required: "Full name is required" })}
          className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-colors ${
            errors.fullName
              ? "border-red-400 ring-2 ring-red-100"
              : "border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
          } outline-none`}
          placeholder="John Doe"
        />
        {errors.fullName && (
          <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email address",
            },
          })}
          className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-colors ${
            errors.email
              ? "border-red-400 ring-2 ring-red-100"
              : "border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
          } outline-none`}
          placeholder="john@example.com"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <input
          {...register("phoneNumber")}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-colors"
          placeholder="+1 (555) 123-4567"
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
        >
          Next Step →
        </button>
      </div>
    </form>
  );
}
