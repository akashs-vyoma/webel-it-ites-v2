"use client";
import React, { useRef, useState, useEffect } from 'react';
import { PlusCircle, CheckCircle2, ChevronDown, Info, Eye, Trash2, Search, FileCheck } from 'lucide-react';

// Interfaces
interface Project {
    projectID: number;
    projectName: string;
}

interface ApplicationNumber {
    applicationId: number;
    applicationNumber: string;
}

interface UploadedDocument {
    docId: number;
    docType: string;
    docName: string;
    udinNo: string;
    uploadOn: number;
}

const DocumentUploadHeader: React.FC = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // Dropdown States
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProjectID, setSelectedProjectID] = useState<string>("");
    const [selectedProjectName, setSelectedProjectName] = useState<string>("");
    
    const [applications, setApplications] = useState<ApplicationNumber[]>([]);
    const [selectedAppID, setSelectedAppID] = useState<string>("");
    
    // API loading states
    const [isProjectsLoading, setIsProjectsLoading] = useState(true);
    const [isAppsLoading, setIsAppsLoading] = useState(false);
    const [isDocsLoading, setIsDocsLoading] = useState(false);

    // Document Data
    const [uploadedDocs, setUploadedDocs] = useState<UploadedDocument[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    // 1. Fetch Projects on Mount
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

    // 3. Fetch Documents when App Number is Selected
    useEffect(() => {
        if (!selectedAppID) {
            setUploadedDocs([]);
            return;
        }

        const fetchDocs = async () => {
            setIsDocsLoading(true);
            try {
                const response = await fetch('http://115.187.62.16:8005/ITEWBRestAPI/api/application/GetUploadedDocumentDetailsByApplicationTypeID', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        "ownerID": 1,
                        "applicationTypeID": parseInt(selectedProjectID),
                        "userTypeID": 5
                    }),
                });
                const result = await response.json();
                if (result.status === 0) setUploadedDocs(result.data);
            } catch (err) { console.error(err); }
            finally { setIsDocsLoading(false); }
        };
        fetchDocs();
    }, [selectedAppID, selectedProjectID]);

    const formatDate = (ts: number) => {
        if (!ts) return "N/A";
        return new Date(ts).toLocaleString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-4 flex flex-col gap-6 font-sans antialiased">
            
            {/* UNIFIED MAIN CARD */}
            <div className="bg-white rounded-2xl shadow-xl shadow-blue-900/5 border border-slate-100 overflow-hidden">
                
                {/* Neon Blue Header Section */}
                <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                            <label className="text-blue-100 text-[10px] font-bold uppercase tracking-widest ml-1">Application Type</label>
                            <div className="relative group">
                                <select 
                                    value={selectedProjectID}
                                    onChange={(e) => { setSelectedProjectID(e.target.value); setSelectedAppID(""); }}
                                    className="w-full h-11 px-4 rounded-xl bg-white/95 backdrop-blur-sm text-slate-800 font-bold text-sm outline-none appearance-none cursor-pointer transition-all hover:bg-white focus:ring-2 focus:ring-blue-400/50"
                                >
                                    <option value="">{isProjectsLoading ? "Loading..." : "Select Application Type"}</option>
                                    {projects.map((p) => <option key={p.projectID} value={p.projectID}>{p.projectName}</option>)}
                                </select>
                                <ChevronDown className="absolute right-4 top-3.5 w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-blue-100 text-[10px] font-bold uppercase tracking-widest ml-1">Application No</label>
                            <div className="relative group">
                                <select 
                                    value={selectedAppID}
                                    onChange={(e) => setSelectedAppID(e.target.value)}
                                    disabled={!selectedProjectID || isAppsLoading}
                                    className="w-full h-11 px-4 rounded-xl bg-white/95 backdrop-blur-sm text-slate-800 font-bold text-sm outline-none appearance-none cursor-pointer disabled:bg-slate-200/50 disabled:text-slate-400 transition-all hover:bg-white focus:ring-2 focus:ring-blue-400/50"
                                >
                                    <option value="">{isAppsLoading ? "Fetching..." : "Select Application Number"}</option>
                                    {applications.map((app) => <option key={app.applicationId} value={app.applicationId}>{app.applicationNumber}</option>)}
                                </select>
                                <ChevronDown className="absolute right-4 top-3.5 w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Upload Banner Section */}
                <div className="bg-amber-50/50 p-5 border-b border-amber-100/50">
                    <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-amber-400 hover:bg-amber-500 text-amber-950 px-6 py-3 rounded-xl shadow-sm flex items-center justify-between cursor-pointer transition-all active:scale-[0.99]"
                    >
                        <div className="flex items-center gap-3">
                            {selectedFile ? (
                                <><CheckCircle2 size={20} className="text-green-800" /><span className="font-bold text-sm">Selected: {selectedFile.name}</span></>
                            ) : (
                                <><span className="font-bold text-sm">Upload new document. Click on the sign</span><PlusCircle size={18} /></>
                            )}
                        </div>
                        <div className="bg-white/90 p-1.5 rounded-full shadow-inner"><PlusCircle className="text-blue-600" size={20} /></div>
                    </div>
                    <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
                    <div className="mt-3 flex gap-2 text-[11px] text-slate-600 items-start italic">
                        <Info size={14} className="text-blue-600 shrink-0 mt-0.5" />
                        <p>Select both Application Type and Number to view existing records.</p>
                    </div>
                </div>

                {/* DATA TABLE SECTION - Hidden until App ID is selected */}
                {selectedAppID ? (
                    <div className="p-6 space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
                        {/* Heading & View Requirements Link */}
                        <div className="border-b border-slate-100 pb-4">
                            <h2 className="text-blue-600 font-extrabold text-xl tracking-tight uppercase">
                                Already Uploaded Documents In UDIN For {selectedProjectName}
                            </h2>
                            <button className="mt-1.5 text-xs text-slate-500 hover:text-blue-600 font-medium flex items-center gap-1 group">
                                * View required documents for this application 
                                <span className="text-blue-500 font-bold group-hover:underline">Click to View</span>
                            </button>
                        </div>

                        {/* Search & Entry Count Row */}
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                            <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-lg border border-slate-100 text-sm font-semibold text-slate-700">
                                <span>Show</span>
                                <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{uploadedDocs.length}</span>
                                <span>entries found</span>
                            </div>

                            <div className="relative w-full sm:w-72 group">
                                <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                <input 
                                    type="text" 
                                    placeholder="Search by document name..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                                />
                            </div>
                        </div>

                        {/* Table Area */}
                        <div className="border border-slate-100 rounded-xl overflow-hidden">
                            <table className="w-full border-collapse">
                                <thead className="bg-blue-600 text-white">
                                    <tr className="text-[11px] font-bold uppercase tracking-widest text-left">
                                        <th className="px-5 py-4 w-16 text-center border-r border-white/10">Sl.</th>
                                        <th className="px-5 py-4 border-r border-white/10">Doc Type</th>
                                        <th className="px-5 py-4 border-r border-white/10">Doc Name</th>
                                        <th className="px-5 py-4 border-r border-white/10">UDIN</th>
                                        <th className="px-5 py-4 border-r border-white/10">Uploaded On</th>
                                        <th className="px-5 py-4 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white text-[13px] text-slate-600">
                                    {isDocsLoading ? (
                                        <tr><td colSpan={6} className="py-20 text-center italic text-slate-400">Loading document database...</td></tr>
                                    ) : uploadedDocs.length > 0 ? (
                                        uploadedDocs.map((doc, idx) => (
                                            <tr key={doc.docId} className="border-b border-slate-50 hover:bg-blue-50/40 transition-colors group">
                                                <td className="px-5 py-4 text-center font-bold text-slate-400 group-hover:text-blue-600">{idx + 1}</td>
                                                <td className="px-5 py-4 font-bold text-slate-800">{doc.docType || "—"}</td>
                                                <td className="px-5 py-4">{doc.docName || "Unspecified"}</td>
                                                <td className="px-5 py-4">
                                                    {doc.udinNo ? (
                                                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-black border border-green-200">
                                                            {doc.udinNo}
                                                        </span>
                                                    ) : <span className="text-slate-300">N/A</span>}
                                                </td>
                                                <td className="px-5 py-4 font-mono text-[11px] text-slate-400">{formatDate(doc.uploadOn)}</td>
                                                <td className="px-5 py-4">
                                                    <div className="flex justify-center gap-2">
                                                        <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all" title="View"><Eye size={16}/></button>
                                                        <button className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all" title="Delete"><Trash2 size={16}/></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan={6} className="py-20 text-center text-slate-400">No records found.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    /* Placeholder when nothing is selected */
                    <div className="p-20 flex flex-col items-center justify-center text-slate-300 gap-4">
                        <FileCheck size={48} className="opacity-20" />
                        <p className="font-medium text-sm">Please select an Application Number to view existing documents.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DocumentUploadHeader;