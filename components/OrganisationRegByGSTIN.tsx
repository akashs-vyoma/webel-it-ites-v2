import React from 'react'

const OrganisationRegByGSTIN = () => {
    return (
        <div className="border border-gray-200 p-6 mb-4 rounded-sm">
            <label className="block text-xs font-bold text-gray-800 mb-1">
                Organisation's GSTN Number <span className="text-red-500">*</span> (ex. ABCTY1234D)
            </label>

            {/* Input Group */}
            <div className="flex w-full mb-3 h-9">
                {/* GSTN Prefix Label */}
                <div className="bg-[#5b5fa3] text-white text-xs flex items-center px-4 font-medium rounded-l-sm">
                    GSTN
                </div>
                {/* Input Field */}
                <input
                    type="text"
                    placeholder="Organisation's GSTN Number"
                    className="flex-1 border-y border-r border-gray-300 px-3 text-xs focus:outline-none focus:border-[#5b5fa3] transition-colors"
                />
                {/* Verify Button */}
                <button className="bg-[#ffc107] hover:bg-yellow-500 text-black text-xs font-bold px-5 transition-colors rounded-r-sm">
                    Verify GSTN
                </button>
            </div>

            {/* Consent Checkbox */}
            <div className="flex items-start gap-2 mt-4">
                <input type="checkbox" className="mt-0.5 h-3 w-3 border-gray-300 rounded text-blue-600 focus:ring-blue-500" />
                <span className="text-[11px] text-gray-600">
                    I give my consent to UDIN to use my PAN number & OTP to verify identity of the organisation
                </span>
            </div>
        </div>
    )
}

export default OrganisationRegByGSTIN