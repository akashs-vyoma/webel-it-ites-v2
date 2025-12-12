import React from 'react'
import Link from 'next/link'

const CommonNav = () => {
  return (
      <nav className="relative z-10 w-full bg-white shadow-sm border-b border-gray-200 px-6 py-3 flex justify-between items-center h-16">
                <div className="flex flex-col leading-none">
                    {/* Webel Logo Text Recreation */}
                    <h1 className="text-3xl font-bold text-[#2d5aa8] tracking-tighter">Webel</h1>
                    <span className="text-[10px] text-gray-500 tracking-wide">opportunities infinite</span>
                </div>

                <div className="text-sm font-medium text-gray-800 cursor-pointer hover:text-[#2d5aa8]">
                    <Link href="/">Home</Link>
                </div>
            </nav>
  )
}

export default CommonNav