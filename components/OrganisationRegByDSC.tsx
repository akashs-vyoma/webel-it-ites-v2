import React from 'react';

const OrganisationRegistrationDSC = () => {
    return (
        <div className="border border-gray-200 p-6 mb-4 rounded-sm">

            {/* DSC Specific Instruction */}
            <div className="text-xs text-gray-800 font-bold mb-5">
                ** Please install DSC driver from <a href="#" className="text-blue-600 hover:underline">Web eID</a>
            </div>

            {/* Input Label */}
            <label className="block text-xs font-bold text-gray-800 mb-1">
                Organisation's PAN Number <span className="text-red-500">*</span> (ex. ABCTY1234D)
            </label>

            {/* Input Group */}
            <div className="flex w-full mb-3 h-9">
                {/* PAN Prefix */}
                <div className="bg-[#483EA8] text-white text-xs flex items-center px-4 font-medium rounded-l-sm">
                    PAN
                </div>
                {/* Input Field */}
                <input
                    type="text"
                    placeholder="Organisation's PAN Number"
                    className="flex-1 border-y border-r border-gray-300 px-3 text-xs text-gray-600 placeholder-gray-300 focus:outline-none focus:border-[#483EA8] transition-colors"
                />
                {/* Verify Button */}
                <button className="bg-[#ffc107] hover:bg-yellow-500 text-black text-xs font-bold px-5 transition-colors rounded-r-sm">
                    Verify PAN
                </button>
            </div>

            {/* Consent Text */}
            <p className="text-[11px] text-gray-600 mt-4">
                I give my consent to UDIN to use my PAN number & OTP to verify identity of the organisation
            </p>
        </div>
    );
};

export default OrganisationRegistrationDSC;