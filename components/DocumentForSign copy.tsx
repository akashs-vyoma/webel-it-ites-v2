"use client"
import React, { useState } from 'react';
import { Folder, PhoneCall } from 'lucide-react';

const SignDocument: React.FC = () => {
    const [udin, setUdin] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleGenerateOtp = () => { 
        if (phoneNumber.length === 10) {
            alert(`OTP generated for ${phoneNumber}`);
        } else {
            alert("Please enter a valid 10-digit phone number");
        }
    };

    return (
        /* Added 'h-fit' to stop vertical stretching and adjusted width to prevent button cutoff */
        <div className="w-full max-w-3xl mx-auto mt-8 h-fit
                        bg-white/90 backdrop-blur
                        rounded-xl border border-slate-200
                        shadow-[0_10px_30px_rgba(0,0,0,0.08)]">


            {/* Header */}
            <div className="px-6 py-3 border-b border-slate-200
                            bg-[#1F51FF] rounded-t-xl">
                 <div className="absolute inset-0 gradient-shimmer pointer-events-none"></div>
                <h2 className="text-white text-base font-semibold tracking-wide">
                    Sign Document
                </h2>
            </div>

            {/* Content - Padding adjusted to be tight but readable */}
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    {/* UDIN */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-800">
                            UDIN<span className="text-red-500">*</span>
                        </label>

                        <div className="flex h-10 rounded-lg overflow-hidden
                                        border border-slate-300
                                        focus-within:border-[#1F51FF]
                                        focus-within:shadow-[0_0_0_2px_rgba(31,81,255,0.15)]
                                        transition">

                            <div className="w-10 flex items-center justify-center
                                            bg-slate-100 text-[#1F51FF]">
                                <Folder size={16} />
                            </div>

                            <input
                                type="text"
                                value={udin}
                                onChange={(e) => setUdin(e.target.value)}
                                placeholder="Enter UDIN number"
                                className="flex-1 px-3 text-slate-800
                                           placeholder-slate-600
                                           outline-none bg-transparent
                                           text-sm font-medium"
                            />
                        </div>
                    </div>

                    {/* Mobile Number */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-800">
                            Mobile Number (Request Received)
                            <span className="text-red-500">*</span>
                        </label>

                        <div className="flex h-10 rounded-lg overflow-hidden
                                        border border-slate-300
                                        focus-within:border-[#1F51FF]
                                        focus-within:shadow-[0_0_0_2px_rgba(31,81,255,0.15)]
                                        transition">

                       <div className="px-3 py-2 flex items-center justify-center 
                bg-slate-100 text-[#1F51FF] rounded-md">
  <PhoneCall size={16} />
</div>



                            <input
                                type="text"
                                value={phoneNumber}
                                onChange={(e) => {
                                    const val = e.target.value.replace(/\D/g, '');
                                    if (val.length <= 10) setPhoneNumber(val);
                                }}
                                placeholder="10-digit mobile number"
                                className="flex-1 px-3 text-slate-800
                                           placeholder-slate-600
                                           outline-none bg-transparent
                                           text-sm font-medium"
                            />
<button
  onClick={handleGenerateOtp}
  className="
    px-2 py-3
    text-xs font-bold
    bg-[#1F51FF] text-white
    rounded-md
    hover:opacity-90
    active:scale-[0.98]
    transition-all
    cursor-pointer
    whitespace-nowrap
    flex= items-center justify-center
  "
>
  Generate OTP
</button>


                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SignDocument;