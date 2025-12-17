"use client"
import React, { useState } from 'react';
import { PhoneCall, KeyRound, Fingerprint, Check, X, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

const VerifyOrgAuthorizedPerson: React.FC = () => {
    const router = useRouter();

    // --- State ---
    const [mobileNumber, setMobileNumber] = useState('7061841703'); // Pre-filled as per reference
    const [secretKey, setSecretKey] = useState('');
    const [aadhaar, setAadhaar] = useState('');
    const [otp, setOtp] = useState('');

    // --- Flow Control ---
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [showOtpAlert, setShowOtpAlert] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    // --- Handlers ---
    const handleVerify = () => {
        if (!mobileNumber || !secretKey || !aadhaar) {
            alert("Please fill in all fields");
            return;
        }
        setShowOtpAlert(true);
    };

    const handleOtpAlertConfirm = () => {
        setShowOtpAlert(false);
        setIsOtpSent(true);
    };

    const handleSubmit = () => {
        if (!otp) {
            alert("Please enter the OTP");
            return;
        }
        setShowSuccessAlert(true);
    };

    const handleSuccessRedirect = () => {
        setShowSuccessAlert(false);
        router.push('/add-authorize-person');
    };

    return (
        <div className="w-full flex justify-center p-4">
            <div className="w-full max-w-[420px] mx-auto mt-8
                            bg-white
                            rounded-2xl
                            shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)]
                            border border-slate-100
                            overflow-hidden
                            font-sans relative">

                {/* Header */}
                <div className="relative overflow-hidden px-6 pt-6 pb-2 bg-[#1F51FF]">
                    <div className="flex items-center justify-between mb-1">
                        <div className="absolute inset-0 gradient-shimmer pointer-events-none"></div>
                        <h2 className="text-white text-lg font-bold tracking-tight">
                            Auth Person Verification
                        </h2>
                        <div className="h-2 w-2 rounded-full bg-white animate-pulse"></div>
                    </div>
                    <p className="text-white text-xs font-medium">
                        Please verify the authorised person details below.
                    </p>
                </div>

                {/* Form */}
                <div className="px-6 pb-6 pt-4 space-y-5">

                    {/* Mobile Number */}
                    <div className="group">
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5 ml-1">
                            Mobile Number
                        </label>
                        <div className="relative flex items-center">
                            <div className="absolute left-3.5 text-slate-400 group-focus-within:text-[#1F51FF] transition-colors duration-200 pointer-events-none">
                                <PhoneCall size={18} />
                            </div>
                            <input
                                type="text"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                                disabled={isOtpSent}
                                placeholder="Enter mobile number"
                                className="w-full pl-10 pr-4 py-2.5
                                           bg-slate-50 border border-slate-200
                                           rounded-xl
                                           text-sm text-slate-800 font-medium
                                           placeholder:text-slate-400
                                           outline-none
                                           transition-all duration-200
                                           focus:bg-white
                                           focus:border-[#1F51FF]
                                           focus:ring-4 focus:ring-[#1F51FF]/10
                                           disabled:opacity-60 disabled:bg-slate-100"
                            />
                        </div>
                    </div>

                    {/* Secret Key */}
                    <div className="group">
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5 ml-1">
                            Secret Key <span className="text-[#1F51FF]">*</span>
                        </label>
                        <div className="relative flex items-center">
                            <div className="absolute left-3.5 text-slate-400 group-focus-within:text-[#1F51FF] transition-colors duration-200 pointer-events-none">
                                <KeyRound size={18} />
                            </div>
                            <input
                                type="text"
                                value={secretKey}
                                onChange={(e) => setSecretKey(e.target.value)}
                                disabled={isOtpSent}
                                placeholder="Enter your secret key"
                                className="w-full pl-10 pr-4 py-2.5
                                           bg-slate-50 border border-slate-200
                                           rounded-xl
                                           text-sm text-slate-800 font-medium
                                           placeholder:text-slate-400
                                           outline-none
                                           transition-all duration-200
                                           focus:bg-white
                                           focus:border-[#1F51FF]
                                           focus:ring-4 focus:ring-[#1F51FF]/10
                                           disabled:opacity-60 disabled:bg-slate-100"
                            />
                        </div>
                    </div>

                    {/* Aadhaar Verification */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5 ml-1">
                            Aadhaar Verification
                        </label>
                        <div className="flex items-center h-[46px] rounded-xl overflow-hidden
                                        bg-slate-50 border border-slate-200
                                        focus-within:bg-white
                                        focus-within:border-[#1F51FF]
                                        focus-within:ring-4 focus-within:ring-[#1F51FF]/10
                                        transition-all duration-200">
                            <div className="pl-4 pr-3 flex items-center justify-center
                                            text-xs font-bold text-slate-500 uppercase tracking-wider
                                            border-r border-slate-200 h-1/2">
                                <Fingerprint size={18} />
                            </div>
                            <input
                                type="text"
                                value={aadhaar}
                                onChange={(e) => setAadhaar(e.target.value)}
                                disabled={isOtpSent}
                                placeholder="Enter Aadhaar No."
                                className="flex-1 px-3 bg-transparent
                                           outline-none text-slate-800 font-medium
                                           placeholder:text-slate-400 text-sm h-full
                                           disabled:text-slate-500"
                            />
                            {!isOtpSent && (
                                <button
                                    onClick={handleVerify}
                                    className="h-[calc(100%-8px)] mr-1 px-5
                                               rounded-lg
                                               text-xs font-bold text-white tracking-wide
                                               bg-[#1F51FF]
                                               shadow-[0_4px_12px_rgba(31,81,255,0.3)]
                                               hover:shadow-[0_6px_16px_rgba(31,81,255,0.4)]
                                               hover:bg-blue-600
                                               active:scale-95
                                               transition-all duration-200
                                               cursor-pointer
                                               whitespace-nowrap"
                                >
                                    VERIFY
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Enter OTP Section (Reveals after Verify) */}
                    {isOtpSent && (
                        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                            <label className="block text-xs font-semibold text-slate-600 mb-1.5 ml-1">
                                Enter OTP
                            </label>
                            <div className="flex items-center h-[46px] rounded-xl overflow-hidden
                                            bg-slate-50 border border-slate-200
                                            focus-within:bg-white
                                            focus-within:border-[#1F51FF]
                                            focus-within:ring-4 focus-within:ring-[#1F51FF]/10
                                            transition-all duration-200">
                                <div className="pl-4 pr-3 flex items-center justify-center
                                                text-xs font-bold text-slate-500 uppercase tracking-wider
                                                border-r border-slate-200 h-1/2">
                                    <KeyRound size={18} />
                                </div>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="XXXXXX"
                                    className="flex-1 px-3 bg-transparent
                                               outline-none text-slate-800 font-medium
                                               placeholder:text-slate-400 text-sm h-full tracking-widest"
                                />
                                <button
                                    onClick={handleSubmit}
                                    className="h-[calc(100%-8px)] mr-1 px-5
                                               rounded-lg
                                               text-xs font-bold text-white tracking-wide
                                               bg-[#1F51FF]
                                               shadow-[0_4px_12px_rgba(31,81,255,0.3)]
                                               hover:shadow-[0_6px_16px_rgba(31,81,255,0.4)]
                                               hover:bg-blue-600
                                               active:scale-95
                                               transition-all duration-200
                                               cursor-pointer
                                               whitespace-nowrap"
                                >
                                    SUBMIT
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* --- CUSTOM ALERT 1: OTP SENT --- */}
            {showOtpAlert && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-[360px] p-6 text-center animate-in zoom-in-95 duration-200 relative overflow-hidden">
                        <div className="mx-auto w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4 relative">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center shadow-lg shadow-green-200">
                                <Check size={24} className="text-white stroke-[3]" />
                            </div>
                        </div>
                        <p className="text-slate-600 text-sm font-semibold mb-6">
                            OTP sent to your Registered Mobile number.
                        </p>
                        <button
                            onClick={handleOtpAlertConfirm}
                            className="w-full py-2.5 bg-[#2563EB] hover:bg-blue-600 text-white rounded-xl font-bold text-sm shadow-lg transition-all active:scale-[0.98]"
                        >
                            OK
                        </button>
                        <div className="mt-4 pt-3 border-t border-slate-50">
                            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">
                                Webel Online Services
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* --- CUSTOM ALERT 2: SUCCESS --- */}
            {showSuccessAlert && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-[360px] p-6 text-center animate-in zoom-in-95 duration-200 relative overflow-hidden">
                        <div className="mx-auto w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4 relative">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center shadow-lg shadow-green-200">
                                <Check size={24} className="text-white stroke-[3]" />
                            </div>
                        </div>
                        <p className="text-slate-600 text-sm font-semibold mb-6">
                            Successfully added as authorised person
                        </p>
                        <button
                            onClick={handleSuccessRedirect}
                            className="w-full py-2.5 bg-[#2563EB] hover:bg-blue-600 text-white rounded-xl font-bold text-sm shadow-lg transition-all active:scale-[0.98]"
                        >
                            OK
                        </button>
                        <div className="mt-4 pt-3 border-t border-slate-50">
                            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">
                                Webel Online Services
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VerifyOrgAuthorizedPerson;