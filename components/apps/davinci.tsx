"use client"

import Image from "next/image"

export default function DaVinci() {
  return (
    <div className="h-full w-full bg-[#1a1a1a] flex items-center justify-center overflow-hidden p-0">
      <div className="relative w-full h-full">
        <Image
          src="/devanci.png"
          alt="DaVinci Resolve Interface"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  )
}
