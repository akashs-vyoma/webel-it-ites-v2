import CommonFooter from '@/components/common-footer'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import bgNetworkNodes from '@/components/images/background-image.jpg'
import CommonNav from '@/components/common-nav'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen flex flex-col relative font-sans text-gray-700 overflow-x-hidden">

            {/* -------------------------------------------------------------
          BACKGROUND IMAGE LAYER (Screenshot 3)
          Replace 'bg-network-nodes.jpg' with your actual background image path
      ----------------------------------------------------------------- */}
            <div className="absolute inset-0 z-0 bg-blue-50">
                <Image
                    width={1920}
                    height={1080}
                    src={bgNetworkNodes}
                    alt="Background Pattern"
                    className="w-full h-full object-cover opacity-60 mix-blend-multiply"
                />

                {/* Overlay gradient to match the fade effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent"></div>
            </div>

            {/* -------------------------------------------------------------
          HEADER / NAVBAR
      ----------------------------------------------------------------- */}
            <CommonNav />

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