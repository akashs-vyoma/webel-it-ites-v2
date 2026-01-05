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

interface DashboardData {
    totalUploadedDoc: number;
    totalLetterIssued: number;
    totalSignDone: number;
    totalPaymentDoneCount: number;
    totalApprovalPending: number;
    totalJointVentureCreatedCount: number;
}

const DocumentAdvisory: React.FC = () => {
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

    const getProjects = async () => {

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

    useEffect(() => {
        getProjects();
    }, []);

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

            <div className="my-12 mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
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


        </main >
    );
};

export default DocumentAdvisory;