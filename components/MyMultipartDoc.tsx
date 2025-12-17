"use client";
import React, { useState } from 'react';
import { FileSignature, ChevronDown } from 'lucide-react';

const MultiPartyDeclaration: React.FC = () => {
    const [appType, setAppType] = useState("Select Application Type");
    const [appNumber, setAppNumber] = useState("Select Application Number");

    const applicationTypeOptions = [
        "Select Application Type",
        "DPR of IT & ITeS - vetting - MULTIPARTY",
        "NOC for Renting Out Leased property - MULTIPARTY",
        "Certificate for Tax Exemption - MULTIPARTY",
        "Renewal of NOC Renting out Leased Property - MULTI PARTY"
    ];

    return (
        <>
            {/* Shimmer Animation Styles (From Reference) */}
            <style jsx global>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .gradient-shimmer {
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                    animation: shimmer 3s infinite;
                }
            `}</style>

            <div className="w-full max-w-7xl mx-auto font-sans h-fit">

                {/* Main Container - Matched Shadow & Border */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-100">

                    {/* Header - Matched Compact Padding (py-3) & Gradient */}
                    <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3">

                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 gradient-shimmer pointer-events-none z-10"></div>

                        <div className="relative z-20">
                            
                            {/* Title - Matched Size (text-sm) & Alignment */}
                          <div className="flex items-center justify-center gap-2 text-white mb-2 opacity-95 text-center">
    <FileSignature className="w-4 h-4 text-white" />
    <h1 className="text-sm font-bold tracking-wide">
        Multi Party Declaration
    </h1>
</div>


                            {/* Dropdowns Grid - Matched Gap & Input Height */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                {/* 1. Application Type Dropdown */}
                                <div className="flex flex-col gap-1 group">
                                    <label className="text-blue-50 text-[11px] font-bold uppercase tracking-wider pl-1">
                                        Application Type
                                    </label>
                                    <div className="relative">
                                        {/* Height matched to h-9 (36px) */}
                                        <select
                                            value={appType}
                                            onChange={(e) => setAppType(e.target.value)}
                                            className="w-full h-9 px-3 pr-8 rounded-md bg-white text-slate-700 font-bold text-sm outline-none focus:ring-2 focus:ring-cyan-300 border border-transparent shadow-sm appearance-none cursor-pointer transition-shadow"
                                        >
                                            {applicationTypeOptions.map((option, index) => (
                                                <option key={index} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>

                                        {/* Custom Chevron Arrow */}
                                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-500">
                                            <ChevronDown className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>

                                {/* 2. Application Number Dropdown */}
                                <div className="flex flex-col gap-1 group">
                                    <label className="text-blue-50 text-[11px] font-bold uppercase tracking-wider pl-1">
                                        Application Number
                                    </label>
                                    <div className="relative">
                                        {/* Height matched to h-9 (36px) */}
                                        <select
                                            value={appNumber}
                                            onChange={(e) => setAppNumber(e.target.value)}
                                            className="w-full h-9 px-3 pr-8 rounded-md bg-white text-slate-700 font-bold text-sm outline-none focus:ring-2 focus:ring-cyan-300 border border-transparent shadow-sm appearance-none cursor-pointer transition-shadow"
                                        >
                                            <option>Select Application Number</option>
                                            {/* Add dynamic numbers here later */}
                                        </select>

                                        {/* Custom Chevron Arrow */}
                                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-500">
                                            <ChevronDown className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MultiPartyDeclaration;