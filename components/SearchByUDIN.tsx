"use client"
import React, { useState } from 'react';
import { Search } from 'lucide-react';

const UdinSearch: React.FC = () => {
    const [udin, setUdin] = useState('');

    const handleSearch = () => {
        if (udin.trim()) {
            alert(`Searching for UDIN: ${udin}`);
            // Add your search logic here
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto px-4 mt-10">
            {/* Search Bar Container */}
            <div className="flex w-full bg-white rounded-full shadow-lg overflow-hidden border border-gray-200 h-14 items-center">

                {/* Input Field */}
                <input
                    type="text"
                    value={udin}
                    onChange={(e) => setUdin(e.target.value)}
                    className="flex-1 h-full px-8 outline-none text-gray-700 text-lg placeholder-gray-300 font-medium"
                    placeholder="Enter UDIN here"
                />

                {/* Search Button */}
                <button
                    onClick={handleSearch}
                    className="h-full w-20 bg-[#dbe4ff] hover:bg-[#c7d2fe] flex items-center justify-center transition-colors border-l border-gray-100"
                    aria-label="Search"
                >
                    <Search className="text-[#4c4f95]" size={24} />
                </button>
            </div>

            {/* Helper Text */}
            <div className="mt-3 pl-6 text-sm text-gray-600 tracking-wide">
                Format: XX-X-XXXXXXXX-X-XXXXXXXXXXXX
            </div>
        </div>
    );
};

export default UdinSearch;