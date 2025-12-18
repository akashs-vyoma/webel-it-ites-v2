"use client";
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {
    ChevronDown,
    CreditCard,
    FileText,
    FolderOpen,
    Home,
    LogOut,
    Users,
    CloudUpload,
    Search,
    FilePlus,
    FileCode,
    FileSignature,
    RefreshCcw,
    History,
    Menu,
    X
} from 'lucide-react'
import Image from 'next/image'
import webelLogo from '@/components/images/webel-logo.png'
import { useRouter } from 'next/navigation';

const CommonNav = () => {
    const [isLoggedin, setIsLoggedin] = useState("0");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const isLogin = localStorage.getItem("isLogin")
        setIsLoggedin(isLogin || "0")
    }, [])

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <nav className="sticky top-0 z-50 w-full">
            {/* Pitch White Backdrop Layer with Neon Blue Bottom Glow */}
            <div className="absolute inset-0 bg-white/95 backdrop-blur-xl border-b border-cyan-100 shadow-[0_4px_25px_rgba(6,182,212,0.15)]"></div>

            {/* Main content container */}
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

                    {/* Desktop Navigation Links (Hidden on mobile) */}
                    <div className="hidden lg:flex items-center gap-1 xl:gap-2">
                        {/* Home Link */}
                        <Link
                            href="/"
                            className="group relative flex items-center gap-2 px-4 xl:px-5 py-2.5 rounded-full text-sm font-bold text-slate-500 hover:text-cyan-600 transition-all duration-300 cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/0 to-blue-50/0 group-hover:from-cyan-50 group-hover:to-blue-50 rounded-full transition-all duration-300"></div>
                            <Home size={18} className="relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:text-cyan-500" />
                            <span className="relative z-10">Home</span>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-cyan-500 shadow-[0_0_10px_cyan] group-hover:w-3/4 transition-all duration-300 rounded-full"></div>
                        </Link>

                        {isLoggedin === "1" && (
                            <>
                                {/* My Documents Dropdown */}
                                <div className="relative group">
                                    <button className="relative flex items-center gap-2 px-4 xl:px-5 py-2.5 rounded-full text-sm font-bold text-slate-500 hover:text-cyan-600 transition-all duration-300 cursor-pointer">
                                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/0 to-blue-50/0 group-hover:from-cyan-50 group-hover:to-blue-50 rounded-full transition-all duration-300"></div>
                                        <FolderOpen size={18} className="relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:text-cyan-500" />
                                        <span className="relative z-10">My Documents</span>
                                        <ChevronDown size={16} className="relative z-10 transition-transform duration-300 group-hover:rotate-180" />
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-cyan-500 shadow-[0_0_10px_cyan] group-hover:w-3/4 transition-all duration-300 rounded-full"></div>
                                    </button>
                                    <div className="absolute top-full left-0 mt-3 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                        <div className="bg-white/95 backdrop-blur-2xl border border-cyan-100 shadow-2xl shadow-cyan-500/10 rounded-2xl p-2 space-y-1">
                                            <Link href="/non-individual-upload-document" className="relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:text-cyan-600 hover:bg-cyan-50/50 transition-all duration-200 group/item cursor-pointer">
                                                <CloudUpload size={18} className="text-slate-400 transition-transform duration-200 group-hover/item:scale-110 group-hover/item:text-cyan-500" />
                                                <span>Upload Documents</span>
                                            </Link>
                                            <Link href="/my-documents" className="relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:text-cyan-600 hover:bg-cyan-50/50 transition-all duration-200 group/item cursor-pointer">
                                                <FolderOpen size={18} className="text-slate-400 transition-transform duration-200 group-hover/item:scale-110 group-hover/item:text-cyan-500" />
                                                <span>View Documents</span>
                                            </Link>
                                            <Link href="/home-udin" className="relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:text-cyan-600 hover:bg-cyan-50/50 transition-all duration-200 group/item cursor-pointer">
                                                <Search size={18} className="text-slate-400 transition-transform duration-200 group-hover/item:scale-110 group-hover/item:text-cyan-500" />
                                                <span>Search By UDIN</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* My Application Dropdown */}
                                <div className="relative group">
                                    <button className="relative flex items-center gap-2 px-4 xl:px-5 py-2.5 rounded-full text-sm font-bold text-slate-500 hover:text-cyan-600 transition-all duration-300 cursor-pointer">
                                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/0 to-blue-50/0 group-hover:from-cyan-50 group-hover:to-blue-50 rounded-full transition-all duration-300"></div>
                                        <FileText size={18} className="relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:text-cyan-500" />
                                        <span className="relative z-10">My Application</span>
                                        <ChevronDown size={16} className="relative z-10 transition-transform duration-300 group-hover:rotate-180" />
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-cyan-500 shadow-[0_0_10px_cyan] group-hover:w-3/4 transition-all duration-300 rounded-full"></div>
                                    </button>
                                    <div className="absolute top-full left-0 mt-3 w-80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                        <div className="bg-white/95 backdrop-blur-2xl border border-cyan-100 shadow-2xl shadow-cyan-500/10 rounded-2xl p-2 space-y-1">
                                            <Link href="/apply-noc" className="relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:text-cyan-600 hover:bg-cyan-50/50 transition-all duration-200 group/item cursor-pointer">
                                                <FilePlus size={18} className="text-slate-400 transition-transform duration-200 group-hover/item:scale-110 group-hover/item:text-cyan-500" />
                                                <span>Create Application</span>
                                            </Link>
                                            <Link href="/application-document" className="relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:text-cyan-600 hover:bg-cyan-50/50 transition-all duration-200 group/item cursor-pointer">
                                                <FileCode size={18} className="text-slate-400 transition-transform duration-200 group-hover/item:scale-110 group-hover/item:text-cyan-500" />
                                                <span>View Application</span>
                                            </Link>
                                            <Link href="/NOC" className="relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:text-cyan-600 hover:bg-cyan-50/50 transition-all duration-200 group/item cursor-pointer">
                                                <FileSignature size={18} className="text-slate-400 transition-transform duration-200 group-hover/item:scale-110 group-hover/item:text-cyan-500" />
                                                <span>Generate NOC Declaration</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* My Multi-Party Declaration Dropdown */}
                                <div className="relative group">
                                    <button className="relative flex items-center gap-2 px-4 xl:px-5 py-2.5 rounded-full text-sm font-bold text-slate-500 hover:text-cyan-600 transition-all duration-300 cursor-pointer">
                                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/0 to-blue-50/0 group-hover:from-cyan-50 group-hover:to-blue-50 rounded-full transition-all duration-300"></div>
                                        <Users size={18} className="relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:text-cyan-500" />
                                        <span className="relative z-10 whitespace-nowrap">Multi-Party Declaration</span>
                                        <ChevronDown size={16} className="relative z-10 transition-transform duration-300 group-hover:rotate-180" />
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-cyan-500 shadow-[0_0_10px_cyan] group-hover:w-3/4 transition-all duration-300 rounded-full"></div>
                                    </button>
                                    <div className="absolute top-full left-0 mt-3 w-96 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                        <div className="bg-white/95 backdrop-blur-2xl border border-cyan-100 shadow-2xl shadow-cyan-500/10 rounded-2xl p-2 space-y-1">
                                            <Link href="/apply-for-multiparty-declation" className="relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:text-cyan-600 hover:bg-cyan-50/50 transition-all duration-200 group/item cursor-pointer">
                                                <FileSignature size={18} className="text-slate-400 transition-transform duration-200 group-hover/item:scale-110 group-hover/item:text-cyan-500" />
                                                <span>Generate Multi-Party Declaration</span>
                                            </Link>
                                            <Link href="/my-multiparty-documents" className="relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:text-cyan-600 hover:bg-cyan-50/50 transition-all duration-200 group/item cursor-pointer">
                                                <FileText size={18} className="text-slate-400 transition-transform duration-200 group-hover/item:scale-110 group-hover/item:text-cyan-500" />
                                                <span>View Multi-Party Declaration</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Transaction Dropdown */}
                                <div className="relative group">
                                    <button className="relative flex items-center gap-2 px-4 xl:px-5 py-2.5 rounded-full text-sm font-bold text-slate-500 hover:text-cyan-600 transition-all duration-300 cursor-pointer">
                                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/0 to-blue-50/0 group-hover:from-cyan-50 group-hover:to-blue-50 rounded-full transition-all duration-300"></div>
                                        <CreditCard size={18} className="relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:text-cyan-500" />
                                        <span className="relative z-10">Transaction</span>
                                        <ChevronDown size={16} className="relative z-10 transition-transform duration-300 group-hover:rotate-180" />
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-cyan-500 shadow-[0_0_10px_cyan] group-hover:w-3/4 transition-all duration-300 rounded-full"></div>
                                    </button>
                                    <div className="absolute top-full right-0 mt-3 w-80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                        <div className="bg-white/95 backdrop-blur-2xl border border-cyan-100 shadow-2xl shadow-cyan-500/10 rounded-2xl p-2 space-y-1">
                                            <Link href="/transaction-history" className="relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:text-cyan-600 hover:bg-cyan-50/50 transition-all duration-200 group/item cursor-pointer">
                                                <RefreshCcw size={18} className="text-slate-400 transition-transform duration-200 group-hover/item:scale-110 group-hover/item:text-cyan-500" />
                                                <span>Transaction History</span>
                                            </Link>
                                            <Link href="/pending-udin-amount" className="relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:text-cyan-600 hover:bg-cyan-50/50 transition-all duration-200 group/item cursor-pointer">
                                                <CreditCard size={18} className="text-slate-400 transition-transform duration-200 group-hover/item:scale-110 group-hover/item:text-cyan-500" />
                                                <span>Pending UDIN Amount</span>
                                            </Link>
                                            <Link href="/get-user-udin-doc-payment-histroy" className="relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:text-cyan-600 hover:bg-cyan-50/50 transition-all duration-200 group/item cursor-pointer">
                                                <History size={18} className="text-slate-400 transition-transform duration-200 group-hover/item:scale-110 group-hover/item:text-cyan-500" />
                                                <span>UDIN Doc Payment History</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Logout Button */}
                                <button
                                    onClick={() => {
                                        localStorage.clear()
                                        router.push("/")
                                    }}
                                    className="group relative flex items-center gap-2 px-4 xl:px-5 py-2.5 rounded-full text-sm font-bold text-slate-500 hover:text-cyan-600 transition-all duration-300 cursor-pointer ml-2"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/0 to-blue-50/0 group-hover:from-cyan-50 group-hover:to-blue-50 rounded-full transition-all duration-300"></div>
                                    <LogOut size={18} className="relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-x-0.5 group-hover:text-cyan-500" />
                                    <span className="relative z-10">Log Out</span>
                                    <div className="absolute inset-0 border border-transparent group-hover:border-cyan-200 rounded-full transition-all duration-300 group-hover:shadow-[0_0_10px_rgba(6,182,212,0.2)]"></div>
                                </button>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button 
                        onClick={toggleMobileMenu}
                        className="lg:hidden relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/80 backdrop-blur-sm border border-slate-200 shadow-sm hover:shadow-[0_0_10px_cyan] hover:border-cyan-300 transition-all duration-300 cursor-pointer z-[60]"
                    >
                        {isMobileMenuOpen ? <X size={20} className="text-cyan-600" /> : <Menu size={20} className="text-slate-600" />}
                    </button>
                </div>
            </div>

            {/* Mobile Sidebar Navigation */}
            <div className={`fixed inset-y-0 right-0 w-full max-w-xs bg-white/95 backdrop-blur-2xl shadow-2xl border-l border-cyan-100 transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out lg:hidden z-[55]`}>
                <div className="flex flex-col h-full pt-20 pb-6 px-6 overflow-y-auto">
                    <Link href="/" className="flex items-center gap-3 py-4 text-slate-600 font-bold border-b border-slate-50" onClick={() => setIsMobileMenuOpen(false)}>
                        <Home size={18} className="text-cyan-500" /> Home
                    </Link>

                    {isLoggedin === "1" && (
                        <div className="space-y-6 mt-4">
                            {/* Mobile Section: Documents */}
                            <div className="space-y-3">
                                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold px-1">Documents</p>
                                <div className="grid gap-2">
                                    <Link href="/non-individual-upload-document" className="flex items-center gap-3 p-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-cyan-50 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                                        <CloudUpload size={18} className="text-slate-400" /> Upload Documents
                                    </Link>
                                    <Link href="/my-documents" className="flex items-center gap-3 p-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-cyan-50 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                                        <FolderOpen size={18} className="text-slate-400" /> View Documents
                                    </Link>
                                </div>
                            </div>

                            {/* Mobile Section: Application */}
                            <div className="space-y-3">
                                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold px-1">Application</p>
                                <div className="grid gap-2">
                                    <Link href="/apply-noc" className="flex items-center gap-3 p-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-cyan-50 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                                        <FilePlus size={18} className="text-slate-400" /> Create Application
                                    </Link>
                                    <Link href="/application-document" className="flex items-center gap-3 p-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-cyan-50 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                                        <FileCode size={18} className="text-slate-400" /> View Application
                                    </Link>
                                </div>
                            </div>

                            {/* Mobile Section: Transactions */}
                            <div className="space-y-3">
                                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold px-1">Financial</p>
                                <div className="grid gap-2">
                                    <Link href="/transaction-history" className="flex items-center gap-3 p-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-cyan-50 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                                        <RefreshCcw size={18} className="text-slate-400" /> History
                                    </Link>
                                    <button 
                                        onClick={() => { localStorage.clear(); router.push("/"); setIsMobileMenuOpen(false); }}
                                        className="flex items-center gap-3 p-3 mt-4 rounded-xl text-sm font-bold text-red-500 bg-red-50/50"
                                    >
                                        <LogOut size={18} /> Log Out
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Overlay Backdrop */}
            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-50 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                ></div>
            )}
        </nav>
    )
}

export default CommonNav