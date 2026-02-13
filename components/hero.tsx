"use client"

import { useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const bg = bgRef.current
    const content = contentRef.current
    const overlay = overlayRef.current
    if (!section || !bg || !content || !overlay) return

    const ctx = gsap.context(() => {
      // Cinematic curtain reveal: dark overlay lifts to reveal the scene
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } })

      // Start with everything hidden
      gsap.set(content.querySelectorAll("[data-hero]"), { y: 40, opacity: 0 })

      // 1. Overlay curtain lifts up
      tl.fromTo(
        overlay,
        { scaleY: 1 },
        { scaleY: 0, duration: 1.4, ease: "power3.inOut" }
      )

      // 2. Background slowly zooms in (Ken Burns style)
      tl.fromTo(
        bg,
        { scale: 1.3, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: "power2.out" },
        0.3
      )

      // 3. Decorative line draws in
      tl.to(
        "[data-hero-line]",
        { scaleX: 1, duration: 0.8, ease: "power2.inOut" },
        0.9
      )

      // 4. Content elements cascade in with smooth slide-up
      tl.to(
        content.querySelectorAll("[data-hero]"),
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
        },
        1.0
      )

      // Scroll-driven parallax on background
      gsap.to(bg, {
        yPercent: 25,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })

      // Content fades + drifts up on scroll
      gsap.to(content, {
        y: -60,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "40% top",
          end: "bottom top",
          scrub: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative flex h-screen items-center justify-center overflow-hidden">
      {/* Dark curtain overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-20 bg-black origin-top"
      />

      {/* Background image */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform opacity-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2574&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black" />
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        <div
          data-hero-line
          className="h-px w-16 bg-primary origin-left"
          style={{ transform: "scaleX(0)" }}
        />

        <p data-hero className="text-[11px] uppercase tracking-[0.5em] text-primary">
          Restaurant & Bar
        </p>

        <div data-hero className="flex items-center justify-center">
          <Image src="/Catz-Logo.svg" alt="Catz" width={500} height={200} className="h-28 w-auto md:h-40 lg:h-52" priority />
        </div>

        <p data-hero className="text-sm tracking-[0.3em] text-foreground/40">
          {"Vibe \u00B7 Dine \u00B7 Unwind"}
        </p>

        <a
          href="#reservation"
          data-hero
          className="magnetic-btn mt-6 inline-flex items-center px-12 py-4 text-[10px] uppercase tracking-[0.3em]"
        >
          <span>Reserve Your Table</span>
        </a>
      </div>

      {/* Scroll indicator */}
      <div
        data-hero
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
      >
        <a
          href="#about"
          className="anim-float text-foreground/30 transition-colors duration-300 hover:text-primary"
          aria-label="Scroll down"
        >
          <ChevronDown className="h-5 w-5" />
        </a>
      </div>

      {/* Bottom gradient edge */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  )
}
