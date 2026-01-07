"use client"

import { useEffect, useRef } from "react"

export default function ClickSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio("/mouse-click-331781.mp3")
    audioRef.current.volume = 0.3 // Set volume to 30%

    const handleClick = (e: MouseEvent) => {
      // Play click sound
      if (audioRef.current) {
        // Reset audio to start if it's already playing
        audioRef.current.currentTime = 0
        audioRef.current.play().catch((error) => {
          // Silently handle autoplay restrictions
          console.log("Audio play failed:", error)
        })
      }
    }

    // Add click event listener to document
    document.addEventListener("click", handleClick)

    // Cleanup
    return () => {
      document.removeEventListener("click", handleClick)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  return null // This component doesn't render anything
}
