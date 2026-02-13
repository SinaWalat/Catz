"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function Reservation() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const [focused, setFocused] = useState<string | null>(null)

  const inputClass =
    "w-full border-b border-border/30 bg-transparent px-0 py-3 text-sm text-foreground placeholder:text-foreground/20 transition-all duration-500 outline-none ring-0 focus:border-b focus:border-primary/60 focus:outline-none focus:ring-0 focus:shadow-none"

  const selectClass =
    "w-full border-b border-border/30 bg-transparent px-0 py-3 text-sm text-foreground transition-all duration-500 outline-none ring-0 focus:border-b focus:border-primary/60 focus:outline-none focus:ring-0 focus:shadow-none appearance-none"

  useEffect(() => {
    const section = sectionRef.current
    const bg = bgRef.current
    const left = leftRef.current
    const form = formRef.current
    if (!section || !bg || !left || !form) return

    const ctx = gsap.context(() => {
      // Background parallax
      gsap.to(bg, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })

      // Left text reveal
      const leftEls = left.querySelectorAll("[data-reveal]")
      gsap.from(leftEls, {
        x: -60,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: left,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      })

      // Form entrance
      gsap.from(form, {
        x: 60,
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: form,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      })

      // Form fields stagger
      const fields = form.querySelectorAll(".form-field")
      gsap.from(fields, {
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: form,
          start: "top 70%",
          toggleActions: "play none none none",
        },
        delay: 0.3,
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="reservation"
      className="relative overflow-hidden py-28 lg:py-40"
    >
      {/* Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1559329007-40df8a9345d8?q=80&w=2187&auto=format&fit=crop')",
          transform: "scale(1.1)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/90 to-background/85" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left text */}
          <div ref={leftRef} className="flex flex-col gap-5">
            <p data-reveal className="text-[11px] uppercase tracking-[0.4em] text-primary">
              Book a Table
            </p>
            <h2 data-reveal className="text-balance font-serif text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl">
              Reserve Your Evening at Catz
            </h2>
            <div data-reveal className="h-px w-12 bg-primary" />
            <p data-reveal className="text-sm leading-relaxed text-foreground/50 lg:text-base">
              Secure your spot for an unforgettable night. Whether it is an intimate
              dinner for two or a group celebration, we have the perfect table waiting.
            </p>
            <div data-reveal className="mt-4 flex flex-col gap-3">
              <div className="flex items-center gap-4">
                <div className="h-px w-6 bg-primary/40" />
                <span className="text-[13px] text-foreground/40">
                  For parties of 8+, please call directly
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-px w-6 bg-primary/40" />
                <span className="text-[13px] text-foreground/40">
                  Walk-ins welcome, subject to availability
                </span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div
            ref={formRef}
            className="border border-border/30 bg-card/50 p-8 backdrop-blur-xl lg:p-10 rounded-lg glow-border"
          >
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="form-field group flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className={`text-[10px] uppercase tracking-[0.3em] transition-colors duration-500 ${focused === "name" ? "text-primary" : "text-foreground/30"
                      }`}
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="John Doe"
                    className={inputClass}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                  />
                </div>
                <div className="form-field group flex flex-col gap-2">
                  <label
                    htmlFor="phone"
                    className={`text-[10px] uppercase tracking-[0.3em] transition-colors duration-500 ${focused === "phone" ? "text-primary" : "text-foreground/30"
                      }`}
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    placeholder="+964 xxx xxx xxxx"
                    className={inputClass}
                    onFocus={() => setFocused("phone")}
                    onBlur={() => setFocused(null)}
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="form-field group flex flex-col gap-2">
                  <label
                    htmlFor="date"
                    className={`text-[10px] uppercase tracking-[0.3em] transition-colors duration-500 ${focused === "date" ? "text-primary" : "text-foreground/30"
                      }`}
                  >
                    Date
                  </label>
                  <input
                    id="date"
                    type="date"
                    required
                    className={inputClass}
                    onFocus={() => setFocused("date")}
                    onBlur={() => setFocused(null)}
                  />
                </div>
                <div className="form-field group flex flex-col gap-2">
                  <label
                    htmlFor="time"
                    className={`text-[10px] uppercase tracking-[0.3em] transition-colors duration-500 ${focused === "time" ? "text-primary" : "text-foreground/30"
                      }`}
                  >
                    Time
                  </label>
                  <select
                    id="time"
                    required
                    className={selectClass}
                    onFocus={() => setFocused("time")}
                    onBlur={() => setFocused(null)}
                  >
                    <option value="" className="bg-card text-foreground">Select time</option>
                    <option value="18:00" className="bg-card text-foreground">6:00 PM</option>
                    <option value="18:30" className="bg-card text-foreground">6:30 PM</option>
                    <option value="19:00" className="bg-card text-foreground">7:00 PM</option>
                    <option value="19:30" className="bg-card text-foreground">7:30 PM</option>
                    <option value="20:00" className="bg-card text-foreground">8:00 PM</option>
                    <option value="20:30" className="bg-card text-foreground">8:30 PM</option>
                    <option value="21:00" className="bg-card text-foreground">9:00 PM</option>
                    <option value="21:30" className="bg-card text-foreground">9:30 PM</option>
                    <option value="22:00" className="bg-card text-foreground">10:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="form-field group flex flex-col gap-2">
                <label
                  htmlFor="guests"
                  className={`text-[10px] uppercase tracking-[0.3em] transition-colors duration-500 ${focused === "guests" ? "text-primary" : "text-foreground/30"
                    }`}
                >
                  Number of Guests
                </label>
                <select
                  id="guests"
                  required
                  className={selectClass}
                  onFocus={() => setFocused("guests")}
                  onBlur={() => setFocused(null)}
                >
                  <option value="" className="bg-card text-foreground">Select guests</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n} className="bg-card text-foreground">
                      {n} {n === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-field group flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className={`text-[10px] uppercase tracking-[0.3em] transition-colors duration-500 ${focused === "message" ? "text-primary" : "text-foreground/30"
                    }`}
                >
                  Special Requests
                </label>
                <textarea
                  id="message"
                  rows={3}
                  placeholder="Any dietary requirements or special occasions..."
                  className="w-full resize-none border-b border-border/30 bg-transparent px-0 py-3 text-sm text-foreground placeholder:text-foreground/20 transition-all duration-500 outline-none ring-0 focus:border-b focus:border-primary/60 focus:outline-none focus:ring-0 focus:shadow-none"
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                />
              </div>

              <button
                type="submit"
                className="magnetic-btn mt-4 flex w-full items-center justify-center py-4 text-[10px] uppercase tracking-[0.3em] rounded"
              >
                <span>Reserve Your Table</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
