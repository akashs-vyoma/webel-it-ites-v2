import About from "@/components/About";
import ContactUs from "@/components/ContactUs";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServicesList from "@/components/ServicesList";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />
        <ServicesList />
        <ContactUs />
      </main>
      <Footer />
    </div>
  )
}
