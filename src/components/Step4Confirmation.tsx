"use client";

import { useFormStore } from "@/lib/store";

interface Props {
  onBack: () => void;
  onSubmit: () => void;
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-2">
      <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider">
        {label}
      </dt>
      <dd className="mt-0.5 text-sm font-medium text-gray-800">
        {value || "—"}
      </dd>
    </div>
  );
}

export default function Step4Confirmation({ onBack, onSubmit }: Props) {
  const data = useFormStore((s) => s.data);

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold text-gray-800">Confirm Your Details</h2>
      <p className="text-gray-500 text-sm -mt-3">
        Please review your information before submitting.
      </p>

      <div className="bg-gray-50 rounded-xl p-5 divide-y divide-gray-200">
        <div>
          <h3 className="text-sm font-semibold text-indigo-600 mb-2">
            Personal Information
          </h3>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            <Field label="Full Name" value={data.fullName} />
            <Field label="Email" value={data.email} />
            <Field label="Phone" value={data.phoneNumber} />
          </dl>
        </div>

        <div className="pt-3 mt-3">
          <h3 className="text-sm font-semibold text-indigo-600 mb-2">
            Address Details
          </h3>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            <Field label="Street Address" value={data.streetAddress} />
            <Field label="City" value={data.city} />
            <Field label="Zip Code" value={data.zipCode} />
            <Field label="Country" value={data.country} />
          </dl>
        </div>

        <div className="pt-3 mt-3">
          <h3 className="text-sm font-semibold text-indigo-600 mb-2">
            Account Credentials
          </h3>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            <Field label="Username" value={data.username} />
            <Field label="Password" value={"•".repeat(data.password.length)} />
          </dl>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="px-8 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
        >
          ← Edit
        </button>
        <button
          type="button"
          onClick={onSubmit}
          className="px-8 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
        >
          ✓ Submit Registration
        </button>
      </div>
    </div>
  );
}
