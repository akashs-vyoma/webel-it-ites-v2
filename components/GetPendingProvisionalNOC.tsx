"use client";
import React from 'react';
import { FileSpreadsheet, FileText, Search, ChevronLeft, ChevronRight } from 'lucide-react';

const ApplicationTable = () => {
   
    const headers = [
        "Sl No.", "Action", "Application#", "UDIN", "Name", 
        "Application Type", "Application Status", "Application Date", 
        "Provisional NOC Status", "Final NOC Status"
    ];

    return (
        <div className="max-w-[1600px] mx-auto p-4 lg:p-6">
            <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 overflow-hidden">
                
                {/* 1. MAIN HEADER: Neon Blue Gradient with Shimmer */}
                <div className="relative bg-gradient-to-r from-blue-700 to-cyan-600 px-6 py-4">
                    {/* The Shimmer Div requested */}
                    <div className="absolute inset-0 gradient-shimmer pointer-events-none z-10"></div>
                    
                    <h2 className="relative z-20 text-white font-bold tracking-wide flex items-center gap-2">
                        <span className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse shadow-[0_0_10px_cyan]"></span>
                        Application Details
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
                            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:border-cyan-400 transition-all"
                        />
                    </div>
                </div>

                {/* 2. TABLE SECTION: Updated Column Header Color */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            {/* Updated to a solid Neon Blue / Cyan for the header row */}
                            <tr className="bg-cyan-600 shadow-[inset_0_-2px_10px_rgba(0,0,0,0.1)]">
                                {headers.map((header, idx) => (
                                    <th key={idx} className="px-4 py-4 text-[11px] font-extrabold text-white uppercase tracking-widest border-r border-cyan-500/50 last:border-0">
                                        <div className="flex items-center justify-between gap-2">
                                            {header}
                                            {/* Small Sort Icons */}
                                            <div className="flex flex-col gap-0.5 opacity-40 group-hover:opacity-100 transition-opacity">
                                                <div className="w-1.5 h-1.5 border-l border-t border-white rotate-45"></div>
                                                <div className="w-1.5 h-1.5 border-r border-b border-white rotate-45"></div>
                                            </div>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="hover:bg-slate-50/80 transition-colors">
                                <td colSpan={headers.length} className="px-6 py-16 text-center">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-14 h-14 bg-cyan-50 rounded-full flex items-center justify-center text-cyan-200 border border-cyan-100">
                                            <FileText size={28} />
                                        </div>
                                        <p className="text-slate-400 text-sm font-medium">No data available in table</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Footer Section */}
                <div className="p-4 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-slate-100">
                    <p className="text-xs font-bold text-slate-400">
                        Showing <span className="text-slate-600">0</span> to <span className="text-slate-600">0</span> of <span className="text-slate-600">0</span> entries
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
        </div>
    );
};

export default ApplicationTable;