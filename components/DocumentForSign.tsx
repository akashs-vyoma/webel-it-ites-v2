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

        <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200 mt-10">
            {/* Header */}
            <div className="bg-[#4c4f95] px-6 py-4">
                <h2 className="text-white text-lg font-medium">Sign Document</h2>
            </div>

            {/* Form Content - Changed p-8 to specific padding to reduce bottom whitespace */}
            <div className="px-8 pt-8 pb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* UDIN Field */}
                    <div className="flex flex-col">
                        <label className="block text-sm font-bold text-gray-800 mb-2">
                            UDIN*
                        </label>
                        <div className="flex w-full rounded border border-gray-300 overflow-hidden h-11">
                            {/* Icon Prefix */}
                            <div className="bg-[#4c4f95] w-12 flex items-center justify-center text-white shrink-0">
                                <Folder size={20} fill="currentColor" />
                            </div>
                            {/* Input */}
                            <input
                                type="text"
                                value={udin}
                                onChange={(e) => setUdin(e.target.value)}
                                className="flex-1 px-4 py-2 outline-none text-gray-700 placeholder-gray-400 font-medium"
                                placeholder="UDIN Number"
                            />
                        </div>
                    </div>

                    {/* Mobile Number Field */}
                    <div className="flex flex-col">
                        <label className="block text-sm font-bold text-gray-800 mb-2">
                            Mobile Number on which the request was recieved*
                        </label>
                        <div className="flex w-full rounded rounded-r-xl border border-gray-300 overflow-hidden h-11">
                            {/* Icon Prefix */}
                            <div className="bg-[#4c4f95] w-12 flex items-center justify-center text-white shrink-0">
                                <PhoneCall size={20} fill="currentColor" />
                            </div>
                            {/* Input */}
                            <input
                                type="text"
                                value={phoneNumber}
                                onChange={(e) => {
                                    const val = e.target.value.replace(/\D/g, '');
                                    if (val.length <= 10) setPhoneNumber(val);
                                }}
                                className="flex-1 px-4 py-2 outline-none text-gray-700 placeholder-gray-400 font-medium"
                                placeholder="Mobile Number"
                            />
                            {/* Generate OTP Button */}
                            <button
                                onClick={handleGenerateOtp}
                                className="bg-[#4c4f95] hover:bg-[#3b3e7a] text-white px-6 font-medium text-sm rounded-r-xl transition-colors whitespace-nowrap"
                            >
                                Generate OTP
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            {/* Empty div for bottom spacing removed completely */}
        </div>
    );
};

export default SignDocument;