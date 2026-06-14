import { About } from "@/components/about"
import { Arsenal } from "@/components/arsenal"
import { Certifications } from "@/components/certifications"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/hero"
import { Journey } from "@/components/journey"
import { Navbar } from "@/components/navbar"
import { Projects } from "@/components/projects"

function SectionDivider() {
  return (
    <div className="relative w-full flex items-center justify-center h-px">
      <div 
        className="absolute w-full h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(0,210,255,0.2), transparent)" }}
      />
      <div 
        className="absolute w-1 h-1 bg-[#00d2ff]"
        style={{ transform: "rotate(45deg)" }}
      />
    </div>
  )
}

export default function Page() {
  return (
    <main className="min-h-[100dvh]" style={{ backgroundColor: "#020408", overflowX: "hidden" }}>
      <Navbar />
      <Hero />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <Arsenal />
      <SectionDivider />
      <Journey />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Certifications />
      <SectionDivider />
      <Contact />
      <Footer />
    </main>
  )
}
