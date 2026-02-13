"use client"

import { useEffect, useRef } from "react"
import { Music, Mic2, Wine, Sparkles } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const events = [
  {
    day: "THU",
    title: "Live Jazz Night",
    description:
      "Soulful jazz performances with our signature cocktail menu.",
    time: "8 PM – Late",
    icon: Music,
    image:
      "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=800&auto=format&fit=crop",
  },
  {
    day: "FRI",
    title: "DJ Sessions",
    description:
      "Resident and guest DJs curate sets spanning deep house, afrobeat, and more.",
    time: "10 PM – 3 AM",
    icon: Mic2,
    image:
      "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=800&auto=format&fit=crop",
  },
  {
    day: "SAT",
    title: "Wine & Dine",
    description:
      "Rare wines paired with our chef's five-course tasting selection.",
    time: "7 PM – 11 PM",
    icon: Wine,
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800&auto=format&fit=crop",
  },
  {
    day: "SUN",
    title: "Sunset Sessions",
    description:
      "Acoustic performances, craft cocktails, and our celebrated brunch menu.",
    time: "4 PM – 10 PM",
    icon: Sparkles,
    image:
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=800&auto=format&fit=crop",
  },
]

export function Events() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const header = headerRef.current
    const cards = cardsRef.current
    if (!section || !header || !cards) return

    const ctx = gsap.context(() => {
      // Header
      const headerEls = header.querySelectorAll("[data-reveal]")
      gsap.from(headerEls, {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: header,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })

      // Cards stagger entrance
      const cardEls = cards.querySelectorAll(".event-card")
      cardEls.forEach((card, i) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          scale: 0.95,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none none",
          },
          delay: i * 0.1,
        })
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="events"
      className="relative overflow-hidden py-28 lg:py-40"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2 h-[600px] w-[800px] rounded-full opacity-20 blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(145,98,78,0.4) 0%, transparent 70%)' }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="mb-20 flex flex-col items-center gap-4 text-center">
          <p data-reveal className="text-[11px] uppercase tracking-[0.4em]" style={{ color: '#91624e' }}>
            {"What's On"}
          </p>
          <h2 data-reveal className="font-serif text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Weekly Nights
          </h2>
          <div data-reveal className="h-px w-12" style={{ backgroundColor: '#91624e' }} />
          <p data-reveal className="max-w-md text-sm" style={{ color: '#fff9' }}>
            Every night at Catz tells a different story. Find your rhythm.
          </p>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {events.map((event) => (
            <div
              key={event.title}
              className="event-card group relative flex flex-col overflow-hidden rounded-lg border border-white/[0.06] transition-all duration-700 hover:border-white/[0.15]"
              style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={event.image}
                  alt={event.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
                {/* Day badge */}
                <div className="absolute bottom-4 left-5">
                  <span
                    className="font-serif text-3xl font-bold tracking-tight text-white"
                    style={{ textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}
                  >
                    {event.day}
                  </span>
                </div>
                {/* Icon */}
                <div
                  className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 backdrop-blur-md transition-all duration-500 group-hover:border-white/20"
                  style={{ backgroundColor: 'rgba(145,98,78,0.15)' }}
                >
                  <event.icon className="h-4 w-4 text-white/60 transition-colors duration-500 group-hover:text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col gap-3 p-5 pt-4">
                <h3 className="font-serif text-lg font-semibold text-white transition-colors duration-500 group-hover:text-[#c9a18a]">
                  {event.title}
                </h3>
                <p className="flex-1 text-[13px] leading-relaxed text-white/35">
                  {event.description}
                </p>
                <div className="mt-auto flex items-center gap-2 border-t border-white/[0.06] pt-3">
                  <div className="h-1 w-1 rounded-full" style={{ backgroundColor: '#91624e' }} />
                  <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: '#91624e' }}>
                    {event.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
