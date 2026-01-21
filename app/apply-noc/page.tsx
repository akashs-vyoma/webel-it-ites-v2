'use client';

import { useState, useRef } from 'react';
import CreateApplicationForm from '@/components/ApplyNOC';
import { ArrowLeft, BadgeCheck, Check, ClipboardEdit, CreditCard, FileCheck, FileUp, ListChecks, Loader2, Send, Users } from 'lucide-react';
import DocumentUploadHeader from '@/components/ApplicationDocument';
import NOCForm from '@/components/Noc';
import MultiOwnPropertyForm from '@/components/ApplyForMultipartyDeclaration';
import PaymentCard from '@/components/InitPayment';
import CoSignerApplication from '@/components/CoSignerApplication';
import Swal from 'sweetalert2';
import { smallSwal } from '@/components/SwalFooter';
import { getCookie } from '@/utils/cookies';

export default function WizardPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [category, setCategory] = useState("");
    const [applicationType, setApplicationType] = useState("");
    const [applicationNo, setApplicationNo] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const childRef = useRef<any>(null);
    const totalSteps = 6;

    const skipStep = () => {
        // Logic to handle skipping Step 3 if Category is SINGLE
        if (currentStep === 2 && category === "SINGLE") {
            setCurrentStep(4);
        } else {
            setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
        }
    };
    const steps = [
        { id: 1, label: "Create Application", icon: ClipboardEdit },
        { id: 2, label: "Document", icon: FileUp },
        { id: 3, label: "Multi-owner", icon: Users, hideIfSingle: true },
        { id: 4, label: "Declaration", icon: FileCheck },
        { id: 5, label: "Verify Co-Signers", icon: ListChecks },
        { id: 6, label: "Payment", icon: CreditCard }
    ];

    const nextStep = async () => {
        try {
            setIsLoading(true);
            if (currentStep === 1) {

                const result = await childRef.current?.submit();

                if (result && result.status === 0) {

                    setApplicationNo(result?.data?.application_no);
                    setApplicationType(getCookie("application-type") || "");
                    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
                } else if (result) {
                    Swal.fire("Error", result.message || "Something went wrong", "error");
                }
            }
            else if (currentStep === 4) {
                const result = await childRef.current?.submit();
                if (result && result.status == 0) {
                    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
                } else if (result) {
                    Swal.fire("Error", result.message || "Something went wrong", "error");
                }
            }
            else if (currentStep === 2 && category === "SINGLE") {
                setCurrentStep(4);
            } else {
                setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
            }
        } catch (error) {
            console.error("Error in nextStep:", error);
            Swal.fire("Error", "Something went wrong", "error");
        } finally {
            setIsLoading(false);
        }
    };

    const prevStep = () => {
        if (currentStep === 4 && category === "SINGLE") setCurrentStep(2);
        else setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    const SubmitButton = ({ onClick, label, isLoading }: { onClick?: () => void, label: string, isLoading?: boolean }) => (
        <button
            onClick={onClick}
            disabled={isLoading}
            className="cursor-pointer bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-8 py-2.5 rounded-lg font-bold shadow-md transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            {isLoading ? "Processing..." : label}
        </button>
    );

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <CreateApplicationForm ref={childRef} category={category} setCategory={setCategory} />;
            case 2:
                return <DocumentUploadHeader applicationNo={applicationNo} applicationType={applicationType} category={category} isWizard={true} />;
            case 3:
                return <MultiOwnPropertyForm isWizard={true} />;
            case 4:
                return <NOCForm ref={childRef} applicationNo={applicationNo} applicationType={applicationType} category={category} isWizard={true} />;
            case 5:
                return <CoSignerApplication />;
            case 6:
                return <PaymentCard isWizard={true} />;
            default:
                return null;
        }
    };

    return (
        <div className="w-screen max-w-screen bg-slate-50/40 border border-slate-100 mx-auto p-6 rounded-lg">
            {/* Progress Indicator */}
            <div className="flex justify-between mb-10">
                {steps.map((step, index) => {
                    if (step.hideIfSingle && category === "SINGLE") return null;

                    const Icon = step.icon;
                    const isActive = currentStep === step.id;
                    const isCompleted = currentStep > step.id;

                    const isNextStepReached = currentStep > step.id;

                    return (
                        <div key={step.id} className="flex-1 relative group">
                            {/* Connecting Line */}
                            {index < steps.length - 1 && (
                                <div
                                    className="absolute top-6 left-[50%] w-full h-[3px] bg-gray-100 -z-0"
                                    aria-hidden="true"
                                >
                                    <div
                                        className={`h-full bg-blue-600 transition-all duration-1000 ease-in-out ${isNextStepReached ? 'w-full' : 'w-0'
                                            }`}
                                    />
                                </div>
                            )}

                            <div className="flex flex-col items-center relative z-10">
                                <div className={`
                                    w-12 h-12 rounded-full flex items-center justify-center 
                                    transition-all duration-500 border-2 
                                    ${isActive
                                        ? 'bg-white border-blue-600 text-blue-600 ring-4 ring-blue-50 shadow-sm'
                                        : isCompleted
                                            ? 'bg-blue-600 border-blue-600 text-white'
                                            : 'bg-white border-gray-200 text-gray-400'
                                    }
                                `}>
                                    {isCompleted ? (
                                        <Check size={22} strokeWidth={3} className="animate-in zoom-in duration-300" />
                                    ) : (
                                        <Icon
                                            size={20}
                                            strokeWidth={isActive ? 2.5 : 2}
                                            className={`${isActive ? 'scale-110 transition-transform' : ''}`}
                                        />
                                    )}
                                </div>

                                <div className="mt-3 flex flex-col items-center">
                                    <span className={`
                                        text-[11px] uppercase tracking-wider font-bold transition-colors duration-300
                                        ${isActive ? 'text-blue-600' : isCompleted ? 'text-gray-900' : 'text-gray-400'}
                                    `}>
                                        Step {step.id > 3 && category === "SINGLE" ? step.id - 1 : index + 1}
                                    </span>
                                    <span className={`
                                        text-sm font-medium transition-colors duration-300
                                        ${isActive ? 'text-gray-900' : 'text-gray-500'}
                                    `}>
                                        {step.label}
                                    </span>
                                </div>
                            </div>
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
                    className="flex items-center gap-2 px-6 py-2 bg-white rounded-lg disabled:opacity-50 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                    <ArrowLeft size={18} />
                    Previous
                </button>

                {/* NEW: Action Group */}
                <div className="flex gap-3">
                    {/* Skip Button: Only shows if not on the last step */}

                    {currentStep < totalSteps ? (
                        <SubmitButton isLoading={isLoading} onClick={() => nextStep()} label={isLoading ? "Submitting..." : "Submit & Continue"} />
                    ) : (
                        <button
                            onClick={() => Swal.fire({
                                title: 'Payment Successful 🎉',
                                text: 'Wizard completed successfully!',
                                icon: 'success',
                                confirmButtonText: 'Done',
                                confirmButtonColor: '#06b6d4',
                            })
                            }
                            className="cursor-pointer bg-gradient-to-r from-emerald-600 to-cyan-500 text-white px-8 py-2.5 rounded-lg font-bold shadow-md flex items-center gap-2"
                        >
                            <BadgeCheck size={18} />
                            Pay & Complete
                        </button>
                    )}
                    {currentStep < totalSteps && (
                        <button
                            onClick={skipStep}
                            className="px-6 py-2 text-gray-500 hover:text-gray-800 font-medium transition-all cursor-pointer underline decoration-gray-300 underline-offset-4"
                        >
                            Skip Step
                        </button>
                    )}
                </div>
            </div>
        </div>
    );

}