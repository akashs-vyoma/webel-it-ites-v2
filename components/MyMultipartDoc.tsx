"use client";
import React, { useState } from 'react';
import { FileSignature } from 'lucide-react';

const MultiPartyDeclaration: React.FC = () => {
    const [appType, setAppType] = useState("Select Application Type");
    const [appNumber, setAppNumber] = useState("Select Application Number");

    // Options from your request
    const applicationTypeOptions = [
        "Select Application Type",
        "DPR of IT & ITeS - vetting - MULTIPARTY",
        "NOC for Renting Out Leased property - MULTIPARTY",
        "Certificate for Tax Exemption - MULTIPARTY",
        "Renewal of NOC Renting out Leased Property - MULTI PARTY"
    ];

    return (
        <div className="w-full max-w-7xl mx-auto p-4 font-sans">

            {/* Main Container with rounded corners and shadow */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">

                {/* Purple Header Background */}
                <div className="bg-[#484595] p-6 pb-8">

                    {/* Title Section */}
                    <div className="flex items-center justify-center gap-2 text-white mb-6">
                        <FileSignature className="w-6 h-6" />
                        <h1 className="text-2xl font-normal tracking-wide">
                            Multi Party Declaration
                        </h1>
                    </div>

                    {/* Dropdowns Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2 md:px-6">

                        {/* 1. Application Type Dropdown */}
                        <div className="relative">
                            <select
                                value={appType}
                                onChange={(e) => setAppType(e.target.value)}
                                className="w-full appearance-none bg-white text-black font-bold text-sm py-3 px-4 rounded-md outline-none focus:ring-2 focus:ring-blue-300 shadow-sm cursor-pointer"
                            >
                                {applicationTypeOptions.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>

                            {/* Custom Chevron Arrow */}
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-black">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                        {/* 2. Application Number Dropdown */}
                        <div className="relative">
                            <select
                                value={appNumber}
                                onChange={(e) => setAppNumber(e.target.value)}
                                className="w-full appearance-none bg-white text-black font-bold text-sm py-3 px-4 rounded-md outline-none focus:ring-2 focus:ring-blue-300 shadow-sm cursor-pointer"
                            >
                                <option>Select Application Number</option>
                                {/* Add dynamic numbers here later */}
                            </select>

                            {/* Custom Chevron Arrow */}
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-black">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Optional: White body area below to match the rounded shadow look */}
                <div className="h-4 bg-white"></div>
            </div>
        </div>
    );
};

export default MultiPartyDeclaration;