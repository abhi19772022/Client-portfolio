"use client"

import { useState, useEffect, useRef } from "react"
import type { AppWindow } from "@/types"

const spotlightApps = [
  { id: "imessage", title: "Messages", icon: "/messages.png", component: "IMessage" },
  { id: "contact", title: "Contact", icon: "/mail.png", component: "Contact" },
  { id: "photos", title: "Photos", icon: "/Photos.png", component: "Photos" },
  { id: "testimonials", title: "Testimonials", icon: "/contacts.png", component: "Testimonials" },
  { id: "notes", title: "Notes", icon: "/notes.png", component: "Notes" },
  { id: "aftereffects", title: "After Effects", icon: "/after-effects.png", component: "AfterEffects" },
  { id: "premiere", title: "Premiere Pro", icon: "/premiere-pro.png", component: "Premiere" },
  { id: "davinci", title: "DaVinci Resolve", icon: "/icons8-davinci-resolve-48.png", component: "DaVinci" },
  { id: "terminal", title: "Terminal", icon: "/terminal.png", component: "Terminal" },
  { id: "files", title: "My Data", icon: "/files.png", component: "Files" },
  { id: "music", title: "Music", icon: "/music.png", component: "Music" },
]

interface SpotlightProps {
  onClose: () => void
  onAppClick: (app: AppWindow) => void
}

export default function Spotlight({ onClose, onAppClick }: SpotlightProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredApps, setFilteredApps] = useState(spotlightApps)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Focus the input when spotlight opens
    inputRef.current?.focus()

    // Handle escape key to close
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      } else if (e.key === "ArrowDown") {
        setSelectedIndex((prev) => (prev < filteredApps.length - 1 ? prev + 1 : prev))
        e.preventDefault()
      } else if (e.key === "ArrowUp") {
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev))
        e.preventDefault()
      } else if (e.key === "Enter" && filteredApps.length > 0) {
        handleAppClick(filteredApps[selectedIndex])
        e.preventDefault()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [filteredApps, selectedIndex])

  useEffect(() => {
    if (searchTerm) {
      const filtered = spotlightApps.filter((app) => app.title.toLowerCase().includes(searchTerm.toLowerCase()))
      setFilteredApps(filtered)
      setSelectedIndex(0) // Reset selection when search changes
    } else {
      setFilteredApps(spotlightApps)
    }
  }, [searchTerm])

  const handleAppClick = (app: (typeof spotlightApps)[0]) => {
    onAppClick({
      id: app.id,
      title: app.title,
      component: app.component,
      position: { x: Math.random() * 200 + 100, y: Math.random() * 100 + 50 },
      size: { width: 800, height: 600 },
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-transparent z-40 flex items-center justify-center" onClick={onClose}>
      <div
        className="w-full max-w-2xl bg-gray-800/80 backdrop-blur-xl rounded-xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search"
            className="w-full bg-transparent text-white border-0 py-4 pl-12 pr-4 focus:outline-none text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredApps.length > 0 && (
          <div className="max-h-80 overflow-y-auto">
            {filteredApps.map((app, index) => (
              <div
                key={app.id}
                className={`flex items-center px-4 py-3 cursor-pointer ${
                  index === selectedIndex ? "bg-blue-500" : "hover:bg-gray-700"
                }`}
                onClick={() => handleAppClick(app)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div className="w-8 h-8 flex items-center justify-center mr-3">
                  <img src={app.icon || "/placeholder.svg"} alt={app.title} className="w-6 h-6 object-contain" />
                </div>
                <span className="text-white">{app.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
