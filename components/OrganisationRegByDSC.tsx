"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const OrganisationRegistrationDSC = () => {
    const [panNumber, setPanNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const router = useRouter();

    // Logic 1: Simulate checking PAN and sending OTP
    const handleVerifyPan = () => {
        if (panNumber.length >= 10) { // Basic length check for mock
            setOtpSent(true);
        } else {
            alert("Please enter a valid 10-digit PAN Number");
        }
    };

    // Logic 2: Reset if user wants to edit PAN
    const handleChangePan = () => {
        setOtpSent(false);
        setOtp('');
    };

    // Logic 3: Verify OTP and Redirect
    const handleLogin = () => {
        if (otp.length > 0) {
            if (typeof window !== 'undefined') {
                localStorage.setItem("role", "company");
                localStorage.setItem("authMethod", "dsc");
                localStorage.setItem("isLogin", "1");
            }
            router.push("/company-dashboard");
        } else {
            alert("Please enter the OTP");
        }
    };

    return (
        <div className="border border-gray-200 p-6 mb-4 rounded-sm">

            {/* DSC Specific Instruction */}
            <div className="text-xs text-gray-800 font-bold mb-5">
                ** Please install DSC driver from <a href="#" className="text-blue-600 hover:underline">Web eID</a>
            </div>

            {/* Input Label */}
            <label className="block text-xs font-bold text-gray-800 mb-1">
                Organisation's PAN Number <span className="text-red-500">*</span> (ex. ABCTY1234D)
            </label>

            {/* PAN Input Group */}
            <div className="flex w-full mb-3 h-9">
                {/* PAN Prefix */}
                <div className="bg-[#1F51FF] text-white text-xs flex items-center px-4 font-medium rounded-l-sm">
                    PAN
                </div>
                {/* Input Field */}
                <input
                    type="text"
                    value={panNumber}
                    onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                    disabled={otpSent}
                    placeholder="Organisation's PAN Number"
                    className={`flex-1 border-y border-r border-gray-300 px-3 text-xs text-gray-600 placeholder-gray-300 focus:outline-none focus:border-[#483EA8] transition-colors ${otpSent ? 'bg-gray-50' : ''}`}
                />
                {/* Verify Button (Toggles between Verify and Change) */}
                <button 
                    onClick={otpSent ? handleChangePan : handleVerifyPan}
                    className="bg-[#ffc107] hover:bg-yellow-500 text-black text-xs font-bold px-5 transition-colors rounded-r-sm min-w-[100px]"
                >
                    {otpSent ? "Change" : "Verify PAN"}
                </button>
            </div>

            {/* OTP Section - Appears only when otpSent is true */}
            {otpSent && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300 mb-3">
                     <label className="block text-xs font-bold text-gray-800 mb-1 mt-3">
                        Enter OTP <span className="text-red-500">*</span>
                    </label>
                    <div className="flex w-full h-9">
                        {/* OTP Prefix (Reusing your style) */}
                        <div className="bg-[#1F51FF] text-white text-xs flex items-center px-4 font-medium rounded-l-sm">
                            OTP
                        </div>
                        {/* OTP Input (Reusing your style) */}
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter 6-digit OTP"
                            className="flex-1 border-y border-r border-gray-300 px-3 text-xs text-gray-600 placeholder-gray-300 focus:outline-none focus:border-[#483EA8] transition-colors tracking-widest"
                        />
                        {/* Login Button (Reusing your style) */}
                        <button 
                            onClick={handleLogin}
                            className="bg-[#ffc107] hover:bg-yellow-500 text-black text-xs font-bold px-5 transition-colors rounded-r-sm min-w-[100px]"
                        >
                            Login
                        </button>
                    </div>
                    <div className="text-[10px] text-green-600 text-right mt-1 font-medium">
                        OTP sent successfully to registered mobile
                    </div>
                </div>
            )}

            {/* Consent Text */}
             <div className="flex items-start gap-2 mt-4">
                <input type="checkbox" className="mt-0.5 h-3 w-3 border-blue-300 rounded text-blue-600 focus:ring-blue-500" />
                <span className="text-[11px] text-gray-600">
                    I give my consent to UDIN to use my PAN number & OTP to verify identity of the organisation
                </span>
            </div>
        </div>
    );
};

export default OrganisationRegistrationDSC;