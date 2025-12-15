import React, { useState } from 'react';
import { Eye, X } from 'lucide-react';

// --- OPTIONS DATA (From Screenshot 2) ---
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

const ApplicationForm: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedType, setSelectedType] = useState(applicationTypes[0]);

    return (
        <div className="w-full font-sans shadow-md bg-white">

            {/* --- 1. PURPLE HEADER SECTION --- */}
            <div className="bg-[#484595] p-6 rounded-t-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">

                    {/* Dropdown 1: Application Type */}
                    <div className="w-full">
                        <div className="relative">
                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className="w-full h-10 px-3 rounded-md bg-white text-black font-bold text-sm outline-none focus:ring-2 focus:ring-blue-300 appearance-none shadow-sm cursor-pointer"
                            >
                                {applicationTypes.map((type, index) => (
                                    <option key={index} value={type} className="py-1">
                                        {type}
                                    </option>
                                ))}
                            </select>
                            {/* Custom Arrow */}
                            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                                <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </div>

                    {/* Dropdown 2: Application Number */}
                    <div className="w-full">
                        <div className="relative">
                            <select className="w-full h-10 px-3 rounded-md bg-white text-black font-bold text-sm outline-none focus:ring-2 focus:ring-blue-300 appearance-none shadow-sm cursor-pointer">
                                <option>Select Application Number</option>
                                {/* Add dynamic numbers here if needed */}
                            </select>
                            {/* Custom Arrow */}
                            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                                <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* --- 2. YELLOW INSTRUCTION SECTION --- */}
            <div className="bg-[#F8EABB] p-4 rounded-b-sm border-t border-white/10">
                <p className="text-xs text-[#333] leading-relaxed">
                    <span className="font-bold">Instruction:</span> To Generate Declaration Letter please select <span className="font-bold">Application Type</span> from the drop down, then select Application Number. all documents with UDIN Number will show with pre defined format. Check the letter and click on
                    {/* LINK TO OPEN MODAL */}
                    <button
                        onClick={() => setShowModal(true)}
                        className="font-bold underline text-black hover:text-blue-700 ml-1 cursor-pointer outline-none"
                    >
                        "Generate & Upload"
                    </button> button
                </p>
            </div>

            {/* --- 3. MODAL (From your provided code) --- */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">

                        {/* Modal Header */}
                        <div className="bg-[#4c4f95] p-5 flex justify-between items-center">
                            <h2 className="text-white text-lg font-normal">Verify your Aadhaar Number</h2>
                            <button onClick={() => setShowModal(false)} className="text-white/80 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 space-y-6">

                            {/* Aadhaar Input Group */}
                            <div>
                                <label className="block text-sm font-bold text-gray-800 mb-2">
                                    Aadhaar Number <span className="text-red-500">*</span>
                                </label>

                                <div className="flex h-10 rounded-md overflow-hidden shadow-sm border border-gray-300">
                                    {/* Left Label */}
                                    <div className="bg-[#4c4f95] text-white px-4 flex items-center justify-center text-sm font-medium shrink-0">
                                        Aadhaar
                                    </div>

                                    {/* Input Field with Eye Icon */}
                                    <div className="relative flex-1 bg-[#e9ecef]">
                                        <input
                                            type="text"
                                            placeholder="Aadhaar Number"
                                            className="w-full h-full bg-[#e9ecef] px-3 pr-10 text-sm outline-none text-gray-700 placeholder-gray-400"
                                        />
                                        <button className="absolute right-2 top-1/2 -translate-y-1/2 text-[#4c4f95] hover:text-blue-800">
                                            <Eye size={18} />
                                        </button>
                                    </div>

                                    {/* Send OTP Button */}
                                    <button className="bg-[#4c4f95] hover:bg-[#3b3d73] text-white px-5 text-sm font-medium shrink-0 transition-colors">
                                        Send OTP
                                    </button>
                                </div>
                            </div>

                            {/* Consent Checkbox */}
                            <div className="flex items-start gap-3">
                                <input
                                    type="checkbox"
                                    id="aadhaar-consent"
                                    className="mt-1 h-4 w-4 rounded border-gray-400 text-[#4c4f95] focus:ring-[#4c4f95] cursor-pointer"
                                />
                                <div className="text-xs text-gray-600 text-justify leading-relaxed">
                                    <label htmlFor="aadhaar-consent" className="cursor-pointer">
                                        I hereby state that I have no objection in authenticating myself on Unique Document Identification Number (UDIN) portal * with Aadhaar based authentication system and *give my consent to providing my Aadhaar number, Biometric and/or One-Time Password (OTP) data for
                                    </label>
                                    <a href="#" className="text-blue-500 hover:underline text-xs block mt-1 font-medium">
                                        Read More
                                    </a>
                                </div>
                            </div>

                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 border-t border-gray-200 flex justify-center bg-gray-50">
                            <button
                                className="bg-[#4c4f95] hover:bg-[#3b3d73] text-white px-12 py-2 rounded-lg font-medium transition-colors text-sm shadow-sm"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
};

export default ApplicationForm;