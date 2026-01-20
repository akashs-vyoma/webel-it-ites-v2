import React from 'react';
import Link from 'next/link';
import { Lock } from 'lucide-react'; // Optional: icon library

const Unauthorized: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[70vh] w-full px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 text-center transition-all hover:shadow-2xl">
        
        {/* Icon Header */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-red-50 rounded-2xl">
            <Lock className="w-12 h-12 text-red-500" />
          </div>
        </div>

        {/* Required Text */}
        <h1 className="text-5xl font-black tracking-tighter text-gray-900 mb-2">
          HOLD UP
        </h1>
        
        <p className="text-xl font-medium text-red-600 mb-8">
          Error 401:uthorize
        </p>

        <div className="h-px w-full bg-gray-100 mb-8" />

        <p className="text-gray-500 mb-8 leading-relaxed">
          It looks like you don't have the necessary permissions to view this resource. 
          Please log in with an authorized account.
        </p>

        {/* Action Button */}
        <Link 
          href="/" 
          className="inline-block w-full py-4 px-8 bg-gray-900 hover:bg-black text-white font-bold rounded-2xl transition-colors duration-200 shadow-lg shadow-gray-200"
        >
          Return to Safety
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;