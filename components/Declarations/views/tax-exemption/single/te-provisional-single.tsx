import React from "react";
import Image from "next/image";
import logo from "@/components/images/webel-logo.png";

interface ProvisionalNOCProps {
  data?: {
    _application_number?: string;
    _self_declaration_udin?: string;
    _recipient_designation?: string;
    _recipient_office?: string;
    _recipient_township?: string;
    _recipient_address?: string;
    _ref_notification_no?: string;
    _ref_notification_date?: string;
    _it_notification_no?: string;
    _it_notification_date?: string;
    _it_notification_udin?: string;
    _company_name?: string;
    _company_address?: string;
    _area_sqft?: string;
    _operation_description?: string;
    _current_date?: string;
  };
}

const ProvisionalNOCPropertyTax: React.FC<ProvisionalNOCProps> = ({ data }) => {
  // Reusable Page Frame to maintain consistent borders and A4 size
  const PageLayout = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`relative bg-white w-[210mm] min-h-[297mm] shadow-2xl p-[15px] box-border overflow-hidden font-serif print:shadow-none print:m-0 break-after-page ${className}`}>
      {/* Outer Border (5px offset) - Equivalent to ::before */}
      <div className="absolute inset-[5px] border-2 border-gray-700 pointer-events-none z-10" />
      
      {/* Double Border (10px offset) - Equivalent to ::after */}
      <div className="absolute inset-[10px] border-[4px] border-double border-gray-700 pointer-events-none z-10" />

      {/* Dotted Frame Border */}
      <div className="relative w-full h-full border-2 border-dotted border-gray-800 p-1 flex flex-col box-border">
        {/* Inner Double Border (Pattern Border) */}
        <div className="flex-grow border-[3px] border-double border-gray-800 py-10 px-12 relative z-20">
          {/* Watermark Section */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none z-0">
            <Image 
              src={logo} 
              alt="Watermark" 
              className="w-4/5 h-auto grayscale" 
            />
          </div>
          {children}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col items-center py-10 gap-10 print:p-0 print:bg-white print:gap-0">
      
      {/* PAGE 1: NOC LETTER */}
      <PageLayout>
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

          {/* Document Title */}
          <div className="text-center font-bold text-[12pt] mb-6 leading-tight">
            Provisional NOC for Exemption of Property Tax<br />
            (Application Number: {data?._application_number})<br />
            (Self-Declaration Letter UDIN: {data?._self_declaration_udin})
          </div>

          {/* Recipient Block */}
          <div className="mb-6">
            To,<br />
            {data?._recipient_designation}<br />
            {data?._recipient_office}<br />
            {data?._recipient_township}<br />
            {data?._recipient_address}
          </div>

          {/* Subject */}
          <div className="mb-6 font-bold text-center underline underline-offset-4 decoration-1">
            Sub: Exemption of Property Tax u/s 102B of the West Bengal Municipal Act, 1993
          </div>

          <div className="mb-4">Dear Sir,</div>

          <p className="text-justify mb-4">
            Reference notification no. <span className="font-bold">{data?._ref_notification_no}</span> dated{" "}
            <span className="font-bold">{data?._ref_notification_date}</span> of Department of IT&E, delegating power to MD Webel for issuance of certificate of exemption of property tax u/s 102B of the West Bengal Municipal Act, 1993.
          </p>

          <p className="text-justify mb-4">
            The following company is entitled for exemption of property tax under the provision of Section 102B of the West Bengal Municipal Act, 1993 as the said space is being used for <span className="font-bold">IT / ITES activities</span> (as notified by IT&E dept. vide notification <span className="font-bold">{data?._it_notification_no}</span> dated <span className="font-bold">{data?._it_notification_date}</span> - UDIN: <span className="font-bold">{data?._it_notification_udin}</span>), ascertained on the basis of information given by the company on self certification basis :-
          </p>

          {/* Table Section */}
          <table className="w-full border-collapse border border-black my-6">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-black p-2 text-center w-12 font-bold">Sl No.</th>
                <th className="border border-black p-2 text-left font-bold">Name of the Company</th>
                <th className="border border-black p-2 text-left font-bold">Address</th>
                <th className="border border-black p-2 text-center w-24 font-bold">Area</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black p-2 text-center">1.</td>
                <td className="border border-black p-2 font-bold">{data?._company_name}</td>
                <td className="border border-black p-2 text-sm">{data?._company_address}</td>
                <td className="border border-black p-2 text-center">{data?._area_sqft}</td>
              </tr>
            </tbody>
          </table>

          <p className="text-justify mb-8">You are requested to take necessary action as per provision of the said Act.</p>

          {/* Signature Block */}
          <div className="mt-10">
            Thanking you,<br />
            Yours faithfully,<br />
            <div className="mt-4">
              <span className="block font-bold">Authorised Signatory</span>
              <span className="block font-bold">For Managing Director, Webel</span>
              <div className="mt-1 text-[10pt] italic text-gray-700">
                (This document is digitally signed and does not require physical signature)
              </div>
            </div>
          </div>
        </div>
      </PageLayout>

      {/* PAGE 2: DETAILS TABLE */}
      <PageLayout>
        <div className="relative z-30 text-[11pt] leading-[1.5] text-black">
          <div className="flex justify-center mb-6">
            <Image 
              src={logo} 
              alt="Webel Logo" 
              height={80} 
              className="h-20 w-auto object-contain" 
            />
          </div>

          <div className="text-center font-bold text-[12pt] mb-8 underline underline-offset-4 decoration-2">
            DETAILS
          </div>

          {/* Key-Value Details Table */}
          <table className="w-full border-collapse border border-black mb-8">
            <tbody>
              {[
                { label: "Name of the Applicant", value: data?._company_name, isBold: true },
                { label: "Address of Premises/Building/Plot of Land", value: data?._company_address },
                { label: "The manner of acquisition of the property, viz. Land/Built-up space by the applicant (verified)", value: data?._area_sqft },
                { label: "Total space used by the applicant/tenant", value: data?._area_sqft },
                { label: "Break up of built up space vis-à-vis number of occupant company", value: data?._area_sqft },
                { label: "Description of IT / ITES operation of the occupant", value: data?._operation_description },
                { label: "Total space used for IT/ITeS activities", value: data?._area_sqft },
              ].map((row, idx) => (
                <tr key={idx}>
                  <td className="border border-black p-3 text-center w-10">{idx + 1}.</td>
                  <td className="border border-black p-3 w-[45%] text-left">{row.label}</td>
                  <td className="border border-black p-3 text-center w-5">:</td>
                  <td className={`border border-black p-3 ${row.isBold ? "font-bold" : ""}`}>
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mb-10 font-medium">
            Date: {data?._current_date}
          </div>

          <p className="text-justify mt-10">
            As the space is used for the aforesaid purpose, we are recommending the matter for obtaining 
            required certificate for Exemption of Municipal Tax.
          </p>
        </div>
      </PageLayout>

    </div>
  );
};

export default ProvisionalNOCPropertyTax;