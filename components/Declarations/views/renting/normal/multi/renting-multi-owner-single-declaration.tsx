import React from "react";
import Image from "next/image";
import logo from "@/components/images/webel-logo.png";

interface DocumentItem {
  _name?: string;
  _udin?: string;
}

interface DeclarationMultipartyProps {
  data?: {
    _current_date?: string;
    _application_type?: string;
    _application_number?: string;
    _rep_name?: string;
    _rep_phone?: string;
    _documents?: DocumentItem[];
    _tenant_name?: string;
    _tenant_id?: string;
    _activity_type?: string;
    _notification_udin?: string;
    _building_area_sqft?: string;
    _commercial_area_sqft?: string;
    _sublet_area_sqft?: string;
    _tenant_rep_name?: string;
    _tenant_rep_phone?: string;
  };
}

const DeclarationMultiparty: React.FC<DeclarationMultipartyProps> = ({ data }) => {
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center py-10 px-4 print:p-0 print:bg-white">
      {/* Main Page Container (A4 Size) */}
      <div className="relative bg-white w-[210mm] min-h-[297mm] shadow-2xl p-[15px] box-border font-serif print:shadow-none print:w-full overflow-hidden">
        
        {/* Decorative Outer Border 1 (Equivalent to ::before) */}
        <div className="absolute inset-[5px] border-2 border-gray-600 pointer-events-none z-10" />
        
        {/* Decorative Outer Border 2 (Equivalent to ::after) */}
        <div className="absolute inset-[10px] border-[4px] border-double border-gray-600 pointer-events-none z-10" />

        {/* Dotted Frame Border */}
        <div className="relative h-full w-full border-2 border-dotted border-gray-800 p-1 flex flex-col box-border">
          
          {/* Inner Double Border (Pattern Border) */}
          <div className="flex-grow border-[3px] border-double border-gray-800 py-8 px-10 relative z-20">
            
            {/* Standard Watermark */}
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

              {/* Date */}
              <div className="font-bold text-[10pt] mb-5">
                Date: {data?._current_date}
              </div>

              {/* Subject */}
              <div className="font-bold text-justify mb-6">
                Subject: Declaration Letter for {data?._application_type}, Application Number: {data?._application_number}
              </div>

              {/* Salutation */}
              <div className="font-bold mb-5">Respected Sir,</div>

              {/* Intro Paragraph */}
              <p className="text-justify mb-4">
                I, <span className="font-bold">{data?._rep_name}</span>, hereby submits the following documents (as indicated by UDIN numbers) for {data?._application_type} –
              </p>

              {/* Document Table */}
              <table className="w-[90%] ml-[30px] border-collapse mb-6 text-[11pt]">
                <thead>
                  <tr className="border-b-2 border-gray-800">
                    <th className="text-left font-bold pb-1 w-1/2">Document Type</th>
                    <th className="text-left font-bold pb-1">Udin Number</th>
                  </tr>
                </thead>
                <tbody>
                  {data?._documents && data._documents.length > 0 ? (
                    data._documents.map((doc, idx) => (
                      <tr key={idx} className="border-b border-gray-100">
                        <td className="py-1 pr-2">{doc?._name}</td>
                        <td className="py-1">{doc?._udin}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={2} className="py-2 italic text-gray-400 text-center">No documents provided.</td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Declaration Para 1 */}
              <p className="text-justify mb-4">
                I declare that the <span className="font-bold">{data?._tenant_name}</span> having {data?._tenant_id} has agreed to conduct <span className="font-bold">{data?._activity_type}</span> and this space is within the limit of <span className="font-bold">20%</span> of the total space allowed for <span className="font-bold">Non IT&ITes Activity</span> vide notification 1967/UD/O/M/SL(AL/NR)/7L-23/95(Pt.) dated 3rd June 2008 (UDIN: <span className="font-bold">{data?._notification_udin}</span>). I shall indemnify and hold the state harmless, including all associated costs in case of any miss-representation.<br />
                The data provided by me including total area of building {data?._building_area_sqft} (sqft) and total commercial area {data?._commercial_area_sqft} (sqft) is true to best of my knowledge.
              </p>

              <p className="text-justify mb-4">
                I also understand that any kind of miss-representation will invite legal action as per law.
              </p>

              {/* Signature 1 (Applicant Rep) */}
              <div className="mt-5 mb-6">
                <span className="block font-bold uppercase">{data?._rep_name}</span>
                <span className="block font-bold">{data?._rep_phone}</span>
                <span className="block font-bold text-[10pt]">(signature of authorized representative)</span>
              </div>

              {/* Declaration Para 2 (Tenant Context) */}
              <p className="text-justify mb-4">
                On behalf as duly authorised & having competence to do so on behalf of <span className="font-bold">{data?._tenant_name}</span> having {data?._tenant_id} declare that the {data?._sublet_area_sqft} (sqft) space is being rented for <span className="font-bold">{data?._activity_type}</span> as permitted vide notification 1967/UD/O/M/SL(AL/NR)/7L-23/95(Pt.) dated 3rd June 2008 (UDIN: <span className="font-bold">{data?._notification_udin}</span>). I shall indemnify and hold the state harmless, including all associated costs in case of any miss-representation.
              </p>

              <p className="text-justify mb-4">
                I also understand that any kind of miss-representation will invite legal action as per law.
              </p>

              {/* Signature 2 (Tenant Rep) */}
              <div className="mt-5 mb-6">
                <span className="block font-bold uppercase">{data?._tenant_rep_name}</span>
                <span className="block font-bold">{data?._tenant_rep_phone}</span>
                <span className="block font-bold text-[10pt]">(Signature of authorized representative of Tenant)</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeclarationMultiparty;