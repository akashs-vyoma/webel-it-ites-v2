import React from "react";
import Image from "next/image";
import logo from "@/components/images/webel-logo.png";

interface DocumentItem {
  _name?: string;
  _udin?: string;
}

interface RentingDeclarationProps {
  data?: {
    _current_date?: string;
    _application_type?: string;
    _application_number?: string;
    _company_name?: string;
    _documents?: DocumentItem[];
    _tenant_name?: string;
    _tenant_id?: string;
    _it_notification_udin?: string;
    _building_area_sqft?: string;
    _commercial_area_sqft?: string;
    _company_rep_name?: string;
    _company_rep_phone?: string;
    _sublet_area_sqft?: string;
    _tenant_notification_udin?: string;
    _tenant_rep_name?: string;
    _tenant_rep_phone?: string;
    _cs_reg_number?: string;
    _cs_name?: string;
    _cs_phone?: string;
  };
}

const RentingSingleOwnerDeclaration: React.FC<RentingDeclarationProps> = ({ data }) => {
  return (
    <div className="bg-gray-200 min-h-screen flex justify-center py-10 px-4 print:p-0 print:bg-white">
      {/* Main Page Sheet (A4 Dimensions) */}
      <div className="relative bg-white w-[210mm] min-h-[297mm] shadow-2xl p-[15px] font-serif box-border overflow-hidden print:shadow-none print:w-full">
        
        {/* Triple Border Generation (Replaces CSS pseudo-elements) */}
        {/* Layer 1: Solid Border (5px offset) */}
        <div className="absolute inset-[5px] border-2 border-gray-600 pointer-events-none z-10" />
        {/* Layer 2: Double Border (10px offset) */}
        <div className="absolute inset-[10px] border-[4px] border-double border-gray-600 pointer-events-none z-10" />

        {/* Dotted Border Frame */}
        <div className="relative h-full w-full border-2 border-dotted border-gray-800 p-1 flex flex-col box-border">
          
          {/* Inner Double Pattern Border */}
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
            <div className="relative z-30 text-[11pt] leading-[1.4] text-black">
              
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

              {/* Date Metadata */}
              <div className="font-bold text-[10pt] mb-5">
                Date: {data?._current_date}
              </div>

              {/* Subject */}
              <div className="font-bold text-justify mb-5">
                Subject: Declaration Letter for {data?._application_type}, Application Number: {data?._application_number}
              </div>

              {/* Salutation */}
              <div className="mb-4">Respected Sir,</div>

              {/* Intro Paragraph */}
              <p className="text-justify mb-4">
                I am authorized representative of Company <span className="font-bold">{data?._company_name}</span>, hereby submits the
                following documents (as indicated by UDIN numbers) for {data?._application_type}
              </p>

              {/* Document Table */}
              <div className="ml-8 mr-2 mb-6">
                <div className="flex font-bold border-b border-black pb-1 mb-1">
                  <div className="w-[45%]">Document Type</div>
                  <div className="w-[55%]">Udin Number</div>
                </div>
                <table className="w-full border-collapse">
                  <tbody>
                    {data?._documents && data._documents.length > 0 ? (
                      data._documents.map((doc, index) => (
                        <tr key={index} className="align-top">
                          <td className="w-[45%] py-0.5">{doc?._name}</td>
                          <td className="w-[55%] py-0.5">{doc?._udin}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={2} className="py-2 text-gray-400 italic">No documents listed.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Body Paragraph 1 */}
              <p className="text-justify mb-4">
                On behalf as duly authorised & having competence to do so on behalf of <span className="font-bold">{data?._company_name}</span>, I
                declare that the <span className="font-bold">{data?._tenant_name}</span> having {data?._tenant_id} 
                has agreed to conduct activity covered under IT & ITeS activities as notified by IT&E dept. vide 
                notification 845-IT/O/117/2013 dated 12.7.2023 (UDIN: <span className="font-bold">{data?._it_notification_udin}</span>). 
                I shall indemnify and hold the state harmless, including all associated costs in case of any miss-representation. 
                The data provided by me including total area of building {data?._building_area_sqft} (sqft) and total 
                commercial area {data?._commercial_area_sqft} (sqft) is true to best of my knowledge.
              </p>

              {/* Legal Warning */}
              <p className="text-justify mb-4">
                I also understand that any kind of miss-representation will invite legal action as per law.
              </p>

              {/* Signature Block 1 (Company Rep) */}
              <div className="mt-2 mb-6">
                <span className="block font-bold uppercase">{data?._company_rep_name}</span>
                <span className="block font-bold">{data?._company_rep_phone}</span>
                <span className="block font-bold text-[10pt]">(Signature of authorized representative)</span>
              </div>

              {/* Body Paragraph 2 (Tenant Context) */}
              <p className="text-justify mb-4">
                On behalf as duly authorised & having competence to do so on behalf of <span className="font-bold">{data?._tenant_name}</span> having 
                {data?._tenant_id} declare that the {data?._sublet_area_sqft} (sqft) space is being rented for IT&ITeS Activity as 
                permitted vide notification 1967/UD/O/M/SL(AL/NR)/7L-23/95(Pt.) dated 3rd June 2008 
                (UDIN: <span className="font-bold">{data?._tenant_notification_udin}</span>). I shall indemnify and hold the state 
                harmless, including all associated costs in case of any miss-representation.
              </p>

              <p className="text-justify mb-4">
                I also understand that any kind of miss-representation will invite legal action as per law.
              </p>

              {/* Signature Block 2 (Tenant Rep) */}
              <div className="mt-2 mb-6">
                <span className="block font-bold uppercase">{data?._tenant_rep_name}</span>
                <span className="block font-bold">{data?._tenant_rep_phone}</span>
                <span className="block font-bold text-[10pt]">(Signature of authorized representative of Tenant)</span>
              </div>

              {/* CS Declaration Section */}
              <p className="text-justify mb-4">
                I am Company Secretary having <span className="font-bold">registration number {data?._cs_reg_number}</span> have 
                gone through the project report as submitted by authorized representative of the <span className="font-bold">{data?._company_name}</span> 
                and concur from his views that this project report is covered under IT & ITeS activities as notified by IT&E dept. 
                vide notification 845-IT/O/117/2013 dated 12.7.23 (UDIN: <span className="font-bold">{data?._it_notification_udin}</span>).
              </p>

              <p className="text-justify mb-4">
                I also understand that any kind of miss-representation will invite legal action as per law.
              </p>

              {/* Signature Block 3 (CS) */}
              <div className="mt-2 mb-6">
                <span className="block font-bold uppercase">{data?._cs_name}</span>
                <span className="block font-bold">{data?._cs_phone}</span>
                <span className="block font-bold text-[10pt]">(Signature of Company Secretary)</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentingSingleOwnerDeclaration;