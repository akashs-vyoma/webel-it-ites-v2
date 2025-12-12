import Image from 'next/image';
import React from 'react';
import bgNetworkNodes from '@/components/images/background-image.jpg';
import footerPanorama from '@/components/images/footer-image.png';
import CommonFooter from './common-footer';
import OrganisationRegByGSTIN from './OrganisationRegByGSTIN';

const OrganisationRegistration = () => {
  return (
    <div className="min-h-screen flex flex-col relative font-sans text-gray-700 overflow-x-hidden">

      {/* -------------------------------------------------------------
          BACKGROUND IMAGE LAYER (Screenshot 3)
          Replace 'bg-network-nodes.jpg' with your actual background image path
      ----------------------------------------------------------------- */}
      <div className="absolute inset-0 z-0 bg-blue-50">
        <Image
          width={1920}
          height={1080}
          src={bgNetworkNodes}
          alt="Background Pattern"
          className="w-full h-full object-cover opacity-60 mix-blend-multiply"
        />

        {/* Overlay gradient to match the fade effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent"></div>
      </div>

      {/* -------------------------------------------------------------
          HEADER / NAVBAR
      ----------------------------------------------------------------- */}
      <nav className="relative z-10 w-full bg-white shadow-sm border-b border-gray-200 px-6 py-3 flex justify-between items-center h-16">
        <div className="flex flex-col leading-none">
          {/* Webel Logo Text Recreation */}
          <h1 className="text-3xl font-bold text-[#2d5aa8] tracking-tighter">Webel</h1>
          <span className="text-[10px] text-gray-500 tracking-wide">opportunities infinite</span>
        </div>

        <div className="text-sm font-medium text-gray-800 cursor-pointer hover:text-[#2d5aa8]">
          Home
        </div>
      </nav>

      {/* -------------------------------------------------------------
          MAIN CONTENT AREA
      ----------------------------------------------------------------- */}
      <main className="relative z-10 flex-grow flex justify-center pt-12 px-4 pb-32">
        <div className="w-full max-w-[40%] bg-white shadow-xl rounded-lg overflow-hidden">

          {/* Card Header */}
          <div className="bg-[#5b5fa3] px-4 py-3">
            <h2 className="text-white text-base font-medium">Organisation Registration</h2>
          </div>

          <div className="p-6 pb-2">
            {/* Tab Buttons */}
            <div className="flex gap-4 mb-6">
              <button className="bg-white hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 hover:shadow-sm cursor-pointer border border-gray-300 text-gray-700 px-6 py-2 text-xs font-bold shadow-sm rounded-xl">
                Sign Up By GSTN
              </button>
              <button className="bg-white hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 hover:shadow-sm cursor-pointer bg-gray-50 border border-gray-200 text-gray-500 px-6 py-2 text-xs font-medium rounded-xl hover:bg-gray-100 transition-colors">
                Sign Up By DSC
              </button>
            </div>

            {/* Input Container */}
            <OrganisationRegByGSTIN />

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

      {/* -------------------------------------------------------------
          FOOTER GRAPHICS (Screenshot 2)
          Replace 'footer-panorama.png' with your actual footer image path
      ----------------------------------------------------------------- */}
      <CommonFooter />

    </div>
  );
};

export default OrganisationRegistration;