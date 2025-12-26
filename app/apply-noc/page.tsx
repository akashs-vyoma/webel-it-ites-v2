'use client';

import { useState } from 'react';
import CreateApplicationForm from '@/components/ApplyNOC';
import { Send } from 'lucide-react';
import DocumentUploadHeader from '@/components/ApplicationDocument';
import NOCForm from '@/components/Noc';
import MultiOwnPropertyForm from '@/components/ApplyForMultipartyDeclaration';

export default function WizardPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 5;

    // Navigation logic
    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

    // Step Titles for the Progress Bar
    const steps = [
        "Create Application",
        "Document",
        "Declaration",
        "Multi-owner",
        "Payment"
    ];

    const SubmitButton = ({ onClick, label }: { onClick?: () => void, label: string }) => (
        <button
            onClick={onClick}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-8 py-2.5 rounded-lg font-bold shadow-md transition-all flex items-center gap-2 active:scale-95"
        >
            <Send size={18} />
            {label}
        </button>
    );

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <CreateApplicationForm onNext={nextStep} />;
            case 2:
                return <DocumentUploadHeader />;
            case 3:
                return <NOCForm />;
            case 4:
                return <MultiOwnPropertyForm />;
            case 5:
                return <div className="p-10 border-2 border-dashed rounded">Step 5: Payment Module Placeholder</div>;
            default:
                return null;
        }
    };

    return (
        <div className="w-screen max-w-screen bg-slate-50/40 border border-slate-100 mx-auto p-6 rounded-lg">
            {/* Progress Indicator */}
            <div className="flex justify-between mb-8">
                {steps.map((label, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${currentStep >= index + 1 ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'
                            }`}>
                            {index + 1}
                        </div>
                        <span className={`text-xs text-center ${currentStep === index + 1 ? 'font-bold' : 'text-gray-500'}`}>
                            {label}
                        </span>
                    </div>
                ))}
            </div>

            {/* Step Content */}
            <div className="p-0 min-h-[400px]">
                {renderStep()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
                <button
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="px-6 py-2 bg-white rounded disabled:opacity-50 hover:bg-gray-300 transition-colors"
                >
                    Previous
                </button>

                {currentStep < totalSteps ? (
                    <SubmitButton onClick={() => nextStep()} label="Submit & Next" />
                ) : (
                    <button
                        onClick={() => alert('Wizard Completed!')}
                        className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                    >
                        Finish
                    </button>
                )}
            </div>
        </div>
    );
}