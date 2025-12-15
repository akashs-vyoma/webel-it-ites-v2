"use client"
import React, { useState } from 'react';
import { Eye, EyeOff, Fingerprint } from 'lucide-react'; // Changed icon import
import Link from 'next/link';

const IndividualRegistration: React.FC = () => {
  // State changed from phoneNumber to aadhaarNumber
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [showAadhaar, setShowAadhaar] = useState(false); // For the eye toggle
  const [isConsentGiven, setIsConsentGiven] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const [shortText, setShortText] = useState("I hereby state that I have no objection in authenticating myself on Unique Document Identification Number (UDIN) portal * with Aadhaar based authentication system and *give my consent to providing my Aadhaar number, Biometric and/or One-Time Password (OTP) data for Aadhaar based authentication for the Unique Document Identification Number (UDIN) Portal access ...");
  const [expandedText, setExpandedText] = useState("I hereby state that I have no objection in authenticating myself on Unique Document Identification Number (UDIN) portal * with Aadhaar based authentication system and *give my consent to providing my Aadhaar number, Biometric and/or One-Time Password (OTP) data for Aadhaar based authentication for the Unique Document Identification Number (UDIN) Portal access. I understand that the Aadhaar number, Biometrics and/ or OTP I provide for authentication shall be used for authenticating my identity and the Department of Information Technology & Electronics Government of West Bengal shall ensure security and confidentiality of my personal identity data provided for the purpose of Aadhaar based authentication.");

  const handleSendOtp = () => {
    if (aadhaarNumber.length === 12) {
      setOtpSent(true);
      alert(`OTP sent to registered mobile linked with Aadhaar: ${aadhaarNumber}`);
    } else {
      alert("Please enter a valid 12-digit Aadhaar number");
    }
  };

  const handleVerifyOtp = () => {
    if (otp.length > 0) {
      if (!isConsentGiven) {
        alert("Please check the consent box before verifying.");
        return;
      }
      alert("Verifying OTP and fetching details...");
      // Logic to auto-fill name would go here
    } else {
      alert("Please enter the OTP");
    }
  };

  return (
    <div className="w-full max-w-xl bg-white shadow-2xl rounded-lg overflow-hidden border border-gray-100 font-sans">
      {/* Card Header */}
      <div className="bg-[#4c4f95] px-4 py-3">
        <h2 className="text-white text-lg font-medium">Individual Sign Up</h2>
      </div>

      <div className="p-6">
        {/* Form Group */}
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Aadhaar Number
          </label>

          <div className="flex w-full rounded-sm shadow-sm border border-gray-300 overflow-hidden h-10">
            {/* Text Prefix (matches image style) */}
            <div className="bg-[#4c4f95] px-4 flex items-center justify-center text-white text-sm font-medium shrink-0">
              <Fingerprint />
            </div>

            {/* Input Field */}
            <div className="flex-1 flex items-center bg-white relative">
              <input
                type={showAadhaar ? "text" : "password"}
                value={aadhaarNumber}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '');
                  if (val.length <= 12) setAadhaarNumber(val);
                }}
                className="w-full h-full px-3 outline-none text-sm text-gray-700 placeholder-gray-400"
                placeholder="9012 5678 XXXX"
              />

              {/* Eye Icon for visibility toggle */}
              <button
                onClick={() => setShowAadhaar(!showAadhaar)}
                className="px-2 text-[#4c4f95] hover:text-[#383a6e] focus:outline-none"
              >
                {showAadhaar ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Send OTP Button */}
            {!otpSent && (
              <button
                onClick={handleSendOtp}
                className="bg-[#fbbf24] hover:bg-[#f59e0b] text-gray-900 font-bold px-4 py-1 text-sm transition-colors whitespace-nowrap border-l border-gray-300"
              >
                Send OTP
              </button>
            )}
          </div>
        </div>

        {/* OTP Section */}
        {otpSent && (
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Enter OTP
            </label>
            <div className="flex w-full gap-2">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md outline-none text-sm focus:border-[#4c4f95]"
                placeholder="Enter received OTP"
              />
              <button
                onClick={handleVerifyOtp}
                className="bg-[#fbbf24] hover:bg-[#f59e0b] text-gray-900 font-medium px-4 py-2 rounded-md text-sm transition-colors whitespace-nowrap"
              >
                Verify OTP
              </button>
            </div>
          </div>
        )}

        {/* Consent Checkbox */}
        <div className="flex items-start gap-3 mt-6 mb-4">
          <input
            type="checkbox"
            id="consent"
            checked={isConsentGiven}
            onChange={(e) => setIsConsentGiven(e.target.checked)}
            className="mt-1 h-4 w-4 text-[#4c4f95] border-gray-300 rounded focus:ring-[#4c4f95]"
          />
          <label htmlFor="consent" className="text-[10px] text-gray-700 text-justify leading-[13px]">
            {readMore ? expandedText : shortText} <a onClick={() => setReadMore(!readMore)} className="cursor-pointer text-blue-500 hover:underline mt-1 inline-block">{readMore ? 'Read Less' : 'Read More'}</a>
          </label>
        </div>

        {/* Links */}
        <div className="space-y-1 mt-4">
          <div className="text-sm text-gray-600">
            Already have an account? <Link href="/individual-sign-in" className="text-blue-500 hover:text-blue-700 hover:underline">Sign In</Link>
          </div>
        </div>
      </div>

      {/* Yellow Instruction Footer */}
      <div className="bg-[#f0e7c5] border-t border-gray-200 p-4 text-[13px] leading-5 text-gray-900 text-justify">
        <span className="font-bold">Instruction: Individual registration</span>, enter Aadhaar Numner and click on <span className="font-bold underline">"Send OTP"</span> button, OTP will send to the register mobile number enter the <span className="font-bold">OTP</span>, Click on <span className="underline font-bold">Verify OTP</span> Button <span className="font-bold">Name will automatically filled, Type Mobile number for registration and click on submit</span>
      </div>
    </div>
  );
};

export default IndividualRegistration;