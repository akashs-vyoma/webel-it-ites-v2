"use client"
import React, { useState } from 'react';
import { User, Phone, Building2, UserPlus, Send, Check, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAlert } from '@/hooks/useAlert';

const AddAuthorizedPerson: React.FC = () => {
    const router = useRouter();
    const { showAlert } = useAlert();

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        department: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        showAlert({
            type: 'success',
            title: 'The authorize person added.',
            message: 'The authorized person details have been added. You will now be redirected to the verification page.'
        });
        router.push('/add-org-authorize-person');
    };

    return (
        <div className="w-full flex items-center justify-center p-6 font-sans relative">

            {/* ---------------- MAIN FORM CARD ---------------- */}
            <div className="w-full max-w-3xl 
                            bg-white 
                            rounded-2xl 
                            shadow-[0_20px_50px_-12px_rgba(31,81,255,0.15)] 
                            border border-slate-100 
                            overflow-hidden">

                {/* Header */}
                <div className="bg-[#1F51FF] px-8 py-5 flex items-center justify-between relative overflow-hidden">

                    <div className="absolute inset-0 gradient-shimmer pointer-events-none z-10"></div>

                    <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10 pointer-events-none"></div>

                    <h2 className="text-white text-lg font-bold tracking-wide flex items-center gap-2 relative z-20">
                        <UserPlus className="text-blue-200" size={22} />
                        Add Authorized Person
                    </h2>

                </div>


                {/* Form Content */}
                <form onSubmit={handleSubmit} className="p-8 space-y-8">

                    {/* Row 1: Name and Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Name Input */}
                        <div className="group">
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">
                                Name
                            </label>
                            <div className="flex h-12 rounded-xl overflow-hidden border border-slate-200 shadow-sm 
                                          group-focus-within:border-[#1F51FF] group-focus-within:shadow-[0_4px_20px_rgba(31,81,255,0.1)] 
                                          transition-all duration-300">
                                <div className="w-14 bg-[#1F51FF] flex items-center justify-center text-white shrink-0">
                                    <User size={20} />
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Authorized Person Name"
                                    className="flex-1 px-4 bg-white text-slate-800 text-sm font-semibold outline-none placeholder:text-slate-400 placeholder:font-medium"
                                />
                            </div>
                        </div>

                        {/* Phone Number Input */}
                        <div className="group">
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">
                                Phone Number
                            </label>
                            <div className="flex h-12 rounded-xl overflow-hidden border border-slate-200 shadow-sm 
                                          group-focus-within:border-[#1F51FF] group-focus-within:shadow-[0_4px_20px_rgba(31,81,255,0.1)] 
                                          transition-all duration-300">
                                <div className="w-14 bg-[#1F51FF] flex items-center justify-center text-white shrink-0">
                                    <Phone size={20} />
                                </div>
                                <input
                                    type="text"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Authorized Person Mobile Number"
                                    className="flex-1 px-4 bg-white text-slate-800 text-sm font-semibold outline-none placeholder:text-slate-400 placeholder:font-medium"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Row 2: Department and Submit Button */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                        {/* Department Input */}
                        <div className="group w-full">
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">
                                Department
                            </label>
                            <div className="flex h-12 rounded-xl overflow-hidden border border-slate-200 shadow-sm 
                                          group-focus-within:border-[#1F51FF] group-focus-within:shadow-[0_4px_20px_rgba(31,81,255,0.1)] 
                                          transition-all duration-300">
                                <div className="w-14 bg-[#1F51FF] flex items-center justify-center text-white shrink-0">
                                    <Building2 size={20} />
                                </div>
                                <input
                                    type="text"
                                    name="department"
                                    required
                                    value={formData.department}
                                    onChange={handleChange}
                                    placeholder="Authorized Person Department"
                                    className="flex-1 px-4 bg-white text-slate-800 text-sm font-semibold outline-none placeholder:text-slate-400 placeholder:font-medium"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="w-full">
                            <button
                                type="submit"
                                className="w-full md:w-auto h-12 px-8 flex items-center justify-center gap-2
                                           bg-[#1F51FF] text-white 
                                           rounded-xl font-bold text-sm tracking-wide
                                           shadow-[0_4px_14px_rgba(31,81,255,0.4)] 
                                           hover:shadow-[0_6px_20px_rgba(31,81,255,0.6)] 
                                           hover:-translate-y-0.5
                                           active:scale-95
                                           transition-all duration-200 cursor-pointer"
                            >
                                <Send size={16} />
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddAuthorizedPerson;