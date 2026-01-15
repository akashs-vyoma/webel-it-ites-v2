import React from 'react'
import { data } from '@/components/Declarations/dummy-data/renting/renewal/single/renting_renewal_single_party_final'
import FinalNOCLetter from '@/components/Declarations/views/renting/normal/single/renting-single-final'
import ProvisionalNOCLetter from '@/components/Declarations/views/renting/normal/single/renting-single-provisional'
import MultiOwnerDeclaration from '@/components/Declarations/views/renting/renewal/multi/renting-renewal-multi-owner-declaration'
import FinalNOCRenewalMultiOwner from '@/components/Declarations/views/renting/renewal/multi/renting-renewal-multi-owner-final'
import RenewalMultiOwnerNOC from '@/components/Declarations/views/renting/renewal/multi/renting-renewal-multi-owner-provisional'
import RentingRenewalDeclaration from '@/components/Declarations/views/renting/renewal/multi/renting-renewal-multi-owner-single-declaration'
import RentingRenewalSingleDeclaration from '@/components/Declarations/views/renting/renewal/single/renting-renewal-single-party-declaration'
import FinalNOCRenewal from '@/components/Declarations/views/renting/renewal/single/renting-renewal-single-party-final'


const page = () => {
    return (
        <FinalNOCRenewal data={data} />

    )
}

export default page