"use client"
import React, { useState } from 'react';
import { Search } from 'lucide-react';

const UdinSearch: React.FC = () => {
    const [udin, setUdin] = useState('');

    const handleSearch = () => {
        if (udin.trim()) {
            alert(`Searching for UDIN: ${udin}`);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto px-4 mt-10">
             <div className="absolute inset-0 gradient-shimmer pointer-events-none"></div>
            {/* Search Bar Container - Reduced height to h-11 for a sleek look */}
            <div className="flex w-full bg-white rounded-full overflow-hidden h-11 items-center
                border border-[#1F51FF]
                shadow-[0_0_10px_rgba(31,81,255,0.25)]
                hover:shadow-[0_0_15px_rgba(31,81,255,0.4)]
                focus-within:shadow-[0_0_20px_rgba(31,81,255,0.5),0_0_40px_rgba(31,81,255,0.2)]
                transition-all duration-300 ease-out">
                    

                {/* Input Field - Text reduced to text-sm */}
                <input
                    type="text"
                    value={udin}
                    onChange={(e) => setUdin(e.target.value)}
                    className="flex-1 h-full px-6 outline-none text-slate-700 text-sm
                               placeholder-slate-400 font-medium bg-transparent"
                    placeholder="Enter UDIN here"
                />

                {/* Search Button - Adjusted width and icon size */}
                <button
                    onClick={handleSearch}
                    className="h-full w-14 bg-[#1F51FF]/5 hover:bg-[#1F51FF] 
                               group flex items-center justify-center transition-all duration-300
                               border-l border-[#1F51FF]/20"
                    aria-label="Search"
                >
                    <Search className="text-[#1F51FF] group-hover:text-white transition-colors duration-300" size={18} />
                </button>
            </div>

            {/* Helper Text */}
            <div className="mt-2 pl-6 text-xs text-slate-600 tracking-wide">
                Format: XX-X-XXXXXXXX-X-XXXXXXXXXXXX
            </div>
        </div>
    );
};

export default UdinSearch;