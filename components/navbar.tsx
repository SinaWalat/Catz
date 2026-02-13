"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Gallery", href: "#gallery" },
  { label: "Events", href: "#events" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Track scroll for background change
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Track active section
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace("#", ""))
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id)
            }
          })
        },
        { rootMargin: "-40% 0px -50% 0px" }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const handleMobileClick = useCallback(() => {
    setMobileOpen(false)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out will-change-transform ${(scrolled && !mobileOpen)
        ? "bg-background/80 backdrop-blur-xl border-b border-border/50 py-3"
        : "bg-transparent py-5"
        }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
        <a
          href="#"
          className="transition-opacity duration-300 hover:opacity-80"
        >
          <Image src="/Catz-Logo.svg" alt="Catz" width={80} height={30} className="h-8 w-auto" priority />
        </a>

        <ul className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <li key={link.href} className="relative">
              <a
                href={link.href}
                className="hover-underline text-[11px] uppercase tracking-[0.25em] transition-opacity duration-300 hover:opacity-70"
                style={{ color: activeSection === link.href.replace("#", "") ? '#91624e' : '#91624e' }}
              >
                {link.label}
              </a>
              {/* Active indicator dot */}
              {activeSection === link.href.replace("#", "") && (
                <span className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary" />
              )}
            </li>
          ))}
        </ul>

        <a
          href="#reservation"
          className="magnetic-btn-outline hidden items-center px-6 py-2.5 text-[10px] uppercase tracking-[0.3em] md:inline-flex"
        >
          <span>Reserve</span>
        </a>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="relative z-50 text-foreground transition-transform duration-300 md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <div className="flex h-3 w-8 flex-col justify-between">
            <span
              className={`h-[1.5px] w-full bg-current transition-transform duration-500 ease-in-out ${mobileOpen ? "translate-y-[5px] rotate-45" : ""
                }`}
            />
            <span
              className={`h-[1.5px] w-full bg-current transition-transform duration-500 ease-in-out ${mobileOpen ? "-translate-y-[5px] -rotate-45" : ""
                }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile fullscreen overlay */}
      {mounted && createPortal(
        <div
          className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-background/95 backdrop-blur-3xl transition-all duration-700 ease-[cubic-bezier(0.32,0,0.67,0)] md:hidden ${mobileOpen ? "translate-y-0 opacity-100 visible" : "-translate-y-full opacity-0 invisible"
            }`}
        >
          <ul className="flex flex-col items-center gap-8">
            {navLinks.map((link, i) => (
              <li
                key={link.href}
                className="transition-all duration-500"
                style={{
                  transitionDelay: mobileOpen ? `${i * 80}ms` : "0ms",
                  opacity: mobileOpen ? 1 : 0,
                  transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
                }}
              >
                <a
                  href={link.href}
                  onClick={handleMobileClick}
                  className={`font-serif text-3xl font-light tracking-wide transition-colors duration-300 hover:text-primary ${activeSection === link.href.replace("#", "") ? "text-primary" : "text-foreground"
                    }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li
              className="mt-6 transition-all duration-500"
              style={{
                transitionDelay: mobileOpen ? `${navLinks.length * 80}ms` : "0ms",
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
              }}
            >
              <a
                href="#reservation"
                onClick={handleMobileClick}
                className="magnetic-btn px-10 py-3 text-xs uppercase tracking-[0.3em]"
              >
                <span>Reserve a Table</span>
              </a>
            </li>
          </ul>
        </div>,
        document.body
      )}
    </header>
  )
}
