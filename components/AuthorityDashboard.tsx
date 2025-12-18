"use client";
import React from 'react';
import { useRouter } from 'next/navigation'; 
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
    const router = useRouter(); 

    const handleCardClick = () => {
        router.push('/get-pending-provisional-noc');
    };
    
    const statsData = [
        // Using Purple/Violet colors from your screenshot for specific categories
        { title: "Pending Provisional NOC", value: "0", icon: <AlertTriangle size={20} />, color: "bg-cyan-500" },
        { title: "Pending Provisional NOC (After 1 Day)", value: "0", icon: <AlertTriangle size={20} className="text-white" />, color: "bg-sky-600" },
        { title: "Pending Final NOC", value: "0", icon: <AlertTriangle size={20} />, color: "bg-cyan-500" },
        { title: "Pending Final NOC (After 4 Day)", value: "0", icon: <AlertTriangle size={20} className="text-white" />, color: "bg-sky-600" },
        
        { title: "Pending Co-signer Verification", value: "4", icon: <AlertTriangle size={20} />, color: "bg-purple-500" }, // Added Purple
        { title: "Total Application", value: "479", icon: <FileText size={20} />, color: "bg-violet-600" }, // Added Violet
        { title: "Total Provisional NOC Issued", value: "4", icon: <FileText size={20} />, color: "bg-blue-500" },
        { title: "Total Final NOC Issued", value: "373", icon: <FileText size={20} />, color: "bg-blue-500" },
        
        { title: "Pending Payment", value: "15", icon: <CreditCard size={20} className="text-white" />, color: "bg-sky-600" },
        { title: "Total Transaction Count", value: "1662", icon: <ArrowRightLeft size={20} />, color: "bg-purple-500" }, // Added Purple
        { title: "Total Payment Collected", value: "62,091,270.67", icon: <IndianRupee size={18} />, color: "bg-violet-700" }, // Added Violet
        { title: "Approval Pending", value: "4", icon: <AlertTriangle size={20} />, color: "bg-cyan-500" },
        
        { title: "Query Approval Pending", value: "17", icon: <AlertTriangle size={20} className="text-white" />, color: "bg-sky-600" },
        { title: "Approval Issued", value: "373", icon: <FileText size={20} />, color: "bg-violet-600" }, // Added Violet
        { title: "Total Rejected", value: "1", icon: <CircleSlash size={20} />, color: "bg-cyan-600" },
        { title: "Total Renewal of NOC Renting", value: "12", icon: <FileText size={20} />, color: "bg-blue-500" },
        
        { title: "Mortgage Lease Rights", value: "33", icon: <FileText size={20} />, color: "bg-purple-500" }, // Added Purple
        { title: "Transfer Of Lease Rights", value: "68", icon: <FileText size={20} />, color: "bg-purple-600" }, // Added Purple
        { title: "Pending Authority Declaration (After 4 Days)", value: "0", icon: <AlertTriangle size={20} className="text-white" />, color: "bg-sky-600" },
    ];

    return (
        <div className="min-h-screen p-6 lg:p-10 ">
            <div className="max-w-[1600px] mx-auto">
                <h1 className="text-2xl font-bold text-slate-700 mb-8 border-l-4 border-cyan-400 pl-4">
                    Welcome <span className="text-cyan-500">PRASENJIT MONDAL</span>
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {statsData.map((item, index) => {
                        // Logic to check if the color is purple/violet to apply the gradient background
                        const isPurpleTheme = item.color.includes('purple') || item.color.includes('violet');
                        
                        return (
                            <div 
                                key={index} 
                                onClick={handleCardClick}
                                className={`group relative cursor-pointer overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-1 active:scale-95 border border-white/50 shadow-md ${
                                    isPurpleTheme 
                                    ? "hover:shadow-[0_0_25px_rgba(168,85,247,0.3)]" 
                                    : "hover:shadow-[0_0_25px_rgba(6,182,212,0.3)]"
                                }`}
                            >
                                {/* Shimmer Effect Overlay */}
                                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1.5s_infinite] z-10" />
                                
                                {/* Background based on the color provided */}
                                <div className={`h-full bg-gradient-to-br ${
                                    isPurpleTheme 
                                    ? "from-white to-purple-50" // Light purple tint like your image
                                    : "from-white to-sky-50"
                                }`}>
                                    <StatCard 
                                        title={item.title}
                                        value={item.value}
                                        icon={item.icon}
                                        color={item.color}
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