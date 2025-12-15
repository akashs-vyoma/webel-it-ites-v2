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
    ChevronLeft,
    ChevronRight,
    FileText,
    Calendar
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
        <div className={`flex flex-col ${className}`}>
            <label className="text-[11px] font-bold text-gray-800 mb-1">
                {label}
            </label>
            <div className="flex h-9">
                {/* Icon Box */}
                <div className="w-9 bg-[#484595] flex items-center justify-center text-white shrink-0 rounded-l-sm">
                    {React.cloneElement(icon as React.ReactElement, { size: 16 })}
                </div>
                {/* Input Field */}
                <input
                    type={type}
                    readOnly={readOnly}
                    placeholder={placeholder}
                    className={`
            w-full border border-gray-300 px-3 text-xs text-gray-700 outline-none rounded-r-sm
            focus:border-[#484595] transition-colors
            ${readOnly ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
          `}
                />
            </div>
        </div>
    );
};

// --- Reusable Section Header ---
const SectionHeader: React.FC<{ title: string; icon?: React.ReactNode }> = ({ title, icon }) => (
    <div className="bg-[#484595] text-white py-2 px-4 text-sm font-medium flex items-center gap-2 rounded-t-sm">
        {icon && React.cloneElement(icon as React.ReactElement, { size: 18 })}
        {title}
    </div>
);

