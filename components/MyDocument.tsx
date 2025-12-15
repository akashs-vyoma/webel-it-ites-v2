"use client";
import React, { useState, useMemo } from 'react';
import {
    Eye,
    Plus,
    Search,
    ChevronLeft,
    ChevronRight,
    ArrowUpDown,
    PlusCircle,
    FileText
} from 'lucide-react';

// --- Types ---
interface DocumentData {
    id: number;
    name: string;
    type: string;
    udin: string;
    size: number;
    uploadedOn: string;
    ownership: string;
    paymode: string;
    description: string;
    remarks: string;
    canAddToApp: boolean;
}

// --- Mock Data Generator (to match the "17 entries" in screenshot) ---
const generateData = (): DocumentData[] => {
    const baseData = [
        { id: 1, name: "DOCNAME", type: "Project Report", udin: "24-C-CA001176-P-1704179071921", size: 51241, uploadedOn: "2024-01-02 18:00:29", ownership: "SELF", paymode: "POSTPAID", description: "", remarks: "TEST", canAddToApp: true },
        { id: 2, name: "Declaration Letter", type: "Declaration Letter", udin: "24-P-CA001176-P-1704180131876", size: 139602, uploadedOn: "2024-01-02 18:18:10", ownership: "MULTI", paymode: "POSTPAID", description: "", remarks: "", canAddToApp: false },
        { id: 3, name: "udinpaymenttest", type: "Project Report", udin: "24-C-CA001176-P-1704286132845", size: 14545, uploadedOn: "2024-01-03 23:44:49", ownership: "SELF", paymode: "POSTPAID", description: "", remarks: "udinpaymenttest", canAddToApp: true },
        { id: 4, name: "udinpaymentdoctestv1", type: "Trade License", udin: "24-C-CA001176-P-1704286885881", size: 15336, uploadedOn: "2024-01-03 23:57:24", ownership: "SELF", paymode: "POSTPAID", description: "", remarks: "udinpaymentdoctestv1", canAddToApp: true },
        { id: 5, name: "Original Deed", type: "Original Deed", udin: "24-C-CA001176-P-1712569149067", size: 164262, uploadedOn: "2024-04-08 20:39:25", ownership: "SELF", paymode: "POSTPAID", description: "", remarks: "test", canAddToApp: true },
    ];

    // Generate extra dummy data to reach 17 entries for pagination demo
    const extraData = Array.from({ length: 12 }).map((_, i) => ({
        id: 6 + i,
        name: `Document ${6 + i}`,
        type: i % 2 === 0 ? "Project Report" : "NOC",
        udin: `24-C-CA001176-P-${1704286885882 + i}`,
        size: Math.floor(Math.random() * 50000) + 10000,
        uploadedOn: "2024-04-09 10:00:00",
        ownership: "SELF",
        paymode: "POSTPAID",
        description: "",
        remarks: `Auto generated ${i}`,
        canAddToApp: true
    }));

    return [...baseData, ...extraData];
};

