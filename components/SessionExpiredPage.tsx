"use client"
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/components/images/webel-logo.png"
import { deleteAllCookies } from "@/utils/cookies";

export default function SessionExpiredPage() {
  useEffect(() => {
    deleteAllCookies();
  }, [])
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 p-4 transition-colors dark:bg-black">

      {/* Brand Logo Placeholder (Optional) */}
      <div className="mb-8">
        <Image width={100} height={100} alt="logo" src={logo} />
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl dark:border-neutral-800 dark:bg-neutral-900">

        {/* Top Accent Line */}
        <div className="h-1.5 w-full bg-blue-600 dark:bg-blue-500" />

        <div className="px-8 py-10 text-center">

          {/* Lock Icon */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-8 w-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </div>

          {/* Text Content */}
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Session Expired
          </h1>
          <p className="mb-8 text-sm text-gray-500 dark:text-gray-400">
            For your security, we automatically signed you out due to inactivity. Please sign in again to continue.
          </p>

          <div className="flex gap-2">
            <Link
              href="/individual-sing-in" // Update this to your login route
              className="group relative flex w-full justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 active:scale-[0.98]"
            >
              Log in again
            </Link>
            <Link
              href="/company-login" // Update this to your login route
              className="group relative flex w-full justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 active:scale-[0.98]"
            >
              Company Log in
            </Link>
          </div>

          {/* Secondary Action */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <span className="h-px w-full bg-gray-200 dark:bg-neutral-800"></span>
            <span className="text-xs uppercase text-gray-400">or</span>
            <span className="h-px w-full bg-gray-200 dark:bg-neutral-800"></span>
          </div>

          <Link
            href="/"
            className="mt-6 block text-sm font-medium text-gray-600 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-gray-200"
          >
            Return to Home Page
          </Link>
        </div>
      </div>

      {/* Footer / Trust Signal */}
      <p className="mt-8 flex items-center gap-2 text-xs text-gray-400 dark:text-neutral-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-4 w-4"
        >
          <path
            fillRule="evenodd"
            d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
            clipRule="evenodd"
          />
        </svg>
        Secure Connection
      </p>
    </div>
  );
}