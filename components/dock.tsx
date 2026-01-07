"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { MoreHorizontal } from "lucide-react"
import type { AppWindow } from "@/types"

const dockApps = [
  { id: "launchpad", title: "Launchpad", icon: "/launchpad.png", component: "Launchpad", isSystem: true },
  { id: "imessage", title: "Messages", icon: "/imess.png", component: "IMessage" },
  { id: "contact", title: "Contact", icon: "/contacts.png", component: "Contact" },
  { id: "photos", title: "Photos", icon: "/Photos.png", component: "Photos" },
   { id: "testimonials", title: "Testimonials", icon: "/keynote.png", component: "Testimonials" }, 
  { id: "notes", title: "Notes", icon: "/notes.png", component: "Notes" },
  { id: "aftereffects", title: "After Effects", icon: "/after-effects.png", component: "AfterEffects" },
  { id: "premiere", title: "Premiere Pro", icon: "/premiere-pro.png", component: "Premiere" },
  { id: "davinci", title: "DaVinci Resolve", icon: "/icons8-davinci-resolve-48.png", component: "DaVinci" },
  { id: "terminal", title: "Terminal", icon: "/terminal.png", component: "Terminal" },
  { id: "files", title: "My Data", icon: "/files.png", component: "Files" },
]

interface DockProps {
  onAppClick: (app: AppWindow) => void
  onLaunchpadClick: () => void
  activeAppIds: string[]
  isDarkMode: boolean
}

