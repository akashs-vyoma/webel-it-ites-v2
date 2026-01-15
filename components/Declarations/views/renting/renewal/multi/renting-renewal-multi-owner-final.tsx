import React from "react";
import Image from "next/image";
import logo from "@/components/images/webel-logo.png";

interface Applicant {
  _name?: string;
  _address?: string;
  _tax_id?: string;
}

interface FinalNOCRenewalProps {
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

// Reusable Page Component to handle A4 sizing and nested borders
const NOCPage = ({ children }: { children: React.ReactNode }) => (
  <div className="relative bg-white w-[210mm] min-h-[297mm] shadow-lg p-[15px] font-serif box-border overflow-hidden print:shadow-none print:m-0 break-after-page">
    {/* Standard Frame Borders (Replacing ::before and ::after) */}
    <div className="absolute inset-[5px] border-2 border-gray-600 pointer-events-none z-10" />
    <div className="absolute inset-[10px] border-[4px] border-double border-gray-600 pointer-events-none z-10" />

    {/* Dotted Frame Border */}
    <div className="relative h-full w-full border-2 border-dotted border-gray-800 p-1 flex flex-col box-border">
      {/* Pattern/Double Border Inner Container */}
      <div className="flex-grow border-[3px] border-double border-gray-800 py-10 px-12 relative z-20">
        {/* Watermark Section */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none z-0">
          <Image src={logo} alt="Watermark" className="w-4/5 h-auto grayscale" />
        </div>
        {children}
      </div>
    </div>
  </div>
);

const FinalNOCRenewalMultiOwner: React.FC<FinalNOCRenewalProps> = ({ data }) => {
  return (
    <div className="bg-gray-200 min-h-screen flex flex-col items-center py-10 gap-10 print:bg-white print:py-0 print:gap-0">
      
      {/* PAGE 1 */}
      <NOCPage>
        <div className="relative z-30 text-[11pt] leading-[1.5] text-black">
          {/* Header Logo */}
          <div className="flex justify-center mb-4">
            <Image src={logo} alt="Webel Logo" height={80} className="h-20 w-auto object-contain" priority />
          </div>

          <div className="text-center font-bold text-[12pt] mb-4">
            Final NOC of IT/ITeS Renting (Application Number: {data?._application_number})
          </div>

          <div className="text-center font-bold text-[10pt] mb-5 break-words">
            {data?._ref_number}
          </div>

          <div className="mb-4">
            Date: {data?._current_date}
          </div>

          <div className="font-bold mb-2">Applicants Details:</div>
          <table className="w-full border-collapse border border-black mb-5 text-[10pt]">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-black p-2 w-[40px] text-center">Sl No.</th>
                <th className="border border-black p-2 w-1/4 text-center">Applicants Name</th>
                <th className="border border-black p-2 text-center">Address</th>
                <th className="border border-black p-2 w-[110px] text-center">GSTN/PAN Number</th>
              </tr>
            </thead>
            <tbody>
              {data?._applicants && data._applicants.length > 0 ? (
                data._applicants.map((applicant, idx) => (
                  <tr key={idx}>
                    <td className="border border-black p-2 text-center">{idx + 1}</td>
                    <td className="border border-black p-2 font-bold">{applicant?._name}</td>
                    <td className="border border-black p-2">{applicant?._address}</td>
                    <td className="border border-black p-2 text-center">{applicant?._tax_id}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="border border-black p-2 text-center italic">No applicants found</td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="font-bold underline mb-5 text-justify underline-offset-2">
            Sub: Permission towards sublet of space of {data?._sublet_area_sqft} sq. ft. super
            built up area at {data?._space_description}
          </div>

          <div className="mb-4">Sir,</div>

          <p className="text-justify mb-4">
            This has reference to your (approval letter with UDIN: <span className="font-bold">{data?._udin}</span>) regarding the permission for subletting the space to M/S <span className="font-bold">{data?._tenant_name}</span> at {data?._space_description}.
          </p>

          <p className="text-justify mb-4">
            We would like to confirm our ‘No Objection’ for sub-letting the {data?._sublet_area_sqft} sq. ft. space to M/S <span className="font-bold">{data?._tenant_name}</span> for carrying out &quot;{data?._activity_type}&quot; activities as declared by M/S <span className="font-bold">{data?._tenant_name}</span> vide their letter dated {data?._tenant_letter_date}. Your Final NOC is effective from {data?._noc_start_date} to {data?._noc_end_date}. The NOC would lapse automatically as soon as the said tenancies are expired by influx of time or the same are determined earlier.
          </p>

          <p className="text-justify mb-4">
            You are advised to comply all legal formalities regarding agreement with your tenants and
            inform NDITA about the existence of the said firm in Sector-V area.
          </p>
        </div>
      </NOCPage>

      {/* PAGE 2 */}
      <NOCPage>
        <div className="relative z-30 text-[11pt] leading-[1.5] text-black">
          <div className="flex justify-center mb-4">
            <Image src={logo} alt="Webel Logo" height={80} className="h-20 w-auto object-contain" />
          </div>

          <p className="text-justify mb-4">
            You will have required to pay permission fees @ Rs.{data?._permission_fee_rate}/- per
            sq. ft. (permission fees is subject to change from time to time) of the super built up
            area along with applicable goods & services taxes to W.B.E.I.D.C. Ltd by the 7th day of
            every calendar month. Such fees shall be paid in advance in every month, irrespective of
            your receiving rent from the tenant and the non-payment of Permission fees or any kind
            of non-compliance may cause automatic cancellation/withdrawal of the NOC granted.
          </p>

          <p className="text-justify mb-4">
            Moreover, you are requested to inform us about the vacancy and fill up of premises within
            the month of its happening otherwise permission fees will be charged upto date as mentioned
            in the agreement without any reversal thereon.
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
      </NOCPage>

    </div>
  );
};

export default FinalNOCRenewalMultiOwner;