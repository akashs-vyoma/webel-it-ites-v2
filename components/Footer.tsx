"use client"
import React from 'react';
import { ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-[#004a93] text-white">
      {/* Upper Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">

          {/* Left Column: Logo & Description */}
          <div className="space-y-6">
            <div className="relative inline-block">
              <h2 className="text-6xl font-light tracking-wider text-[#4aa5ff] opacity-90">
                WEBEL
              </h2>
              <span className="absolute top-2 -right-6 text-3xl text-[#4aa5ff] opacity-90">®</span>
            </div>

            <p className="font-bold text-lg tracking-wide">
              opportunities infinite
            </p>

            <div className="space-y-1 text-sm leading-relaxed max-w-lg">
              <p>
                Celebrating 49 Years of Journey and service to the nation.
              </p>
              <p>
                West Bengal Electronics Industry Development Corporation Limited
                A Government of West Bengal undertaking Webel Bhavan, Block: EP & GP, Sector V,
                Bidhannagar, Salt Lake, Kolkata: 700 091
              </p>
            </div>
          </div>

          {/* Right Column: Important Links */}
          <div className="md:pl-20 ml-auto">
            <h3 className="text-lg font-bold uppercase mb-6 tracking-wide">
              Important Links
            </h3>
            <ul className="space-y-3 text-[15px]">
              <li>
                <a href="https://india.gov.in/" target="_blank" className="hover:text-blue-200 transition-colors">National Portal of India</a>
              </li>
              <li>
                <a href="https://wb.gov.in/" target="_blank" className="hover:text-blue-200 transition-colors">Egiye Bangla</a>
              </li>
              <li>
                <a href="https://itewb.gov.in/" target="_blank" className="hover:text-blue-200 transition-colors">Department of Information Technology, Government of West Bengal</a>
              </li>
              <li>
                <a href="https://cscoe.itewb.gov.in/" target="_blank" className="hover:text-blue-200 transition-colors">Cyber Security Centre of Excellence, West Bengal</a>
              </li>
              <li>
                <a href="https://anumodan.wb.gov.in/" target="_blank" className="hover:text-blue-200 transition-colors">Anumodan - UDIN based Driver Authorization Generation Portal</a>
              </li>
              <li>
                <a href="https://nirasan.itewb.gov.in/" target="_blank" className="hover:text-blue-200 transition-colors">Nirasan - Single Window portal for Filing a Complaint for Adjudication</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright */}
      <div className="bg-[#00366d] py-6 relative">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-center">
          <p className="text-sm">
            © 2023 <span className="text-[#4aa5ff] font-semibold">Webel</span>. All Rights Reserved
          </p>
        </div>

        {/* Back to Top Button */}
        <button
          onClick={scrollToTop}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-[#1e90ff] hover:bg-blue-400 text-white p-3 rounded-full shadow-lg transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      </div>
    </footer>
  );
};

export default Footer;