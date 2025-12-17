"use client";
import React from 'react'
import Link from 'next/link'
import {
    Home,
    LogOut,
    Building2,
    UserPlus
} from 'lucide-react'
import Image from 'next/image'
import webelLogo from '@/components/images/webel-logo.png'
import { useRouter } from 'next/navigation';

const OrganisationNav = () => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.clear();
        router.push("/");
    };

    return (
        <nav className="sticky top-0 z-50 w-full">
            {/* Pitch White Backdrop Layer with Neon Blue Bottom Glow */}
            <div className="absolute inset-0 bg-white/95 backdrop-blur-xl border-b border-cyan-100 shadow-[0_4px_25px_rgba(6,182,212,0.15)]"></div>

            {/* Main content container */}
            <div className="relative px-4 sm:px-6 lg:px-8 py-3">
                <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">

                    {/* Logo Section - UNTOUCHED */}
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
                        
                        {/* Home Link */}
                        <Link
                            href="/company-dashboard"
                            className="group relative flex items-center gap-2 px-4 xl:px-5 py-2.5 rounded-full text-sm font-bold text-slate-500 hover:text-cyan-600 transition-all duration-300 cursor-pointer"
                        >
                            {/* Hover Bubble Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/0 to-blue-50/0 group-hover:from-cyan-50 group-hover:to-blue-50 rounded-full transition-all duration-300"></div>
                            
                            {/* Icon & Text */}
                            <Home size={18} className="relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:text-cyan-500" />
                            <span className="relative z-10">Home</span>
                            
                            {/* Neon Underline Glow */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-cyan-500 shadow-[0_0_10px_cyan] group-hover:w-3/4 transition-all duration-300 rounded-full"></div>
                        </Link>

                        {/* Company Details Link */}
                        <Link
                            href="/add-company-details"
                            className="group relative flex items-center gap-2 px-4 xl:px-5 py-2.5 rounded-full text-sm font-bold text-slate-500 hover:text-cyan-600 transition-all duration-300 cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/0 to-blue-50/0 group-hover:from-cyan-50 group-hover:to-blue-50 rounded-full transition-all duration-300"></div>
                            
                            {/* Using Building2 for Company Details */}
                            <Building2 size={18} className="relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:text-cyan-500" />
                            <span className="relative z-10">Company Details</span>
                            
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-cyan-500 shadow-[0_0_10px_cyan] group-hover:w-3/4 transition-all duration-300 rounded-full"></div>
                        </Link>

                        {/* Add Authorized Person Link */}
                        <Link
                            href="/add-authorize-person"
                            className="group relative flex items-center gap-2 px-4 xl:px-5 py-2.5 rounded-full text-sm font-bold text-slate-500 hover:text-cyan-600 transition-all duration-300 cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/0 to-blue-50/0 group-hover:from-cyan-50 group-hover:to-blue-50 rounded-full transition-all duration-300"></div>
                            
                            {/* Using UserPlus for Add Person */}
                            <UserPlus size={18} className="relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:text-cyan-500" />
                            <span className="relative z-10">Add Authorized Person</span>
                            
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-cyan-500 shadow-[0_0_10px_cyan] group-hover:w-3/4 transition-all duration-300 rounded-full"></div>
                        </Link>

                        {/* Logout Button - Blue Theme */}
                        <button
                            onClick={handleLogout}
                            className="group relative flex items-center gap-2 px-4 xl:px-5 py-2.5 rounded-full text-sm font-bold text-slate-500 hover:text-cyan-600 transition-all duration-300 cursor-pointer ml-2"
                        >
                            {/* Hover Bubble */}
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/0 to-blue-50/0 group-hover:from-cyan-50 group-hover:to-blue-50 rounded-full transition-all duration-300"></div>
                            
                            {/* Icon & Text */}
                            <LogOut size={18} className="relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-x-0.5 group-hover:text-cyan-500" />
                            <span className="relative z-10">Log Out</span>
                            
                            {/* Border Glow on Hover */}
                            <div className="absolute inset-0 border border-transparent group-hover:border-cyan-200 rounded-full transition-all duration-300 group-hover:shadow-[0_0_10px_rgba(6,182,212,0.2)]"></div>
                        </button>

                    </div>

                    {/* Mobile Menu Button - White Theme */}
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

export default OrganisationNav