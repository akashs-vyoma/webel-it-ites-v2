"use client"
import React, { useState } from 'react'
import { useRouter } from "next/navigation";

const OrganisationRegByGSTIN = () => {
    const [gstNumber, setGstNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const router = useRouter();

    // Logic to simulate sending OTP
    const handleVerifyGst = () => {
        if (gstNumber.length > 5) { // Basic mock validation
            setOtpSent(true);
            // In a real app, API call goes here
        } else {
            alert("Please enter a valid GSTN");
        }
    };

    // Logic to reset if user wants to change GST
    const handleChangeGst = () => {
        setOtpSent(false);
        setOtp('');
    };

    // Logic to Verify OTP and Login
    const handleLogin = () => {
        if (otp.length > 0) {
            if (typeof window !== 'undefined') {
                localStorage.setItem("role", "company");
                localStorage.setItem("gstin", gstNumber);
                localStorage.setItem("isLogin", "1");
            }
            router.push("/company-dashboard");
        } else {
            alert("Please enter the OTP");
        }
    };

    return (
        <div className="border border-gray-200 p-6 mb-4 rounded-sm">
            {/* GSTN Section */}
            <label className="block text-xs font-bold text-gray-800 mb-1">
                Organisation's GSTN Number <span className="text-red-500">*</span> (ex. ABCTY1234D)
            </label>

            {/* GSTN Input Group */}
            <div className="flex w-full mb-3 h-9">
                {/* GSTN Prefix Label */}
                <div className="bg-[#1F51FF] text-white text-xs flex items-center px-4 font-medium rounded-l-sm">
                    GSTN
                </div>
                {/* Input Field */}
                <input
                    type="text"
                    value={gstNumber}
                    onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
                    disabled={otpSent}
                    placeholder="Organisation's GSTN Number"
                    className={`flex-1 border-y border-r border-gray-300 px-3 text-xs focus:outline-none focus:border-[#5b5fa3] transition-colors ${otpSent ? 'bg-gray-50 text-gray-500' : ''}`}
                />
                {/* Verify Button (Changes to 'Change' if OTP sent) */}
                <button 
                    onClick={otpSent ? handleChangeGst : handleVerifyGst}
                    className="bg-[#ffc107] hover:bg-yellow-500 text-black text-xs font-bold px-5 transition-colors rounded-r-sm min-w-[100px]"
                >
                    {otpSent ? "Change" : "Verify GSTN"}
                </button>
            </div>

            {/* OTP Section - Appears only when otpSent is true */}
            {otpSent && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300 mb-3">
                     <label className="block text-xs font-bold text-gray-800 mb-1 mt-3">
                        Enter OTP <span className="text-red-500">*</span>
                    </label>
                    <div className="flex w-full h-9">
                        {/* OTP Prefix Label (Reusing your exact style) */}
                        <div className="bg-[#1F51FF] text-white text-xs flex items-center px-4 font-medium rounded-l-sm">
                            OTP
                        </div>
                        {/* OTP Input Field (Reusing your exact style) */}
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter 6-digit OTP"
                            className="flex-1 border-y border-r border-gray-300 px-3 text-xs focus:outline-none focus:border-[#5b5fa3] transition-colors tracking-widest"
                        />
                        {/* Login Button (Reusing your exact style) */}
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

            {/* Consent Checkbox */}
            <div className="flex items-start gap-2 mt-4">
                <input type="checkbox" className="mt-0.5 h-3 w-3 border-blue-300 rounded text-blue-600 focus:ring-blue-500" />
                <span className="text-[11px] text-gray-600">
                    I give my consent to UDIN to use my PAN number & OTP to verify identity of the organisation
                </span>
            </div>
        </div>
    )
}

export default OrganisationRegByGSTIN