import React from 'react';
import { Search } from 'lucide-react';

const SearchByUdin: React.FC = () => {
    return (
        <div className="w-full max-w-5xl mx-auto rounded-md  overflow-hidden font-sans">

            {/* Top Section - Purple Background */}
            <div className="bg-[#4c4f95] px-8 py-10">
                <div className="flex w-full bg-white rounded-full h-12 items-center overflow-hidden pl-6 shadow-inner">

                    {/* Input Field */}
                    <input
                        type="text"
                        placeholder="Enter UDIN here"
                        className="flex-1 outline-none text-lg font-bold text-gray-700 placeholder-gray-300 h-full"
                    />

                    {/* Search Button */}
                    <button className="bg-[#dcdcf5] h-full w-20 flex items-center justify-center text-[#4c4f95] hover:bg-[#c8c8e8] transition-colors cursor-pointer border-l border-gray-100">
                        <Search className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Bottom Section - Instruction Strip */}
            <div className="bg-[#efeac4] p-4 text-xs md:text-sm text-gray-800 leading-relaxed border-t border-[#dcd6b0]">
                <p>
                    <span className="font-bold">Instruction: Search/Download</span> Document By UDIN, please type UDIN with proper format, <span className="font-bold">Format: XX-X-XXXXXXXX-X-XXXXXXXXXXXX</span>. Then Click on <Search className="w-3 h-3 inline text-black mb-0.5" /> button. Will show the Document Status. To download the document Click on <span className="font-bold">Download</span> Button
                </p>
            </div>

        </div>
    );
};

export default SearchByUdin;