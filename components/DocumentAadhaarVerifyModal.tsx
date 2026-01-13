"use client";
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Eye } from 'lucide-react';
import Swal from 'sweetalert2';

const DocumentAadhaarVerifyModal = ({ showModal, setShowModal }: { showModal: boolean, setShowModal: (showModal: boolean) => void }) => {
    const [showMore, setShowMore] = useState(false);
    const [isLoadingSent, setIsLoadingSent] = useState(false);
    const [isLoadingVerify, setIsLoadingVerify] = useState(false);

    const handleSendOtp = async () => {
        try {
            if (!isConsentGiven) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Consent Required',
                    text: 'Please check the consent box before verifying.',
                    confirmButtonColor: '#1F51FF'
                });
                return;
            }
            if (aadhaarNumber.length === 12) {
                setIsLoadingSent(true);
                const result = await callAPI("/udin/individualRegisterAndSendOtp", { aadhaar_number: aadhaarNumber });
                if (result.status == 0) {
                    localStorage.setItem("token", result.data.token);
                    localStorage.setItem("trans_id", result.data.trans_id);
                    setOtpSent(true);
                    Swal.fire({
                        icon: 'success',
                        title: 'OTP Sent',
                        text: `OTP sent to registered mobile linked with Aadhaar: ${aadhaarNumber}`,
                        confirmButtonColor: '#1F51FF'
                    });
                } else {
                    // Handle "Already Registered" or other API errors
                    Swal.fire({
                        icon: result.message?.toLowerCase().includes('already') ? 'info' : 'error',
                        title: result.message?.toLowerCase().includes('already') ? 'Registered' : 'Error',
                        text: result.message,
                        confirmButtonColor: '#1F51FF'
                    });
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Input',
                    text: 'Please enter a valid 12-digit Aadhaar number',
                    confirmButtonColor: '#1F51FF'
                });
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to send OTP. Please try again later.',
                confirmButtonColor: '#1F51FF'
            });
        } finally {
            setIsLoadingSent(false);
        }
    };

    const handleVerifyOtp = async () => {
        try {
            setIsLoadingVerify(true);
            if (otp?.length > 0) {
                if (!isConsentGiven) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Consent Required',
                        text: 'Please check the consent box before verifying.',
                        confirmButtonColor: '#1F51FF'
                    });
                    return;
                }

                const token = localStorage.getItem("token");
                const trans_id = localStorage.getItem("trans_id");
                const result = await callAPI("/udin/individualRegisterValidateAadhaarOtp", { otp, token, trans_id });

                if (result.status == 0) {
                    setIsVerified(true); // Update button state
                    Swal.fire({
                        icon: 'success',
                        title: 'Verified!',
                        text: 'OTP verified successfully',
                        confirmButtonColor: '#10B981'
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Verification Failed',
                        text: result.message,
                        confirmButtonColor: '#1F51FF'
                    });
                }
            } else {
                Swal.fire({
                    icon: 'warning',
                    text: 'Please enter the OTP',
                    confirmButtonColor: '#1F51FF'
                });
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to verify OTP. Please try again later.',
                confirmButtonColor: '#1F51FF'
            });
        } finally {
            setIsLoadingVerify(false);
        }
    };
    return (
        <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogContent className="sm:max-w-lg p-0 gap-0 overflow-hidden bg-white rounded-xl shadow-2xl border-0">

                {/* Modal Header */}
                <DialogHeader className="bg-gradient-to-r from-blue-600 to-cyan-500 p-5 text-left">
                    <div className="flex justify-between items-center">
                        <DialogTitle className="text-white text-lg font-medium">Verify your Aadhaar Number</DialogTitle>
                        <button onClick={() => setShowModal(false)} className="text-white/80 hover:text-white">

                        </button>
                    </div>
                </DialogHeader>

                {/* Modal Body */}
                <div className="p-8 space-y-6">

                    {/* Aadhaar Input Group */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Aadhaar Number <span className="text-red-500">*</span>
                        </label>

                        <div className="flex h-11 rounded-lg overflow-hidden border border-gray-300 focus-within:border-blue-500 transition-colors">
                            {/* Left Label */}
                            <div className="bg-gray-100 text-gray-600 border-r border-gray-300 px-4 flex items-center justify-center text-sm font-semibold shrink-0">
                                Aadhaar
                            </div>

                            {/* Input Field */}
                            <div className="relative flex-1 bg-white">
                                <input
                                    type="text"
                                    placeholder="Enter 12-digit number"
                                    className="w-full h-full bg-white px-3 pr-10 text-sm outline-none text-gray-700 placeholder-gray-400"
                                />
                                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors">
                                    <Eye size={18} />
                                </button>
                            </div>

                            {/* Send OTP Button */}
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 text-sm font-medium shrink-0 transition-colors">
                                Send OTP
                            </button>
                        </div>
                    </div>

                    {/* Consent Checkbox */}
                    <div className="flex items-start gap-3">
                        <input
                            type="checkbox"
                            id="aadhaar-consent"
                            className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-0 cursor-pointer accent-blue-600"
                        />
                        <div className="text-xs text-gray-600 text-justify leading-relaxed">
                            <label htmlFor="aadhaar-consent" className="cursor-pointer">
                                I hereby state that I have no objection in authenticating myself on
                                Unique Document Identification Number (UDIN) portal with Aadhaar based
                                authentication system and give my consent to providing my Aadhaar
                                number.
                            </label>

                            {showMore && (
                                <p className="mt-2 text-gray-500">
                                    Aadhaar based authentication is used only for identity verification
                                    through UIDAI. Your Aadhaar number will not be stored or shared and
                                    will be processed as per UIDAI guidelines.
                                </p>
                            )}

                            <span
                                onClick={() => setShowMore(!showMore)}
                                className="text-blue-600 hover:underline block mt-1 font-semibold cursor-pointer"
                            >
                                {showMore ? "Read Less" : "Read More"}
                            </span>
                        </div>

                    </div>
                </div>

                {/* Modal Footer */}
                <div className="p-5 border-t border-gray-100 flex justify-end">
                    <button
                        className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-lg font-medium transition-colors text-sm"
                        onClick={() => setShowModal(false)}
                    >
                        Cancel
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default DocumentAadhaarVerifyModal