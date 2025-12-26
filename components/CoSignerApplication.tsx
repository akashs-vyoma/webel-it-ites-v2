    "use client";
import React, { useState } from 'react';
import { RefreshCw, CheckCircle2, Clock } from 'lucide-react';

interface CoSignerData {
    slNo: number;
    name: string;
    type: string;
    status: 'Pending' | 'Completed';
    time: string;
}

const CoSignerTable: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);

    // Mock Data from the image
    const initialData: CoSignerData[] = [
        { slNo: 1, name: "Akash Singh", type: "Tenant", status: "Pending", time: "—" },
        { slNo: 2, name: "Nachiketa Verma", type: "CA/CS", status: "Pending", time: "—" },
        { slNo: 3, name: "Pallab Rudra", type: "Owner", status: "Completed", time: "26/12/25 5:13 PM" },
        { slNo: 4, name: "Prasenjit Mandal", type: "Owner", status: "Pending", time: "—" },
    ];

    const [data, setData] = useState<CoSignerData[]>(initialData);

    // Refresh Logic
    const handleRefresh = () => {
        setIsLoading(true);
        // Simulating a network fetch
        setTimeout(() => {
            setData([...initialData]);
            setIsLoading(false);
        }, 800);
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4 font-sans">
            
            {/* Refresh Button Section - Placed on top as per image */}
            <div className="flex justify-end mb-3">
                <button 
                    onClick={handleRefresh}
                    disabled={isLoading}
                    className="flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-1.5 rounded-full shadow-sm transition-all active:scale-95 disabled:opacity-50"
                >
                    <RefreshCw size={16} className={`${isLoading ? 'animate-spin' : ''} text-blue-600`} />
                    <span className="text-sm font-bold">Refresh</span>
                </button>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
                
                {/* Header with Blue Gradient and Shimmer */}
                <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 px-6 py-4">
                    <div className="absolute inset-0 gradient-shimmer pointer-events-none z-10"></div>
                    <div className="relative z-20 flex justify-between items-center">
                        <h2 className="text-white font-bold uppercase tracking-wider text-sm">
                            Co-Signer Verification Status
                        </h2>
                    </div>
                </div>

                {/* Table Content */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                                <th className="px-6 py-4 text-center w-16">Sl </th>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Type of Co-Signer</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Time</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-slate-700 divide-y divide-slate-100">
                            {data.map((row) => (
                                <tr key={row.slNo} className="hover:bg-blue-50/30 transition-colors">
                                    <td className="px-6 py-4 text-center font-bold text-slate-400">
                                        {row.slNo}
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-slate-800">
                                        {row.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-medium">
                                            {row.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {row.status === 'Completed' ? (
                                            <span className="flex items-center gap-1.5 text-green-600 font-bold italic">
                                                <CheckCircle2 size={14} />
                                                Completed
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1.5 text-amber-500 font-bold italic">
                                                <Clock size={14} />
                                                Pending
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-slate-400 font-medium">
                                        {row.time}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer branding/info */}
                <div className="bg-slate-50 px-6 py-3 border-t border-slate-100">
                    <p className="text-[10px] text-slate-400 italic">
                        * Data refreshes automatically every 5 minutes or use the refresh button above.
                    </p>
                </div>
            </div>

            {/* Re-using your Global Styles for Shimmer */}
            <style jsx global>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .gradient-shimmer {
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                    animation: shimmer 3s infinite;
                }
            `}</style>
        </div>
    );
};

export default CoSignerTable;