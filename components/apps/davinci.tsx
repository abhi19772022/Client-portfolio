"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function DaVinci() {
  const [currentImage, setCurrentImage] = useState(0)

  const images = [
    {
      src: "/davinci-1.png",
      alt: "DaVinci Resolve - Color Grading",
    },
    {
      src: "/davinci-2.png",
      alt: "DaVinci Resolve - Video Editing",
    },
    {
      src: "/davinci-3.png",
      alt: "DaVinci Resolve - Timeline",
    },
    {
      src: "/davinci-4.png",
      alt: "DaVinci Resolve - Effects",
    },
    {
      src: "/davinci-5.png",
      alt: "DaVinci Resolve - Audio",
    },
  ]

  const handlePrevious = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div 
      className="h-full w-full flex items-center justify-center overflow-hidden relative"
      style={{
        background: 'rgba(255, 255, 255, 0)',
        backdropFilter: 'blur(10.9px)',
        WebkitBackdropFilter: 'blur(10.9px)',
      }}
    >
      {/* Main Image */}
      <div className="relative w-full h-full">
        <Image
          src={images[currentImage].src}
          alt={images[currentImage].alt}
          fill
          className="object-contain transition-opacity duration-300"
          priority
        />
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm flex items-center justify-center transition-all z-10 group"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm flex items-center justify-center transition-all z-10 group"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Image Counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-sm text-white text-sm font-medium z-10">
        {currentImage + 1} / {images.length}
      </div>

      {/* Thumbnail Navigation */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentImage
                ? "bg-white w-6"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
