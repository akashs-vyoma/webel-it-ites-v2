"use client";
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {
    Home,
    LogOut,
    ChevronDown,
    ChevronRight,
    FileText,
    CreditCard,
    ShieldCheck // Added for Authority icon
} from 'lucide-react'
import Image from 'next/image'
import webelLogo from '@/components/images/webel-logo.png'
import { useRouter } from 'next/navigation';

const AdminNav = () => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState("0");

    const handleLogout = () => {
        localStorage.clear();
        router.push("/");
    };

    useEffect(() => {
        const isAdminLogin = localStorage.getItem("isAdminLogin");
        setIsLoggedIn(isAdminLogin || "0");
        if (!isAdminLogin) {
            router.push("/authority-sign-in");
        }
    }, []);

   
    const navItemClasses = "group relative flex items-center gap-2 px-4 xl:px-5 py-2.5 rounded-full text-sm font-bold text-slate-500 hover:text-cyan-600 transition-all duration-300 cursor-pointer";
    const hoverBubble = "absolute inset-0 bg-gradient-to-br from-cyan-50/0 to-blue-50/0 group-hover:from-cyan-50 group-hover:to-blue-50 rounded-full transition-all duration-300";
    const neonUnderline = "absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-cyan-500 shadow-[0_0_10px_cyan] group-hover:w-3/4 transition-all duration-300 rounded-full";
    const dropdownPanel = "absolute top-full left-0 mt-2 w-56 bg-white/95 backdrop-blur-xl border border-cyan-100 rounded-2xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top translate-y-2 group-hover:translate-y-0 z-[60]";
    const subDropdownPanel = "absolute left-full top-0 ml-1 w-56 bg-white/95 backdrop-blur-xl border border-cyan-100 rounded-2xl shadow-xl py-2 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300 transform origin-left -translate-x-2 group-hover/sub:translate-x-0";

    return (
        <nav className="sticky top-0 z-50 w-full">
            {/* Pitch White Backdrop Layer with Neon Blue Bottom Glow */}
            <div className="absolute inset-0 bg-white/95 backdrop-blur-xl border-b border-cyan-100 shadow-[0_4px_25px_rgba(6,182,212,0.15)]"></div>

            <div className="relative px-4 sm:px-6 lg:px-8 py-3">
                <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">

                    {/* Logo Section */}
                    <div className="flex-shrink-0 cursor-pointer" onClick={() => router.push('/')}>
                        <Image
                            src={webelLogo}
                            alt="Webel - opportunities infinite"
                            width={150}
                            height={60}
                            className="h-10 w-auto object-contain"
                        />
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden lg:flex items-center gap-1 xl:gap-2">

                        {/* Home */}
                        <Link href="/authority-dashboard" className={navItemClasses}>
                            <div className={hoverBubble}></div>
                            <Home size={18} className="relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:text-cyan-500" />
                            <span className="relative z-10">Home</span>
                            <div className={neonUnderline}></div>
                        </Link>

                        {isLoggedIn !== "1" && (
                            <div className="group relative">
                                <div className={navItemClasses}>
                                    <div className={hoverBubble}></div>
                                    <ShieldCheck size={18} className="relative z-10 group-hover:text-cyan-500" />
                                    <span className="relative z-10">Authority</span>
                                    <ChevronDown size={14} className="relative z-10 transition-transform duration-300 group-hover:rotate-180" />
                                    <div className={neonUnderline}></div>
                                </div>

                                <div className={dropdownPanel}>
                                    <Link href="/authority-sign-in" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-cyan-50 text-slate-600 hover:text-cyan-600 transition-colors font-semibold text-sm">
                                        Login
                                    </Link>
                                    <Link href="https://udin.wb.gov.in/add-authperson" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-cyan-50 text-slate-600 hover:text-cyan-600 transition-colors font-semibold text-sm">
                                        Verify Authorised Person
                                    </Link>
                                </div>
                            </div>
                        )}

                        {isLoggedIn == "1" && (
                            <>
                                {/* Reports Dropdown */}
                                <div className="group relative">
                                    <div className={navItemClasses}>
                                        <div className={hoverBubble}></div>
                                        <FileText size={18} className="relative z-10 group-hover:text-cyan-500" />
                                        <span className="relative z-10">Reports</span>
                                        <ChevronDown size={14} className="relative z-10 transition-transform duration-300 group-hover:rotate-180" />
                                        <div className={neonUnderline}></div>
                                    </div>

                                    {/* Main Dropdown Panel */}
                                    <div className={dropdownPanel}>
                                        {/* By Certificate Submenu */}
                                        <div className="group/sub relative px-2">
                                            <div className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-cyan-50 text-slate-600 hover:text-cyan-600 transition-colors cursor-pointer font-semibold text-sm">
                                                <div className="flex items-center gap-3">
                                                    <FileText size={16} />
                                                    <span>By Certificate</span>
                                                </div>
                                                <ChevronRight size={14} />
                                            </div>

                                            <div className={subDropdownPanel}>
                                                <Link href="/get-provisional-report" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-cyan-50 text-slate-600 hover:text-cyan-600 transition-colors font-semibold text-sm">
                                                    <FileText size={16} className="text-cyan-500" /> Provisional NOC
                                                </Link>
                                                <Link href="/get-webel-report" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-cyan-50 text-slate-600 hover:text-cyan-600 transition-colors font-semibold text-sm">
                                                    <FileText size={16} className="text-cyan-500" /> Webel Declaration
                                                </Link>
                                                <Link href="/get-final-report" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-cyan-50 text-slate-600 hover:text-cyan-600 transition-colors font-semibold text-sm">
                                                    <FileText size={16} className="text-cyan-500" /> Final NOC
                                                </Link>
                                            </div>
                                        </div>

                                        {/* By Approval Submenu */}
                                        <div className="group/sub relative px-2">
                                            <div className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-cyan-50 text-slate-600 hover:text-cyan-600 transition-colors cursor-pointer font-semibold text-sm">
                                                <div className="flex items-center gap-3">
                                                    <FileText size={16} />
                                                    <span>By Approval</span>
                                                </div>
                                                <ChevronRight size={14} />
                                            </div>

                                            <div className={subDropdownPanel}>
                                                <Link href="/get-approved-report" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-cyan-50 text-slate-600 hover:text-cyan-600 transition-colors font-semibold text-sm">
                                                    <FileText size={16} className="text-green-500" /> Approved NOC
                                                </Link>
                                                <Link href="/get-rejected-report" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-cyan-50 text-slate-600 hover:text-cyan-600 transition-colors font-semibold text-sm">
                                                    <FileText size={16} className="text-red-500" /> Rejected NOC
                                                </Link>
                                                <Link href="/get-query-report" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-cyan-50 text-slate-600 hover:text-cyan-600 transition-colors font-semibold text-sm">
                                                    <FileText size={16} className="text-amber-500" /> Query Generated NOC
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* UDIN Doc Payment History */}
                                <Link href="/get-udin-doc-payment-historyreport" className={navItemClasses}>
                                    <div className={hoverBubble}></div>
                                    <CreditCard size={18} className="relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:text-cyan-500" />
                                    <span className="relative z-10">UDIN Doc Payment History</span>
                                    <div className={neonUnderline}></div>
                                </Link>

                                {/* Logout Button */}
                                <button onClick={handleLogout} className={navItemClasses + " ml-2"}>
                                    <div className={hoverBubble}></div>
                                    <LogOut size={18} className="relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-x-0.5 group-hover:text-cyan-500" />
                                    <span className="relative z-10">Log Out</span>
                                    <div className="absolute inset-0 border border-transparent group-hover:border-cyan-200 rounded-full transition-all duration-300 group-hover:shadow-[0_0_10px_rgba(6,182,212,0.2)]"></div>
                                </button>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="lg:hidden relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/80 backdrop-blur-sm border border-slate-200 shadow-sm hover:shadow-[0_0_10px_cyan] hover:border-cyan-300 transition-all duration-300 cursor-pointer">
                        <div className="flex flex-col items-center justify-center gap-1.5">
                            <div className="w-5 h-0.5 bg-slate-400 rounded-full shadow-[0_0_2px_rgba(0,0,0,0.1)] group-hover:bg-cyan-500"></div>
                            <div className="w-5 h-0.5 bg-slate-400 rounded-full shadow-[0_0_2px_rgba(0,0,0,0.1)] group-hover:bg-cyan-500"></div>
                            <div className="w-5 h-0.5 bg-slate-400 rounded-full shadow-[0_0_2px_rgba(0,0,0,0.1)] group-hover:bg-cyan-500"></div>
                        </div>
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default AdminNav;