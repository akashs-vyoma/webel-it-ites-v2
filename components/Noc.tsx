"use client";
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Eye, X, ChevronDown, FileText, Info } from 'lucide-react';
import { callAPI, uploadDocumentAPI } from './apis/commonAPIs';
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
import { deleteCookie, getCookie } from '@/utils/cookies';
import moment from 'moment';
import Swal from 'sweetalert2';
import DocumentAadhaarVerifyModal from './DocumentAadhaarVerifyModal';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

interface NOCFormProps {
    isWizard?: boolean;
    applicationNo?: string;
    applicationType?: string;
    category?: string;
}
const NOCForm = forwardRef((props: NOCFormProps, ref) => {
    const { isWizard, applicationNo, applicationType } = props;
    const [showModal, setShowModal] = useState(false);
    const [applicationTypes, setApplicationTypes] = useState([]);
    const [selectedType, setSelectedType] = useState("");
    const [isProjectsLoading, setIsProjectsLoading] = useState(true);
    const [applications, setApplications] = useState([]);
    const [applicationId, setApplicationId] = useState("");
    const [applicationDetails, setApplicationDetails] = useState<any>(null);
    const { user, isAuthenticated, token } = useAuth();
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // 1. Ref to the HTML element you want to convert
    const contentRef = useRef(null);


    // useEffect(() => {
    //     if (!isAuthenticated) return;
    //     const aadhaarAuth = getCookie("ad_auth");
    //     if (aadhaarAuth) {
    //         setShowModal(false);
    //     } else {
    //         setShowModal(true);
    //     }

    // }, [isAuthenticated])

    useImperativeHandle(ref, () => ({
        submit: async () => {

            try {

                if (!selectedType) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Please select an application type.',
                        icon: 'error',
                        confirmButtonColor: '#111827',
                    });
                    return;
                };

                if (!applicationId) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Please select an application.',
                        icon: 'error',
                        confirmButtonColor: '#111827',
                    });
                    return;
                };

                const applicationType = applicationTypes.find((item: any) => item?.projectID == parseInt(selectedType))?.projectName;
                const application = applications?.find((item: any) => item?.applicationId == parseInt(applicationId))?.applicationNumber;


                const docDetails = {
                    token: token,
                    user_type: user?.user_type_id || "5",
                    doc_type_id: 100,
                    doc_type: applicationType || "-",
                    owner_id: user?.owner_id || "",
                    ownership: "SELF",
                    doc_validity: 50,
                    doc_visibility: "PUBLIC",
                    doc_name: applicationType || "-",
                    doc_file_name: `${applicationType?.toLowerCase()?.replace(/\s/g, "_")}_${application}.pdf` || "-",
                    doc_remarks: "N/A",
                    doc_description: "N/A",
                    entry_user_id: user?.user_id || "",
                }

                console.log("docDetails", docDetails);

                const file = await convertToPdf(`${applicationType?.project_name?.toLowerCase()?.replace(/\s/g, "_")}_${application?.application_no}` || "noc_test.pdf");

                console.log("file", file)
                if (!file) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Failed to generate PDF, Please try again.',
                        icon: 'error',
                        confirmButtonColor: '#111827',
                    });
                    return;
                }

                // const pdfUrl = URL.createObjectURL(file);
                // window.open(pdfUrl, "_blank");

                // // Cleanup
                // setTimeout(() => URL.revokeObjectURL(pdfUrl), 3000);

                const result = await uploadDocumentAPI('/udinDocument/udinDocumentUpload', file, docDetails);

                if (result?.status == 0) {
                    Swal.fire({
                        icon: "success",
                        title: "Uploaded!",
                        text: `Declaration document uploaded successfully`,
                        showConfirmButton: true,
                    })

                } else {
                    if (result?.message?.includes("Invalid API token")) {
                        deleteCookie("ad_auth");
                        setShowModal(true);
                        Swal.fire({
                            icon: "error",
                            title: "Session Expired.",
                            text: "Aadhaar authentication expired. Please verify Aadhaar again.",
                            showConfirmButton: true,
                        })
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Failed to upload document",
                            text: result?.message?.split(". ")[0],
                            showConfirmButton: true,
                        });
                    }
                }

                return result;
            } catch (error: any) {
                console.log("error", error);
                Swal.fire({
                    icon: "error",
                    title: "Failed to upload.",
                    text: error?.message || "Something went wrong, Please try again later.",
                    showConfirmButton: true,
                });
            }


        }
    }));

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
                        _documents: applicationDetails?.documents?.map((doc: any) => { return { _name: doc?.documentType, _udin: doc?.udinNumber } }),
                        _it_notification_no: "845-IT/O/117/2013",
                        _it_notification_date: "12.7.2023",
                        _it_notification_udin: "23-GGA001177-O-1692009699994",
                        _rep_name: applicationDetails?.companyOrPersonName,
                        _rep_phone: applicationDetails?.companyOrPersonContactNo,
                        _ca_reg_number: "N/A",
                        _ca_name: "N/A",
                        _ca_phone: "N/A",
                    }
                    return <DPRDeclarationLetter ref={contentRef} data={data} />;
                }
            case "4":
                {
                    const data = {
                        _current_date: moment(new Date()).format("DD-MM-YYYY HH:mm:ss"),
                        _application_type: applicationDetails?.applicationTypeName,
                        _application_number: applicationDetails?.applicationNumber,
                        _company_name: applicationDetails?.companyName,
                        _documents: applicationDetails?.documents?.map((doc: any) => { return { _name: doc?.documentType, _udin: doc?.udinNumber } }),
                        _it_notification_udin: "23-GGA001177-O-1692009699994",
                        _tenant_notification_udin: "23-G-GA001177-O-1692019086903",
                        _building_area_sqft: applicationDetails?.buildingAreaSqft,
                        _commercial_area_sqft: applicationDetails?.commercialAreaRentSqft,
                        _company_rep_name: applicationDetails?.companyOrPersonName,
                        _company_rep_phone: applicationDetails?.companyOrPersonContactNo,
                        _sublet_area_sqft: applicationDetails?.subletAreaSqft,
                        _tenant_id: `${applicationDetails?.tenantGSTNo} / ${applicationDetails?.tenantPANNo}`,
                        _tenant_name: applicationDetails?.companyName,
                        _tenant_rep_name: applicationDetails?.companyOrPersonName,
                        _tenant_rep_phone: applicationDetails?.tenantContactNo,
                        _tenant_activity: applicationDetails?.tenantActivity,
                        _cs_reg_number: applicationDetails?.companyRegdNumber,
                        _cs_name: applicationDetails?.companyOrPersonName,
                        _cs_phone: applicationDetails?.companyOrPersonContactNo,
                    };

                    return <RentingSingleOwnerDeclaration ref={contentRef} data={data} />;
                }
            case "5":
                return <TaxExemptionDeclaration ref={contentRef} data={TaxExemptionDeclarationDummyData} />;
            case "7":
                return <MultiPartyDeclaration ref={contentRef} data={MultiPartyDeclarationDummyData} />;
            case "8":
                return <MultiOwnerDeclaration ref={contentRef} data={MultiOwnerDeclarationDummyData} />;
            case "9":
                return <FinalNOCExemption ref={contentRef} data={FinalNOCExemptionDummyData} />;
            case "10":
                return <RentingRenewalSingleDeclaration ref={contentRef} data={RentingRenewalSingleDeclarationDummyData} />;
            case "11":
                return <RentingRenewalMultiOwnerDeclaration ref={contentRef} data={RentingRenewalMultiOwnerDeclarationDummyData} />;
            default:
                return null;
        }
    };

    const convertToPdf = async (file_name: string) => {
        const element = contentRef.current;
        if (!element) return;

        setIsLoading(true);

        try {
            const element = contentRef.current;

            // 1. Convert HTML to Image Data URL using html-to-image
            const dataUrl = await toPng(element, { cacheBust: true });

            // 2. Initialize PDF
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 210;
            const pageHeight = 297;

            // Calculate Height
            const imgProps = pdf.getImageProperties(dataUrl);
            const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

            // 3. Add Image
            pdf.addImage(dataUrl, 'PNG', 0, 0, imgWidth, imgHeight);

            // 4. Save as File
            const pdfBlob = pdf.output('blob');
            const file = new File([pdfBlob], `${file_name}.pdf`, { type: "application/pdf" });

            return file;

        } catch (error) {
            console.error("Error generating PDF:", error);
            return null;
        } finally {
            setIsLoading(false);
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
                                        // disabled={isWizard}
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
                                        // disabled={isWizard}
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
                <DocumentAadhaarVerifyModal showModal={showModal} setShowModal={setShowModal} />
            </div>
        </>
    );
});

export default NOCForm;