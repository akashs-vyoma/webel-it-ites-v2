import React from "react";
import Image from "next/image";
import logo from "@/components/images/webel-logo.png";

interface DocumentItem {
  _name?: string;
  _udin?: string;
}

interface RentingRenewalProps {
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

const RentingRenewalDeclaration: React.FC<RentingRenewalProps> = ({ data }) => {
  return (
    <div className="bg-[#f0f0f0] min-h-screen flex justify-center py-5 px-4 print:bg-white print:p-0">
      {/* Main Page Sheet (A4 size) */}
      <div className="relative bg-white w-[210mm] min-h-[297mm] shadow-lg p-[15px] box-border font-serif text-black print:shadow-none print:w-full overflow-hidden">
        
        {/* Decorative Outer Borders (Simulating ::before and ::after pseudo-elements) */}
        {/* Solid Frame */}
        <div className="absolute inset-[5px] border-2 border-[#555] pointer-events-none z-10" />
        {/* Double Frame */}
        <div className="absolute inset-[10px] border-[4px] border-double border-[#555] pointer-events-none z-10" />

        {/* Dotted Frame Layer */}
        <div className="relative h-full w-full border-2 border-dotted border-[#333] p-1 flex flex-col box-border">
          
          {/* Inner Double/Pattern Border */}
          <div className="flex-grow border-[3px] border-double border-[#333] py-8 px-10 relative z-20">
            
            {/* Watermark Section */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none z-0">
              <div className="w-[80%] text-center">
                <Image 
                  src={logo} 
                  alt="Watermark" 
                  className="w-full h-auto grayscale"
                />
              </div>
            </div>

            {/* Content Area */}
            <div className="relative z-30 text-[10.5pt] leading-[1.4]">
              
              {/* Header Logo */}
              <div className="flex justify-center mb-5">
                <Image
                  src={logo}
                  alt="Webel Logo"
                  height={80}
                  className="h-[80px] w-auto object-contain"
                  priority
                />
              </div>

              {/* Header Meta (Date) */}
              <div className="mb-[15px] font-bold text-[10pt]">
                Date: {data?._current_date}
              </div>

              {/* Subject */}
              <div className="mb-5 font-bold text-justify">
                Subject: Declaration Letter for {data?._application_type}, Application Number: {data?._application_number}
              </div>

              {/* Salutation */}
              <div className="mb-[15px] font-bold">
                Respected Sir,
              </div>

              <p className="mb-3 text-justify">
                I, <span className="font-bold">{data?._rep_name}</span>, hereby submits the following documents (as indicated by UDIN numbers) for NOC for Renting Out Leased property –
              </p>

              {/* Document List Table */}
              <table className="ml-[30px] w-[90%] mb-5 border-collapse">
                <thead>
                  <tr>
                    <td className="font-bold py-[3px] pr-[10px] w-1/2 align-top">Document Type</td>
                    <td className="font-bold py-[3px] pr-[10px] align-top">Udin Number</td>
                  </tr>
                </thead>
                <tbody>
                  {data?._documents?.map((doc, index) => (
                    <tr key={index}>
                      <td className="py-[3px] pr-[10px] align-top">{doc?._name}</td>
                      <td className="py-[3px] pr-[10px] align-top">{doc?._udin}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Applicant Declaration */}
              <p className="mb-3 text-justify">
                I declare that the <span className="font-bold">{data?._tenant_name}</span> having {data?._tenant_id} has agreed to conduct <span className="font-bold">{data?._activity_type}</span> and this space is within the limit of <span className="font-bold">20%</span> of the total space allowed for <span className="font-bold">Non IT&ITes Activity</span> vide notification 1967/UD/O/M/SL(AL/NR)/7L-23/95(Pt.) dated 3rd June 2008 (UDIN: <span className="font-bold">{data?._notification_udin}</span>). I shall indemnify and hold the state harmless, including all associated costs in case of any miss-representation.
                <br />
                The data provided by me including total area of building {data?._building_area_sqft} (sqft) and total commercial area {data?._commercial_area_sqft} (sqft) is true to best of my knowledge.
              </p>

              <p className="mb-3 text-justify">
                I also understand that any kind of miss-representation will invite legal action as per law.
              </p>

              {/* Signature Block 1 (Applicant) */}
              <div className="mt-[15px] mb-5">
                <span className="block font-bold uppercase">{data?._rep_name}</span>
                <span className="block font-bold">{data?._rep_phone}</span>
                <span className="font-bold text-[9.5pt]">(signature of authorized representative)</span>
              </div>

              {/* Tenant Declaration */}
              <p className="mb-3 text-justify">
                On behalf as duly authorised & having competence to do so on behalf of <span className="font-bold">{data?._tenant_name}</span> having {data?._tenant_id} declare that the {data?._sublet_area_sqft} (sqft) space is being rented for <span className="font-bold">{data?._activity_type}</span> as permitted vide notification 1967/UD/O/M/SL(AL/NR)/7L-23/95(Pt.) dated 3rd June 2008 (UDIN: <span className="font-bold">{data?._notification_udin}</span>). I shall indemnify and hold the state harmless, including all associated costs in case of any miss-representation.
              </p>

              <p className="mb-3 text-justify">
                I also understand that any kind of miss-representation will invite legal action as per law.
              </p>

              {/* Signature Block 2 (Tenant) */}
              <div className="mt-[15px] mb-5">
                <span className="block font-bold uppercase">{data?._tenant_rep_name}</span>
                <span className="block font-bold">{data?._tenant_rep_phone}</span>
                <span className="font-bold text-[9.5pt]">(Signature of authorized representative of Tenant)</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentingRenewalDeclaration;