"use client";
import React, { useRef, useState, useEffect } from 'react';
// Added missing icons for the new UI snippet
import {
    PlusCircle, CheckCircle2, ChevronDown, Info, Eye, Trash2,
    Search, FileCheck, Plus, FileText, AlertCircle, ChevronRight, Loader2, X
} from 'lucide-react';
import { callAPI } from './apis/commonAPIs';
import NonIndividualUploadDoc from './NonIndividualUploadDoc';
import { useAuth } from '@/hooks/useAuth';
import { getCookie } from '@/utils/cookies';
import DocumentPreviewModal from './DocumentPreviewModal';

// ... (Interfaces remain unchanged)

const DocumentUploadHeader: React.FC<{ isWizard?: boolean, applicationNo?: string, applicationType?: string, category?: string }> = ({ isWizard = false, applicationNo = "", applicationType = "", category = "" }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // NEW STATES FOR REQUIRED DOCUMENTS MODAL
    const [isReqDocModalOpen, setIsReqDocModalOpen] = useState(false);
    const [requiredDocsList, setRequiredDocsList] = useState<any[]>([]);
    const [isReqDocsLoading, setIsReqDocsLoading] = useState(false);

    const [projects, setProjects] = useState<any[]>([]);
    const [selectedProjectID, setSelectedProjectID] = useState<string>("");
    const [selectedProjectName, setSelectedProjectName] = useState<string>("");

    const [applications, setApplications] = useState<any[]>([]);
    const [selectedAppID, setSelectedAppID] = useState<string>("");

    const [isProjectsLoading, setIsProjectsLoading] = useState(true);
    const [isAppsLoading, setIsAppsLoading] = useState(false);
    const [isTable1Loading, setIsTable1Loading] = useState(false);
    const [isTable2Loading, setIsTable2Loading] = useState(false);
    const [isLinking, setIsLinking] = useState(false);

    const [udinDocs, setUdinDocs] = useState<any[]>([]);
    const [appDetail, setAppDetail] = useState<any | null>(null);

    const [searchTermUDIN, setSearchTermUDIN] = useState("");
    const [searchTermApp, setSearchTermApp] = useState("");
    const [role, setRole] = useState<string>("");
    const { user, isAuthenticated } = useAuth();
    const [showDocumentModal, setShowDocumentModal] = useState(false);
    const [document, setDocument] = useState<any | null>(null);
    const [isUploadedDocumentLoading, setIsUploadedDocumentLoading] = useState<any>(false);
    const [isUnassignedDocViewLoading, setIsUnassignedDocViewLoading] = useState<any>(false);
    const [isAssignedDocumentLoading, setIsAssignedDocumentLoading] = useState<any>(false);
    const [isUnassignedDocumentLoading, setIsUnassignedDocumentLoading] = useState<any>(false);

    useEffect(() => {
        if (!isAuthenticated) return;
        setRole(user?.role || "");
    }, [isAuthenticated]);

    // NEW API CALL: Fetch Required Documents
    const fetchRequiredDocs = async () => {
        if (!selectedProjectID) {
            alert("Please select an application type first.");
            return;
        }
        setIsReqDocModalOpen(true);
        setIsReqDocsLoading(true);
        try {
            const result = await callAPI("/application/GetAllProjectDocByProjectID", {
                "projectID": parseInt(selectedProjectID)
            });
            if (result.status === 0) {
                setRequiredDocsList(result.data);
            }
        } catch (err) {
            console.error("Error fetching required docs:", err);
        } finally {
            setIsReqDocsLoading(false);
        }
    };


    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const result = await callAPI("/application/GetProjectDetailsByDeptID", { "departmentID": 1 });
                if (result.status === 0) setProjects(result.data);
                const appType = applicationType || getCookie("application-type");
                setSelectedProjectID(appType);
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
                const result = await callAPI("/application/GetApplicationNumber", { "entryUser": user?.user_id, "projectID": parseInt(selectedProjectID) });
                if (result.status === 0) setApplications(result.data);
                const app = result.data.find((a: any) => a.applicationNumber == applicationNo);
                console.log("app", app);

                const applicationID = app?.applicationId.toString() || getCookie("application_id");
                setSelectedAppID(applicationID);
            } catch (err) { console.error(err); }
            finally { setIsAppsLoading(false); }
        };
        fetchApps();
    }, [selectedProjectID, projects]);

    const fetchApplicationDetails = async () => {
        if (!selectedAppID) return;
        setIsTable2Loading(true);
        try {
            const appID = selectedAppID || getCookie("application_id");
            console.log("selectedAppID", selectedAppID);
            console.log("appID", appID);
            const result = await callAPI("/application/GetApplicationDetailsByApplicationID", { "applicationID": appID });
            if (result?.status == 0 && result?.data?.documents?.length > 0) setAppDetail(result?.data);
            else setAppDetail(null);
        } catch (err) { console.error(err); }
        finally { setIsTable2Loading(false); }
    };

    useEffect(() => {
        if (!selectedAppID) {
            setUdinDocs([]);
            setAppDetail(null);
            return;
        }
        const fetchPoolData = async () => {
            setIsTable1Loading(true);
            try {
                const ownerID = user?.owner_id;
                const userTypeID = user?.user_type_id;
                const result = await callAPI("/application/GetUploadedDocumentDetailsByApplicationTypeIDV1", { "ownerID": ownerID, "applicationTypeID": parseInt(selectedProjectID), "userTypeID": userTypeID });
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

    const handleAddFromUDIN = async (doc: any) => {

        // if (!appDetail || !selectedAppID || isLinking) return;
        if (appDetail?.documents?.some((d: any) => d?.documentName == doc?.docName)) {
            alert("This document is already assigned to the application.");
            return;
        }
        setIsLinking(true);
        try {
            const result = await callAPI("/application/SetAssignUploadedDocByApplicationID", {
                "application_id": parseInt(selectedAppID),
                "doc_id": doc?.docId,
                "application_no": appDetail?.applicationNumber || getCookie("application-no"),
                "quotation_id": doc?.quotationID,
                "udin_no": doc?.udinNo,
                "application_amount": 0,
                "pay_mode": doc?.paymode || "ONLINE",
                "entry_user_id": user?.user_id
            });
            if (result.status === 0) await fetchApplicationDetails();
        } catch (err) { console.error(err); } finally { setIsLinking(false); setIsAssignedDocumentLoading(null); }
    };

    const handleGenerateDeclaration = async () => {
        if (!appDetail) return;
        const targetDoc = appDetail.documents.find((d: any) => d?.documentTypeID === 100) || appDetail?.documents[0];
        if (!targetDoc) return;
        setIsLinking(true);
        try {
            const result = await callAPI("/application/SetAssignUploadedDocByApplicationID", {
                "application_id": parseInt(selectedAppID),
                "doc_id": targetDoc?.applicationDocID,
                "application_no": appDetail?.applicationNumber || getCookie("application-no"),
                "quotation_id": targetDoc?.quotationID || "",
                "udin_no": appDetail?.udinNumber,
                "application_amount": targetDoc?.documentAmount || 0,
                "pay_mode": "ONLINE",
                "entry_user_id": user?.user_id
            });
            if (result?.status == 0) await fetchApplicationDetails();
        } catch (err) { console.error(err); } finally { setIsLinking(false); }
    };

    const handleDelete = async (doc: any) => {

        setIsLinking(true);
        try {
            const result = await callAPI("/application/RemoveApplicationAssignedDoc", {
                "doc_id": doc?.applicationDocID,
                "application_id": parseInt(selectedAppID),
                "entry_user_id": user?.user_id,
                "error_code": 0
            });
            if (result?.status == 0) await fetchApplicationDetails();
        } catch (err) { console.error(err); } finally { setIsLinking(false); setIsUnassignedDocumentLoading(null); }
    };

    const handleView = async (udin: any) => {

        setIsLinking(true);
        try {
            const token = getCookie("authToken");
            const result = await callAPI("/udinDocument/VerifyUdin", {
                "udin": udin,
                "token": token,
            });

            if (result?.status == 0) {
                setDocument(result?.data)
                setShowDocumentModal(true)
            };
        } catch (err) { console.error(err); } finally { setIsLinking(false); setIsUploadedDocumentLoading(null); setIsUnassignedDocViewLoading(null); }
    };

    const filteredUdinDocs = udinDocs?.filter((doc: any) =>
        doc?.docName?.toLowerCase()?.includes(searchTermUDIN?.toLowerCase()) ||
        doc?.docType?.toLowerCase()?.includes(searchTermUDIN?.toLowerCase())
    ) || [];

    const filteredAppDocs = appDetail?.documents?.filter((doc: any) =>
        doc?.documentName?.toLowerCase()?.includes(searchTermApp?.toLowerCase()) ||
        doc?.documentType?.toLowerCase()?.includes(searchTermApp?.toLowerCase())
    ) || [];

    return (
        <div className="w-full max-w-screen mx-auto p-4 flex flex-col font-sans antialiased">

            {/* REQUIRED DOCUMENTS MODAL OVERLAY */}
            {isReqDocModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
                    <div className="w-full max-w-md relative">
                        <button
                            onClick={() => setIsReqDocModalOpen(false)}
                            className="absolute -top-10 right-0 text-white hover:text-slate-300 flex items-center gap-1 text-sm font-bold"
                        >
                            <X size={20} /> Close
                        </button>

                        {/* THE EXTRACTED UI COMPONENT */}
                        <div className="h-fit bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-100">
                            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4">
                                <h3 className="text-white text-sm font-semibold tracking-wide">Required Document</h3>
                            </div>

                            <div className="p-4 bg-slate-50 min-h-[300px] flex flex-col gap-4">
                                {!selectedProjectID ? (
                                    <div className="bg-white rounded-lg p-3 shadow-sm border border-slate-200 flex justify-center items-center h-16">
                                        <span className="text-xs text-slate-400 italic">Select application type to see documents</span>
                                    </div>
                                ) : isReqDocsLoading ? (
                                    <div className="bg-white rounded-lg p-3 shadow-sm border border-slate-200 flex justify-center items-center gap-2 h-16">
                                        <Loader2 className='animate-spin text-slate-500' />
                                        <span className="text-xs text-slate-400 italic">Loading...</span>
                                    </div>
                                ) : (
                                    <div className="max-h-[500px] overflow-y-auto flex flex-col gap-3 pr-1 custom-scrollbar">
                                        {requiredDocsList?.map((doc: any, idx: number) => {
                                            // Dynamic check: Is this required doc already in the application details?
                                            const isUploaded = appDetail?.documents?.some((d: any) =>
                                                d?.documentName?.toLowerCase()?.includes(doc?.project_name?.toLowerCase())
                                            );

                                            return (
                                                <div
                                                    key={idx}
                                                    className={`group relative bg-white rounded-xl p-4 border transition-all duration-200 ${isUploaded ? 'border-green-100 bg-green-50/30' : 'border-slate-200'
                                                        }`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-4">
                                                            <div className={`p-2.5 rounded-lg transition-colors ${isUploaded ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-500'
                                                                }`}>
                                                                <FileText size={20} />
                                                            </div>
                                                            <div>
                                                                <p className={`text-sm font-semibold ${isUploaded ? 'text-green-800' : 'text-slate-800'}`}>
                                                                    {doc?.project_name}
                                                                </p>
                                                                <p className="text-xs text-slate-500 mt-0.5">
                                                                    {isUploaded ? 'Document verified and uploaded' : 'Required format: PDF'}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            {isUploaded ? (
                                                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                                                                    <CheckCircle2 size={14} /> Uploaded
                                                                </div>
                                                            ) : (
                                                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-600 rounded-full text-xs font-bold border border-amber-100">
                                                                    <AlertCircle size={14} /> Pending
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

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
                                    disabled={isWizard}
                                    className="w-full h-11 px-4 rounded-xl bg-white/95 text-slate-800 font-bold text-sm outline-none appearance-none"
                                >
                                    <option value="">{isProjectsLoading ? "Loading..." : "Select Application Type"}</option>
                                    {projects?.map((p: any, idx: number) => <option key={idx} value={p?.projectID}>{p?.projectName}</option>)}
                                </select>
                                <ChevronDown className="absolute right-4 top-3.5 w-4 h-4 text-slate-400" />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-blue-100 text-[10px] font-bold uppercase tracking-widest ml-1">Application No</label>
                            <div className="relative group">
                                <select
                                    value={selectedAppID}
                                    onChange={(e) => {
                                        setSelectedAppID(e.target.value)
                                    }}
                                    disabled={isWizard || !selectedProjectID || isAppsLoading}
                                    className="w-full h-11 px-4 rounded-xl bg-white/95 text-slate-800 font-bold text-sm outline-none appearance-none disabled:bg-slate-200"
                                >
                                    <option value="">{isAppsLoading ? "Fetching..." : "Select Application Number"}</option>
                                    {applications?.map((app: any, idx: number) => <option key={idx} value={app?.applicationId}>{app?.applicationNumber}</option>)}
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
                                {/* UPDATED TRIGGER: Click to View now calls fetchRequiredDocs */}
                                <p className="text-[11px] text-slate-400 mt-1 italic">
                                    * View required documents
                                    <span
                                        onClick={fetchRequiredDocs}
                                        className="text-blue-500 cursor-pointer font-bold underline ml-1"
                                    >
                                        Click to View
                                    </span>
                                </p>
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

                        {/* ... (Pool Table remains same) */}
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
                                        filteredUdinDocs.map((doc: any, idx: number) => (
                                            <tr key={doc?.docId} className="border-b hover:bg-slate-50">
                                                <td className="px-4 py-3 text-center font-bold">{idx + 1}</td>
                                                <td className="px-4 py-3 font-bold text-slate-800">{doc?.docType}</td>
                                                <td className="px-4 py-3">{doc?.docName}</td>
                                                <td className="px-4 py-3"><span className="bg-green-500 text-white px-2 py-0.5 rounded-full text-[9px]">{doc?.udinNo}</span></td>
                                                <td className="px-4 py-3 text-slate-400">{formatTimestamp(doc?.uploadOn)}</td>
                                                <td className="px-4 py-3 text-center"><button onClick={() => { handleView(doc?.udinNo); setIsUploadedDocumentLoading(doc?.docId); }} disabled={isLinking} className={`p-1.5 ${isUploadedDocumentLoading == doc?.docId ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-600"} rounded-full hover:bg-blue-600 hover:text-white transition-all disabled:opacity-70`}>{isUploadedDocumentLoading == doc?.docId ? <Loader2 size={14} className="animate-spin" /> : <Eye size={14} />}</button></td>
                                                <td className="px-4 py-3 text-center">
                                                    <button
                                                        onClick={() => { handleAddFromUDIN(doc); setIsAssignedDocumentLoading(doc?.docId); }}
                                                        disabled={isLinking}
                                                        className={`p-1.5 ${isAssignedDocumentLoading == doc?.docId ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-600"} rounded-full hover:bg-blue-600 hover:text-white transition-all disabled:opacity-70`}
                                                    >
                                                        {isAssignedDocumentLoading == doc?.docId ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
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

            {/* ... (Remaining components for Upload and Table 2 remain unchanged) */}
            <div className="bg-[#FFF8E1] border-x border-slate-100 p-4">
                <div
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#FFB800] hover:bg-[#FFA000] text-[#7B1D1D] px-6 py-3 rounded-lg flex items-center gap-3 cursor-pointer shadow-sm transition-all"
                >
                    <span className="font-bold text-sm">Upload new document. Click on the sign</span>
                    <PlusCircle size={20} />
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-0">
                    <div className='w-full max-w-screen max-h-screen overflow-y-auto rounded-xl'>
                        <NonIndividualUploadDoc docId={""} isWizard={true} onClose={() => setIsModalOpen(false)} />
                    </div>
                </div>
            )}

            {selectedAppID && (
                <div className="bg-white rounded-b-2xl shadow-md border border-slate-100 overflow-hidden animate-in fade-in duration-300">
                    {/* ... (Rest of your existing code for Table 2) */}
                    <div className="relative bg-blue-700 p-4 flex justify-between items-center overflow-hidden">
                        <div className="absolute inset-0 gradient-shimmer pointer-events-none z-10"></div>
                        <h2 className="text-white font-bold text-sm uppercase relative z-20">Documents For Application Number {appDetail?.applicationNumber || getCookie("application_no")}</h2>
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
                                    <FileCheck size={16} className="text-blue-600" /> {appDetail?.applicationNumber || getCookie("application_no")}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-slate-400 text-[10px] font-bold uppercase">{user?.role == "individual" ? "Individual Name" : "Company Name"}</label>
                                <div className="flex items-center gap-3 h-11 px-4 rounded-lg bg-slate-50 border font-bold text-slate-700 text-sm">
                                    <div className="p-1 bg-blue-600 rounded text-white"><Search size={12} /></div> {user?.account_name}
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
                                    ) : filteredAppDocs?.length > 0 ? (
                                        filteredAppDocs?.map((doc: any, idx: number) => (
                                            <tr key={doc?.applicationDocID} className="border-b hover:bg-slate-50">
                                                <td className="px-4 py-3 text-center font-bold">{idx + 1}</td>
                                                <td className="px-4 py-3 font-bold text-slate-800">{doc?.documentType}</td>
                                                <td className="px-4 py-3">{doc?.documentName}</td>
                                                <td className="px-4 py-3"><span className="bg-green-500 text-white px-2 py-0.5 rounded-full text-[9px]">{doc?.udinNumber}</span></td>
                                                <td className="px-4 py-3 text-slate-400">{doc?.docUploadOn}</td>
                                                <td className="px-4 py-3 text-center"><button onClick={() => { handleView(doc?.udinNumber); setIsUnassignedDocViewLoading(doc?.applicationDocID); }} disabled={isLinking || isUnassignedDocViewLoading == doc?.applicationDocID} className={`p-1.5 ${isUnassignedDocViewLoading == doc?.applicationDocID ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-600"} rounded-full hover:bg-blue-600 hover:text-white transition-all disabled:opacity-70`}>{isUnassignedDocViewLoading == doc?.applicationDocID ? <Loader2 size={14} className="animate-spin" /> : <Eye size={14} />}</button></td>
                                                <td className="px-4 py-3 text-center"><button onClick={() => { handleDelete(doc); setIsUnassignedDocumentLoading(doc?.applicationDocID); }} disabled={isLinking || isUnassignedDocumentLoading == doc?.applicationDocID} className={`p-1.5 ${isUnassignedDocumentLoading == doc?.applicationDocID ? "bg-red-600 text-white" : "bg-blue-100 text-red-600"} rounded-full hover:bg-red-600 hover:text-white transition-all disabled:opacity-70`}>{isUnassignedDocumentLoading == doc?.applicationDocID ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}</button></td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan={7} className="py-8 text-center text-slate-400">No documents linked yet.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {!isWizard && <div className="flex justify-center pt-2">
                            <button
                                onClick={handleGenerateDeclaration}
                                disabled={isLinking || !appDetail}
                                className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-12 rounded-lg shadow-lg text-xs uppercase tracking-widest transition-all disabled:opacity-50"
                            >
                                {isLinking ? "Processing..." : "Generate Declaration"}
                            </button>
                        </div>}
                    </div>
                </div>
            )}

            <DocumentPreviewModal showModal={showDocumentModal} setShowModal={setShowDocumentModal} document={document} />
        </div>
    );
};

export default DocumentUploadHeader;