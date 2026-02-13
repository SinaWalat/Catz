"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const topRow = [
  {
    title: "Classic Old Fashioned",
    category: "Cocktails",
    price: "$18",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=800&auto=format&fit=crop",
    description: "Bourbon, aromatic bitters, applewood smoke",
  },
  {
    title: "Grilled Lamb Rack",
    category: "Mains",
    price: "$45",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop",
    description: "Herb-crusted lamb, pomegranate glaze, roasted vegetables",
  },
  {
    title: "Espresso Martini",
    category: "Cocktails",
    price: "$16",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop",
    description: "Vodka, fresh espresso, coffee liqueur, vanilla",
  },
  {
    title: "Seared Sea Bass",
    category: "Mains",
    price: "$38",
    image: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?q=80&w=800&auto=format&fit=crop",
    description: "Crispy skin sea bass, saffron risotto, citrus beurre blanc",
  },
  {
    title: "Truffle Mushroom Risotto",
    category: "Mains",
    price: "$32",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=800&auto=format&fit=crop",
    description: "Arborio rice, wild mushrooms, shaved black truffle",
  },
  {
    title: "Wagyu Beef Tartare",
    category: "Starters",
    price: "$28",
    image: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?q=80&w=800&auto=format&fit=crop",
    description: "Hand-cut wagyu, quail egg, capers, toasted brioche",
  },
  {
    title: "Lobster Thermidor",
    category: "Mains",
    price: "$55",
    image: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?q=80&w=800&auto=format&fit=crop",
    description: "Half lobster, brandy cream, gruyère gratin",
  },
]

const bottomRow = [
  {
    title: "Dark Chocolate Fondant",
    category: "Desserts",
    price: "$14",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800&auto=format&fit=crop",
    description: "Molten center, salted caramel, vanilla bean ice cream",
  },
  {
    title: "Tuna Tataki",
    category: "Starters",
    price: "$24",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800&auto=format&fit=crop",
    description: "Seared ahi tuna, ponzu, sesame, pickled ginger",
  },
  {
    title: "Smoked Salmon Tower",
    category: "Starters",
    price: "$22",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=800&auto=format&fit=crop",
    description: "Cured salmon, avocado mousse, crème fraîche",
  },
  {
    title: "Duck Confit",
    category: "Mains",
    price: "$42",
    image: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?q=80&w=800&auto=format&fit=crop",
    description: "Slow-cooked duck leg, cherry reduction, fondant potato",
  },
  {
    title: "Negroni Sbagliato",
    category: "Cocktails",
    price: "$15",
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?q=80&w=800&auto=format&fit=crop",
    description: "Campari, sweet vermouth, prosecco, orange peel",
  },
  {
    title: "Crème Brûlée",
    category: "Desserts",
    price: "$13",
    image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?q=80&w=800&auto=format&fit=crop",
    description: "Tahitian vanilla custard, caramelized sugar crust",
  },
  {
    title: "Grilled Octopus",
    category: "Starters",
    price: "$26",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800&auto=format&fit=crop",
    description: "Charred tentacles, chimichurri, crispy potatoes",
  },
]

function MenuCard({
  item,
}: {
  item: { title: string; category: string; price: string; image: string; description: string }
}) {
  return (
    <div className="menu-card glow-border group relative flex-shrink-0 w-[280px] md:w-[320px] overflow-hidden rounded-lg" style={{ backgroundColor: '#91624e' }}>
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <span className="absolute left-2 top-2 bg-black/50 px-1.5 py-0.5 text-[7px] uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm md:left-3 md:top-3 md:px-2.5 md:py-1 md:text-[9px] md:tracking-[0.3em]">
          {item.category}
        </span>
        <span className="absolute bottom-3 right-3 translate-y-2 bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          {item.price}
        </span>
      </div>
      <div className="flex flex-col gap-1 p-2.5 md:gap-1.5 md:p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-serif text-sm font-semibold text-white transition-colors duration-300 group-hover:text-white/80 md:text-base">
            {item.title}
          </h3>
          <span className="flex-shrink-0 text-[10px] text-white/60 md:text-xs">
            {item.price}
          </span>
        </div>
        <p className="line-clamp-2 text-[11px] leading-relaxed text-white/70 md:text-[12px]">{item.description}</p>
      </div>
    </div>
  )
}

