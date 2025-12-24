"use client";
import React, { useState, useEffect } from 'react';
import {
    ChevronDown,
    Calendar,
    CreditCard,
    Mail,
    MapPin,
    Phone,
    User,
    FileText,
    ArrowLeft,
    ArrowRight,
    PlusCircle,
    Info,
    Hash,
    Send,
    X
} from 'lucide-react';

// --- DOCUMENT LOOKUP TABLE ---
// We keep this to map the "Required Documents" to the name fetched from the API
const APPLICATION_DOCUMENTS: Record<string, string[]> = {
    "DPR of IT & ITeS - Vetting - SINGLE PARTY": ["Balance Sheet", "IT Return", "MOA", "Project Report"],
    "NOC for Renting Out Leased property - SINGLE PARTY": ["Trade License of Tenant", "MOA", "Agreement with Tenant", "Mother Deed with Webel"],
    "Certificate for Tax Exemption - SINGLE PARTY": ["Copy Agreement", "Balance sheet", "Letter from NDITA", "Trade License", "MOA"],
    "DPR of IT & ITeS - vetting - MULTIPARTY": ["MultiParty Declaration Letter", "Balance Sheet", "IT Return", "MOA", "Project Report"],
    "NOC for Renting Out Leased property - MULTIPARTY": ["MultiParty Declaration Letter", "Trade License of Tenant", "MOA", "Agreement with Tenant", "Mother Deed with Webel"],
    "Certificate for Tax Exemption - MULTIPARTY": ["MultiParty Declaration Letter", "Copy Agreement", "Balance sheet", "Letter from NDITA", "Trade License", "MOA"],
    "Renewal of NOC Renting out Leased Property - SINGLE PARTY": ["Last Invoice issued by Webel", "Old NOC", "Renewal Deed", "Original Deed", "Trade License of Tenant", "MOA", "Agreement with Tenant", "Mother Deed with Webel"],
    "Renewal of NOC Renting out Leased Property - MULTI PARTY": ["Last Invoice issued by Webel", "Old NOC", "Renewal Deed", "Original Deed", "Trade License of Tenant", "MOA", "Agreement with Tenant", "Mother Deed with Webel"]
};

// Define Interface for API Project
interface Project {
    projectID: number;
    projectName: string; // Adjust this key based on your actual API response
}

