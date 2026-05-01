import { About } from "@/components/about"
import { Arsenal } from "@/components/arsenal"
import { Certifications } from "@/components/certifications"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/hero"
import { Journey } from "@/components/journey"
import { Navbar } from "@/components/navbar"
import { Projects } from "@/components/projects"

export default function Page() {
  return (
    <main className="min-h-[100dvh]" style={{ backgroundColor: "#020408" }}>
      <Navbar />
      <Hero />
      <Projects />
      <Arsenal />
      <Journey />
      <About />
      <Certifications />
      <Contact />
      <Footer />
    </main>
  )
}