export function MenuHighlights() {
  const sectionRef = useRef<HTMLElement>(null)
  const topTrackRef = useRef<HTMLDivElement>(null)
  const bottomTrackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const topTrack = topTrackRef.current
    const bottomTrack = bottomTrackRef.current
    if (!section || !topTrack || !bottomTrack) return

    const ctx = gsap.context(() => {
      // Title animation
      gsap.from("[data-menu-title]", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
      })

      const mm = gsap.matchMedia()

      mm.add("(min-width: 768px)", () => {
        // Calculate one full set width (cards + gaps)
        const cardWidth = 320
        const gap = 20
        const topSetWidth = topRow.length * (cardWidth + gap)
        const bottomSetWidth = bottomRow.length * (cardWidth + gap)

        // Top row: scroll left by exactly one full set
        gsap.to(topTrack, {
          x: -topSetWidth,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${topSetWidth * 1.5}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })

        // Bottom row: scroll right by exactly one full set
        gsap.set(bottomTrack, { x: -bottomSetWidth })
        gsap.to(bottomTrack, {
          x: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${bottomSetWidth * 1.5}`,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })
      })

      // Mobile fallback: simple fade in
      mm.add("(max-width: 767px)", () => {
        gsap.from(section.querySelectorAll(".menu-card"), {
          y: 40,
          opacity: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        })
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="menu" className="relative overflow-hidden py-24 md:h-screen md:py-0">
      {/* Decorative blurs */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-primary/5 blur-[100px]" />
      <div className="pointer-events-none absolute -right-40 bottom-20 h-80 w-80 rounded-full bg-primary/5 blur-[100px]" />

      {/* Desktop: vertically centered content */}
      <div className="hidden md:flex md:h-full md:flex-col md:items-center md:justify-center">
        {/* Section header */}
        <div className="w-full px-6 pb-10 lg:px-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <div data-menu-title className="h-px w-12 bg-primary" />
            <p data-menu-title className="text-[11px] uppercase tracking-[0.4em] text-primary">
              Our Menu
            </p>
            <h2 data-menu-title className="font-serif text-3xl font-bold md:text-4xl">
              A Taste of What Awaits
            </h2>
            <p data-menu-title className="max-w-md text-sm text-foreground/40">
              Crafted with precision and passion.
            </p>
          </div>
        </div>

        {/* Top row → seamless marquee scrolling left (3x duplication) */}
        <div ref={topTrackRef} className="flex gap-5 pb-4 will-change-transform">
          {[...topRow, ...topRow, ...topRow].map((item, i) => (
            <MenuCard key={`top-${i}`} item={item} />
          ))}
        </div>

        {/* Bottom row → seamless marquee scrolling right (3x duplication) */}
        <div ref={bottomTrackRef} className="flex gap-5 pt-4 will-change-transform">
          {[...bottomRow, ...bottomRow, ...bottomRow].map((item, i) => (
            <MenuCard key={`bottom-${i}`} item={item} />
          ))}
        </div>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden">
        <div className="px-6 pb-10">
          <div className="flex flex-col items-center gap-4 text-center">
            <div data-menu-title className="h-px w-12 bg-primary" />
            <p data-menu-title className="text-[11px] uppercase tracking-[0.4em] text-primary">
              Our Menu
            </p>
            <h2 data-menu-title className="font-serif text-3xl font-bold">
              A Taste of What Awaits
            </h2>
            <p data-menu-title className="max-w-md text-sm text-foreground/40">
              Crafted with precision and passion.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 px-6">
          {[...topRow.slice(0, 4), ...bottomRow.slice(0, 4)].map((item) => (
            <MenuCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
