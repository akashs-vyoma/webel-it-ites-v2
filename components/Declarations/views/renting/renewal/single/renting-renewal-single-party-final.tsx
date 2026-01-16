import React from "react";
import Image from "next/image";
// Importing logo as requested
import logo from "@/components/images/webel-logo.png";

interface FinalNOCRenewalProps {
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
    _activity_type?: string;
    _tenant_letter_date?: string;
    _noc_start_date?: string;
    _noc_end_date?: string;
    _permission_fee_rate?: string;
  };
}

const LetterPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative bg-white w-[210mm] min-h-[297mm] shadow-lg p-[15px] box-border print:shadow-none print:m-0 break-after-page font-serif">
      {/* Outer Frame (Equivalent to ::before) */}
      <div className="absolute inset-[5px] border-2 border-gray-600 pointer-events-none" />
      
      {/* Double Frame (Equivalent to ::after) */}
      <div className="absolute inset-[10px] border-[4px] border-double border-gray-600 pointer-events-none" />

      {/* Dotted Frame */}
      <div className="relative h-full w-full border-2 border-dotted border-gray-800 p-1 flex flex-col box-border">
        {/* Pattern Border Inner */}
        <div className="flex-grow border-[3px] border-double border-gray-800 py-10 px-12 relative z-10">
          
          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none -z-10">
            <Image 
              src={logo} 
              alt="Watermark" 
              className="w-4/5 h-auto grayscale"
            />
          </div>

          <div className="relative z-20">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const FinalNOCRenewal: React.FC<FinalNOCRenewalProps> = ({ data }) => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-10 gap-10 print:bg-white print:p-0 print:gap-0">
      
      {/* PAGE 1 */}
      <LetterPage>
        <div className="text-[11pt] leading-[1.5] text-black">
          {/* Header Logo */}
          <div className="flex justify-center mb-4">
            <Image
              src={logo}
              alt="Webel Logo"
              height={80}
              className="h-20 w-auto object-contain"
              priority
            />
          </div>

          <div className="text-center font-bold text-[12pt] mb-4">
            Final NOC of IT/ITeS Renting (Application Number: {data?._application_number})
          </div>

          <div className="text-center font-bold text-[10pt] mb-5 break-words max-w-[90%] mx-auto">
            {data?._ref_number}
          </div>

          <div className="mb-5">
            Date: {data?._current_date}
          </div>

          <div className="mb-5">
            <span className="font-bold">Name of Company:</span> {data?._company_name}<br />
            <span className="font-bold">Address:</span> {data?._company_address}
          </div>

          <div className="mb-5 font-bold text-justify underline">
            Sub: Permission towards sublet of space of {data?._sublet_area_sqft} sq. ft. super built up area at {data?._space_description}
          </div>

          <div className="mb-4">Sir,</div>

          <p className="text-justify mb-4">
            This has reference to your (approval letter with UDIN: <span className="font-bold">{data?._udin}</span>) regarding the permission for subletting the space to M/S <span className="font-bold">{data?._tenant_name}</span> at {data?._space_description}.
          </p>

          <p className="text-justify mb-4">
            We would like to confirm our ‘No Objection’ for sub-letting the {data?._sublet_area_sqft} sq. ft. space to M/S <span className="font-bold">{data?._tenant_name}</span> for carrying out &quot;{data?._activity_type}&quot; activities as declared by M/S <span className="font-bold">{data?._tenant_name}</span> vide their letter dated {data?._tenant_letter_date}. Your Final NOC is effective from {data?._noc_start_date} to {data?._noc_end_date}. The NOC would lapse automatically as soon as the said tenancies are expired by influx of time or the same are determined earlier.
          </p>

          <p className="text-justify mb-4">
            You are advised to comply all legal formalities regarding agreement with your tenants and inform NDITA about the existence of the said firm in Sector-V area.
          </p>
        </div>
      </LetterPage>

      {/* PAGE 2 */}
      <LetterPage>
        <div className="text-[11pt] leading-[1.5] text-black">
          <div className="flex justify-center mb-4">
            <Image
              src={logo}
              alt="Webel Logo"
              height={80}
              className="h-20 w-auto object-contain"
            />
          </div>

          <p className="text-justify mb-4">
            You will have required to pay permission fees @ Rs.{data?._permission_fee_rate}/- per sq. ft. (permission fees is subject to change from time to time) of the super built up area along with applicable goods & services taxes to W.B.E.I.D.C. Ltd by the 7th day of every calendar month. Such fees shall be paid in advance in every month, irrespective of your receiving rent from the tenant and the non-payment of Permission fees or any kind of non-compliance may cause automatic cancellation/withdrawal of the NOC granted.
          </p>

          <p className="text-justify mb-4">
            Moreover, you are requested to inform us about the vacancy and fill up of premises within the month of its happening otherwise permission fees will be charged upto date as mentioned in the agreement without any reversal thereon.
          </p>

          <p className="mb-8">Thanking you,</p>

          <div className="mt-8">
            <span className="block font-bold">Authorised Signatory</span>
            <span className="block font-bold">For Managing Director, Webel</span>
            <div className="mt-1 text-[10pt] italic">
              (This document is digitally signed and does not require physical signature)
            </div>
          </div>
        </div>
      </LetterPage>
    </div>
  );
};

export default FinalNOCRenewal;