const MultiOwnPropertyForm: React.FC = () => {
    return (
        <div className="min-h-screen  p-4 font-sans">
            {/* CHANGED: Removed max-w-[1600px] and added w-full to make it wider */}
            <div className="w-full mx-auto bg-white shadow-sm border border-gray-200">

                {/* MAIN PAGE HEADER */}
                <div className="bg-[#484595] text-white py-3 px-4 text-md font-medium flex items-center gap-2">
                    <FileText size={20} />
                    Generate Multi-Own Property Declaration
                </div>

                <div className="p-4 space-y-6">

                    {/* SECTION 1: PROPERTY DETAILS */}
                    <div>
                        <SectionHeader title="Property Details" icon={<Building2 />} />
                        <div className="border border-t-0 border-gray-200 p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
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

                    {/* SECTION 2: APPLICANTS DETAILS */}
                    <div>
                        <SectionHeader title="Applicants Details" icon={<Users />} />
                        <div className="border border-t-0 border-gray-200 p-4 space-y-6">

                            {/* 2.1 Add Yourself */}
                            <div className="bg-gray-50 border border-gray-200 rounded-sm">
                                <div className="bg-[#5c58a8] text-white py-1.5 px-3 text-xs font-medium flex items-center gap-2">
                                    <Plus size={14} /> Add Yourself As First Applicant
                                </div>
                                <div className="p-4">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                                        <FormInput label="Type*" icon={<User />} placeholder="" />
                                        <FormInput label="Name As Per GSTN*" icon={<User />} placeholder="" />
                                        <FormInput label="Phone Number of Organization*" icon={<Phone />} placeholder="" />
                                        <FormInput label="GSTN*" icon={<CreditCard />} placeholder="GSTN/PAN" />
                                    </div>
                                    <div className="mb-4">
                                        <FormInput label="Address As Per GSTN*" icon={<MapPin />} placeholder="Address" />
                                    </div>
                                    <div className="flex justify-end">
                                        <button className="bg-[#484595] hover:bg-[#3b3880] text-white text-xs font-bold py-1.5 px-4 rounded shadow-sm flex items-center gap-1">
                                            <Plus size={14} /> Add Yourself
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* 2.2 Add Other Applicants */}
                            <div className="bg-gray-50 border border-gray-200 rounded-sm">
                                <div className="bg-[#5c58a8] text-white py-1.5 px-3 text-xs font-medium flex items-center gap-2">
                                    <Users size={14} /> Add Your Other Applicants Details
                                </div>
                                <div className="p-4">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                                        {/* Dropdown Style Mock */}
                                        <div className="flex flex-col">
                                            <label className="text-[11px] font-bold text-gray-800 mb-1">Select Type*</label>
                                            <select className="h-9 w-full border border-gray-300 px-3 text-xs text-gray-700 outline-none rounded-sm focus:border-[#484595]">
                                                <option>Select Type</option>
                                                <option>Individual</option>
                                                <option>Organization</option>
                                            </select>
                                        </div>

                                        <FormInput label="Name*" icon={<User />} placeholder="Name" />
                                        <FormInput label="Phone Number*" icon={<Phone />} placeholder="Mobile" />
                                        <FormInput label="GSTN / PAN*" icon={<CreditCard />} placeholder="GSTN / PAN" />
                                    </div>
                                    <div className="mb-4">
                                        <FormInput label="Address*" icon={<MapPin />} placeholder="Address" />
                                    </div>
                                    <div className="flex justify-end">
                                        <button className="bg-[#8b88cc] hover:bg-[#7a77b8] text-white text-xs font-bold py-1.5 px-4 rounded shadow-sm flex items-center gap-1">
                                            <Users size={14} /> Add Other Applicants
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* 2.3 Applicants Table */}
                            <div className="mt-6">
                                <SectionHeader title="Applicants Details" icon={<FileText />} />
                                <div className="border border-t-0 border-gray-200 p-4 bg-white">

                                    {/* Table Controls */}
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="text-xs text-gray-600 flex items-center gap-1">
                                            Show
                                            <input type="number" defaultValue={10} className="w-12 border border-gray-300 px-1 py-0.5 text-center outline-none" />
                                            entries
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-gray-600">Search:</span>
                                            <input type="text" className="border border-gray-300 px-2 py-1 text-xs outline-none w-40" />
                                        </div>
                                    </div>

                                    {/* Table */}
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-xs text-left border-collapse">
                                            <thead className="bg-[#484595] text-white">
                                                <tr>
                                                    <th className="p-2 border border-white/20 font-medium">Type</th>
                                                    <th className="p-2 border border-white/20 font-medium">Name</th>
                                                    <th className="p-2 border border-white/20 font-medium">Address</th>
                                                    <th className="p-2 border border-white/20 font-medium">Phone Number</th>
                                                    <th className="p-2 border border-white/20 font-medium">GSTN/PAN</th>
                                                    <th className="p-2 border border-white/20 font-medium">Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td colSpan={6} className="p-4 text-center text-gray-500 border border-gray-200 bg-gray-50">
                                                        No data available in table
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Pagination */}
                                    <div className="flex justify-between items-center mt-4">
                                        <div className="text-[10px] text-gray-500">
                                            Showing 0 to 0 of 0 entries
                                        </div>
                                        <div className="flex gap-1">
                                            <button className="px-2 py-1 border border-gray-300 text-[10px] rounded hover:bg-gray-100 disabled:opacity-50">Previous</button>
                                            <button className="px-2 py-1 border border-gray-300 text-[10px] rounded hover:bg-gray-100 disabled:opacity-50">Next</button>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>

                    {/* SECTION 3: APPLICATION DETAILS */}
                    <div>
                        <SectionHeader title="Application Details" icon={<FileText />} />
                        <div className="border border-t-0 border-gray-200 p-4 grid grid-cols-1 md:grid-cols-3 gap-6 items-end">

                            <div className="flex flex-col">
                                <label className="text-[11px] font-bold text-gray-800 mb-1">Select Application Type*</label>
                                <div className="relative">
                                    {/* CHANGED: Added specific options from screenshot */}
                                    <select className="h-9 w-full border border-gray-300 px-3 text-xs text-gray-700 outline-none rounded-sm focus:border-[#484595] appearance-none bg-white">
                                        <option>Select Application Type</option>
                                        <option>DPR of IT & ITeS - vetting - MULTIPARTY</option>
                                        <option>NOC for Renting Out Leased property - MULTIPARTY</option>
                                        <option>Certificate for Tax Exemption - MULTIPARTY</option>
                                        <option>Renewal of NOC Renting out Leased Property - MULTI PARTY</option>
                                    </select>
                                    <ChevronRight className="absolute right-2 top-2.5 text-gray-400 rotate-90 pointer-events-none" size={14} />
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <label className="text-[11px] font-bold text-gray-800 mb-1">Select Application Number*</label>
                                <div className="relative">
                                    <select className="h-9 w-full border border-gray-300 px-3 text-xs text-gray-700 outline-none rounded-sm focus:border-[#484595] appearance-none bg-white">
                                        <option>Select Application Number</option>
                                    </select>
                                    <ChevronRight className="absolute right-2 top-2.5 text-gray-400 rotate-90 pointer-events-none" size={14} />
                                </div>
                            </div>

                            <FormInput label="Year*" icon={<Calendar />} placeholder="Year" />
                        </div>
                    </div>

                    {/* FOOTER BUTTON */}
                    <div className="flex justify-center py-2">
                        <button className="bg-[#5c58a8] hover:bg-[#4a478c] text-white text-xs font-bold py-2 px-6 rounded-full shadow-sm flex items-center gap-2">
                            <div className="bg-white text-[#5c58a8] rounded-full p-0.5">
                                <Search size={10} />
                            </div>
                            Preview Multi-Party Declaration Letter
                        </button>
                    </div>

                </div>

                {/* BOTTOM INSTRUCTION BAR */}
                <div className="bg-[#F8EABB] border-t border-[#EAD596] p-2 px-4 text-[10px] text-gray-800">
                    <span className="font-bold">Instruction:</span> Please Give all the * <span className="font-bold">Information</span> and click on <span className="underline cursor-pointer font-bold">Submit</span>
                </div>

            </div>
        </div>
    );
};

export default MultiOwnPropertyForm;