const CreateApplicationForm: React.FC = () => {
    const [appType, setAppType] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // API State
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoadingProjects, setIsLoadingProjects] = useState(true);

    // --- API CALL ---
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('http://192.168.0.126:9998/api/application/GetProjectDetailsByDeptID', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "departmentID": 1
                    }),
                });
                const result = await response.json();
                
                // Assuming result.data is the array of projects. 
                // Adjust "result.data" if your API returns the array directly as "result"
                if (result && Array.isArray(result.data)) {
                    setProjects(result.data);
                } else if (Array.isArray(result)) {
                    setProjects(result);
                }
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setIsLoadingProjects(false);
            }
        };

        fetchProjects();
    }, []);

    const requiredDocs = appType ? APPLICATION_DOCUMENTS[appType] || [] : [];

    const handleInitialSubmit = () => {
        setIsModalOpen(true);
    };

    return (
        <div className="w-full min-h-screen p-4 md:p-6 font-sans relative">
            <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* ================= LEFT COLUMN: FORM ================= */}
                <div className="lg:col-span-8 bg-white rounded-xl shadow-xl overflow-hidden border border-slate-100 h-fit">

                    <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-500 p-6">
                        <div className="absolute inset-0 gradient-shimmer pointer-events-none z-10"></div>
                        <h2 className="text-white text-lg font-semibold mb-4 tracking-wide">Create New Application</h2>
                        
                        {/* Dynamic Application Type Dropdown */}
                        <div className="relative">
                            <select 
                                value={appType}
                                onChange={(e) => setAppType(e.target.value)}
                                disabled={isLoadingProjects}
                                className="w-full h-11 pl-4 pr-10 rounded-lg bg-white text-slate-700 font-bold text-sm outline-none focus:ring-4 focus:ring-cyan-500/30 transition-shadow appearance-none cursor-pointer disabled:bg-slate-100"
                            >
                                <option value="">{isLoadingProjects ? "Loading Projects..." : "Select Application Type"}</option>
                                {projects.map((project, index) => (
                                    <option key={index} value={project.projectName}>
                                        {project.projectName}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                                <ChevronDown className="w-5 h-5 text-slate-500" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-700 px-6 py-2">
                        <p className="text-xs text-white font-medium flex items-center gap-2">
                            <Info size={14} className="text-cyan-300" />
                            Information: Select Application Type, will enable other fields
                        </p>
                    </div>

                    {/* --- Form Body --- */}
                    <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <div className="md:col-span-1">
                            <InputGroup 
                                label="GST Number" 
                                icon={<Hash size={18} />} 
                                placeholder="GST Number" 
                                required
                                actionButton={
                                    <button className="bg-[#eec643] hover:bg-[#dcb538] text-slate-900 text-xs font-bold px-4 h-full transition-colors border-l border-yellow-600/20">
                                        Proceed
                                    </button>
                                }
                            />
                        </div>

                        <div className="md:col-span-1">
                            <InputGroup label="PAN Number" icon={<CreditCard size={18} />} placeholder="PAN Number" required />
                        </div>

                        <div className="md:col-span-1">
                            <InputGroup label="Name" icon={<User size={18} />} value="VYOMA INNOVUS GLOBAL PRIVATE LIMITED" readOnly required />
                        </div>

                        <div className="md:col-span-1">
                            <InputGroup label="Phone Number" icon={<Phone size={18} />} value="7667956617" readOnly required />
                        </div>

                        <div className="md:col-span-1">
                            <InputGroup label="Email" icon={<Mail size={18} />} placeholder="Email" />
                        </div>

                        <div className="md:col-span-1">
                            <InputGroup label="Registered Address" icon={<MapPin size={18} />} placeholder="Registered Address" required />
                        </div>

                        <div className="col-span-full border-t border-slate-100 my-2"></div>

                        <div className="md:col-span-1">
                            <InputGroup label="Old NOC No. / Application No." icon={<FileText size={18} />} placeholder="Old NOC No." required />
                        </div>

                        <div className="md:col-span-1">
                            <InputGroup label="Old NOC Date" icon={<Calendar size={18} />} defaultValue="2025-12-16" type="date" required />
                        </div>

                        <div className="col-span-full flex justify-end mt-4">
                            <button 
                                onClick={handleInitialSubmit}
                                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-8 py-3 rounded-lg font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2 active:scale-95"
                            >
                                <Send size={18} />
                                Submit Application
                            </button>
                        </div>
                    </div>
                </div>

                {/* ================= RIGHT COLUMN: REQUIRED DOCUMENT ================= */}
                <div className="lg:col-span-4 h-fit bg-white rounded-xl shadow-xl overflow-hidden border border-slate-100">
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4">
                        <h3 className="text-white text-sm font-semibold tracking-wide">Required Document</h3>
                    </div>

                    <div className="p-4 bg-slate-50 min-h-[300px] flex flex-col gap-4">
                        {!appType ? (
                            <div className="bg-white rounded-lg p-3 shadow-sm border border-slate-200 flex justify-between items-center h-16">
                                <span className="text-xs text-slate-400 italic">No document selected</span>
                            </div>
                        ) : (
                            <div className="max-h-[400px] overflow-y-auto flex flex-col gap-3 pr-1 custom-scrollbar">
                                {requiredDocs.length > 0 ? requiredDocs.map((doc, idx) => (
                                    <div key={idx} className="bg-white rounded-lg p-4 shadow-sm border border-slate-200 flex items-center gap-3 animate-fadeIn">
                                        <div className="bg-black text-white p-1.5 rounded text-xs">
                                            <FileText size={16} />
                                        </div>
                                        <span className="text-sm font-bold text-slate-800">{doc}</span>
                                    </div>
                                )) : (
                                    <div className="text-xs text-slate-500 p-4">No specific documents mapped for this project.</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Verifier Modal implementation remains the same... */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fadeIn">
                    <div className="bg-white w-full max-w-[500px] rounded-xl shadow-2xl overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4 flex justify-between items-center">
                            <h3 className="text-white font-bold text-lg">Verifier Details</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-white/80 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 flex flex-col gap-5">
                            <InputGroup label="Co-Signer Name" icon={<User size={18} />} placeholder="Co-Signer Name" required />
                            <div className="flex justify-end">
                                <button className="bg-blue-600 text-white px-8 py-2.5 rounded-lg font-bold">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- Helper Component for Inputs ---
interface InputGroupProps {
    label: string;
    icon: React.ReactNode;
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    readOnly?: boolean;
    required?: boolean;
    type?: string;
    actionButton?: React.ReactNode;
}

const InputGroup: React.FC<InputGroupProps> = ({ label, icon, placeholder, value, defaultValue, readOnly, required, type = "text", actionButton }) => {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className={`flex items-center rounded-lg border border-slate-300 overflow-hidden h-10 transition-all focus-within:ring-2 focus-within:ring-cyan-400 ${readOnly ? 'bg-slate-100' : 'bg-white'}`}>
                <div className="w-10 h-full bg-slate-100 border-r border-slate-200 flex items-center justify-center text-slate-500">{icon}</div>
                <input
                    type={type}
                    value={readOnly ? value : undefined}
                    defaultValue={!readOnly ? (defaultValue || value) : undefined}
                    readOnly={readOnly}
                    placeholder={placeholder}
                    className={`flex-1 px-3 text-sm font-medium outline-none h-full ${readOnly ? 'bg-slate-100 text-slate-500' : 'bg-white'}`}
                />
                {actionButton && <div className="h-full">{actionButton}</div>}
            </div>
        </div>
    );
};

export default CreateApplicationForm;