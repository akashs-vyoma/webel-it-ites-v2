"use client";
import React, { useState } from 'react';
import {
    Printer,
    FileText,
    FileSpreadsheet,
    CreditCard,
    ArrowUpDown,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';

// --- Data Type Definition ---
interface UdinData {
    id: number;
    udinNo: string;
    docType: string;
    amount: number;
}

// --- Mock Data (Matching Screenshot) ---
const initialData: UdinData[] = [
    { id: 1, udinNo: "24-C-CA001176-P-1704286885881", docType: "Trade License", amount: 1 },
    { id: 2, udinNo: "24-C-CA001176-P-1712569149067", docType: "Original Deed", amount: 100 },
    { id: 3, udinNo: "24-P-CA001176-P-1712569262390", docType: "Declaration Letter", amount: 200 },
    { id: 4, udinNo: "24-P-CA001176-P-1712573048504", docType: "Declaration Letter", amount: 200 },
    { id: 5, udinNo: "25-P-CA001176-P-1749709085589", docType: "Declaration Letter", amount: 1000 },
    { id: 6, udinNo: "25-P-CA001176-P-1750222944797", docType: "MultiParty Declaration Letter", amount: 1000 },
    { id: 7, udinNo: "25-C-CA001176-P-1750237269917", docType: "IT Return", amount: 500 },
    { id: 8, udinNo: "25-C-CA001176-P-1750237488325", docType: "MOA (Memorandum of Association)", amount: 500 },
    { id: 9, udinNo: "25-C-CA001176-P-1750237580754", docType: "Project Report", amount: 500 },
    { id: 10, udinNo: "25-P-CA001176-P-1750237797549", docType: "Declaration Letter", amount: 1000 },
    // Extra data to demonstrate pagination
    { id: 11, udinNo: "25-P-CA001176-P-1750237799999", docType: "Audit Report", amount: 1000 },
    { id: 12, udinNo: "25-P-CA001176-P-1750237788888", docType: "Turnover Certificate", amount: 500 },
    { id: 13, udinNo: "25-P-CA001176-P-1750237777777", docType: "Net Worth Certificate", amount: 500 },
    { id: 14, udinNo: "25-P-CA001176-P-1750237766666", docType: "Visa Application", amount: 1000 },
];

const PendingUdinDetails: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    // --- Filtering Logic ---
    const filteredData = initialData.filter((item) =>
        item.udinNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.docType.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // --- Pagination Logic ---
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    // --- Handlers ---
    const handlePrint = () => {
        window.print();
    };

    const handleDownloadExcel = () => {
        // Simple CSV export logic
        const headers = ["Sl No.", "UDIN No.", "Doc Type", "Pending UDIN Amount (Rs)"];
        const csvContent = [
            headers.join(","),
            ...filteredData.map(row => `${row.id},${row.udinNo},${row.docType},${row.amount}`)
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "udin_details.csv";
        link.click();
    };

    const handleTotalAmount = () => {
        return filteredData.reduce((acc, curr) => acc + curr.amount, 0);
    };

    return (
        <div className="min-h-screen w-full  p-4 font-sans">
            <div className="max-w-[1400px] mx-auto bg-white shadow-sm border border-gray-200">

                {/* --- Header --- */}
                <div className="bg-[#484595] px-4 py-3">
                    <h1 className="text-white font-bold text-lg">Pending UDIN Amount Details</h1>
                </div>

                {/* --- Controls Bar --- */}
                <div className="p-4 flex flex-col md:flex-row justify-between items-center gap-4">

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                        <button
                            onClick={handleDownloadExcel}
                            className="flex items-center gap-1 border border-gray-400 px-3 py-1 rounded-sm text-xs font-semibold hover:bg-gray-100 transition-colors"
                        >
                            <FileSpreadsheet size={14} /> Excel
                        </button>
                        <button
                            onClick={handlePrint} // Browsers can "Save as PDF" via Print dialog
                            className="flex items-center gap-1 border border-gray-400 px-3 py-1 rounded-sm text-xs font-semibold hover:bg-gray-100 transition-colors"
                        >
                            <FileText size={14} /> PDF
                        </button>
                        <button
                            onClick={handlePrint}
                            className="flex items-center gap-1 border border-gray-400 px-3 py-1 rounded-sm text-xs font-semibold hover:bg-gray-100 transition-colors"
                        >
                            <Printer size={14} /> Print
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <label className="text-xs font-bold text-gray-700">Search:</label>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1); // Reset to page 1 on search
                            }}
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
                                        UDIN No. <ArrowUpDown size={12} className="opacity-70" />
                                    </div>
                                </th>
                                <th className="p-3 border-r border-[#5c58a8] font-bold text-xs cursor-pointer">
                                    <div className="flex justify-between items-center">
                                        Doc Type <ArrowUpDown size={12} className="opacity-70" />
                                    </div>
                                </th>
                                <th className="p-3 font-bold text-xs text-right cursor-pointer">
                                    <div className="flex justify-end items-center gap-2">
                                        Pending UDIN Amount (₹) <ArrowUpDown size={12} className="opacity-70" />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {currentRows.length > 0 ? (
                                currentRows.map((row) => (
                                    <tr key={row.id} className="hover:bg-gray-50 border-b border-gray-100">
                                        <td className="p-3 text-xs font-bold text-gray-700">{row.id}</td>
                                        <td className="p-3">
                                            {/* Yellow Pill Style */}
                                            <span className="bg-[#FBC02D] text-black text-[11px] font-bold px-3 py-1 rounded-full inline-block">
                                                {row.udinNo}
                                            </span>
                                        </td>
                                        <td className="p-3 text-xs font-bold text-gray-700">{row.docType}</td>
                                        <td className="p-3 text-xs font-bold text-gray-700 text-right">{row.amount}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="p-6 text-center text-gray-500">
                                        No records found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* --- Footer & Pagination --- */}
                <div className="p-4 flex flex-col md:flex-row justify-between items-center border-t border-gray-200 gap-4">

                    <div className="text-xs text-gray-600 font-medium">
                        Showing {filteredData.length > 0 ? indexOfFirstRow + 1 : 0} to {Math.min(indexOfLastRow, filteredData.length)} of {filteredData.length} entries
                    </div>

                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 border border-gray-300 rounded-l-md text-xs font-medium hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-700"
                        >
                            Previous
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                            <button
                                key={number}
                                onClick={() => setCurrentPage(number)}
                                className={`w-8 py-1 border border-gray-300 text-xs font-medium ${currentPage === number
                                    ? 'bg-[#484595] text-white border-[#484595]'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                {number}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages || totalPages === 0}
                            className="px-3 py-1 border border-gray-300 rounded-r-md text-xs font-medium hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-700"
                        >
                            Next
                        </button>
                    </div>
                </div>

                {/* --- Payment Button Area --- */}
                <div className="bg-gray-50 p-6 flex justify-center border-t border-gray-200">
                    <button className="bg-[#5CB85C] hover:bg-[#4cae4c] text-white font-bold py-2 px-8 rounded shadow-sm flex items-center gap-2 transition-colors">
                        <CreditCard size={18} />
                        Pay ₹{handleTotalAmount()}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default PendingUdinDetails;