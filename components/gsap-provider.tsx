"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function GsapProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Refresh ScrollTrigger after all images load
        const handleLoad = () => ScrollTrigger.refresh()
        window.addEventListener("load", handleLoad)

        return () => {
            window.removeEventListener("load", handleLoad)
            ScrollTrigger.getAll().forEach((t) => t.kill())
        }
    }, [])

    return <>{children}</>
}
