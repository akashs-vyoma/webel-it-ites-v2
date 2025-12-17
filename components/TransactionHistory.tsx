"use client";
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const ApplicationTypeHeader: React.FC = () => {
    const [appType, setAppType] = useState("Select Application Type");
    const [appNumber, setAppNumber] = useState("Select Application Number");

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

            {/* Main Container - Neon Gradient Background */}
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-500 p-6 rounded-lg shadow-xl">

                {/* SHIMMER OVERLAY */}
                <div className="absolute inset-0 gradient-shimmer pointer-events-none"></div>

                {/* CONTENT */}
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1600px] mx-auto">

                    {/* Field 1: Application Type */}
                    <div className="flex flex-col gap-2">
                        <label className="text-white text-base font-medium tracking-wide">
                            Application Type
                        </label>
                        <div className="relative">
                            <select
                                value={appType}
                                onChange={(e) => setAppType(e.target.value)}
                                className="w-full h-10 px-3 pr-10 rounded-lg bg-white text-slate-700 font-bold text-sm outline-none focus:ring-4 focus:ring-cyan-400/30 appearance-none shadow-md cursor-pointer truncate transition-shadow"
                            >
                                {applicationTypeOptions.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>

                            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                                <ChevronDown className="w-4 h-4 text-slate-500" />
                            </div>
                        </div>
                    </div>

                    {/* Field 2: Application No */}
                    <div className="flex flex-col gap-2">
                        <label className="text-white text-base font-medium tracking-wide">
                            Application No
                        </label>
                        <div className="relative">
                            <select
                                value={appNumber}
                                onChange={(e) => setAppNumber(e.target.value)}
                                className="w-full h-10 px-3 pr-10 rounded-lg bg-white text-slate-700 font-bold text-sm outline-none focus:ring-4 focus:ring-cyan-400/30 appearance-none shadow-md cursor-pointer transition-shadow"
                            >
                                <option>Select Application Number</option>
                            </select>

                            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                                <ChevronDown className="w-4 h-4 text-slate-500" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ApplicationTypeHeader;
