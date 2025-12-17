"use client";
import React, { useState } from 'react';
import {
    Printer,
    FileText,
    FileSpreadsheet,
    ArrowUpDown,
    History,
    Search,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';

// --- Types ---
interface DocumentEntry {
    docType: string;
    udin: string;
    amount: number;
}

interface ApplicationGroup {
    id: number;
    slNo: number;
    applicationNo: string;
    documents: DocumentEntry[];
}

// --- Mock Data ---
const mockData: ApplicationGroup[] = [
    {
        id: 1,
        slNo: 1,
        applicationNo: "AP/DPRITVETM/127/20231212061205",
        documents: [
            { docType: "Project Report", udin: "23-S-SA001205-P-1691748214893", amount: 100 },
            { docType: "IT Return", udin: "23-S-SA001205-P-1691748436885", amount: 100 },
            { docType: "Balance Sheet", udin: "23-S-SA001205-P-1691748511519", amount: 100 },
            { docType: "Project Report", udin: "23-S-SA001205-P-1702363600404", amount: 100 },
            { docType: "MultiParty Declaration Letter", udin: "23-M-SA001205-P-1702369631629", amount: 200 },
            { docType: "Declaration Letter", udin: "23-M-SA001205-P-1702481041367", amount: 200 },
        ]
    },
    {
        id: 2,
        slNo: 2,
        applicationNo: "AP/DPRITVET/144/20240102060147",
        documents: [
            { docType: "Project Report", udin: "24-C-CA001176-P-1704179071921", amount: 1 },
            { docType: "Declaration Letter", udin: "24-P-CA001176-P-1704180131876", amount: 1 },
            { docType: "Project Report", udin: "24-C-CA001176-P-1704286132845", amount: 1 },
        ]
    }
];

const UdinPaymentHistory: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");

    // Calculate total entries for footer
    const totalEntries = mockData.reduce((acc, curr) => acc + curr.documents.length, 0);

    // Print Handler
    const handlePrint = () => window.print();

    return (
        <div className="min-h-screen w-full p-4 md:p-8 font-sans">
            <div className="max-w-[1400px] mx-auto bg-white shadow-xl rounded-xl overflow-hidden border border-slate-100">

               <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-5">

    {/* SHIMMER LAYER */}
    <div className="absolute inset-0 gradient-shimmer pointer-events-none"></div>
                    <h1 className="text-white font-semibold text-lg flex items-center gap-2 tracking-wide">
                        <History size={20} className="text-cyan-100" />
                        UDIN Doc Payment History
                    </h1>
                </div>

                {/* --- Controls Bar --- */}
                <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-4 bg-white">

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                        <button className="flex items-center gap-1.5 border border-slate-200 bg-white px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-green-50 hover:text-green-600 hover:border-green-200 transition-all shadow-sm">
                            <FileSpreadsheet size={16} /> Excel
                        </button>
                        <button className="flex items-center gap-1.5 border border-slate-200 bg-white px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm">
                            <FileText size={16} /> PDF
                        </button>
                        <button
                            onClick={handlePrint}
                            className="flex items-center gap-1.5 border border-slate-200 bg-white px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all shadow-sm"
                        >
                            <Printer size={16} /> Print
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="relative w-full md:w-auto group">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500 transition-colors">
                            <Search size={16} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full md:w-64 border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 bg-slate-50 text-slate-700 transition-all"
                        />
                    </div>
                </div>

                {/* --- Table --- */}
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-sm text-left border-collapse">
                        <thead className="bg-slate-50 border-y border-slate-200">
                            <tr>
                                <th className="p-4 border-r border-slate-200 font-bold text-xs text-slate-500 uppercase tracking-wider w-16 cursor-pointer hover:bg-slate-100 transition-colors">
                                    <div className="flex justify-between items-center">
                                        Sl No. <ArrowUpDown size={12} className="opacity-50" />
                                    </div>
                                </th>
                                <th className="p-4 border-r border-slate-200 font-bold text-xs text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors">
                                    <div className="flex justify-between items-center">
                                        Application# <ArrowUpDown size={12} className="opacity-50" />
                                    </div>
                                </th>
                                <th className="p-4 border-r border-slate-200 font-bold text-xs text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors">
                                    <div className="flex justify-between items-center">
                                        Doc Type <ArrowUpDown size={12} className="opacity-50" />
                                    </div>
                                </th>
                                <th className="p-4 border-r border-slate-200 font-bold text-xs text-slate-500 uppercase tracking-wider text-center cursor-pointer hover:bg-slate-100 transition-colors">
                                    <div className="flex justify-center items-center gap-1">
                                        UDIN <ArrowUpDown size={12} className="opacity-50" />
                                    </div>
                                </th>
                                <th className="p-4 font-bold text-xs text-slate-500 uppercase tracking-wider text-center cursor-pointer hover:bg-slate-100 transition-colors">
                                    <div className="flex justify-end items-center gap-1">
                                        Amount (₹) <ArrowUpDown size={12} className="opacity-50" />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {mockData.map((group) => (
                                <React.Fragment key={group.id}>
                                    {group.documents.map((doc, docIndex) => (
                                        <tr key={`${group.id}-${docIndex}`} className="border-b border-slate-100 hover:bg-blue-50/50 transition-colors">

                                            {/* 1. Sl No (RowSpan logic) */}
                                            {docIndex === 0 && (
                                                <td
                                                    rowSpan={group.documents.length}
                                                    className="p-4 text-xs font-bold text-slate-500 align-top border-r border-slate-100 bg-white"
                                                >
                                                    {group.slNo}
                                                </td>
                                            )}

                                            {/* 2. Application No (RowSpan logic) */}
                                            {docIndex === 0 && (
                                                <td
                                                    rowSpan={group.documents.length}
                                                    className="p-4 text-xs align-top border-r border-slate-100 bg-white"
                                                >
                                                    {/* Green Badge for Application No */}
                                                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold px-3 py-1 rounded-md text-[11px] inline-block shadow-sm">
                                                        {group.applicationNo}
                                                    </span>
                                                </td>
                                            )}

                                            {/* 3. Doc Type */}
                                            <td className="p-4 text-xs font-semibold text-slate-700 border-r border-slate-100">
                                                {doc.docType}
                                            </td>

                                            {/* 4. UDIN */}
                                            <td className="p-4 text-center border-r border-slate-100">
                                                {/* Yellow Badge for UDIN */}
                                                <span className="bg-amber-50 text-amber-700 border border-amber-200 font-bold px-3 py-1 rounded-md text-[11px] inline-block shadow-sm">
                                                    {doc.udin}
                                                </span>
                                            </td>

                                            {/* 5. Amount */}
                                            <td className="p-4 text-xs font-bold text-slate-800 text-right pr-8">
                                                {doc.amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                                            </td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* --- Footer & Pagination --- */}
                <div className="p-6 flex flex-col md:flex-row justify-between items-center bg-white border-t border-slate-100 gap-4">

                    <div className="text-xs font-medium text-slate-500">
                        Showing <span className="font-bold text-slate-800">1</span> to <span className="font-bold text-slate-800">{totalEntries}</span> of <span className="font-bold text-slate-800">{totalEntries}</span> entries
                    </div>

                    <div className="flex items-center gap-1.5">
                        <button
                            className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium hover:bg-slate-50 bg-white text-slate-600 transition-colors flex items-center"
                        >
                            <ChevronLeft size={14} className="mr-1" /> Previous
                        </button>

                        <button className="w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/30">
                            1
                        </button>

                        <button
                            className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium hover:bg-slate-50 bg-white text-slate-600 transition-colors flex items-center"
                        >
                            Next <ChevronRight size={14} className="ml-1" />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default UdinPaymentHistory;