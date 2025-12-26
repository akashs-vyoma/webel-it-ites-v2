"use client";
import React from 'react';
import {
    Building2,
    MapPin,
    User,
    Phone,
    CreditCard,
    Users,
    Plus,
    Search,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    FileText,
    Calendar,
    Trash2
} from 'lucide-react';

// --- Reusable Input Component to match the design ---
interface FormInputProps {
    label: string;
    icon: React.ReactNode;
    placeholder?: string;
    className?: string;
    type?: string;
    readOnly?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
    label,
    icon,
    placeholder = "",
    className = "",
    type = "text",
    readOnly = false
}) => {
    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                {label}
            </label>
            <div className={`flex h-10 items-center rounded-lg border border-slate-300 overflow-hidden transition-all focus-within:ring-2 focus-within:ring-cyan-400 focus-within:border-cyan-400 ${readOnly ? 'bg-slate-50' : 'bg-white'}`}>
                {/* Icon Box */}
                <div className="w-10 h-full bg-slate-50 border-r border-slate-200 flex items-center justify-center text-slate-500 shrink-0">
                    {React.cloneElement(icon as React.ReactElement, {})}
                </div>
                {/* Input Field */}
                <input
                    type={type}
                    readOnly={readOnly}
                    placeholder={placeholder}
                    className={`
                        w-full h-full px-3 text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400
                        ${readOnly ? 'bg-slate-50 text-slate-500 cursor-not-allowed' : 'bg-white'}
                    `}
                />
            </div>
        </div>
    );
};

// --- Reusable Section Header ---
const SectionHeader: React.FC<{ title: string; icon?: React.ReactNode }> = ({ title, icon }) => (
    <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 px-5 text-sm font-semibold flex items-center gap-2 rounded-t-lg shadow-sm">
        {icon && React.cloneElement(icon as React.ReactElement, {})}
        {title}
    </div>
);

