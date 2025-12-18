import { Lock } from 'lucide-react'
import React from 'react'

const CommonCard = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="glass-morphism rounded-[32px]  overflow-hidden border border-white/60 animate-scale-in">
            {/* Header with Gradient */}
            <div className="relative overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-blue-600 to-blue-600"></div>

                {/* Subtle Pattern Overlay */}
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
                    backgroundSize: '32px 32px'
                }}></div>

            x
                <div className="absolute inset-0 gradient-shimmer"></div>

                {/* Content */}
                <div className="relative z-10 px-8 py-10 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 mb-5 shadow-xl">
                        <Lock className="text-white" size={28} />
                    </div>
                    <h1 className="text-2xl font-bold text-white tracking-tight mb-2">Individual Sign-In</h1>
                    <p className="text-indigo-100 text-sm font-medium">Sign in to access your dashboard</p>
                </div>

                {/* Bottom Wave */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12">
                        <path d="M0,0 C300,80 900,80 1200,0 L1200,120 L0,120 Z" fill="rgba(248, 250, 252, 1)"></path>
                    </svg>
                </div>
            </div>

            {/* Body Content */}
            <div className="px-8 pb-8 pt-6 bg-gradient-to-b from-slate-50/90 to-white/90">
                {children}
            </div>
        </div>
    )
}

export default CommonCard