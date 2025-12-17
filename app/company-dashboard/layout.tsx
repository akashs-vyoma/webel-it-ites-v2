import CommonFooter from '@/components/common-footer'
import Image from 'next/image'
import React from 'react'
import CommonNav from '@/components/common-nav'
import CommonBg from '@/components/common-bg'
import OrganisationNav from '@/components/company-navbar'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen flex flex-col relative font-sans text-gray-700 overflow-x-hidden">

            {/* -------------------------------------------------------------
          BACKGROUND IMAGE LAYER (Screenshot 3)
          Replace 'bg-network-nodes.jpg' with your actual background image path
      ----------------------------------------------------------------- */}
            <CommonBg />

            {/* -------------------------------------------------------------
          HEADER / NAVBAR
      ----------------------------------------------------------------- */}
            <OrganisationNav />

            {/* -------------------------------------------------------------
          MAIN CONTENT AREA
      ----------------------------------------------------------------- */}
            <main className="relative z-10 flex-grow flex justify-start py-6 px-4">
                {children}
            </main>

            {/* -------------------------------------------------------------
          FOOTER GRAPHICS (Screenshot 2)
          Replace 'footer-panorama.png' with your actual footer image path
      ----------------------------------------------------------------- */}
            <CommonFooter />

        </div>
    )
}

export default layout