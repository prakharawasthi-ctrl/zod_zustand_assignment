"use client";

import { useState } from "react";
import ProgressBar from "./ProgressBar";
import Step1PersonalInfo from "./Step1PersonalInfo";
import Step2AddressDetails from "./Step2AddressDetails";
import Step3AccountCredentials from "./Step3AccountCredentials";
import Step4Confirmation from "./Step4Confirmation";
import { useFormStore } from "@/lib/store";

export default function MultiStepForm() {
  const { currentStep, setCurrentStep, updateData, reset } = useFormStore();
  const [submitted, setSubmitted] = useState(false);

  const handleNext = (stepData: Record<string, string>) => {
    updateData(stepData);
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    const data = useFormStore.getState().data;
    console.log("Registration Submitted:", data);
    setSubmitted(true);
  };

  const handleReset = () => {
    reset();
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="text-center py-16 space-y-4 animate-fade-in">
        <div className="text-5xl">🎉</div>
        <h2 className="text-2xl font-bold text-gray-800">
          Registration Successful!
        </h2>
        <p className="text-gray-500">
          Your account has been created. Check the console for the submitted
          data.
        </p>
        <button
          onClick={handleReset}
          className="mt-4 px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
        >
          Register Again
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <ProgressBar currentStep={currentStep} />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <div className="transition-all duration-300 ease-in-out">
          {currentStep === 0 && <Step1PersonalInfo onNext={handleNext} />}
          {currentStep === 1 && (
            <Step2AddressDetails onNext={handleNext} onBack={handleBack} />
          )}
          {currentStep === 2 && (
            <Step3AccountCredentials onNext={handleNext} onBack={handleBack} />
          )}
          {currentStep === 3 && (
            <Step4Confirmation onBack={handleBack} onSubmit={handleSubmit} />
          )}
        </div>
      </div>
    </div>
  );
}
