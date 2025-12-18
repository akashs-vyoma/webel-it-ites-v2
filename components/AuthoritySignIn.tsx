"use client"

import React, { useState } from "react"
import { Eye, EyeOff, Key, LogIn, Smartphone, User, ShieldCheck } from "lucide-react"

export default function DepartmentSignIn() {
  const [isSuperAdmin, setIsSuperAdmin] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  
  // Form states
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="flex justify-center items-center min-h-screen  p-4">
      <div className="w-full max-w-xl bg-white shadow-2xl rounded-2xl overflow-hidden border border-slate-200">
        
        {/* Header - Neon Blue/Violet Gradient */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-wide">
                Department Sign In
              </h2>
              <p className="text-indigo-100 text-xs">Secure access for authorized personnel</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Checkbox Toggle */}
          <div className="flex items-center gap-3 mb-8 bg-slate-50 p-3 rounded-xl border border-slate-100">
            <div className="relative flex items-center">
              <input
                type="checkbox"
                id="superAdmin"
                checked={isSuperAdmin}
                onChange={(e) => {
                  setIsSuperAdmin(e.target.checked)
                  setPassword("") // Clear password on toggle
                }}
                className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-slate-300 transition-all checked:border-indigo-600 checked:bg-indigo-600 hover:border-indigo-400"
              />
              <svg
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <label
              htmlFor="superAdmin"
              className="text-sm font-semibold text-slate-700 cursor-pointer select-none"
            >
              Login as Super Admin
            </label>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            
            {/* Phone Number Field */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Phone Number
              </label>
              <div className="flex items-stretch border-2 border-slate-200 rounded-xl overflow-hidden focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all h-12 bg-white">
                {/* Left Icon */}
                <div className="bg-slate-50 w-12 flex items-center justify-center border-r border-slate-200">
                  {isSuperAdmin ? (
                    <User className="w-5 h-5 text-indigo-600" />
                  ) : (
                    <Smartphone className="w-5 h-5 text-indigo-600" />
                  )}
                </div>
                
                {/* Input */}
                <input
                  type="text"
                  placeholder="Enter registered mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 px-4 text-slate-900 placeholder:text-slate-400 outline-none font-medium"
                />

                {/* Send OTP Button (Only visible if NOT Super Admin) */}
                {!isSuperAdmin && (
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 text-sm font-bold transition-colors">
                    Send OTP
                  </button>
                )}
              </div>
            </div>

            {/* Password Field (Only visible if Super Admin) */}
            {isSuperAdmin && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Password
                </label>
                <div className="flex items-stretch border-2 border-slate-200 rounded-xl overflow-hidden focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all h-12 bg-white">
                  {/* Left Icon */}
                  <div className="bg-slate-50 w-12 flex items-center justify-center border-r border-slate-200">
                    <Key className="w-5 h-5 text-indigo-600" />
                  </div>

                  {/* Input */}
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex-1 px-4 text-slate-900 placeholder:text-slate-400 outline-none font-medium"
                  />

                  {/* Eye Toggle Button */}
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="px-4 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Login Button (Only visible if Super Admin) */}
            {isSuperAdmin && (
              <div className="pt-2 animate-in fade-in duration-300">
                <button className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]">
                  Secure Login <LogIn className="w-4 h-4" />
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Footer Instruction - Yellow Background */}
        <div className="bg-amber-50 px-8 py-4 border-t border-amber-200">
          <div className="flex gap-2">
            <div className="mt-0.5">
               <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
            </div>
            <p className="text-amber-800 text-sm font-medium leading-relaxed">
              <span className="font-bold">Instruction:</span> Department Authorized users can log in by{" "}
              <a href="#" className="underline decoration-2 decoration-amber-400 hover:text-amber-900 hover:decoration-amber-600 transition-all">
                Mobile Number & OTP Verification
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}