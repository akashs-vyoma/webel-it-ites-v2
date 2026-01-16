import React from "react";
import Image from "next/image";
import logo from "@/components/images/webel-logo.png";

interface DocumentItem {
  _name?: string;
  _udin?: string;
}

interface DeclarationLetterProps {
  data?: {
    _current_date?: string;
    _application_type?: string;
    _application_number?: string;
    _company_name?: string;
    _documents?: DocumentItem[];
    _tenant_name?: string;
    _tenant_id?: string;
    _activity_type?: string;
    _it_notification_no?: string;
    _it_notification_date?: string;
    _it_notification_udin?: string;
    _building_area_sqft?: string;
    _commercial_area_sqft?: string;
    _rep_name?: string;
    _rep_phone?: string;
    _tenant_rep_name?: string;
    _tenant_rep_phone?: string;
  };
}

const RentingRenewalSingleDeclaration: React.FC<DeclarationLetterProps> = ({ data }) => {
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center py-10 px-4 print:p-0 print:bg-white font-serif">
      {/* A4 Container */}
      <div className="relative bg-white w-[210mm] min-h-[297mm] shadow-2xl p-[15px] box-border overflow-hidden print:shadow-none print:w-full">
        
        {/* Standard Frame lines (Absolute layers to mimic CSS ::before and ::after) */}
        {/* Layer 1: Solid Border (equivalent to 5px offset) */}
        <div className="absolute inset-[5px] border-2 border-gray-600 pointer-events-none z-10" />
        
        {/* Layer 2: Double Border (equivalent to 10px offset) */}
        <div className="absolute inset-[10px] border-[4px] border-double border-gray-600 pointer-events-none z-10" />

        {/* Dotted Border Frame */}
        <div className="relative h-full w-full border-2 border-dotted border-gray-800 p-1 flex flex-col box-border">
          
          {/* Inner Pattern/Double Border Container */}
          <div className="flex-grow border-[3px] border-double border-gray-800 py-8 px-10 relative z-20">
            
            {/* Watermark Section */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.08] pointer-events-none z-0">
              <Image 
                src={logo} 
                alt="Watermark" 
                className="w-4/5 h-auto grayscale" 
              />
            </div>

            {/* Content Area */}
            <div className="relative z-30 text-[10.5pt] leading-[1.4] text-black">
              
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

              {/* Date */}
              <div className="font-bold mb-[15px]">
                Date: {data?._current_date}
              </div>

              {/* Subject */}
              <div className="font-bold text-justify mb-5">
                Subject: Declaration Letter for {data?._application_type}, Application Number: {data?._application_number}
              </div>

              {/* Salutation */}
              <div className="font-bold mb-[15px]">
                Respected Sir,
              </div>

              <p className="text-justify mb-3">
                I am authorized representative of Company <span className="font-bold">{data?._company_name}</span>, 
                hereby submits the following documents (as indicated by UDIN numbers) for NOC for Renting Out Leased property –
              </p>

              {/* Document Table */}
              <table className="w-[90%] ml-[30px] my-5 border-collapse text-[10.5pt]">
                <thead>
                  <tr className="font-bold">
                    <td className="border-b border-black pb-1 underline underline-offset-2 w-1/2">Document Type</td>
                    <td className="border-b border-black pb-1 underline underline-offset-2 w-1/2">Udin Number</td>
                  </tr>
                </thead>
                <tbody>
                  {data?._documents && data._documents.length > 0 ? (
                    data._documents.map((doc, index) => (
                      <tr key={index}>
                        <td className="py-[3px] pr-2">{doc?._name}</td>
                        <td className="py-[3px]">{doc?._udin}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={2} className="py-2 text-gray-400 italic">No documents provided</td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Lessor Declaration */}
              <p className="text-justify mb-3">
                On behalf as duly authorised & having competence to do so on behalf of{" "}
                <span className="font-bold">{data?._company_name}</span>, I declare that the{" "}
                <span className="font-bold">{data?._tenant_name}</span> having {data?._tenant_id} has agreed to conduct{" "}
                <span className="font-bold">{data?._activity_type}</span> and this space is within the limit of <span className="font-bold">20%</span>{" "}
                of the total space allowed for {data?._activity_type} vide notification{" "}
                <span className="font-bold">{data?._it_notification_no}</span> dated{" "}
                <span className="font-bold">{data?._it_notification_date}</span> (UDIN:{" "}
                <span className="font-bold">{data?._it_notification_udin}</span>) . I shall indemnify and hold the state harmless, 
                including all associated costs in case of any miss-representation.
                <br />
                The data provided by me including total area of building {data?._building_area_sqft} (sqft) and 
                total commercial area {data?._commercial_area_sqft} (sqft) is true to best of my knowledge.
              </p>

              <p className="text-justify mb-3">
                I also understand that any kind of miss-representation will invite legal action as per law.
              </p>

              {/* Signature 1 (Lessor Rep) */}
              <div className="mt-[15px] mb-5">
                <span className="block font-bold uppercase">{data?._rep_name}</span>
                <span className="block font-bold">{data?._rep_phone}</span>
                <span className="block font-bold text-[9.5pt]">(signature of authorized representative)</span>
              </div>

              {/* Tenant Declaration */}
              <p className="text-justify mb-3">
                On behalf as duly authorised & having competence to do so on behalf of{" "}
                <span className="font-bold">{data?._tenant_name}</span> having {data?._tenant_id} declare that the{" "}
                {data?._commercial_area_sqft} (sqft) space is being rented for{" "}
                <span className="font-bold">{data?._activity_type}</span> as permitted vide notification{" "}
                <span className="font-bold">{data?._it_notification_no}</span> dated{" "}
                <span className="font-bold">{data?._it_notification_date}</span> (UDIN:{" "}
                <span className="font-bold">{data?._it_notification_udin}</span>) . I shall indemnify and hold the state harmless, 
                including all associated costs in case of any miss-representation.
              </p>

              <p className="text-justify mb-3">
                I also understand that any kind of miss-representation will invite legal action as per law.
              </p>

              {/* Signature 2 (Tenant Rep) */}
              <div className="mt-[15px] mb-5">
                <span className="block font-bold uppercase">{data?._tenant_rep_name}</span>
                <span className="block font-bold">{data?._tenant_rep_phone}</span>
                <span className="block font-bold text-[9.5pt]">(Signature of authorized representative of Tenant)</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentingRenewalSingleDeclaration;