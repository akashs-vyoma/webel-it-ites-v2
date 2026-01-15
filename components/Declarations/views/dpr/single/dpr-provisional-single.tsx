import React from "react";
import Image from "next/image";
import logo from "@/components/images/webel-logo.png";

interface ProvisionalVettingProps {
  data?: {
    _application_number?: string;
    _company_name?: string;
    _project_location?: string;
    _company_pan?: string;
    _declaration_letter_udin?: string;
    _it_notification_no?: string;
    _it_notification_date?: string;
    _it_notification_udin?: string;
    _current_date?: string;
  };
}

const ProvisionalVettingDPR: React.FC<ProvisionalVettingProps> = ({ data }) => {
  return (
    <div className="bg-gray-200 min-h-screen flex justify-center py-10 px-4 print:p-0 print:bg-white">
      {/* A4 Page Container */}
      <div className="relative bg-white w-[210mm] min-h-[297mm] shadow-2xl p-[15px] font-serif box-border overflow-hidden print:shadow-none print:w-full">
        
        {/* Outer Frame - Standard Reference Decorative Borders */}
        {/* Mimics the ::before and ::after from original CSS */}
        <div className="absolute inset-[5px] border-2 border-gray-700 pointer-events-none z-10" />
        <div className="absolute inset-[10px] border-[4px] border-double border-gray-700 pointer-events-none z-10" />

        {/* Dotted Frame Border */}
        <div className="relative w-full h-full border-2 border-dotted border-gray-800 p-1 flex flex-col box-border">
          
          {/* Inner Double Border (Pattern Border) */}
          <div className="flex-grow border-[3px] border-double border-gray-800 py-10 px-[50px] relative z-20">
            
            {/* Watermark Logo */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.08] pointer-events-none z-0">
              <Image 
                src={logo} 
                alt="Watermark" 
                className="w-4/5 h-auto grayscale" 
              />
            </div>

            {/* Content Area */}
            <div className="relative z-30 text-[11.5pt] leading-[1.6] text-black">
              
              {/* Header Logo */}
              <div className="flex justify-center mb-5">
                <Image
                  src={logo}
                  alt="Webel Logo"
                  height={80}
                  className="h-20 w-auto object-contain"
                  priority
                />
              </div>

              {/* Document Header */}
              <div className="text-center font-bold text-[13pt] mb-8 leading-tight">
                Provisional Vetting of DPR of IT&ITeS <br />
                (Application Number: {data?._application_number})
              </div>

              {/* Intro Paragraph */}
              <div className="mb-4 text-justify">
                A Note on Project Report of <span className="font-bold">{data?._company_name}</span> proposal of building an IT&ITeS Unit at {data?._project_location}.
              </div>

              {/* Point 1 */}
              <div className="mb-4 text-justify">
                1. The project is proposed by <span className="font-bold">
                  {data?._company_name} (PAN: {data?._company_pan})
                </span>
              </div>

              {/* Point 2 with sub-points */}
              <div className="mb-4 text-justify">
                2. (i) <span className="font-bold">{data?._company_name}</span> intends to build an IT based Project under IT&ITeS activity.

                <div className="pl-6 mt-3">
                  (ii) The activities/businesses as given in the <span className="font-bold">Declaration Letter (UDIN: {data?._declaration_letter_udin})</span>
                </div>

                <div className="pl-6 mt-3">
                  (iii) The proposed application to be pursued in these premises is covered under IT&ITeS
                  activity as notified by IT&E Dept., vide <span className="font-bold">
                    notification {data?._it_notification_no} dated {data?._it_notification_date} (UDIN: {data?._it_notification_udin})
                  </span>.
                </div>
              </div>

              {/* Point 3 */}
              <div className="mb-4 text-justify">
                3. This note addresses the technical aspects of the project report. Financial and commercial
                viability/feasibility review is not attempted in this report.
              </div>

              {/* Date Section */}
              <div className="mt-8 mb-6 font-medium">
                Date: {data?._current_date}
              </div>

              {/* Signature Block */}
              <div className="mt-8">
                <span className="block font-bold text-lg leading-tight">Authorised Signatory</span>
                <span className="block font-bold leading-tight">For Managing Director, Webel</span>
                <div className="mt-1 text-[10pt] italic text-gray-600">
                  (This document is digitally signed and does not require physical signature)
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProvisionalVettingDPR;