import React from 'react';
import {
    FileText,
    CreditCard,
    CloudUpload,
    PlusSquare,
    FileSignature,
    AlertTriangle,
    Sparkles,
    TrendingUp,
    ChevronRight
} from 'lucide-react';

const CompanyDashboard: React.FC = () => {
    return (
        <main className="relative z-10 min-h-screen selection:bg-cyan-200 selection:text-blue-900">
            {/* Background gradient effects */}
            <div className="absolute top-0 left-0 w-full h-96 to-transparent -z-10"></div>
            <div className="absolute top-0 right-0 w-1/3 h-96 bg-gradient-to-bl from-yellow-100/30 via-cyan-50/20 to-transparent blur-3xl -z-10"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

                {/* Welcome Message */}
                <div className="mb-10 lg:mb-14">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-cyan-100 rounded-full mb-4 shadow-sm shadow-cyan-100">
                        <Sparkles size={16} className="text-cyan-500 fill-cyan-500/20" />
                        <span className="text-sm font-semibold text-cyan-600 tracking-wide">Company Overview</span>
                    </div>
                    <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-800 tracking-tight">
                        Welcome Back
                    </h2>
                    <p className="text-lg lg:text-xl text-slate-500 mt-2 font-medium uppercase tracking-wide">
                        Vyoma Innovus Global Private Limited
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10">

                    {/* Left Column */}
                    <div className="lg:col-span-5 w-full">
                        <div className="relative group h-full min-h-[400px] lg:min-h-[500px]">
                            <div className="absolute overflow-hidden inset-0 rounded-[2.5rem]">
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-600/5"></div>
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/20 via-transparent to-blue-500/20 blur-xl"></div>
                                </div>
                            </div>
                                                    <div className="relative z-10 h-full flex items-center justify-center p-8 lg:p-10">
    <div className="w-full max-w-md rounded-2xl overflow-hidden">
        <img
            src="/7127980.jpg"
            alt="Dashboard Illustration"
            className="w-full h-auto object-contain drop-shadow-xl transition-all duration-700 group-hover:scale-105 group-hover:drop-shadow-[0_20px_60px_rgba(6,182,212,0.25)]"
        />
    </div>
</div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">

                        {/* Card 1 */}
                        <div className="group relative overflow-hidden rounded-[2rem] min-h-[180px] shadow-xl shadow-blue-200/50 hover:shadow-cyan-400/20 transition-all duration-500">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-cyan-400"></div>
                            <div className="absolute inset-0 gradient-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"></div>
                            <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
                                <div className="flex justify-between items-start">
                                    <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/10">
                                        <CloudUpload size={20} />
                                    </div>
                                    <h3 className="text-5xl font-bold tracking-tighter">17</h3>
                                </div>
                                <p className="text-lg font-semibold">All Documents</p>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="group relative overflow-hidden rounded-[2rem] min-h-[180px] shadow-xl shadow-yellow-100/50 hover:shadow-yellow-400/20 transition-all duration-500">
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-yellow-400"></div>
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="absolute inset-0 gradient-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"></div>
                            <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
                                <div className="flex justify-between items-start">
                                    <div className="w-10 h-10 rounded-xl bg-black/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                                        <PlusSquare size={20} />
                                    </div>
                                    <h3 className="text-5xl font-bold tracking-tighter">0</h3>
                                </div>
                                <p className="text-lg font-semibold">Letter Issued</p>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="group relative overflow-hidden rounded-[2rem] min-h-[180px] shadow-xl shadow-indigo-200/50 hover:shadow-purple-400/20 transition-all duration-500">
                            <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-indigo-400"></div>
                            <div className="absolute inset-0 gradient-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"></div>
                            <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
                                <div className="flex justify-between items-start">
                                    <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
                                        <FileSignature size={20} />
                                    </div>
                                    <h3 className="text-5xl font-bold tracking-tighter">4</h3>
                                </div>
                                <p className="text-lg font-semibold">Sign Done</p>
                            </div>
                        </div>

                        {/* Card 4 */}
                        <div className="group relative overflow-hidden rounded-[2rem] min-h-[180px] shadow-xl shadow-blue-200/50 hover:shadow-cyan-400/20 transition-all duration-500">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-cyan-400"></div>
                            <div className="absolute inset-0 gradient-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"></div>
                            <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
                                <div className="flex justify-between items-start">
                                    <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/10">
                                        <CreditCard size={20} />
                                    </div>
                                    <h3 className="text-5xl font-bold tracking-tighter">0</h3>
                                </div>
                                <p className="text-lg font-semibold">Payment Done</p>
                            </div>
                        </div>

                        {/* Card 5 */}
                        <div className="md:col-span-2 group relative overflow-hidden rounded-[2rem] min-h-[160px] cursor-pointer bg-white border border-slate-100 shadow-lg hover:border-blue-500 transition-all duration-300">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="absolute inset-0 gradient-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"></div>
                            <div className="relative z-10 p-6 h-full flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <div className="relative bg-white w-16 h-16 rounded-2xl flex items-center justify-center border border-slate-100 shadow-sm">
                                        <AlertTriangle size={32} className="text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-slate-800">Approval Pending</p>
                                        <p className="text-sm text-slate-400 font-medium">Documents awaiting review</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <h3 className="text-6xl font-bold tracking-tighter text-blue-600">0</h3>
                                    <ChevronRight size={24} className="text-blue-600" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
};

export default CompanyDashboard;
