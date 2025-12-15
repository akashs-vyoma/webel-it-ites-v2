import React from 'react';
import { Eye } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        
        {/* Header Text */}
        <div className="text-center max-w-4xl mx-auto mb-20 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            West Bengal Electronics Industry Development Corporation Limited
          </h2>
          <p className="text-lg text-gray-500 font-medium">
            A Government of West Bengal undertaking
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Intro Block */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
           <div className="prose prose-lg text-gray-600 leading-relaxed text-justify">
             <p>
               West Bengal Electronics Industry Development Corporation Limited was incorporated on 4th February, 1974 to shape the Electronics Industry in West Bengal. Being the nodal agency of the West Bengal Government for promoting IT and Electronics industries has over the years adapted to the changing requirements of the IT and ITeS industries. With the ever-evolving nature of IT/ITeS and Electronics industry, WBEIDCL has worked towards providing an adaptive eco-system by a host of proactive initiatives.
             </p>
           </div>
           <div className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden shadow-xl group">
             <img 
               src="IT_infra.jpeg" 
               alt="WBEIDCL Office" 
               className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
             />
             <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-transparent transition-colors duration-300"></div>
           </div>
        </div>

        {/* Vision Card */}
        <div className="bg-blue-50 rounded-3xl p-8 md:p-12 border border-blue-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
             <Eye size={200} />
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
            <div className="bg-white p-4 rounded-full shadow-md text-blue-600 shrink-0">
              <Eye className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Vision</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                To become a world class self-reliant organization in IT, ITeS and Electronics sector by providing critical solutions to the Government and citizen-centric latest technology and innovations. To become a leader in IT & Electronics Education to ensure massive employment generation, Research & Development in IT and Electronics, products manufacturing and providing consultancy services to the organizations with national and international presence.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;