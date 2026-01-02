"use client";
import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown, FileText } from 'lucide-react';
import Link from 'next/link';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { assetConfig } from './asset-config';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Building2, User, Fingerprint } from 'lucide-react'; // Added icons

const Hero: React.FC = ({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) => {
  const ref = useRef<HTMLDivElement>(null); // Changed to div to wrap the whole dropdown area

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    // Added overflow-x-clip to prevent background blobs from causing horizontal scroll
    <section className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 pt-24 pb-24 lg:pt-40 lg:pb-32 overflow-x-clip">

      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] rounded-full bg-white blur-3xl"></div>
        <div className="absolute top-[20%] -left-[10%] w-[400px] h-[400px] rounded-full bg-blue-300 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Adjusted px-16 to be responsive (px-4 on mobile, px-16 on desktop) */}
        <div className="grid lg:grid-cols-2 gap-12 px-4 md:px-8 lg:px-16 items-center">

          <div className="text-white space-y-8 animate-fade-in-up order-2 lg:order-1">
            <div>
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-2">Webel</h1>
              <div className="relative inline-block">
                <h2 className="text-4xl lg:text-6xl font-bold tracking-tight text-blue-100">Services</h2>
                <div className="absolute -bottom-2 left-0 w-full h-1.5 bg-blue-400 rounded-full opacity-60"></div>
              </div>
            </div>

            <p className="text-lg lg:text-xl text-blue-100 max-w-lg leading-relaxed">
              Streamlining government services and document verification for a digital West Bengal. Efficient, secure, and transparent.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="relative inline-block" ref={ref}>
                <button
                  onClick={() => setOpen(!open)}
                  className={`inline-flex items-center gap-2 px-6 py-4 bg-white text-blue-700 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all transform`}
                >
                  Register Now
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                  />
                </button>
                

<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden border-none shadow-2xl">
    <div className="bg-gradient-to-br from-blue-700 to-blue-900 p-8 text-white">
      <DialogHeader className="text-left">
        <DialogTitle className="text-2xl font-bold tracking-tight">
          Registration Type
        </DialogTitle>
        <DialogDescription className="text-blue-100/80 text-base">
          Choose the account type that best fits your needs to get started.
        </DialogDescription>
      </DialogHeader>
    </div>

    <div className="p-6 bg-slate-50">
      <div className="grid gap-3">
        {/* Option 1: GSTIN */}
        <Link
          href="/company-sign-up?tab=gstn"
          className="group flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl transition-all duration-200 hover:border-blue-500 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98]"
          onClick={() => setOpen(false)}
        >
          <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <Building2 className="w-6 h-6" />
          </div>
          <div className="flex-grow">
            <p className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
              Company / Proprietorship
            </p>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Via GSTIN Verification</p>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
        </Link>

        {/* Option 2: DSC */}
        <Link
          href="/company-sign-up?tab=dsc"
          className="group flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl transition-all duration-200 hover:border-blue-500 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98]"
          onClick={() => setOpen(false)}
        >
          <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <Fingerprint className="w-6 h-6" />
          </div>
          <div className="flex-grow">
            <p className="font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors">
              Company / Proprietorship
            </p>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Via Digital Signature (DSC)</p>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
        </Link>

        {/* Option 3: Individual */}
        <Link
          href="/individual-sign-up"
          className="group flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl transition-all duration-200 hover:border-blue-500 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98]"
          onClick={() => setOpen(false)}
        >
          <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            <User className="w-6 h-6" />
          </div>
          <div className="flex-grow">
            <p className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">
              Individual / HUF
            </p>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Personal Registration</p>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
        </Link>
      </div>
      
    </div>
  </DialogContent>
</Dialog>
              </div>

              <a
                download
                href={`${assetConfig}/Webel_Online_Services_UserManual.pdf`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                <FileText className="w-5 h-5" />
                User Manual
              </a>
            </div>
          </div>

          {/* Image Content */}
          <div className="relative flex justify-center items-center order-1 lg:order-2">
            <div className="w-full max-w-[500px] lg:max-w-none lg:scale-125 xl:scale-150 transform transition-transform">
              <DotLottieReact
                src={`${assetConfig}/Business.lottie`}
                loop
                autoplay
                className="w-full h-auto"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Wave Shape Divider */}
      <div className="wave-shape absolute bottom-0 left-0 w-full">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[60px] lg:h-[120px]">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;