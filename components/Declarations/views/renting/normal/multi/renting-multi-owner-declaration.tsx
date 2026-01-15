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

const MultiOwnerDeclaration: React.FC<DeclarationLetterProps> = ({ data }) => {
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center py-10 px-4 print:p-0 print:bg-white">
      {/* Main Page Sheet (A4 Dimensions) */}
      <div className="relative bg-white w-[210mm] min-h-[297mm] shadow-xl p-[15px] box-border font-serif print:shadow-none print:w-full">
        
        {/* Decorative Borders (Replacing CSS ::before and ::after) */}
        {/* Frame line 1: Solid */}
        <div className="absolute inset-[5px] border-2 border-gray-600 pointer-events-none" />
        
        {/* Frame line 2: Double */}
        <div className="absolute inset-[10px] border-[4px] border-double border-gray-600 pointer-events-none" />

        {/* Dotted Border Frame */}
        <div className="relative h-full w-full border-2 border-dotted border-gray-800 p-1 flex flex-col box-border">
          
          {/* Inner Double Pattern Border */}
          <div className="flex-grow border-[3px] border-double border-gray-800 py-10 px-12 relative z-10">
            
            {/* Watermark Section */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-10">
              <Image
                src={logo}
                alt="Watermark"
                className="w-[80%] h-auto grayscale"
                priority
              />
            </div>

            {/* Content Area */}
            <div className="relative z-20 text-[12pt] leading-relaxed text-black">
              
              {/* Logo Header */}
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
              <h1 className="text-center font-bold underline text-[16pt] mt-2 mb-8">
                Declaration Letter
              </h1>

              {/* Date */}
              <div className="text-right font-bold mb-8">
                Date: {data?._current_date}
              </div>

              {/* Body Paragraph 1 */}
              <p className="text-justify mb-5">
                On behalf as duly authorised & having competence to do so, we declare that the Project Report as
                submitted, is covered under IT & ITeS activities as notified by IT&E dept. vide notification{" "}
                <span className="font-bold">{data?._it_notification_no}</span> dated{" "}
                <span className="font-bold">{data?._it_notification_date}</span> (UDIN:{" "}
                <span className="font-bold">{data?._it_notification_udin}</span>). We shall indemnify and hold the state
                harmless, including all associated costs in case of any misrepresentation.
              </p>

              {/* Body Paragraph 2 */}
              <p className="text-justify mb-10">
                We also understand that any kind of misrepresentation will invite legal action as per law.
              </p>

              {/* Table Section */}
              <h2 className="text-center font-bold underline text-[14pt] mt-10 mb-5 uppercase tracking-wide">
                Applicants Details
              </h2>

              <table className="w-full border-collapse border border-black text-[11pt]">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-black p-2 w-[50px] text-center font-bold">Sl No.</th>
                    <th className="border border-black p-2 text-center font-bold">Applicants Name</th>
                    <th className="border border-black p-2 text-center font-bold">Address</th>
                    <th className="border border-black p-2 text-center font-bold">GSTN/PAN Number</th>
                  </tr>
                </thead>
                <tbody>
                  {data?._applicants && data?._applicants.length > 0 ? (
                    data?._applicants.map((applicant, index) => (
                      <tr key={index}>
                        <td className="border border-black p-2 text-center">{index + 1}</td>
                        <td className="border border-black p-2">{applicant?._name}</td>
                        <td className="border border-black p-2">{applicant?._address}</td>
                        <td className="border border-black p-2 text-center whitespace-nowrap">
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

export default MultiOwnerDeclaration;