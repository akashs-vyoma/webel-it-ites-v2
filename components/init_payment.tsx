import React from 'react';
import { CreditCard } from 'lucide-react'; 

const PaymentCard: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen ">
      {/* Main Container */}
      <div className="w-full max-w-[600px] bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
        
        {/* Header Bar - Added relative, overflow-hidden and the shimmer div */}
        <div className="relative bg-blue-700 text-white py-3 px-6 text-lg font-medium overflow-hidden">
          <div className="absolute inset-0 gradient-shimmer pointer-events-none z-10"></div>
          <span className="relative z-20">Online Payment</span>
        </div>

        {/* Inner Card Content */}
        <div className="p-8">
          <div className="bg-white border border-gray-100 shadow-sm rounded-md p-6">
            
            {/* Logo Section */}
            <div className="flex flex-col items-center mb-8">
              <img 
                src="webel-logo.png" 
                alt="Company Logo" 
                className="h-20 w-auto object-contain" 
              />
            </div>

            {/* Order Details */}
            <div className="space-y-2 mb-8 text-[15px] text-gray-800">
              <p><span className="font-bold">Order ID :</span> 2645</p>
              <p>
                <span className="font-bold">Service Type :</span> NOC for Renting Out Leased Property - MULTI PARTY
              </p>
            </div>

            {/* Payment Table */}
            <div className="w-full">
              {/* Table Header */}
              <div className="flex justify-between bg-[#f2f2f2] px-3 py-2 font-bold text-sm border-b border-gray-300">
                <span>Payment Heads</span>
                <span>Price</span>
              </div>

              {/* Rows */}
              <div className="px-3 py-2 space-y-3 text-[15px]">
                <div className="flex justify-between">
                  <span>Total Application Amount</span>
                  <span>₹ 774.19</span>
                </div>
                <div className="flex justify-between">
                  <span>GST @18%</span>
                  <span>₹ 139.35</span>
                </div>
                
                <hr className="border-gray-300" />
                
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>₹ 913.55</span>
                </div>

                <div className="pt-2">
                  <div className="flex justify-between font-bold">
                    <span>UDIN Document Upload Charge</span>
                    <span>₹ 3500</span>
                  </div>
                  <a href="#" className="text-blue-500 underline text-sm">
                    UDIN Document Upload Rate
                  </a>
                </div>

                <hr className="border-gray-300" />

                {/* Final Total */}
                <div className="flex justify-between items-center pt-2">
                  <span className="text-[#008000] font-bold text-lg">Total Payable Amount:</span>
                  <span className="text-[#008000] font-bold text-lg">₹ 4413.55</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer with Button */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end border-t border-gray-200">
          <button className="bg-blue-700 hover:bg-blue-800 text-white flex items-center gap-2 px-6 py-2 rounded-xl transition-all font-medium">
            <CreditCard size={18} />
            Pay
          </button>
        </div>

      </div>
    </div>
  );
};

export default PaymentCard;