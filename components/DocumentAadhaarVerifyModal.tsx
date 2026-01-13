"use client";
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Eye, EyeOff, Info, Loader2, CheckCircle } from 'lucide-react';
import { callAPI } from './apis/commonAPIs';
import Swal from 'sweetalert2';

const DocumentAadhaarVerifyModal = ({ showModal, setShowModal }: { showModal: boolean, setShowModal: (showModal: boolean) => void }) => {
    const [showMore, setShowMore] = useState(false);
    const [isLoadingSent, setIsLoadingSent] = useState(false);
    const [isLoadingVerify, setIsLoadingVerify] = useState(false);

    const [aadhaarNumber, setAadhaarNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [isConsentGiven, setIsConsentGiven] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [showAadhaar, setShowAadhaar] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSendOtp = async () => {
        try {
            setError("");
            setSuccess("");
            if (!isConsentGiven) {
                setError("Please check the consent box before verifying.");
                return;
            }
            if (aadhaarNumber.length === 12) {
                setIsLoadingSent(true);
                const storedToken = localStorage.getItem("authToken") || "";

                const result = await callAPI("/udin/requestAadhaarOtp", {
                    aadhaar_number: aadhaarNumber,
                    token: storedToken
                });

                if (result.status == 0 || result.status == "0") {
                    localStorage.setItem("trans_id", result.data.transId);
                    setOtpSent(true);
                    setSuccess(`OTP sent to aadhaar linked with mobile no.`);
                } else {
                    setError(result.message || "Failed to send OTP");
                }
            } else {
                setError("Please enter a valid 12-digit Aadhaar number");
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
            setError("Failed to send OTP. Please try again later.");
        } finally {
            setIsLoadingSent(false);
        }
    };

    const handleVerifyOtp = async () => {
        try {
            setError("");
            setSuccess("");
            if (otp?.length > 0) {
                if (!isConsentGiven) {
                    setError("Please check the consent box before verifying.");
                    return;
                }

                setIsLoadingVerify(true);
                const storedToken = localStorage.getItem("authToken") || "";
                const trans_id = localStorage.getItem("trans_id") || "";

                const result = await callAPI("/udin/validateAadhaarOtp", {
                    trans_id: trans_id,
                    otp_num: otp,
                    aadhaar_num: aadhaarNumber,
                    upload_type: "udin",
                    token: storedToken
                });

                if (result.status == 0 || result.status == "0") {
                    localStorage.removeItem("trans_id");
                    localStorage.setItem("ad_auth", btoa("1"));
                    setShowModal(false);
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Aadhaar has been authenticated successfully',
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    setError(result.message || "Verification Failed");
                }
            } else {
                setError("Please enter the OTP");
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            setError("Failed to verify OTP. Please try again later.");
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
                    {/* Message Displays */}
                    {error && (
                        <div className="text-red-500 text-sm p-3 border border-red-200 bg-red-50 rounded-lg flex justify-center items-center gap-2">
                            <Info size={18} />
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="text-emerald-600 text-sm p-3 border border-emerald-200 bg-emerald-50 rounded-lg flex justify-center items-center gap-2">
                            <CheckCircle size={18} />
                            {success}
                        </div>
                    )}

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
                                    type={showAadhaar ? "text" : "password"}
                                    placeholder="Enter 12-digit number"
                                    value={aadhaarNumber}
                                    onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, '').slice(0, 12))}
                                    disabled={otpSent}
                                    className="w-full h-full bg-white px-3 pr-10 text-sm outline-none text-gray-700 placeholder-gray-400"
                                />
                                <button
                                    onClick={() => setShowAadhaar(!showAadhaar)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
                                >
                                    {showAadhaar ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>

                            {/* Send OTP Button */}
                            <button
                                onClick={handleSendOtp}
                                disabled={isLoadingSent || otpSent}
                                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-5 text-sm font-medium shrink-0 transition-colors flex items-center gap-2"
                            >
                                {isLoadingSent && <Loader2 className="h-4 w-4 animate-spin" />}
                                {otpSent ? "Sent" : "Send OTP"}
                            </button>
                        </div>
                    </div>

                    {/* OTP Input Section (Visible after OTP is sent) */}
                    {otpSent && (
                        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Enter OTP <span className="text-red-500">*</span>
                            </label>
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    placeholder="Enter 6-digit OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                    className="flex-1 h-11 border border-gray-300 rounded-lg px-4 text-sm focus:border-blue-500 outline-none"
                                />
                                <button
                                    onClick={handleVerifyOtp}
                                    disabled={isLoadingVerify || isVerified}
                                    className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white px-8 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                                >
                                    {isLoadingVerify && <Loader2 className="h-4 w-4 animate-spin" />}
                                    {isVerified ? "Verified" : "Verify OTP"}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Consent Checkbox */}
                    <div className="flex items-start gap-3">
                        <input
                            type="checkbox"
                            id="aadhaar-consent"
                            checked={isConsentGiven}
                            onChange={(e) => setIsConsentGiven(e.target.checked)}
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

export default DocumentAadhaarVerifyModal;