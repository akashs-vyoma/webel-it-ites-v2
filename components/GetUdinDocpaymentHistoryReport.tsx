
import { useAuth } from '@/hooks/useAuth';
import { callAPI } from './apis/commonAPIs';
import ReportFilterSection from './GetProvisionalReport';

const UdinDocpayment = () => {
    const { user } = useAuth();
    const getAuthorityUDINDocPaymentHistoryReport = async ({ service = 0, fromDate = null, toDate = null }) => {
        const response = await callAPI("/admin/GetAuthorityUDINDocPaymentHistoryReport", {
            "project_id": service,
            "user_id": user?.authority_id,
            "from_date": fromDate,
            "to_date": toDate
        });
    }
    return (
        <div>
            <ReportFilterSection title="Report of UDIN DOC Payment History" onSearch={getAuthorityUDINDocPaymentHistoryReport} />

        </div>
    );
};

export default UdinDocpayment;