"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Menu, X } from "lucide-react"

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const [mobileOrgOpen, setMobileOrgOpen] = useState(false)
  const [mobileUserOpen, setMobileUserOpen] = useState(false)

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    setMobileOrgOpen(false)
    setMobileUserOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex flex-col items-start">
              <span className="text-sm font-semibold text-primary">Webel</span>
              <span className="text-xs font-bold tracking-wider text-foreground">SERVICES</span>
            </div>
          </Link>
        </div>

        {/* --- DESKTOP NAVIGATION (Logic Unchanged) --- */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/sign-agreement" className="text-sm font-medium hover:text-primary transition-colors">
            Sign Agreement
          </Link>
          <Link href="/search-by-udin" className="text-sm font-medium hover:text-primary transition-colors">
            Search By UDIN
          </Link>
          <Link href="/verify-auth-person" className="text-sm font-medium hover:text-primary transition-colors">
            Verify Auth Person
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-sm font-medium gap-1">
                Organization <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Overview</DropdownMenuItem>
              <DropdownMenuItem>Services</DropdownMenuItem>
              <DropdownMenuItem>Partners</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-sm font-medium gap-1">
                User <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/contact-us" className="text-sm font-medium hover:text-primary transition-colors">
            Contact Us
          </Link>
        </nav>

        {/* Mobile Toggle Button */}
        <div className="md:hidden flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* --- MOBILE NAVIGATION --- */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background absolute top-16 left-0 w-full h-[calc(100vh-64px)] z-50 overflow-y-auto pb-10">
          <nav className="flex flex-col p-4 space-y-2">
            <Link href="/" className="px-4 py-3 text-base font-medium border-b border-muted" onClick={closeMobileMenu}>
              Home
            </Link>
            <Link href="/about" className="px-4 py-3 text-base font-medium border-b border-muted" onClick={closeMobileMenu}>
              About
            </Link>
            <Link href="/sign-agreement" className="px-4 py-3 text-base font-medium border-b border-muted" onClick={closeMobileMenu}>
              Sign Agreement
            </Link>
            <Link href="/search-by-udin" className="px-4 py-3 text-base font-medium border-b border-muted" onClick={closeMobileMenu}>
              Search By UDIN
            </Link>
            <Link href="/verify-auth-person" className="px-4 py-3 text-base font-medium border-b border-muted" onClick={closeMobileMenu}>
              Verify Auth Person
            </Link>

            {/* Organization Mobile Accordion */}
            <div className="border-b border-muted">
              <button 
                onClick={() => setMobileOrgOpen(!mobileOrgOpen)}
                className="flex items-center justify-between w-full px-4 py-3 text-base font-medium hover:text-primary"
              >
                Organization <ChevronDown className={`h-4 w-4 transition-transform ${mobileOrgOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileOrgOpen && (
                <div className="bg-muted/30 px-6 py-2 flex flex-col gap-3 animate-in slide-in-from-top-1">
                  <div className="text-sm py-1 cursor-pointer" onClick={closeMobileMenu}>Overview</div>
                  <div className="text-sm py-1 cursor-pointer" onClick={closeMobileMenu}>Services</div>
                  <div className="text-sm py-1 cursor-pointer" onClick={closeMobileMenu}>Partners</div>
                </div>
              )}
            </div>

            {/* User Mobile Accordion */}
            <div className="border-b border-muted">
              <button 
                onClick={() => setMobileUserOpen(!mobileUserOpen)}
                className="flex items-center justify-between w-full px-4 py-3 text-base font-medium hover:text-primary"
              >
                User <ChevronDown className={`h-4 w-4 transition-transform ${mobileUserOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileUserOpen && (
                <div className="bg-muted/30 px-6 py-2 flex flex-col gap-3 animate-in slide-in-from-top-1">
                  <div className="text-sm py-1 cursor-pointer" onClick={closeMobileMenu}>Profile</div>
                  <div className="text-sm py-1 cursor-pointer" onClick={closeMobileMenu}>Settings</div>
                  <div className="text-sm py-1 cursor-pointer" onClick={closeMobileMenu}>Logout</div>
                </div>
              )}
            </div>

            <Link href="/contact-us" className="px-4 py-3 text-base font-medium border-b border-muted" onClick={closeMobileMenu}>
              Contact Us
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}