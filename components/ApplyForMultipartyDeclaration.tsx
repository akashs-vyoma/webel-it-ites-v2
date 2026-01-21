"use client";
import React, { useState, useEffect } from 'react';
import {
    Building2, MapPin, User, Phone, CreditCard, Users,
    Plus, Search, ChevronDown, FileText, Calendar, Loader2
} from 'lucide-react';
import { callAPI } from './apis/commonAPIs';
import { useAuth } from '@/hooks/useAuth';   


interface FormInputProps {
    label: string;
    icon: React.ReactNode;
    placeholder?: string;
    className?: string;
    type?: string;
    readOnly?: boolean;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({
    label, icon, placeholder = "", className = "", type = "text", readOnly = false, value, onChange
}) => {
    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">{label}</label>
            <div className={`flex h-10 items-center rounded-lg border border-slate-300 overflow-hidden transition-all focus-within:ring-2 focus-within:ring-cyan-400 focus-within:border-cyan-400 ${readOnly ? 'bg-slate-50' : 'bg-white'}`}>
                <div className="w-10 h-full bg-slate-50 border-r border-slate-200 flex items-center justify-center text-slate-500 shrink-0">
                    {React.cloneElement(icon as React.ReactElement, { size: 18 })}
                </div>
                <input
                    type={type}
                    readOnly={readOnly}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className={`w-full h-full px-3 text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400 ${readOnly ? 'bg-slate-50 text-slate-500 cursor-not-allowed' : 'bg-white'}`}
                />
            </div>
        </div>
    );
};

const SectionHeader: React.FC<{ title: string; icon?: React.ReactNode }> = ({ title, icon }) => (
    <div className="bg-slate-100 text-slate-500 py-3 px-5 text-md font-semibold flex items-center gap-2 rounded-t-lg shadow-sm">
        {icon && React.cloneElement(icon as React.ReactElement, { size: 20 })}
        {title}
    </div>
);

