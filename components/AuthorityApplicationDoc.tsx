"use client";
import React, { useEffect, useState } from 'react';
import {
    FileText,
    Download,
    Eye,
    CheckCircle2,
    CreditCard,
    User,
    Phone,
    MapPin,
    Hash,
    Calendar,
    Settings,
    ShieldCheck,
    Briefcase,
    Building2
} from 'lucide-react';

import { useAuth } from '@/hooks/useAuth';
import DocumentAadhaarVerifyModal from './DocumentAadhaarVerifyModal';
import { getCookie } from '@/utils/cookies';

// --- Sub-component for the Info Items (Icon + Text + Label) ---
const InfoItem = ({ icon: Icon, label, value, colorClass = "text-cyan-600" }: { icon: any, label: string, value: string, colorClass?: string }) => (
    <div className="flex items-start gap-3 py-2">
        <div className={`p-2 rounded-full bg-slate-100 ${colorClass} shrink-0`}>
            <Icon size={18} />
        </div>
        <div className="flex flex-col">
            <span className="text-[13px] font-bold text-slate-800 uppercase tracking-tight leading-tight">
                {value}
            </span>
            <span className="text-[11px] font-medium text-slate-400 uppercase">
                {label}
            </span>
        </div>
    </div>
);

const ApplicationReviewPage = () => {
    // --- Modal & Auth Logic ---
    const [showModal, setShowModal] = useState(false);
    const { user, isAuthenticated, token } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) return;
        const aadhaarAuth = getCookie("ad_auth");
        if (aadhaarAuth) {
            setShowModal(false);
        } else {
            setShowModal(true);
        }
    }, [isAuthenticated]);

    return (
        <div className="min-h-screen p-4 md:p-8 font-sans">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* --- SECTION 1: APPLICATION DETAILS --- */}
                <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-700 to-blue-600 px-6 py-4 flex justify-between items-center">
                        <h2 className="text-white font-semibold text-lg flex items-center gap-2">
                            <FileText size={20} className="text-cyan-300" />
                            Application Details
                        </h2>
                        <button className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-2 px-4 rounded-full flex items-center gap-2 transition-all shadow-lg">
                            <Download size={14} /> Generate PDF
                        </button>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* Row 1 */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-slate-100 pb-4">
                            <InfoItem icon={Hash} label="Application No." value="AP/DPRITVET/661/20260119070149" />
                            <InfoItem icon={Settings} label="Service Name" value="DPR of IT & ITeS - Vetting - SINGLE PARTY" />
                            <InfoItem icon={Calendar} label="Application Date" value="2026-01-19" />
                        </div>

                        {/* Row 2 */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-slate-100 pb-4">
                            <InfoItem icon={Building2} label="Name" value="PRICELESS EDUCARE LLP" />
                            <InfoItem icon={CreditCard} label="PAN" value="AAUFP9611N" />
                            <InfoItem icon={CreditCard} label="GSTN" value="." />
                        </div>

                        {/* Row 3 - Company Address */}
                        <div className="border-b border-slate-100 pb-4">
                            <InfoItem icon={MapPin} label="Company Address" value="506/7, S.N. Roy Road, New Alipore, Kolkata, West Bengal – 700038" />
                        </div>

                        {/* Row 4 - Site Address */}
                        <div className="border-b border-slate-100 pb-4">
                            <InfoItem icon={MapPin} label="Site Address" value="BENGAL ECO INTELLIGENT PARK, UNIT NO – 19, 13TH FLOOR, TOWER-1, PLOT NO - 3, BLOCK – EM, BIDHAN NAGAR, SECTOR - V, SALT LAKE CITY, KOLKATA, WEST BENGAL – 700091." />
                        </div>

                        {/* Row 5 - Contact */}
                        <div className="border-b border-slate-100 pb-4">
                            <InfoItem icon={User} label="Authorised Contact Number" value="9051687302" />
                        </div>

                        {/* Row 6 - Verifier Info */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-slate-100 pb-4">
                            <InfoItem icon={User} label="Verifier Name" value="VINAY CHOWDHARY" />
                            <InfoItem icon={Phone} label="Verifier Contact No" value="9830916304" />
                            <InfoItem icon={Briefcase} label="Verifier Role" value="CCA" />
                        </div>

                        {/* Row 7 - Statuses */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <InfoItem icon={ShieldCheck} label="Verification Status" value="DONE" />
                            <InfoItem icon={CreditCard} label="Payment Status" value="PAID" />
                            <InfoItem icon={CheckCircle2} label="Provisional NOC Status" value="DONE" />
                        </div>
                    </div>
                </div>

                {/* --- SECTION 2: APPLICATION TRANSACTION DETAILS --- */}
                <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-700 to-blue-600 px-6 py-3">
                        <h2 className="text-white font-semibold text-base">Application Transaction Details</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-[#4e4eb2] text-white"> 
                                    <th className="px-6 py-3 text-left font-bold border-r border-blue-400/30">Sl#</th>
                                    <th className="px-6 py-3 text-left font-bold border-r border-blue-400/30">Ref#</th>
                                    <th className="px-6 py-3 text-left font-bold border-r border-blue-400/30">Payment Status</th>
                                    <th className="px-6 py-3 text-left font-bold border-r border-blue-400/30">Paid Amount (₹)</th>
                                    <th className="px-6 py-3 text-left font-bold">Payment Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-slate-200">
                                    <td className="px-6 py-4 font-bold text-slate-800 border-r border-slate-100">1</td>
                                    <td className="px-6 py-4 font-bold text-slate-800 border-r border-slate-100">2661</td>
                                    <td className="px-6 py-4 border-r border-slate-100">
                                        <span className="bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">success</span>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-slate-800 border-r border-slate-100">75800</td>
                                    <td className="px-6 py-4 font-bold text-slate-800">2026-01-19</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* --- SECTION 3: APPLICATION DOCUMENT DETAILS --- */}
                <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-700 to-blue-600 px-6 py-3">
                        <h2 className="text-white font-semibold text-base">Application Document Details</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-[#4e4eb2] text-white">
                                    <th className="px-4 py-3 text-left font-bold border-r border-blue-400/30">Sl#</th>
                                    <th className="px-4 py-3 text-left font-bold border-r border-blue-400/30">Doc Type</th>
                                    <th className="px-4 py-3 text-left font-bold border-r border-blue-400/30">Doc Name</th>
                                    <th className="px-4 py-3 text-left font-bold border-r border-blue-400/30">Udin Number</th>
                                    <th className="px-4 py-3 text-center font-bold">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {[
                                    { id: 1, type: "Project Report", name: "DPR", udin: "26-C-CA172124-P-1768808656021" },
                                    { id: 2, type: "MOA (Memorandum of Association)", name: "PARTNERSHIP DEED", udin: "26-C-CA172124-P-1768808998511" },
                                    { id: 3, type: "IT Return", name: "ITR 3 YEARS", udin: "26-C-CA172124-P-1768809073686" },
                                    { id: 4, type: "Balance Sheet", name: "BALANCE SHEET FINAL", udin: "26-C-CA172124-P-1768813311524" },
                                    { id: 5, type: "Declaration Letter", name: "Declaration Letter", udin: "26-M-CA172124-P-1768816503039" },
                                    { id: 6, type: "Provisional Certificate", name: "Provisional NOC", udin: "26-G-GA001175-P-1768816984488" },
                                ].map((doc) => (
                                    <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-4 py-3 font-bold text-slate-800 border-r border-slate-100">{doc.id}</td>
                                        <td className="px-4 py-3 font-bold text-slate-700 border-r border-slate-100">{doc.type}</td>
                                        <td className="px-4 py-3 font-bold text-slate-700 border-r border-slate-100">{doc.name}</td>
                                        <td className="px-4 py-3 font-bold text-slate-700 border-r border-slate-100">{doc.udin}</td>
                                        <td className="px-4 py-3 text-center">
                                            <button className="p-1.5 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors">
                                                <Eye size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

            {/* Modal Component */}
            <DocumentAadhaarVerifyModal showModal={showModal} setShowModal={setShowModal} />
        </div>
    );
};

export default ApplicationReviewPage;