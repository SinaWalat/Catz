"use client"

import { useEffect, useRef } from "react"
import { Instagram, Facebook, Music2 } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com", icon: Instagram },
  { label: "Facebook", href: "https://facebook.com", icon: Facebook },
  { label: "TikTok", href: "https://tiktok.com", icon: Music2 },
]

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Gallery", href: "#gallery" },
  { label: "Events", href: "#events" },
  { label: "Reservations", href: "#reservation" },
  { label: "Contact", href: "#contact" },
]

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const footer = footerRef.current
    const content = contentRef.current
    const bottom = bottomRef.current
    if (!footer || !content || !bottom) return

    const ctx = gsap.context(() => {
      // Content columns stagger up
      const columns = content.querySelectorAll(".footer-col")
      gsap.from(columns, {
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footer,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      })

      // Social icons spring bounce
      const socialIcons = content.querySelectorAll(".social-icon")
      gsap.from(socialIcons, {
        scale: 0,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: footer,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        delay: 0.4,
      })

      // Bottom bar fade
      gsap.from(bottom, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: bottom,
          start: "top 95%",
          toggleActions: "play none none none",
        },
      })
    }, footer)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="border-t border-border/30 bg-card py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div ref={contentRef} className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div className="footer-col flex flex-col gap-5">
            <a href="#" className="gold-shimmer font-serif text-3xl font-bold tracking-[0.15em] transition-opacity duration-300 hover:opacity-80">
              CATZ
            </a>
            <p className="max-w-xs text-[13px] leading-relaxed text-foreground/40">
              {"Erbil's premier destination for premium dining, signature cocktails, and unforgettable nights."}
            </p>
            <div className="mt-1 flex items-center gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="social-icon flex h-10 w-10 items-center justify-center border border-border/50 rounded text-foreground/40 transition-all duration-500 hover:border-primary hover:text-primary hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10"
                >
                  <link.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="footer-col flex flex-col gap-5">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-foreground/30">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover-underline text-[13px] text-foreground/40 transition-colors duration-300 hover:text-foreground/70"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col flex flex-col gap-5">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-foreground/30">
              Get in Touch
            </h4>
            <div className="flex flex-col gap-3 text-[13px] text-foreground/40">
              <p>Gulan Street, Downtown Erbil</p>
              <p>Kurdistan Region, Iraq</p>
              <p>+964 750 123 4567</p>
              <p>hello@catzerbil.com</p>
            </div>
          </div>
        </div>

        <div ref={bottomRef} className="mt-20 flex flex-col items-center gap-4 border-t border-border/30 pt-8 md:flex-row md:justify-between">
          <p className="text-[11px] tracking-wide text-foreground/20">
            {"© 2026 Catz Restaurant & Bar. All rights reserved."}
          </p>
          <p className="text-[11px] tracking-wide text-foreground/20">
            Designed with passion in Erbil
          </p>
        </div>
      </div>
    </footer>
  )
}
