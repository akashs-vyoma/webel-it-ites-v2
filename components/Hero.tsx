"use client";
import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown, FileText } from 'lucide-react';
import Link from 'next/link';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Hero: React.FC = () => {

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

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
    <section className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 pt-32 pb-32 lg:pt-40 lg:pb-32 overflow-hidden">

      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] rounded-full bg-white blur-3xl"></div>
        <div className="absolute top-[20%] -left-[10%] w-[400px] h-[400px] rounded-full bg-blue-300 blur-3xl"></div>

      </div>

      <div className="container mx-auto px-4 pb-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 px-16 items-center">
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
                {/* Main Button */}
                <button
                  onClick={() => setOpen(!open)}
                  className={`inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all transform ${open ? "rounded-br-none rounded-bl-lg" : ""}`}
                >
                  Register Now
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {/* Dropdown */}
                {open && (
                  <div className="absolute -right-0 mt-0 w-90 rounded-xl rounded-tr-none bg-white shadow-xl border border-gray-100 border-t-0 overflow-hidden z-[999]">
                    <Link
                      href="/company-sign-up"
                      className="flex items-center justify-between px-5 py-2 hover:bg-blue-50 transition"
                      onClick={() => setOpen(false)}
                    >
                      <span className="font-medium text-gray-800">
                        Company / Proprietorship Registration By GSTIN
                      </span>
                      <ArrowRight className="w-4 h-4 text-blue-600" />
                    </Link>

                    <Link
                      href="/company-sign-up"
                      className="flex items-center justify-between px-5 py-2 hover:bg-blue-50 transition"
                      onClick={() => setOpen(false)}
                    >
                      <span className="font-medium text-gray-800">
                        Company / Proprietorship Registration By DSC
                      </span>
                      <ArrowRight className="w-4 h-4 text-blue-600" />
                    </Link>

                    <Link
                      href="/individual-sign-up"
                      className="flex items-center justify-between px-5 py-2 hover:bg-blue-50 transition"
                      onClick={() => setOpen(false)}
                    >
                      <span className="font-medium text-gray-800">
                        Individual / HUF Registration
                      </span>
                      <ArrowRight className="w-4 h-4 text-blue-600" />
                    </Link>
                  </div>
                )}
              </div>
              <a
                download
                href="./Webel_Online_Services_UserManual.pdf"
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                <FileText className="w-5 h-5" />
                User Manual
              </a>
            </div>
          </div>

          {/* Image Content */}
          {/* Removed 'absolute', added flex centering, and responsive scaling */}
          <div className="relative flex justify-center items-center order-1 lg:order-2">
            <div className="w-full max-w-[1000px] lg:max-w-full lg:scale-150 transform transition-transform">
              <DotLottieReact
                src="Business.lottie"
                loop
                autoplay
                className="w-full h-auto"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Wave Shape Divider */}
      <div className="wave-shape">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;