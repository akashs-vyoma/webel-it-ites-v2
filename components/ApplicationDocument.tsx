"use client";
import React, { useRef, useState } from 'react';
import { PlusCircle, CheckCircle2, ChevronDown, Upload, Info } from 'lucide-react';

const DocumentUploadHeader: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            console.log("File ready for upload:", file.name);
        }
    };

    return (
        <div className="w-full font-sans h-fit shadow-lg rounded-xl overflow-hidden bg-white border border-slate-100">

            {/* --- Top Neon Blue Section (WITH SHIMMER) --- */}
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3">

                {/* Shimmer Effect */}
                <div className="absolute inset-0 gradient-shimmer pointer-events-none z-10"></div>

                <div className="relative z-20 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-7xl mx-auto">

                    {/* Application Type */}
                    <div className="flex flex-col gap-1 group">
                        <label className="text-blue-50 text-[11px] font-bold uppercase tracking-wider pl-1">
                            Application Type
                        </label>
                        <div className="relative">
                            <select className="w-full h-9 px-3 rounded-md bg-white text-slate-700 font-bold text-sm outline-none focus:ring-2 focus:ring-cyan-300 border border-transparent shadow-sm appearance-none cursor-pointer transition-shadow">
                                <option>Select Application Type</option>
                                <option>New License</option>
                                <option>Renewal</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                <ChevronDown className="w-4 h-4 text-slate-500" />
                            </div>
                        </div>
                    </div>

                    {/* Application No */}
                    <div className="flex flex-col gap-1 group">
                        <label className="text-blue-50 text-[11px] font-bold uppercase tracking-wider pl-1">
                            Application No
                        </label>
                        <div className="relative">
                            <select className="w-full h-9 px-3 rounded-md bg-white text-slate-700 font-bold text-sm outline-none focus:ring-2 focus:ring-cyan-300 border border-transparent shadow-sm appearance-none cursor-pointer transition-shadow">
                                <option>Select Application Number</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                <ChevronDown className="w-4 h-4 text-slate-500" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* --- Bottom Light Yellow Section --- */}
            <div className="bg-[#fcf8e3] px-6 py-3 border-t border-yellow-100">

                {/* Upload Action Bar */}
                <div
                    onClick={handleUploadClick}
                    className="bg-[#eec643] py-2 px-4 rounded-lg shadow-sm flex justify-between items-center cursor-pointer hover:bg-[#dcb538] transition-all group"
                >
                    <div className="flex items-center gap-2 text-black/80">
                        {selectedFile ? (
                            <>
                                <CheckCircle2 className="text-green-800" size={18} />
                                <span className="font-bold text-sm truncate">
                                    File Selected: {selectedFile.name}
                                </span>
                            </>
                        ) : (
                            <>
                                <span className="font-bold text-sm">
                                    Upload new document click on the
                                </span>
                                <PlusCircle className="inline" size={16} />
                                <span className="font-bold text-sm">
                                    Sign
                                </span>
                            </>
                        )}
                    </div>

                    <div className="bg-white rounded-full p-0.5 shadow-sm group-hover:scale-105 transition-transform duration-200">
                        <PlusCircle className="text-[#007bff]" size={20} />
                    </div>
                </div>

                {/* Hidden File Input */}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.jpg,.png,.doc,.docx"
                />

                {/* Instructions */}
                <div className="mt-2 flex gap-2 items-start text-[11px] text-slate-700 leading-tight">
                    <div className="shrink-0 mt-0.5">
                        <Info size={14} className="text-[#4c4f95]" />
                    </div>
                    <p>
                        <span className="font-bold text-black">Instruction:</span> Add Document with Application please select <span className="font-bold">Application Type</span> from the drop down, then select <span className="font-bold">Application Number</span>. All documents uploaded in UDIN for this type show on table. Add any document click on <span className="inline-flex items-center justify-center bg-[#4c4f95] text-white w-4 h-4 rounded-[2px] mx-0.5 align-middle"><PlusCircle size={10} /></span> button.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DocumentUploadHeader;
