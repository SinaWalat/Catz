"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const images = [
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
    alt: "Catz restaurant interior with warm ambient lighting",
    span: "col-span-2 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1481833761820-0509d3217039?q=80&w=2070&auto=format&fit=crop",
    alt: "Signature cocktail with artistic garnish",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2074&auto=format&fit=crop",
    alt: "Stylish bar area at Catz with moody lighting",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop",
    alt: "Beautifully plated gourmet dish",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=2074&auto=format&fit=crop",
    alt: "Vibrant nightlife atmosphere at the bar",
    span: "col-span-1 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=2074&auto=format&fit=crop",
    alt: "Friends enjoying cocktails and conversation",
    span: "col-span-1 row-span-1",
  },
]

export function Gallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [lightbox, setLightbox] = useState<number | null>(null)

  const closeLightbox = useCallback(() => setLightbox(null), [])
  const nextImage = useCallback(() => {
    setLightbox((prev) => (prev !== null ? (prev + 1) % images.length : null))
  }, [])
  const prevImage = useCallback(() => {
    setLightbox((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : null
    )
  }, [])

  useEffect(() => {
    if (lightbox !== null) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [lightbox])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightbox === null) return
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowRight") nextImage()
      if (e.key === "ArrowLeft") prevImage()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [lightbox, closeLightbox, nextImage, prevImage])

  useEffect(() => {
    const section = sectionRef.current
    const header = headerRef.current
    const grid = gridRef.current
    if (!section || !header || !grid) return

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

      // Grid items with stagger and scale
      const items = grid.querySelectorAll(".gallery-item")
      items.forEach((item, i) => {
        gsap.from(item, {
          scale: 0.85,
          opacity: 0,
          y: 40,
          rotateZ: (i % 2 === 0 ? -1 : 1),
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          delay: (i % 3) * 0.1,
        })
      })

      // Parallax depth for some items
      items.forEach((item, i) => {
        gsap.to(item, {
          y: (i % 2 === 0 ? -20 : -40),
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        })
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <section ref={sectionRef} id="gallery" className="relative py-28 lg:py-40 overflow-hidden">
        {/* Decorative */}
        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-primary/5 blur-[100px]" />

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <div ref={headerRef} className="mb-20 flex flex-col items-center gap-4 text-center">
            <p data-reveal className="text-[11px] uppercase tracking-[0.4em] text-primary">
              The Atmosphere
            </p>
            <h2 data-reveal className="font-serif text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              Gallery
            </h2>
            <div data-reveal className="h-px w-12 bg-primary" />
          </div>

          {/* Grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4"
          >
            {images.map((img, i) => (
              <button
                key={img.src}
                onClick={() => setLightbox(i)}
                className={`gallery-item img-zoom group relative overflow-hidden rounded-lg ${img.span}`}
                aria-label={`View ${img.alt}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-background/0 to-background/0 transition-all duration-700 group-hover:from-background/70" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="translate-y-4 border border-primary/60 px-5 py-2.5 text-[10px] uppercase tracking-[0.3em] text-primary opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 rounded">
                    View
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="lightbox-enter fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            onClick={closeLightbox}
            className="absolute right-6 top-6 text-foreground/40 transition-all duration-300 hover:rotate-90 hover:text-foreground"
            aria-label="Close lightbox"
          >
            <X className="h-7 w-7" />
          </button>
          <button
            onClick={prevImage}
            className="absolute left-4 text-foreground/40 transition-all duration-300 hover:-translate-x-1 hover:text-foreground md:left-8"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <img
            key={lightbox}
            src={images[lightbox].src}
            alt={images[lightbox].alt}
            className="anim-hero-fade max-h-[80vh] max-w-[90vw] object-contain rounded-lg"
          />
          <button
            onClick={nextImage}
            className="absolute right-4 text-foreground/40 transition-all duration-300 hover:translate-x-1 hover:text-foreground md:right-8"
            aria-label="Next image"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.3em] text-foreground/30">
            {lightbox + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  )
}
