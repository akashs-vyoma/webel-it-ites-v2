import React from 'react';
import {
    Home,
    FolderOpen,
    FileText,
    Users,
    CreditCard,
    LogOut,
    ChevronDown,
    CloudUpload,
    Plus
} from 'lucide-react';

const UserDashboard: React.FC = () => {
    return (

        <main className="relative z-10 container mx-auto px-6 py-8">

            {/* Welcome Message */}
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-700 mb-8">
                Welcome <span className="uppercase">Vyoma Innovus Global Private Limited</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Left Column: Large Graphic Image */}
                <div className="lg:col-span-5 w-full">
                    <div className="rounded-2xl overflow-hidden shadow-lg h-full min-h-[400px] relative flex items-center justify-center p-8 group">
                        {/* Simulated Illustration based on screenshot */}
                        <img
                            src="https://img.freepik.com/free-vector/online-document-concept-illustration_114360-5453.jpg?w=900"
                            alt="Dashboard Illustration"
                            className="rounded-lg shadow-2xl w-full h-auto object-cover mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                </div>

                {/* Right Column: Dashboard Cards */}
                <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Card 1: Total Uploaded Document */}
                    <div className="bg-[#7da0fa] rounded-2xl p-6 text-white shadow-lg flex flex-col justify-between min-h-[200px] hover:shadow-xl transition-shadow">
                        <div>
                            <p className="text-sm opacity-90 mb-2">Webel Services</p>
                            <h3 className="text-5xl font-medium mb-2">17</h3>
                        </div>
                        <p className="text-xl font-medium">Total Uploaded <br /> Document</p>
                    </div>

                    {/* Card 2: Multi Party Declaration */}
                    <div className="bg-[#7da0fa] rounded-2xl p-6 text-white shadow-lg flex flex-col justify-between min-h-[200px] hover:shadow-xl transition-shadow">
                        <div>
                            <p className="text-sm opacity-90 mb-2">Webel Services</p>
                            <h3 className="text-5xl font-medium mb-2">2</h3>
                        </div>
                        <p className="text-xl font-medium">Multi Party Declaration</p>
                    </div>

                    {/* Card 3: Upload Document (Action) */}
                    <div className="bg-[#474ba3] rounded-2xl p-6 text-white shadow-lg flex flex-col justify-center gap-4 min-h-[180px] cursor-pointer hover:bg-[#3d4190] transition-colors group">
                        <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                            <CloudUpload size={28} />
                        </div>
                        <p className="text-2xl font-medium">Upload Document</p>
                    </div>

                    {/* Card 4: Create Application (Action) */}
                    <div className="bg-[#f07070] rounded-2xl p-6 text-white shadow-lg flex flex-col justify-center gap-4 min-h-[180px] cursor-pointer hover:bg-[#e66363] transition-colors group">
                        <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Plus size={28} />
                        </div>
                        <p className="text-2xl font-medium">Create Application</p>
                    </div>

                </div>
            </div>
        </main>

    );
};

export default UserDashboard;