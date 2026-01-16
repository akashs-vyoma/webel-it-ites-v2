import React from "react";
import Image from "next/image";
import logo from "@/components/images/webel-logo.png";

interface ProvisionalNOCProps {
  data?: {
    _application_number?: string;
    _ref_number?: string;
    _current_date?: string;
    _company_name?: string;
    _company_address?: string;
    _sublet_area_sqft?: string;
    _space_description?: string;
    _udin?: string;
    _tenant_name?: string;
    _tenant_letter_date?: string;
    _noc_start_date?: string;
    _noc_end_date?: string;
    _permission_fee_rate?: string;
  };
}

const ProvisionalNOCLetter: React.FC<ProvisionalNOCProps> = ({ data }) => {
  return (
    <div className="bg-[#f0f0f0] min-h-screen flex justify-center p-5 font-serif print:bg-white print:p-0">
      {/* Main Page Container (A4 Size) */}
      <div className="relative bg-white w-[210mm] min-h-[297mm] shadow-xl p-[15px] box-border overflow-hidden print:shadow-none print:w-full">
        
        {/* Decorative Outer Border 1 (Equivalent to ::before) */}
        <div className="absolute inset-[5px] border-2 border-[#555] pointer-events-none z-10" />
        
        {/* Decorative Outer Border 2 (Equivalent to ::after) */}
        <div className="absolute inset-[10px] border-[4px] border-double border-[#555] pointer-events-none z-10" />

        {/* Dotted Frame Layer */}
        <div className="relative h-full w-full border-2 border-dotted border-[#333] p-1 flex flex-col box-border">
          
          {/* Inner Pattern/Double Border */}
          <div className="flex-grow border-[3px] border-double border-[#333] py-10 px-12 relative z-20">
            
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
              <h1 className="text-center font-bold text-[12pt] mb-1">
                Provisional NOC of IT/ITeS Renting (Application Number: {data?._application_number})
              </h1>

              <div className="text-center font-bold text-[10pt] mb-5 break-words">
                {data?._ref_number}
              </div>

              {/* Date */}
              <div className="mb-5">
                Date: {data?._current_date}
              </div>

              {/* Recipient Info */}
              <div className="mb-5 font-bold leading-snug">
                Name of Company: {data?._company_name}<br />
                Address: {data?._company_address}
              </div>

              {/* Subject */}
              <div className="mb-5 text-justify font-bold underline underline-offset-4 decoration-1">
                Sub: Permission towards sublet of space of {data?._sublet_area_sqft} sq. ft. super built up area at {data?._space_description}
              </div>

              <div className="mb-4">Sir,</div>

              {/* Body Paragraphs */}
              <p className="text-justify mb-4">
                This has reference to your (self declaration letter with UDIN:{" "}
                <span className="font-bold">{data?._udin}</span>) regarding the permission for subletting the space to M/S{" "}
                <span className="font-bold">{data?._tenant_name}</span> at {data?._space_description}.
              </p>

              <p className="text-justify mb-4">
                We would like to confirm our ‘No Objection’ for sub-letting the {data?._sublet_area_sqft} sq. ft. space to M/S{" "}
                <span className="font-bold">{data?._tenant_name}</span> for carrying out &quot;IT&ITes&quot; activities as declared by M/S{" "}
                <span className="font-bold">{data?._tenant_name}</span> vide their letter dated {data?._tenant_letter_date}. Your Provisional NOC is effective from {data?._noc_start_date} to {data?._noc_end_date}. The NOC would lapse automatically as soon as the said tenancies are expired by influx of time or the same are determined earlier.
              </p>

              <p className="text-justify mb-4">
                You are advised to comply all legal formalities regarding agreement with your tenants and inform NDITA about the existence of the said firm in Sector-V area.
              </p>

              <p className="text-justify mb-4">
                You will have required to pay permission fees @ Rs.{data?._permission_fee_rate}/- per sq. ft. (permission fees is subject to change from time to time) of the super built up area along with applicable goods & services taxes to W.B.E.I.D.C. Ltd by the 7th day of every calendar month. Such fees shall be paid in advance in every month, irrespective of your receiving rent from the tenant and the non-payment of Permission fees or any kind of non-compliance may cause automatic cancellation/withdrawal of the NOC granted.
              </p>

              <p className="text-justify mb-4">
                Moreover, you are requested to inform us about the vacancy and fill up of premises within the month of its happening otherwise permission fees will be charged upto date as mentioned in the agreement without any reversal thereon.
              </p>

              <p className="text-justify mb-4">
                Thanking you,
              </p>

              {/* Signature Block */}
              <div className="mt-12 mb-6">
                <div className="font-bold leading-tight">Authorised Signatory</div>
                <div className="font-bold leading-tight">For Managing Director, Webel</div>
                <div className="mt-1 text-[10pt] italic">
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

export default ProvisionalNOCLetter;