"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

export function SiteHeader() {
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
      </div>
    </header>
  )
}
