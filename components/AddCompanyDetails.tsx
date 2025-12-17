"use client"
import React, { useState } from 'react';
import { Building2, CreditCard, MapPin, FileText, Save, CheckCircle2 } from 'lucide-react';

const AddCompanyDetails: React.FC = () => {
    // State management for form fields
    const [formData, setFormData] = useState({
        companyName: '',
        panNumber: '',
        gstNumber: '',
        address: '',
        regNumber: ''
    });

    const [isSaving, setIsSaving] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        setIsSaving(true);
        // Simulate API call
        setTimeout(() => {
            alert("Company details saved successfully!");
            setIsSaving(false);
        }, 1000);
    };

    return (
        <div className="w-full flex items-center justify-center p-6 font-sans">
            <div className="w-full max-w-4xl 
                            bg-white 
                            rounded-2xl 
                            shadow-[0_20px_50px_-12px_rgba(31,81,255,0.15)] 
                            border border-slate-100 
                            overflow-hidden">

                {/* Header - Matching the Reference Style but Modernized */}
                <div className="bg-[#1F51FF] px-8 py-5 flex items-center justify-between relative overflow-hidden">
                    {/* Decorative background element */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-20 -mt-20 pointer-events-none"></div>
                     <div className="absolute inset-0 gradient-shimmer pointer-events-none z-10"></div>
                    <h2 className="text-white text-lg font-bold tracking-wide flex items-center gap-2 relative z-10">
                        <Building2 className="text-blue-200" size={24} />
                        Add Company Details
                    </h2>
                    
                    <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse relative z-10"></div>
                </div>

                {/* Form Container */}
                <div className="p-8 space-y-8">

                    {/* Row 1: Company Name (Full Width) */}
                    <div className="group">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">
                            Company Name
                        </label>
                        <div className="flex h-12 rounded-xl overflow-hidden border border-slate-200 shadow-sm 
                                      group-focus-within:border-[#1F51FF] group-focus-within:shadow-[0_4px_20px_rgba(31,81,255,0.1)] 
                                      transition-all duration-300">
                            {/* Icon Box - Reference Style Modernized */}
                            <div className="w-14 bg-[#1F51FF] flex items-center justify-center text-white shrink-0">
                                <Building2 size={20} />
                            </div>
                            <input
                                type="text"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                placeholder="Enter Company Name"
                                className="flex-1 px-4 bg-slate-50 text-slate-800 text-sm font-semibold outline-none focus:bg-white transition-colors"
                            />
                        </div>
                    </div>

                    {/* Row 2: Grid Layout (PAN & GST) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Company PAN */}
                        <div className="group">
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">
                                Company PAN Number
                            </label>
                            <div className="flex h-12 rounded-xl overflow-hidden border border-slate-200 shadow-sm 
                                          group-focus-within:border-[#1F51FF] group-focus-within:shadow-[0_4px_20px_rgba(31,81,255,0.1)] 
                                          transition-all duration-300">
                                <div className="w-14 bg-[#1F51FF] flex items-center justify-center text-white shrink-0">
                                    <CreditCard size={20} />
                                </div>
                                <input
                                    type="text"
                                    name="panNumber"
                                    value={formData.panNumber}
                                    onChange={handleChange}
                                    placeholder="XXXXX0000X"
                                    className="flex-1 px-4 bg-slate-50 text-slate-800 text-sm font-semibold outline-none focus:bg-white transition-colors uppercase"
                                />
                            </div>
                        </div>

                        {/* Company GST */}
                        <div className="group">
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">
                                Company GST Number
                            </label>
                            <div className="flex h-12 rounded-xl overflow-hidden border border-slate-200 shadow-sm 
                                          group-focus-within:border-[#1F51FF] group-focus-within:shadow-[0_4px_20px_rgba(31,81,255,0.1)] 
                                          transition-all duration-300">
                                <div className="w-14 bg-[#1F51FF] flex items-center justify-center text-white shrink-0">
                                    <CreditCard size={20} />
                                </div>
                                <input
                                    type="text"
                                    name="gstNumber"
                                    value={formData.gstNumber}
                                    onChange={handleChange}
                                    placeholder="GSTIN Number"
                                    className="flex-1 px-4 bg-slate-50 text-slate-800 text-sm font-semibold outline-none focus:bg-white transition-colors uppercase"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Row 3: Grid Layout (Address & Registration) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Registered Address */}
                        <div className="group">
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">
                                Company Registered Address
                            </label>
                            <div className="flex h-12 rounded-xl overflow-hidden border border-slate-200 shadow-sm 
                                          group-focus-within:border-[#1F51FF] group-focus-within:shadow-[0_4px_20px_rgba(31,81,255,0.1)] 
                                          transition-all duration-300">
                                <div className="w-14 bg-[#1F51FF] flex items-center justify-center text-white shrink-0">
                                    <MapPin size={20} />
                                </div>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Full Address"
                                    className="flex-1 px-4 bg-slate-50 text-slate-800 text-sm font-semibold outline-none focus:bg-white transition-colors truncate"
                                />
                            </div>
                        </div>

                        {/* Registration Number */}
                        <div className="group">
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">
                                Company Registration Number
                            </label>
                            <div className="flex h-12 rounded-xl overflow-hidden border border-slate-200 shadow-sm 
                                          group-focus-within:border-[#1F51FF] group-focus-within:shadow-[0_4px_20px_rgba(31,81,255,0.1)] 
                                          transition-all duration-300">
                                <div className="w-14 bg-[#1F51FF] flex items-center justify-center text-white shrink-0">
                                    <FileText size={20} />
                                </div>
                                <input
                                    type="text"
                                    name="regNumber"
                                    value={formData.regNumber}
                                    onChange={handleChange}
                                    placeholder="Company Registration Number"
                                    className="flex-1 px-4 bg-slate-50 text-slate-800 text-sm font-semibold outline-none focus:bg-white transition-colors placeholder:font-normal placeholder:text-slate-400"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-4 flex justify-end">
                        <button 
                            onClick={handleSave}
                            disabled={isSaving}
                      className="relative overflow-hidden flex items-center gap-2 px-8 py-3 bg-[#1F51FF] text-white rounded-xl font-bold text-sm shadow-[0_4px_14px_rgba(31,81,255,0.4)] transition-all"
                        >
                            
                            <div className="absolute inset-0 gradient-shimmer pointer-events-none z-10"></div>

                            {isSaving ? (
                                <>Processing...</>
                            ) : (
                                <>
                                    <Save size={18} />
                                    SAVE DETAILS
                                </>
                            )}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AddCompanyDetails;