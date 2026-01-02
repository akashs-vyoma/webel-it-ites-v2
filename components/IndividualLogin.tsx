"use client"
import React, { useState, useEffect } from 'react';
import { Smartphone, Key, ShieldCheck, ChevronRight, User, Building2, Sparkles, Lock } from 'lucide-react';
import { useRouter } from "next/navigation";


// Shadcn UI Imports
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { callAPI } from './apis/commonAPIs';
import Swal from "sweetalert2";

const IndividualLogin: React.FC = () => {
    const [aadhaarNumber, setAadhaarNumber] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [showRoleModal, setShowRoleModal] = useState(false);
    const [selectedRole, setSelectedRole] = useState<string>('individual');
    const [showSwalAlert, setShowSwalAlert] = useState(false);
    const [accounts, setAccounts] = useState([]);
    const [accountName, setAccountName] = useState('');

    // Independent Loading States
    const [sendingOtp, setSendingOtp] = useState(false);
    const [verifyingOtp, setVerifyingOtp] = useState(false);

    // Timer state for Resend OTP (30 seconds)
    const [timer, setTimer] = useState(0);

    // Countdown logic
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    // Small Swal Config Helper
    const smallSwal = {
        width: '340px',
        customClass: {
            title: 'text-lg font-bold',
            htmlContainer: 'text-sm',
            confirmButton: 'text-xs px-4 py-2'
        }
    };

    const handleSendOtp = async () => {
        try {
            setSendingOtp(true);
            if (aadhaarNumber.length === 12) {
                const result = await callAPI("/udin/individualRegisterAndSendOtp", { aadhaar_number: aadhaarNumber });

                if (result.status == 0) {
                    localStorage.setItem("token", result.data.token);
                    setOtpSent(true);
                    setShowSwalAlert(true);
                    setTimer(60);

                    Swal.fire({
                        ...smallSwal,
                        icon: "success",
                        title: "OTP Sent",
                        text: `OTP sent to mobile linked with Aadhaar`,
                        confirmButtonColor: "#06b6d4",
                    });

                } else {
                    Swal.fire({
                        ...smallSwal,
                        icon: "error",
                        title: "Error",
                        text: result.message,
                        confirmButtonColor: "#ef4444",
                    });
                }
            } else {
                Swal.fire({
                    ...smallSwal,
                    icon: "warning",
                    title: "Invalid Aadhaar",
                    text: "Please enter a valid 12-digit number",
                    confirmButtonColor: "#f59e0b",
                });
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
            Swal.fire({
                ...smallSwal,
                icon: "error",
                title: "Failed",
                text: "Failed to send OTP. Try again later.",
                confirmButtonColor: "#ef4444",
            });
        } finally {
            setShowSwalAlert(false);
            setSendingOtp(false);
        }
    };

    const handleResendOtp = async () => {
        if (timer > 0 || sendingOtp) return;
        await handleSendOtp();
    };

    const handleVerifyOtp = async () => {
        try {
            setVerifyingOtp(true);
            if (otp.length > 0) {
                const token = localStorage.getItem("token");
                const result = await callAPI("/udin/individualValidateAadhaarOtp", { aadhaar_number: aadhaarNumber, otp, token });

                if (result.status == 0) {
                    Swal.fire({
                        ...smallSwal,
                        icon: "success",
                        title: "Verified",
                        text: "OTP verified successfully",
                        confirmButtonColor: "#06b6d4",
                    }).then(() => {
                        localStorage.removeItem("token");
                        localStorage.setItem("authToken", result.data.token);
                        setAccounts(result?.data?.udin_profile_details?.accounts);
                        if (result?.data?.udin_profile_details?.accounts?.length == 1) {
                            setSelectedRole(result?.data?.udin_profile_details?.accounts?.[0]?.account_type === 'INDIVIDUAL' ? 'individual' : 'company');
                            setAccountName(result?.data?.udin_profile_details?.accounts?.[0]?.account_name);
                        }
                        setShowRoleModal(true);
                    });
                } else {
                    Swal.fire({
                        ...smallSwal,
                        icon: "error",
                        title: "Failed",
                        text: result.message,
                        confirmButtonColor: "#ef4444",
                    });
                }
            } else {
                Swal.fire({
                    ...smallSwal,
                    icon: "warning",
                    title: "Required",
                    text: "Please enter the OTP",
                    confirmButtonColor: "#f59e0b",
                });
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            Swal.fire({
                ...smallSwal,
                icon: "error",
                title: "Failed",
                text: "Failed to verify. Try again later.",
                confirmButtonColor: "#ef4444",
            });
        } finally {
            setVerifyingOtp(false);
        }
    };

    const router = useRouter();

    const handleSubmit = () => {
        if (typeof window !== 'undefined') {
            localStorage.setItem("role", selectedRole);
            localStorage.setItem("account_name", accountName);
            localStorage.setItem("isLogin", "1");
        }
        setShowRoleModal(false);
        router.push("/user-dashboard");
    };

    return (
        <>
            <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-6">
                <div className="w-full max-w-[460px] relative">
                    {/* Success Notification Bar */}
                    {showSwalAlert && (
                        <div className="mb-5 animate-slide-in-down">
                            <div className="glass-morphism rounded-3xl p-5 border border-indigo-100">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg">
                                        <ShieldCheck className="text-white" size={24} />
                                    </div>
                                    <div className="flex-1 pt-1">
                                        <h4 className="text-sm font-bold text-slate-900 mb-1">OTP Sent Successfully</h4>
                                        <p className="text-xs text-slate-600 leading-relaxed">
                                            Verification code sent to your linked mobile.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Main Card */}
                    <div className="glass-morphism rounded-[32px] overflow-hidden border border-white/60 animate-scale-in">
                        <div className="relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-blue-600 to-blue-600"></div>
                            <div className="absolute inset-0 opacity-10" style={{
                                backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
                                backgroundSize: '32px 32px'
                            }}></div>
                            <div className="absolute inset-0 gradient-shimmer"></div>
                            <div className="relative z-10 px-8 py-10 text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 mb-5 shadow-xl">
                                    <Lock className="text-white" size={28} />
                                </div>
                                <h1 className="text-2xl font-bold text-white tracking-tight mb-2">Individual Sign-In</h1>
                                <p className="text-indigo-100 text-sm font-medium">Sign in to access your dashboard</p>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0">
                                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12">
                                    <path d="M0,0 C300,80 900,80 1200,0 L1200,120 L0,120 Z" fill="rgba(248, 250, 252, 1)"></path>
                                </svg>
                            </div>
                        </div>

                        <div className="px-8 pb-8 pt-6 bg-gradient-to-b from-slate-50/90 to-white/90">
                            {/* Aadhaar Input */}
                            <div className="mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 ml-1">
                                    Aadhar Number
                                </label>
                                <div className="input-modern relative group">
                                    <div className="relative flex items-center bg-white border-2 border-slate-200 rounded-2xl overflow-hidden shadow-sm group-focus-within:border-indigo-500 transition-all duration-300">
                                        <div className="pl-5 pr-3 text-slate-400 group-focus-within:text-indigo-600">
                                            <Smartphone size={20} strokeWidth={2.5} />
                                        </div>
                                        <input
                                            type="text"
                                            value={aadhaarNumber}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/\D/g, '');
                                                if (val.length <= 12) setAadhaarNumber(val);
                                            }}
                                            className="flex-1 h-14 bg-transparent outline-none text-base font-semibold text-slate-900 placeholder:text-slate-400"
                                            placeholder="Enter 12-digit number"
                                        />
                                        {!otpSent && (
                                            <button
                                                onClick={handleSendOtp}
                                                disabled={sendingOtp}
                                                className="btn-primary cursor-pointer m-2 px-3 h-10 bg-blue-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-lg"
                                            >
                                                {sendingOtp ? 'Sending...' : 'Send OTP'}
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
                                        <div className="relative flex items-center bg-white border-2 border-slate-200 rounded-2xl overflow-hidden shadow-sm group-focus-within:border-amber-500 transition-all duration-300">
                                            <div className="pl-5 pr-3 text-slate-400 group-focus-within:text-amber-600">
                                                <Key size={20} strokeWidth={2.5} />
                                            </div>
                                            <input
                                                type="text"
                                                value={otp}
                                                onChange={(e) => {
                                                    const value = e.target.value.replace(/\D/g, "");
                                                    if (value.length <= 6) setOtp(value);
                                                }}
                                                className="flex-1 h-14 bg-transparent outline-none text-base font-semibold text-slate-900 tracking-widest"
                                                placeholder="• • • • • •"
                                            />
                                            <button
                                                onClick={handleVerifyOtp}
                                                disabled={verifyingOtp}
                                                className="btn-secondary m-2 px-6 h-10 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold rounded-xl flex items-center gap-1.5"
                                            >
                                                {verifyingOtp ? 'Verifying...' : 'Verify'}
                                                <ChevronRight size={16} strokeWidth={3} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mt-3 text-right">
                                        <button
                                            onClick={handleResendOtp}
                                            disabled={sendingOtp || timer > 0}
                                            className={`text-xs font-bold transition-colors bg-transparent border-none p-0 cursor-pointer ${timer > 0 ? 'text-slate-400' : 'text-indigo-600 hover:text-indigo-700'}`}
                                        >
                                            {sendingOtp ? 'Resending...' : (timer > 0 ? `Resend OTP in ${timer}s` : 'Resend OTP')}
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div className="relative my-8">
                                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
                                <div className="relative flex justify-center">
                                    <span className="px-4 bg-white text-xs font-bold text-slate-400 uppercase tracking-wider">Or</span>
                                </div>
                            </div>

                            <div className="mb-6">
                                <a href="/company-login" className="group flex items-center justify-between p-5 bg-white border-2 border-slate-200 hover:border-indigo-300 rounded-2xl transition-all no-underline">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-indigo-100 flex items-center justify-center">
                                            <Building2 size={20} className="text-slate-600 group-hover:text-indigo-600" />
                                        </div>
                                        <span className="text-sm font-bold text-slate-700 group-hover:text-indigo-700">Sign in as Organization</span>
                                    </div>
                                    <ChevronRight size={20} className="text-slate-400 group-hover:translate-x-1 transition-all" />
                                </a>
                            </div>

                            <div className="text-center mb-6">
                                <p className="text-sm text-slate-600">
                                    New to the platform?{' '}
                                    <a href="/individual-sign-up" className="font-bold text-indigo-600 no-underline">Create Account →</a>
                                </p>
                            </div>

                            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-100 rounded-2xl p-5">
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                                            <Sparkles className="text-white" size={18} />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Quick Guide</h4>
                                        <p className="text-xs text-slate-700">
                                            Enter your Aadhar number and tap <span className="font-bold">"Send OTP"</span>. Once received, click <span className="font-bold">"Verify"</span> to continue.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Selection Modal */}
            <Dialog open={showRoleModal} onOpenChange={setShowRoleModal}>
                <DialogContent className="sm:max-w-[500px] p-0 gap-0 border-0 rounded-[32px] overflow-hidden shadow-2xl bg-white">
                    <DialogHeader className="relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-black"></div>
                        <div className="relative z-10 px-8 py-8 text-center">
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 mb-4">
                                <User className="text-white" size={24} />
                            </div>
                            <DialogTitle className="text-2xl font-bold text-white tracking-tight mb-2">Select Your Profile</DialogTitle>
                            <p className="text-slate-300 text-sm font-medium">Choose account type to continue</p>
                        </div>
                    </DialogHeader>

                    <div className="p-8 space-y-4 bg-gradient-to-b from-slate-50 to-white">
                        {accounts?.map((account: any, index) => (
                            <div
                                key={index}
                                onClick={() => {
                                    setSelectedRole(account?.account_type === 'INDIVIDUAL' ? 'individual' : 'company');
                                    setAccountName(account?.account_name);
                                    console.log(account?.account_name);
                                }}
                                className={`group cursor-pointer transition-all duration-300 ${selectedRole === (account?.account_type === 'INDIVIDUAL' ? 'individual' : 'company') ? 'scale-[1.02]' : ''}`}
                            >
                                <div className={`p-6 rounded-2xl border-2 transition-all ${(account?.account_type === 'INDIVIDUAL' ? 'individual' : 'company') === selectedRole
                                    ? 'border-indigo-500 bg-indigo-50/50 shadow-lg shadow-indigo-100'
                                    : 'border-slate-200 bg-white hover:border-slate-300'
                                    }`}>
                                    <div className="flex items-center gap-5">
                                        <div className={`w-6 h-6 rounded-full border-[3px] flex items-center justify-center ${(account?.account_type === 'INDIVIDUAL' ? 'individual' : 'company') === selectedRole ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'
                                            }`}>
                                            {(account?.account_type === 'INDIVIDUAL' ? 'individual' : 'company') === selectedRole && <div className="w-2.5 h-2.5 rounded-full bg-white"></div>}
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-[10px] font-bold tracking-widest uppercase mb-1.5 text-slate-400">
                                                {account?.account_type === 'INDIVIDUAL' ? 'Individual' : 'Authorized Person'}
                                            </div>
                                            <h3 className="font-bold text-slate-900 text-sm">{account?.account_name}</h3>
                                        </div>
                                        {account?.account_type === 'INDIVIDUAL' ? <User size={20} className="text-slate-400" /> : <Building2 size={20} className="text-slate-400" />}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-8 pt-4 bg-white border-t border-slate-100">
                        <button
                            onClick={handleSubmit}
                            className="w-full h-14 bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-90 text-white font-bold text-sm rounded-2xl flex items-center justify-center gap-2 transition-all"
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