const MultiOwnPropertyForm: React.FC = () => {
    return (
        <div className="min-h-screen  p-4 md:p-6 font-sans">
            <div className="w-full mx-auto bg-white shadow-xl rounded-xl border border-slate-100 overflow-hidden">

                <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 to-blue-600 text-white py-4 px-6 text-lg font-semibold flex items-center gap-3 shadow-md">

                    {/* SHIMMER OVERLAY */}
                    <div className="absolute inset-0 gradient-shimmer pointer-events-none"></div>
                    <FileText size={24} className="text-cyan-300" />
                    Generate Multi-Owner Property Declaration
                </div>

                <div className="p-6 space-y-8">

                    <div className="shadow-sm rounded-lg border border-slate-100">
                        <SectionHeader title="Property Details" icon={<Building2 />} />
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-b-lg">
                            <FormInput
                                label="Name of the Property*"
                                icon={<Building2 />}
                                placeholder="Name"
                            />
                            <FormInput
                                label="Area in sqft."
                                icon={<Building2 />}
                                placeholder="Area in sqft."
                            />
                            <FormInput
                                label="Address of Property*"
                                icon={<MapPin />}
                                placeholder="Address"
                                className="md:col-span-2"
                            />
                        </div>
                    </div>

                    {/* SECTION 2: OwnerS DETAILS */}
                    <div className="shadow-sm rounded-lg border border-slate-100">
                        <SectionHeader title="Owners Details" icon={<Users />} />
                        <div className="p-6 space-y-8 bg-white rounded-b-lg">

                            {/* 2.1 Add Yourself */}
                            <div className="bg-slate-50/50 border border-blue-100 rounded-lg overflow-hidden">
                                <div className="bg-blue-100/50 text-blue-800 py-2.5 px-4 text-xs font-bold uppercase tracking-wide flex items-center gap-2 border-b border-blue-100">
                                    <div className="bg-blue-600 text-white p-1 rounded-full"><Plus size={12} /></div>
                                    Add Yourself As First Owner
                                </div>
                                <div className="p-5">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-5">
                                        <FormInput label="Type*" icon={<User />} placeholder="" />
                                        <FormInput label="Name As Per GSTN*" icon={<User />} placeholder="" />
                                        <FormInput label="Phone Number of Organization*" icon={<Phone />} placeholder="" />
                                        <FormInput label="GSTN*" icon={<CreditCard />} placeholder="GSTN/PAN" />
                                    </div>
                                    <div className="mb-5">
                                        <FormInput label="Address As Per GSTN*" icon={<MapPin />} placeholder="Address" />
                                    </div>
                                    <div className="flex justify-end">
                                        <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 px-6 rounded-lg shadow-md shadow-blue-500/20 flex items-center gap-2 transition-all">
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
                                        {/* Dropdown Style Mock */}
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Select Type*</label>
                                            <div className="relative">
                                                <select className="h-10 w-full border border-slate-300 px-3 text-sm font-medium text-slate-700 outline-none rounded-lg focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 bg-white appearance-none cursor-pointer">
                                                    <option>Select Type</option>
                                                    <option>Individual</option>
                                                    <option>Organization</option>
                                                </select>
                                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                                    <ChevronDown size={16} className="text-slate-500" />
                                                </div>
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

                                    {/* Table Controls */}
                                    <div className="flex items-center gap-4">
                                        <div className="text-xs text-slate-500 flex items-center gap-2">
                                            Show
                                            <select className="border border-slate-300 rounded bg-white px-1 py-0.5 text-xs outline-none cursor-pointer">
                                                <option>10</option>
                                                <option>25</option>
                                            </select>
                                            entries
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-slate-500">Search:</span>
                                            <input type="text" className="border border-slate-300 rounded px-2 py-1 text-xs outline-none w-40 focus:border-blue-500" placeholder="Search..." />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-0 bg-white">
                                    {/* Table */}
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-xs text-left border-collapse">
                                            <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
                                                <tr>
                                                    <th className="p-3 font-semibold">Type</th>
                                                    <th className="p-3 font-semibold">Name</th>
                                                    <th className="p-3 font-semibold">Address</th>
                                                    <th className="p-3 font-semibold">Phone Number</th>
                                                    <th className="p-3 font-semibold">GSTN/PAN</th>
                                                    <th className="p-3 font-semibold text-center">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100">
                                                <tr>
                                                    <td colSpan={6} className="p-8 text-center text-slate-400 italic">
                                                        No Owners added yet
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Pagination */}
                                    <div className="flex justify-between items-center p-4 border-t border-slate-100 bg-slate-50/50">
                                        <div className="text-[11px] text-slate-500 font-medium">
                                            Showing 0 to 0 of 0 entries
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="px-3 py-1.5 border border-slate-200 bg-white text-xs font-medium text-slate-600 rounded hover:bg-slate-50 disabled:opacity-50 transition-colors">Previous</button>
                                            <button className="px-3 py-1.5 border border-slate-200 bg-white text-xs font-medium text-slate-600 rounded hover:bg-slate-50 disabled:opacity-50 transition-colors">Next</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* SECTION 3: APPLICATION DETAILS */}
                    <div className="shadow-sm rounded-lg border border-slate-100">
                        <SectionHeader title="Application Details" icon={<FileText />} />
                        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-end bg-white rounded-b-lg">

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Select Application Type*</label>
                                <div className="relative">
                                    <select className="h-10 w-full border border-slate-300 px-3 text-sm font-medium text-slate-700 outline-none rounded-lg focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 bg-white appearance-none cursor-pointer">
                                        <option>Select Application Type</option>
                                        <option>DPR of IT & ITeS - vetting - MULTIPARTY</option>
                                        <option>NOC for Renting Out Leased property - MULTIPARTY</option>
                                        <option>Certificate for Tax Exemption - MULTIPARTY</option>
                                        <option>Renewal of NOC Renting out Leased Property - MULTI PARTY</option>
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <ChevronDown size={16} className="text-slate-500" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Select Application Number*</label>
                                <div className="relative">
                                    <select className="h-10 w-full border border-slate-300 px-3 text-sm font-medium text-slate-700 outline-none rounded-lg focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 bg-white appearance-none cursor-pointer">
                                        <option>Select Application Number</option>
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <ChevronDown size={16} className="text-slate-500" />
                                    </div>
                                </div>
                            </div>

                            <FormInput label="Year*" icon={<Calendar />} placeholder="Year" />
                        </div>
                    </div>

                    {/* FOOTER BUTTON */}
                    <div className="flex justify-center py-4">
                        <button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-sm font-bold py-3 px-8 rounded-full shadow-lg shadow-cyan-500/30 flex items-center gap-2 transition-all transform active:scale-95">
                            <div className="bg-white/20 p-1 rounded-full">
                                <Search size={14} className="text-white" />
                            </div>
                            Preview Multi-Owner Declaration Letter
                        </button>
                    </div>

                </div>

                {/* BOTTOM INSTRUCTION BAR (Light Yellow Theme) */}
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