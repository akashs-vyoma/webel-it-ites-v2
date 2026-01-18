"use client";
import React, { useEffect, useState } from 'react';
import { Eye, X, ChevronDown, FileText, Info } from 'lucide-react';
import { callAPI } from './apis/commonAPIs';
import DPRDeclarationLetter from './Declarations/views/dpr/single/dpr-declaration-single';
import RentingSingleOwnerDeclaration from './Declarations/views/renting/normal/single/renting-single-declaration';
import { data as DPRDeclarationLetterDummyData } from '@/components/Declarations/dummy-data/dpr/single/dpr_declaration_single'
import { data as RentingSingleOwnerDeclarationDummyData } from '@/components/Declarations/dummy-data/renting/normal/single/renting_single_declaration'
import TaxExemptionDeclaration from './Declarations/views/tax-exemption/single/te-declaration-single';
import { data as TaxExemptionDeclarationDummyData } from '@/components/Declarations/dummy-data/tax-exemption/single/te_declaration_single'
import MultiPartyDeclaration from './Declarations/views/dpr/multi/dpr-declaration-multi';
import { data as MultiPartyDeclarationDummyData } from "@/components/Declarations/dummy-data/dpr/multi/dpr_declaration_multi"
import MultiOwnerDeclaration from './Declarations/views/renting/renewal/multi/renting-renewal-multi-owner-declaration';
import { data as MultiOwnerDeclarationDummyData } from "@/components/Declarations/dummy-data/renting/renewal/multi/renting_renewal_multi_owner_declaration"
import FinalNOCExemption from './Declarations/views/tax-exemption/multi/te-final-multi';
import { data as FinalNOCExemptionDummyData } from "@/components/Declarations/dummy-data/tax-exemption/multi/te_final_multi"
import RentingRenewalSingleDeclaration from './Declarations/views/renting/renewal/single/renting-renewal-single-party-declaration';
import { data as RentingRenewalSingleDeclarationDummyData } from '@/components/Declarations/dummy-data/renting/renewal/single/renting_renewal_single_party_declaration'
import RentingRenewalMultiOwnerDeclaration from './Declarations/views/renting/renewal/multi/renting-renewal-multi-owner-declaration';
import { data as RentingRenewalMultiOwnerDeclarationDummyData } from '@/components/Declarations/dummy-data/renting/renewal/multi/renting_renewal_multi_owner_declaration'
import { useAuth } from '@/hooks/useAuth';
import { getCookie } from '@/utils/cookies';
import moment from 'moment';



// --- OPTIONS DATA ---
// const applicationTypes = [
//     "Select Application Type",
//     "DPR of IT & ITeS - Vetting - SINGLE PARTY",
//     "NOC for Renting Out Leased property - SINGLE PARTY",
//     "Certificate for Tax Exemption - SINGLE PARTY",
//     "DPR of IT & ITeS - vetting - MULTIPARTY",
//     "NOC for Renting Out Leased property - MULTIPARTY",
//     "Certificate for Tax Exemption - MULTIPARTY",
//     "Renewal of NOC Renting out Leased Property - SINGLE PARTY",
//     "Renewal of NOC Renting out Leased Property - MULTI PARTY"
// ];

