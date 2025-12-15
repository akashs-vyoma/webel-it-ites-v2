"use client";
import React, { useRef, useState } from 'react';

import { PlusCircle, FileText, CheckCircle2 } from 'lucide-react';

const DocumentUploadHeader: React.FC = () => {
    // State to manage selected file
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // Ref for the hidden file input
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Function to trigger file dialog
    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    // Function to handle file selection
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            // Optional: Logic to send file to server would go here
            console.log("File ready for upload:", file.name);
        }
    };

    return (
        <div className="w-full font-sans">
            {/* --- Top Purple Section --- */}
            <div className="bg-[#484595] p-5 rounded-t-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">

                    {/* Application Type */}
                    <div className="flex flex-col gap-2">
                        <label className="text-white text-lg font-normal">
                            Application Type
                        </label>
                        <div className="relative">
                            <select className="w-full p-3 rounded-md bg-white text-black font-bold text-sm outline-none focus:ring-2 focus:ring-blue-300 appearance-none">
                                <option>Select Application Type</option>
                                <option>New License</option>
                                <option>Renewal</option>
                            </select>
                            {/* Custom Dropdown Arrow (CSS generic arrow replacement) */}
                            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                                <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </div>

                    {/* Application No */}
                    <div className="flex flex-col gap-2">
                        <label className="text-white text-lg font-normal">
                            Application No
                        </label>
                        <div className="relative">
                            <select className="w-full p-3 rounded-md bg-white text-black font-bold text-sm outline-none focus:ring-2 focus:ring-blue-300 appearance-none">
                                <option>Select Application Number</option>
                                {/* Add options dynamically here */}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                                <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* --- Bottom Yellow Section --- */}
            <div className="bg-[#F2E4C3] p-5 rounded-b-sm border-t border-white/20">

                {/* Upload Action Bar */}
                <div
                    onClick={handleUploadClick}
                    className="bg-[#D6BC70] p-4 flex justify-between items-center cursor-pointer hover:bg-[#c9af66] transition-colors rounded-sm group"
                >
                    <div className="flex items-center gap-2">
                        {selectedFile ? (
                            // Show this if file is selected
                            <>
                                <CheckCircle2 className="text-green-700" size={24} />
                                <span className="text-[#333] font-bold text-lg truncate">
                                    File Selected: {selectedFile.name}
                                </span>
                            </>
                        ) : (
                            // Show this normally
                            <>
                                <span className="text-[#333] font-bold text-lg">
                                    Upload new document click on the
                                </span>
                                <PlusCircle className="text-black inline mx-1" size={20} />
                                <span className="text-[#333] font-bold text-lg">
                                    Sign
                                </span>
                            </>
                        )}
                    </div>

                    {/* The Blue Plus Button on the right */}
                    <div className="bg-white rounded-full p-0.5 shadow-sm group-hover:scale-110 transition-transform">
                        <PlusCircle className="text-[#007bff]" size={32} strokeWidth={1.5} />
                    </div>
                </div>

                {/* Hidden File Input */}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.jpg,.png,.doc,.docx" // Optional: restrict file types
                />

                {/* Instructions Text */}
                <div className="mt-3 text-xs text-[#333] leading-relaxed">
                    <span className="font-bold">Instruction:</span> Add Document with Application please select <span className="font-bold">Application Type</span> from the drop down, then select <span className="font-bold">Application Number</span>. all documents which is uploaded in UDIN for this type of application show on table . Add any documen click on <span className="inline-flex items-center justify-center bg-gray-700 text-white w-4 h-4 text-[10px] rounded-[2px] mx-0.5"><PlusCircle size={10} className="text-white" /></span> button, will add the document in the application, will show bellow table
                </div>
            </div>
        </div>
    );
};

export default DocumentUploadHeader;