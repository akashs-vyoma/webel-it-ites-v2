"use client";
import React, { useRef, useState, useEffect } from 'react';
import { PlusCircle, CheckCircle2, ChevronDown, Info, Eye, Trash2, Search, FileCheck, Plus } from 'lucide-react';

// Interfaces
interface Project {
    projectID: number;
    projectName: string;
}

interface ApplicationNumber {
    applicationId: number;
    applicationNumber: string;
}

interface UDINDocument {
    docId: number;
    docType: string;
    docName: string;
    udinNo: string;
    uploadOn: number;
}

interface AppDoc {
    applicationDocID: number;
    documentName: string;
    documentType: string;
    docUploadOn: string;
}

interface AppDetailData {
    applicationNumber: string;
    companyName: string;
    documents: AppDoc[];
    udinNumber: string;
}

const DocumentUploadHeader: React.FC = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProjectID, setSelectedProjectID] = useState<string>("");
    const [selectedProjectName, setSelectedProjectName] = useState<string>("");

    const [applications, setApplications] = useState<ApplicationNumber[]>([]);
    const [selectedAppID, setSelectedAppID] = useState<string>("");

    const [isProjectsLoading, setIsProjectsLoading] = useState(true);
    const [isAppsLoading, setIsAppsLoading] = useState(false);
    const [isTable1Loading, setIsTable1Loading] = useState(false);
    const [isTable2Loading, setIsTable2Loading] = useState(false);
    const [isLinking, setIsLinking] = useState(false); // New linking state

    const [udinDocs, setUdinDocs] = useState<UDINDocument[]>([]);
    const [appDetail, setAppDetail] = useState<AppDetailData | null>(null);

    const [searchTermUDIN, setSearchTermUDIN] = useState("");
    const [searchTermApp, setSearchTermApp] = useState("");

    // API: Get Application Types
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('http://115.187.62.16:8005/ITEWBRestAPI/api/application/GetProjectDetailsByDeptID', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ "departmentID": 1 }),
                });
                const result = await response.json();
                if (result.status === 0) setProjects(result.data);
            } catch (err) { console.error(err); }
            finally { setIsProjectsLoading(false); }
        };
        fetchProjects();
    }, []);

    // API: Get Application Numbers
    useEffect(() => {
        if (!selectedProjectID) {
            setApplications([]);
            setSelectedAppID("");
            return;
        }
        const proj = projects.find(p => p.projectID.toString() === selectedProjectID);
        setSelectedProjectName(proj?.projectName || "");

        const fetchApps = async () => {
            setIsAppsLoading(true);
            try {
                const response = await fetch('http://115.187.62.16:8005/ITEWBRestAPI/api/application/GetApplicationNumber', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ "entryUser": 1, "projectID": parseInt(selectedProjectID) }),
                });
                const result = await response.json();
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
            const res = await fetch('http://115.187.62.16:8005/ITEWBRestAPI/api/application/GetApplicationDetailsByApplicationID', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "applicationID": parseInt(selectedAppID) }),
            });
            const result = await res.json();
            if (result.status === 0) setAppDetail(result.data);
        } catch (err) { console.error(err); }
        finally { setIsTable2Loading(false); }
    };

    // Trigger tables on Application selection
    useEffect(() => {
        if (!selectedAppID) {
            setUdinDocs([]);
            setAppDetail(null);
            return;
        }

        const fetchPoolData = async () => {
            setIsTable1Loading(true);
            try {
                const res = await fetch('http://115.187.62.16:8005/ITEWBRestAPI/api/application/GetUploadedDocumentDetailsByApplicationTypeID', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ "ownerID": 1, "applicationTypeID": 1, "userTypeID": 5 }),
                });
                const result = await res.json();
                if (result.status === 0) setUdinDocs(result.data);
            } catch (err) { console.error(err); }
            finally { setIsTable1Loading(false); }
        };

        fetchPoolData();
        fetchApplicationDetails();
    }, [selectedAppID, selectedProjectID]);

    const formatTimestamp = (ts: number) => {
        return new Date(ts).toLocaleString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    // --- NEW FUNCTIONAL API CALL: SET ASSIGN UPLOADED DOC ---
    const handleAddFromUDIN = async (doc: UDINDocument) => {
        if (!appDetail || !selectedAppID || isLinking) return;

        if (appDetail.documents.some(d => d.documentName === doc.docName)) {
            alert("This document is already assigned to the application.");
            return;
        }

        setIsLinking(true);
        try {
            const response = await fetch('http://115.187.62.16:8005/ITEWBRestAPI/api/application/SetAssignUploadedDocByApplicationID', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "application_id": parseInt(selectedAppID),
                    "doc_id": doc.docId,
                    "application_no": appDetail.applicationNumber,
                    "quotation_id": "",
                    "udin_no": doc.udinNo,
                    "application_amount": 0,
                    "pay_mode": "ONLINE",
                    "entry_user_id": 1
                }),
            });

            const result = await response.json();
            if (result.status === 0) {
                await fetchApplicationDetails();
            } else {
                alert(result.message || "Failed to link document.");
            }
        } catch (err) {
            console.error("Link error:", err);
            alert("Error connecting to server.");
        } finally {
            setIsLinking(false);
        }
    };

    const handleDelete = (id: number) => {
        if (!appDetail) return;
        setAppDetail({ ...appDetail, documents: appDetail.documents.filter(d => d.applicationDocID !== id) });
    };

    const filteredUdinDocs = udinDocs.filter(doc =>
        doc.docName.toLowerCase().includes(searchTermUDIN.toLowerCase()) ||
        doc.docType.toLowerCase().includes(searchTermUDIN.toLowerCase())
    );

    const filteredAppDocs = appDetail?.documents.filter(doc =>
        doc.documentName.toLowerCase().includes(searchTermApp.toLowerCase()) ||
        doc.documentType.toLowerCase().includes(searchTermApp.toLowerCase())
    ) || [];

    return (
        <div className="w-full max-w-screen mx-auto p-4 flex flex-col font-sans antialiased">
           
            <div className="bg-white rounded-t-2xl shadow-md border border-slate-100 overflow-hidden">
                
                {/* SELECTION HEADER */}
                <div className="relative bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 p-6 overflow-hidden">
                    <div className="absolute inset-0 gradient-shimmer pointer-events-none z-10"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-20">
                        <div className="space-y-1.5">
                            <label className="text-blue-100 text-[10px] font-bold uppercase tracking-widest ml-1">Application Type</label>
                            <div className="relative group">
                                <select
                                    value={selectedProjectID}
                                    onChange={(e) => { setSelectedProjectID(e.target.value); setSelectedAppID(""); }}
                                    className="w-full h-11 px-4 rounded-xl bg-white/95 text-slate-800 font-bold text-sm outline-none appearance-none"
                                >
                                    <option value="">{isProjectsLoading ? "Loading..." : "Select Application Type"}</option>
                                    {projects.map((p) => <option key={p.projectID} value={p.projectID}>{p.projectName}</option>)}
                                </select>
                                <ChevronDown className="absolute right-4 top-3.5 w-4 h-4 text-slate-400" />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-blue-100 text-[10px] font-bold uppercase tracking-widest ml-1">Application No</label>
                            <div className="relative group">
                                <select
                                    value={selectedAppID}
                                    onChange={(e) => setSelectedAppID(e.target.value)}
                                    disabled={!selectedProjectID || isAppsLoading}
                                    className="w-full h-11 px-4 rounded-xl bg-white/95 text-slate-800 font-bold text-sm outline-none appearance-none disabled:bg-slate-200"
                                >
                                    <option value="">{isAppsLoading ? "Fetching..." : "Select Application Number"}</option>
                                    {applications.map((app) => <option key={app.applicationId} value={app.applicationId}>{app.applicationNumber}</option>)}
                                </select>
                                <ChevronDown className="absolute right-4 top-3.5 w-4 h-4 text-slate-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* TABLE 1: UDIN POOL */}
                {selectedAppID && (
                    <div className="p-6 bg-white border-b border-slate-100">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-blue-600 font-extrabold text-lg uppercase">Already Uploaded Documents In UDIN For {selectedProjectName}</h2>
                                <p className="text-[11px] text-slate-400 mt-1 italic">* View required documents <span className="text-blue-500 cursor-pointer font-bold underline">Click to View</span></p>
                            </div>
                            <div className="relative w-64">
                                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search UDIN pool..."
                                    value={searchTermUDIN}
                                    onChange={(e) => setSearchTermUDIN(e.target.value)}
                                    className="w-full border rounded-lg py-2 pl-10 pr-4 text-xs outline-none focus:border-blue-400"
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto border rounded-xl">
                            <table className="w-full text-left">
                                <thead className="bg-blue-600 text-white text-[10px] font-bold uppercase">
                                    <tr>
                                        <th className="px-4 py-3 text-center border-r border-white/10">Sl.no.</th>
                                        <th className="px-4 py-3 border-r border-white/10">Type</th>
                                        <th className="px-4 py-3 border-r border-white/10">Name</th>
                                        <th className="px-4 py-3 border-r border-white/10">UDIN</th>
                                        <th className="px-4 py-3 border-r border-white/10">Uploaded On</th>
                                        <th className="px-4 py-3 text-center">View</th>
                                        <th className="px-4 py-3 text-center">Add</th>
                                    </tr>
                                </thead>
                                <tbody className="text-[12px] text-slate-600">
                                    {isTable1Loading ? (
                                        <tr><td colSpan={7} className="py-8 text-center italic">Loading pool...</td></tr>
                                    ) : filteredUdinDocs.length > 0 ? (
                                        filteredUdinDocs.map((doc, idx) => (
                                            <tr key={doc.docId} className="border-b hover:bg-slate-50">
                                                <td className="px-4 py-3 text-center font-bold">{idx + 1}</td>
                                                <td className="px-4 py-3 font-bold text-slate-800">{doc.docType}</td>
                                                <td className="px-4 py-3">{doc.docName}</td>
                                                <td className="px-4 py-3"><span className="bg-green-500 text-white px-2 py-0.5 rounded-full text-[9px]">{doc.udinNo}</span></td>
                                                <td className="px-4 py-3 text-slate-400">{formatTimestamp(doc.uploadOn)}</td>
                                                <td className="px-4 py-3 text-center"><button className="p-1.5 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all"><Eye size={14} /></button></td>
                                                <td className="px-4 py-3 text-center">
                                                    <button
                                                        onClick={() => handleAddFromUDIN(doc)}
                                                        disabled={isLinking}
                                                        className="p-1.5 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all disabled:opacity-50"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan={7} className="py-8 text-center text-slate-400">No matching pool documents.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>


            <div className="bg-[#FFF8E1] border-x border-slate-100 p-4">
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-[#FFB800] hover:bg-[#FFA000] text-[#7B1D1D] px-6 py-3 rounded-lg flex items-center gap-3 cursor-pointer shadow-sm transition-all"
                >
                    <span className="font-bold text-sm">Upload new document. Click on the sign</span>
                    <PlusCircle size={20} />
                </div>
                <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
            </div>

            {/* TABLE 2: APPLICATION SPECIFIC */}
            {selectedAppID && (
                <div className="bg-white rounded-b-2xl shadow-md border border-slate-100 overflow-hidden animate-in fade-in duration-300">
                    <div className="relative bg-blue-700 p-4 flex justify-between items-center overflow-hidden">
                        <div className="absolute inset-0 gradient-shimmer pointer-events-none z-10"></div>
                        <h2 className="text-white font-bold text-sm uppercase relative z-20">Documents For Application Number {appDetail?.applicationNumber || "..."}</h2>
                        <div className="relative w-56 z-20">
                            <Search className="absolute left-3 top-2 w-3.5 h-3.5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search application docs..."
                                value={searchTermApp}
                                onChange={(e) => setSearchTermApp(e.target.value)}
                                className="w-full bg-white/10 border border-white/20 text-white text-xs rounded-md py-1.5 pl-9 outline-none focus:bg-white/20"
                            />
                        </div>
                    </div>

                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-slate-400 text-[10px] font-bold uppercase">Application Number</label>
                                <div className="flex items-center gap-3 h-11 px-4 rounded-lg bg-slate-50 border font-bold text-slate-700 text-sm italic">
                                    <FileCheck size={16} className="text-blue-600" /> {appDetail?.applicationNumber}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-slate-400 text-[10px] font-bold uppercase">Company Name</label>
                                <div className="flex items-center gap-3 h-11 px-4 rounded-lg bg-slate-50 border font-bold text-slate-700 text-sm">
                                    <div className="p-1 bg-blue-600 rounded text-white"><Search size={12} /></div> {appDetail?.companyName}
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto border rounded-xl">
                            <table className="w-full text-left">
                                <thead className="bg-blue-600 text-white text-[10px] font-bold uppercase">
                                    <tr>
                                        <th className="px-4 py-3 text-center border-r border-white/10">Sl.no.</th>
                                        <th className="px-4 py-3 border-r border-white/10">Type</th>
                                        <th className="px-4 py-3 border-r border-white/10">Name</th>
                                        <th className="px-4 py-3 border-r border-white/10">UDIN</th>
                                        <th className="px-4 py-3 border-r border-white/10">Uploaded On</th>
                                        <th className="px-4 py-3 text-center">View</th>
                                        <th className="px-4 py-3 text-center">Delete</th>
                                    </tr>
                                </thead>
                                <tbody className="text-[12px] text-slate-600">
                                    {isTable2Loading ? (
                                        <tr><td colSpan={7} className="py-8 text-center italic">Loading details...</td></tr>
                                    ) : filteredAppDocs.length > 0 ? (
                                        filteredAppDocs.map((doc, idx) => (
                                            <tr key={doc.applicationDocID} className="border-b hover:bg-slate-50">
                                                <td className="px-4 py-3 text-center font-bold">{idx + 1}</td>
                                                <td className="px-4 py-3 font-bold text-slate-800">{doc.documentType}</td>
                                                <td className="px-4 py-3">{doc.documentName}</td>
                                                <td className="px-4 py-3"><span className="bg-green-500 text-white px-2 py-0.5 rounded-full text-[9px]">{appDetail?.udinNumber}</span></td>
                                                <td className="px-4 py-3 text-slate-400">{doc.docUploadOn}</td>
                                                <td className="px-4 py-3 text-center"><button className="p-1.5 bg-blue-100 text-blue-600 rounded-full"><Eye size={14} /></button></td>
                                                <td className="px-4 py-3 text-center"><button onClick={() => handleDelete(doc.applicationDocID)} className="p-1.5 bg-blue-100 text-red-600 rounded-full hover:bg-red-600 hover:text-white transition-all"><Trash2 size={14} /></button></td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan={7} className="py-8 text-center text-slate-400">No application documents linked.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex justify-center pt-2">
                            <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-12 rounded-lg shadow-lg text-xs uppercase tracking-widest transition-all">Generate Declaration</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DocumentUploadHeader;