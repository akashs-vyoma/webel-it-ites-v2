import { Button } from "@/components/ui/button"
import { ArrowRight, FileText } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-secondary">
      <div className="container relative z-10 flex min-h-[calc(100vh-4rem)] items-center">
        <div className="grid gap-12 lg:grid-cols-2 items-center py-12">
          <div className="flex flex-col gap-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold tracking-tight text-primary-foreground lg:text-6xl">Webel</h1>
              <h2 className="text-4xl font-bold tracking-tight text-primary-foreground/90 lg:text-5xl border-b-4 border-primary-foreground/30 pb-2 inline-block">
                Services
              </h2>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                className="gap-2 bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold text-base px-8"
                asChild
              >
                <Link href="/register">
                  Register Now <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 font-semibold text-base px-8 bg-transparent"
                asChild
              >
                <Link href="/user-manual">
                  <FileText className="h-5 w-5" />
                  User Manual
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              <div className="rounded-full bg-primary-foreground/10 p-8">
                <img
                  src="/professional-illustration-of-person-working-at-des.jpg"
                  alt="Document Management Illustration"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
    </section>
  )
}
