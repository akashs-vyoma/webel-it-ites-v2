import React from 'react';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string; // Tailwind class like 'bg-[#f87171]'
}

const StatCard = ({ title, value, icon, color }: StatCardProps) => {
    return (
        <div className={`relative overflow-hidden group ${color} rounded-2xl p-5 shadow-lg border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl h-full`}>
            
            {/* The Shimmer Div */}
            <div className="absolute inset-0 gradient-shimmer pointer-events-none z-10"></div>

            {/* Card Content */}
            <div className="relative z-20 text-white flex flex-col justify-between h-full">
                <div className="flex items-start gap-3 mb-3">
                    <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-md">
                        {icon}
                    </div>
                    <span className="text-2xl xl:text-3xl font-black tracking-tight truncate">
                        {value}
                    </span>
                </div>
                
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-white/90 leading-tight min-h-[2rem]">
                    {title}
                </h3>
            </div>

            {/* Ghost Icon Decoration */}
            <div className="absolute -right-4 -bottom-4 opacity-10 text-white rotate-12 pointer-events-none">
                {React.isValidElement(icon) 
                    ? React.cloneElement(icon as React.ReactElement, { size: 80 }) 
                    : null
                }
            </div>
        </div>
    );
};

export default StatCard;