"use client";
import React, { useState } from 'react';

const ApplicationTypeHeader: React.FC = () => {
    const [appType, setAppType] = useState("Select Application Type");
    const [appNumber, setAppNumber] = useState("Select Application Number");

    // Exact options from your second screenshot
    const applicationTypeOptions = [
        "Select Application Type",
        "DPR of IT & ITeS - Vetting - SINGLE PARTY",
        "NOC for Renting Out Leased property - SINGLE PARTY",
        "Certificate for Tax Exemption - SINGLE PARTY",
        "DPR of IT & ITeS - vetting - MULTIPARTY",
        "NOC for Renting Out Leased property - MULTIPARTY",
        "Certificate for Tax Exemption - MULTIPARTY",
        "Renewal of NOC Renting out Leased Property - SINGLE PARTY",
        "Renewal of NOC Renting out Leased Property - MULTI PARTY"
    ];

    return (
        <div className="w-full font-sans">

            {/* Main Purple Container */}
            <div className="bg-[#484595] p-6 rounded-md shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1600px] mx-auto">

                    {/* Field 1: Application Type */}
                    <div className="flex flex-col gap-2">
                        <label className="text-white text-base font-normal">
                            Application Type
                        </label>
                        <div className="relative">
                            <select
                                value={appType}
                                onChange={(e) => setAppType(e.target.value)}
                                className="w-full h-10 px-3 pr-10 rounded-sm bg-white text-black font-bold text-sm outline-none focus:ring-2 focus:ring-blue-300 appearance-none shadow-sm cursor-pointer truncate"
                            >
                                {applicationTypeOptions.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>

                            {/* Custom Chevron Arrow (CSS-only for cleanliness) */}
                            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                                <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Field 2: Application No */}
                    <div className="flex flex-col gap-2">
                        <label className="text-white text-base font-normal">
                            Application No
                        </label>
                        <div className="relative">
                            <select
                                value={appNumber}
                                onChange={(e) => setAppNumber(e.target.value)}
                                className="w-full h-10 px-3 pr-10 rounded-sm bg-white text-black font-bold text-sm outline-none focus:ring-2 focus:ring-blue-300 appearance-none shadow-sm cursor-pointer"
                            >
                                <option>Select Application Number</option>
                                {/* You can add dynamic numbers here later */}
                            </select>

                            {/* Custom Chevron Arrow */}
                            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                                <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ApplicationTypeHeader;