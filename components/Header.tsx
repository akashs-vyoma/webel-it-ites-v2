"use client";
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Sign Agreement', href: '#' },
    { name: 'Search By UDIN', href: '#' },
    { name: 'Verify Auth Person', href: '#' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 backdrop-blur-sm py-4 shadow-sm'
        }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex flex-col leading-none group">
            <span className="text-2xl font-bold text-blue-700 tracking-tight group-hover:text-blue-800 transition-colors">Webel</span>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-[0.2em]">Services</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
              >
                {link.name}
              </a>
            ))}

            {/* Dropdowns */}
            <div className="relative group cursor-pointer flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-blue-600">
              Organization <ChevronDown className="w-4 h-4" />
            </div>
            <div className="relative group cursor-pointer flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-blue-600">
              User <ChevronDown className="w-4 h-4" />
            </div>

            <a
              href="#contact"
              className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all shadow-sm hover:shadow-md"
            >
              Contact Us
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-gray-600 p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t shadow-lg py-4 px-4 flex flex-col gap-4 animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-600 font-medium py-2 hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a href="#" className="text-gray-600 font-medium py-2 flex justify-between">Organization <ChevronDown className="w-4 h-4" /></a>
          <a href="#" className="text-gray-600 font-medium py-2 flex justify-between">User <ChevronDown className="w-4 h-4" /></a>
          <a href="#" className="text-center font-semibold text-white bg-blue-600 py-3 rounded-lg">Contact Us</a>
        </div>
      )}
    </header>
  );
};

export default Header;