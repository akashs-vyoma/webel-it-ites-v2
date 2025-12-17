"use client";
import React, { useState, useMemo } from 'react';
import {
    Eye,
    Plus,
    Search,
    ArrowUpDown,
    PlusCircle,
    X,
    FileText,
    ListFilter
} from 'lucide-react';
import Link from "next/link";

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

// --- Mock Data Generator ---
const generateData = (): DocumentData[] => {
    const baseData = [
        { id: 1, name: "DOCNAME", type: "Project Report", udin: "24-C-CA001176-P-1704179071921", size: 51241, uploadedOn: "2024-01-02 18:00:29", ownership: "SELF", paymode: "POSTPAID", description: "", remarks: "TEST", canAddToApp: true },
        { id: 2, name: "Declaration Letter", type: "Declaration Letter", udin: "24-P-CA001176-P-1704180131876", size: 139602, uploadedOn: "2024-01-02 18:18:10", ownership: "MULTI", paymode: "POSTPAID", description: "", remarks: "", canAddToApp: false },
        { id: 3, name: "udinpaymenttest", type: "Project Report", udin: "24-C-CA001176-P-1704286132845", size: 14545, uploadedOn: "2024-01-03 23:44:49", ownership: "SELF", paymode: "POSTPAID", description: "", remarks: "udinpaymenttest", canAddToApp: true },
        { id: 4, name: "udinpaymentdoctestv1", type: "Trade License", udin: "24-C-CA001176-P-1704286885881", size: 15336, uploadedOn: "2024-01-03 23:57:24", ownership: "SELF", paymode: "POSTPAID", description: "", remarks: "udinpaymentdoctestv1", canAddToApp: true },
        { id: 5, name: "Original Deed", type: "Original Deed", udin: "24-C-CA001176-P-1712569149067", size: 164262, uploadedOn: "2024-04-08 20:39:25", ownership: "SELF", paymode: "POSTPAID", description: "", remarks: "test", canAddToApp: true },
    ];

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

// --- Project Types for Dropdown (SC4) ---
const projectTypes = [
    "DPR of IT & ITeS - Vetting - SINGLE PARTY",
    "NOC for Renting Out Leased property - SINGLE PARTY",
    "Certificate for Tax Exemption - SINGLE PARTY",
    "DPR of IT & ITeS - vetting - MULTIPARTY",
    "NOC for Renting Out Leased property - MULTIPARTY",
    "Certificate for Tax Exemption - MULTIPARTY",
    "Renewal of NOC Renting out Leased Property - SINGLE PARTY",
    "Renewal of NOC Renting out Leased Property - MULTI PARTY"
];

const UploadedDocumentsTable: React.FC = () => {
    // Data State
    const [data] = useState<DocumentData[]>(generateData());
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(5);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState<DocumentData | null>(null);

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
        setCurrentPage(1);
    };

    // Modal Handlers
    const openAddModal = (doc: DocumentData) => {
        setSelectedDoc(doc);
        setIsModalOpen(true);
    };

    const closeAddModal = () => {
        setIsModalOpen(false);
        setSelectedDoc(null);
    };

    // Render Pagination Buttons
    const renderPaginationButtons = () => {
        const buttons = [];
        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-all ${currentPage === i
                            ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-transparent shadow-md"
                            : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-blue-600"
                        }`}
                >
                    {i}
                </button>
            );
        }
        return buttons;
    };

    return (
        <div className="w-full min-h-screen  p-4 md:p-8 font-sans selection:bg-cyan-100 selection:text-blue-900 flex justify-center">

            {/* --- Main Table Card --- */}
            <div className="w-full max-w-[1400px] bg-white  rounded-xl overflow-hidden border border-slate-100">

                {/* Header Title - Gradient Blue */}
                <div className="relative bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-5 overflow-hidden">
    
    {/* Shimmer Effect – Always On */}
    <div className="absolute inset-0 gradient-shimmer pointer-events-none z-10"></div>

                    <h1 className="text-white text-xl font-semibold tracking-wide flex items-center gap-2">
                        <ListFilter className="w-5 h-5 text-white/80" />
                        Uploaded Documents In UDIN
                    </h1>
                </div>

                {/* Controls: Entries & Search */}
                <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-4 bg-white">
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                        <span className="font-medium">Show</span>
                        <div className="relative">
                            <select
                                value={entriesPerPage}
                                onChange={handleEntriesChange}
                                className="border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 bg-slate-50 text-slate-700 font-medium appearance-none min-w-[70px] cursor-pointer transition-all"
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                            </select>
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                <ArrowUpDown size={12} />
                            </div>
                        </div>
                        <span className="font-medium">entries</span>
                    </div>

                    <div className="relative group w-full md:w-auto">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                            <Search size={16} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search documents..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full md:w-64 border border-slate-200 rounded-lg pl-10 pr-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 bg-slate-50 text-slate-700 text-sm transition-all placeholder:text-slate-400"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse min-w-[1200px]">
                        <thead>
                            <tr className="bg-slate-50 border-y border-slate-200 text-slate-500 text-xs uppercase font-bold text-left tracking-wider">
                                <th className="p-4 whitespace-nowrap"><div className="flex items-center gap-1">Sl No.</div></th>
                                <th className="p-4 whitespace-nowrap"><div className="flex items-center gap-1">Name <ArrowUpDown size={12} className="opacity-40" /></div></th>
                                <th className="p-4 whitespace-nowrap"><div className="flex items-center gap-1">Type <ArrowUpDown size={12} className="opacity-40" /></div></th>
                                <th className="p-4 whitespace-nowrap"><div className="flex items-center gap-1">UDIN <ArrowUpDown size={12} className="opacity-40" /></div></th>
                                <th className="p-4 whitespace-nowrap"><div className="flex items-center gap-1">Size <span className="normal-case text-[10px] text-slate-400 ml-1">(bytes)</span></div></th>
                                <th className="p-4 whitespace-nowrap"><div className="flex items-center gap-1">Uploaded On <ArrowUpDown size={12} className="opacity-40" /></div></th>
                                <th className="p-4 whitespace-nowrap"><div className="flex items-center gap-1">Ownership</div></th>
                                <th className="p-4 whitespace-nowrap"><div className="flex items-center gap-1">Paymode</div></th>
                                <th className="p-4 whitespace-nowrap"><div className="flex items-center gap-1">Description</div></th>
                                <th className="p-4 whitespace-nowrap"><div className="flex items-center gap-1">Remarks</div></th>
                                <th className="p-4 text-center whitespace-nowrap">View</th>
                                <th className="p-4 text-center whitespace-nowrap">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-slate-700 font-medium">
                            {currentItems.length > 0 ? (
                                currentItems.map((item, index) => (
                                    <tr key={item.id} className="border-b border-slate-100 hover:bg-blue-50/50 transition-colors group">
                                        <td className="p-4 text-slate-500">{indexOfFirstItem + index + 1}</td>
                                        <td className="p-4 font-semibold text-slate-800">{item.name}</td>
                                        <td className="p-4 text-slate-600">{item.type}</td>
                                        <td className="p-4">
                                            <span className="bg-green-50 text-green-700 border border-green-200 px-2 py-1 rounded-md text-[11px] font-bold shadow-sm">
                                                {item.udin}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span className="bg-slate-100 text-slate-600 border border-slate-200 px-2 py-1 rounded-md text-[11px]">
                                                {item.size.toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="p-4 text-slate-500 text-xs">{item.uploadedOn}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-md text-[10px] font-bold border ${item.ownership === 'SELF' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-purple-50 text-purple-700 border-purple-200'}`}>
                                                {item.ownership}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span className="bg-orange-50 text-orange-700 border border-orange-200 px-2 py-1 rounded-md text-[10px] font-bold">
                                                {item.paymode}
                                            </span>
                                        </td>
                                        <td className="p-4 text-slate-500 truncate max-w-[150px]">{item.description || "-"}</td>
                                        <td className="p-4 text-slate-500 truncate max-w-[150px]">{item.remarks || "-"}</td>
                                        <td className="p-4 text-center">
                                            <button className="bg-white border border-slate-200 text-slate-500 p-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm">
                                                <Eye size={16} />
                                            </button>
                                        </td>
                                        <td className="p-4 text-center">
                                            {item.canAddToApp && (
                                                <button
                                                    onClick={() => openAddModal(item)}
                                                    className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-2 rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all active:scale-95"
                                                    title="Add to Application"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={12} className="p-8 text-center text-slate-500 italic">No entries found matching your search.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500 bg-white border-t border-slate-100">
                    <div>
                        Showing <span className="text-slate-900 font-bold">{totalItems === 0 ? 0 : indexOfFirstItem + 1}</span> to <span className="text-slate-900 font-bold">{Math.min(indexOfLastItem, totalItems)}</span> of <span className="text-slate-900 font-bold">{totalItems}</span> entries
                    </div>
                    <div className="flex items-center gap-1.5">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-3 py-1.5 border border-slate-200 rounded-md hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed bg-white transition-colors"
                        >
                            Previous
                        </button>
                        {renderPaginationButtons()}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1.5 border border-slate-200 rounded-md hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed bg-white transition-colors"
                        >
                            Next
                        </button>
                    </div>
                </div>

                {/* --- Footer Blocks (Instruction & Action) --- */}
                <div className="bg-slate-50 p-6 border-t border-slate-100">
                    
                    {/* Action Bar - COLOR UPDATED HERE */}
                    <div className="flex flex-col gap-0 rounded-xl overflow-hidden shadow-sm border border-[#F2C94C]/50">
                        
                        {/* Replaced Gradient with the Solid Hex Color #F2C94C */}
                        <div className="bg-[#F2C94C] px-6 py-3 flex justify-between items-center">
                            <div className="flex items-center gap-2 text-sm font-bold text-white ">
                                <PlusCircle className="w-5 h-5 text-white" />
                                <span>Upload new document</span>
                            </div>
                            
                            <Link href="/non-individual-upload-document">
                                <div className="bg-white/20 backdrop-blur-sm p-1.5 rounded-full text-white cursor-pointer hover:bg-white hover:text-[#F2C94C] transition-all duration-300">
                                    <PlusCircle className="w-6 h-6" />
                                </div>
                            </Link>
                        </div>

                        {/* Instruction Footer - Light Yellow Background */}
                        <div className="bg-yellow-50 p-4 text-[11px] leading-relaxed text-slate-700">
                            <div className="flex items-start gap-2">
                                <span className="font-bold text-yellow-700 whitespace-nowrap">Instruction:</span>
                                <div className="space-y-1">
                                    <p className="flex items-center gap-1">
                                        View Document: Click on <span className="inline-flex items-center justify-center bg-white border border-slate-200 text-slate-500 w-5 h-5 rounded mx-0.5"><Eye size={12} /></span> button.
                                    </p>
                                    <p className="flex items-center gap-1">
                                        Assign Document to application: Click on <span className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-cyan-500 text-white w-5 h-5 rounded mx-0.5"><Plus size={12} /></span> button.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* --- ADD TO APPLICATION MODAL --- */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200 p-4">
                    <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 font-sans border border-slate-100">

                        {/* Modal Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4 flex justify-between items-center">
                            <h2 className="text-white text-lg font-semibold flex items-center gap-2">
                                <FileText size={18} className="text-white/80" />
                                Your Application List
                            </h2>
                            <button onClick={closeAddModal} className="text-white/70 hover:text-white transition-colors bg-white/10 p-1 rounded-full hover:bg-white/20">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-8 space-y-6">

                            {/* Project Type Dropdown */}
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Select Project Type</label>
                                <div className="relative">
                                    <select className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 bg-slate-50 font-medium appearance-none transition-all cursor-pointer">
                                        <option value="">Select Project Type</option>
                                        {projectTypes.map((type, idx) => (
                                            <option key={idx} value={type}>{type}</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <ArrowUpDown className="w-4 h-4 text-blue-500 opacity-50" />
                                    </div>
                                </div>
                            </div>

                            {/* Application Number Dropdown */}
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Select Application Number</label>
                                <div className="relative">
                                    <select className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 bg-slate-50 font-medium appearance-none transition-all cursor-pointer">
                                        <option value="">Select Application Number</option>
                                        <option value="APP-001">APP-001</option>
                                        <option value="APP-002">APP-002</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <ArrowUpDown className="w-4 h-4 text-blue-500 opacity-50" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-5 border-t border-slate-100 flex justify-end bg-slate-50">
                            <button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-8 py-2.5 rounded-lg text-sm font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all transform active:scale-95">
                                Add Document
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
};

export default UploadedDocumentsTable;