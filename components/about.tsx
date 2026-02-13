"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const image = imageRef.current
    const text = textRef.current
    if (!section || !image || !text) return

    const ctx = gsap.context(() => {
      // Image parallax + reveal
      gsap.fromTo(
        image,
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 30%",
            toggleActions: "play none none none",
          },
        }
      )

      // Image inner parallax
      const img = image.querySelector("img")
      if (img) {
        gsap.to(img, {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: image,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        })
      }

      // Corner frames animate in
      const frames = image.querySelectorAll("[data-frame]")
      gsap.from(frames, {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          toggleActions: "play none none none",
        },
      })

      // Text elements reveal
      const textElements = text.querySelectorAll("[data-reveal]")
      gsap.from(textElements, {
        x: 60,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-28 lg:py-40"
    >
      {/* Decorative background element */}
      <div className="absolute right-0 top-1/4 h-64 w-64 rounded-full bg-primary/5 blur-[100px]" />
      <div className="absolute left-0 bottom-1/4 h-48 w-48 rounded-full bg-accent/5 blur-[80px]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Image */}
          <div ref={imageRef} className="img-zoom relative aspect-[3/4] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=2069&auto=format&fit=crop"
              alt="Elegant cocktail being prepared at the Catz bar"
              className="h-full w-full object-cover will-change-transform"
              style={{ transform: "scale(1.15)" }}
            />
            {/* Decorative corner frames */}
            <div data-frame className="absolute left-4 top-4 h-16 w-16 border-l border-t border-primary/40" />
            <div data-frame className="absolute bottom-4 right-4 h-16 w-16 border-b border-r border-primary/40" />
            {/* Image overlay glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
          </div>

          {/* Text */}
          <div ref={textRef} className="flex flex-col items-start gap-5">
            <p data-reveal className="text-[11px] uppercase tracking-[0.4em] text-primary">
              Our Story
            </p>
            <h2 data-reveal className="text-balance font-serif text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl">
              Where Every Night Becomes a Memory
            </h2>
            <div data-reveal className="h-px w-12 bg-primary" />
            <p data-reveal className="text-sm leading-relaxed text-foreground/50 lg:text-base">
              Catz is more than a restaurant. It is a destination. Nestled in the
              heart of Erbil, we blend premium dining with an electric bar atmosphere
              to create evenings that linger long after the last glass is raised.
            </p>
            <p data-reveal className="text-sm leading-relaxed text-foreground/50 lg:text-base">
              From handcrafted cocktails to dishes that celebrate bold flavors, every
              detail at Catz is designed to make you feel alive. Whether you are here
              for an intimate dinner, a night out with friends, or a front-row seat
              to our live music nights, you belong here.
            </p>

          </div>
        </div>
      </div>
    </section>
  )
}
