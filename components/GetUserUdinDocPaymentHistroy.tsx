"use client";
import React, { useState } from 'react';
import {
    Printer,
    FileText,
    FileSpreadsheet,
    ArrowUpDown
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

// --- Mock Data (Matching Screenshot) ---
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
        <div className="min-h-screen w-full p-4 font-sans text-sm">
            <div className="max-w-[1400px] mx-auto bg-white shadow-sm border border-gray-200">

                {/* --- Header --- */}
                <div className="bg-[#484595] px-4 py-3">
                    <h1 className="text-white font-bold text-lg">UDIN Doc Payment History</h1>
                </div>

                {/* --- Controls Bar --- */}
                <div className="p-4 flex flex-col md:flex-row justify-between items-center gap-4">

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                        <button className="flex items-center justify-center border border-gray-400 px-3 py-1 rounded-sm text-xs font-semibold hover:bg-gray-100 transition-colors bg-gray-50 text-gray-700 min-w-[60px]">
                            Excel
                        </button>
                        <button className="flex items-center justify-center border border-gray-400 px-3 py-1 rounded-sm text-xs font-semibold hover:bg-gray-100 transition-colors bg-gray-50 text-gray-700 min-w-[60px]">
                            PDF
                        </button>
                        <button
                            onClick={handlePrint}
                            className="flex items-center justify-center border border-gray-400 px-3 py-1 rounded-sm text-xs font-semibold hover:bg-gray-100 transition-colors bg-gray-50 text-gray-700 min-w-[60px]"
                        >
                            Print
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <label className="text-xs font-bold text-gray-700">Search:</label>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border border-gray-300 rounded-sm px-2 py-1 text-sm outline-none focus:border-[#484595] w-full md:w-64"
                        />
                    </div>
                </div>

                {/* --- Table --- */}
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-sm text-left border-collapse">
                        <thead className="bg-[#484595] text-white">
                            <tr>
                                <th className="p-3 border-r border-[#5c58a8] font-bold text-xs w-16 cursor-pointer">
                                    <div className="flex justify-between items-center">
                                        Sl No. <ArrowUpDown size={12} className="opacity-70" />
                                    </div>
                                </th>
                                <th className="p-3 border-r border-[#5c58a8] font-bold text-xs cursor-pointer">
                                    <div className="flex justify-between items-center">
                                        Application# <ArrowUpDown size={12} className="opacity-70" />
                                    </div>
                                </th>
                                <th className="p-3 border-r border-[#5c58a8] font-bold text-xs cursor-pointer">
                                    <div className="flex justify-between items-center">
                                        Doc Type <ArrowUpDown size={12} className="opacity-70" />
                                    </div>
                                </th>
                                <th className="p-3 border-r border-[#5c58a8] font-bold text-xs cursor-pointer text-center">
                                    <div className="flex justify-between items-center">
                                        UDIN <ArrowUpDown size={12} className="opacity-70" />
                                    </div>
                                </th>
                                <th className="p-3 font-bold text-xs text-center cursor-pointer">
                                    <div className="flex justify-between items-center">
                                        UDIN Amount (₹) <ArrowUpDown size={12} className="opacity-70" />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {mockData.map((group) => (
                                <React.Fragment key={group.id}>
                                    {group.documents.map((doc, docIndex) => (
                                        <tr key={`${group.id}-${docIndex}`} className="border-b border-gray-50 hover:bg-gray-50">

                                            {/* 1. Sl No (RowSpan logic) */}
                                            {docIndex === 0 && (
                                                <td
                                                    rowSpan={group.documents.length}
                                                    className="p-3 text-xs font-bold text-gray-800 align-top border-r border-gray-100"
                                                >
                                                    {group.slNo}
                                                </td>
                                            )}

                                            {/* 2. Application No (RowSpan logic) */}
                                            {docIndex === 0 && (
                                                <td
                                                    rowSpan={group.documents.length}
                                                    className="p-3 text-xs align-top border-r border-gray-100"
                                                >
                                                    <span className="bg-[#5CB85C] text-white font-bold px-3 py-1 rounded-full text-[11px] inline-block">
                                                        {group.applicationNo}
                                                    </span>
                                                </td>
                                            )}

                                            {/* 3. Doc Type */}
                                            <td className="p-3 text-xs font-bold text-gray-800 border-r border-gray-100">
                                                {doc.docType}
                                            </td>

                                            {/* 4. UDIN */}
                                            <td className="p-3 text-center border-r border-gray-100">
                                                <span className="bg-[#FBC02D] text-black font-bold px-3 py-1 rounded-full text-[11px] inline-block">
                                                    {doc.udin}
                                                </span>
                                            </td>

                                            {/* 5. Amount */}
                                            <td className="p-3 text-xs font-bold text-gray-800 text-center">
                                                {doc.amount}
                                            </td>
                                        </tr>
                                    ))}
                                    {/* Spacer Row for visual separation between groups if needed, though border handles it */}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* --- Footer & Pagination --- */}
                <div className="p-4 flex flex-col md:flex-row justify-between items-center gap-4 mt-4">

                    <div className="text-xs text-gray-600 font-medium">
                        Showing 1 to {totalEntries} of {totalEntries} entries
                    </div>

                    <div className="flex items-center gap-1">
                        <button
                            className="px-3 py-1 border border-gray-300 rounded-l-md text-xs font-bold hover:bg-gray-100 bg-white text-gray-800"
                        >
                            Previous
                        </button>

                        <button className="w-8 py-1 border border-[#484595] text-xs font-medium bg-[#484595] text-white">
                            1
                        </button>

                        <button
                            className="px-3 py-1 border border-gray-300 rounded-r-md text-xs font-bold hover:bg-gray-100 bg-white text-gray-800"
                        >
                            Next
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default UdinPaymentHistory;