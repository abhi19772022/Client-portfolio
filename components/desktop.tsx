"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import gsap from "gsap"
import { Draggable } from "gsap/Draggable"
import Dock from "@/components/dock"
import Menubar from "@/components/menubar"
import Wallpaper from "@/components/wallpaper"
import Window from "@/components/window"
import Launchpad from "@/components/launchpad"
import ControlCenter from "@/components/control-center"
import Spotlight from "@/components/spotlight"
import VideoEditorWidgets from "@/components/video-editor-widgets"
import VariableProximity from "@/components/ui/variable-proximity"
import type { AppWindow } from "@/types"

interface DesktopProps {
  onLogout: () => void
  onSleep: () => void
  onShutdown: () => void
  onRestart: () => void
  initialDarkMode: boolean
  onToggleDarkMode: () => void
  initialBrightness: number
  onBrightnessChange: (value: number) => void
  sfxEnabled: boolean
  onToggleSFX: () => void
}

export default function Desktop({
  onLogout,
  onSleep,
  onShutdown,
  onRestart,
  initialDarkMode,
  onToggleDarkMode,
  initialBrightness,
  onBrightnessChange,
  sfxEnabled,
  onToggleSFX,
}: DesktopProps) {
  const [time, setTime] = useState(new Date())
  const [openWindows, setOpenWindows] = useState<AppWindow[]>([])
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null)
  const [showLaunchpad, setShowLaunchpad] = useState(false)
  const [showControlCenter, setShowControlCenter] = useState(false)
  const [showSpotlight, setShowSpotlight] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(initialDarkMode)
  const [screenBrightness, setScreenBrightness] = useState(initialBrightness)
  const desktopRef = useRef<HTMLDivElement>(null)
  const textContainerRef = useRef<HTMLDivElement>(null)
  const [showAboutMeVideo, setShowAboutMeVideo] = useState(false)
  const [showSecondNote, setShowSecondNote] = useState(false)
  const [draggingItem, setDraggingItem] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const stickyNoteRef = useRef<HTMLDivElement>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [iconPositions, setIconPositions] = useState({
    aboutMe: { x: 32, y: 350 }, // left-8 (32px), moved further down to y: 260px
    longForm: { x: window.innerWidth * 0.78, y: 128 }, // right-[22%] (78%), top-32 (128px)
    shortForm: { x: window.innerWidth * 0.92, y: window.innerHeight * 0.45 }, // right-[8%], top-[45%]
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    // No default app opening to avoid duplicate key issues

    return () => clearInterval(timer)
  }, [])

  // Update local state when props change
  useEffect(() => {
    setIsDarkMode(initialDarkMode)
  }, [initialDarkMode])

  useEffect(() => {
    setScreenBrightness(initialBrightness)
  }, [initialBrightness])

  // GSAP Draggable setup for sticky note
  useEffect(() => {
    if (typeof window !== 'undefined' && stickyNoteRef.current) {
      gsap.registerPlugin(Draggable)
      
      const draggableInstance = Draggable.create(stickyNoteRef.current, {
        type: "x,y",
        inertia: true,
        onRelease: function() {
          gsap.to(this.target, {
            x: 0,
            y: 0,
            duration: 1.5,
            ease: "elastic.out(1, 0.3)"
          })
        }
      })

      return () => {
        draggableInstance[0]?.kill()
      }
    }
  }, [])

  const openApp = (app: AppWindow) => {
    // Check if app is already open
    const isOpen = openWindows.some((window) => window.id === app.id)

    if (!isOpen) {
      setOpenWindows((prev) => [...prev, app])
    }

    // Set as active window
    setActiveWindowId(app.id)

    // Close launchpad if open
    if (showLaunchpad) {
      setShowLaunchpad(false)
    }
  }

  const closeWindow = (id: string) => {
    setOpenWindows((prev) => prev.filter((window) => window.id !== id))

    // If we closed the active window, set the last window as active
    if (activeWindowId === id && openWindows.length > 1) {
      const remainingWindows = openWindows.filter((window) => window.id !== id)
      setActiveWindowId(remainingWindows[remainingWindows.length - 1].id)
    } else if (openWindows.length <= 1) {
      setActiveWindowId(null)
    }
  }

  const setActiveWindow = (id: string) => {
    setActiveWindowId(id)
  }

  const toggleLaunchpad = () => {
    setShowLaunchpad(!showLaunchpad)
    if (showControlCenter) setShowControlCenter(false)
    if (showSpotlight) setShowSpotlight(false)
  }

  const toggleControlCenter = () => {
    setShowControlCenter(!showControlCenter)
    if (showSpotlight) setShowSpotlight(false)
  }

  const toggleSpotlight = () => {
    setShowSpotlight(!showSpotlight)
    if (showControlCenter) setShowControlCenter(false)
  }

  const toggleDarkMode = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    onToggleDarkMode()
  }

  const updateBrightness = (value: number) => {
    setScreenBrightness(value)
    onBrightnessChange(value)
  }

  const handleDesktopClick = (e: React.MouseEvent) => {
    // Only handle clicks directly on the desktop, not on children
    if (e.target === desktopRef.current) {
      setActiveWindowId(null)
      if (showControlCenter) setShowControlCenter(false)
      if (showSpotlight) setShowSpotlight(false)
    }
  }

  // Drag handlers for desktop icons
  const handleDragStart = useCallback((e: React.DragEvent, itemId: string) => {
    setDraggingItem(itemId)
    e.dataTransfer.effectAllowed = 'move'
  }, [])

  const handleDragEnd = useCallback((e: React.DragEvent) => {
    setDraggingItem(null)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    if (!draggingItem) return

    const rect = desktopRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = e.clientX - rect.left - 28 // Offset for icon center (56/2)
    const y = e.clientY - rect.top - 28

    setIconPositions(prev => ({
      ...prev,
      [draggingItem]: { x, y }
    }))
    setDraggingItem(null)
  }, [draggingItem])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }, [])

  return (
    <div className="relative">
      <div
        ref={desktopRef}
        className={`relative h-screen w-screen overflow-hidden ${isDarkMode ? "dark" : ""}`}
        onClick={handleDesktopClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <Wallpaper isDarkMode={isDarkMode} />

        {/* Desktop Files and Folders */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {/* About Me Video File with Click Modal */}
          <div 
            className="absolute pointer-events-auto cursor-move group"
            style={{ 
              left: `${iconPositions.aboutMe.x}px`, 
              top: `${iconPositions.aboutMe.y}px`,
              transition: draggingItem === 'aboutMe' ? 'none' : 'all 0.3s ease'
            }}
            draggable
            onDragStart={(e) => handleDragStart(e, 'aboutMe')}
            onDragEnd={handleDragEnd}
            onClick={(e) => {
              if (!draggingItem) {
                e.stopPropagation();
                setShowAboutMeVideo(true);
              }
            }}
          >
            <div className="flex flex-col items-center hover:scale-105 transition-transform relative">
              <svg viewBox="0 0 64 64" className="w-14 h-14">
                <defs>
                  <linearGradient id="videoGradientAbout" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "#5DADE2", stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: "#2E86AB", stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                <rect x="12" y="8" width="40" height="48" rx="3" ry="3" fill="url(#videoGradientAbout)" stroke="#2471A3" strokeWidth="1"/>
                <circle cx="32" cy="28" r="8" fill="white" opacity="0.9"/>
                <path d="M 29 24 L 29 32 L 36 28 Z" fill="#2E86AB"/>
                <rect x="12" y="44" width="40" height="12" rx="0" ry="0" fill="#1F618D" opacity="0.7"/>
              </svg>
              <span className="mt-1 text-xs text-dark dark:text-white font-medium drop-shadow-lg">
                About Me.mov
              </span>
            </div>
          </div>

          {/* About Me Video Modal */}
          {showAboutMeVideo && (
            <div 
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in-0 duration-200"
              onClick={(e) => {
                e.stopPropagation();
                if (videoRef.current) {
                  videoRef.current.pause();
                }
                setShowAboutMeVideo(false);
              }}
            >
              <div 
                className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl p-4 border-2 border-blue-500/30 animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (videoRef.current) {
                      videoRef.current.pause();
                      videoRef.current.currentTime = 0;
                    }
                    setShowAboutMeVideo(false);
                  }}
                  className="absolute -top-3 -right-3 z-[10000] bg-red-500 hover:bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-all hover:scale-110 font-bold text-lg cursor-pointer"
                  title="Close"
                  style={{ pointerEvents: 'auto' }}
                >
                  ✕
                </button>
                <div className="relative">
                  <video 
                    ref={videoRef}
                    autoPlay 
                    loop
                    playsInline
                    controls
                    controlsList="nodownload"
                    className="w-[500px] h-[500px] rounded-lg object-cover bg-black"
                    onLoadedData={() => {
                      if (videoRef.current) {
                        videoRef.current.play().catch(err => console.log("Video play error:", err));
                      }
                    }}
                  >
                    <source src="https://ro1maimmky.ufs.sh/f/9whXBKsZTOyPsP9ZWsmRoLvX6jdZYu7rxBql51T3aFAPQztW" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-white font-medium pointer-events-none">
                    🎬 About Me
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Long Form Videos Folder */}
          <div 
            className="absolute pointer-events-auto cursor-move"
            style={{ 
              left: `${iconPositions.longForm.x}px`, 
              top: `${iconPositions.longForm.y}px`,
              transition: draggingItem === 'longForm' ? 'none' : 'all 0.3s ease'
            }}
            draggable
            onDragStart={(e) => handleDragStart(e, 'longForm')}
            onDragEnd={handleDragEnd}
            onClick={() => openApp({
              id: "files-longform",
              title: "Long Form Videos",
              component: "Files",
              position: { x: 100, y: 80 },
              size: { width: 900, height: 600 },
            })}
          >
            <div className="flex flex-col items-center group hover:scale-105 transition-transform">
              <div className="w-14 h-14 relative">
                <img 
                  src="/files.png" 
                  alt="Folder" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="mt-1 text-xs text-dark dark:text-white font-medium drop-shadow-lg">
                Long Form Videos
              </span>
            </div>
          </div>

          {/* Short Form Videos Folder */}
          <div 
            className="absolute pointer-events-auto cursor-move"
            style={{ 
              left: `${iconPositions.shortForm.x}px`, 
              top: `${iconPositions.shortForm.y}px`,
              transition: draggingItem === 'shortForm' ? 'none' : 'all 0.3s ease'
            }}
            draggable
            onDragStart={(e) => handleDragStart(e, 'shortForm')}
            onDragEnd={handleDragEnd}
            onClick={() => openApp({
              id: "files-shortform",
              title: "Short Form Videos",
              component: "Files",
              position: { x: 200, y: 100 },
              size: { width: 900, height: 600 },
            })}
          >
            <div className="flex flex-col items-center group hover:scale-105 transition-transform">
              <div className="w-14 h-14 relative">
                <img 
                  src="/files.png" 
                  alt="Folder" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="mt-1 text-xs text-dark dark:text-white font-medium drop-shadow-lg">
                Short Form Videos
              </span>
            </div>
          </div>
        </div>

        <Menubar
          time={time}
          onLogout={onLogout}
          onSleep={onSleep}
          onShutdown={onShutdown}
          onRestart={onRestart}
          onSpotlightClick={toggleSpotlight}
          onControlCenterClick={toggleControlCenter}
          isDarkMode={isDarkMode}
          activeWindow={activeWindowId ? openWindows.find((w) => w.id === activeWindowId) || null : null}
        />

        {/* Video Editor Widgets - Hidden but keeping code */}
        {false && <VideoEditorWidgets isDarkMode={isDarkMode} />}

        {/* SVG Filter for Liquid Glass Effect */}
        <svg style={{ display: 'none' }} xmlns="http://www.w3.org/2000/svg">
          <filter id="glass-blur" x="0" y="0" width="100%" height="100%" filterUnits="objectBoundingBox">
            <feTurbulence type="fractalNoise" baseFrequency="0.003 0.007" numOctaves="1" result="turbulence" />
            <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="200" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>

        {/* Single Sticky Note - Liquid Glass Theme */}
        <div className="absolute top-10 left-6 z-10 hidden sm:block">
          <div 
            ref={stickyNoteRef}
            className={`relative rounded-2xl overflow-hidden transform hover:rotate-0 transition-all duration-300 ${
              isExpanded ? 'w-80 md:w-96' : 'w-56 md:w-64'
            }`}
            onClick={() => setIsExpanded(!isExpanded)}
            style={{ 
              cursor: 'grab',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
              rotate: '1deg',
            }}
          >
            {/* Liquid Glass Bend Layer - backdrop blur with distortion */}
            <div 
              className="absolute inset-0 rounded-2xl"
              style={{
                zIndex: 0,
                backdropFilter: 'blur(3px)',
                WebkitBackdropFilter: 'blur(3px)',
                filter: 'url(#glass-blur)',
                isolation: 'isolate',
              }}
            />
            
            {/* Liquid Glass Face Layer - depth shadow */}
            <div 
              className="absolute inset-0 rounded-2xl"
              style={{
                zIndex: 1,
                boxShadow: '0 4px 4px rgba(0, 0, 0, 0.15), 0 0 12px rgba(0, 0, 0, 0.08)',
              }}
            />
            
            {/* Liquid Glass Edge Layer - inset highlights */}
            <div 
              className="absolute inset-0 rounded-2xl"
              style={{
                zIndex: 2,
                boxShadow: 'inset 3px 3px 3px 0 rgba(255, 255, 255, 0.45), inset -3px -3px 3px 0 rgba(255, 255, 255, 0.45)',
              }}
            />

            {/* Content */}
            <div className={`relative z-10 space-y-3 p-4 md:p-5 transition-all duration-300 ${
              isExpanded ? 'p-6 md:p-7' : ''
            }`}>
              <div className={`font-bold mb-3 transition-all duration-300 ${
                isExpanded ? 'text-xl md:text-2xl' : 'text-base md:text-lg'
              } ${
                isDarkMode 
                  ? 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]' 
                  : 'text-gray-900 drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]'
              }`}>Professional Portfolio</div>
              <div className={`text-xs md:text-sm space-y-2 leading-relaxed transition-all duration-300 ${
                isExpanded ? 'text-sm md:text-base space-y-3' : ''
              } ${
                isDarkMode 
                  ? 'text-white/95 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]' 
                  : 'text-gray-800/95 drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]'
              }`}>
                <div className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span>Creative Video Editing and storytelling</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span>3+ year Industry level experience</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span>200+ Satisfied Videos delivered and counting</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span>India's top 1% Editor</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span>Worked with top creators and Industry leaders</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Center Variable Proximity Text */}
        <div
          ref={textContainerRef}
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 "
          style={{ pointerEvents: 'none' }}
        >
          <div style={{ pointerEvents: 'auto' }}>
            <VariableProximity
              label=" Welcome to my"
              className="text-xl  font-bold text-dark dark:text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]"
              fromFontVariationSettings="'wght' 200, 'opsz' 8"
              toFontVariationSettings="'wght' 900, 'opsz' 144"
              containerRef={textContainerRef}
              radius={250}
              falloff="gaussian"
              style={{ fontFamily: '"Roboto Flex", sans-serif' }}
            />
          </div>
          <div style={{ pointerEvents: 'auto' }}>
            <VariableProximity
              label="Portfolio"
              className="text-5xl md:text-5xl lg:text-6xl font-bold italic text-dark dark:text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]"
              fromFontVariationSettings="'wght' 400, 'opsz' 8"
              toFontVariationSettings="'wght' 900, 'opsz' 144"
              containerRef={textContainerRef}
              radius={250}
              falloff="gaussian"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            />
          </div>
        </div>

        {/* Windows */}
        <div className="absolute inset-0 pt-6 pb-16">
          {openWindows.map((window) => (
            <Window
              key={window.id}
              window={window}
              isActive={activeWindowId === window.id}
              onClose={() => closeWindow(window.id)}
              onFocus={() => setActiveWindow(window.id)}
              isDarkMode={isDarkMode}
              onAppClick={openApp}
            />
          ))}
        </div>

        {/* Launchpad */}
        {showLaunchpad && <Launchpad onAppClick={openApp} onClose={() => setShowLaunchpad(false)} />}

        {/* Control Center */}
        {showControlCenter && (
          <ControlCenter
            onClose={() => setShowControlCenter(false)}
            isDarkMode={isDarkMode}
            onToggleDarkMode={toggleDarkMode}
            brightness={screenBrightness}
            onBrightnessChange={updateBrightness}
            onShutdown={onShutdown}
            sfxEnabled={sfxEnabled}
            onToggleSFX={onToggleSFX}
          />
        )}

        {/* Spotlight */}
        {showSpotlight && <Spotlight onClose={() => setShowSpotlight(false)} onAppClick={openApp} />}

        <Dock
          onAppClick={openApp}
          onLaunchpadClick={toggleLaunchpad}
          activeAppIds={openWindows.map((w) => w.id)}
          isDarkMode={isDarkMode}
        />
      </div>

      {/* Brightness overlay */}
      <div
        className="absolute inset-0 bg-black pointer-events-none z-50 transition-opacity duration-300"
        style={{ opacity: Math.max(0.1, 0.9 - screenBrightness / 100) }}
      />
    </div>
  )
}
