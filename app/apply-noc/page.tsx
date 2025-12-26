'use client';

import { useState } from 'react';
import CreateApplicationForm from '@/components/ApplyNOC';
import { Check, ClipboardEdit, CreditCard, FileCheck, FileUp, ListChecks, Send, Users } from 'lucide-react';
import DocumentUploadHeader from '@/components/ApplicationDocument';
import NOCForm from '@/components/Noc';
import MultiOwnPropertyForm from '@/components/ApplyForMultipartyDeclaration';

export default function WizardPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [category, setCategory] = useState("");
    const totalSteps = 6;

    // Navigation logic
    const steps = [
        { id: 1, label: "Create Application", icon: ClipboardEdit },
        { id: 2, label: "Document", icon: FileUp },
        { id: 3, label: "Multi-owner", icon: Users, hideIfSingle: true },
        { id: 4, label: "Declaration", icon: FileCheck },
        { id: 5, label: "Verify Co-Signers", icon: ListChecks },
        { id: 6, label: "Payment", icon: CreditCard }
    ];

    const nextStep = () => {
        if (currentStep === 4 && category === "SINGLE") setCurrentStep(5);
        else setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    };

    const prevStep = () => {
        if (currentStep === 4 && category === "SINGLE") setCurrentStep(4);
        else setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

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
                return <CreateApplicationForm category={category} setCategory={setCategory} />;
            case 2:
                return <DocumentUploadHeader />;
            case 3:
                return <MultiOwnPropertyForm />;
            case 4:
                return <NOCForm />;
            case 5:
                return <div className="p-10 border-2 border-dashed rounded">Step 5: Payment Module Placeholder</div>;
            case 6:
                return <div className="p-10 border-2 border-dashed rounded">Step 6: Payment Module Placeholder</div>;
            default:
                return null;
        }
    };

    return (
        <div className="w-screen max-w-screen bg-slate-50/40 border border-slate-100 mx-auto p-6 rounded-lg">
            {/* Progress Indicator */}
            <div className="flex justify-between mb-10">
                {steps.map((step) => {
                    // Skip rendering Step 4 if category is SINGLE
                    if (step.hideIfSingle && category === "SINGLE") return null;

                    const Icon = step.icon;
                    const isActive = currentStep === step.id;
                    const isCompleted = currentStep > step.id || (currentStep === 6 && step.id === 6);

                    return (
                        <div key={step.id} className="flex flex-col items-center flex-1 relative">
                            {/* The Icon Circle */}
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300 border-2 z-10 ${isActive
                                ? 'bg-blue-600 border-blue-600 text-white shadow-lg scale-110'
                                : isCompleted
                                    ? 'bg-green-500 border-green-500 text-white'
                                    : 'bg-white border-gray-200 text-gray-400'
                                }`}>
                                {isCompleted ? <Check size={20} strokeWidth={isActive ? 2.5 : 2} /> : <Icon className={`${isActive ? 'animate-pulse' : ''}`} size={20} strokeWidth={isActive ? 2.5 : 2} />}
                            </div>

                            {/* Label */}
                            <span className={`text-xs text-center px-2 transition-colors ${isActive ? 'font-bold text-blue-600' : 'text-gray-500'
                                }`}>
                                {step.label}
                            </span>
                        </div>
                    );
                })}
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