"use client";

import { useForm } from "react-hook-form";
import { useFormStore } from "@/lib/store";
import type { FormData } from "@/lib/store";

interface Props {
  onNext: (data: Partial<FormData>) => void;
  onBack: () => void;
}

export default function Step3AccountCredentials({ onNext, onBack }: Props) {
  const savedData = useFormStore((s) => s.data);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: savedData.username,
      password: savedData.password,
      confirmPassword: savedData.confirmPassword,
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const password = watch("password");

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-5">
      <h2 className="text-2xl font-bold text-gray-800">Account Credentials</h2>
      <p className="text-gray-500 text-sm -mt-3">
        Choose a username and secure password.
      </p>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Username <span className="text-red-500">*</span>
        </label>
        <input
          {...register("username", { required: "Username is required" })}
          className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-colors ${
            errors.username
              ? "border-red-400 ring-2 ring-red-100"
              : "border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
          } outline-none`}
          placeholder="johndoe"
        />
        {errors.username && (
          <p className="text-red-500 text-xs mt-1">
            {errors.username.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password <span className="text-red-500">*</span>
        </label>
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-colors ${
            errors.password
              ? "border-red-400 ring-2 ring-red-100"
              : "border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
          } outline-none`}
          placeholder="Min. 8 characters"
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">
            {errors.password.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Confirm Password <span className="text-red-500">*</span>
        </label>
        <input
          type="password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === password || "Passwords do not match",
          })}
          className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-colors ${
            errors.confirmPassword
              ? "border-red-400 ring-2 ring-red-100"
              : "border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
          } outline-none`}
          placeholder="Re-enter password"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="px-8 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
        >
          ← Back
        </button>
        <button
          type="submit"
          className="px-8 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
        >
          Next Step →
        </button>
      </div>
    </form>
  );
}
