"use client";
import React from 'react';
import {
    Upload,
    FileText,
    ArrowUp,
    Eye
} from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const NonIndividualUploadDoc: React.FC = () => {
    const [showModal, setShowModal] = React.useState(true);
    return (
        <div className="container mx-auto max-w-3xl bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200">

            {/* Header - Purple Bar */}
            <div className="bg-[#4c4f95] px-6 py-4">
                <h2 className="text-white text-lg font-medium">Upload Document</h2>
            </div>

            {/* Form Content */}
            <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">

                    {/* 1. Do Want to Upload Document? */}
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-2">
                            Do Want to Upload Document?
                        </label>
                        <div className="relative">
                            <select className="w-full border border-gray-300 rounded text-sm px-3 py-2 outline-none focus:border-[#4c4f95] bg-white appearance-none text-gray-800 font-medium">
                                <option>Upload Document</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </div>

                    {/* 2. Document Name */}
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-2">
                            Document Name
                        </label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#4c4f95] h-[38px]"
                        />
                    </div>

                    {/* 3. Select Document Type */}
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-2">
                            Select Document Type
                        </label>
                        <div className="relative">
                            <select className="w-full border border-gray-300 rounded text-sm px-3 py-2 outline-none focus:border-[#4c4f95] bg-white appearance-none text-gray-800 font-medium">
                                <option>Project Report</option>
                                <option>NOC</option>
                                <option>Declaration</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </div>

                    {/* 4. Document Description */}
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-2">
                            Document Description
                        </label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#4c4f95] h-[38px]"
                        />
                    </div>

                    {/* 5. Document Validity (Read only grey) */}
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-2">
                            Document Validity
                        </label>
                        <input
                            type="text"
                            value="50"
                            readOnly
                            className="w-full border border-gray-300 rounded px-3 py-2 outline-none bg-gray-200 text-gray-800 font-medium h-[38px]"
                        />
                    </div>

                    {/* 6. Document Remarks */}
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-2">
                            Document Remarks
                        </label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#4c4f95] h-[38px]"
                        />
                    </div>

                    {/* 7. Upload Area (Spanning Left Column) */}
                    <div className="mt-2">
                        <label className="block text-xs font-bold text-gray-700 mb-2">
                            Upload Document
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-md p-10 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors h-40">
                            <ArrowUp className="w-6 h-6 text-gray-500 mb-2" />
                            <span className="text-xs text-gray-600">Drag and drop a file here or click</span>
                        </div>
                    </div>

                </div>

                {/* Verify Button */}
                <div className="mt-8">
                    <button className="bg-[#4c4f95] hover:bg-[#3b3d73] text-white text-sm font-medium px-6 py-2.5 rounded shadow-sm transition-colors">
                        Verify Aadhar
                    </button>
                </div>
            </div>

            {/* Footer Section */}
            <div className="mt-8">
                {/* Gold Bar */}
                <div className="bg-[#eec643] px-6 py-3 flex justify-between items-center">
                    <div className="flex items-center gap-1 text-sm font-bold text-black">
                        Go to my documents click on the <FileText className="w-4 h-4 inline fill-black" /> Sign
                    </div>
                    {/* Blue Document Icon on Right */}
                    <div className="bg-[#007bff] p-1 rounded text-white">
                        <FileText className="w-5 h-5" />
                    </div>
                </div>

                {/* Instruction Text */}
                <div className="bg-[#fcf8e3] p-4 text-[11px] leading-relaxed text-gray-800 border-t border-yellow-200">
                    <span className="font-bold">Instruction:</span> Upload new document <span className="font-bold">Select Document Type</span> from the dropdown, click on the file upload icon, enter <span className="font-bold">Document Name</span>, <span className="font-bold">Document Description</span>, <span className="font-bold">Document Remarks</span> . If you allready uploaded in other UDIN portal select <span className="font-bold">Already Document Uploaded</span> from <span className="font-bold">Do Want to Upload Document?</span> drop down
                </div>
            </div>

            <Dialog open={showModal} onOpenChange={setShowModal}>
                <Dialog open={showModal} onOpenChange={setShowModal}>
                    <DialogContent className="sm:max-w-lg p-0 gap-0 overflow-hidden bg-white">

                        {/* Header */}
                        <DialogHeader className="bg-[#4c4f95] p-5 text-left">
                            <DialogTitle className="text-white text-lg font-normal">Verify your Aadhaar Number</DialogTitle>
                        </DialogHeader>

                        {/* Body Content */}
                        <div className="p-6 space-y-6">

                            {/* Aadhaar Input Group */}
                            <div>
                                <label className="block text-sm font-bold text-gray-800 mb-2">
                                    Aadhaar Number <span className="text-gray-800">*</span>
                                </label>

                                <div className="flex h-10 rounded-md overflow-hidden shadow-sm">
                                    {/* Left Label */}
                                    <div className="bg-[#4c4f95] text-white px-4 flex items-center justify-center text-sm font-medium shrink-0">
                                        Aadhaar
                                    </div>

                                    {/* Input Field with Eye Icon */}
                                    <div className="relative flex-1 bg-[#e9ecef]">
                                        <input
                                            type="text"
                                            placeholder="Aadhaar Number"
                                            className="w-full h-full bg-[#e9ecef] px-3 pr-10 text-sm outline-none text-gray-700 placeholder-gray-400 border-y border-gray-300"
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

                            {/* Consent / Disclaimer Checkbox */}
                            <div className="flex items-start gap-3">
                                <input
                                    type="checkbox"
                                    id="aadhaar-consent"
                                    className="mt-1 h-4 w-4 rounded border-gray-400 text-[#4c4f95] focus:ring-[#4c4f95] cursor-pointer"
                                />
                                <div className="text-sm text-gray-600 text-justify leading-relaxed">
                                    <label htmlFor="aadhaar-consent" className="cursor-pointer">
                                        I hereby state that I have no objection in authenticating myself on Unique Document Identification Number (UDIN) portal * with Aadhaar based authentication system and *give my consent to providing my Aadhaar number, Biometric and/or One-Time Password (OTP) data for
                                    </label>
                                    <a href="#" className="text-blue-500 hover:underline text-sm block mt-3 font-medium">
                                        Read More
                                    </a>
                                </div>
                            </div>

                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-gray-200 flex justify-center">
                            <button
                                className="bg-[#4c4f95] hover:bg-[#3b3d73] text-white px-12 py-2 rounded-lg font-medium transition-colors text-sm shadow-sm"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </DialogContent>
                </Dialog>
            </Dialog>
        </div>
    );
};

export default NonIndividualUploadDoc;