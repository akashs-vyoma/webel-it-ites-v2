import React from "react";
import Image from "next/image";
import logo from "@/components/images/webel-logo.png";

interface Applicant {
  _name?: string;
  _address?: string;
  _tax_id?: string;
}

interface DeclarationLetterProps {
  data?: {
    _current_date?: string;
    _it_notification_no?: string;
    _it_notification_date?: string;
    _it_notification_udin?: string;
    _applicants?: Applicant[];
  };
}

const RentingRenewalMultiOwnerDeclaration: React.FC<DeclarationLetterProps> = ({ data }) => {
  return (
    <div className="bg-gray-200 min-h-screen flex justify-center py-10 px-4 print:p-0 print:bg-white">
      {/* Main Page Container (A4 Size) */}
      <div className="relative bg-white w-[210mm] min-h-[297mm] shadow-2xl p-[15px] font-serif box-border overflow-hidden print:shadow-none print:w-full">
        
        {/* Decorative Outer Border 1 (Equivalent to ::before) */}
        <div className="absolute inset-[5px] border-2 border-gray-600 pointer-events-none z-10" />
        
        {/* Decorative Outer Border 2 (Equivalent to ::after) */}
        <div className="absolute inset-[10px] border-[4px] border-double border-gray-600 pointer-events-none z-10" />

        {/* Dotted Frame Border */}
        <div className="relative h-full w-full border-2 border-dotted border-gray-800 p-1 flex flex-col box-border">
          
          {/* Inner Double Border (Pattern Border) */}
          <div className="flex-grow border-[3px] border-double border-gray-800 py-10 px-12 relative z-20">
            
            {/* Standard Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none z-0">
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

              {/* Title */}
              <h1 className="text-center font-bold underline text-[15pt] mb-6 decoration-1 underline-offset-4">
                Declaration Letter
              </h1>

              {/* Date Metadata */}
              <div className="text-right font-bold text-[11pt] mb-8">
                Date: {data?._current_date}
              </div>

              {/* Body Paragraph 1 */}
              <p className="text-justify mb-[18px]">
                On behalf as duly authorised & having competence to do so, we declare that the Project Report as
                submitted, is covered under IT & ITeS activities as notified by IT&E dept. vide notification{" "}
                <span className="font-bold">{data?._it_notification_no}</span> dated{" "}
                <span className="font-bold">{data?._it_notification_date}</span> (UDIN:{" "}
                <span className="font-bold">{data?._it_notification_udin}</span>). We shall indemnify and hold the state
                harmless, including all associated costs in case of any misrepresentation.
              </p>

              {/* Body Paragraph 2 */}
              <p className="text-justify mb-[18px]">
                We also understand that any kind of misrepresentation will invite legal action as per law.
              </p>

              {/* Table Section Title */}
              <div className="text-center font-bold underline text-[13pt] mt-[35px] mb-[15px] decoration-1 underline-offset-4">
                Applicants Details
              </div>

              {/* Applicants Table */}
              <table className="w-full border-collapse border border-black text-[10pt]">
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
                        No applicant details provided.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentingRenewalMultiOwnerDeclaration;