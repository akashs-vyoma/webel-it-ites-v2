"use client"
import React, { useEffect } from 'react';
import Link from 'next/link';
import { Lock } from 'lucide-react'; // Optional: icon library
import { deleteAllCookies } from '@/utils/cookies';
import Image from 'next/image';
import logo from "@/components/images/webel-logo.png"

const Unauthorized: React.FC = () => {
  useEffect(() => {
    deleteAllCookies();
  }, [])
  return (
    <div className="flex flex-col gap-1 items-center justify-center min-h-[70vh] w-full px-4">
      <div>
        <Image width={100} height={100} alt="logo" src={logo} />
      </div>
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 text-center transition-all hover:shadow-2xl">
        {/* Icon Header */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-red-50 rounded-full">
            <Lock className="w-8 h-8 text-red-500" />
          </div>
        </div>

        {/* Required Text */}
        <h1 className="text-4xl font-black tracking-tighter text-gray-700 mb-2">
          Access Denied!
        </h1>

        <p className="text-xl font-medium text-red-600 mb-8">
          Error 401: unauthorize
        </p>

        <div className="h-px w-full bg-gray-100 mb-8" />

        <p className="text-gray-500 text-justify mb-8 leading-tight">
          It looks like you don't have the necessary permissions to view this resource.
          Please log in with an authorized account.
        </p>

        {/* Action Button */}
        <Link
          href="/"
          className="inline-block w-full py-4 px-8 bg-gray-900 hover:bg-black text-white font-bold rounded-2xl transition-colors duration-200 shadow-lg shadow-gray-200"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;