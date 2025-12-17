"use client"
import React from 'react'
import Image from 'next/image'

const CommonBg = () => {
    return (
        <div className="absolute inset-0 z-0 bg-blue-100">
            <Image
                width={1920}
                height={1080}
                src="/11234.jpeg"
                alt="Background Pattern"
                className="w-full h-full object-cover mix-blend-dark opacity-60"
            />

            {/* Overlay gradient to match the fade effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent"></div>
        </div>
    )
}

export default CommonBg;