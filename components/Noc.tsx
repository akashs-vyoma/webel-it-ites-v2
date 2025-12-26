"use client";
import React, { useState } from 'react';
import { Eye, X, ChevronDown, FileText, Info } from 'lucide-react';

// --- OPTIONS DATA ---
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

const NOCForm: React.FC<{ isWizard?: boolean }> = ({ isWizard = false }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedType, setSelectedType] = useState(applicationTypes[0]);
    const [selectedNumber, setSelectedNumber] = useState("Select Application Number");

    // Logic to check if both are selected
    const isBothSelected = selectedType !== applicationTypes[0] && selectedNumber !== "Select Application Number";

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
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 10px;
                }
            `}</style>

            <div className="w-full font-sans h-fit shadow-lg rounded-xl overflow-hidden bg-white border border-slate-100">

                {/* --- HEADER: COMPACT NEON BLUE GRADIENT --- */}
                <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 px-6 py-3">
                    <div className="absolute inset-0 gradient-shimmer pointer-events-none z-10"></div>
                    <div className="relative z-20">
                        <h2 className="text-white text-sm font-bold tracking-wide mb-2 flex items-center gap-2 opacity-90">
                            <FileText className="text-white" size={16} />
                            Application Details
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                            <option key={index} value={type}>{type}</option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                        <ChevronDown className="w-4 h-4 text-slate-500" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1 group">
                                <label className="text-blue-50 text-[11px] font-bold uppercase tracking-wider pl-1">
                                    Application Number
                                </label>
                                <div className="relative">
                                    <select
                                        value={selectedNumber}
                                        onChange={(e) => setSelectedNumber(e.target.value)}
                                        className="w-full h-9 px-3 pr-8 rounded-md bg-white text-slate-700 font-bold text-sm outline-none focus:ring-2 focus:ring-cyan-300 border border-transparent shadow-sm appearance-none cursor-pointer transition-shadow"
                                    >
                                        <option>Select Application Number</option>
                                        <option value="AP/DPRITVET/643/20251222071220">AP/DPRITVET/643/20251222071220</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                        <ChevronDown className="w-4 h-4 text-slate-500" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- INSTRUCTION --- */}
                <div className="bg-[#fcf8e3] px-6 py-3 border-t border-yellow-100">
                    <div className="flex gap-2 items-start text-[11px] text-slate-700 leading-tight">
                        <div className="shrink-0 mt-0.5"><Info size={14} className="text-blue-700" /></div>
                        <p>
                            <span className="font-bold text-black">Instruction:</span> To Generate Declaration Letter please select <span className="font-bold text-black">Application Type</span> from the drop down, then select <span className="font-bold text-black">Application Number</span>. All documents with UDIN Number will show with pre-defined format. Check the letter and click on "Generate & Upload" button.
                        </p>
                    </div>
                </div>

                {/* --- CONDITIONAL LETTER CONTENT --- */}
                {isBothSelected && (
                    <div className="p-4 bg-slate-50 animate-in fade-in slide-in-from-top-2 duration-500">
                        <div className="bg-white border-2 border-blue-700 rounded-lg shadow-inner overflow-hidden">

                            {/* Letter Header - UPDATED COLOR TO MATCH SELECTION HEADER */}
                            <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 py-2 text-center relative overflow-hidden">
                                <div className="absolute inset-0 gradient-shimmer pointer-events-none opacity-30"></div>
                                <h3 className="text-white text-xs font-bold uppercase tracking-widest relative z-10">NOC Declaration Letter</h3>
                            </div>

                            {/* Letter Content (Scrollable) */}
                            <div className="p-8 max-h-[500px] overflow-y-auto text-[13px] text-slate-800 leading-relaxed custom-scrollbar">
                                <div className="space-y-6">
                                    <p className="font-semibold">Date: {new Date().toISOString().split('T')[0]} {new Date().toLocaleTimeString()}</p>
                                    <p><span className="font-bold">Subject:</span> <span className="underline italic">Declaration Letter for {selectedType}, Application Number: {selectedNumber}</span></p>

                                    <p>Respected Sir,</p>

                                    <p>I am authorized representative of Company <span className="font-bold uppercase">VYOMA INNOVUS GLOBAL PRIVATE LIMITED</span>, hereby submits the following documents (as indicated by UDIN numbers) for {selectedType}.</p>

                                    {/* Document Table */}
                                    <div className="w-64 border rounded-md overflow-hidden">
                                        <div className="flex bg-blue-700 text-white text-[10px] font-bold py-1 px-3">
                                            <div className="flex-1 border-r border-white/20">Document Type</div>
                                            <div className="flex-1 pl-3">Udin Number</div>
                                        </div>
                                        <div className="flex py-2 px-3 border-b text-[11px]">
                                            <div className="flex-1 font-bold">Project Report</div>
                                            <div className="flex-1 pl-3 font-medium">24-C-CA001176-P-1704179071921</div>
                                        </div>
                                        <div className="flex py-2 px-3 text-[11px]">
                                            <div className="flex-1 font-bold">Project Report</div>
                                            <div className="flex-1 pl-3 font-medium">24-C-CA001176-P-1704286132845</div>
                                        </div>
                                    </div>

                                    <p className="text-justify">On behalf as duly authorised & having competence to do so on behalf of <span className="font-bold">VYOMA INNOVUS GLOBAL PRIVATE LIMITED</span>, I declare that the Project Report as submitted above, is covered under IT & ITeS activities as notified by IT&E dept. vide notification 845-IT/O/117/2013 dated 12.7.2023 (UDIN: <span className="font-bold">23-GCA001177-O-1692009699994</span>). I shall indemnify and hold the state harmless, including all associated costs in case of any miss-representation.</p>

                                    <p>I also understand that any kind of miss-representation will invite legal action as per law.</p>

                                    <div className="pt-4">
                                        <p className="font-bold uppercase underline">DEBISWARI BAG</p>
                                    </div>
                                </div>
                            </div>

                            {/* Letter Footer Action - UPDATED COLOR */}
                            {!isWizard && <div className="bg-slate-50 p-3 border-t flex justify-end">
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded text-xs font-bold transition-all shadow-md active:scale-95"
                                >
                                    Verify Aadhaar
                                </button>
                            </div>}
                        </div>
                    </div>
                )}

                {/* --- MODAL --- */}
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                        <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-white/20">
                            <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 px-6 py-4 flex justify-between items-center relative overflow-hidden">
                                <div className="absolute inset-0 gradient-shimmer pointer-events-none z-10 opacity-30"></div>
                                <h2 className="text-white text-base font-bold tracking-wide relative z-20">Verify Aadhaar Number</h2>
                                <button onClick={() => setShowModal(false)} className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-1 rounded-md relative z-20 transition-all"><X size={18} /></button>
                            </div>
                            <div className="p-6 space-y-6">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Aadhaar Number <span className="text-red-500">*</span></label>
                                    <div className="flex h-10 rounded-lg overflow-hidden shadow-sm border border-slate-300 focus-within:border-blue-500 transition-all">
                                        <div className="bg-slate-100 text-slate-600 border-r border-slate-300 px-4 flex items-center text-xs font-bold shrink-0">Aadhaar</div>
                                        <div className="relative flex-1 bg-white">
                                            <input type="text" placeholder="Enter Aadhaar Number" className="w-full h-full px-3 text-sm font-semibold outline-none" />
                                            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"><Eye size={16} /></button>
                                        </div>
                                        <button className="bg-blue-700 hover:bg-blue-800 text-white px-5 text-xs font-bold uppercase shrink-0 transition-all">Send OTP</button>
                                    </div>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                                    <div className="flex items-start gap-3">
                                        <input type="checkbox" id="aadhaar-consent" className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                                        <div className="text-[11px] text-slate-500 text-justify leading-relaxed font-medium">
                                            <label htmlFor="aadhaar-consent" className="cursor-pointer">I hereby state that I have no objection in authenticating myself on Unique Document Identification Number (UDIN) portal with Aadhaar based authentication system.</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 border-t border-slate-100 flex justify-end bg-slate-50">
                                <button className="text-slate-600 hover:text-slate-900 bg-white border border-slate-300 font-bold text-xs px-4 py-2 rounded-md transition-colors" onClick={() => setShowModal(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default NOCForm;