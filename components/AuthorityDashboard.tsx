"use client";
import React from 'react';
import { useRouter } from 'next/navigation'; // 1. Import useRouter
import StatCard from './ui/StatCard'; 
import { 
    AlertTriangle, 
    FileText, 
    CreditCard, 
    IndianRupee, 
    CircleSlash, 
    ArrowRightLeft 
} from 'lucide-react';

const AdminDashboard = () => {
    const router = useRouter(); // 2. Initialize the router

    // 3. Navigation handler
    const handleCardClick = () => {
        router.push('/get-pending-provisional-noc');
    };
    
    const statsData = [
        { title: "Pending Provisional NOC", value: "0", icon: <AlertTriangle size={20} />, color: "bg-[#f87171]" },
        { title: "Pending Provisional NOC (After 1 Day)", value: "0", icon: <AlertTriangle size={20} className="text-amber-400" />, color: "bg-[#4338ca]" },
        { title: "Pending Final NOC", value: "0", icon: <AlertTriangle size={20} />, color: "bg-[#f87171]" },
        { title: "Pending Final NOC (After 4 Day)", value: "0", icon: <AlertTriangle size={20} className="text-amber-400" />, color: "bg-[#4338ca]" },
        
        { title: "Pending Co-signer Verification", value: "4", icon: <AlertTriangle size={20} />, color: "bg-[#f87171]" },
        { title: "Total Application", value: "479", icon: <FileText size={20} />, color: "bg-[#818cf8]" },
        { title: "Total Provisional NOC Issued", value: "4", icon: <FileText size={20} />, color: "bg-[#818cf8]" },
        { title: "Total Final NOC Issued", value: "373", icon: <FileText size={20} />, color: "bg-[#818cf8]" },
        
        { title: "Pending Payment", value: "15", icon: <CreditCard size={20} className="text-amber-400" />, color: "bg-[#4338ca]" },
        { title: "Total Transaction Count", value: "1662", icon: <ArrowRightLeft size={20} />, color: "bg-[#818cf8]" },
        { title: "Total Payment Collected", value: "62,091,270.67", icon: <IndianRupee size={18} />, color: "bg-[#4338ca]" },
        { title: "Approval Pending", value: "4", icon: <AlertTriangle size={20} />, color: "bg-[#f87171]" },
        
        { title: "Query Approval Pending", value: "17", icon: <AlertTriangle size={20} className="text-amber-400" />, color: "bg-[#4338ca]" },
        { title: "Approval Issued", value: "373", icon: <FileText size={20} />, color: "bg-[#818cf8]" },
        { title: "Total Rejected", value: "1", icon: <CircleSlash size={20} />, color: "bg-[#f87171]" },
        { title: "Total Renewal of NOC Renting", value: "12", icon: <FileText size={20} />, color: "bg-[#818cf8]" },
        
        { title: "Mortgage Lease Rights", value: "33", icon: <FileText size={20} />, color: "bg-[#818cf8]" },
        { title: "Transfer Of Lease Rights", value: "68", icon: <FileText size={20} />, color: "bg-[#818cf8]" },
        { title: "Pending Authority Declaration (After 4 Days)", value: "0", icon: <AlertTriangle size={20} className="text-amber-400" />, color: "bg-[#4338ca]" },
    ];

    return (
        <div className="min-h-screen p-6 lg:p-10">
            <div className="max-w-[1600px] mx-auto">
                <h1 className="text-2xl font-bold text-slate-700 mb-8 border-l-4 border-cyan-500 pl-4">
                    Welcome <span className="text-cyan-600">PRASENJIT MONDAL</span>
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {statsData.map((item, index) => (
                        // 4. Wrapped StatCard in a div with onClick
                        <div 
                            key={index} 
                            onClick={handleCardClick}
                            className="cursor-pointer active:scale-95 transition-transform duration-150"
                        >
                            <StatCard 
                                title={item.title}
                                value={item.value}
                                icon={item.icon}
                                color={item.color}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;