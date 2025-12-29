"use client";
import React, { useRef, useState, useEffect } from 'react';
import { PlusCircle, ChevronDown, Eye, Trash2, Search, FileCheck, Plus } from 'lucide-react';
import { callAPI } from './apis/commonAPIs';

// Interfaces updated to match your provided JSON response
interface AppDoc {
    applicationDocID: number;
    documentName: string;
    documentType: string;
    docUploadOn: string;
    quotationID: string;      // From JSON
    documentAmount: number;   // From JSON
    documentTypeID: number;   // From JSON
}

interface AppDetailData {
    applicationNumber: string;
    udinNumber: string;
    companyName: string;
    documents: AppDoc[];
}

interface Project { projectID: number; projectName: string; }
interface ApplicationNumber { applicationId: number; applicationNumber: string; }
interface UDINDocument { docId: number; docType: string; docName: string; udinNo: string; uploadOn: number; }

const DocumentUploadHeader: React.FC = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedProjectID, setSelectedProjectID] = useState<string>("");
    const [selectedProjectName, setSelectedProjectName] = useState<string>("");
    const [selectedAppID, setSelectedAppID] = useState<string>("");
    
    const [projects, setProjects] = useState<Project[]>([]);
    const [applications, setApplications] = useState<ApplicationNumber[]>([]);
    const [udinDocs, setUdinDocs] = useState<UDINDocument[]>([]);
    const [appDetail, setAppDetail] = useState<AppDetailData | null>(null);

    const [isProjectsLoading, setIsProjectsLoading] = useState(true);
    const [isAppsLoading, setIsAppsLoading] = useState(false);
    const [isTable1Loading, setIsTable1Loading] = useState(false);
    const [isTable2Loading, setIsTable2Loading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const [searchTermUDIN, setSearchTermUDIN] = useState("");
    const [searchTermApp, setSearchTermApp] = useState("");

    // API: Fetch Application Types
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const result = await callAPI("/application/GetProjectDetailsByDeptID", { "departmentID": 1 });
                if (result.status === 0) setProjects(result.data);
            } catch (err) { console.error(err); }
            finally { setIsProjectsLoading(false); }
        };
        fetchProjects();
    }, []);

    // API: Fetch Application Numbers
    useEffect(() => {
        if (!selectedProjectID) { setApplications([]); return; }
        const proj = projects.find(p => p.projectID.toString() === selectedProjectID);
        setSelectedProjectName(proj?.projectName || "");

        const fetchApps = async () => {
            setIsAppsLoading(true);
            try {
                const result = await callAPI("/application/GetApplicationNumber", { "entryUser": 1, "projectID": parseInt(selectedProjectID) });
                if (result.status === 0) setApplications(result.data);
            } catch (err) { console.error(err); }
            finally { setIsAppsLoading(false); }
        };
        fetchApps();
    }, [selectedProjectID, projects]);

    const fetchApplicationDetails = async () => {
        if (!selectedAppID) return;
        setIsTable2Loading(true);
        try {
            
            const result = await callAPI("/application/GetApplicationDetailsByApplicationID", { "applicationID": 85 });
            if (result.status === 0) setAppDetail(result.data);
        } catch (err) { console.error(err); }
        finally { setIsTable2Loading(false); }
    };

    useEffect(() => {
        if (!selectedAppID) { setUdinDocs([]); setAppDetail(null); return; }
        const fetchPoolData = async () => {
            setIsTable1Loading(true);
            try {
                const result = await callAPI("/application/GetUploadedDocumentDetailsByApplicationTypeID", { "ownerID": 1, "applicationTypeID": 1, "userTypeID": 5 });
                if (result.status === 0) setUdinDocs(result.data);
            } catch (err) { console.error(err); }
            finally { setIsTable1Loading(false); }
        };
        fetchPoolData();
        fetchApplicationDetails();
    }, [selectedAppID]);

    const handleGenerateDeclaration = async () => {
        if (!appDetail) {
            alert("No application details found.");
            return;
        }

        const declarationDoc = appDetail.documents.find(d => d.documentTypeID === 100) || appDetail.documents[0];

        if (!declarationDoc) {
            alert("No documents found to link.");
            return;
        }

        setIsProcessing(true);
        try {
            const payload = {
                "application_id": selectedAppID,
                "doc_id": declarationDoc.applicationDocID,
                "application_no": appDetail.applicationNumber,
                "quotation_id": declarationDoc.quotationID || "",
                "udin_no": appDetail.udinNumber,
                "application_amount": declarationDoc.documentAmount || 0,
                "pay_mode": "ONLINE",
                "entry_user_id": 1
            };

            const result = await callAPI("/application/SetAssignUploadedDocByApplicationID", payload);

            if (result.status === 0) {
                alert("Declaration generated and document assigned successfully!");
                fetchApplicationDetails(); // Refresh list
            } else {
                alert(result.message || "Failed to assign document.");
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred during API call.");
        } finally {
            setIsProcessing(false);
        }
    };

    const formatTimestamp = (ts: number) => new Date(ts).toLocaleString('en-IN');

    return (
        <div className="w-full max-w-screen mx-auto p-4 flex flex-col font-sans">
            <div className="bg-white rounded-t-2xl shadow-md border overflow-hidden">
                {/* HEADER */}
                <div className="bg-gradient-to-r from-blue-700 to-cyan-500 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                            <label className="text-blue-100 text-[10px] font-bold uppercase">Application Type</label>
                            <div className="relative">
                                <select 
                                    value={selectedProjectID} 
                                    onChange={(e) => setSelectedProjectID(e.target.value)}
                                    className="w-full h-11 px-4 rounded-xl bg-white text-sm font-bold outline-none appearance-none"
                                >
                                    <option value="">{isProjectsLoading ? "Loading..." : "Select Type"}</option>
                                    {projects.map(p => <option key={p.projectID} value={p.projectID}>{p.projectName}</option>)}
                                </select>
                                <ChevronDown className="absolute right-4 top-3.5 w-4 h-4 text-slate-400" />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-blue-100 text-[10px] font-bold uppercase">Application No</label>
                            <div className="relative">
                                <select 
                                    value={selectedAppID} 
                                    onChange={(e) => setSelectedAppID(e.target.value)}
                                    disabled={!selectedProjectID}
                                    className="w-full h-11 px-4 rounded-xl bg-white text-sm font-bold outline-none appearance-none disabled:bg-slate-200"
                                >
                                    <option value="">Select No</option>
                                    {applications.map(app => <option key={app.applicationId} value={app.applicationId}>{app.applicationNumber}</option>)}
                                </select>
                                <ChevronDown className="absolute right-4 top-3.5 w-4 h-4 text-slate-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* UDIN POOL TABLE */}
                {selectedAppID && (
                    <div className="p-6 bg-white border-b">
                        <h2 className="text-blue-600 font-extrabold text-sm uppercase mb-4">UDIN Pool for {selectedProjectName}</h2>
                        <div className="overflow-x-auto border rounded-xl">
                            <table className="w-full text-left text-xs">
                                <thead className="bg-blue-600 text-white uppercase font-bold">
                                    <tr>
                                        <th className="px-4 py-3">Sl.no</th>
                                        <th className="px-4 py-3">Type</th>
                                        <th className="px-4 py-3">Name</th>
                                        <th className="px-4 py-3">UDIN</th>
                                        <th className="px-4 py-3 text-center">Add</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {udinDocs.map((doc, idx) => (
                                        <tr key={doc.docId} className="border-b hover:bg-slate-50">
                                            <td className="px-4 py-3">{idx + 1}</td>
                                            <td className="px-4 py-3 font-bold">{doc.docType}</td>
                                            <td className="px-4 py-3">{doc.docName}</td>
                                            <td className="px-4 py-3"><span className="bg-green-500 text-white px-2 py-0.5 rounded-full text-[9px]">{doc.udinNo}</span></td>
                                            <td className="px-4 py-3 text-center">
                                                <button className="p-1.5 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all">
                                                    <Plus size={14} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* APP SPECIFIC DOCS */}
            {selectedAppID && (
                <div className="bg-white rounded-b-2xl shadow-md border mt-1">
                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-slate-400 text-[10px] font-bold uppercase">App Number</label>
                                <div className="h-11 px-4 flex items-center bg-slate-50 border rounded-lg text-sm font-bold italic"><FileCheck size={16} className="mr-2 text-blue-600"/> {appDetail?.applicationNumber}</div>
                            </div>
                            <div>
                                <label className="text-slate-400 text-[10px] font-bold uppercase">Company</label>
                                <div className="h-11 px-4 flex items-center bg-slate-50 border rounded-lg text-sm font-bold">{appDetail?.companyName}</div>
                            </div>
                        </div>

                        <div className="overflow-x-auto border rounded-xl">
                            <table className="w-full text-left text-xs">
                                <thead className="bg-blue-600 text-white uppercase font-bold">
                                    <tr>
                                        <th className="px-4 py-3">Sl.no</th>
                                        <th className="px-4 py-3">Type</th>
                                        <th className="px-4 py-3">Name</th>
                                        <th className="px-4 py-3">Uploaded On</th>
                                        <th className="px-4 py-3 text-center">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appDetail?.documents.map((doc, idx) => (
                                        <tr key={doc.applicationDocID} className="border-b">
                                            <td className="px-4 py-3">{idx + 1}</td>
                                            <td className="px-4 py-3 font-bold">{doc.documentType}</td>
                                            <td className="px-4 py-3">{doc.documentName}</td>
                                            <td className="px-4 py-3 text-slate-400">{doc.docUploadOn}</td>
                                            <td className="px-4 py-3 text-center">
                                                <button className="p-1.5 text-red-500 hover:bg-red-50 rounded-full"><Trash2 size={14}/></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* GENERATE DECLARATION BUTTON */}
                        <div className="flex justify-center pt-2">
                            <button 
                                onClick={handleGenerateDeclaration}
                                disabled={isProcessing || !appDetail}
                                className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-12 rounded-lg shadow-lg text-xs uppercase tracking-widest transition-all disabled:opacity-50"
                            >
                                {isProcessing ? "Processing..." : "Generate Declaration"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DocumentUploadHeader;