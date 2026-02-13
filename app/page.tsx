import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { MenuHighlights } from "@/components/menu-highlights"
import { Gallery } from "@/components/gallery"
import { Events } from "@/components/events"
import { Reservation } from "@/components/reservation"
import { Location } from "@/components/location"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <div className="section-divider" />
      <About />
      <div className="section-divider" />
      <MenuHighlights />
      <div className="section-divider" />
      <Gallery />
      <div className="section-divider" />
      <Events />
      <div className="section-divider" />
      <Reservation />
      <div className="section-divider" />
      <Location />
      <Footer />
    </main>
  )
}
