"use client";
import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
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
    Info,
    Plus,
    Trash2,
    PhoneCall,
    CheckCircle2,
    AlertCircle,
    ChevronRight,
    Loader2
} from 'lucide-react';
import NonIndividualUploadDoc from './NonIndividualUploadDoc';
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";
import { callAPI } from './apis/commonAPIs';

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

interface CreateApplicationFormProps {
    category: string;
    setCategory: (category: string) => void;
}

const CreateApplicationForm = forwardRef((props: CreateApplicationFormProps, ref) => {
    const { category, setCategory } = props;
    const [appType, setAppType] = useState("");
    const [requiredDocuments, setRequiredDocuments] = useState<any>([]);
    const [isLoadingRequiredDocs, setIsLoadingRequiredDocs] = useState(false);
    const [activeDoc, setActiveDoc] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // --- API DATA STATE ---
    const [formData, setFormData] = useState<any>({
        name: "", pan: "", gstin: "", address: "", email: "", phone: "",
        site_address: "", rentable_area: 0, space_no: "", floor_no: "",
        plot_no: "", block_no: "", building_area: 0, comm_area: 0,
        ag_from: "", ag_to: "", old_noc: "", old_noc_date: "",
        old_ag_from: "", old_ag_to: "", amt_paid: 0, renewal_from: "", renewal_to: "",
        tax_auth_id: 0, tax_addr: "", tax_space: "", tax_breakup: "", tax_desc: "", tax_ites_total: "",
        v_name: "", v_phone: "", v_reg: ""
    });

    const updateField = (key: string, value: any) => {
        console.log(formData);
        setFormData((prev: any) => ({ ...prev, [key]: value }));
    };

    const handleUploadClick = (doc: any) => {
        setActiveDoc(doc?.project_id);
        setIsModalOpen(true);
    };
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoadingProjects, setIsLoadingProjects] = useState(false);
    const [role, setRole] = useState("");
    const [applicationTypes, setApplicationTypes] = useState([]);
    const [verifierRole, setVerifierRole] = useState("");
    const [uploadedDocsStatus, setUploadedDocsStatus] = useState<any[]>([]);
    const [tenantList, setTenantList] = useState<any[]>([]);
    const [tenantForm, setTenantForm] = useState({
        tenantName: '',
        tenantGstn: '',
        tenantPan: '',
        tenantPhone: '',
        tenantActivity: ''
    });

    const toNull = (value: any) =>
        value === "" || value === undefined ? null : value;

    useImperativeHandle(ref, () => ({
        submitApplication: async () => {
            const body = {
                "application_details": {
                    "project_id": parseInt(appType),
                    "company_or_person_name": formData.name,
                    "company_or_person_pan": formData.pan,
                    "company_gst_no_or_aadhaar_no": formData.gstin,
                    "company_or_person_registered_address": formData.address,
                    "company_or_person_registration_no": formData.v_reg,
                    "registered_area_in_sqft": parseFloat(formData.rentable_area),
                    "tenant_gst_no": tenantList[0]?.tenantGstn || "",
                    "tenant_pan_no": tenantList[0]?.tenantPan || "",
                    "tenant_name": tenantList[0]?.tenantName || "",
                    "tenant_activity": tenantList[0]?.tenantActivity || "",
                    "building_area_in_sqft": parseFloat(formData.building_area),
                    "commercial_area_on_rent_in_sqft": parseFloat(formData.comm_area),
                    "user_type_id": role === "company" ? 1 : 2,
                    "renting_floor": formData.floor_no,
                    "renting_plot_no": formData.plot_no,
                    "renting_address_block": formData.block_no,
                    "renting_space_no": formData.space_no,
                    "renting_from_month": formData.ag_from,
                    "renting_to_month": formData.ag_to,
                    "tax_service_authority_id": formData.tax_auth_id,
                    "tax_addressof_premises": formData.tax_addr,
                    "tax_total_space_used_by_applicant": formData.tax_space,
                    "tax_break_up_of_builtup_space": formData.tax_breakup,
                    "tax_desc_of_ites_operation": formData.tax_desc,
                    "tax_total_used_for_ites_activities": formData.tax_ites_total,
                    "in_application_id": 0,
                    "company_or_person_contact_no": formData.phone,
                    "company_or_person_email_id": formData.email,
                    "dprvet_site_address": formData.site_address,
                    "renting_old_noc_no": formData.old_noc,
                    "renting_old_noc_date": formData.old_noc_date,
                    "renting_old_agreement_from_date": formData.old_ag_from,
                    "renting_old_agreement_to_date": formData.old_ag_to,
                    "renting_amount_paid_till": parseFloat(formData.amt_paid),
                    "application_id": 0
                },
                "lst_cosigner_details": [{
                    "cosigner_name": formData.v_name,
                    "cosigner_contact_no": formData.v_phone,
                    "cosigner_reg_no": formData.v_reg,
                    "cosigner_role": verifierRole,
                    "cosigner_sign_status": "PENDING"
                }],
                "lst_coapplicant_details": [],
                "entry_user_id": parseInt(localStorage.getItem("userId") || "1"),
                "owner_id": parseInt(localStorage.getItem("ownerId") || "1")
            };
            return await callAPI('/application/SetApplicationDetailsV9', body);
        }
    }));

    const fetchUploadedDocumentStatus = async (applicationTypeID: any) => {
        try {
            // Get values from localStorage or defaults
            const ownerID = parseInt(localStorage.getItem("ownerId") || "1");
            const role = localStorage.getItem("role");
            const userTypeID = role === "company" ? 1 : 2;

            const body = {
                ownerID: ownerID || 1,
                userTypeID: userTypeID || 1,
                applicationTypeID: parseInt(applicationTypeID)
            };

            const result = await callAPI('/application/GetUploadedDocumentDetailsByApplicationTypeIDV1', body);


            if (result && result.data) {
                setUploadedDocsStatus(result.data);
            } else {
                setUploadedDocsStatus([]);
            }
        } catch (error) {
            console.error("Error fetching uploaded document status:", error);
            setUploadedDocsStatus([]);
        }
    };
    useEffect(() => {
        if (appType) {
            getRequiredDocumetListByProjectID(appType);
            fetchUploadedDocumentStatus(appType);
        } else {
            setRequiredDocuments([]);
            setUploadedDocsStatus([]);
        }
    }, [appType]);
    const handleAddTenant = () => {
        if (!tenantForm.tenantName || !tenantForm.tenantGstn || !tenantForm.tenantPan || !tenantForm.tenantActivity) {
            alert("Please fill all tenant details before adding.");
            return;
        }
        setTenantList([...tenantList, { ...tenantForm, id: Date.now() }]);
        setTenantForm({ tenantName: '', tenantGstn: '', tenantPan: '', tenantPhone: '', tenantActivity: '' });
    };

    const removeTenant = (id: any) => {
        setTenantList(tenantList.filter(t => t.id !== id));
    };

    const fetchProjects = async () => {
        try {
            const result = await callAPI('/application/GetProjectDetailsByDeptID', { "departmentID": 1 });
            setApplicationTypes(result?.data);
            const filteredProjects = result?.data?.filter((project: any) => project?.projectName?.includes(category));
            if (result && Array.isArray(result?.data)) setProjects(filteredProjects);
            else setProjects([]);
        } catch (error) {
            console.error("Error fetching projects:", error);
        } finally {
            setIsLoadingProjects(false);
        }
    };

    useEffect(() => {
        const loginType = localStorage.getItem("role");
        if (loginType) setRole(loginType);
        if (category) {
            fetchProjects();
            localStorage.setItem("category", category);
        }
        else setProjects([]);
    }, [category]);

    const getRequiredDocumetListByProjectID = async (projectID: any) => {
        try {
            setIsLoadingProjects(true);
            setIsLoadingRequiredDocs(true);
            const result = await callAPI("/application/GetAllProjectDocByProjectID", { projectID });
            setRequiredDocuments(result?.data || [])
        } catch (erorr: any) {
            console.log(erorr);
        } finally {
            setIsLoadingRequiredDocs(false);
            setIsLoadingProjects(false);
        }
    }
    useEffect(() => {
        if (appType) {
            getRequiredDocumetListByProjectID(appType);
        }
    }, [appType]);

    const selectedProject = projects.find(p => String(p.projectID) === String(appType));
    const projectSearchString = selectedProject ? selectedProject.projectName.toLowerCase() : "";

    const isVetting = projectSearchString.includes("vetting");
    const isRenting = projectSearchString.includes("renting out") && !projectSearchString.includes("renewal");
    const isTax = projectSearchString.includes("tax exemption");
    const isRenewal = projectSearchString.includes("renewal");

    return (
        <div className="w-full min-h-screen p-4 md:p-6 font-sans relative text-slate-900">
            <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* ================= LEFT COLUMN: FORM ================= */}
                <div className="lg:col-span-8 bg-white rounded-xl shadow-xl overflow-hidden border border-slate-100 h-fit">

                    <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-500 p-6">
                        <h2 className="text-white text-lg font-semibold mb-4 tracking-wide uppercase">
                            {"Create New Application"}
                        </h2>
                        <div className="flex gap-4">
                            <div className="relative flex items-center col-span-2 w-[50%]">
                                <select
                                    value={category}
                                    onChange={(e) => {
                                        setCategory(e.target.value);
                                        localStorage.setItem("category", e.target.value);
                                    }}
                                    className="w-full h-11 pl-4 pr-10 rounded-lg bg-white text-slate-700 font-bold text-sm outline-none focus:ring-4 focus:ring-cyan-500/30 transition-shadow appearance-none cursor-pointer disabled:bg-slate-100"
                                >
                                    <option value="">Select Application Category</option>
                                    <option value="SINGLE">Single Owner</option>
                                    <option value="MULTIPARTY">Multi-Owner</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                                    <ChevronDown className="w-5 h-5 text-slate-500" />
                                </div>
                            </div>
                            <div className="relative flex items-center col-span-2 w-[50%]">
                                <select
                                    value={appType}
                                    onChange={(e) => {
                                        setAppType(e.target.value);
                                        localStorage.setItem("application-type", e.target.value);
                                    }}
                                    disabled={isLoadingProjects}
                                    className="w-full h-11 pl-4 pr-10 rounded-lg bg-white text-slate-700 font-bold text-sm outline-none focus:ring-4 focus:ring-cyan-500/30 transition-shadow appearance-none cursor-pointer disabled:bg-slate-100"
                                >
                                    <option value="">{isLoadingProjects ? "Loading Projects..." : "Select Application Type"}</option>
                                    {projects.map((project, index) => (
                                        <option key={index} value={project.projectID}>{project.projectName}</option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                                    <ChevronDown className="w-5 h-5 text-slate-500" />
                                </div>
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

                        {role === "company" && <InputGroupGSTIN label="GSTIN of the company" icon={<CreditCard size={18} />} placeholder="GST Number" required onChange={(e) => updateField('gstin', e.target.value)} />}
                        <InputGroup label={`PAN Number of the ${role}`} icon={<CreditCard size={18} />} placeholder="PAN Number" required onChange={(e) => updateField('pan', e.target.value)} />
                        <InputGroup label={`Name of the ${role}`} icon={<User size={18} />} placeholder="Name" required onChange={(e) => updateField('name', e.target.value)} />
                        <InputGroup label={`Phone Number of the ${role}`} icon={<Phone size={18} />} placeholder="Phone Number" required onChange={(e) => updateField('phone', e.target.value)} />
                        <InputGroup label={`Email of the ${role}`} icon={<Mail size={18} />} placeholder="Email" onChange={(e) => updateField('email', e.target.value)} />
                        <div className="md:col-span-2">
                            <InputGroup label={`Registered Address of the ${role}`} icon={<MapPin size={18} />} placeholder="Registered Address" required onChange={(e) => updateField('address', e.target.value)} />
                        </div>

                        {isVetting && (
                            <div className="md:col-span-2">
                                <InputGroup label="Site Address" icon={<MapPin size={18} />} placeholder="Site Address" required onChange={(e) => updateField('site_address', e.target.value)} />
                            </div>
                        )}

                        {(isRenting || isRenewal) && (
                            <>
                                <InputGroup label="Rentable Area in Sqft (Super Built Up Area)" icon={<Maximize size={18} />} placeholder="Area (in Sqft)" required onChange={(e) => updateField('rentable_area', e.target.value)} />
                                <InputGroup label="Space Number" icon={<Layers size={18} />} placeholder="Space No." required onChange={(e) => updateField('space_no', e.target.value)} />
                                <InputGroup label="Floor No." icon={<Building size={18} />} placeholder="Floor No." required onChange={(e) => updateField('floor_no', e.target.value)} />
                                <InputGroup label="Plot No." icon={<Hash size={18} />} placeholder="Plot No." required onChange={(e) => updateField('plot_no', e.target.value)} />
                                <InputGroup label="Block No." icon={<Building size={18} />} placeholder="Block No." onChange={(e) => updateField('block_no', e.target.value)} />
                            </>
                        )}

                        {isRenewal && (
                            <>
                                <InputGroup label="Old NOC No. / Application No." icon={<FileText size={18} />} placeholder="Old NOC No." required onChange={(e) => updateField('old_noc', e.target.value)} />
                                <InputGroup label="Old NOC Date" icon={<Calendar size={18} />} type="date" required onChange={(e) => updateField('old_noc_date', e.target.value)} />
                                <InputGroup label="Old Agreement Tenure (Effective From)" icon={<Calendar size={18} />} type="date" required onChange={(e) => updateField('old_ag_from', e.target.value)} />
                                <InputGroup label="Old Agreement End Date" icon={<Calendar size={18} />} type="date" required onChange={(e) => updateField('old_ag_to', e.target.value)} />
                                <InputGroup label="Amount Paid till (Rs.)" icon={<DollarSign size={18} />} placeholder="Amount Paid..." required onChange={(e) => updateField('amt_paid', e.target.value)} />
                                <InputGroup label="Renewal From Date" icon={<Calendar size={18} />} type="date" required onChange={(e) => updateField('renewal_from', e.target.value)} />
                                <InputGroup label="Renewal To Date" icon={<Calendar size={18} />} type="date" required onChange={(e) => updateField('renewal_to', e.target.value)} />
                                <InputGroup label="Total Payment made" icon={<DollarSign size={18} />} placeholder="Total Payment" required />
                            </>
                        )}

                        {(isRenting || isRenewal) && (
                            <>
                                <InputGroup label="Agreement Tenure (Effective From)" icon={<Calendar size={18} />} type="date" required onChange={(e) => updateField('ag_from', e.target.value)} />
                                {isRenting && <InputGroup label="Agreement End Date" icon={<Calendar size={18} />} type="date" required onChange={(e) => updateField('ag_to', e.target.value)} />}

                                <InputGroup label="Building Area in Sqft (Super Built-Up Area)" icon={<Maximize size={18} />} placeholder="Building Area In Sqft" required onChange={(e) => updateField('building_area', e.target.value)} />
                                <div className="md:col-span-2">
                                    <InputGroup label="Commercial Area On Rent (Other than IT/ITeS Activity)" icon={<Maximize size={18} />} placeholder="Commercial Area On Rent In Sqft" onChange={(e) => updateField('comm_area', e.target.value)} />
                                </div>
                                <p className="md:col-span-2 text-[10px] text-slate-600 font-bold italic mt-[-10px]">
                                    Permission fees will be charged @Rs.3/sqft. till the expiry of the Rental Agreement/Surrender of the space by the tenant
                                </p>
                            </>
                        )}

                        {(isRenting || isRenewal) && (
                            <div className="space-y-6 md:col-span-2">
                                {/* Tenant Input Form */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-xl bg-slate-50/50">
                                    <InputGroup
                                        label="Tenant Name" icon={<User size={18} />}
                                        placeholder="Enter Name" required
                                        value={tenantForm.tenantName}
                                        onChange={(e) => setTenantForm((prev) => ({ ...prev, tenantName: e.target.value }))}
                                    />
                                    <InputGroup
                                        label="Tenant GSTN No." icon={<Hash size={18} />}
                                        placeholder="Enter GSTN" required
                                        value={tenantForm.tenantGstn}
                                        onChange={(e) => setTenantForm((prev) => ({ ...prev, tenantGstn: e.target.value }))}
                                    />
                                    <InputGroup
                                        label="Tenant PAN No." icon={<CreditCard size={18} />}
                                        placeholder="Enter PAN" required
                                        value={tenantForm.tenantPan}
                                        onChange={(e) => setTenantForm((prev) => ({ ...prev, tenantPan: e.target.value }))}
                                    />
                                    <InputGroup
                                        label="Tenant Phone No." icon={<PhoneCall size={18} />}
                                        placeholder="Enter Phone" required
                                        value={tenantForm.tenantPhone}
                                        onChange={(e) => setTenantForm((prev) => ({ ...prev, tenantPhone: e.target.value }))}
                                    />

                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                                            Tenant Activity <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <select
                                                className="w-full h-10 px-3 pr-10 rounded-lg border border-slate-300 text-sm font-bold outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-blue-400 bg-white"
                                                value={tenantForm.tenantActivity}
                                                onChange={(e) => setTenantForm((prev) => ({ ...prev, tenantActivity: e.target.value }))}
                                            >
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

                                    <div className="md:col-span-2 flex justify-end">
                                        <button
                                            type="button"
                                            onClick={handleAddTenant}
                                            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-md active:scale-95"
                                        >
                                            <Plus size={18} /> Add More Tenant
                                        </button>
                                    </div>
                                </div>

                                {/* Preview Table */}
                                {tenantList?.length > 0 && (
                                    <div className="overflow-hidden border border-slate-200 rounded-xl shadow-sm">
                                        <table className="w-full text-left border-collapse">
                                            <thead className="bg-slate-100 border-b border-slate-200">
                                                <tr>
                                                    <th className="p-3 text-[10px] font-bold text-slate-500 uppercase">Tenant Name</th>
                                                    <th className="p-3 text-[10px] font-bold text-slate-500 uppercase">GSTN</th>
                                                    <th className="p-3 text-[10px] font-bold text-slate-500 uppercase">PAN</th>
                                                    <th className="p-3 text-[10px] font-bold text-slate-500 uppercase">Phone No.</th>
                                                    <th className="p-3 text-[10px] font-bold text-slate-500 uppercase">Activity</th>
                                                    <th className="p-3 text-[10px] font-bold text-slate-500 uppercase text-center">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100 bg-white">
                                                {tenantList?.map((tenant) => (
                                                    <tr key={tenant.id} className="hover:bg-slate-50 transition-colors">
                                                        <td className="p-3 text-sm font-semibold text-slate-800">{tenant.tenantName}</td>
                                                        <td className="p-3 text-sm text-slate-600 font-mono">{tenant.tenantGstn}</td>
                                                        <td className="p-3 text-sm text-slate-600 font-mono">{tenant.tenantPan}</td>
                                                        <td className="p-3 text-sm text-slate-600 font-mono">{tenant.tenantPhone}</td>
                                                        <td className="p-3 text-sm text-slate-600">
                                                            <span className="px-2 py-1 bg-slate-100 rounded text-[11px] font-bold text-slate-700">
                                                                {tenant.tenantActivity}
                                                            </span>
                                                        </td>
                                                        <td className="p-3 text-center">
                                                            <button
                                                                type="button"
                                                                onClick={() => removeTenant(tenant.id)}
                                                                className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                                title="Remove Tenant"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )}

                        {(isRenting || isRenewal) && (
                            <div className="space-y-6 md:col-span-2">
                                {/* Tenant Input Form */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-xl bg-slate-50/50">

                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                                            Verifier Role <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <select
                                                className="w-full h-10 px-3 pr-10 rounded-lg border border-slate-300 text-sm font-bold outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-blue-400 bg-white"
                                                value={verifierRole}
                                                onChange={(e) => setVerifierRole(e.target.value)}
                                            >
                                                <option value="">Select Verifier Role</option>
                                                <option value="CCA">CA</option>
                                                <option value="CSA">CS</option>
                                                <option value="POF">Proprietor of firm</option>
                                                <option value="DIR">Director of Company</option>
                                            </select>
                                            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                                                <ChevronDown size={16} className="text-slate-500" />
                                            </div>
                                        </div>
                                    </div>
                                    <InputGroup
                                        label="Verifier Name" icon={<User size={18} />}
                                        placeholder="Enter Name" required
                                        onChange={(e) => updateField('v_name', e.target.value)}
                                    />
                                    <InputGroup
                                        label="Verifier Phone No." icon={<PhoneCall size={18} />}
                                        placeholder="Enter Phone" required
                                        onChange={(e) => updateField('v_phone', e.target.value)}
                                    />
                                    <InputGroup
                                        label="Registration No." icon={<Hash size={18} />}
                                        placeholder="Enter Registration No."
                                        onChange={(e) => updateField('v_reg', e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

                        {isTax && (
                            <>
                                <InputGroup label="Rentable Area In Sqft (Super Built-Up Area)" icon={<Maximize size={18} />} placeholder="Area (In Sqft)" required onChange={(e) => updateField('rentable_area', e.target.value)} />
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Tax Service Authority <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <select className="w-full h-10 px-3 pr-10 rounded-lg border border-slate-300 text-sm font-bold outline-none appearance-none bg-white" onChange={(e) => updateField('tax_auth_id', e.target.value)}>
                                            <option>Select Tax Service Authority</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                                            <ChevronDown size={16} />
                                        </div>
                                    </div>
                                </div>
                                <InputGroup label="Address of Premises/Building/Plot of Land" icon={<MapPin size={18} />} placeholder="Address" required onChange={(e) => updateField('tax_addr', e.target.value)} />
                                <InputGroup label="Total space used by the applicant/tenant" icon={<Maximize size={18} />} placeholder="Total space" required onChange={(e) => updateField('tax_space', e.target.value)} />
                                <InputGroup label="Break up of built up space vis-à-vis number of occupant company" icon={<Layers size={18} />} placeholder="Break up details" required onChange={(e) => updateField('tax_breakup', e.target.value)} />
                                <InputGroup label="Description of IT / ITES operation of the occupant" icon={<Activity size={18} />} placeholder="Description" required onChange={(e) => updateField('tax_desc', e.target.value)} />
                                <div className="md:col-span-2">
                                    <InputGroup label="Total used for IT/ITeS activities" icon={<Building size={18} />} placeholder="Total used" required onChange={(e) => updateField('tax_ites_total', e.target.value)} />
                                </div>
                            </>
                        )}

                        <div className="md:col-span-2 mt-4 pt-4 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-green-700 font-bold text-sm">
                                Your Payable amount will be Rs.70800 <span className="text-xs font-normal">(*UDIN charges will be paid extra)</span>
                            </p>
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
                        ) : isLoadingRequiredDocs ? (
                            <div className="bg-white rounded-lg p-3 shadow-sm border border-slate-200 flex justify-center items-center gap-2 h-16">
                                <Loader2 className='animate-spin text-slate-500' /> <span className="text-xs text-slate-400 italic">Loading...</span>
                            </div>
                        ) : (
                            <div className="max-h-[600px] overflow-y-auto flex flex-col gap-3 pr-1 custom-scrollbar">
                                {requiredDocuments?.map((doc: any, idx: number) => {

                                    const uploadInfo = uploadedDocsStatus?.find(
                                        (u: any) => u.project_document_id === doc.project_document_id
                                    );


                                    const isUploaded = uploadInfo?.is_uploaded === 1;

                                    return (
                                        <div
                                            key={idx}
                                            className={`group relative bg-white rounded-xl p-4 border transition-all duration-200 ${isUploaded
                                                    ? 'border-green-100 bg-green-50/30'
                                                    : 'border-slate-200 hover:border-blue-300 hover:shadow-md cursor-pointer'
                                                }`}
                                            onClick={() => !isUploaded && handleUploadClick(doc)}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className={`p-2.5 rounded-lg transition-colors ${isUploaded
                                                            ? 'bg-green-100 text-green-600'
                                                            : 'bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600'
                                                        }`}>
                                                        <FileText size={20} />
                                                    </div>
                                                    <div>
                                                        <p className={`text-sm font-semibold ${isUploaded ? 'text-green-800' : 'text-slate-800'}`}>
                                                            {doc?.project_name}
                                                        </p>
                                                        <p className="text-xs text-slate-500 mt-0.5">
                                                            {isUploaded ? 'Document is Available' : 'Document Not Available'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {isUploaded ? (
                                                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-semibold uppercase tracking-wide border border-emerald-100">
                                                            <CheckCircle2 size={12} />
                                                            Available
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-rose-50 text-rose-600 rounded-full text-[9px] font-semibold uppercase tracking-wide border border-rose-100">
                                                            Not Available
                                                        </div>
                                                    )}
                                                </div>

                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal for Verifier */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-0">
                    <div className='w-full max-w-screen max-h-screen overflow-y-auto rounded-xl'>
                        <NonIndividualUploadDoc docId={activeDoc} isWizard={true} onClose={() => setIsModalOpen(false)} />
                    </div>
                </div>
            )}
        </div>
    );
});

// --- Helper Component for Inputs ---
interface InputGroupProps {
    label: string;
    icon: React.ReactNode;
    placeholder?: string;
    required?: boolean;
    type?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputGroup: React.FC<InputGroupProps> = ({ label, icon, placeholder, required = false, type = "text", value, onChange }) => {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                {label} {required ? <span className="text-red-500">*</span> : <span className="text-slate-400">(optional)</span>}
            </label>
            <div className="flex items-center rounded-lg border border-slate-300 overflow-hidden h-10 transition-all focus-within:ring-2 focus-within:ring-blue-400 bg-white shadow-sm">
                <div className="w-10 h-full bg-slate-100 border-r border-slate-200 flex items-center justify-center text-slate-500">
                    {icon}
                </div>
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="flex-1 px-3 text-sm font-bold outline-none h-full bg-white text-slate-800 placeholder:text-slate-400"
                />
            </div>
        </div>
    );
};

const InputGroupGSTIN: React.FC<InputGroupProps> = ({ label, icon, placeholder, required, type = "text", onChange }) => {
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
                    onChange={onChange}
                    className="flex-1 px-3 text-sm font-bold outline-none h-full bg-white text-slate-800 placeholder:text-slate-400"
                />
                <button className="w-20 cursor-pointer h-full bg-amber-300 hover:bg-amber-400 text-slate-800 font-bold text-xs border-l border-slate-200 flex items-center justify-center text-slate-500">
                    Proceed
                </button>
            </div>
        </div>
    );
};

export default CreateApplicationForm;