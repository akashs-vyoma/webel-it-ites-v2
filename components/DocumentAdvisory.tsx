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
    Info,
    Upload
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

    const fetchRequiredDocs = async (projectID: string) => {
        if (!projectID) return;
        setIsReqDocsLoading(true);
        setShowDocList(true);
        try {
            const result = await callAPI("/application/GetAllProjectDocByProjectID", {
                "projectID": parseInt(projectID)
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

            <div className="my-12 w-[800px] mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 p-6 flex justify-between items-center text-white">
                    <div>
                        <h3 className="text-xl font-bold tracking-tight">Document Advisory</h3>
                        <p className="text-blue-100 text-xs">Select your application type to check requirements</p>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    {/* Dropdown Section */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Application Type</label>
                        <div className="relative">
                            <select
                                value={selectedProjectID}
                                onChange={(e) => { setSelectedProjectID(e.target.value); setShowDocList(false); fetchRequiredDocs(e.target.value) }}
                                className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-bold text-sm outline-none appearance-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            >
                                <option value="">{isProjectsLoading ? "Loading..." : "Select Type"}</option>
                                {projects.map((p) => <option key={p.projectID} value={p.projectID}>{p.projectName}</option>)}
                            </select>
                            <ChevronDown className="absolute right-4 top-4 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Click to View Trigger */}
                    {!selectedProjectID && (
                        <div className="text-center py-4">
                            <span
                                className="flex items-center justify-center cursor-pointer hover:text-cyan-700 font-bold text-sm text-cyan-600 transition-colors"
                            >
                                <Info className="w-4 h-4 inline mr-1" /> Note: Select a project to view required documents
                            </span>
                        </div>
                    )}

                    {/* Document List View */}
                    {showDocList && (
                        <div className="max-h-[300px] overflow-y-auto custom-scrollbar border border-slate-200 rounded-xl">
                            {isReqDocsLoading ? (
                                <div className="flex flex-col items-center justify-center py-10 gap-3">
                                    <Loader2 className="animate-spin text-blue-500" />
                                    <span className="text-xs text-slate-400 italic">
                                        Fetching requirements...
                                    </span>
                                </div>
                            ) : requiredDocsList.length > 0 ? (
                                <table className="w-full border-collapse">
                                    <thead className="sticky top-0 bg-slate-100 z-10">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">
                                                Sl No.
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">
                                                Document Type
                                            </th>
                                            <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {requiredDocsList.map((doc, idx) => (
                                            <tr
                                                key={idx}
                                                className="border-t border-slate-200 hover:bg-slate-50 transition"
                                            >
                                                {/* Sl No */}
                                                <td className="px-4 py-3 text-sm text-slate-700">
                                                    {idx + 1}
                                                </td>

                                                {/* Document Type */}
                                                <td className="px-4 py-3 flex items-center gap-2 text-sm font-medium text-slate-700">
                                                    <FileText size={16} className="text-blue-500" />
                                                    {doc.project_name}
                                                </td>

                                                {/* Action */}
                                                <td className="px-4 py-3 text-center">
                                                    <Link
                                                        href={`/non-individual-upload-document?dcid=${doc?.project_doc_type_id}&dcnm=${doc?.project_name}`}
                                                        className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                                                    >
                                                        <Upload size={14} />
                                                        Upload
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
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