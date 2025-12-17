"use client";
import React, { useState } from 'react';
import {
    Printer,
    FileText,
    FileSpreadsheet,
    CreditCard,
    ArrowUpDown,
    ChevronLeft,
    ChevronRight,
    Search,
    ListFilter
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
        <div className="min-h-screen w-full  p-4 md:p-8 font-sans">
            <div className="max-w-[1400px] mx-auto bg-white shadow-xl rounded-xl overflow-hidden border border-slate-100">

              <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-5">

    {/* SHIMMER */}
    <div className="absolute inset-0 gradient-shimmer pointer-events-none"></div>

                    <h1 className="text-white font-semibold text-lg flex items-center gap-2 tracking-wide">
                        <CreditCard size={20} className="text-cyan-100" />
                        Pending UDIN Amount Details
                    </h1>
                </div>

                {/* --- Controls Bar --- */}
                <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-4 bg-white">

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                        <button
                            onClick={handleDownloadExcel}
                            className="flex items-center gap-1.5 border border-slate-200 bg-white px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-green-50 hover:text-green-600 hover:border-green-200 transition-all shadow-sm"
                        >
                            <FileSpreadsheet size={16} /> Excel
                        </button>
                        <button
                            onClick={handlePrint}
                            className="flex items-center gap-1.5 border border-slate-200 bg-white px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm"
                        >
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
                            placeholder="Search UDIN or Doc Type..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1); // Reset to page 1 on search
                            }}
                            className="w-full md:w-72 border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 bg-slate-50 text-slate-700 transition-all"
                        />
                    </div>
                </div>

                {/* --- Table --- */}
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-sm text-left border-collapse">
                        <thead className="bg-slate-50 border-y border-slate-200">
                            <tr>
                                <th className="p-4 font-bold text-xs text-slate-500 uppercase tracking-wider w-20 cursor-pointer hover:bg-slate-100 transition-colors">
                                    <div className="flex items-center gap-1">
                                        Sl No.
                                    </div>
                                </th>
                                <th className="p-4 font-bold text-xs text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors">
                                    <div className="flex items-center gap-1">
                                        UDIN No. <ArrowUpDown size={12} className="opacity-50" />
                                    </div>
                                </th>
                                <th className="p-4 font-bold text-xs text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors">
                                    <div className="flex items-center gap-1">
                                        Doc Type <ArrowUpDown size={12} className="opacity-50" />
                                    </div>
                                </th>
                                <th className="p-4 font-bold text-xs text-slate-500 uppercase tracking-wider text-right cursor-pointer hover:bg-slate-100 transition-colors">
                                    <div className="flex justify-end items-center gap-1">
                                        Pending Amount (₹) <ArrowUpDown size={12} className="opacity-50" />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-100">
                            {currentRows.length > 0 ? (
                                currentRows.map((row) => (
                                    <tr key={row.id} className="hover:bg-blue-50/50 transition-colors">
                                        <td className="p-4 text-xs font-semibold text-slate-500">{row.id}</td>
                                        <td className="p-4">
                                            {/* Modern Badge Style */}
                                            <span className="bg-amber-50 text-amber-700 border border-amber-200 text-[11px] font-bold px-3 py-1 rounded-md inline-block shadow-sm">
                                                {row.udinNo}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm font-medium text-slate-700">{row.docType}</td>
                                        <td className="p-4 text-sm font-bold text-slate-800 text-right">
                                            {row.amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-slate-500 italic">
                                        No records found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* --- Footer & Pagination --- */}
                <div className="p-6 flex flex-col md:flex-row justify-between items-center bg-white border-t border-slate-100 gap-4">

                    <div className="text-xs font-medium text-slate-500">
                        Showing <span className="font-bold text-slate-800">{filteredData.length > 0 ? indexOfFirstRow + 1 : 0}</span> to <span className="font-bold text-slate-800">{Math.min(indexOfLastRow, filteredData.length)}</span> of <span className="font-bold text-slate-800">{filteredData.length}</span> entries
                    </div>

                    <div className="flex items-center gap-1.5">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-slate-600 transition-colors flex items-center"
                        >
                            <ChevronLeft size={14} className="mr-1" /> Previous
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                            <button
                                key={number}
                                onClick={() => setCurrentPage(number)}
                                className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-all ${currentPage === number
                                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/30'
                                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                                    }`}
                            >
                                {number}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages || totalPages === 0}
                            className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-slate-600 transition-colors flex items-center"
                        >
                            Next <ChevronRight size={14} className="ml-1" />
                        </button>
                    </div>
                </div>

                {/* --- Payment Button Area --- */}
                <div className="bg-slate-50 p-6 flex justify-center border-t border-slate-200">
                    <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-10 rounded-xl shadow-lg shadow-emerald-500/30 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-95">
                        <CreditCard size={20} />
                        Pay Total: {handleTotalAmount().toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default PendingUdinDetails;