"use client";
import React, { useEffect, useState } from 'react';
import { FileSpreadsheet, FileText, Search, ChevronLeft, ChevronRight, Loader2, Eye } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { callAPI } from './apis/commonAPIs';
import { useAuth } from '@/hooks/useAuth';

const AuthorityApplicationDetails = () => {
    const searchParams = useSearchParams();
    const { user, isAuthenticated } = useAuth();

    const [statusId, setStatusId] = useState<number>(0);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const [applications, setApplications] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    const titles: Record<number, string> = {
        1: "Pending Provisional NOC",
        2: "Pending Provisional NOC (After 1 Day)",
        3: "Pending Final NOC",
        4: "Pending Final NOC (After 4 Day)",
        5: "Pending Payment",
        6: "Pending Co-signer Verification",
        7: "Total Application",
        8: "Total Provisional NOC Issued",
        9: "Total Final NOC Issued",
        10: "Approval Pending",
        11: "Approval Issued",
        12: "Query Approval Pending",
        13: "Total Rejected",
        14: "Mortgage Lease Rights",
        15: "Transfer Of Lease Rights",
        16: "Pending Authority Declaration (After 4 Days)",
        17: "Total Renewal of NOC Renting",
        18: "Total Payment Collected",
        19: "Total Transaction Count",
    }

    useEffect(() => {
        if (!searchParams || !isAuthenticated || !user?.authority_id) return;
        const status_id = searchParams.get('status_id');
        const from = searchParams.get('from');
        const to = searchParams.get('to');

        const decodedStatus = atob(status_id || "") || '';
        const decodedFrom = atob(from || "") || '';
        const decodedTo = atob(to || "") || '';

        setStatusId(parseInt(decodedStatus));
        setFromDate(decodedFrom);
        setToDate(decodedTo);

        if (isAuthenticated && decodedStatus) {
            fetchApplicationDetails(decodedStatus, decodedFrom, decodedTo);
        }
    }, [searchParams, isAuthenticated]);

    const fetchApplicationDetails = async (sid: string, fromDate: string, toDate: string) => {
        try {
            setIsLoading(true);
            const response = await callAPI("/authority/GetApplicationDetailsByStatusV2", {
                "user_id": user?.authority_id,
                "status_id": parseInt(sid),
                "from_date": fromDate,
                "to_date": toDate
            });

            if (response?.status === "success" || response?.data) {
                setApplications(response.data || []);
            }
        } catch (error) {
            console.error('Error fetching application details:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleViewDocs = (application_id: number) => {
        router.push(`/authority-application-doc?aid=${btoa(application_id.toString())}`);
    }

    const headers = [
        "Sl No.", "Action", "Application", "Name",
        "Application Type", "Application Status", "Application Date",

        "Provisional NOC Status", "Final NOC Status"
    ];

    // Filter logic for the search bar
    const filteredApplications = applications.filter(app =>
        Object.values(app).some(val =>
            String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <div className="max-w-[1600px] mx-auto p-4 lg:p-6">
            <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 overflow-hidden">

                {/* 1. MAIN HEADER */}
                <div className="relative bg-gradient-to-r from-blue-700 to-cyan-600 px-6 py-4">
                    <div className="absolute inset-0 gradient-shimmer pointer-events-none z-10"></div>
                    <h2 className="relative z-20 text-white font-bold tracking-wide flex items-center gap-2">
                        <span className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse shadow-[0_0_10px_cyan]"></span>
                        Application Details ({titles[statusId]})
                    </h2>
                </div>

                {/* Toolbar Section */}
                <div className="p-4 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/30">
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 text-sm font-bold rounded-lg hover:border-cyan-400 hover:text-cyan-600 transition-all shadow-sm">
                            <FileSpreadsheet size={16} className="text-green-600" /> Excel
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 text-sm font-bold rounded-lg hover:border-cyan-400 hover:text-cyan-600 transition-all shadow-sm">
                            <FileText size={16} className="text-red-500" /> PDF
                        </button>
                    </div>

                    <div className="relative w-full md:w-72 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search applications..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:border-cyan-400 transition-all"
                        />
                    </div>
                </div>

                {/* 2. TABLE SECTION */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-cyan-600 shadow-[inset_0_-2px_10px_rgba(0,0,0,0.1)]">
                                {headers.map((header, idx) => (
                                    <th key={idx} className="px-4 py-4 text-[11px] font-extrabold text-white uppercase tracking-widest border-r border-cyan-500/50 last:border-0">
                                        <div className="flex items-center justify-between gap-2">
                                            {header}
                                            <div className="flex flex-col gap-0.5 opacity-40">
                                                <div className="w-1.5 h-1.5 border-l border-t border-white rotate-45"></div>
                                                <div className="w-1.5 h-1.5 border-r border-b border-white rotate-45"></div>
                                            </div>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={headers.length} className="px-6 py-16 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <Loader2 className="animate-spin text-cyan-500" size={32} />
                                            <p className="text-slate-400 text-sm font-medium">Fetching application details...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredApplications.length > 0 ? (
                                filteredApplications.map((app, index) => (
                                    <tr key={index} className="hover:bg-slate-50/80 transition-colors border-b border-slate-100 last:border-0">
                                        <td className="px-4 py-3 text-xs font-bold text-slate-500">{index + 1}</td>
                                        <td className="px-4 py-3">
                                            <button onClick={() => handleViewDocs(app?.application_id)} className="p-1.5 bg-cyan-50 text-cyan-600 rounded-md hover:bg-cyan-600 hover:text-white transition-all">
                                                <Eye size={14} />
                                            </button>
                                        </td>
                                        <td className="px-4 py-3 text-xs font-bold text-slate-700">{app.application_number}</td>
                                        <td className="px-4 py-3 text-xs font-medium text-slate-600">{app.company_name}</td>
                                        <td className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase">{app.service_name || 'N/A'}</td>
                                        <td className="px-4 py-3">
                                            <span className="px-2 py-1 text-center text-amber-600 text-[10px] font-black rounded-md uppercase">
                                                {app.application_status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-xs text-slate-500">{app.application_date || 'N/A'}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 text-[10px] font-black rounded-md uppercase border ${app.provisional_noc_status === 'DONE' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
                                                {app.provisional_noc_status || 'Pending'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 text-[10px] font-black rounded-md uppercase border ${app.final_noc_status === 'DONE' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
                                                {app.final_noc_status || 'Pending'}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={headers.length} className="px-6 py-16 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-14 h-14 bg-cyan-50 rounded-full flex items-center justify-center text-cyan-200 border border-cyan-100">
                                                <FileText size={28} />
                                            </div>
                                            <p className="text-slate-400 text-sm font-medium">No data available in table</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer Section */}
                <div className="p-4 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-slate-100">
                    <p className="text-xs font-bold text-slate-400">
                        Showing <span className="text-slate-600">{filteredApplications.length > 0 ? 1 : 0}</span> to <span className="text-slate-600">{filteredApplications.length}</span> of <span className="text-slate-600">{filteredApplications.length}</span> entries
                    </p>

                    <div className="flex items-center gap-1">
                        <button className="p-2 text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-all disabled:opacity-30" disabled>
                            <ChevronLeft size={20} />
                        </button>
                        <div className="px-3.5 py-1.5 bg-cyan-600 text-white text-xs font-black rounded-lg shadow-[0_4px_12px_rgba(6,182,212,0.3)]">
                            1
                        </div>
                        <button className="p-2 text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-all disabled:opacity-30" disabled>
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .gradient-shimmer {
                    background: linear-gradient(
                        90deg,
                        rgba(255, 255, 255, 0) 0%,
                        rgba(255, 255, 255, 0.1) 50%,
                        rgba(255, 255, 255, 0) 100%
                    );
                    background-size: 200% 100%;
                    animation: shimmer 3s infinite linear;
                }
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
            `}</style>
        </div>
    );
};

export default AuthorityApplicationDetails;