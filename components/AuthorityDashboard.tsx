"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import StatCard from './ui/StatCard';
import {
    AlertTriangle,
    FileText,
    CreditCard,
    IndianRupee,
    CircleSlash,
    ArrowRightLeft,
    Search,
    Calendar
} from 'lucide-react';
import { callAPI } from './apis/commonAPIs';
import { useAuth } from '@/hooks/useAuth';

const AdminDashboard = () => {
    const router = useRouter();
    const { user, isAuthenticated } = useAuth();

    const today = new Date().toISOString().split('T')[0];

    const [dashboardData, setDashboardData] = useState<any>({});
    const [isLoading, setIsLoading] = useState(false);

    const [fromDate, setFromDate] = useState(today);
    const [toDate, setToDate] = useState(today);

    const handleCardClick = (status_id: number) => {
        router.push(`/get-pending-provisional-noc?status_id=${btoa(status_id.toString())}`);
    };

    // Reusable fetch function
    const fetchDashboardData = async () => {
        try {
            setIsLoading(true);
            const response = await callAPI("/admin/GetAdminDashboardDetails", {
                "user_id": user?.authority_id,
                "from_date": fromDate,
                "to_date": toDate
            });
            setDashboardData(response?.data);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchDashboardData();
        }
    }, [isAuthenticated]);

    // 'pending_provisional_noc_count': 1,
    // 'pending_provisional_noc_count_after_one_day': 2,
    // 'pending_final_noc_count': 3,
    // 'pending_final_noc_count_after_four_days': 4,
    // 'pending_payment_count': 5,
    // 'pending_verification_count': 6,
    // 'total_application_count': 7, // exception
    // 'total_provisional_noc_issued_count': 8,
    // 'total_final_noc_issued_count': 9,
    // 'pending_authority_approve': 10,
    // 'total_authority_approve_issued': 11,
    // 'total_query_approve_pending': 12,
    // 'total_reject_count': 13,
    // 'total_noc_mortgaging_lease_rights_count': 14,
    // 'total_noc_transfer_lease_rights_count': 15,
    // 'total_pending_webel_declation_after_four_days': 16,
    // 'total_renewal_application_count': 17,

    const statsData = [
        { title: "Pending Provisional NOC", status_id: 1, value: dashboardData?.pending_provisional_noc_count || "0", icon: <AlertTriangle size={20} />, color: "bg-cyan-500" },
        { title: "Pending Provisional NOC (After 1 Day)", status_id: 2, value: dashboardData?.pending_provisional_noc_count_after_one_day || "0", icon: <AlertTriangle size={20} className="text-white" />, color: "bg-sky-600" },
        { title: "Pending Final NOC", status_id: 3, value: dashboardData?.pending_final_noc_count || "0", icon: <AlertTriangle size={20} />, color: "bg-cyan-500" },
        { title: "Pending Final NOC (After 4 Day)", status_id: 4, value: dashboardData?.pending_final_noc_count_after_four_days || "0", icon: <AlertTriangle size={20} className="text-white" />, color: "bg-sky-600" },
        { title: "*Pending Co-signer Verification", status_id: 6, value: dashboardData?.pending_verification_count || "0", icon: <AlertTriangle size={20} />, color: "bg-purple-500" },
        { title: "Total Application", status_id: 7, value: dashboardData?.total_application_count, icon: <FileText size={20} />, color: "bg-violet-600" },
        { title: "Total Provisional NOC Issued", status_id: 8, value: dashboardData?.total_provisional_noc_issued_count, icon: <FileText size={20} />, color: "bg-blue-500" },
        { title: "Total Final NOC Issued", status_id: 9, value: dashboardData?.total_final_noc_issued_count, icon: <FileText size={20} />, color: "bg-blue-500" },
        { title: "Pending Payment", status_id: 5, value: dashboardData?.pending_payment_count, icon: <CreditCard size={20} className="text-white" />, color: "bg-sky-600" },
        { title: "*Total Transaction Count", status_id: 1, value: dashboardData?.total_transaction_count, icon: <ArrowRightLeft size={20} />, color: "bg-purple-500" },
        { title: "*Total Payment Collected", status_id: 16, value: dashboardData?.payment_collected, icon: <IndianRupee size={18} />, color: "bg-violet-700" },
        { title: "Approval Pending", status_id: 10, value: dashboardData?.pending_authority_approve, icon: <AlertTriangle size={20} />, color: "bg-cyan-500" },
        { title: "Query Approval Pending", status_id: 12, value: dashboardData?.total_query_approve_pending, icon: <AlertTriangle size={20} className="text-white" />, color: "bg-sky-600" },
        { title: "Approval Issued", status_id: 11, value: dashboardData?.total_authority_approve_issued, icon: <FileText size={20} />, color: "bg-violet-600" },
        { title: "Total Rejected", status_id: 13, value: dashboardData?.total_reject_count, icon: <CircleSlash size={20} />, color: "bg-cyan-600" },
        { title: "Total Renewal of NOC Renting", status_id: 17, value: dashboardData?.total_renewal_application_count, icon: <FileText size={20} />, color: "bg-blue-500" },
        { title: "Mortgage Lease Rights", status_id: 14, value: dashboardData?.total_noc_mortgaging_lease_rights_count, icon: <FileText size={20} />, color: "bg-purple-500" },
        { title: "Transfer Of Lease Rights", status_id: 15, value: dashboardData?.total_noc_transfer_lease_rights_count, icon: <FileText size={20} />, color: "bg-purple-600" },
        { title: "Pending Authority Declaration (After 4 Days)", status_id: 16, value: dashboardData?.total_pending_webel_declation_after_four_days, icon: <AlertTriangle size={20} className="text-white" />, color: "bg-sky-600" },
    ];

    return (
        <div className="min-h-screen p-6 lg:p-10 ">
            <div className="max-w-[1600px] mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
                    <h1 className="text-2xl font-bold text-slate-700 border-l-4 border-cyan-400 pl-4">
                        Welcome <span className="text-cyan-500">{user?.full_name}</span>
                    </h1>

                    {/* Filter Section */}
                    <div className="flex flex-wrap items-center gap-4 bg-white p-2 px-4 rounded-xl shadow-sm border border-slate-100">
                        <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-cyan-500" />
                            {/* Added leading-none and flex items-center to the label/input group */}
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-slate-400 uppercase leading-none">From:</span>
                                <input
                                    type="date"
                                    value={fromDate}
                                    onChange={(e) => setFromDate(e.target.value)}
                                    // Added p-0, bg-transparent, and leading-none to normalize height
                                    className="text-sm border-none focus:ring-0 text-slate-600 font-medium cursor-pointer p-0 bg-transparent leading-none m-0"
                                />
                            </div>
                        </div>

                        <div className="h-6 w-[1px] bg-slate-200 hidden md:block"></div>

                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-slate-400 uppercase leading-none">To:</span>
                                <input
                                    type="date"
                                    value={toDate}
                                    onChange={(e) => setToDate(e.target.value)}
                                    className="text-sm border-none focus:ring-0 text-slate-600 font-medium cursor-pointer p-0 bg-transparent leading-none m-0"
                                />
                            </div>
                        </div>

                        <button
                            onClick={fetchDashboardData}
                            disabled={isLoading}
                            className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50 ml-auto"
                        >
                            <Search size={16} />
                            <span className="text-sm font-semibold">Search</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {statsData?.map((item, index) => {
                        const isPurpleTheme = item.color.includes('purple') || item.color.includes('violet');

                        return (
                            <div
                                key={index}
                                onClick={() => handleCardClick(item?.status_id)}
                                className={`group relative cursor-pointer overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-1 active:scale-95 border border-white/50 shadow-md ${isPurpleTheme
                                    ? "hover:shadow-[0_0_25px_rgba(168,85,247,0.3)]"
                                    : "hover:shadow-[0_0_25px_rgba(6,182,212,0.3)]"
                                    }`}
                            >
                                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1.5s_infinite] z-10" />

                                <div className={`h-full bg-gradient-to-br ${isPurpleTheme
                                    ? "from-white to-purple-50"
                                    : "from-white to-sky-50"
                                    }`}>
                                    <StatCard
                                        title={item.title}
                                        value={item.value}
                                        icon={item.icon}
                                        color={item.color}
                                        isLoading={isLoading}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <style jsx global>{`
                @keyframes shimmer {
                    100% {
                        transform: translateX(100%);
                    }
                }
            `}</style>
        </div>
    );
};

export default AdminDashboard;