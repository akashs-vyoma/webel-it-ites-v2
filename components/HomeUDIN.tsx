import React from 'react';
import { Search, Info } from 'lucide-react';

const SearchByUdin: React.FC = () => {
    return (
        <div className="w-full max-w-5xl mx-auto flex flex-col gap-3 font-sans">

            {/* 
               Standalone Search Bar 
               - Reduced height to h-11 (44px) for a professional look
               - Removed hover/ring effects
               - Added transition-colors for a smooth, subtle border change only
            */}
            <div className="flex w-full bg-white rounded-full h-11 items-center overflow-hidden pl-5 shadow-sm border border-slate-200 focus-within:border-blue-400 transition-colors">
                
                {/* Input Field */}
                <input
                    type="text"
                    placeholder="Enter UDIN here (e.g., 24-C-CA001176-P-1704179071921)"
                    className="flex-1 outline-none text-sm font-medium text-slate-700 placeholder-slate-400 h-full bg-transparent"
                />

                {/* Search Button */}
                <button className="h-full w-14 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors cursor-pointer border-l border-slate-100">
                    <Search className="w-5 h-5" />
                </button>
            </div>

            {/* Instruction Block */}
            <div className="bg-[#fffbeb] rounded-lg border border-yellow-200 p-3 text-xs text-slate-700 leading-relaxed shadow-sm">
                <div className="flex gap-2.5 items-start">
                    {/* Info Icon */}
                    <div className="shrink-0 mt-0.5">
                        <div className="w-4 h-4 rounded-full bg-yellow-100 border border-yellow-200 flex items-center justify-center text-yellow-700">
                            <Info size={10} />
                        </div>
                    </div>

                    {/* Text Content */}
                    <p>
                        <span className="font-bold text-yellow-900">Instruction:</span> Search/Download Document By UDIN, please type UDIN with proper format, <span className="font-bold text-yellow-900">Format: XX-X-XXXXXXXX-X-XXXXXXXXXXXX</span>. Then Click on <span className="inline-flex items-center justify-center align-middle bg-white border border-slate-200 text-slate-500 w-4 h-4 rounded-full shadow-sm mx-1"><Search size={10} /></span> button. Will show the Document Status. To download the document Click on <span className="font-bold text-blue-600">Download</span> Button.
                    </p>
                </div>
            </div>

        </div>
    );
};

export default SearchByUdin;