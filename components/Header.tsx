"use client";
import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  // States for mobile dropdown toggles
  const [isOrgMobileOpen, setIsOrgMobileOpen] = useState(false);
  const [isUserMobileOpen, setIsUserMobileOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '#about' },
    { name: 'Sign Agreement', href: '/searchdocumentforsign' },
    { name: 'Search By UDIN', href: '/searchbyudin' },
    { name: 'Verify Auth Person', href: '/verifyauthorizeperson' },
  ];

  const closeMenu = () => {
    setIsOpen(false);
    setIsOrgMobileOpen(false);
    setIsUserMobileOpen(false);
  };

  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-100 font-sans z-50 relative">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/">
            <img
              src="/webel-logo.png"
              alt="Webel Logo"
              className="w-[100px] h-auto cursor-pointer"
            />
          </Link>

          {/* --- DESKTOP NAVIGATION (Untouched) --- */}
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

            <div className="relative group cursor-pointer h-full flex items-center">
              <button className="flex items-center gap-1 text-[15px] font-normal text-[#1a73e8] group-hover:text-[#0052cc] bg-transparent border-none outline-none h-full">
                Organization <ChevronDown className="w-4 h-4 mt-0.5 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full right-0 w-48 hidden group-hover:block z-50">
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

            <div className="relative group cursor-pointer h-full flex items-center">
              <button className="flex items-center gap-1 text-[15px] font-normal text-[#1a73e8] group-hover:text-[#0052cc] bg-transparent border-none outline-none h-full">
                User <ChevronDown className="w-4 h-4 mt-0.5 transition-transform group-hover:rotate-180" />
              </button>
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

            <Link href="#contact" className="text-[15px] font-normal text-[#1a73e8] hover:text-[#0052cc] transition-colors whitespace-nowrap">
              Contact Us
            </Link>
          </nav>

          {/* --- MOBILE TOGGLE --- */}
          <button
            className="lg:hidden text-gray-600 p-2 border border-gray-100 rounded-md"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* --- MOBILE NAVIGATION MENU --- */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-xl absolute w-full left-0 top-20 z-[100] h-screen overflow-y-auto">
          <div className="flex flex-col px-4 py-6 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[16px] font-medium text-gray-700 hover:text-[#1a73e8] py-3 border-b border-gray-50"
                onClick={closeMenu}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Organization Accordion */}
            <div className="flex flex-col border-b border-gray-50">
              <button 
                onClick={() => setIsOrgMobileOpen(!isOrgMobileOpen)}
                className="flex items-center justify-between w-full py-4 text-[16px] font-medium text-gray-700 hover:text-[#1a73e8]"
              >
                Organization <ChevronDown className={`w-4 h-4 transition-transform ${isOrgMobileOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOrgMobileOpen && (
                <div className="bg-gray-50 rounded-lg mb-2">
                  <Link href="/company-sign-up" className="block px-6 py-3 text-sm text-gray-600 hover:text-blue-600" onClick={closeMenu}>
                    Registration
                  </Link>
                  <Link href="/company-login" className="block px-6 py-3 text-sm text-gray-600 hover:text-blue-600" onClick={closeMenu}>
                    Login
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile User Accordion */}
            <div className="flex flex-col border-b border-gray-50">
              <button 
                onClick={() => setIsUserMobileOpen(!isUserMobileOpen)}
                className="flex items-center justify-between w-full py-4 text-[16px] font-medium text-gray-700 hover:text-[#1a73e8]"
              >
                User <ChevronDown className={`w-4 h-4 transition-transform ${isUserMobileOpen ? 'rotate-180' : ''}`} />
              </button>
              {isUserMobileOpen && (
                <div className="bg-gray-50 rounded-lg mb-2">
                  <Link href="/individual-sign-up" className="block px-6 py-3 text-sm text-gray-600 hover:text-blue-600" onClick={closeMenu}>
                    Registration
                  </Link>
                  <Link href="/individual-sign-in" className="block px-6 py-3 text-sm text-gray-600 hover:text-blue-600" onClick={closeMenu}>
                    Login
                  </Link>
                </div>
              )}
            </div>

            <Link 
              href="#contact" 
              className="text-[16px] font-medium text-gray-700 hover:text-[#1a73e8] py-4"
              onClick={closeMenu}
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;