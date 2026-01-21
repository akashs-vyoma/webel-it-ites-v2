"use client";

import { createContext, useState, ReactNode } from "react";
import { Check, X, AlertTriangle, Dot, AlertCircle } from "lucide-react";

type AlertType = "success" | "error";

interface AlertData {
    type: AlertType;
    title: string;
    message: string;
    onConfirm?: () => void;
}

interface AlertContextType {
    showAlert: (data: AlertData) => void;
}

export const AlertContext = createContext<AlertContextType | null>(null);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
    const [alert, setAlert] = useState<AlertData | null>(null);

    const showAlert = (data: AlertData) => {
        setAlert(data);
    };

    const closeAlert = () => {
        setAlert(null);
    };

    const handleConfirm = () => {
        if (alert?.onConfirm) {
            alert.onConfirm(); // 🔥 callback executed
        }
        closeAlert(); // always close
    };

    const isSuccess = alert?.type === "success";

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}

            {alert && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-[400px] p-8 text-center animate-in zoom-in-95 duration-300 relative border border-white/20">

                        {/* Icon */}
                        <div
                            className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-6 relative ${isSuccess ? "bg-green-50" : "bg-red-50"
                                }`}
                        >
                            <div
                                className={`absolute inset-0 rounded-full border-4 ${isSuccess ? "border-green-100" : "border-red-100"
                                    } animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]`}
                            />
                            <div
                                className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg ${isSuccess
                                    ? "bg-gradient-to-br from-green-400 to-green-500 shadow-green-200"
                                    : "bg-gradient-to-br from-red-400 to-red-500 shadow-red-200"
                                    }`}
                            >
                                {isSuccess ? (
                                    <Check size={40} className="text-white stroke-[3] animate-pulse" />
                                ) : (
                                    <AlertTriangle size={40} className="text-white stroke-[3] animate-caret-blink" />
                                )}
                            </div>
                        </div>

                        {/* Text */}
                        <div className="space-y-3 mb-8">
                            <h3 className="text-xl font-bold text-slate-900">
                                {alert.title}
                            </h3>
                            <p className="text-slate-500 text-sm">
                                {alert.message}
                            </p>
                        </div>

                        {/* OK Button */}
                        <button
                            onClick={handleConfirm}
                            className={`w-[40%] py-3.5 rounded-xl font-bold text-sm text-white transition-all active:scale-[0.98]
                ${isSuccess
                                    ? "bg-[#1F51FF] hover:bg-blue-600 shadow-[0_4px_14px_rgba(31,81,255,0.4)]"
                                    : "bg-red-500 hover:bg-red-600 shadow-[0_4px_14px_rgba(239,68,68,0.4)]"
                                }
              `}
                        >
                            OK
                        </button>

                        {/* Footer */}
                        <div className="mt-6 pt-3 border-t border-gray-200 text-xs text-gray-500 text-center">
                            ©️ Webel Online Services
                        </div>

                        {/* Close */}
                        <button
                            onClick={closeAlert}
                            className="absolute top-4 right-4 p-2 text-slate-300 hover:text-slate-500"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>
            )}
        </AlertContext.Provider>
    );
};
