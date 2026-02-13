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
    time: "8 PM - Late",
    icon: Music,
  },
  {
    day: "FRI",
    title: "DJ Sessions",
    description:
      "Resident and guest DJs curate sets spanning deep house, afrobeat, and more.",
    time: "10 PM - 3 AM",
    icon: Mic2,
  },
  {
    day: "SAT",
    title: "Wine & Dine",
    description:
      "Rare wines paired with our chef's five-course tasting selection.",
    time: "7 PM - 11 PM",
    icon: Wine,
  },
  {
    day: "SUN",
    title: "Sunset Sessions",
    description:
      "Acoustic performances, craft cocktails, and our celebrated brunch menu.",
    time: "4 PM - 10 PM",
    icon: Sparkles,
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

      // Cards 3D entrance
      const cardEls = cards.querySelectorAll(".event-card")
      cardEls.forEach((card, i) => {
        gsap.from(card, {
          y: 80,
          opacity: 0,
          rotateX: -15,
          scale: 0.9,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          delay: i * 0.12,
        })
      })

      // Day badges pop in
      const badges = cards.querySelectorAll(".day-badge")
      gsap.from(badges, {
        scale: 0,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: cards,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="events"
      className="relative bg-secondary/50 py-28 lg:py-40 overflow-hidden"
    >
      {/* Decorative glow */}
      <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary/5 blur-[100px]" />
      <div className="absolute right-1/4 bottom-1/4 h-48 w-48 rounded-full bg-accent/5 blur-[80px]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="mb-20 flex flex-col items-center gap-4 text-center">
          <p data-reveal className="text-[11px] uppercase tracking-[0.4em] text-primary">
            {"What's On"}
          </p>
          <h2 data-reveal className="font-serif text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Weekly Nights
          </h2>
          <div data-reveal className="h-px w-12 bg-primary" />
          <p data-reveal className="max-w-md text-sm text-foreground/40">
            Every night at Catz tells a different story. Find your rhythm.
          </p>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" style={{ perspective: "1000px" }}>
          {events.map((event) => (
            <div
              key={event.title}
              className="event-card group flex flex-col gap-5 border border-border/50 bg-card p-8 rounded-lg transition-all duration-700 hover:border-primary/40 glow-border"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="flex items-center justify-between">
                <span className="day-badge font-serif text-4xl font-bold text-primary/80 transition-colors duration-500 group-hover:text-primary">
                  {event.day}
                </span>
                <event.icon className="h-5 w-5 text-foreground/20 transition-all duration-500 group-hover:text-primary group-hover:rotate-12" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground">
                {event.title}
              </h3>
              <p className="flex-1 text-[13px] leading-relaxed text-foreground/40">
                {event.description}
              </p>
              <div className="border-t border-border/50 pt-4">
                <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/30">
                  {event.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
