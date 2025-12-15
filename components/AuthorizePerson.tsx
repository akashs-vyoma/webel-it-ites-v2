"use client"
import React, { useState } from 'react';
import { PhoneCall, KeyRound } from 'lucide-react';

const VerifyAuthorizedPerson: React.FC = () => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [secretKey, setSecretKey] = useState('');
    const [aadhaar, setAadhaar] = useState('');

    const handleVerify = () => {
        // Add your verification logic here
        alert("Verifying Details...");
    };

    return (
        <div className="w-full max-w-3xl rounded-b-xl bg-white shadow-xl rounded-lg overflow-hidden border border-gray-100 mt-10">
            {/* Header */}
            <div className="bg-[#4c4f95] px-6 py-4">
                <h2 className="text-white text-lg font-medium">Verify Authorised Person</h2>
            </div>

            {/* Form Content */}
            <div className="p-8 space-y-6">

                {/* Mobile Number Field */}
                <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">
                        Mobile Number on which the request was received
                    </label>
                    <div className="flex w-full rounded border border-gray-300 overflow-hidden h-11">
                        {/* Icon Prefix */}
                        <div className="bg-[#4c4f95] w-12 flex items-center justify-center text-white shrink-0">
                            <PhoneCall size={20} fill="currentColor" />
                        </div>
                        {/* Input */}
                        <input
                            type="text"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            className="flex-1 px-4 outline-none text-gray-700 placeholder-gray-300 font-medium"
                            placeholder="Authrised Person Mobile No."
                        />
                    </div>
                </div>

                {/* Secret Key Field */}
                <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">
                        Secret Key *
                    </label>
                    <div className="flex w-full rounded border border-gray-300 overflow-hidden h-11">
                        {/* Icon Prefix */}
                        <div className="bg-[#4c4f95] w-12 flex items-center justify-center text-white shrink-0">
                            <KeyRound size={20} fill="currentColor" />

                        </div>
                        {/* Input */}
                        <input
                            type="password"
                            value={secretKey}
                            onChange={(e) => setSecretKey(e.target.value)}
                            className="flex-1 px-4 outline-none text-gray-700 placeholder-gray-300 font-medium"
                            placeholder="Secret Key"
                        />
                    </div>
                </div>

                {/* Aadhaar Number Field */}
                <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">
                        Aadhaar Number
                    </label>
                    <div className="flex w-full rounded border border-gray-300 overflow-hidden h-11">
                        {/* Text Prefix Label */}
                        <div className="bg-[#4c4f95] px-5 flex items-center justify-center text-white shrink-0 text-sm font-medium">
                            Aadhaar
                        </div>

                        {/* Input */}
                        <input
                            type="text"
                            value={aadhaar}
                            onChange={(e) => setAadhaar(e.target.value)}
                            className="flex-1 px-4 outline-none text-gray-700 placeholder-gray-300 font-medium"
                            placeholder="Aadhaar Number"
                        />

                        {/* Verify Button */}
                        <button
                            onClick={handleVerify}
                            className="bg-[#4c4f95] hover:bg-[#3b3e7a] text-white px-8 font-medium text-sm transition-colors whitespace-nowrap"
                        >
                            Verify
                        </button>
                    </div>
                </div>

            </div>

            {/* Bottom Padding */}
            <div className="pb-6"></div>
        </div>
    );
};

export default VerifyAuthorizedPerson;