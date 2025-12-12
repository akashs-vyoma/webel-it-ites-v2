"use client"
import React, { useState } from 'react';
import OrganisationRegByGSTIN from './OrganisationRegByGSTIN';
import OrganisationRegByDSC from './OrganisationRegByDSC';

const OrganisationRegistration = () => {
  const [activeTab, setActiveTab] = useState('gstn');
  return (
    <main className="relative z-10 flex-grow flex justify-center pt-12 px-4 pb-32">
      <div className="w-full max-w-[40%] bg-white shadow-xl rounded-lg overflow-hidden">

        {/* Card Header */}
        <div className="bg-[#5b5fa3] px-4 py-3">
          <h2 className="text-white text-base font-medium">Organisation Registration</h2>
        </div>

        <div className="p-6 pb-2">
          {/* Tab Buttons */}
          <div className="flex gap-4 mb-6">
            {/* GSTN Button */}
            <button
              onClick={() => setActiveTab('gstn')}
              className={`px-6 py-2 text-xs rounded-xl border cursor-pointer transition-colors ${activeTab === 'gstn'
                ? 'bg-white border-gray-300 text-gray-700 font-bold shadow-sm'
                : 'bg-gray-50 border-gray-200 text-gray-500 font-medium hover:bg-gray-100'
                }`}
            >
              Sign Up By GSTN
            </button>

            {/* DSC Button */}
            <button
              onClick={() => setActiveTab('dsc')}
              className={`px-6 py-2 text-xs rounded-xl border cursor-pointer transition-colors ${activeTab === 'dsc'
                ? 'bg-white border-gray-300 text-gray-700 font-bold shadow-sm'
                : 'bg-gray-50 border-gray-200 text-gray-500 font-medium hover:bg-gray-100'
                }`}
            >
              Sign Up By DSC
            </button>
          </div>

          {/* Input Container */}
          {activeTab === 'gstn' ? <OrganisationRegByGSTIN /> : <OrganisationRegByDSC />}

          {/* Sign In Link */}
          <div className="text-[11px] text-gray-600 mb-4">
            Already have an Organisation account? <a href="#" className="text-blue-600 hover:underline">Sign In</a>
          </div>
        </div>

        {/* Yellow Instruction Box */}
        <div className="bg-[#fcf8e3] border-t border-gray-200 p-4 text-[11px] leading-5 text-gray-800 text-justify">
          <span className="font-bold">Instruction: For Register as a Organization</span> please enter Organization's PAN number and click on "<u>Verify PAN</u>" button, it will verify PAN number After PAN Verification <b>Company Name</b> will show in the text box. Enter <b>PAN Number</b> of The Director/Management Person. Enter DSC In USB And Click On "<b>Verify DSC</b>" Button Software automatically verify PAN with DSC and After Successfully verification Account will Create
        </div>

      </div>
    </main>
  );
};

export default OrganisationRegistration;