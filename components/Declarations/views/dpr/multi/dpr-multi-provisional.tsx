import React from "react";
import Image from "next/image";
import logo from "@/components/images/webel-logo.png";

interface Applicant {
  _name?: string;
  _address?: string;
  _tax_id?: string;
}

interface ProvisionalVettingMultiPartyProps {
  data?: {
    _application_number?: string;
    _applicants?: Applicant[];
    _project_location?: string;
    _declaration_letter_udin?: string;
    _it_notification_no?: string;
    _it_notification_date?: string;
    _it_notification_udin?: string;
    _current_date?: string;
  };
}

const ProvisionalVettingMultiParty: React.FC<ProvisionalVettingMultiPartyProps> = ({ data }) => {
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center py-10 px-4 print:p-0 print:bg-white">
      {/* A4 Page Container */}
      <div className="relative bg-white w-[210mm] min-h-[297mm] shadow-2xl p-[15px] font-serif box-border overflow-hidden print:shadow-none print:w-full">
        
        {/* Decorative Outer Borders (Mimicking ::before and ::after) */}
        <div className="absolute inset-[5px] border-2 border-gray-600 pointer-events-none z-10" />
        <div className="absolute inset-[10px] border-[4px] border-double border-gray-600 pointer-events-none z-10" />

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
            <div className="relative z-30 text-[11pt] leading-[1.5] text-black">
              
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
              <div className="text-center font-bold text-[12pt] mb-5 leading-tight">
                Provisional Vetting of DPR of IT&ITeS <br />
                (Application Number: {data?._application_number})
              </div>

              {/* Applicants Details Section */}
              <div className="font-bold underline mb-2 decoration-1 underline-offset-2">
                Applicants Details:
              </div>
              <table className="w-full border-collapse border border-black mb-6 text-[10pt]">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-black p-2 w-[40px] text-center font-bold">Sl No.</th>
                    <th className="border border-black p-2 w-1/4 text-center font-bold">Applicants Name</th>
                    <th className="border border-black p-2 text-center font-bold">Address</th>
                    <th className="border border-black p-2 w-[110px] text-center font-bold">GSTN/PAN Number</th>
                  </tr>
                </thead>
                <tbody>
                  {data?._applicants && data._applicants.length > 0 ? (
                    data._applicants.map((applicant, index) => (
                      <tr key={index}>
                        <td className="border border-black p-2 text-center">{index + 1}</td>
                        <td className="border border-black p-2 font-bold">{applicant?._name}</td>
                        <td className="border border-black p-2">{applicant?._address}</td>
                        <td className="border border-black p-2 text-center font-bold">
                          {applicant?._tax_id}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="border border-black p-4 text-center italic text-gray-500">
                        No applicant details found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Note Paragraph */}
              <div className="mb-4 text-justify">
                A Note on Project Report of submitted by the above mentioned applicants proposal of building an
                IT&ITeS Unit at <span className="font-bold">{data?._project_location}</span>.
              </div>

              {/* Numbered Points */}
              <div className="mb-4 text-justify">
                1. The project is proposed by the above mentioned applicants
              </div>

              <div className="mb-4 text-justify">
                2. (i) The applicants intends to build an IT based Project under IT&ITeS activity.

                <div className="pl-6 mt-2">
                  (ii) The activities/businesses as given in the <span className="font-bold">Declaration Letter (UDIN: {data?._declaration_letter_udin})</span>
                </div>

                <div className="pl-6 mt-2">
                  (iii) The proposed application to be pursued in these premises is covered under IT&ITeS
                  activity as notified by IT&E Dept., vide <span className="font-bold">
                    notification {data?._it_notification_no} dated {data?._it_notification_date} (UDIN: {data?._it_notification_udin})
                  </span>.
                </div>
              </div>

              <div className="mb-4 text-justify">
                3. This note addresses the technical aspects of the project report. Financial and commercial
                viability/feasibility review is not attempted in this report.
              </div>

              {/* Signature Block */}
              <div className="mt-10">
                <span className="block font-bold">Date: {data?._current_date}</span>
                <span className="block font-bold mt-4">Authorised Signatory</span>
                <span className="block font-bold">For Managing Director, Webel</span>
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

export default ProvisionalVettingMultiParty;