"use client";
import React, { useEffect, useState } from 'react';
import { Calendar, Search, ChevronDown } from 'lucide-react';
import { callAPI } from './apis/commonAPIs';

interface ReportFilterProps {
    title?: string; // OPTIONAL — default will be used
    onSearch?: (data: { service: string; fromDate: string; toDate: string }) => void;
}

const ReportFilterSection: React.FC<ReportFilterProps> = ({
    title = "Report Details of Provisional NOC",
    onSearch
}) => {
    const [service, setService] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [projects, setProjects] = useState([]);
    const [isLoadingProjects, setIsLoadingProjects] = useState(false);

    const fetchProjects = async () => {
        try {
            const result = await callAPI('/application/GetProjectDetailsByDeptID', { "departmentID": 1 });

            if (result && Array.isArray(result?.data)) setProjects(result?.data);
            else setProjects([]);
        } catch (error) {
            console.error("Error fetching projects:", error);
        } finally {
            setIsLoadingProjects(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, [])

    const handleSearch = () => {
        onSearch?.({ service, fromDate, toDate });
    };

    return (
        <div className="max-w-[1600px] mx-auto p-4 lg:p-6">
            <div className="bg-white min-w-[70%] rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 overflow-hidden">

                {/* ================= HEADER ================= */}
                <div className="relative bg-gradient-to-r from-blue-700 to-cyan-600 px-6 py-4">
                    {/* SHIMMER */}
                    <div className="absolute inset-0 gradient-shimmer pointer-events-none z-10"></div>

                    <h2 className="relative z-20 text-white font-bold tracking-wide flex items-center gap-2">
                        <span className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse shadow-[0_0_10px_cyan]"></span>
                        {title}
                    </h2>
                </div>

                {/* ================= FILTER BODY ================= */}
                <div className="p-6 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">

                        {/* Service Name */}
                        <div className="md:col-span-4 space-y-2">
                            <label className="text-[13px] font-bold text-slate-600 ml-1">
                                Service Name
                            </label>
                            <div className="relative group">
                                <select
                                    className="w-full h-11 pl-4 pr-10 bg-white border border-slate-200 rounded-xl text-sm font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:border-cyan-400 transition-all cursor-pointer text-slate-700"
                                    value={service}
                                    onChange={(e) => setService(e.target.value)}
                                >
                                    <option value="" disabled>
                                        Select Service Name
                                    </option>
                                    {projects?.map((item: any, idx: number) => (
                                        <option key={idx} value={item?.projectId}>
                                            {item?.projectName}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown
                                    size={18}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-cyan-500 transition-colors"
                                />
                            </div>
                        </div>

                        {/* From Date */}
                        <div className="md:col-span-3 space-y-2">
                            <label className="text-[13px] font-bold text-slate-600 ml-1">
                                From Date
                            </label>
                            <div className="flex h-11 border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-cyan-100 focus-within:border-cyan-400 transition-all">
                                <div className="bg-[#4338ca] px-3 flex items-center justify-center text-white">
                                    <Calendar size={18} />
                                </div>
                                <input
                                    type="date"
                                    value={fromDate}
                                    onChange={(e) => setFromDate(e.target.value)}
                                    className="w-full px-3 text-sm font-medium focus:outline-none text-slate-700 cursor-pointer"
                                />
                            </div>
                        </div>

                        {/* To Date */}
                        <div className="md:col-span-3 space-y-2">
                            <label className="text-[13px] font-bold text-slate-600 ml-1">
                                To Date
                            </label>
                            <div className="flex h-11 border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-cyan-100 focus-within:border-cyan-400 transition-all">
                                <div className="bg-[#4338ca] px-3 flex items-center justify-center text-white">
                                    <Calendar size={18} />
                                </div>
                                <input
                                    type="date"
                                    value={toDate}
                                    onChange={(e) => setToDate(e.target.value)}
                                    className="w-full px-3 text-sm font-medium focus:outline-none text-slate-700 cursor-pointer"
                                />
                            </div>
                        </div>

                        {/* Search Button */}
                        <div className="md:col-span-2">
                            <button
                                onClick={handleSearch}
                                className="w-full h-11 bg-[#4338ca] hover:bg-[#3730a3] text-white rounded-xl flex items-center justify-center gap-2 font-bold text-sm transition-all shadow-md active:scale-95 group"
                            >
                                <Search
                                    size={18}
                                    className="group-hover:scale-110 transition-transform"
                                />
                                Search
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportFilterSection;
