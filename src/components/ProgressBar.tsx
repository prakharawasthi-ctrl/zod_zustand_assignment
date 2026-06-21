"use client";

const steps = ["Personal Info", "Address", "Credentials", "Confirm"];

export default function ProgressBar({ currentStep }: { currentStep: number }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((label, i) => (
          <div key={i} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  i <= currentStep
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {i < currentStep ? "✓" : i + 1}
              </div>
              <span
                className={`text-xs mt-1.5 hidden sm:block ${
                  i <= currentStep
                    ? "text-indigo-600 font-medium"
                    : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 h-1 mx-2 rounded">
                <div
                  className={`h-full rounded transition-all duration-500 ${
                    i < currentStep ? "bg-indigo-600" : "bg-gray-200"
                  }`}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
