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

  useEffect(() => {
    const section = sectionRef.current
    const bg = bgRef.current
    const left = leftRef.current
    const form = formRef.current
    if (!section || !bg || !left || !form) return

    const ctx = gsap.context(() => {

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

  const inputBase =
    "w-full border border-white/10 bg-white/5 rounded-lg px-4 py-3.5 text-sm text-white placeholder:text-white/30 transition-all duration-300 outline-none focus:border-primary/60 focus:bg-white/10 backdrop-blur-sm"

  const selectBase =
    "w-full border border-white/10 bg-white/5 rounded-lg px-4 py-3.5 text-sm text-white transition-all duration-300 outline-none focus:border-primary/60 focus:bg-white/10 backdrop-blur-sm appearance-none cursor-pointer"

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
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left text */}
          <div ref={leftRef} className="flex flex-col gap-5">
            <p data-reveal className="text-[11px] uppercase tracking-[0.4em]" style={{ color: '#91624e' }}>
              Book a Table
            </p>
            <h2 data-reveal className="text-balance font-serif text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
              Reserve Your Evening at Catz
            </h2>
            <div data-reveal className="h-px w-12" style={{ backgroundColor: '#91624e' }} />
            <p data-reveal className="text-sm leading-relaxed text-white/60 lg:text-base">
              Secure your spot for an unforgettable night. Whether it is an intimate
              dinner for two or a group celebration, we have the perfect table waiting.
            </p>
            <div data-reveal className="mt-4 flex flex-col gap-3">
              <div className="flex items-center gap-4">
                <div className="h-px w-6" style={{ backgroundColor: '#91624e' }} />
                <span className="text-[13px]" style={{ color: '#fff9' }}>
                  For parties of 8+, please call directly
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-px w-6" style={{ backgroundColor: '#91624e' }} />
                <span className="text-[13px]" style={{ color: '#fff9' }}>
                  Walk-ins welcome, subject to availability
                </span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div
            ref={formRef}
            className="rounded-lg border border-white/10 bg-black/40 p-8 backdrop-blur-xl lg:p-10"
          >
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              {/* Name & Phone */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="form-field flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className={`text-[10px] uppercase tracking-[0.3em] transition-colors duration-500 ${focused === "name" ? "text-white" : "text-white/40"
                      }`}
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="John Doe"
                    className={inputBase}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                  />
                </div>
                <div className="form-field flex flex-col gap-2">
                  <label
                    htmlFor="phone"
                    className={`text-[10px] uppercase tracking-[0.3em] transition-colors duration-500 ${focused === "phone" ? "text-white" : "text-white/40"
                      }`}
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    placeholder="+964 xxx xxx xxxx"
                    className={inputBase}
                    onFocus={() => setFocused("phone")}
                    onBlur={() => setFocused(null)}
                  />
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="form-field flex flex-col gap-2">
                  <label
                    className={`text-[10px] uppercase tracking-[0.3em] transition-colors duration-500 ${focused === "date" ? "text-white" : "text-white/40"
                      }`}
                  >
                    Date
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <select
                      required
                      className={selectBase}
                      onFocus={() => setFocused("date")}
                      onBlur={() => setFocused(null)}
                      defaultValue=""
                    >
                      <option value="" disabled>Day</option>
                      {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                    <select
                      required
                      className={selectBase}
                      onFocus={() => setFocused("date")}
                      onBlur={() => setFocused(null)}
                      defaultValue=""
                    >
                      <option value="" disabled>Month</option>
                      {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m, i) => (
                        <option key={m} value={i + 1}>{m}</option>
                      ))}
                    </select>
                    <select
                      required
                      className={selectBase}
                      onFocus={() => setFocused("date")}
                      onBlur={() => setFocused(null)}
                      defaultValue=""
                    >
                      <option value="" disabled>Year</option>
                      {[2026, 2027].map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-field flex flex-col gap-2">
                  <label
                    htmlFor="time"
                    className={`text-[10px] uppercase tracking-[0.3em] transition-colors duration-500 ${focused === "time" ? "text-white" : "text-white/40"
                      }`}
                  >
                    Time
                  </label>
                  <select
                    id="time"
                    required
                    className={selectBase}
                    onFocus={() => setFocused("time")}
                    onBlur={() => setFocused(null)}
                    defaultValue=""
                  >
                    <option value="" disabled>Select time</option>
                    <option value="17:00">5:00 PM</option>
                    <option value="17:30">5:30 PM</option>
                    <option value="18:00">6:00 PM</option>
                    <option value="18:30">6:30 PM</option>
                    <option value="19:00">7:00 PM</option>
                    <option value="19:30">7:30 PM</option>
                    <option value="20:00">8:00 PM</option>
                    <option value="20:30">8:30 PM</option>
                    <option value="21:00">9:00 PM</option>
                    <option value="21:30">9:30 PM</option>
                    <option value="22:00">10:00 PM</option>
                  </select>
                </div>
              </div>

              {/* Guests */}
              <div className="form-field flex flex-col gap-2">
                <label
                  htmlFor="guests"
                  className={`text-[10px] uppercase tracking-[0.3em] transition-colors duration-500 ${focused === "guests" ? "text-white" : "text-white/40"
                    }`}
                >
                  Number of Guests
                </label>
                <select
                  id="guests"
                  required
                  className={selectBase}
                  onFocus={() => setFocused("guests")}
                  onBlur={() => setFocused(null)}
                  defaultValue=""
                >
                  <option value="" disabled>Select guests</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </div>

              {/* Special Requests */}
              <div className="form-field flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className={`text-[10px] uppercase tracking-[0.3em] transition-colors duration-500 ${focused === "message" ? "text-white" : "text-white/40"
                    }`}
                >
                  Special Requests
                </label>
                <textarea
                  id="message"
                  rows={3}
                  placeholder="Any dietary requirements or special occasions..."
                  className="w-full resize-none border border-white/10 bg-white/5 rounded-lg px-4 py-3.5 text-sm text-white placeholder:text-white/30 transition-all duration-300 outline-none focus:border-primary/60 focus:bg-white/10 backdrop-blur-sm"
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                />
              </div>

              <button
                type="submit"
                className="mt-2 flex w-full items-center justify-center rounded-lg py-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-white transition-all duration-300 hover:opacity-90"
                style={{ backgroundColor: '#91624e' }}
              >
                Reserve Your Table
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