const NOCForm: React.FC<{ isWizard?: boolean, applicationNo?: string, applicationType?: string, category?: string }> = ({ isWizard = false, applicationNo = "", applicationType = "", category = "" }) => {
    const [showModal, setShowModal] = useState(false);
    const [applicationTypes, setApplicationTypes] = useState([]);
    const [selectedType, setSelectedType] = useState("");
    const [isProjectsLoading, setIsProjectsLoading] = useState(true);
    const [applications, setApplications] = useState([]);
    const [applicationId, setApplicationId] = useState("");
    const [applicationDetails, setApplicationDetails] = useState<any>(null);
    const { user, isAuthenticated } = useAuth();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const result = await callAPI("/application/GetProjectDetailsByDeptID", { "departmentID": 1 });
                if (result.status === 0) {
                    setApplicationTypes(result.data)
                    const appType = applicationType || getCookie("application-type");
                    setSelectedType(appType);
                };
            } catch (err) { console.error(err); }
            finally { setIsProjectsLoading(false); }
        };
        fetchProjects();
    }, []);

    useEffect(() => {
        if (!selectedType || !isAuthenticated) { setApplications([]); return; }

        const fetchApps = async () => {
            try {
                const result = await callAPI("/application/GetApplicationNumber", { "entryUser": user?.user_id, "projectID": parseInt(selectedType) });
                if (result.status === 0) setApplications(result.data);
                const appNo = applicationNo || getCookie("application-no");
                console.log("appNo", appNo);
                const appId = result?.data?.find((app: any) => app?.applicationNumber?.toString() == appNo)?.applicationId || getCookie("application_id");
                setApplicationId(appId?.toString() || "");
            } catch (err) { console.error(err); }
        };
        fetchApps();
    }, [selectedType, isAuthenticated]);

    useEffect(() => {
        if (!applicationId) return;
        const fetchApplicationDetailsByApplicationId = async () => {
            try {
                const result = await callAPI("/application/GetApplicationDetailsByApplicationID", { "applicationID": parseInt(applicationId) });
                if (result?.status == 0) setApplicationDetails(result?.data);
            } catch (err) { console.error(err); }
        };
        fetchApplicationDetailsByApplicationId();
    }, [applicationId]);

    const renderDeclaraionLetter = () => {
        if (!applicationDetails) return <p>No application data found!</p>;

        switch (selectedType) {
            case "1":
                {
                    const data = {
                        _current_date: moment(new Date()).format("DD-MM-YYYY HH:mm:ss"),
                        _application_type: applicationDetails?.applicationTypeName,
                        _application_number: applicationDetails?.applicationNumber,
                        _company_name: applicationDetails?.companyName,
                        _documents: applicationDetails?.documents?.map((doc: any) => { return { _name: doc?.documentType, _udin: doc?.quotationID } }),
                        _it_notification_no: "845-IT/O/117/2013",
                        _it_notification_date: "12.7.2023",
                        _it_notification_udin: "23-GGA001177-O-1692009699994",
                        _rep_name: applicationDetails?.companyOrPersonName,
                        _rep_phone: applicationDetails?.companyOrPersonContactNo,
                        _ca_reg_number: "N/A",
                        _ca_name: "N/A",
                        _ca_phone: "N/A",
                    }
                    return <DPRDeclarationLetter data={data} />;
                }
            case "4":
                return <RentingSingleOwnerDeclaration data={RentingSingleOwnerDeclarationDummyData} />;
            case "5":
                return <TaxExemptionDeclaration data={TaxExemptionDeclarationDummyData} />;
            case "7":
                return <MultiPartyDeclaration data={MultiPartyDeclarationDummyData} />;
            case "8":
                return <MultiOwnerDeclaration data={MultiOwnerDeclarationDummyData} />;
            case "9":
                return <FinalNOCExemption data={FinalNOCExemptionDummyData} />;
            case "10":
                return <RentingRenewalSingleDeclaration data={RentingRenewalSingleDeclarationDummyData} />;
            case "11":
                return <RentingRenewalMultiOwnerDeclaration data={RentingRenewalMultiOwnerDeclarationDummyData} />;
            default:
                return null;
        }
    };

    return (
        <>
            {/* Shimmer Animation Styles */}
            <style jsx global>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .gradient-shimmer {
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                    animation: shimmer 3s infinite;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 10px;
                }
            `}</style>

            <div className="w-full font-sans h-fit shadow-lg rounded-xl overflow-hidden bg-white border border-slate-100">

                {/* --- HEADER: COMPACT NEON BLUE GRADIENT --- */}
                <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 px-6 py-3">
                    <div className="absolute inset-0 gradient-shimmer pointer-events-none z-10"></div>
                    <div className="relative z-20">
                        <h2 className="text-white text-sm font-bold tracking-wide mb-2 flex items-center gap-2 opacity-90">
                            <FileText className="text-white" size={16} />
                            Application Details
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1 group">
                                <label className="text-blue-50 text-[11px] font-bold uppercase tracking-wider pl-1">
                                    Application Type
                                </label>
                                <div className="relative">
                                    <select
                                        value={selectedType}
                                        onChange={(e) => setSelectedType(e.target.value)}
                                        className="w-full h-9 px-3 pr-8 rounded-md bg-white text-slate-700 font-bold text-sm outline-none focus:ring-2 focus:ring-cyan-300 border border-transparent shadow-sm appearance-none cursor-pointer transition-shadow"
                                    >
                                        <option value="">{isProjectsLoading ? "Loading..." : "Select Type"}</option>
                                        {applicationTypes.map((type: any, index: number) => (
                                            <option key={index} value={type.projectID}>{type.projectName}</option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                        <ChevronDown className="w-4 h-4 text-slate-500" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1 group">
                                <label className="text-blue-50 text-[11px] font-bold uppercase tracking-wider pl-1">
                                    Application Number
                                </label>
                                <div className="relative">
                                    <select
                                        value={applicationId || ""}
                                        onChange={(e) => setApplicationId(e.target.value)}
                                        className="w-full h-9 px-3 pr-8 rounded-md bg-white text-slate-700 font-bold text-sm outline-none focus:ring-2 focus:ring-cyan-300 border border-transparent shadow-sm appearance-none cursor-pointer transition-shadow"
                                    >
                                        <option value="">Select Application Number</option>
                                        {applications?.map((app: any, index: number) => <option key={index} value={app?.applicationId}>{app?.applicationNumber}</option>)}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                        <ChevronDown className="w-4 h-4 text-slate-500" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- INSTRUCTION --- */}
                <div className="bg-[#fcf8e3] px-6 py-3 border-t border-yellow-100">
                    <div className="flex gap-2 items-start text-[11px] text-slate-700 leading-tight">
                        <div className="shrink-0 mt-0.5"><Info size={14} className="text-blue-700" /></div>
                        <p>
                            <span className="font-bold text-black">Instruction:</span> To Generate Declaration Letter please select <span className="font-bold text-black">Application Type</span> from the drop down, then select <span className="font-bold text-black">Application Number</span>. All documents with UDIN Number will show with pre-defined format. Check the letter and click on "Generate & Upload" button.
                        </p>
                    </div>
                </div>

                {/* --- CONDITIONAL LETTER CONTENT --- */}
                {applicationDetails && (
                    <div className="p-4 bg-slate-50 animate-in fade-in slide-in-from-top-2 duration-500">
                        <div className="bg-white border-2 border-blue-700 rounded-lg shadow-inner overflow-hidden">

                            {/* Letter Header - UPDATED COLOR TO MATCH SELECTION HEADER */}
                            <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 py-2 text-center relative overflow-hidden">
                                <div className="absolute inset-0 gradient-shimmer pointer-events-none opacity-30"></div>
                                <h3 className="text-white text-xs font-bold uppercase tracking-widest relative z-10">Declaration Letter</h3>
                            </div>

                            {/* Letter Content (Scrollable) */}
                            <div className="p-8 max-h-[500px] overflow-y-auto text-[13px] text-slate-800 leading-relaxed custom-scrollbar">
                                {renderDeclaraionLetter()}
                            </div>

                            {/* Letter Footer Action - UPDATED COLOR */}
                            {!isWizard && <div className="bg-slate-50 p-3 border-t flex justify-end">
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded text-xs font-bold transition-all shadow-md active:scale-95"
                                >
                                    Verify Aadhaar
                                </button>
                            </div>}
                        </div>
                    </div>
                )}

                {/* --- MODAL --- */}
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                        <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-white/20">
                            <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 px-6 py-4 flex justify-between items-center relative overflow-hidden">
                                <div className="absolute inset-0 gradient-shimmer pointer-events-none z-10 opacity-30"></div>
                                <h2 className="text-white text-base font-bold tracking-wide relative z-20">Verify Aadhaar Number</h2>
                                <button onClick={() => setShowModal(false)} className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-1 rounded-md relative z-20 transition-all"><X size={18} /></button>
                            </div>
                            <div className="p-6 space-y-6">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Aadhaar Number <span className="text-red-500">*</span></label>
                                    <div className="flex h-10 rounded-lg overflow-hidden shadow-sm border border-slate-300 focus-within:border-blue-500 transition-all">
                                        <div className="bg-slate-100 text-slate-600 border-r border-slate-300 px-4 flex items-center text-xs font-bold shrink-0">Aadhaar</div>
                                        <div className="relative flex-1 bg-white">
                                            <input type="text" placeholder="Enter Aadhaar Number" className="w-full h-full px-3 text-sm font-semibold outline-none" />
                                            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"><Eye size={16} /></button>
                                        </div>
                                        <button className="bg-blue-700 hover:bg-blue-800 text-white px-5 text-xs font-bold uppercase shrink-0 transition-all">Send OTP</button>
                                    </div>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                                    <div className="flex items-start gap-3">
                                        <input type="checkbox" id="aadhaar-consent" className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                                        <div className="text-[11px] text-slate-500 text-justify leading-relaxed font-medium">
                                            <label htmlFor="aadhaar-consent" className="cursor-pointer">I hereby state that I have no objection in authenticating myself on Unique Document Identification Number (UDIN) portal with Aadhaar based authentication system.</label>
                                        </div>
                                    </div>
                                </div>
                                {/*comment*/}
                            </div>
                            <div className="p-4 border-t border-slate-100 flex justify-end bg-slate-50">
                                <button className="text-slate-600 hover:text-slate-900 bg-white border border-slate-300 font-bold text-xs px-4 py-2 rounded-md transition-colors" onClick={() => setShowModal(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default NOCForm;