const MultiOwnPropertyForm: React.FC<{ isWizard?: boolean }> = ({ isWizard = false }) => {
    const { user, isAuthenticated } = useAuth();
    
    
    const [projects, setProjects] = useState<any[]>([]);
    const [selectedProjectID, setSelectedProjectID] = useState<string>("");
    const [applications, setApplications] = useState<any[]>([]);
    const [selectedAppID, setSelectedAppID] = useState<string>("");
    
    
    const [isProjectsLoading, setIsProjectsLoading] = useState(true);
    const [isAppsLoading, setIsAppsLoading] = useState(false);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const result = await callAPI("/application/GetProjectDetailsByDeptID", { "departmentID": 1 });
                if (result.status === 0) setProjects(result.data);
            } catch (err) {
                console.error("Error fetching projects:", err);
            } finally {
                setIsProjectsLoading(false);
            }
        };
        fetchProjects();
    }, []);

   
    useEffect(() => {
        if (!selectedProjectID || !user?.user_id) {
            setApplications([]);
            return;
        }
        const fetchApps = async () => {
            setIsAppsLoading(true);
            try {
                const result = await callAPI("/application/GetApplicationNumber", { 
                    "entryUser": user?.user_id, 
                    "projectID": parseInt(selectedProjectID) 
                });
                if (result.status === 0) setApplications(result.data);
            } catch (err) {
                console.error("Error fetching applications:", err);
            } finally {
                setIsAppsLoading(false);
            }
        };
        fetchApps();
    }, [selectedProjectID, user?.user_id]);

    return (
        <div className="min-h-screen p-4 md:p-6 font-sans">
            <div className="w-full mx-auto bg-white shadow-xl rounded-xl border border-slate-100 overflow-hidden">
                <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 to-blue-600 text-white py-4 px-6 text-lg font-semibold flex items-center gap-3 shadow-md">
                    <div className="absolute inset-0 gradient-shimmer pointer-events-none"></div>
                    <FileText size={24} className="text-cyan-300" />
                    Generate Multi-Owner Property Declaration
                </div>

                <div className="p-6 space-y-8">
                    {/* SECTION 1: Property Details */}
                    <div className="shadow-sm rounded-lg border border-slate-100">
                        <SectionHeader title="Property Details" icon={<Building2 />} />
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-b-lg">
                            <FormInput label="Name of the Property*" icon={<Building2 />} placeholder="Name" />
                            <FormInput label="Area in sqft." icon={<Building2 />} placeholder="Area in sqft." />
                            <FormInput label="Address of Property*" icon={<MapPin />} placeholder="Address" className="md:col-span-2" />
                        </div>
                    </div>

                    {/* SECTION 2: Owners Details */}
                    <div className="shadow-sm rounded-lg border border-slate-100">
                        <SectionHeader title="Owners Details" icon={<Users />} />
                        <div className="p-6 space-y-8 bg-white rounded-b-lg">

                            {/* 2.1 Add Yourself (Dynamic based on Auth User) */}
                            <div className="bg-slate-50/50 border border-blue-100 rounded-lg overflow-hidden">
                                <div className="bg-blue-100/50 text-blue-800 py-2.5 px-4 text-xs font-bold uppercase tracking-wide flex items-center gap-2 border-b border-blue-100">
                                    <div className="bg-blue-600 text-white p-1 rounded-full"><Plus size={12} /></div>
                                    Add Yourself As First Owner
                                </div>
                                <div className="p-5">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-5">
                                        <FormInput label="Type*" icon={<User />} value={user?.role || ""} readOnly />
                                        <FormInput label="Name As Per GSTN*" icon={<User />} value={user?.account_name || ""} readOnly />
                                        <FormInput label="Phone Number of Organization*" icon={<Phone />}  />
                                        <FormInput label="GSTN*" icon={<CreditCard />} />
                                    </div>
                                    <div className="mb-5">
                                        <FormInput label="Address As Per GSTN*" icon={<MapPin />} value={user?.address || ""} readOnly />
                                    </div>
                                    <div className="flex justify-end">
                                        <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 px-6 rounded-lg shadow-md flex items-center gap-2 transition-all">
                                            <Plus size={16} /> Add Yourself
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* 2.2 Add Other Owners */}
                            <div className="bg-slate-50/50 border border-slate-200 rounded-lg overflow-hidden">
                                <div className="bg-slate-100 text-slate-700 py-2.5 px-4 text-xs font-bold uppercase tracking-wide flex items-center gap-2 border-b border-slate-200">
                                    <div className="bg-slate-600 text-white p-1 rounded-full"><Users size={12} /></div>
                                    Add Your Other Owners Details
                                </div>
                                <div className="p-5">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-5">
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Select Type*</label>
                                            <div className="relative">
                                                <select className="h-10 w-full border border-slate-300 px-3 text-sm font-medium text-slate-700 outline-none rounded-lg focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 bg-white appearance-none cursor-pointer">
                                                    <option value="">Select Type</option>
                                                    <option value="Individual">Individual</option>
                                                    <option value="Organization">Organization</option>
                                                </select>
                                                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                                            </div>
                                        </div>
                                        <FormInput label="Name*" icon={<User />} placeholder="Name" />
                                        <FormInput label="Phone Number*" icon={<Phone />} placeholder="Mobile" />
                                        <FormInput label="GSTN / PAN*" icon={<CreditCard />} placeholder="GSTN / PAN" />
                                    </div>
                                    <div className="mb-5">
                                        <FormInput label="Address*" icon={<MapPin />} placeholder="Address" />
                                    </div>
                                    <div className="flex justify-end">
                                        <button className="bg-slate-600 hover:bg-slate-700 text-white text-xs font-bold py-2.5 px-6 rounded-lg shadow-md flex items-center gap-2 transition-all">
                                            <Users size={16} /> Add Other Owners
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* 2.3 Owners Table */}
                            <div className="mt-8 shadow-sm rounded-lg overflow-hidden border border-slate-200">
                                <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
                                    <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                        <FileText size={16} className="text-blue-600" /> Owners List
                                    </h4>
                                </div>
                                <div className="overflow-x-auto bg-white">
                                    <table className="w-full text-xs text-left border-collapse">
                                        <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
                                            <tr>
                                                <th className="p-3">Type</th>
                                                <th className="p-3">Name</th>
                                                <th className="p-3">Address</th>
                                                <th className="p-3">Phone Number</th>
                                                <th className="p-3">GSTN/PAN</th>
                                                <th className="p-3 text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            <tr>
                                                <td colSpan={6} className="p-8 text-center text-slate-400 italic">No Owners added yet</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 3: APPLICATION DETAILS (Dynamic) */}
                    <div className="shadow-sm rounded-lg border border-slate-100">
                        <SectionHeader title="Application Details" icon={<FileText />} />
                        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-end bg-white rounded-b-lg">

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Select Application Type*</label>
                                <div className="relative">
                                    <select 
                                        value={selectedProjectID}
                                        onChange={(e) => { setSelectedProjectID(e.target.value); setSelectedAppID(""); }}
                                        className="h-10 w-full border border-slate-300 px-3 text-sm font-medium text-slate-700 outline-none rounded-lg focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 bg-white appearance-none cursor-pointer"
                                    >
                                        <option value="">{isProjectsLoading ? "Loading..." : "Select Application Type"}</option>
                                        {projects.map((p) => (
                                            <option key={p.projectID} value={p.projectID}>{p.projectName}</option>
                                        ))}
                                    </select>
                                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Select Application Number*</label>
                                <div className="relative">
                                    <select 
                                        value={selectedAppID}
                                        onChange={(e) => setSelectedAppID(e.target.value)}
                                        disabled={!selectedProjectID || isAppsLoading}
                                        className="h-10 w-full border border-slate-300 px-3 text-sm font-medium text-slate-700 outline-none rounded-lg focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 bg-white appearance-none cursor-pointer disabled:bg-slate-50"
                                    >
                                        <option value="">{isAppsLoading ? "Fetching..." : "Select Application Number"}</option>
                                        {applications.map((app) => (
                                            <option key={app.applicationId} value={app.applicationId}>{app.applicationNumber}</option>
                                        ))}
                                    </select>
                                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                                </div>
                            </div>

                            <FormInput label="Year*" icon={<Calendar />} placeholder="Year" />
                        </div>
                    </div>

                    {/* FOOTER BUTTON */}
                    {!isWizard && (
                        <div className="flex justify-center py-4">
                            <button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-sm font-bold py-3 px-8 rounded-full shadow-lg flex items-center gap-2 transition-all transform active:scale-95">
                                <div className="bg-white/20 p-1 rounded-full"><Search size={14} className="text-white" /></div>
                                Preview Multi-Owner Declaration Letter
                            </button>
                        </div>
                    )}
                </div>

                <div className="bg-[#fcf8e3] border-t border-yellow-100 p-4">
                    <p className="text-xs text-slate-700 text-center">
                        <span className="font-bold text-yellow-700">Instruction:</span> Please Give all the * <span className="font-bold text-slate-900">Information</span> and click on <span className="underline cursor-pointer font-bold text-blue-600 hover:text-blue-700">Submit</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MultiOwnPropertyForm;