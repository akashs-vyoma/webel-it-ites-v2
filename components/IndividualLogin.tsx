"use client"
import React, { useState } from 'react';
import { Smartphone, Key } from 'lucide-react'; // Changed icons to match screenshot
import Link from 'next/link';
import Swal from 'sweetalert2'; // Import SweetAlert2

// Shadcn UI Imports (Assuming standard installation path)
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from 'next/navigation';

const IndividualLogin: React.FC = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');

    // State for Role Selection Modal
    const [showRoleModal, setShowRoleModal] = useState(false);
    const [selectedRole, setSelectedRole] = useState<string>('individual');

    const router = useRouter();
    const handleSendOtp = () => {
        if (phoneNumber.length === 10) {
            setOtpSent(true);

            // 1. SweetAlert2 Implementation matching Screenshot 1
            Swal.fire({
                icon: 'success',
                text: 'OTP has been sent to your registered mobile number.',
                confirmButtonText: 'OK',
                confirmButtonColor: '#4c65f6', // Matches the blue in the alert
                footer: '<span style="color: #666">Webel Online Services</span>',
                width: 600,
                padding: '1em',
                customClass: {
                    actions: 'my-custom-actions',
                }
            });
        } else {
            alert("Please enter a valid 10-digit phone number");
        }
    };

    const handleVerifyOtp = () => {
        if (otp.length > 0) {
            // 2. Open Shadcn Dialog instead of alert
            setShowRoleModal(true);
        } else {
            alert("Please enter the OTP");
        }
    };

    const handleSubmit = () => {
        localStorage.setItem("role", selectedRole);
        setShowRoleModal(false);
        localStorage.setItem("isLogin", "1");
        router.push("/user-dashboard");
    }

    return (
        <>
            <div className="w-full max-w-md bg-white shadow-2xl rounded-lg overflow-hidden border border-gray-100 font-sans flex flex-col min-h-[500px]">
                {/* Card Header */}
                <div className="bg-[#4c4f95] px-4 py-3">
                    <h2 className="text-white text-lg font-medium">Sign In</h2>
                </div>

                <div className="p-6 flex-1">
                    {/* Phone Number Field */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Phone Number
                        </label>

                        <div className="flex w-full rounded-none border border-gray-300 overflow-hidden h-10">
                            {/* Icon Prefix */}
                            <div className="bg-[#4c4f95] w-10 flex items-center justify-center text-white shrink-0">
                                <Smartphone size={18} />
                            </div>

                            {/* Input Field */}
                            <input
                                type="text"
                                value={phoneNumber}
                                onChange={(e) => {
                                    const val = e.target.value.replace(/\D/g, '');
                                    if (val.length <= 10) setPhoneNumber(val);
                                }}
                                className="flex-1 px-3 py-2 outline-none text-base text-gray-900 font-medium placeholder-gray-400"
                                placeholder="7278565584"
                            />

                            {/* Send OTP Button (Only visible if OTP not sent yet) */}
                            {!otpSent && (
                                <button
                                    onClick={handleSendOtp}
                                    className="bg-[#eab308] hover:bg-[#ca8a04] text-gray-900 font-medium px-6 py-1 text-sm transition-colors whitespace-nowrap"
                                >
                                    Send OTP
                                </button>
                            )}
                        </div>
                    </div>

                    {/* OTP Section - Matches Screenshot 2 */}
                    {otpSent && (
                        <div className="mb-4 animate-in fade-in slide-in-from-top-2 duration-300">
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Enter OTP
                            </label>
                            <div className="flex w-full border border-gray-300 h-10 overflow-hidden">
                                {/* Key Icon */}
                                <div className="bg-[#4c4f95] w-10 flex items-center justify-center text-white shrink-0">
                                    <Key size={18} />
                                </div>

                                {/* OTP Input */}
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="flex-1 px-3 py-2 outline-none text-sm text-gray-700 placeholder-gray-400"
                                    placeholder="Enter OTP"
                                />

                                {/* Verify OTP Button (Attached to right) */}
                                <button
                                    onClick={handleVerifyOtp}
                                    className="bg-[#fbbf24] hover:bg-[#f59e0b] text-gray-900 font-medium px-6 py-2 text-sm transition-colors whitespace-nowrap"
                                >
                                    Verify OTP
                                </button>
                            </div>

                            {/* Resend OTP Link */}
                            <div className="mt-2">
                                <button className="text-blue-500 text-sm hover:underline bg-transparent border-none p-0 cursor-pointer">
                                    Resend OTP
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Links */}
                    <div className="space-y-1 mt-6">
                        <div>
                            <Link href="/company-login"
                                className="text-blue-500 hover:text-blue-700 text-sm bg-transparent border-none p-0 cursor-pointer"
                            >
                                Login if not an individual
                            </Link>
                        </div>
                        <div className="text-sm text-gray-600">
                            Do not have an account? <Link href="/individual-sign-up" className="text-blue-500 hover:text-blue-700">Sign Up</Link>
                        </div>
                    </div>
                </div>

                {/* Yellow Instruction Footer */}
                <div className="bg-[#fcf8e3] border-t border-gray-200 p-4 text-[12px] leading-5 text-gray-800 text-justify">
                    <span className="font-bold text-gray-900">Instruction: For Sign in as an Individual</span> please enter register mobile number and click on <span className="font-bold underline">"Send OTP"</span> button, OTP will send to the register mobile number enter the <span className="font-bold">OTP</span>, Click on <span className="underline font-bold">Verify OTP</span> Button
                </div>
            </div>

            {/* 3. Shadcn UI Dialog - Matches Screenshot 3 */}
            <Dialog open={showRoleModal} onOpenChange={setShowRoleModal}>
                <DialogContent className="sm:max-w-lg p-0 gap-0 overflow-hidden bg-white">
                    <DialogHeader className="bg-[#4c4f95] p-5">
                        <DialogTitle className="text-white text-xl font-semibold">Select Your Role</DialogTitle>
                    </DialogHeader>

                    <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">

                        {/* Option 1: Non-Individual */}
                        <div
                            className={`flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-all ${selectedRole === 'company' ? 'border-[#4c4f95] bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                            onClick={() => setSelectedRole('company')}
                        >
                            <div className={`mt-1 h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedRole === 'company' ? 'border-[#4c4f95]' : 'border-gray-400'}`}>
                                {selectedRole === 'company' && <div className="h-2.5 w-2.5 rounded-full bg-[#4c4f95]" />}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-base">VYOMA INNOVUS GLOBAL PRIVATE LIMITED</h3>
                                <p className="text-[#4c4f95] font-semibold text-sm uppercase mt-0.5">NON-INDIVIDUAL</p>
                            </div>
                        </div>

                        {/* Option 2: Individual */}
                        <div
                            className={`flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-all ${selectedRole === 'individual' ? 'border-[#4c4f95] bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                            onClick={() => setSelectedRole('individual')}
                        >
                            <div className={`mt-1 h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedRole === 'individual' ? 'border-[#4c4f95]' : 'border-gray-400'}`}>
                                {selectedRole === 'individual' && <div className="h-2.5 w-2.5 rounded-full bg-[#4c4f95]" />}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-base">SOUMEN DAS</h3>
                                <p className="text-[#4c4f95] font-semibold text-sm uppercase mt-0.5">INDIVIDUAL</p>
                            </div>
                        </div>

                    </div>

                    <div className="p-4 border-t border-gray-100 flex justify-end">
                        <button
                            className="bg-[#4c4f95] hover:bg-[#3b3d73] text-white px-8 py-2 rounded-full font-medium transition-colors shadow-lg"
                            onClick={() => handleSubmit()}
                        >
                            Submit
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default IndividualLogin;