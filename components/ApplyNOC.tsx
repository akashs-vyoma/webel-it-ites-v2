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
    Hash,
    Send,
    X,
    Building,
    Layers,
    Maximize,
    Activity,
    DollarSign,
    Info
} from 'lucide-react';

// --- DOCUMENT LOOKUP TABLE ---
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

// --- DROPDOWN OPTIONS ---
const TENANT_ACTIVITY_OPTIONS = [
    "IT&ITes Activity",
    "Non IT&ITes Activity (Commercial-Resturant Activity Only)",
    "Non IT&ITes Activity"
];

interface Project {
    projectID: number;
    projectName: string;
}

const CreateApplicationForm: React.FC = () => {
    const [appType, setAppType] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoadingProjects, setIsLoadingProjects] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('http://115.187.62.16:8005/ITEWBRestAPI/api/application/GetProjectDetailsByDeptID', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ "departmentID": 1 }),
                });
                const result = await response.json();
                if (result && Array.isArray(result.data)) setProjects(result.data);
                else if (Array.isArray(result)) setProjects(result);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setIsLoadingProjects(false);
            }
        };
        fetchProjects();
    }, []);

    const requiredDocs = appType ? APPLICATION_DOCUMENTS[appType] || [] : [];

    const isVetting = appType.toLowerCase().includes("vetting");
    const isRenting = appType.toLowerCase().includes("renting out") && !appType.toLowerCase().includes("renewal");
    const isTax = appType.toLowerCase().includes("tax exemption");
    const isRenewal = appType.toLowerCase().includes("renewal");

    // REUSABLE SUBMIT BUTTON (Matches Header Gradient, No Neon Effect)
    const SubmitButton = ({ onClick, label }: { onClick?: () => void, label: string }) => (
        <button 
            onClick={onClick}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-8 py-2.5 rounded-lg font-bold shadow-md transition-all flex items-center gap-2 active:scale-95"
        >
            <Send size={18} />
            {label}
        </button>
    );

    return (
        <div className="w-full min-h-screen p-4 md:p-6 font-sans relative  text-slate-900">
            <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* ================= LEFT COLUMN: FORM ================= */}
                <div className="lg:col-span-8 bg-white rounded-xl shadow-xl overflow-hidden border border-slate-100 h-fit">
                    
                    <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-500 p-6">
                        <h2 className="text-white text-lg font-semibold mb-4 tracking-wide uppercase">
                            {appType || "Create New Application"}
                        </h2>
                        <div className="relative">
                            <select 
                                value={appType}
                                onChange={(e) => setAppType(e.target.value)}
                                disabled={isLoadingProjects}
                                className="w-full h-11 pl-4 pr-10 rounded-lg bg-white text-slate-700 font-bold text-sm outline-none focus:ring-4 focus:ring-cyan-500/30 transition-shadow appearance-none cursor-pointer disabled:bg-slate-100"
                            >
                                <option value="">{isLoadingProjects ? "Loading Projects..." : "Select Application Type"}</option>
                                {projects.map((project, index) => (
                                    <option key={index} value={project.projectName}>{project.projectName}</option>
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

                    <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        
                        <InputGroup label="PAN Number" icon={<CreditCard size={18} />} placeholder="PAN Number" required />
                        <InputGroup label="Name" icon={<User size={18} />} placeholder="Name" required />
                        <InputGroup label="Phone Number" icon={<Phone size={18} />} placeholder="Phone Number" required />
                        <InputGroup label="Email" icon={<Mail size={18} />} placeholder="Email" />
                        <div className="md:col-span-2">
                            <InputGroup label="Registered Address" icon={<MapPin size={18} />} placeholder="Registered Address" required />
                        </div>

                        {isVetting && (
                            <div className="md:col-span-2">
                                <InputGroup label="Site Address" icon={<MapPin size={18} />} placeholder="Site Address" required />
                            </div>
                        )}

                        {(isRenting || isRenewal) && (
                            <>
                                <InputGroup label="Rentable Area in Sqft (Super Built Up Area)" icon={<Maximize size={18} />} placeholder="Area (in Sqft)" required />
                                <InputGroup label="Space Number" icon={<Layers size={18} />} placeholder="Space No." required />
                                <InputGroup label="Floor No." icon={<Building size={18} />} placeholder="Floor No." required />
                                <InputGroup label="Plot No." icon={<Hash size={18} />} placeholder="Plot No." required />
                                <InputGroup label="Block No." icon={<Building size={18} />} placeholder="Block No." required />
                            </>
                        )}

                        {isRenewal && (
                            <>
                                <InputGroup label="Old NOC No. / Application No." icon={<FileText size={18} />} placeholder="Old NOC No." required />
                                <InputGroup label="Old NOC Date" icon={<Calendar size={18} />} type="date" required />
                                <InputGroup label="Old Agreement Tenure (Effective From)" icon={<Calendar size={18} />} type="date" required />
                                <InputGroup label="Old Agreement End Date" icon={<Calendar size={18} />} type="date" required />
                                <InputGroup label="Amount Paid till (Rs.)" icon={<DollarSign size={18} />} placeholder="Amount Paid..." required />
                                <InputGroup label="Renewal From Date" icon={<Calendar size={18} />} type="date" required />
                                <InputGroup label="Renewal To Date" icon={<Calendar size={18} />} type="date" required />
                                <InputGroup label="Total Payment made" icon={<DollarSign size={18} />} placeholder="Total Payment" required />
                            </>
                        )}

                        {(isRenting || isRenewal) && (
                            <>
                                <InputGroup label="Agreement Tenure (Effective From)" icon={<Calendar size={18} />} type="date" required />
                                {isRenting && <InputGroup label="Agreement End Date" icon={<Calendar size={18} />} type="date" required />}
                                <InputGroup label="Tenant Name" icon={<User size={18} />} placeholder="Tenant Name" required />
                                <InputGroup label="Tenant GSTN No." icon={<Hash size={18} />} placeholder="Tenant GSTN No" required />
                                <InputGroup label="Tenant PAN No." icon={<CreditCard size={18} />} placeholder="Tenant PAN No" required />
                                
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                                        Tenant Activity <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <select className="w-full h-10 px-3 pr-10 rounded-lg border border-slate-300 text-sm font-bold outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-blue-400 bg-white">
                                            <option value="">Select Tenant Activity</option>
                                            {TENANT_ACTIVITY_OPTIONS.map((opt, i) => (
                                                <option key={i} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                                            <ChevronDown size={16} className="text-slate-500" />
                                        </div>
                                    </div>
                                </div>

                                <InputGroup label="Building Area in Sqft" icon={<Maximize size={18} />} placeholder="Building Area In Sqft" required />
                                <div className="md:col-span-2">
                                    <InputGroup label="Commercial Area On Rent (Other than IT/ITeS Activity)" icon={<Maximize size={18} />} placeholder="Commercial Area On Rent In Sqft" />
                                </div>
                                <p className="md:col-span-2 text-[10px] text-slate-600 font-bold italic mt-[-10px]">
                                    Permission fees will be charged @Rs.3/sqft. till the expiry of the Rental Agreement/Surrender of the space by the tenant
                                </p>
                            </>
                        )}

                        {isTax && (
                            <>
                                <InputGroup label="Rentable Area In Sqft (Super Built-Up Area)" icon={<Maximize size={18} />} placeholder="Area (In Sqft)" required />
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Tax Service Authority <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <select className="w-full h-10 px-3 pr-10 rounded-lg border border-slate-300 text-sm font-bold outline-none appearance-none bg-white">
                                            <option>Select Tax Service Authority</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                                            <ChevronDown size={16} />
                                        </div>
                                    </div>
                                </div>
                                <InputGroup label="Address of Premises/Building/Plot of Land" icon={<MapPin size={18} />} placeholder="Address" required />
                                <InputGroup label="Total space used by the applicant/tenant" icon={<Maximize size={18} />} placeholder="Total space" required />
                                <InputGroup label="Break up of built up space vis-à-vis number of occupant company" icon={<Layers size={18} />} placeholder="Break up details" required />
                                <InputGroup label="Description of IT / ITES operation of the occupant" icon={<Activity size={18} />} placeholder="Description" required />
                                <div className="md:col-span-2">
                                    <InputGroup label="Total used for IT/ITeS activities" icon={<Building size={18} />} placeholder="Total used" required />
                                </div>
                            </>
                        )}

                        <div className="md:col-span-2 mt-4 pt-4 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-green-700 font-bold text-sm">
                                Your Payable amount will be Rs.70800 <span className="text-xs font-normal">(*UDIN charges will be paid extra)</span>
                            </p>
                            <SubmitButton onClick={() => setIsModalOpen(true)} label="Submit Application" />
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
                            <div className="bg-white rounded-lg p-3 shadow-sm border border-slate-200 flex justify-center items-center h-16">
                                <span className="text-xs text-slate-400 italic">Select application type to see documents</span>
                            </div>
                        ) : (
                            <div className="max-h-[600px] overflow-y-auto flex flex-col gap-3 pr-1 custom-scrollbar">
                                {requiredDocs.map((doc, idx) => (
                                    <div key={idx} className="bg-white rounded-lg p-4 shadow-sm border border-slate-200 flex items-center gap-3 animate-fadeIn">
                                        <div className="bg-blue-600 text-white p-1.5 rounded text-xs">
                                            <FileText size={16} />
                                        </div>
                                        <span className="text-sm font-bold text-slate-800">{doc}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal for Verifier */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
                    <div className="bg-white w-full max-w-[500px] rounded-xl shadow-2xl overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4 flex justify-between items-center">
                            <h3 className="text-white font-bold text-lg">Verification Details</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-white/80 hover:text-white"><X size={20} /></button>
                        </div>
                        <div className="p-6 flex flex-col gap-5">
                            <InputGroup label="Verifier Name" icon={<User size={18} />} placeholder="Enter Name" required />
                            <div className="flex justify-end">
                                <SubmitButton label="Confirm Submission" />
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
    required?: boolean;
    type?: string;
}

const InputGroup: React.FC<InputGroupProps> = ({ label, icon, placeholder, required, type = "text" }) => {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="flex items-center rounded-lg border border-slate-300 overflow-hidden h-10 transition-all focus-within:ring-2 focus-within:ring-blue-400 bg-white shadow-sm">
                <div className="w-10 h-full bg-slate-100 border-r border-slate-200 flex items-center justify-center text-slate-500">
                    {icon}
                </div>
                <input
                    type={type}
                    placeholder={placeholder}
                    className="flex-1 px-3 text-sm font-bold outline-none h-full bg-white text-slate-800 placeholder:text-slate-400"
                />
            </div>
        </div>
    );
};

export default CreateApplicationForm;