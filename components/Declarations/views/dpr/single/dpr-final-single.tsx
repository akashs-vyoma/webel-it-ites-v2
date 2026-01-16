import React from "react";
import Image from "next/image";
import logo from "@/components/images/webel-logo.png";

interface DPRVettingProps {
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

const DPRVettingDocument: React.FC<DPRVettingProps> = ({ data }) => {
  return (
    <div className="bg-gray-200 min-h-screen flex justify-center py-10 px-4 print:p-0 print:bg-white">
      {/* A4 Container */}
      <div className="relative bg-white w-[210mm] min-h-[297mm] shadow-2xl p-[15px] font-serif box-border overflow-hidden print:shadow-none print:w-full">
        
        {/* Layered Decorative Borders (Replaces ::before and ::after) */}
        <div className="absolute inset-[5px] border-2 border-gray-600 pointer-events-none" />
        <div className="absolute inset-[10px] border-[4px] border-double border-gray-600 pointer-events-none" />

        {/* Dotted Outer Frame */}
        <div className="relative w-full h-full border-2 border-dotted border-gray-800 p-1 flex flex-col box-border">
          
          {/* Double Pattern Border */}
          <div className="flex-grow border-[3px] border-double border-gray-800 py-10 px-12 relative z-10">
            
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none z-0">
              <Image 
                src={logo} 
                alt="Watermark" 
                className="w-4/5 h-auto grayscale" 
              />
            </div>

            {/* Content Area */}
            <div className="relative z-10 text-[11.5pt] leading-[1.6] text-black">
              
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

              {/* Document Title */}
              <div className="text-center font-bold text-[13pt] mb-8 uppercase tracking-wide">
                Final Vetting of DPR of IT&ITeS <br />
                (Application Number: {data?._application_number})
              </div>

              {/* Intro Paragraph */}
              <div className="mb-6 text-justify">
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
                  (ii) The activities/businesses as given in the <span className="font-bold text-nowrap">Declaration Letter (UDIN: {data?._declaration_letter_udin})</span>
                </div>

                <div className="pl-6 mt-3">
                  (iii) The proposed application to be pursued in these premises is covered under IT&ITeS
                  activity as notified by IT&E Dept., vide <span className="font-bold">
                    notification {data?._it_notification_no} dated {data?._it_notification_date} (UDIN: {data?._it_notification_udin})
                  </span>.
                </div>
              </div>

              {/* Point 3 */}
              <div className="mb-6 text-justify">
                3. This note addresses the technical aspects of the project report. Financial and commercial
                viability/feasibility review is not attempted in this report.
              </div>

              {/* Date */}
              <div className="mt-10 mb-8 font-medium">
                Date: {data?._current_date}
              </div>

              {/* Signature Block */}
              <div className="mt-8">
                <span className="block font-bold text-lg">Authorised Signatory</span>
                <span className="block font-bold">For Managing Director, Webel</span>
                <div className="mt-2 text-[10pt] italic text-gray-700">
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

export default DPRVettingDocument;