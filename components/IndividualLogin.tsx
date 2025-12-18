"use client"
import React, { useState } from 'react';
import { Smartphone, Key, ShieldCheck, ChevronRight, User, Building2, Sparkles, Lock } from 'lucide-react';
import { useRouter } from "next/navigation";

// Shadcn UI Imports
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const IndividualLogin: React.FC = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [showRoleModal, setShowRoleModal] = useState(false);
    const [selectedRole, setSelectedRole] = useState<string>('individual');
    const [showSwalAlert, setShowSwalAlert] = useState(false);

    const handleSendOtp = () => {
        if (phoneNumber.length === 10) {
            setOtpSent(true);
            setShowSwalAlert(true);
            setTimeout(() => setShowSwalAlert(false), 4000);
        } else {
            alert("Please enter a valid 10-digit phone number");
        }
    };

    const handleVerifyOtp = () => {
        if (otp.length > 0) {
            setShowRoleModal(true);
        } else {
            alert("Please enter the OTP");
        }
    };
 const router = useRouter();

    const handleSubmit = () => {
        if (typeof window !== 'undefined') {
            localStorage.setItem("role", selectedRole);
            localStorage.setItem("isLogin", "1");
        }
        setShowRoleModal(false);
        router.push("/user-dashboard");
        console.log('Navigating to dashboard...');
    };

    return (
        <>

            <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-6" style={{
                // background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)'
            }}>
                <div className="w-full max-w-[460px] relative">
                    {/* Success Alert */}
                    {showSwalAlert && (
                        <div className="mb-5 animate-slide-in-down">
                            <div className="glass-morphism rounded-3xl p-5  border border-indigo-100">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg">
                                        <ShieldCheck className="text-white" size={24} />
                                    </div>
                                    <div className="flex-1 pt-1">
                                        <h4 className="text-sm font-bold text-slate-900 mb-1">OTP Sent Successfully</h4>
                                        <p className="text-xs text-slate-600 leading-relaxed">
                                            Verification code has been sent to your registered mobile number
                                        </p>
                                        <p className="text-[10px] text-slate-400 mt-2 font-medium">Webel Online Services</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Main Card */}
                    <div className="glass-morphism rounded-[32px]  overflow-hidden border border-white/60 animate-scale-in">
                        {/* Header with Gradient */}
                        <div className="relative overflow-hidden">
                            {/* Background Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-blue-600 to-blue-600"></div>

                            {/* Subtle Pattern Overlay */}
                            <div className="absolute inset-0 opacity-10" style={{
                                backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
                                backgroundSize: '32px 32px'
                            }}></div>

                            {/* Shimmer Effect */}
                            <div className="absolute inset-0 gradient-shimmer"></div>

                            {/* Content */}
                            <div className="relative z-10 px-8 py-10 text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 mb-5 shadow-xl">
                                    <Lock className="text-white" size={28} />
                                </div>
                                <h1 className="text-2xl font-bold text-white tracking-tight mb-2">Individual Sign-In</h1>
                                <p className="text-indigo-100 text-sm font-medium">Sign in to access your dashboard</p>
                            </div>

                            {/* Bottom Wave */}
                            <div className="absolute bottom-0 left-0 right-0">
                                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12">
                                    <path d="M0,0 C300,80 900,80 1200,0 L1200,120 L0,120 Z" fill="rgba(248, 250, 252, 1)"></path>
                                </svg>
                            </div>
                        </div>

                        {/* Body Content */}
                        <div className="px-8 pb-8 pt-6 bg-gradient-to-b from-slate-50/90 to-white/90">
                            {/* Phone Number Input */}
                            <div className="mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 ml-1">
                                    Mobile Number
                                </label>
                                <div className="input-modern relative group">
                                    <div className="absolute inset-0 bg-gradient-to-r  rounded-2xl opacity-0 group-focus-within:opacity-100 blur-xl transition-opacity duration-500"></div>
                                    <div className="relative flex items-center bg-white border-2 border-slate-200 rounded-2xl overflow-hidden shadow-sm group-focus-within:border-indigo-500 group-focus-within:shadow-xl transition-all duration-300">
                                        <div className="pl-5 pr-3 text-slate-400 group-focus-within:text-indigo-600 transition-colors duration-300">
                                            <Smartphone size={20} strokeWidth={2.5} />
                                        </div>
                                        <input
                                            type="text"
                                            value={phoneNumber}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/\D/g, '');
                                                if (val.length <= 10) setPhoneNumber(val);
                                            }}
                                            className="flex-1 h-14 bg-transparent outline-none text-base font-semibold text-slate-900 placeholder:text-slate-400 placeholder:font-normal"
                                            placeholder="Enter 10-digit number"
                                        />
                                        {!otpSent && (
                                            <button
                                                onClick={handleSendOtp}
                                                className="btn-primary cursor-pointer m-2 px-2 h-10 bg-gradient-to-r from-blue-600 to-blue-600 hover:from-indigo-700 hover:to-violet-700 text-white text-xs font-bold rounded-xl shadow-lg"
                                            >
                                                Send OTP
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* OTP Input */}
                            {otpSent && (
                                <div className="mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 ml-1">
                                        Verification Code
                                    </label>
                                    <div className="input-modern relative group">
                                        <div className="absolute inset-0 bg-gradient-to-r  rounded-2xl opacity-0 group-focus-within:opacity-100 blur-xl transition-opacity duration-500"></div>
                                        <div className="relative flex items-center bg-white border-2 border-slate-200 rounded-2xl overflow-hidden shadow-sm group-focus-within:border-amber-500 group-focus-within:shadow-xl transition-all duration-300">
                                            <div className="pl-5 pr-3 text-slate-400 group-focus-within:text-amber-600 transition-colors duration-300">
                                                <Key size={20} strokeWidth={2.5} />
                                            </div>
                                            <input
                                                type="text"
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value)}
                                                className="flex-1 h-14 bg-transparent outline-none text-base font-semibold text-slate-900 placeholder:text-slate-400 placeholder:font-normal tracking-widest"
                                                placeholder="• • • • • •"
                                            />
                                            <button
                                                onClick={handleVerifyOtp}
                                                className="btn-secondary m-2 px-6 h-10 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-sm font-bold rounded-xl shadow-lg flex items-center gap-1.5"
                                            >
                                                Verify
                                                <ChevronRight size={16} strokeWidth={3} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mt-3 text-right">
                                        <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors bg-transparent border-none p-0 cursor-pointer">
                                            Resend Code
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Divider */}
                            <div className="relative my-8 animate-fade-in-up" style={{ animationDelay: '0.3s', opacity: 0, animationFillMode: 'forwards' }}>
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-200"></div>
                                </div>
                                <div className="relative flex justify-center">
                                    <span className="px-4 bg-gradient-to-b from-slate-50/90 to-white/90 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                        Or
                                    </span>
                                </div>
                            </div>

                            {/* Company Login Link */}
                            <div className="mb-6 animate-fade-in-up" style={{ animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards' }}>
                                <a
                                    href="/company-login"
                                    className="card-hover group flex items-center justify-between p-5 bg-white border-2 border-slate-200 hover:border-indigo-300 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-lg cursor-pointer no-underline"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 group-hover:from-indigo-100 group-hover:to-violet-100 flex items-center justify-center transition-all duration-300">
                                            <Building2 size={20} className="text-slate-600 group-hover:text-indigo-600 transition-colors duration-300" strokeWidth={2.5} />
                                        </div>
                                        <span className="text-sm font-bold text-slate-700 group-hover:text-indigo-700 transition-colors duration-300">
                                            Sign in as Organization
                                        </span>
                                    </div>
                                    <ChevronRight size={20} className="text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all duration-300" strokeWidth={2.5} />
                                </a>
                            </div>

                            {/* Sign Up Link */}
                            <div className="text-center mb-6 animate-fade-in-up" style={{ animationDelay: '0.5s', opacity: 0, animationFillMode: 'forwards' }}>
                                <p className="text-sm text-slate-600">
                                    New to the platform?{' '}
                                    <a href="/individual-sign-up" className="font-bold text-indigo-600 hover:text-indigo-700 transition-colors no-underline">
                                        Create Account →
                                    </a>
                                </p>
                            </div>

                            {/* Info Card */}
                            <div className="animate-fade-in-up" style={{ animationDelay: '0.6s', opacity: 0, animationFillMode: 'forwards' }}>
                                <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-100 rounded-2xl p-5 shadow-sm">
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
                                                <Sparkles className="text-white" size={18} />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Quick Guide</h4>
                                            <p className="text-xs leading-relaxed text-slate-700">
                                                Enter your registered mobile number and tap <span className="font-bold text-slate-900">"Send OTP"</span>.
                                                Once received, enter the verification code and click <span className="font-bold text-slate-900">"Verify"</span> to access your dashboard.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>

            {/* Role Selection Modal */}
            <Dialog open={showRoleModal} onOpenChange={setShowRoleModal}>
                <DialogContent className="sm:max-w-[500px] p-0 gap-0 border-0 rounded-[32px] overflow-hidden shadow-2xl bg-white">
                    {/* Modal Header */}
                    <DialogHeader className="relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-black"></div>
                        <div className="absolute inset-0 opacity-10" style={{
                            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
                            backgroundSize: '24px 24px'
                        }}></div>
                        <div className="relative z-10 px-8 py-8 text-center">
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 mb-4 shadow-xl">
                                <User className="text-white" size={24} />
                            </div>
                            <DialogTitle className="text-2xl font-bold text-white tracking-tight mb-2">
                                Select Your Profile
                            </DialogTitle>
                            <p className="text-slate-300 text-sm font-medium">
                                Choose the account type to continue
                            </p>
                        </div>
                    </DialogHeader>

                    {/* Modal Body */}
                    <div className="p-8 space-y-4 bg-gradient-to-b from-slate-50 to-white">
                        {/* Company Option */}
                        <div
                            onClick={() => setSelectedRole('company')}
                            className={`card-hover group cursor-pointer transition-all duration-300 ${selectedRole === 'company' ? 'scale-[1.02]' : ''
                                }`}
                        >
                            <div className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${selectedRole === 'company'
                                ? 'border-indigo-500 bg-gradient-to-br from-indigo-50 to-violet-50 shadow-xl shadow-indigo-100'
                                : 'border-slate-200 bg-white shadow-sm hover:border-slate-300 hover:shadow-md'
                                }`}>
                                <div className="flex items-center gap-5">
                                    <div className={`radio-custom flex-shrink-0 w-6 h-6 rounded-full border-[3px] flex items-center justify-center ${selectedRole === 'company'
                                        ? 'border-indigo-600 bg-indigo-600'
                                        : 'border-slate-300 bg-white'
                                        }`}>
                                        {selectedRole === 'company' && (
                                            <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className={`text-[10px] font-bold tracking-widest uppercase mb-1.5 ${selectedRole === 'company' ? 'text-indigo-600' : 'text-slate-400'
                                            }`}>
                                            Organization
                                        </div>
                                        <h3 className="font-bold text-slate-900 text-sm leading-tight">
                                            VYOMA INNOVUS GLOBAL PRIVATE LIMITED
                                        </h3>
                                    </div>
                                    <Building2
                                        size={20}
                                        className={`flex-shrink-0 ${selectedRole === 'company' ? 'text-indigo-600' : 'text-slate-400'}`}
                                        strokeWidth={2.5}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Individual Option */}
                        <div
                            onClick={() => setSelectedRole('individual')}
                            className={`card-hover group cursor-pointer transition-all duration-300 ${selectedRole === 'individual' ? 'scale-[1.02]' : ''
                                }`}
                        >
                            <div className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${selectedRole === 'individual'
                                ? 'border-indigo-500 bg-gradient-to-br from-indigo-50 to-violet-50 shadow-xl shadow-indigo-100'
                                : 'border-slate-200 bg-white shadow-sm hover:border-slate-300 hover:shadow-md'
                                }`}>
                                <div className="flex items-center gap-5">
                                    <div className={`radio-custom flex-shrink-0 w-6 h-6 rounded-full border-[3px] flex items-center justify-center ${selectedRole === 'individual'
                                        ? 'border-indigo-600 bg-indigo-600'
                                        : 'border-slate-300 bg-white'
                                        }`}>
                                        {selectedRole === 'individual' && (
                                            <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className={`text-[10px] font-bold tracking-widest uppercase mb-1.5 ${selectedRole === 'individual' ? 'text-indigo-600' : 'text-slate-400'
                                            }`}>
                                            Individual
                                        </div>
                                        <h3 className="font-bold text-slate-900 text-sm leading-tight">
                                            SOUMEN DAS
                                        </h3>
                                    </div>
                                    <User
                                        size={20}
                                        className={`flex-shrink-0 ${selectedRole === 'individual' ? 'text-indigo-600' : 'text-slate-400'}`}
                                        strokeWidth={2.5}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="p-8 pt-4 bg-white border-t border-slate-100">
                        <button
                            onClick={handleSubmit}
                            className="btn-primary w-full h-14 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold text-sm rounded-2xl  shadow-indigo-500/30 flex items-center justify-center gap-2"
                        >
                            Continue to Dashboard
                            <ChevronRight size={18} strokeWidth={3} />
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default IndividualLogin;