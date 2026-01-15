import React from "react";
import Image from "next/image";
import logo from "@/components/images/webel-logo.png";

interface DocumentItem {
  _name?: string;
  _udin?: string;
}

interface DPRMultipartyDeclarationProps {
  data?: {
    _current_date?: string;
    _application_type?: string;
    _application_number?: string;
    _rep_name?: string;
    _rep_phone?: string;
    _documents?: DocumentItem[];
    _it_notification_no?: string;
    _it_notification_date?: string;
    _it_notification_udin?: string;
    _ca_reg_number?: string;
    _ca_name?: string;
    _ca_phone?: string;
  };
}

const DPRMultipartyDeclaration: React.FC<DPRMultipartyDeclarationProps> = ({ data }) => {
  return (
    <div className="bg-gray-200 min-h-screen flex justify-center py-10 px-4 print:p-0 print:bg-white">
      {/* Main Page Container (A4) */}
      <div className="relative bg-white w-[210mm] min-h-[297mm] shadow-2xl p-[15px] font-serif box-border overflow-hidden print:shadow-none print:w-full">
        
        {/* Decorative Outer Border 1 (Equivalent to ::before) */}
        <div className="absolute inset-[5px] border-2 border-gray-600 pointer-events-none z-10" />
        
        {/* Decorative Outer Border 2 (Equivalent to ::after) */}
        <div className="absolute inset-[10px] border-[4px] border-double border-gray-600 pointer-events-none z-10" />

        {/* Dotted Inner Frame */}
        <div className="relative h-full w-full border-2 border-dotted border-gray-800 p-1 flex flex-col box-border">
          
          {/* Double Pattern Border Container */}
          <div className="flex-grow border-[3px] border-double border-gray-800 py-8 px-11 relative z-20">
            
            {/* Standard Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.08] pointer-events-none z-0">
              <Image 
                src={logo} 
                alt="Watermark" 
                className="w-4/5 h-auto grayscale" 
              />
            </div>

            {/* Content Area */}
            <div className="relative z-30 text-[11pt] leading-relaxed text-black">
              
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

              {/* Meta Data */}
              <div className="font-bold text-[10pt] mb-4">
                Date: {data?._current_date}
              </div>

              {/* Subject */}
              <div className="font-bold text-justify mb-5">
                Subject: Declaration Letter for {data?._application_type}, Application Number: {data?._application_number}
              </div>

              {/* Salutation */}
              <div className="mb-4">Respected Sir,</div>

              {/* Intro */}
              <p className="text-justify mb-3">
                I, <span className="font-bold">{data?._rep_name}</span>, hereby submits the following documents (as indicated by UDIN numbers ) for DPR of IT & ITeS - vetting –
              </p>

              {/* Document Table */}
              <table className="w-full mt-4 mb-6 border-collapse">
                <thead>
                  <tr className="border-b border-black">
                    <th className="text-left font-bold pb-2 w-1/2">Document Type</th>
                    <th className="text-left font-bold pb-2 w-1/2">Udin Number</th>
                  </tr>
                </thead>
                <tbody>
                  {data?._documents && data._documents.length > 0 ? (
                    data._documents.map((doc, index) => (
                      <tr key={index}>
                        <td className="py-1">{doc?._name}</td>
                        <td className="py-1">{doc?._udin}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={2} className="py-4 text-center text-gray-400 italic">No documents provided</td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Declaration Para 1 */}
              <p className="text-justify mb-3">
                I declare that the Project Report as submitted above, is covered under IT & ITeS activities as notified by IT&E dept. vide notification{" "}
                <span className="font-bold">{data?._it_notification_no}</span> dated{" "}
                <span className="font-bold">{data?._it_notification_date}</span> (UDIN:{" "}
                <span className="font-bold">{data?._it_notification_udin}</span>) . I shall indemnify and hold the state harmless, including all associated costs in case of any miss-representation.
              </p>

              <p className="text-justify mb-3">
                I also understand that any kind of miss-representation will invite legal action as per law.
              </p>

              {/* Signature Block 1 (Rep) */}
              <div className="mt-4 mb-6">
                <span className="block font-bold uppercase">{data?._rep_name}</span>
                <span className="block font-bold">{data?._rep_phone}</span>
                <span className="font-bold text-sm">(Signature of authorized representative )</span>
              </div>

              {/* Accountant Declaration */}
              <p className="text-justify mb-3">
                I am Chartered Accountant having <span className="font-bold">registration number {data?._ca_reg_number}</span> have gone through the project report as submitted by authorized representative of the{" "}
                <span className="font-bold">{data?._rep_name}</span> and concur from his views that this project report is covered under IT & ITeS activities as notified by IT&E dept. vide notification{" "}
                <span className="font-bold">{data?._it_notification_no}</span> dated{" "}
                <span className="font-bold">{data?._it_notification_date}</span> (UDIN:{" "}
                <span className="font-bold">{data?._it_notification_udin}</span>) .
              </p>

              <p className="text-justify mb-3">
                I also understand that any kind of miss-representation will invite legal action as per law.
              </p>

              {/* Signature Block 2 (CA) */}
              <div className="mt-4 mb-6">
                <span className="block font-bold uppercase">{data?._ca_name}</span>
                <span className="block font-bold">{data?._ca_phone}</span>
                <span className="font-bold text-sm">(Signature of Chartered Accountant)</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DPRMultipartyDeclaration;