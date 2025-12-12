"use client"
import React, { useState } from 'react';
import OrganisationRegByGSTIN from './OrganisationRegByGSTIN';
import OrganisationRegByDSC from './OrganisationRegByDSC';
import Link from 'next/link';

const OrganisationLogin = () => {
    const [activeTab, setActiveTab] = useState('gstn');
    return (
        <div className="w-full max-w-[40%] bg-white shadow-xl rounded-lg overflow-hidden ">

            {/* Card Header */}
            <div className="bg-[#5b5fa3] px-4 py-3">
                <h2 className="text-white text-base font-medium">Organisation Sign In</h2>
            </div>

            <div className="p-6 pb-2">
                {/* Tab Buttons */}
                <div className="flex gap-0 -mb-[1px]">
                    {/* GSTN Button */}
                    <button
                        onClick={() => setActiveTab('gstn')}
                        className={`px-6 py-2 text-xs cursor-pointer transition-colors ${activeTab === 'gstn'
                            ? 'bg-white text-gray-700 font-bold border-b-none border-r-1 border-l-1 border-t-1'
                            : 'bg-gray-50 text-gray-500 font-medium hover:bg-gray-100 border'
                            }`}
                    >
                        Sign In By GSTN
                    </button>

                    {/* DSC Button */}
                    <button
                        onClick={() => setActiveTab('dsc')}
                        className={`px-6 py-2 text-xs cursor-pointer transition-colors ${activeTab === 'dsc'
                            ? 'bg-white text-gray-700 font-bold border-b-none border-r-1 border-l-1 border-t-1'
                            : 'bg-gray-50 text-gray-500 font-medium hover:bg-gray-100 border'
                            }`}
                    >
                        Sign In By DSC
                    </button>
                </div>

                {/* Input Container */}
                {activeTab === 'gstn' ? <OrganisationRegByGSTIN /> : <OrganisationRegByDSC />}

                {/* Sign In Link */}
                <div className="text-[11px] text-gray-600 mb-4">
                    Do not have an account? <Link href="/company-sign-up" className="text-blue-600 hover:underline">Sign Up</Link>
                </div>
            </div>

            {/* Yellow Instruction Box */}
            <div className="bg-[#fcf8e3] border-t border-gray-200 p-4 text-[11px] leading-5 text-gray-800 text-justify">
                <span className="font-bold">Instruction: For Login as a Organization</span>  please enter Organization's PAN number and click on "Verify PAN" button, it will verify PAN number After PAN Verification Company Name will show in the text box. Enter PAN Number of The Director/Managment Person. Enter DSC In USB And Click On "Verify DSC"Button Software autometically verify PAN with DSC and After Successfully verification, can log in    </div>

        </div>
    );
};

export default OrganisationLogin;