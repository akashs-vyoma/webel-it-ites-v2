"use client"
import React, { useState } from 'react';
import OrganisationRegByGSTIN from './OrganisationRegByGSTIN';
import OrganisationRegByDSC from './OrganisationRegByDSC';
import Link from 'next/link';

const OrganisationLogin = () => {
  const [activeTab, setActiveTab] = useState('gstn');

  return (
    <main className="relative z-10 flex-grow flex justify-center
                     pt-6 px-6 md:px-16 pb-6">

      <div className="w-full max-w-xl
                      bg-white
                      rounded-xl
                      border border-[#1F51FF]/20
                      shadow-[0_8px_24px_rgba(31,81,255,0.12)]">

        {/* Header */}
        <div className="relative overflow-hidden px-6 py-4
                        bg-[#1F51FF]
                        border-b border-[#1F51FF]
                        rounded-t-xl">
          <div className="absolute inset-0 gradient-shimmer pointer-events-none"></div>
          <h2 className="text-white text-base font-semibold tracking-wide">
            Organisation Sign In
          </h2>
        </div>

        {/* Content */}
        <div className="px-6 py-6">

          {/* Tabs */}
          <div className="flex justify-between gap-1 -mb-[1px] bg-[#1F51FF]/5 w-full">

            <button
              onClick={() => setActiveTab('gstn')}
              className={`px-4 py-2 text-xs font-medium flex-1 transition-all cursor-pointer
                ${activeTab === 'gstn'
                  ? 'bg-white text-[#1F51FF] border-b-0 border-t-1 border-l-1 border-r-1 border-slate-200'
                  : 'text-gray-500 hover:text-[#1F51FF]'
                }`}
            >
              Sign In by GSTN
            </button>

            <button
              onClick={() => setActiveTab('dsc')}
              className={`px-4 py-2 text-xs font-medium flex-1 transition-all cursor-pointer
                ${activeTab === 'dsc'
                  ? 'bg-white text-[#1F51FF] border-b-0 border-t-1 border-l-1 border-r-1 border-slate-200'
                  : 'text-gray-500 hover:text-[#1F51FF]'
                }`}
            >
              Sign In by DSC
            </button>
          </div>

          {/* Dynamic Form */}
          <div className="mb-5">
            {activeTab === 'gstn'
              ? <OrganisationRegByGSTIN />
              : <OrganisationRegByDSC />
            }
          </div>

          {/* Sign Up Link */}
          <div className="text-[11px] text-gray-600">
            Do not have an account?{' '}
            <Link
              href="/company-sign-up"
              className="text-[#1F51FF] font-medium hover:underline"
            >
              Sign Up Now
            </Link>
          </div>
        </div>

        {/* Instruction Box */}
        <div className="px-6 py-4
                        bg-[#1F51FF]/5
                        border-t border-[#1F51FF]/20
                        text-[11px]
                        leading-relaxed
                        text-gray-700
                        rounded-b-xl">

          <span className="font-semibold text-[#1F51FF]">
            Instruction:
          </span>{' '}
          To sign in, please select your preferred method. If using <b>GSTN</b>, 
          ensure your credentials are valid. If using <b>DSC</b>, insert the 
          <b> USB Token</b> and click on <b>Verify DSC</b>. The system will 
          automatically authenticate your credentials.
        </div>

      </div>
    </main>
  );
};

export default OrganisationLogin;