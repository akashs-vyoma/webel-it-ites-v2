import React from 'react';
import { CheckCircle2, FileText, IndianRupee } from 'lucide-react';
import Link from 'next/link';

interface ServiceItem {
  id: number;
  title: string;
  docs: string[];
  note?: string;
  fees: string;
  image: string;
}

const servicesData: ServiceItem[] = [
  {
    id: 1,
    title: "Webel Service - DPR of IT & I TeS - vetting",
    docs: [
      "Project Report",
      "MOA",
      "IT Return",
      "Balance Sheet"
    ],
    fees: "60,000 + GST *",
    image: "/Checklist.jpg"
  },
  {
    id: 2,
    title: "NOC for Renting Out Leased property",
    docs: [
      "Mother Deed with Webel",
      "MOA",
      "Agreement with Tenant",
      "Trade License of Tenant",
      "Balance Sheet (if necessary)",
      "IT Return (if necessary)"
    ],
    note: "You have to provide Tenant Name, Tenant GSTN No/PAN No & activity in the rented area(IT&ITes Activity or Commercial Activity), area in sq. ft. at the time of application *",
    fees: "3/sq.ft. + GST till the expiry of the Rental Agreement/Surrender of the space by the tenant",
    image: "/real-estate.jpg"
  },
  {
    id: 3,
    title: "Certificate for Tax Exemption",
    docs: [
      "Trade License",
      "Letter from NDITA",
      "Copy Agreement",
      "MOA",
      "Balance Sheet"
    ],
    note: "You have to provide area in sq. ft. at the time of application *",
    fees: "5 per sq. ft. + GST *",
    image: "/tax.png"
  },
  {
    id: 4,
    title: "Renewal of NOC Renting out Leased Property",
    docs: [
      "Original Deed",
      "Renewal Deed",
      "Old NOC",
      "Last Invoice Issued By Webel",
      "Mother Deed with Webel",
      "MOA",
      "Agreement with Tenant",
      "Trade License of Tenant"
    ],
    note: "You have to provide Tenant Name, Tenant GSTN No/PAN No & activity in the rented area *",
    fees: "3/sq.ft. + GST till the expiry of the Rental",
    image: "/2892186.jpg"
  }
];

const ServicesList: React.FC = () => {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4 space-y-24">
        {servicesData.map((service, index) => (
          <div
            key={service.id}
            className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}
          >
            {/* Text Content */}
            <div className="flex-1 space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-blue-800 border-l-4 border-blue-500 pl-4">
                {service.title}
              </h3>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Required Documents
                </h4>
                <ul className="space-y-3">
                  {service.docs.map((doc, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-700">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {service.note && (
                <div className="bg-amber-50 text-amber-900 p-4 rounded-lg text-sm border-l-4 border-amber-400">
                  <strong>Note:</strong> {service.note}
                </div>
              )}

              <div className="flex items-center gap-2 text-lg font-semibold text-slate-700 bg-slate-200/50 inline-block px-4 py-2 rounded-lg">
                <IndianRupee className="w-5 h-5 text-green-500" />
                <span>Fees: <span className="text-blue-700">Rs. {service.fees}</span></span>
              </div>

              <div className="pt-2">
                <Link href="company-sign-up" className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition shadow-sm hover:shadow-md">
                  Apply Now
                </Link>
              </div>
            </div>

            {/* Illustration/Image Content */}
            <div className="flex-1 w-full flex justify-center">
              <div className="relative w-full max-w-md">
                {/* Decorative blob background */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full opacity-20 filter blur-3xl -z-10
                  ${index % 2 === 0 ? 'bg-blue-300' : 'bg-indigo-300'}`}>
                </div>

                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-auto rounded-2xl shadow-xl border-4 border-white transform hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesList;