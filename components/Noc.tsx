"use client";
import React, { useState } from 'react';
import { Eye, X, ChevronDown, FileText, Info } from 'lucide-react';

// --- OPTIONS DATA (Unchanged) ---
const applicationTypes = [
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

const NOCForm: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedType, setSelectedType] = useState(applicationTypes[0]);

    return (
        <>
            {/* Shimmer Animation Styles */}
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

            <div className="w-full font-sans h-fit shadow-lg rounded-xl overflow-hidden bg-white border border-slate-100">

                {/* --- HEADER: COMPACT NEON BLUE GRADIENT (Matched Size: py-3) --- */}
                <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3">
                    
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 gradient-shimmer pointer-events-none z-10"></div>

                    {/* Content */}
                    <div className="relative z-20">
                        {/* Title - Kept compact */}
                        <h2 className="text-white text-sm font-bold tracking-wide mb-2 flex items-center gap-2 opacity-90">
                            <FileText className="text-white" size={16} />
                            Application Details
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> 
                            
                            {/* Dropdown 1: Application Type */}
                            <div className="flex flex-col gap-1 group">
                                <label className="text-blue-50 text-[11px] font-bold uppercase tracking-wider pl-1">
                                    Application Type
                                </label>
                                <div className="relative">
                                    <select
                                        value={selectedType}
                                        onChange={(e) => setSelectedType(e.target.value)}
                                        className="w-full h-9 px-3 pr-8 rounded-md bg-white text-slate-700 font-bold text-sm outline-none focus:ring-2 focus:ring-cyan-300 border border-transparent shadow-sm appearance-none cursor-pointer transition-shadow"
                                    >
                                        {applicationTypes.map((type, index) => (
                                            <option key={index} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                        <ChevronDown className="w-4 h-4 text-slate-500" />
                                    </div>
                                </div>
                            </div>

                            {/* Dropdown 2: Application Number */}
                            <div className="flex flex-col gap-1 group">
                                <label className="text-blue-50 text-[11px] font-bold uppercase tracking-wider pl-1">
                                    Application Number
                                </label>
                                <div className="relative">
                                    <select className="w-full h-9 px-3 pr-8 rounded-md bg-white text-slate-700 font-bold text-sm outline-none focus:ring-2 focus:ring-cyan-300 border border-transparent shadow-sm appearance-none cursor-pointer transition-shadow">
                                        <option>Select Application Number</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                        <ChevronDown className="w-4 h-4 text-slate-500" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* --- FOOTER: LIGHT YELLOW INSTRUCTION (Matched Size: py-3) --- */}
                <div className="bg-[#fcf8e3] px-6 py-3 border-t border-yellow-100">
                    <div className="flex gap-2 items-start text-[11px] text-slate-700 leading-tight">
                        <div className="shrink-0 mt-0.5">
                            <Info size={14} className="text-[#4c4f95]" />
                        </div>
                        <p>
                            <span className="font-bold text-black">Instruction:</span> To Generate Declaration Letter please select <span className="font-bold text-black">Application Type</span> from the drop down, then select <span className="font-bold text-black">Application Number</span>. All documents with UDIN Number will show with pre-defined format. Check the letter and click on 
                            <button
                                onClick={() => setShowModal(true)}
                                className="font-bold text-blue-600 hover:text-blue-800 ml-1 cursor-pointer outline-none hover:underline underline-offset-2 transition-all"
                            >
                                "Generate & Upload"
                            </button> button.
                        </p>
                    </div>
                </div>

                {/* --- MODAL (Kept Logic, Styled Compactly) --- */}
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                        <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 border border-white/20">

                            {/* Modal Header */}
                            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4 flex justify-between items-center">
                                <h2 className="text-white text-base font-bold tracking-wide">
                                    Verify Aadhaar Number
                                </h2>
                                <button 
                                    onClick={() => setShowModal(false)} 
                                    className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-1 rounded-md transition-all"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6 space-y-6">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">
                                        Aadhaar Number <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex h-10 rounded-lg overflow-hidden shadow-sm border border-slate-300 focus-within:border-blue-500 transition-all duration-200">
                                        <div className="bg-slate-100 text-slate-600 border-r border-slate-300 px-4 flex items-center justify-center text-xs font-bold uppercase tracking-wider shrink-0">
                                            Aadhaar
                                        </div>
                                        <div className="relative flex-1 bg-white">
                                            <input
                                                type="text"
                                                placeholder="Enter Aadhaar Number"
                                                className="w-full h-full bg-transparent px-3 pr-10 text-sm font-semibold outline-none text-slate-800 placeholder:text-slate-400"
                                            />
                                            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors p-1">
                                                <Eye size={16} />
                                            </button>
                                        </div>
                                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 text-xs font-bold uppercase tracking-wide shrink-0 transition-all">
                                            Send OTP
                                        </button>
                                    </div>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                                    <div className="flex items-start gap-3">
                                        <input
                                            type="checkbox"
                                            id="aadhaar-consent"
                                            className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
                                        />
                                        <div className="text-[11px] text-slate-500 text-justify leading-relaxed font-medium">
                                            <label htmlFor="aadhaar-consent" className="cursor-pointer hover:text-slate-700 transition-colors">
                                                I hereby state that I have no objection in authenticating myself on Unique Document Identification Number (UDIN) portal with Aadhaar based authentication system.
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="p-4 border-t border-slate-100 flex justify-end bg-slate-50">
                                <button
                                    className="text-slate-600 hover:text-slate-900 bg-white border border-slate-300 hover:bg-slate-50 font-bold text-xs px-4 py-2 rounded-md transition-colors shadow-sm"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default NOCForm;