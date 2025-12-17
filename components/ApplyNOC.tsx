"use client";
import React, { useState } from 'react';
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
    Send
} from 'lucide-react';

const CreateApplicationForm: React.FC = () => {
    // Mock state for dropdown
    const [appType, setAppType] = useState("");

    return (
        <div className="w-full min-h-screen  p-4 md:p-6 font-sans">
            <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">

        
                <div className="lg:col-span-8 bg-white rounded-xl shadow-xl overflow-hidden border border-slate-100 h-fit">

                    <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-500 p-6">
    
    {/* SHIMMER LAYER */}
    <div className="absolute inset-0 gradient-shimmer pointer-events-none z-10"></div>
                        <h2 className="text-white text-lg font-semibold mb-4 tracking-wide">Create New Application</h2>
                        
                        {/* Application Type Dropdown */}
                        <div className="relative">
                            <select 
                                value={appType}
                                onChange={(e) => setAppType(e.target.value)}
                                className="w-full h-11 pl-4 pr-10 rounded-lg bg-white text-slate-700 font-bold text-sm outline-none focus:ring-4 focus:ring-cyan-500/30 transition-shadow appearance-none cursor-pointer"
                            >
                                <option value="">Select Application Type</option>
                                <option value="1">NOC for Renting Out Leased property</option>
                                <option value="2">DPR of IT & ITeS - Vetting</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                                <ChevronDown className="w-5 h-5 text-slate-500" />
                            </div>
                        </div>
                    </div>

                    {/* Info Strip (Dark Blue instead of Purple) */}
                    <div className="bg-blue-700 px-6 py-2">
                        <p className="text-xs text-white font-medium flex items-center gap-2">
                            <Info size={14} className="text-cyan-300" />
                            Information: Select Application Type, will enable other fields
                        </p>
                    </div>

                    {/* --- Form Body --- */}
                    <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

                        {/* GST Number (Editable) */}
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

                        {/* PAN Number (Editable) */}
                        <div className="md:col-span-1">
                            <InputGroup label="PAN Number" icon={<CreditCard size={18} />} placeholder="PAN Number" required />
                        </div>

                        {/* Name (Read Only) */}
                        <div className="md:col-span-1">
                            <InputGroup 
                                label="Name" 
                                icon={<User size={18} />} 
                                value="VYOMA INNOVUS GLOBAL PRIVATE LIMITED" 
                                readOnly 
                                required 
                            />
                        </div>

                        {/* Phone Number (Read Only) */}
                        <div className="md:col-span-1">
                            <InputGroup 
                                label="Phone Number" 
                                icon={<Phone size={18} />} 
                                value="7667956617" 
                                readOnly 
                                required 
                            />
                        </div>

                        {/* Email (Editable) */}
                        <div className="md:col-span-1">
                            <InputGroup label="Email" icon={<Mail size={18} />} placeholder="Email" />
                        </div>

                        {/* Registered Address (Editable) */}
                        <div className="md:col-span-1">
                            <InputGroup label="Registered Address" icon={<MapPin size={18} />} placeholder="Registered Address" required />
                        </div>

                        <div className="col-span-full border-t border-slate-100 my-2"></div>

                        {/* Old NOC No (Editable) */}
                        <div className="md:col-span-1">
                            <InputGroup label="Old NOC No. / Application No. (If Anumati Portal)" icon={<FileText size={18} />} placeholder="Old NOC No. / Application No." required />
                        </div>

                        {/* Old NOC Date (Editable) */}
                        <div className="md:col-span-1">
                            <InputGroup label="Old NOC Date / Application Date (If Anumati Portal)" icon={<Calendar size={18} />} defaultValue="2025-12-16" type="date" required />
                        </div>

                        {/* Old Agreement Tenure (Editable) */}
                        <div className="md:col-span-1">
                            <InputGroup label="Old Agreement Tenure (Effective From)" icon={<Calendar size={18} />} defaultValue="2025-12-16" type="date" required />
                        </div>

                        {/* Old Agreement End Date (Editable) */}
                        <div className="md:col-span-1">
                            <InputGroup label="Old Agreement End Date" icon={<Calendar size={18} />} defaultValue="2025-12-16" type="date" required />
                        </div>

                        <div className="col-span-full border-t border-slate-100 my-2"></div>

                        {/* Amount Paid till (Editable) */}
                        <div className="md:col-span-1">
                            <InputGroup label="Amount Paid till (Rs.)" icon={<span className="font-bold text-lg">₹</span>} placeholder="Amount Paid till..." required />
                        </div>

                        {/* Last payment made on (Editable) */}
                        <div className="md:col-span-1">
                            <InputGroup label="Last payment made on" icon={<Calendar size={18} />} defaultValue="2025-12-16" type="date" required />
                        </div>

                         {/* Total Payment (Editable) */}
                         <div className="col-span-full">
                            <InputGroup label="Total Payment made till date against sqft from the Renewal Start Date (with GST) (Rs.)" icon={<span className="font-bold text-lg">₹</span>} placeholder="Total Payment" required />
                        </div>

                        {/* Submit Button */}
                        <div className="col-span-full flex justify-end mt-4">
                            <button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-8 py-3 rounded-lg font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2 active:scale-95">
                                <Send size={18} />
                                Submit Application
                            </button>
                        </div>
                    </div>

                    {/* Footer Instruction (Left Column) */}
                    <div className="bg-[#eec643] px-6 py-3 border-t border-yellow-200">
                        <p className="text-[11px] text-slate-900 leading-snug">
                            <span className="font-bold">Instruction:</span> Please select <span className="font-bold">Application Type</span> from the dropdown, will show the required document for this application on the right side window. Enter <span className="font-bold">"CIN Number"</span> of your company & click on <span className="font-bold underline">Proceed Button</span>. Fill The other Details and Submit Application, Will generate <span className="font-bold">Application Number</span>.
                        </p>
                    </div>
                </div>

                {/* ================= RIGHT COLUMN: REQUIRED DOCUMENT (4 Columns) ================= */}
                <div className="lg:col-span-4 h-fit bg-white rounded-xl shadow-xl overflow-hidden border border-slate-100">
                    
                    {/* Header (Neon Blue Gradient) */}
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4">
                        <h3 className="text-white text-sm font-semibold tracking-wide">Required Document</h3>
                    </div>

                    <div className="p-4 bg-slate-50 min-h-[300px] flex flex-col gap-4">
                        
                        {/* Carousel Controls */}
                        <div className="bg-white rounded-lg p-3 shadow-sm border border-slate-200 flex justify-between items-center h-16">
                             <button className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                                <ArrowLeft size={20} />
                             </button>
                             <span className="text-xs text-slate-400 italic">No document selected</span>
                             <button className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                                <ArrowRight size={20} />
                             </button>
                        </div>

                        {/* Upload Missing Document Bar */}
                        <div className="bg-[#eec643] p-3 rounded-lg shadow-sm border border-yellow-400/30 group cursor-pointer hover:bg-[#dcb538] transition-colors">
                            <div className="flex justify-between items-center">
                                <div className="text-slate-900 text-xs font-bold">
                                    Upload Missing document click on the <PlusCircle size={14} className="inline mx-1" /> Sign
                                </div>
                                <div className="bg-white rounded-full p-0.5 text-blue-600 shadow-sm group-hover:scale-110 transition-transform">
                                    <PlusCircle size={18} />
                                </div>
                            </div>
                        </div>

                        {/* Right Column Instructions */}
                        <div className="bg-[#fcf8e3] p-3 rounded-lg border border-yellow-100">
                             <p className="text-[10px] text-slate-700 leading-relaxed">
                                <span className="font-bold text-slate-900">Instruction:</span> Please select <span className="font-bold">Application Type</span> from the dropdown, will show the required document for this application on the above selection. If the Document is not uploaded, click on the <span className="font-bold">Upload Document Link</span>.
                             </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

// --- Helper Component for Inputs ---
interface InputGroupProps {
    label: string;
    icon: React.ReactNode;
    placeholder?: string;
    value?: string;
    defaultValue?: string; // Added defaultValue
    readOnly?: boolean;
    required?: boolean;
    type?: string;
    actionButton?: React.ReactNode;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Added onChange type
}

const InputGroup: React.FC<InputGroupProps> = ({ 
    label, 
    icon, 
    placeholder, 
    value, 
    defaultValue, 
    readOnly, 
    required, 
    type = "text", 
    actionButton,
    onChange 
}) => {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide flex gap-0.5">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className={`flex items-center rounded-lg border border-slate-300 overflow-hidden h-10 transition-all focus-within:ring-2 focus-within:ring-cyan-400 focus-within:border-cyan-400 ${readOnly ? 'bg-slate-100' : 'bg-white'}`}>
                
                {/* Icon Box */}
                <div className="w-10 h-full bg-slate-100 border-r border-slate-200 flex items-center justify-center text-slate-500">
                    {icon}
                </div>

                {/* Input Field */}
                <input
                    type={type}
                    // LOGIC FIX: If readOnly is true, use 'value'. If not, use 'defaultValue' (unless controlled explicitly)
                    // This prevents the "value without onChange" warning for editable fields
                    value={readOnly ? value : undefined}
                    defaultValue={!readOnly ? (defaultValue || value) : undefined}
                    readOnly={readOnly}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`flex-1 px-3 text-sm font-medium outline-none text-slate-700 placeholder:text-slate-400 h-full ${readOnly ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : 'bg-white'}`}
                />

                {/* Optional Action Button (like Proceed) */}
                {actionButton && (
                    <div className="h-full">
                        {actionButton}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateApplicationForm;