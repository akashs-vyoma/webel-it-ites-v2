"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    FileText,
    Users,
    ChevronDown,
    CloudUpload,
    Plus,
    TrendingUp,
    Sparkles,
    X,
    Loader2,
    Info
} from 'lucide-react';
import { assetConfig } from './asset-config';
import { callAPI } from './apis/commonAPIs';
import Image from 'next/image';
import DashboardImg from '@/public/7127980.jpg';
import { useAuth } from '@/hooks/useAuth';

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
    const [accountName, setAccountName] = useState('');

    // --- STATES FOR DOCUMENT ADVISORY MODAL ---
    const [isAdvisoryModalOpen, setIsAdvisoryModalOpen] = useState(false);
    const [projects, setProjects] = useState<any[]>([]);
    const [selectedProjectID, setSelectedProjectID] = useState("");
    const [isProjectsLoading, setIsProjectsLoading] = useState(false);
    const [requiredDocsList, setRequiredDocsList] = useState<any[]>([]);
    const [isReqDocsLoading, setIsReqDocsLoading] = useState(false);
    const [showDocList, setShowDocList] = useState(false);
    const { user, isAuthenticated } = useAuth();

    const fetchDashboardDetails = async () => {
        try {
            const result = await callAPI('/user/GetDashboardDetails', {
                "ownerID": parseInt(user?.owner_id || "1"),
                "userTypeID": parseInt(user?.user_type_id || "1")
            });

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

    useEffect(() => {
        if (!isAuthenticated) return;
        setAccountName(user?.account_name || '');
        fetchDashboardDetails();
    }, [isAuthenticated]);


    const handleOpenAdvisory = async () => {

        setSelectedProjectID("");
        setRequiredDocsList([]);
        setShowDocList(false);

        setIsAdvisoryModalOpen(true);
        setIsProjectsLoading(true);
        try {
            const result = await callAPI("/application/GetProjectDetailsByDeptID", { "departmentID": 1 });
            if (result.status === 0) setProjects(result.data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsProjectsLoading(false);
        }
    };

    const fetchRequiredDocs = async () => {
        if (!selectedProjectID) return;
        setIsReqDocsLoading(true);
        setShowDocList(true);
        try {
            const result = await callAPI("/application/GetAllProjectDocByProjectID", {
                "projectID": parseInt(selectedProjectID)
            });
            if (result.status === 0) setRequiredDocsList(result.data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsReqDocsLoading(false);
        }
    };

    return (
        <main className="relative z-10 min-h-screen px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 selection:bg-cyan-200 selection:text-blue-900">
            <div className="absolute top-0 left-0 w-full h-96 to-transparent -z-10"></div>
            <div className="absolute top-0 right-0 w-1/3 h-96 bg-gradient-to-bl from-cyan-100/40 via-blue-50/20 to-transparent blur-3xl -z-10"></div>

            <div className="container mx-auto py-8 lg:py-12">
                {/* Welcome Message */}
                <div className="mb-10 lg:mb-14">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-cyan-100 rounded-full mb-4 shadow-sm shadow-cyan-100">
                        <Sparkles size={16} className="text-cyan-500 fill-cyan-500/20" />
                        <span className="text-sm font-semibold text-cyan-600 tracking-wide">Dashboard Overview</span>
                    </div>
                    <h2 className="text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight drop-shadow-sm animate-fade-in">
                        <span className="text-slate-800 block">
                            Welcome,
                        </span>

                        <span className="block mt-1 bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-700 bg-clip-text text-transparent text-1xl lg:text-2xl xl:text-3xl font-semibold">
                            {accountName || ""}
                        </span>
                    </h2>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-10 items-start">
                    <div className="lg:col-span-5 w-full">
                        <div className="relative group h-full">
                            <div className="absolute overflow-hidden inset-0 rounded-[2.5rem] ">
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-600/5"></div>
                            </div>
                            <div className="relative z-10 h-full flex items-center justify-center p-4 lg:p-8">
                                <div className="relative z-10 h-full flex items-center justify-center p-4 lg:p-8">
                                    <div className="w-full max-w-md rounded-2xl overflow-hidden">
                                        <Image
                                            src={DashboardImg}
                                            alt="Dashboard Illustration"
                                            width={500}
                                            height={500}
                                            className="w-full h-auto object-contain drop-shadow-xl transition-all duration-700 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, 448px"

                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-5 xl:gap-6">
                        <Link href="/apply-noc" className="block group">
                            <div className="relative overflow-hidden rounded-[2rem] min-h-[180px] lg:min-h-[200px] cursor-pointer bg-white shadow-lg shadow-slate-200/50 border border-slate-100 group-hover:border-blue-500 transition-all duration-300">
                                <div className="relative z-10 p-6 xl:p-8 h-full flex flex-col justify-center gap-4">
                                    <div className="relative bg-white w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 border border-slate-100 shadow-sm">
                                        <Plus size={24} className="text-blue-600" strokeWidth={2.5} />
                                    </div>
                                    <div>
                                        <p className="text-xl lg:text-2xl xl:text-3xl font-bold leading-tight text-slate-800 group-hover:text-blue-700 transition-colors">Create Application</p>
                                        <p className="text-xs text-slate-400 mt-1 font-medium">Start a new submission</p>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        {/* DOCUMENT ADVISORY CARD */}
                        <Link href="/document-advisory"
                            className="relative overflow-hidden rounded-[2rem] min-h-[180px] lg:min-h-[200px] cursor-pointer bg-white shadow-lg shadow-slate-200/50 border border-slate-100 group-hover:border-cyan-400 transition-all duration-300 group"
                        >
                            <div className="relative z-10 p-6 xl:p-8 h-full flex flex-col justify-center gap-4">
                                <div className="relative bg-white w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 border border-slate-100 shadow-sm">
                                    <CloudUpload size={24} className="text-cyan-600" strokeWidth={2} />
                                </div>
                                <div>
                                    <p className="text-xl lg:text-2xl xl:text-3xl font-bold leading-tight text-slate-800 group-hover:text-cyan-700 transition-colors">Document Advisory</p>
                                    <p className="text-xs text-blue-500 mt-1 font-bold flex items-center gap-1">
                                        Check requirements <Info size={14} />
                                    </p>
                                </div>
                            </div>
                        </Link>

                        {/* Card: Total Upload */}
                        <div className="group relative overflow-hidden rounded-[2rem] min-h-[200px] lg:min-h-[220px] cursor-default shadow-xl shadow-blue-200/50 hover:shadow-2xl hover:shadow-cyan-400/20 transition-all duration-500">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500"></div>
                            <div className="relative z-10 p-6 xl:p-8 h-full flex flex-col justify-between text-white">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/10">
                                                <FileText size={16} className="text-white" />
                                            </div>
                                            <p className="text-xs font-semibold text-blue-50 tracking-wide uppercase">Webel Services</p>
                                        </div>
                                        <h3 className="text-5xl xl:text-7xl font-bold mb-3 tracking-tighter drop-shadow-sm">
                                            {isLoading ? <Loader2 className='animate-spin text-white/70 h-6 w-6' size={10} /> : dashboardData?.totalUploadedDoc ?? 0}
                                        </h3>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                                        <TrendingUp size={20} className="text-white" />
                                    </div>
                                </div>
                                <p className="text-lg xl:text-xl font-medium leading-tight opacity-95">
                                    Total Upload <br /> Document
                                </p>
                            </div>
                        </div>

                        {/* Card: Multi Party */}
                        <div className="group relative overflow-hidden rounded-[2rem] min-h-[200px] lg:min-h-[220px] cursor-default shadow-xl shadow-blue-200/50 hover:shadow-2xl hover:shadow-cyan-400/20 transition-all duration-500">
                            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-blue-900"></div>
                            <div className="relative z-10 p-6 xl:p-8 h-full flex flex-col justify-between text-white">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
                                                <Users size={16} className="text-cyan-300" />
                                            </div>
                                            <p className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Webel Services</p>
                                        </div>
                                        <h3 className="text-5xl xl:text-7xl font-bold mb-3 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-cyan-100">
                                            {isLoading ? <Loader2 className='animate-spin text-white/70 h-6 w-6' size={10} /> : dashboardData?.totalJointVentureCreatedCount ?? 0}
                                        </h3>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                                        <TrendingUp size={20} className="text-cyan-300" />
                                    </div>
                                </div>
                                <p className="text-lg xl:text-xl font-medium leading-tight text-slate-200">
                                    Multi Owner <br /> Declaration
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- DOCUMENT ADVISORY MODAL --- */}
            {
                isAdvisoryModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
                        <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 p-6 flex justify-between items-center text-white">
                                <div>
                                    <h3 className="text-xl font-bold tracking-tight">Required Documents</h3>
                                    <p className="text-blue-100 text-xs">Select your application type to check requirements</p>
                                </div>
                                <button onClick={() => setIsAdvisoryModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="p-6 space-y-6">
                                {/* Dropdown Section */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Application Type</label>
                                    <div className="relative">
                                        <select
                                            value={selectedProjectID}
                                            onChange={(e) => { setSelectedProjectID(e.target.value); setShowDocList(false); }}
                                            className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-bold text-sm outline-none appearance-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        >
                                            <option value="">{isProjectsLoading ? "Loading..." : "Select Type"}</option>
                                            {projects.map((p) => <option key={p.projectID} value={p.projectID}>{p.projectName}</option>)}
                                        </select>
                                        <ChevronDown className="absolute right-4 top-4 w-4 h-4 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Click to View Trigger */}
                                {selectedProjectID && !showDocList && (
                                    <div className="text-center py-4">
                                        <button
                                            onClick={fetchRequiredDocs}
                                            className="text-blue-600 font-bold text-sm underline underline-offset-4 hover:text-blue-800 transition-colors"
                                        >
                                            Click here to view required documents
                                        </button>
                                    </div>
                                )}

                                {/* Document List View */}
                                {showDocList && (
                                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                        {isReqDocsLoading ? (
                                            <div className="flex flex-col items-center justify-center py-10 gap-3">
                                                <Loader2 className="animate-spin text-blue-500" />
                                                <span className="text-xs text-slate-400 italic">Fetching requirements...</span>
                                            </div>
                                        ) : requiredDocsList.length > 0 ? (
                                            requiredDocsList.map((doc, idx) => (
                                                <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl group hover:bg-white hover:border-blue-200 transition-all">
                                                    <div className="flex items-center gap-4">
                                                        <div className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-100 group-hover:text-blue-600">
                                                            <FileText size={18} />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-slate-700">{doc.project_name}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-10">
                                                <p className="text-xs text-slate-400 italic">No documents found.</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )
            }
        </main >
    );
};

export default UserDashboard;