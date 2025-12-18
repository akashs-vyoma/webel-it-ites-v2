"use client";
import React, { useState, useRef } from 'react';
import {
    Upload,
    FileText,
    ArrowUp,
    Eye,
    Info,
    ShieldCheck,
    X,
    CheckCircle2,
    Trash2
} from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const NonIndividualUploadDoc: React.FC = () => {
    const [showModal, setShowModal] = useState(true);
    
    // --- Upload Logic Implementation ---
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };
    const [showMore, setShowMore] = useState(false);

    const handleRemoveFile = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };
    // -----------------------------------

    return (
        // Centered Layout Container
        <div className="min-h-screen flex items-center justify-center p-4 font-sans">
            
            {/* Main Card - No Border, just Shadow */}
            <div className="w-full max-w-4xl bg-white shadow-2xl rounded-xl overflow-hidden">

                {/* Header - Solid Background Color */}
<div className="relative bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-5 overflow-hidden">
    
    {/* Shimmer Effect – Always On */}
    <div className="absolute inset-0 gradient-shimmer pointer-events-none z-10"></div>

    <h2 className="relative z-20 text-white text-xl font-semibold tracking-wide flex items-center gap-2">
        <Upload className="w-5 h-5 text-white/80" />
        Upload Document
    </h2>
</div>

                {/* Form Content */}
                <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">

                        {/* 1. Do Want to Upload Document? */}
                        <div>
                            <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">
                                Do Want to Upload Document?
                            </label>
                            <div className="relative">
                                {/* Changed Dropdown Colors: Text is now Slate-700, Focus turns slightly blue */}
                                <select className="w-full border border-gray-300 rounded-lg text-sm px-4 py-3 outline-none focus:border-blue-500 focus:text-blue-700 bg-white text-slate-700 font-medium appearance-none transition-colors cursor-pointer">
                                    <option>Upload Document</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                        </div>

                        {/* 2. Document Name */}
                        <div>
                            <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">
                                Document Name
                            </label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500 h-[46px] text-sm text-gray-700 transition-colors"
                            />
                        </div>

                        {/* 3. Select Document Type */}
                        <div>
                            <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">
                                Select Document Type
                            </label>
                            <div className="relative">
                                <select className="w-full border border-gray-300 rounded-lg text-sm px-4 py-3 outline-none focus:border-blue-500 focus:text-blue-700 bg-white text-slate-700 font-medium appearance-none transition-colors cursor-pointer">
                                    <option>Project Report</option>
                                    <option>NOC</option>
                                    <option>Declaration</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                        </div>

                        {/* 4. Document Description */}
                        <div>
                            <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">
                                Document Description
                            </label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500 h-[46px] text-sm text-gray-700 transition-colors"
                            />
                        </div>

                        {/* 5. Document Validity (Read only) */}
                        <div>
                            <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">
                                Document Validity
                            </label>
                            <input
                                type="text"
                                value="50"
                                readOnly
                                className="w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-3 outline-none text-gray-500 font-medium h-[46px]"
                            />
                        </div>

                        {/* 6. Document Remarks */}
                        <div>
                            <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">
                                Document Remarks
                            </label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500 h-[46px] text-sm text-gray-700 transition-colors"
                            />
                        </div>

                        {/* 7. Upload Area (Functional) */}
                        <div className="mt-2 md:col-span-1">
                            <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">
                                Upload Document
                            </label>
                            
                            <input 
                                type="file" 
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleFileSelect}
                            />

                            <div 
                                onClick={handleUploadClick}
                                className={`border border-dashed rounded-xl h-40 flex flex-col items-center justify-center cursor-pointer transition-colors group relative
                                    ${selectedFile 
                                        ? 'border-green-400 bg-green-50/30' 
                                        : 'border-blue-300 bg-blue-50/20 hover:bg-blue-50'
                                    }`}
                            >
                                {selectedFile ? (
                                    <>
                                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                                            <FileText className="w-6 h-6 text-green-600" />
                                        </div>
                                        <span className="text-sm font-semibold text-slate-700 px-4 text-center truncate max-w-full">
                                            {selectedFile.name}
                                        </span>
                                        <span className="text-xs text-green-600 mt-1 flex items-center gap-1">
                                            <CheckCircle2 size={12} /> Ready to upload
                                        </span>
                                        <button 
                                            onClick={handleRemoveFile}
                                            className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                                            title="Remove file"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                            <ArrowUp className="w-5 h-5 text-blue-500" />
                                        </div>
                                        <span className="text-sm font-medium text-gray-600">Click to upload</span>
                                        <span className="text-xs text-gray-400 mt-1">or drag and drop</span>
                                    </>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* Verify Button */}
                    <div className="mt-10">
                        <button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-sm font-semibold px-8 py-3 rounded-lg shadow-md transition-all active:scale-95 flex items-center gap-2">
                            <ShieldCheck size={18} />
                            Verify Aadhar
                        </button>
                    </div>
                </div>

                {/* Footer Section - Light Yellow Background */}
                <div className="bg-gray-50 p-6 border-t border-gray-100">
                     <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-4 items-start shadow-sm">
                        <div className="bg-yellow-100 p-2 rounded-full shrink-0 border border-yellow-200">
                            <Info className="w-5 h-5 text-yellow-700" />
                        </div>
                        <div className="text-xs leading-relaxed text-yellow-900/80">
                             <p>
                                <span className="font-bold text-yellow-800">Instruction:</span> Upload new document <span className="font-bold text-yellow-900">Select Document Type</span> from the dropdown, click on the file upload icon, enter details. If you already uploaded in other UDIN portal select <span className="font-bold text-yellow-900">Already Document Uploaded</span>.
                            </p>
                        </div>
                     </div>
                </div>

                {/* Modal */}
                <Dialog open={showModal} onOpenChange={setShowModal}>
                    <DialogContent className="sm:max-w-lg p-0 gap-0 overflow-hidden bg-white rounded-xl shadow-2xl border-0">

                        {/* Modal Header */}
                        <DialogHeader className="bg-gradient-to-r from-blue-600 to-cyan-500 p-5 text-left">
                            <div className="flex justify-between items-center">
                                <DialogTitle className="text-white text-lg font-medium">Verify your Aadhaar Number</DialogTitle>
                                <button onClick={() => setShowModal(false)} className="text-white/80 hover:text-white">
                                    
                                </button>
                            </div>
                        </DialogHeader>

                        {/* Modal Body */}
                        <div className="p-8 space-y-6">

                            {/* Aadhaar Input Group */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Aadhaar Number <span className="text-red-500">*</span>
                                </label>

                                <div className="flex h-11 rounded-lg overflow-hidden border border-gray-300 focus-within:border-blue-500 transition-colors">
                                    {/* Left Label */}
                                    <div className="bg-gray-100 text-gray-600 border-r border-gray-300 px-4 flex items-center justify-center text-sm font-semibold shrink-0">
                                        Aadhaar
                                    </div>

                                    {/* Input Field */}
                                    <div className="relative flex-1 bg-white">
                                        <input
                                            type="text"
                                            placeholder="Enter 12-digit number"
                                            className="w-full h-full bg-white px-3 pr-10 text-sm outline-none text-gray-700 placeholder-gray-400"
                                        />
                                        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors">
                                            <Eye size={18} />
                                        </button>
                                    </div>

                                    {/* Send OTP Button */}
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 text-sm font-medium shrink-0 transition-colors">
                                        Send OTP
                                    </button>
                                </div>
                            </div>

                            {/* Consent Checkbox */}
                            <div className="flex items-start gap-3">
                                <input
                                    type="checkbox"
                                    id="aadhaar-consent"
                                    className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-0 cursor-pointer accent-blue-600"
                                />
                                <div className="text-xs text-gray-600 text-justify leading-relaxed">
    <label htmlFor="aadhaar-consent" className="cursor-pointer">
        I hereby state that I have no objection in authenticating myself on
        Unique Document Identification Number (UDIN) portal with Aadhaar based
        authentication system and give my consent to providing my Aadhaar
        number.
    </label>

    {showMore && (
        <p className="mt-2 text-gray-500">
            Aadhaar based authentication is used only for identity verification
            through UIDAI. Your Aadhaar number will not be stored or shared and
            will be processed as per UIDAI guidelines.
        </p>
    )}

    <span
        onClick={() => setShowMore(!showMore)}
        className="text-blue-600 hover:underline block mt-1 font-semibold cursor-pointer"
    >
        {showMore ? "Read Less" : "Read More"}
    </span>
</div>

                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-5 border-t border-gray-100 flex justify-end">
                            <button
                                className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-lg font-medium transition-colors text-sm"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default NonIndividualUploadDoc;