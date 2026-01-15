import React from "react";
import Image from "next/image";
import logo from "@/components/images/webel-logo.png";

interface Applicant {
  _name?: string;
  _address?: string;
  _tax_id?: string;
}

interface FinalNOCMultiOwnerProps {
  data?: {
    _application_number?: string;
    _ref_number?: string;
    _current_date?: string;
    _applicants?: Applicant[];
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

const FinalNOCMultiOwner: React.FC<FinalNOCMultiOwnerProps> = ({ data }) => {
  return (
    <div className="bg-gray-200 min-h-screen flex justify-center py-10 px-4 print:p-0 print:bg-white">
      {/* Page Sheet (A4 Dimensions) */}
      <div className="relative bg-white w-[210mm] min-h-[297mm] shadow-2xl p-[15px] font-serif box-border overflow-hidden print:shadow-none print:w-full">
        
        {/* Standard Decorative Frames (Replacing CSS pseudo-elements) */}
        {/* Layer 1: Solid Border (5px offset) */}
        <div className="absolute inset-[5px] border-2 border-gray-700 pointer-events-none z-10" />
        {/* Layer 2: Double Border (10px offset) */}
        <div className="absolute inset-[10px] border-[4px] border-double border-gray-700 pointer-events-none z-10" />

        {/* Dotted Border Frame */}
        <div className="relative h-full w-full border-2 border-dotted border-gray-800 p-1 flex flex-col box-border">
          
          {/* Inner Double Border (Pattern Border) */}
          <div className="flex-grow border-[3px] border-double border-gray-800 py-10 px-12 relative z-20">
            
            {/* Watermark Logo */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none z-0">
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
              <div className="text-center font-bold text-[12pt] mb-1">
                Final NOC of IT/ITeS Renting (Application Number: {data?._application_number})
              </div>

              <div className="text-center font-bold text-[10pt] mb-5 break-words max-w-[90%] mx-auto">
                {data?._ref_number}
              </div>

              {/* Date */}
              <div className="mb-5">
                Date: {data?._current_date}
              </div>

              {/* Applicants Table */}
              <div className="font-bold mb-2">Applicants Details:</div>
              <table className="w-full border-collapse border border-black mb-6 text-[10pt]">
                <thead>
                  <tr className="bg-white">
                    <th className="border border-black p-1 w-8 text-center font-bold">Sl No.</th>
                    <th className="border border-black p-1 w-1/4 text-center font-bold">Applicants Name</th>
                    <th className="border border-black p-1 text-center font-bold">Address</th>
                    <th className="border border-black p-1 w-1/5 text-center font-bold">GSTN/PAN Number</th>
                  </tr>
                </thead>
                <tbody>
                  {data?._applicants && data._applicants.length > 0 ? (
                    data._applicants.map((applicant, idx) => (
                      <tr key={idx}>
                        <td className="border border-black p-1 text-center">{idx + 1}</td>
                        <td className="border border-black p-1">{applicant?._name}</td>
                        <td className="border border-black p-1">{applicant?._address}</td>
                        <td className="border border-black p-1 text-center font-mono">
                          {applicant?._tax_id}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="border border-black p-2 text-center text-gray-400">
                        No applicant details provided.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Subject */}
              <div className="mb-5 text-justify font-bold underline underline-offset-2">
                Sub: Permission towards sublet of space of {data?._sublet_area_sqft} sq. ft. super built up
                area at {data?._space_description}
              </div>

              <div className="mb-4">Sir,</div>

              {/* Body Paragraphs */}
              <p className="text-justify mb-4">
                This has reference to your (approval letter with UDIN: <span className="font-bold">{data?._udin}</span>) 
                regarding the permission for subletting the space to M/S <span className="font-bold">{data?._tenant_name}</span> at {data?._space_description}.
              </p>

              <p className="text-justify mb-4">
                We would like to confirm our ‘No Objection’ for sub-letting the {data?._sublet_area_sqft}
                sq. ft. space to M/S <span className="font-bold">{data?._tenant_name}</span> for carrying out &quot;{data?._activity_type}&quot; 
                activities as declared by M/S <span className="font-bold">{data?._tenant_name}</span> vide their letter dated {data?._tenant_letter_date}.
                Your Final NOC is effective from {data?._noc_start_date} to {data?._noc_end_date}.
                The NOC would lapse automatically as soon as the said tenancies are expired by influx of time or the same are determined earlier.
              </p>

              <p className="text-justify mb-4">
                You are advised to comply all legal formalities regarding agreement with your tenants and inform
                NDITA about the existence of the said firm in Sector-V area.
              </p>

              <p className="text-justify mb-4">
                You will have required to pay permission fees @ Rs.{data?._permission_fee_rate}/- per sq.
                ft. (permission fees is subject to change from time to time) of the super built up area
                along with applicable goods & services taxes to W.B.E.I.D.C. Ltd by the 7th day of every
                calendar month. Such fees shall be paid in advance in every month, irrespective of your
                receiving rent from the tenant and the non-payment of Permission fees or any kind of
                non-compliance may cause automatic cancellation/withdrawal of the NOC granted.
              </p>

              <p className="text-justify mb-4">
                Moreover, you are requested to inform us about the vacancy and fill up of premises within the
                month of its happening otherwise permission fees will be charged upto date as mentioned in the
                agreement without any reversal thereon.
              </p>

              <div className="mt-4">Thanking you,</div>

              {/* Signature Block */}
              <div className="mt-12 mb-6">
                <div className="font-bold">Authorised Signatory</div>
                <div className="font-bold">For Managing Director, Webel</div>
                <div className="mt-1 text-[10pt] italic text-gray-700">
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

export default FinalNOCMultiOwner;