const UploadedDocumentsTable: React.FC = () => {
    // State
    const [data] = useState<DocumentData[]>(generateData());
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(5);

    // Filtering Logic
    const filteredData = useMemo(() => {
        return data.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.udin.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.remarks.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [data, searchTerm]);

    // Pagination Logic
    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / entriesPerPage);
    const indexOfLastItem = currentPage * entriesPerPage;
    const indexOfFirstItem = indexOfLastItem - entriesPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    // Handlers
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleEntriesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setEntriesPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page
    };

    // Render Pagination Buttons
    const renderPaginationButtons = () => {
        const buttons = [];
        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`px-3 py-1 text-sm border ${currentPage === i
                        ? "bg-[#4c4f95] text-white border-[#4c4f95]"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                        }`}
                >
                    {i}
                </button>
            );
        }
        return buttons;
    };

    return (
        <div className="w-full min-h-screen p-4 font-sans">

            <div className="bg-white shadow-lg rounded-t-lg overflow-hidden">

                {/* Header Title */}
                <div className="bg-[#4c4f95] px-4 py-3">
                    <h1 className="text-white text-lg font-medium">Uploaded Documents In UDIN</h1>
                </div>

                {/* Controls: Entries & Search */}
                <div className="p-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                        <span>Show</span>
                        <select
                            value={entriesPerPage}
                            onChange={handleEntriesChange}
                            className="border border-gray-300 rounded px-2 py-1 outline-none focus:border-[#4c4f95]"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                        </select>
                        <span>entries</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span>Search:</span>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="border border-gray-300 rounded px-2 py-1 outline-none focus:border-[#4c4f95] min-w-[200px]"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse min-w-[1200px]">
                        <thead>
                            <tr className="bg-[#4c4f95] text-white text-xs uppercase text-left">
                                <th className="p-3 border-r border-blue-400/30 whitespace-nowrap">
                                    <div className="flex items-center justify-between">Sl No. <ArrowUpDown size={12} className="opacity-50" /></div>
                                </th>
                                <th className="p-3 border-r border-blue-400/30 whitespace-nowrap">
                                    <div className="flex items-center justify-between">Name <ArrowUpDown size={12} className="opacity-50" /></div>
                                </th>
                                <th className="p-3 border-r border-blue-400/30 whitespace-nowrap">
                                    <div className="flex items-center justify-between">Type <ArrowUpDown size={12} className="opacity-50" /></div>
                                </th>
                                <th className="p-3 border-r border-blue-400/30 whitespace-nowrap">
                                    <div className="flex items-center justify-between">UDIN <ArrowUpDown size={12} className="opacity-50" /></div>
                                </th>
                                <th className="p-3 border-r border-blue-400/30 whitespace-nowrap">
                                    <div className="flex items-center justify-between">Size (bytes) <ArrowUpDown size={12} className="opacity-50" /></div>
                                </th>
                                <th className="p-3 border-r border-blue-400/30 whitespace-nowrap">
                                    <div className="flex items-center justify-between">Uploaded On <ArrowUpDown size={12} className="opacity-50" /></div>
                                </th>
                                <th className="p-3 border-r border-blue-400/30 whitespace-nowrap">
                                    <div className="flex items-center justify-between">Ownership <ArrowUpDown size={12} className="opacity-50" /></div>
                                </th>
                                <th className="p-3 border-r border-blue-400/30 whitespace-nowrap">
                                    <div className="flex items-center justify-between">Paymode <ArrowUpDown size={12} className="opacity-50" /></div>
                                </th>
                                <th className="p-3 border-r border-blue-400/30 whitespace-nowrap">
                                    <div className="flex items-center justify-between">Description <ArrowUpDown size={12} className="opacity-50" /></div>
                                </th>
                                <th className="p-3 border-r border-blue-400/30 whitespace-nowrap">
                                    <div className="flex items-center justify-between">Remarks <ArrowUpDown size={12} className="opacity-50" /></div>
                                </th>
                                <th className="p-3 border-r border-blue-400/30 text-center whitespace-nowrap">
                                    <div className="flex items-center justify-center gap-1">View <ArrowUpDown size={12} className="opacity-50" /></div>
                                </th>
                                <th className="p-3 text-center whitespace-nowrap">
                                    <div className="flex items-center justify-center gap-1">Add to Application <ArrowUpDown size={12} className="opacity-50" /></div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-xs font-bold text-gray-800">
                            {currentItems.length > 0 ? (
                                currentItems.map((item, index) => (
                                    <tr key={item.id} className="even:bg-gray-50 hover:bg-blue-50 transition-colors border-b border-gray-200">
                                        <td className="p-3">{indexOfFirstItem + index + 1}</td>
                                        <td className="p-3">{item.name}</td>
                                        <td className="p-3">{item.type}</td>
                                        <td className="p-3">
                                            <span className="bg-[#4caf50] text-white px-2 py-1 rounded-full text-[10px]">
                                                {item.udin}
                                            </span>
                                        </td>
                                        <td className="p-3">
                                            <span className="bg-[#2196f3] text-white px-2 py-1 rounded-full text-[10px]">
                                                {item.size}
                                            </span>
                                        </td>
                                        <td className="p-3">
                                            <span className="bg-[#ffc107] text-black px-2 py-1 rounded-full text-[10px]">
                                                {item.uploadedOn}
                                            </span>
                                        </td>
                                        <td className="p-3">{item.ownership}</td>
                                        <td className="p-3">
                                            <span className="bg-[#f44336] text-white px-2 py-1 rounded-full text-[10px]">
                                                {item.paymode}
                                            </span>
                                        </td>
                                        <td className="p-3">{item.description}</td>
                                        <td className="p-3">{item.remarks}</td>
                                        <td className="p-3 text-center">
                                            <button className="bg-[#4c4f95] text-white p-1.5 rounded-full hover:bg-[#3b3d73]">
                                                <Eye size={14} />
                                            </button>
                                        </td>
                                        <td className="p-3 text-center">
                                            {item.canAddToApp && (
                                                <button className="bg-[#4c4f95] text-white p-1.5 rounded hover:bg-[#3b3d73]">
                                                    <Plus size={14} />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={12} className="p-4 text-center text-gray-500">
                                        No entries found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                <div className="p-4 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 border-t border-gray-200">
                    <div>
                        Showing {totalItems === 0 ? 0 : indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalItems)} of {totalItems} entries
                    </div>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-3 py-1 border border-gray-300 rounded-l hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed bg-white"
                        >
                            Previous
                        </button>

                        {renderPaginationButtons()}

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 border border-gray-300 rounded-r hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed bg-white"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Info Bar - Gold */}
            <div className="mt-8 bg-[#eec643] px-6 py-3 flex justify-between items-center rounded-t shadow-sm">
                <div className="flex items-center gap-1 text-sm font-bold text-gray-900">
                    Upload new document click on the <PlusCircle className="w-4 h-4 inline" /> Sign
                </div>
                {/* Blue Icon on Right */}
                <div className="bg-white p-1 rounded-full text-[#007bff]">
                    <PlusCircle className="w-6 h-6" />
                </div>
            </div>

            {/* Instruction Footer - Light Yellow */}
            <div className="bg-[#fcf8e3] p-4 text-[11px] leading-relaxed text-gray-800 border-t border-yellow-200 rounded-b shadow-sm">
                <span className="font-bold">Instruction:</span> View Document Click on <Eye size={12} className="inline mx-0.5 text-[#4c4f95]" /> button, Assign Document to application click on <span className="inline-flex items-center justify-center bg-[#4c4f95] text-white w-4 h-4 rounded-sm mx-0.5"><Plus size={10} /></span>
            </div>
        </div>
    );
};

export default UploadedDocumentsTable;