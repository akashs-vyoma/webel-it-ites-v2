import React from "react";
import Image from "next/image";
import logo from "@/components/images/webel-logo.png";

interface DocumentItem {
  _name?: string;
  _udin?: string;
}

interface TaxExemptionDeclarationProps {
  data?: {
    _current_date?: string;
    _application_type?: string;
    _application_number?: string;
    _company_name?: string;
    _documents?: DocumentItem[];
    _memo_no?: string;
    _memo_date?: string;
    _memo_udin?: string;
    _rep_name?: string;
    _rep_phone?: string;
    _ca_reg_number?: string;
    _ca_name?: string;
    _ca_phone?: string;
  };
  ref?: any;
}

const TaxExemptionDeclaration: React.FC<TaxExemptionDeclarationProps> = ({ data, ref }) => {
  return (
    <div className="bg-gray-200 min-h-screen flex justify-center py-10 px-4 print:p-0 print:bg-white">
      {/* Main Page Container (A4 Dimensions) */}
      <div ref={ref} className="relative bg-white w-[210mm] min-h-[297mm] shadow-2xl p-[15px] font-serif box-border overflow-hidden print:shadow-none print:w-full">

        {/* Triple Border System (Replaces CSS pseudo-elements) */}
        {/* 1. Outer Solid Border (5px offset) */}
        <div className="absolute inset-[5px] border-2 border-gray-700 pointer-events-none z-10" />
        {/* 2. Outer Double Border (10px offset) */}
        <div className="absolute inset-[10px] border-[4px] border-double border-gray-700 pointer-events-none z-10" />

        {/* 3. Dotted Frame Border */}
        <div className="relative w-full h-full border-2 border-dotted border-gray-800 p-1 flex flex-col box-border">

          {/* Inner Double Border (Pattern Border) */}
          <div className="flex-grow border-[3px] border-double border-gray-800 py-8 px-11 relative z-20">

            {/* Watermark Section */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.07] pointer-events-none z-0">
              <Image
                src={logo}
                alt="Watermark"
                className="w-4/5 h-auto grayscale"
              />
            </div>

            {/* Content Area */}
            <div className="relative z-30 text-[11pt] leading-relaxed text-black">

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

              {/* Meta Data */}
              <div className="font-bold text-[10pt] mb-5">
                Date: {data?._current_date}
              </div>

              {/* Subject */}
              <div className="font-bold text-justify mb-6">
                Subject: Declaration Letter for {data?._application_type}, Application Number: {data?._application_number}
              </div>

              {/* Salutation */}
              <div className="mb-4">Respected Sir,</div>

              {/* Intro Paragraph */}
              <p className="text-justify mb-3">
                I am authorized representative of Company <span className="font-bold">{data?._company_name}</span>,
                hereby submits the following documents (as indicated by UDIN numbers ) for DPR of IT & ITeS - vetting –
              </p>

              {/* Document Table */}
              <table className="w-full mt-4 mb-6 border-collapse">
                <thead>
                  <tr className="border-b border-black">
                    <th className="text-left font-bold pb-2 w-1/2">Document Type</th>
                    <th className="text-left font-bold pb-2 w-1/2">Udin Number</th>
                  </tr>
                </thead>
                <tbody>
                  {data?._documents && data._documents.length > 0 ? (
                    data._documents.map((doc, idx) => (
                      <tr key={idx}>
                        <td className="py-1">{doc?._name}</td>
                        <td className="py-1">{doc?._udin}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={2} className="py-2 text-gray-400 italic">No documents provided</td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Paragraph 1 */}
              <p className="text-justify mb-3">
                On behalf as duly authorised & having competence to do so on behalf of{" "}
                <span className="font-bold">{data?._company_name}</span>, I declare that we are applying for Tax exemption
                certificate as the <span className="font-bold">{data?._company_name}</span> qualifies for the same as per Memo No:{" "}
                <span className="font-bold">{data?._memo_no}</span> dated <span className="font-bold">{data?._memo_date}</span> (UDIN:{" "}
                <span className="font-bold">{data?._memo_udin}</span>) . I shall indemnify and hold the state harmless,
                including all associated costs in case of any miss-representation.
              </p>

              <p className="text-justify mb-3">
                I also understand that any kind of miss-representation will invite legal action as per law.
              </p>

              {/* Signature Block 1 (Representative) */}
              <div className="mt-5 mb-8">
                <span className="block font-bold uppercase">{data?._rep_name}</span>
                <span className="block font-bold">{data?._rep_phone}</span>
                <span className="font-bold italic text-sm">(Signature of authorized representative)</span>
              </div>

              {/* CA Declaration Section */}
              <p className="text-justify mb-3">
                I am Chartered Accountant having <span className="font-bold">registration number {data?._ca_reg_number}</span> have
                gone through the relevant documents of the <span className="font-bold">{data?._company_name}</span> and concur
                that <span className="font-bold">{data?._company_name}</span> qualifies for the tax exemption certificate as
                per Memo No: <span className="font-bold">{data?._memo_no}</span> dated <span className="font-bold">{data?._memo_date}</span> (UDIN:{" "}
                <span className="font-bold">{data?._memo_udin}</span>) .
              </p>

              <p className="text-justify mb-3">
                I also understand that any kind of false representation will invite legal action as per law.
              </p>

              {/* Signature Block 2 (CA) */}
              <div className="mt-5 mb-8">
                <span className="block font-bold uppercase">{data?._ca_name}</span>
                <span className="block font-bold">{data?._ca_phone}</span>
                <span className="font-bold italic text-sm">(Signature of Chartered Accountant)</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxExemptionDeclaration;