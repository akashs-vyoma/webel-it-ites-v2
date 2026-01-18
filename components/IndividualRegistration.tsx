"use client"
import React, { useState } from 'react';
import { Eye, EyeOff, Fingerprint, KeyRound, ArrowRight, ShieldCheck, Sparkles, PenSquare, CheckCircle2, Loader2, Phone } from 'lucide-react';
import Link from 'next/link';
import Swal from 'sweetalert2'; // Added SweetAlert2
import CommonCard from './common-card';
import { callAPI } from './apis/commonAPIs';
import router from 'next/router';
import { getCookie, setCookie } from '@/utils/cookies';

const IndividualRegistration: React.FC = () => {
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false); // New state for verification status
  const [otp, setOtp] = useState('');
  const [showAadhaar, setShowAadhaar] = useState(false);
  const [isConsentGiven, setIsConsentGiven] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const [isLoadingSent, setIsLoadingSent] = useState(false);
  const [isLoadingVerify, setIsLoadingVerify] = useState(false);

  const shortText = "I hereby state that I have no objection in authenticating myself on Unique Document Identification Number (UDIN) portal * with Aadhaar based authentication system and *give my consent to providing my Aadhaar number, Biometric and/or One-Time Password (OTP) data for Aadhaar based authentication for the Unique Document Identification Number (UDIN) Portal access ...";
  const expandedText = "I hereby state that I have no objection in authenticating myself on Unique Document Identification Number (UDIN) portal * with Aadhaar based authentication system and *give my consent to providing my Aadhaar number, Biometric and/or One-Time Password (OTP) data for Aadhaar based authentication for the Unique Document Identification Number (UDIN) Portal access. I understand that the Aadhaar number, Biometrics and/ or OTP I provide for authentication shall be used for authenticating my identity and the Department of Information Technology & Electronics Government of West Bengal shall ensure security and confidentiality of my personal identity data provided for the purpose of Aadhaar based authentication.";

  const handleSendOtp = async () => {
    try {
      if (!isConsentGiven) {
        Swal.fire({
          icon: 'warning',
          title: 'Consent Required',
          text: 'Please check the consent box before verifying.',
          confirmButtonColor: '#1F51FF'
        });
        return;
      }
      if (aadhaarNumber.length === 12) {
        setIsLoadingSent(true);
        const result = await callAPI("/udin/individualRegisterAndSendOtp", { aadhaar_number: aadhaarNumber });
        if (result.status == 0) {
          setCookie("token", result.data.token);
          setCookie("trans_id", result.data.trans_id);
          setOtpSent(true);
          Swal.fire({
            icon: 'success',
            title: 'OTP Sent',
            text: `OTP sent to registered mobile linked with Aadhaar: ${aadhaarNumber}`,
            confirmButtonColor: '#1F51FF'
          });
        } else {
          // Handle "Already Registered" or other API errors
          Swal.fire({
            icon: result.message?.toLowerCase().includes('already') ? 'info' : 'error',
            title: result.message?.toLowerCase().includes('already') ? 'Registered' : 'Error',
            text: result.message,
            confirmButtonColor: '#1F51FF'
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Input',
          text: 'Please enter a valid 12-digit Aadhaar number',
          confirmButtonColor: '#1F51FF'
        });
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to send OTP. Please try again later.',
        confirmButtonColor: '#1F51FF'
      });
    } finally {
      setIsLoadingSent(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setIsLoadingVerify(true);
      if (otp?.length > 0) {
        if (!isConsentGiven) {
          Swal.fire({
            icon: 'warning',
            title: 'Consent Required',
            text: 'Please check the consent box before verifying.',
            confirmButtonColor: '#1F51FF'
          });
          return;
        }

        const token = getCookie("token");
        const trans_id = getCookie("trans_id");
        const result = await callAPI("/udin/individualRegisterValidateAadhaarOtp", { otp, token, trans_id });

        if (result.status == 0) {
          setIsVerified(true); // Update button state

          const response = await callAPI("/udin/individualCreateProfile", {
            "user_type": 5,
            "aadhaar_no": aadhaarNumber,
            "trans_id": result?.data?.trans_id,
            "phone": phone,
            "aadhaar_full_name": result?.data?.udin_profile_details?.fullName,
            "token": result?.data?.token
          });

          if (response.status == 0) {
            Swal.fire({
              icon: 'success',
              title: 'Registered!',
              text: `You have been successfully registered.`,
              confirmButtonColor: '#10B981',
              confirmButtonText: 'Go to Login',
              showCancelButton: false,
              showCloseButton: false,
            }).then((result) => {
              if (result.isConfirmed) {
                router.push('/individual-sign-in');
              }
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Verification Failed',
              text: result.message,
              confirmButtonColor: '#1F51FF'
            });
          }
        }
      } else {
        Swal.fire({
          icon: 'warning',
          text: 'Please enter the OTP',
          confirmButtonColor: '#1F51FF'
        });
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to verify OTP. Please try again later.',
        confirmButtonColor: '#1F51FF'
      });
    } finally {
      setIsLoadingVerify(false);
    }
  };

  return (
    <CommonCard title="Individual Sign-Up" subtitle="Sign up to access your dashboard">
      <div className="w-full max-w-[500px] relative">
        <div className="px-8 pb-8 pt-4 space-y-6">

          {/* Aadhaar Input Group */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">
              Aadhaar Number
            </label>

            <div className={`group relative flex items-center h-[56px] bg-white border-2 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 ${isVerified ? 'border-green-200 bg-green-50/30' : 'border-slate-200 focus-within:border-[#1F51FF] focus-within:shadow-[0_4px_20px_rgba(31,81,255,0.1)]'}`}>
              <div className={`pl-4 pr-3 transition-colors duration-300 ${isVerified ? 'text-green-500' : 'text-slate-400 group-focus-within:text-[#1F51FF]'}`}>
                <Fingerprint size={20} strokeWidth={2.5} />
              </div>

              <input
                type={showAadhaar ? "text" : "password"}
                value={aadhaarNumber}
                disabled={otpSent || isVerified}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '');
                  if (val.length <= 12) setAadhaarNumber(val);
                }}
                className="flex-1 disabled:opacity-70 h-full bg-transparent outline-none text-base font-semibold text-slate-900 placeholder:text-slate-400 placeholder:font-medium tracking-wide"
                placeholder="XXXX XXXX XXXX"
              />

              <div className="flex items-center gap-2 pr-2">
                {!otpSent ? (
                  <button
                    onClick={() => setShowAadhaar(!showAadhaar)}
                    className="p-2 text-slate-400 hover:text-[#1F51FF] transition-colors rounded-full hover:bg-blue-50"
                  >
                    {showAadhaar ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                ) : !isVerified && (
                  <button onClick={() => setOtpSent(false)} className="p-2 text-slate-400 hover:text-[#1F51FF] transition-colors rounded-full hover:bg-blue-50">
                    <PenSquare size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Phone Input Group */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">
              Phone Number
            </label>

            <div className={`group relative flex items-center h-[56px] bg-white border-2 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 ${isVerified ? 'border-green-200 bg-green-50/30' : 'border-slate-200 focus-within:border-[#1F51FF] focus-within:shadow-[0_4px_20px_rgba(31,81,255,0.1)]'}`}>
              <div className={`pl-4 pr-3 transition-colors duration-300 ${isVerified ? 'text-green-500' : 'text-slate-400 group-focus-within:text-[#1F51FF]'}`}>
                <Phone size={20} strokeWidth={2.5} />
              </div>

              <input
                type="text"
                value={phone}
                disabled={otpSent || isVerified}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '');
                  if (val.length <= 10) setPhone(val);
                }}
                className="flex-1 disabled:opacity-70 h-full bg-transparent outline-none text-base font-semibold text-slate-900 placeholder:text-slate-400 placeholder:font-medium tracking-wide"
                placeholder="Enter Phone Number"
              />

              <div className="flex items-center gap-2 pr-2">
                {(otpSent && !isVerified) && (
                  <button onClick={() => setOtpSent(false)} className="p-2 text-slate-400 hover:text-[#1F51FF] transition-colors rounded-full hover:bg-blue-50">
                    <PenSquare size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* OTP Section */}
          {otpSent && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">
                Verification Code
              </label>

              <div className={`group relative flex items-center h-[56px] bg-white border-2 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 ${isVerified ? 'border-green-500' : 'border-slate-200 focus-within:border-[#1F51FF]'}`}>
                <div className={`pl-4 pr-3 transition-colors duration-300 ${isVerified ? 'text-green-500' : 'text-slate-400 group-focus-within:text-[#1F51FF]'}`}>
                  <KeyRound size={20} strokeWidth={2.5} />
                </div>

                <input
                  type="text"
                  value={otp}
                  disabled={isVerified}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  className="flex-1 h-full bg-transparent outline-none text-base font-semibold text-slate-900 placeholder:text-slate-400 tracking-widest disabled:opacity-50"
                  placeholder="• • • • • •"
                />

                <button
                  onClick={handleVerifyOtp}
                  disabled={isVerified || isLoadingVerify}
                  className={`mr-2 h-10 px-6 text-sm font-bold rounded-xl transition-all flex items-center gap-1.5 ${isVerified
                    ? 'bg-green-500 text-white cursor-default'
                    : 'bg-[#1F51FF] hover:bg-blue-700 text-white shadow-[0_4px_12px_rgba(31,81,255,0.3)] active:scale-95'
                    }`}
                >
                  {isLoadingVerify ? <Loader2 className='animate-spin' size={16} strokeWidth={3} /> : "Verify"}
                </button>
              </div>
            </div>
          )}

          {/* Consent Checkbox */}
          {(!otpSent && !isVerified) && <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
            <div className="flex items-start gap-3">
              <div className="relative flex items-center pt-0.5">
                <input
                  type="checkbox"
                  id="consent"
                  disabled={isVerified}
                  checked={isConsentGiven}
                  onChange={(e) => setIsConsentGiven(e.target.checked)}
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-slate-300 transition-all checked:border-[#1F51FF] checked:bg-[#1F51FF] disabled:cursor-not-allowed"
                />
                <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                  <ShieldCheck size={12} strokeWidth={3} />
                </div>
              </div>

              <label htmlFor="consent" className="text-[11px] leading-relaxed text-slate-600 text-justify">
                {readMore ? expandedText : shortText}{' '}
                <a
                  onClick={(e) => { e.preventDefault(); setReadMore(!readMore); }}
                  className="cursor-pointer text-[#1F51FF] font-bold hover:underline inline-block ml-1"
                >
                  {readMore ? 'Read Less' : 'Read More'}
                </a>
              </label>
            </div>
          </div>}

          <div className="flex justify-center">
            {!otpSent && !isVerified && (
              <button
                onClick={handleSendOtp}
                disabled={isLoadingSent}
                className="h-10 px-4 cursor-pointer bg-[#1F51FF] hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-[0_4px_12px_rgba(31,81,255,0.3)] transition-all active:scale-95 whitespace-nowrap"
              >
                {isLoadingSent ? <Loader2 className='animate-spin' size={16} strokeWidth={3} /> : 'Send OTP'}
              </button>
            )}
          </div>

          {/* Sign In Link */}
          <div className="text-center pt-2 pb-2 border-t border-slate-50 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
            <p className="text-sm text-slate-500 font-medium">
              Already have an account?{' '}
              <Link href="/individual-sign-in" className="font-bold text-[#1F51FF] hover:underline transition-all">
                Sign in Now
              </Link>
            </p>
          </div>

          {/* Info Card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-5 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 delay-400">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-md border border-blue-100">
                  <Sparkles className="text-[#1F51FF]" size={18} fill="currentColor" fillOpacity={0.1} />
                </div>
              </div>
              <div className="flex-1 space-y-1">
                <h4 className="text-xs font-bold text-[#1F51FF] uppercase tracking-wider">
                  Registration Steps
                </h4>
                <p className="text-[11px] leading-5 text-slate-600 text-justify font-medium">
                  <span className="text-slate-900 font-bold">1. Enter Aadhaar</span> and click <span className="font-bold text-[#1F51FF]">Send OTP</span>.
                  <br />
                  <span className="text-slate-900 font-bold">2. Verify Code</span> sent to your mobile.
                  <br />
                  <span className="text-slate-900 font-bold">3. Auto-Fill:</span> Your Name will populate automatically. Then submit your mobile number to finish.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CommonCard>
  );
};

export default IndividualRegistration;