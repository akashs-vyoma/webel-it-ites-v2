"use client";
import About from "@/components/About";
import ContactUs from "@/components/ContactUs";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServicesList from "@/components/ServicesList";
import { useState } from "react";

export default function HomePage() {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header open={open} setOpen={setOpen}/>
      <main className="flex-grow">
        <Hero open={open} setOpen={setOpen} />
        <About />
        <ServicesList />
        <ContactUs />
      </main>
      <Footer />
    </div>
  )
}
