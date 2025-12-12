import React from 'react';
import { ArrowRight, FileText } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">

      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] rounded-full bg-white blur-3xl"></div>
        <div className="absolute top-[20%] -left-[10%] w-[400px] h-[400px] rounded-full bg-blue-300 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Text Content */}
          <div className="text-white space-y-8 animate-fade-in-up">
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
              <a
                href="#register"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all transform hover:-translate-y-1"
              >
                Register Now <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#manual"
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                <FileText className="w-5 h-5" />
                User Manual
              </a>
            </div>
          </div>

          {/* Image Content */}
          <div className="hidden lg:block relative">
            <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <img
                src="https://picsum.photos/seed/office_illustration/600/400"
                alt="Digital Services Illustration"
                className="w-full h-auto rounded-xl shadow-inner"
              />

              {/* Floating elements decoration */}
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-lg animate-bounce duration-[3000ms]">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-blue-500 p-4 rounded-full shadow-lg border-4 border-white">
                <ArrowRight className="w-6 h-6 text-white" />
              </div>
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