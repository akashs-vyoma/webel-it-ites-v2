"use client"
import React, { useState } from 'react';
import { PhoneCall, KeyRound, Fingerprint } from 'lucide-react';

const VerifyAuthorizedPerson: React.FC = () => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [secretKey, setSecretKey] = useState('');
    const [aadhaar, setAadhaar] = useState('');

    const handleVerify = () => {
        alert("Verifying Details...");
    };

    return (
        <div className="w-full max-w-[420px] mx-auto mt-8
                        bg-white
                        rounded-2xl
                        shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)]
                        border border-slate-100
                        overflow-hidden
                        font-sans">

            {/* Header */}
           
            <div className=" relative overflow-hidden px-6 pt-6 pb-2 bg-[#1F51FF]">
                
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
                                       focus:ring-4 focus:ring-[#1F51FF]/10"
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
                            type="password"
                            value={secretKey}
                            onChange={(e) => setSecretKey(e.target.value)}
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
                                       focus:ring-4 focus:ring-[#1F51FF]/10"
                        />
                    </div>
                </div>

                {/* Aadhaar */}
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
                            placeholder="Enter Aadhaar No."
                            className="flex-1 px-3 bg-transparent
                                       outline-none text-slate-800 font-medium
                                       placeholder:text-slate-400 text-sm h-full"
                        />

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
                                       whitespace-nowrap">
                            VERIFY
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default VerifyAuthorizedPerson;