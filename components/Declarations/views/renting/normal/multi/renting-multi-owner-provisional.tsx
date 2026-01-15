import React from "react";
import Image from "next/image";
import logo from "@/components/images/webel-logo.png";

interface Applicant {
  _name?: string;
  _address?: string;
  _tax_id?: string;
}

interface ProvisionalNOCProps {
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

const ProvisionalNOCMultiOwner: React.FC<ProvisionalNOCProps> = ({ data }) => {
  return (
    <div className="bg-gray-200 min-h-screen flex justify-center py-10 px-4 print:p-0 print:bg-white font-serif">
      {/* Page Container (A4 Size) */}
      <div className="relative bg-white w-[210mm] min-h-[297mm] shadow-xl p-[15px] box-border print:shadow-none print:w-full">
        
        {/* Decorative Outer Border 1 (Equivalent to ::before) */}
        <div className="absolute inset-[5px] border-2 border-gray-600 pointer-events-none z-10" />
        
        {/* Decorative Outer Border 2 (Equivalent to ::after) */}
        <div className="absolute inset-[10px] border-[4px] border-double border-gray-600 pointer-events-none z-10" />

        {/* Dotted Frame Border */}
        <div className="relative h-full w-full border-2 border-dotted border-gray-800 p-1 flex flex-col box-border">
          
          {/* Inner Double Border (Pattern Border) */}
          <div className="flex-grow border-[3px] border-double border-gray-800 py-10 px-[50px] relative z-20">
            
            {/* Watermark Section */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none z-0">
              <Image 
                src={logo} 
                alt="Watermark" 
                className="w-4/5 h-auto grayscale" 
              />
            </div>

            {/* Content Area */}
            <div className="relative z-30 text-[11pt] leading-relaxed text-black">
              
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

              {/* Document Header */}
              <div className="text-center font-bold text-[12pt] mb-1">
                Provisional NOC of IT/ITeS Renting (Application Number: {data?._application_number})
              </div>

              <div className="text-center font-bold text-[10pt] mb-5 break-words">
                {data?._ref_number}
              </div>

              {/* Date */}
              <div className="mb-5">
                Date: {data?._current_date}
              </div>

              {/* Applicants Details Table */}
              <div className="font-bold mb-2">Applicants Details:</div>
              <table className="w-full border-collapse border border-black mb-6 text-[10pt]">
                <thead>
                  <tr className="bg-white">
                    <th className="border border-black p-1 w-[30px] text-center font-bold">Sl No.</th>
                    <th className="border border-black p-1 w-1/4 text-center font-bold">Applicants Name</th>
                    <th className="border border-black p-1 w-1/2 text-center font-bold">Address</th>
                    <th className="border border-black p-1 w-1/5 text-center font-bold">GSTN/PAN Number</th>
                  </tr>
                </thead>
                <tbody>
                  {data?._applicants && data._applicants.length > 0 ? (
                    data._applicants.map((applicant, index) => (
                      <tr key={index}>
                        <td className="border border-black p-1 text-center">{index + 1}</td>
                        <td className="border border-black p-1">{applicant?._name}</td>
                        <td className="border border-black p-1">{applicant?._address}</td>
                        <td className="border border-black p-1 text-center whitespace-nowrap">
                          {applicant?._tax_id}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="border border-black p-4 text-center text-gray-400">
                        No applicant details found.
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

              <div className="mb-4 text-black">Sir,</div>

              {/* Body Paragraphs */}
              <p className="text-justify mb-4">
                This has reference to your (self declaration letter with UDIN:{" "}
                <span className="font-bold">{data?._udin}</span>) regarding the permission for subletting the space to M/S{" "}
                <span className="font-bold">{data?._tenant_name}</span> at {data?._space_description}.
              </p>

              <p className="text-justify mb-4">
                We would like to confirm our ‘No Objection’ for sub-letting the {data?._sublet_area_sqft}
                sq. ft. space to M/S <span className="font-bold">{data?._tenant_name}</span> for carrying out &quot;{data?._activity_type}&quot; 
                activities as declared by M/S <span className="font-bold">{data?._tenant_name}</span> vide their letter dated {data?._tenant_letter_date}. 
                Your Provisional NOC is effective from {data?._noc_start_date} to {data?._noc_end_date}. 
                The NOC would lapse automatically as soon as the said tenancies are expired by influx of time or the same are determined earlier.
              </p>

              <p className="text-justify mb-4">
                You are advised to comply all legal formalities regarding agreement with your tenants and inform NDITA about the existence of the said firm in Sector-V area.
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

              <div className="mt-4 mb-10 text-black">Thanking you,</div>

              {/* Signature Block */}
              <div className="mt-12 space-y-1">
                <div className="font-bold">Authorised Signatory</div>
                <div className="font-bold">For Managing Director, Webel</div>
                <div className="text-[10pt] italic text-gray-700">
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

export default ProvisionalNOCMultiOwner;