export default function Dock({ onAppClick, onLaunchpadClick, activeAppIds, isDarkMode }: DockProps) {
  const [mouseX, setMouseX] = useState<number | null>(null)
  const dockRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  // Check if we're on a mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!showMobileMenu) return

    const handleClickOutside = (event: MouseEvent) => {
      if (dockRef.current && !dockRef.current.contains(event.target as Node)) {
        setShowMobileMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showMobileMenu])

  const handleAppClick = (app: (typeof dockApps)[0]) => {
    if (app.id === "launchpad") {
      onLaunchpadClick()
      return
    }

    onAppClick({
      id: app.id,
      title: app.title,
      component: app.component,
      position: { x: Math.random() * 200 + 100, y: Math.random() * 100 + 50 },
      size: { width: 800, height: 600 },
    })

    // Close mobile menu after clicking an app
    if (showMobileMenu) {
      setShowMobileMenu(false)
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dockRef.current && !isMobile) {
      const rect = dockRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      setMouseX(x)
    }
  }

  const handleMouseLeave = () => {
    setMouseX(null)
  }

  // Calculate scale for each icon based on distance from mouse
  const getIconScale = (index: number, iconCount: number) => {
    if (mouseX === null || isMobile) return 1

    // Get the dock width and calculate the position of each icon
    const dockWidth = dockRef.current?.offsetWidth || 0
    const iconWidth = dockWidth / iconCount
    const iconPosition = iconWidth * (index + 0.5) // Center of the icon

    // Distance from mouse to icon center
    const distance = Math.abs(mouseX - iconPosition)

    // Maximum scale and distance influence
    const maxScale = 2
    const maxDistance = iconWidth * 2.5

    // Calculate scale based on distance (closer = larger)
    if (distance > maxDistance) return 1

    // Smooth parabolic scaling function
    const scale = 1 + (maxScale - 1) * Math.pow(1 - distance / maxDistance, 2)

    return scale
  }

  // For mobile, we'll show only the first 4 apps plus a "more" button
  const visibleApps = isMobile ? dockApps.slice(0, 4) : dockApps
  const hiddenApps = isMobile ? dockApps.slice(4) : []

  return (
    <div ref={dockRef} className="fixed bottom-2 left-1/2 transform -translate-x-1/2 z-50">
      {/* Mobile expanded menu */}
      {isMobile && showMobileMenu && (
        <div
          className={`absolute bottom-20 left-1/2 transform -translate-x-1/2 w-[280px] 
          ${isDarkMode 
            ? "bg-gray-800/30 border-white/10" 
            : "bg-white/40 border-white/40"
          } 
          backdrop-blur-2xl backdrop-saturate-150
          rounded-2xl border
          shadow-[0_8px_32px_0_rgba(0,0,0,0.15)]
          p-4 mb-2 transition-all duration-300`}
          style={{
            boxShadow: isDarkMode 
              ? '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)'
              : '0 8px 32px 0 rgba(31, 38, 135, 0.15), inset 0 1px 1px 0 rgba(255, 255, 255, 0.5)',
          }}
        >
          <div className="grid grid-cols-4 gap-4">
            {hiddenApps.map((app) => (
              <div
                key={app.id}
                className="flex flex-col items-center justify-center"
                onClick={() => handleAppClick(app)}
              >
                <div className="w-14 h-14 flex items-center justify-center">
                  <img
                    src={app.icon || "/placeholder.svg"}
                    alt={app.title}
                    className="w-12 h-12 object-contain"
                    draggable="false"
                  />
                </div>
                <span className={`text-xs mt-1 ${isDarkMode ? "text-white" : "text-gray-800"}`}>{app.title}</span>
                {activeAppIds.includes(app.id) && <div className="w-1 h-1 bg-white rounded-full mt-1"></div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main dock */}
      <div
        className={`px-3 py-3 rounded-[22px]
          ${isDarkMode 
            ? "bg-gray-800/30 border-white/10" 
            : "bg-white/40 border-white/40"
          } 
          backdrop-blur-2xl backdrop-saturate-150
          flex items-end border
          shadow-[0_8px_32px_0_rgba(0,0,0,0.15)]
          ${isMobile ? "h-20" : "h-16"}
          transition-all duration-300`}
        style={{
          boxShadow: isDarkMode 
            ? '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)'
            : '0 8px 32px 0 rgba(31, 38, 135, 0.15), inset 0 1px 1px 0 rgba(255, 255, 255, 0.5)',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {visibleApps.map((app, index) => {
          const scale = getIconScale(index, visibleApps.length)

          return (
            <div
              key={app.id}
              className={`flex flex-col items-center justify-end h-full ${isMobile ? "px-3" : "px-2"}
                transition-all duration-200`}
              style={{
                transform: isMobile ? "none" : `translateY(${(scale - 1) * -8}px)`,
                zIndex: scale > 1 ? 10 : 1,
                transition: mouseX === null ? "transform 0.2s ease-out" : "none",
              }}
              onClick={() => handleAppClick(app)}
            >
              <div
                className="relative cursor-pointer group"
                style={{
                  transform: isMobile ? "none" : `scale(${scale})`,
                  transformOrigin: "bottom center",
                  transition: mouseX === null ? "transform 0.2s ease-out" : "none",
                }}
              >
                {/* Icon glow effect on hover */}
                <div className={`absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300
                  ${isDarkMode ? 'bg-white/20' : 'bg-blue-400/30'}`}
                  style={{ transform: 'scale(1.2)' }}
                ></div>
                
                <img
                  src={app.icon || "/placeholder.svg"}
                  alt={app.title}
                  className={`object-contain ${isMobile ? "w-14 h-14" : "w-12 h-12"} 
                    relative z-10 drop-shadow-lg transition-all duration-200`}
                  draggable="false"
                />

                {/* Tooltip - only on desktop */}
                {!isMobile && scale > 1.5 && (
                  <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5
                    ${isDarkMode 
                      ? "bg-gray-900/90 border-white/10" 
                      : "bg-gray-800/90 border-white/20"
                    }
                    backdrop-blur-xl border
                    text-white text-xs font-medium rounded-lg whitespace-nowrap
                    shadow-[0_4px_12px_0_rgba(0,0,0,0.2)]
                    transition-all duration-200`}
                  >
                    {app.title}
                  </div>
                )}

                {/* Indicator dot for active apps */}
                {activeAppIds.includes(app.id) && (
                  <div className={`absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 
                    w-1 h-1 rounded-full
                    ${isDarkMode ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'bg-gray-700 shadow-[0_0_8px_rgba(0,0,0,0.4)]'}
                    transition-all duration-300`}
                  ></div>
                )}
              </div>
            </div>
          )
        })}

        {/* More button for mobile */}
        {isMobile && (
          <div
            className="flex flex-col items-center justify-end h-full px-3"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <div className="relative cursor-pointer">
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center 
                ${isDarkMode 
                  ? showMobileMenu ? "bg-blue-500/30" : "bg-gray-700/50" 
                  : showMobileMenu ? "bg-blue-400/30" : "bg-gray-200/50"
                } 
                backdrop-blur-xl border
                ${isDarkMode ? "border-white/10" : "border-white/40"}
                transition-all duration-300 shadow-lg`}
              >
                <MoreHorizontal className={`w-8 h-8 ${isDarkMode ? "text-white" : "text-gray-800"}`} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
