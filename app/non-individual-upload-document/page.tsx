'use client';
import NonIndividualUploadDoc from "@/components/NonIndividualUploadDoc";


export default function page() {
    return (

        <NonIndividualUploadDoc isWizard={false} onClose={() => { console.log("Closed") }} />
    )
}
