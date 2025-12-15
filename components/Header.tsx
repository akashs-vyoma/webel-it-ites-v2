"use client";
import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Sign Agreement', href: '/searchdocumentforsign' },
    { name: 'Search By UDIN', href: '/searchbyudin' },
    { name: 'Verify Auth Person', href: '/verifyauthorizeperson' },
  ];

  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-100 font-sans z-50 relative">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        {/* Header container fixed height */}
        <div className="flex items-center justify-between h-20">

          {/* --- LOGO SECTION (Kept exactly as provided) --- */}
          <a href="#" className="flex flex-col items-center justify-center leading-none select-none">
            {/* 'Webel' Main Text */}
            <div className="relative">
              <span className="text-4xl font-semibold text-[#0052cc] tracking-tight" style={{ fontFamily: 'Arial, sans-serif' }}>
                Webel
              </span>
            </div>

            {/* 'opportunities infinite' Tagline */}
            <span className="text-[0.55rem] text-black font-medium lowercase -mt-1 tracking-wide">
              opportunities infinite
            </span>

            {/* 'SERVICES' Text */}
            <span className="text-sm font-bold text-[#002855] uppercase tracking-[0.2em] mt-0.5">
              SERVICES
            </span>
          </a>

          {/* --- DESKTOP NAVIGATION --- */}
          {/* Added h-full to nav so children can span full height */}
          <nav className="hidden lg:flex items-center gap-7 h-full">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[15px] font-normal text-[#1a73e8] hover:text-[#0052cc] transition-colors whitespace-nowrap"
              >
                {link.name}
              </Link>
            ))}

            {/* Organization Dropdown */}
            {/* h-full ensures the hover area goes all the way to the bottom edge */}
            <div className="relative group cursor-pointer h-full flex items-center">
              <button className="flex items-center gap-1 text-[15px] font-normal text-[#1a73e8] group-hover:text-[#0052cc] bg-transparent border-none outline-none h-full">
                Organization <ChevronDown className="w-4 h-4 mt-0.5 transition-transform group-hover:rotate-180" />
              </button>

              {/* Dropdown Menu */}
              {/* changed top-10 to top-full so it sits exactly on the bottom line, no gaps */}
              <div className="absolute top-full right-0 w-48 hidden group-hover:block z-50">
                {/* Added a small negative margin top or border-top to bridge any sub-pixel gaps if necessary, 
                    but top-full usually works perfectly with h-full parent */}
                <div className="bg-white rounded-b shadow-lg border-x border-b border-t-2 border-t-blue-600 border-gray-100 py-2 mt-[1px]">
                  <Link href="/company-sign-up" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">
                    Registration
                  </Link>
                  <Link href="/company-login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">
                    Login
                  </Link>
                </div>
              </div>
            </div>

            {/* User Dropdown */}
            <div className="relative group cursor-pointer h-full flex items-center">
              <button className="flex items-center gap-1 text-[15px] font-normal text-[#1a73e8] group-hover:text-[#0052cc] bg-transparent border-none outline-none h-full">
                User <ChevronDown className="w-4 h-4 mt-0.5 transition-transform group-hover:rotate-180" />
              </button>

              {/* Dropdown Menu */}
              <div className="absolute top-full right-0 w-48 hidden group-hover:block z-50">
                <div className="bg-white rounded-b shadow-lg border-x border-b border-t-2 border-t-blue-600 border-gray-100 py-2 mt-[1px]">
                  <Link href="/individual-sign-up" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">
                    Registration
                  </Link>
                  <Link href="/individual-sign-in" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">
                    Login
                  </Link>
                </div>
              </div>
            </div>

            {/* Contact Us */}
            <a
              href="#contact"
              className="text-[15px] font-normal text-[#1a73e8] hover:text-[#0052cc] transition-colors whitespace-nowrap"
            >
              Contact Us
            </a>
          </nav>

          {/* --- MOBILE TOGGLE --- */}
          <button
            className="lg:hidden text-gray-600 p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* --- MOBILE NAVIGATION MENU --- */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg absolute w-full left-0 top-20">
          <div className="flex flex-col px-4 py-4 gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[15px] font-medium text-gray-700 hover:text-[#1a73e8]"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="flex items-center justify-between text-[15px] font-medium text-gray-700">
              Organization <ChevronDown className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-between text-[15px] font-medium text-gray-700">
              User <ChevronDown className="w-4 h-4" />
            </div>
            <a href="#contact" className="text-[15px] font-medium text-gray-700 hover:text-[#1a73e8]">
              Contact Us
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;