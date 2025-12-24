"use client"
import React, { useState, useEffect } from 'react';
import {
    FileText,
    Users,
    ChevronDown,
    CloudUpload,
    Plus,
    TrendingUp,
    Sparkles
} from 'lucide-react';

// Define the interface for the API response
interface DashboardData {
    totalUploadedDoc: number;
    totalLetterIssued: number;
    totalSignDone: number;
    totalPaymentDoneCount: number;
    totalApprovalPending: number;
    totalJointVentureCreatedCount: number;
}

const UserDashboard: React.FC = () => {
    
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardDetails = async () => {
            try {
                const response = await fetch('http://115.187.62.16:8005/ITEWBRestAPI/api/user/GetDashboardDetails', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "ownerID": 2,
                        "userTypeID": 1
                    }),
                });

                const result = await response.json();

                if (result.status === 0) {
                    setDashboardData(result.data);
                } else {
                    console.error("API Error:", result.message);
                }
            } catch (error) {
                console.error("Fetch Error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardDetails();
    }, []);

    return (
        <main className="relative z-10 min-h-screen selection:bg-cyan-200 selection:text-blue-900">
            {/* Background gradient effects */}
            <div className="absolute top-0 left-0 w-full h-96 to-transparent -z-10"></div>
            <div className="absolute top-0 right-0 w-1/3 h-96 bg-gradient-to-bl from-cyan-100/40 via-blue-50/20 to-transparent blur-3xl -z-10"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

                {/* Welcome Message */}
                <div className="mb-10 lg:mb-14">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-cyan-100 rounded-full mb-4 shadow-sm shadow-cyan-100">
                        <Sparkles size={16} className="text-cyan-500 fill-cyan-500/20" />
                        <span className="text-sm font-semibold text-cyan-600 tracking-wide">Dashboard Overview</span>
                    </div>
                    <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-800 tracking-tight">
                        Welcome Back
                    </h2>
                    <p className="text-lg lg:text-xl text-slate-500 mt-2 font-medium uppercase tracking-wide">
                        Vyoma Innovus Global Private Limited
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10">

                    {/* Left Column: Image */}
                    <div className="lg:col-span-5 w-full">
                        <div className="relative group h-full min-h-[400px] lg:min-h-[500px]">
                            <div className="absolute overflow-hidden inset-0 rounded-[2.5rem] ">
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-600/5"></div>
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/20 via-transparent to-blue-500/20 blur-xl"></div>
                                </div>
                            </div>
                            <div className="relative z-10 h-full flex items-center justify-center p-8 lg:p-10">
                                <div className="w-full max-w-md rounded-2xl overflow-hidden">
                                    <img
                                        src="/7127980.jpg"
                                        alt="Dashboard Illustration"
                                        className="w-full h-auto object-contain drop-shadow-xl transition-all duration-700 group-hover:scale-105 group-hover:drop-shadow-[0_20px_60px_rgba(6,182,212,0.25)]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Dashboard Cards */}
                    <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">

                        {/* Card 1: Total Uploaded Document (DYNAMIC) */}
                        <div className="group relative overflow-hidden rounded-[2rem] min-h-[220px] cursor-default shadow-xl shadow-blue-200/50 hover:shadow-2xl hover:shadow-cyan-400/20 transition-all duration-500">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500"></div>
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="absolute inset-0 border border-white/20 rounded-[2rem]"></div>

                            <div className="relative z-10 p-6 lg:p-8 h-full flex flex-col justify-between text-white">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/10">
                                                <FileText size={18} className="text-white" />
                                            </div>
                                            <p className="text-sm font-semibold text-blue-50 tracking-wide">Webel Services</p>
                                        </div>
                                        <h3 className="text-6xl lg:text-7xl font-bold mb-3 tracking-tighter drop-shadow-sm">
                                            {isLoading ? "..." : dashboardData?.totalUploadedDoc ?? 0}
                                        </h3>
                                    </div>
                                    <div className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300 border border-white/10">
                                        <TrendingUp size={22} className="text-white" />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xl font-medium leading-snug opacity-90">
                                        Total Uploaded <br /> Document
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 2: Multi Party Declaration (DYNAMIC) */}
                        <div className="group relative overflow-hidden rounded-[2rem] min-h-[220px] cursor-default shadow-xl shadow-blue-200/50 hover:shadow-2xl hover:shadow-cyan-400/20 transition-all duration-500">
                             <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-blue-900"></div>
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/40 via-transparent to-transparent opacity-60"></div>
                            <div className="absolute inset-0 border border-white/10 rounded-[2rem]"></div>

                            <div className="relative z-10 p-6 lg:p-8 h-full flex flex-col justify-between text-white">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
                                                <Users size={18} className="text-cyan-300" />
                                            </div>
                                            <p className="text-sm font-semibold text-slate-300 tracking-wide">Webel Services</p>
                                        </div>
                                        <h3 className="text-6xl lg:text-7xl font-bold mb-3 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-cyan-100 drop-shadow-sm">
                                            {isLoading ? "..." : dashboardData?.totalJointVentureCreatedCount ?? 0}
                                        </h3>
                                    </div>
                                    <div className="w-11 h-11 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all duration-300 border border-white/10">
                                        <TrendingUp size={22} className="text-cyan-300" />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xl font-medium leading-snug text-slate-200">
                                        Multi Party <br /> Declaration
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 3: Upload Document */}
                        <div className="group relative overflow-hidden rounded-[2rem] min-h-[200px] cursor-pointer bg-white shadow-lg shadow-slate-200/50 border border-slate-100 hover:border-cyan-400 transition-colors duration-300">
                            <div className="relative z-10 p-6 lg:p-8 h-full flex flex-col justify-center gap-5">
                                <div className="relative w-fit">
                                    <div className="absolute inset-0 bg-cyan-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                                    <div className="relative bg-white w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 border border-slate-100 shadow-sm">
                                        <CloudUpload size={28} className="text-cyan-600" strokeWidth={2} />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-2xl lg:text-3xl font-bold leading-tight text-slate-800 group-hover:text-cyan-700 transition-colors">Upload Document</p>
                                    <p className="text-sm text-slate-400 mt-2 font-medium">Click to add new files</p>
                                </div>
                            </div>
                        </div>

                        {/* Card 4: Create Application */}
                        <div className="group relative overflow-hidden rounded-[2rem] min-h-[200px] cursor-pointer bg-white shadow-lg shadow-slate-200/50 border border-slate-100 hover:border-blue-500 transition-colors duration-300">
                            <div className="relative z-10 p-6 lg:p-8 h-full flex flex-col justify-center gap-5">
                                <div className="relative w-fit">
                                    <div className="absolute inset-0 bg-blue-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                                    <div className="relative bg-white w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 border border-slate-100 shadow-sm">
                                        <Plus size={28} className="text-blue-600" strokeWidth={2.5} />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-2xl lg:text-3xl font-bold leading-tight text-slate-800 group-hover:text-blue-700 transition-colors">Create Application</p>
                                    <p className="text-sm text-slate-400 mt-2 font-medium">Start a new submission</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default UserDashboard;