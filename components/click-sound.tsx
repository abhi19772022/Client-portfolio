"use client"

import { useEffect, useRef } from "react"

interface ClickSoundProps {
  sfxEnabled: boolean
}

export default function ClickSound({ sfxEnabled }: ClickSoundProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio("/mouse-click-331781.mp3")
    audioRef.current.volume = 0.15 // Set volume to 15% (reduced from 30%)

    const handleClick = (e: MouseEvent) => {
      // Play click sound only if SFX is enabled
      if (audioRef.current && sfxEnabled) {
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
  }, [sfxEnabled])

  return null // This component doesn't render anything
}
