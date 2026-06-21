"use client";

import { useForm } from "react-hook-form";
import { useFormStore } from "@/lib/store";
import type { FormData } from "@/lib/store";

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Germany",
  "France",
  "India",
  "Australia",
  "Japan",
  "Brazil",
  "Other",
];

interface Props {
  onNext: (data: Partial<FormData>) => void;
  onBack: () => void;
}

export default function Step2AddressDetails({ onNext, onBack }: Props) {
  const savedData = useFormStore((s) => s.data);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      streetAddress: savedData.streetAddress,
      city: savedData.city,
      zipCode: savedData.zipCode,
      country: savedData.country,
    },
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-5">
      <h2 className="text-2xl font-bold text-gray-800">Address Details</h2>
      <p className="text-gray-500 text-sm -mt-3">
        Where do you currently reside?
      </p>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Street Address
        </label>
        <input
          {...register("streetAddress")}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-colors"
          placeholder="123 Main Street, Apt 4B"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            {...register("city")}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-colors"
            placeholder="New York"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Zip Code <span className="text-red-500">*</span>
          </label>
          <input
            {...register("zipCode", {
              required: "Zip code is required",
              pattern: {
                value: /^\d+$/,
                message: "Zip code must contain only numbers",
              },
            })}
            className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-colors ${
              errors.zipCode
                ? "border-red-400 ring-2 ring-red-100"
                : "border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
            } outline-none`}
            placeholder="10001"
          />
          {errors.zipCode && (
            <p className="text-red-500 text-xs mt-1">
              {errors.zipCode.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Country
        </label>
        <select
          {...register("country")}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-colors bg-white"
        >
          <option value="">Select a country</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
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
