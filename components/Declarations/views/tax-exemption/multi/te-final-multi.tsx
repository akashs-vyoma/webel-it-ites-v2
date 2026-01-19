import React from "react";
import Image from "next/image";
import logo from "@/components/images/webel-logo.png";

interface Applicant {
  _name?: string;
  _address?: string;
  _tax_id?: string;
}

interface NOCExemptionProps {
  data?: {
    _application_number?: string;
    _approval_udin?: string;
    _recipient_designation?: string;
    _recipient_office?: string;
    _recipient_township?: string;
    _recipient_address?: string;
    _ref_notification_no?: string;
    _ref_notification_date?: string;
    _it_notification_no?: string;
    _it_notification_date?: string;
    _it_notification_udin?: string;
    _area_sqft?: string;
    _applicants?: Applicant[];
    _premises_location?: string;
    _it_operation_desc?: string;
    _details_date?: string;
  };
  ref?: any;
}

const FinalNOCExemption: React.FC<NOCExemptionProps> = ({ data, ref }) => {
  // Reusable Border Frame Component to keep code clean
  const PageFrame = ({ children }: { children: React.ReactNode }) => (
    <div ref={ref} className="relative bg-white w-[210mm] min-h-[297mm] shadow-2xl p-[15px] font-serif box-border overflow-hidden print:shadow-none print:w-full print:my-0 my-5">
      {/* Frame lines standard from reference */}
      <div className="absolute inset-[5px] border-2 border-gray-600 pointer-events-none z-10" />
      <div className="absolute inset-[10px] border-[4px] border-double border-gray-600 pointer-events-none z-10" />

      {/* Dotted Frame Border */}
      <div className="relative w-full h-full border-2 border-dotted border-gray-800 p-1 flex flex-col box-border">
        {/* Inner Double Pattern Border */}
        <div className="flex-grow border-[3px] border-double border-gray-800 py-10 px-12 relative z-20">
          {/* Standard Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none z-0">
            <Image src={logo} alt="Watermark" className="w-4/5 h-auto grayscale" />
          </div>
          {children}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col items-center py-10 px-4 print:p-0 print:bg-white">

      {/* PAGE 1: NOC LETTER */}
      <PageFrame>
        <div className="relative z-30 text-[11pt] leading-[1.5] text-black">
          {/* Header Logo */}
          <div className="flex justify-center mb-5">
            <Image src={logo} alt="Webel Logo" height={80} className="h-20 w-auto object-contain" priority />
          </div>

          <div className="text-center font-bold text-[12pt] mb-5 leading-tight">
            Final NOC for Exemption of Property Tax<br />
            (Application Number: {data?._application_number})<br />
            (Approval Letter UDIN: {data?._approval_udin})
          </div>

          <div className="mb-5 leading-snug">
            To,<br />
            {data?._recipient_designation}<br />
            {data?._recipient_office}<br />
            {data?._recipient_township}<br />
            {data?._recipient_address}
          </div>

          <div className="mb-5 font-bold text-center underline underline-offset-2 decoration-1">
            Sub: Exemption of Property Tax u/s 102B of the West Bengal Municipal Act, 1993
          </div>

          <div className="mb-4">Dear Sir,</div>

          <p className="text-justify mb-4">
            Reference notification no. <span className="font-bold">{data?._ref_notification_no}</span> dated{" "}
            <span className="font-bold">{data?._ref_notification_date}</span> of Department of IT&E, delegating power to MD Webel
            for issuance of certificate of exemption of property tax u/s 102B of the West Bengal Municipal Act, 1993.
          </p>

          <p className="text-justify mb-4">
            The following company is entitled for exemption of property tax under the provision of Section 102B of the West Bengal Municipal Act, 1993 as the said space is being used for{" "}
            <span className="font-bold">IT / ITES activities</span> (as notified by IT&E dept. vide notification{" "}
            <span className="font-bold">{data?._it_notification_no}</span> dated <span className="font-bold">{data?._it_notification_date}</span> - UDIN:{" "}
            <span className="font-bold">{data?._it_notification_udin}</span>), ascertained on the basis of information given by the company on self certification basis :-
          </p>

          <div className="font-bold mb-2">Applicants Details:</div>
          <table className="w-full border-collapse border border-black mb-5 text-[10pt]">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-black p-2 text-center w-12">Sl No.</th>
                <th className="border border-black p-2 text-left">Applicants Name</th>
                <th className="border border-black p-2 text-left">Address</th>
                <th className="border border-black p-2 text-center">GSTN/PAN Number</th>
                <th className="border border-black p-2 text-center">Area</th>
              </tr>
            </thead>
            <tbody>
              {data?._applicants?.map((applicant, index) => (
                <tr key={index}>
                  <td className="border border-black p-2 text-center">{index + 1}</td>
                  <td className="border border-black p-2 font-bold">{applicant?._name}</td>
                  <td className="border border-black p-2 text-sm">{applicant?._address}</td>
                  <td className="border border-black p-2 text-center">{applicant?._tax_id}</td>
                  {index === 0 && (
                    <td
                      className="border border-black p-2 text-center font-bold align-middle bg-white"
                      rowSpan={data?._applicants?.length}
                    >
                      {data?._area_sqft}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          <p className="text-justify mb-8">You are requested to take necessary action as per provision of the said Act.</p>

          <div className="mt-8">
            Thanking you,<br />
            Yours faithfully,<br />
            <div className="mt-4">
              <span className="block font-bold">Authorised Signatory</span>
              <span className="block font-bold">For Managing Director, Webel</span>
              <div className="mt-1 text-[10pt] italic text-gray-600">
                (This document is digitally signed and does not require physical signature)
              </div>
            </div>
          </div>
        </div>
      </PageFrame>

      {/* PAGE 2: DETAILS SECTION */}
      <PageFrame>
        <div className="relative z-30 text-[11pt] leading-[1.5] text-black">
          <div className="flex justify-center mb-5">
            <Image src={logo} alt="Webel Logo" height={80} className="h-20 w-auto object-contain" />
          </div>

          <div className="text-center font-bold text-[12pt] mb-8 underline underline-offset-4 decoration-2">
            DETAILS
          </div>

          <table className="w-full border-collapse border border-black mb-8">
            <tbody>
              {[
                { label: "Name of the Applicant", value: data?._applicants?.[0]?._name, bold: true },
                { label: "Address of Premises/Building/Plot of Land", value: data?._premises_location },
                { label: "The manner of acquisition of the property, viz. Land/Built-up space by the applicant (verified)", value: data?._area_sqft },
                { label: "Total space used by the applicant/tenant", value: data?._area_sqft },
                { label: "Break up of built up space vis-à-vis number of occupant company", value: data?._area_sqft },
                { label: "Description of IT / ITES operation of the occupant", value: data?._it_operation_desc },
                { label: "Total space used for IT/ITeS activities", value: data?._area_sqft },
              ].map((row, idx) => (
                <tr key={idx}>
                  <td className="border border-black p-3 text-center w-10">{idx + 1}.</td>
                  <td className="border border-black p-3 w-[45%]">{row.label}</td>
                  <td className="border border-black p-3 text-center w-5">:</td>
                  <td className={`border border-black p-3 ${row.bold ? 'font-bold' : ''}`}>
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mb-8">
            Date: {data?._details_date}
          </div>

          <p className="text-justify mt-8">
            As the space is used for the aforesaid purpose, we are recommending the matter for obtaining
            required certificate for Exemption of Municipal Tax.
          </p>
        </div>
      </PageFrame>

    </div>
  );
};

export default FinalNOCExemption;