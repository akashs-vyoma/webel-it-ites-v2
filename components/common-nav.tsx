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
    History
} from 'lucide-react'
import Image from 'next/image'
import webelLogo from '@/components/images/webel-logo.png'
import { useRouter } from 'next/navigation';

const CommonNav = () => {
    const [isLoggedin, setIsLoggedin] = useState("0");
    const router = useRouter();

    useEffect(() => {
        const isLogin = localStorage.getItem("isLogin")
        setIsLoggedin(isLogin || "0")
    }, [])

    return (
        <nav className="relative z-50 w-full bg-white shadow-sm border-b border-gray-200 px-6 py-3 flex justify-between items-center h-16">
            <div className="flex flex-col leading-none">
                <Image
                    src={webelLogo}
                    alt="Webel - opportunities infinite"
                    width={150}
                    height={60}
                    className="h-12 w-auto object-contain"
                />
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm font-bold text-gray-800">
                <Link href="/" className="flex items-center gap-1 hover:text-[#004a93] transition-colors">
                    <Home size={16} />
                    Home
                </Link>

                {isLoggedin === "1" && (
                    <>
                        {/* My Documents Dropdown */}
                        <div className="relative group">
                            <button className="flex items-center gap-1 hover:text-[#004a93] transition-colors py-4">
                                <FolderOpen size={16} /> My Documents <ChevronDown size={14} />
                            </button>
                            <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-b-md border-t-2 border-[#004a93] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                                <Link href="/non-individual-upload-document" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 text-gray-700">
                                    <CloudUpload size={16} /> Upload Documents
                                </Link>
                                <Link href="/my-documents" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 text-gray-700">
                                    <FolderOpen size={16} /> View Documents
                                </Link>
                                <Link href="/home-udin" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 text-gray-700">
                                    <Search size={16} /> Search By UDIN
                                </Link>
                            </div>
                        </div>

                        {/* My Application Dropdown */}
                        <div className="relative group">
                            <button className="flex items-center gap-1 hover:text-[#004a93] transition-colors py-4">
                                <FileText size={16} /> My Application <ChevronDown size={14} />
                            </button>
                            <div className="absolute top-full left-0 w-72 bg-white shadow-xl rounded-b-md border-t-2 border-[#004a93] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                                <Link href="/apply-noc" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 text-gray-700">
                                    <FilePlus size={16} /> Create Application
                                </Link>
                                <Link href="/application-document" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 text-gray-700">
                                    <FileCode size={16} /> View Application
                                </Link>
                                <Link href="/NOC" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 text-gray-700">
                                    <FileSignature size={16} /> Generate NOC Declaration Letter
                                </Link>
                            </div>
                        </div>

                        {/* My Multi-Party Declaration Dropdown */}
                        <div className="relative group">
                            <button className="flex items-center gap-1 hover:text-[#004a93] transition-colors py-4">
                                <Users size={16} /> My Multi-Party Declaration <ChevronDown size={14} />
                            </button>
                            <div className="absolute top-full left-0 w-80 bg-white shadow-xl rounded-b-md border-t-2 border-[#004a93] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                                <Link href="/apply-for-multiparty-declation" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 text-gray-700">
                                    <FileSignature size={16} /> Generate Multi-Party Declaration
                                </Link>
                                <Link href="/my-multiparty-documents" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 text-gray-700">
                                    <FileText size={16} /> View Multi-Party Declaration
                                </Link>
                            </div>
                        </div>

                        {/* Transaction Dropdown */}
                        <div className="relative group">
                            <button className="flex items-center gap-1 hover:text-[#004a93] transition-colors py-4">
                                <CreditCard size={16} /> Transaction <ChevronDown size={14} />
                            </button>
                            <div className="absolute top-full right-0 w-64 bg-white shadow-xl rounded-b-md border-t-2 border-[#004a93] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                                <Link href="/transaction-history" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 text-gray-700">
                                    <RefreshCcw size={16} /> Transaction History
                                </Link>
                                <Link href="/pending-udin-amount" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 text-gray-700">
                                    <CreditCard size={16} /> Pending UDIN Amount
                                </Link>
                                <Link href="/get-user-udin-doc-payment-histroy" className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 text-gray-700">
                                    <History size={16} /> UDIN Doc Payment History
                                </Link>
                            </div>
                        </div>

                        {/* Logout Button */}
                        <button onClick={() => {
                            localStorage.clear()
                            router.push("/")
                        }} className="flex items-center gap-1 hover:text-[#004a93] transition-colors">
                            <LogOut size={16} /> Log Out
                        </button>
                    </>
                )}
            </div>
        </nav>
    )
}

export default CommonNav