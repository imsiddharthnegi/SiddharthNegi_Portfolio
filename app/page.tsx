import { Arsenal } from "@/components/arsenal"
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
    </main>
  )
}
