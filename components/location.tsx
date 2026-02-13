"use client"

import { useEffect, useRef } from "react"
import { MapPin, Clock, Phone, Mail, ExternalLink } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const hours = [
  { day: "Monday - Wednesday", time: "5:00 PM - 12:00 AM" },
  { day: "Thursday - Friday", time: "5:00 PM - 2:00 AM" },
  { day: "Saturday", time: "12:00 PM - 3:00 AM" },
  { day: "Sunday", time: "12:00 PM - 11:00 PM" },
]

export function Location() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const header = headerRef.current
    const info = infoRef.current
    const map = mapRef.current
    if (!section || !header || !info || !map) return

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

      // Info items stagger from left
      const infoItems = info.querySelectorAll(".info-item")
      gsap.from(infoItems, {
        x: -40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: info,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      })

      // Map clip-path reveal
      gsap.fromTo(
        map,
        { clipPath: "inset(10% 10% 10% 10%)", opacity: 0, scale: 0.95 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: map,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-secondary/50 py-28 lg:py-40 overflow-hidden"
    >
      {/* Decorative */}
      <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-primary/5 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="mb-20 flex flex-col items-center gap-4 text-center">
          <p data-reveal className="text-[11px] uppercase tracking-[0.4em] text-primary">Find Us</p>
          <h2 data-reveal className="font-serif text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            {"Location & Hours"}
          </h2>
          <div data-reveal className="h-px w-12 bg-primary" />
        </div>

        <div className="grid gap-12 lg:grid-cols-5 lg:gap-10">
          {/* Info - left side */}
          <div ref={infoRef} className="flex flex-col justify-center gap-10 lg:col-span-2">
            <div className="flex flex-col gap-8">
              {[
                {
                  icon: MapPin,
                  title: "Address",
                  content: (
                    <div>
                      <p className="text-[13px] leading-relaxed text-foreground/45">
                        Gulan Street, Downtown Erbil
                        <br />
                        Kurdistan Region, Iraq
                      </p>
                      <a
                        href="https://maps.google.com/?q=36.1901,44.0091"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.3em] text-primary transition-opacity duration-300 hover:opacity-70"
                      >
                        Get Directions
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  ),
                },
                {
                  icon: Phone,
                  title: "Phone",
                  content: (
                    <a
                      href="tel:+9647501234567"
                      className="text-[13px] text-foreground/45 transition-colors duration-300 hover:text-foreground/70"
                    >
                      +964 750 123 4567
                    </a>
                  ),
                },
                {
                  icon: Mail,
                  title: "Email",
                  content: (
                    <a
                      href="mailto:hello@catzerbil.com"
                      className="text-[13px] text-foreground/45 transition-colors duration-300 hover:text-foreground/70"
                    >
                      hello@catzerbil.com
                    </a>
                  ),
                },
              ].map((item) => (
                <div key={item.title} className="info-item group flex items-start gap-4">
                  <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center border border-border/30 rounded transition-all duration-500 group-hover:border-primary/40">
                    <item.icon className="h-3.5 w-3.5 text-primary/60 transition-colors duration-500 group-hover:text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-1.5 text-[11px] uppercase tracking-[0.2em] text-foreground/50">
                      {item.title}
                    </h3>
                    {item.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="info-item border-t border-border/30 pt-8">
              <div className="flex items-start gap-4">
                <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center border border-border/30 rounded">
                  <Clock className="h-3.5 w-3.5 text-primary/60" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-5 text-[11px] uppercase tracking-[0.2em] text-foreground/50">
                    Opening Hours
                  </h3>
                  <div className="flex flex-col gap-3">
                    {hours.map((h) => (
                      <div
                        key={h.day}
                        className="group flex items-center justify-between"
                      >
                        <span className="text-[13px] text-foreground/40 transition-colors duration-300 group-hover:text-foreground/60">
                          {h.day}
                        </span>
                        <span className="text-[13px] font-medium text-foreground/55 transition-colors duration-300 group-hover:text-primary">
                          {h.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map - right side */}
          <div ref={mapRef} className="relative overflow-hidden border border-border/30 lg:col-span-3 rounded-lg">
            <div className="aspect-[4/3] w-full lg:aspect-auto lg:h-full lg:min-h-[520px]">
              <iframe
                title="Catz Restaurant location on Gulan Street, Erbil"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3223.0!2d44.0091!3d36.1901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4007239377c83573%3A0x237b2a72f0c2a2f2!2sGulan%20Street%2C%20Erbil!5e0!3m2!1sen!2siq!4v1700000000000!5m2!1sen!2siq"
                className="h-full w-full"
                style={{
                  border: 0,
                  filter: "grayscale(100%) brightness(0.35) contrast(1.2)",
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
              <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
                <div className="flex flex-col items-center">
                  <div className="h-3 w-3 rounded-full bg-primary shadow-lg shadow-primary/30" />
                  <div className="h-4 w-px bg-primary/60" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-background/80 px-5 py-3 backdrop-blur-sm">
                <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/50">
                  Gulan St, Downtown Erbil
                </span>
                <a
                  href="https://maps.google.com/?q=36.1901,44.0091"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-primary transition-opacity duration-300 hover:opacity-70"
                >
                  Open in Maps
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
