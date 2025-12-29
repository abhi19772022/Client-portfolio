"use client"

import { useState, useEffect, useRef } from "react"
import { Wifi, Bluetooth, Moon, Sun, Volume2, Radio, Monitor, Music, Play, Pause, SkipForward, Power, Settings, Maximize, Minimize } from "lucide-react"
import Image from "next/image"

interface ControlCenterProps {
  onClose: () => void
  isDarkMode: boolean
  onToggleDarkMode: () => void
  brightness: number
  onBrightnessChange: (value: number) => void
  onShutdown?: () => void
}

export default function ControlCenter({
  onClose,
  isDarkMode,
  onToggleDarkMode,
  brightness,
  onBrightnessChange,
  onShutdown,
}: ControlCenterProps) {
  const [wifiEnabled, setWifiEnabled] = useState(true)
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true)
  const [airDropEnabled, setAirDropEnabled] = useState(true)
  const [doNotDisturb, setDoNotDisturb] = useState(false)
  const [volume, setVolume] = useState(75)
  const [displayBrightness, setDisplayBrightness] = useState(brightness)
  const [autobrightness, setAutoBrightness] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  
  // Music player state
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState({
    title: "Lofi Study Beats",
    artist: "Chill Vibes"
  })
  const audioRef = useRef<HTMLAudioElement>(null)

  // Load states from localStorage
  useEffect(() => {
    const savedWifi = localStorage.getItem("wifiEnabled")
    if (savedWifi !== null) {
      setWifiEnabled(savedWifi === "true")
    }
    
    const savedBluetooth = localStorage.getItem("bluetoothEnabled")
    if (savedBluetooth !== null) {
      setBluetoothEnabled(savedBluetooth === "true")
    }

    const savedVolume = localStorage.getItem("volume")
    if (savedVolume !== null) {
      setVolume(Number.parseInt(savedVolume))
    }

    setDisplayBrightness(brightness)
  }, [brightness])

  // Update volume when changed
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
    }
  }, [volume])

  // Check fullscreen status
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    setIsFullscreen(!!document.fullscreenElement)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  const toggleWifi = () => {
    const newState = !wifiEnabled
    setWifiEnabled(newState)
    localStorage.setItem("wifiEnabled", newState.toString())
  }

  const toggleBluetooth = () => {
    const newState = !bluetoothEnabled
    setBluetoothEnabled(newState)
    localStorage.setItem("bluetoothEnabled", newState.toString())
  }

  const toggleAirDrop = () => {
    setAirDropEnabled(!airDropEnabled)
  }

  const toggleDoNotDisturb = () => {
    setDoNotDisturb(!doNotDisturb)
  }

  const handleVolumeChange = (value: number) => {
    setVolume(value)
    localStorage.setItem("volume", value.toString())
  }

  const handleDisplayChange = (value: number) => {
    setDisplayBrightness(value)
    onBrightnessChange(value)
  }

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(err => console.log("Playback error:", err))
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleNext = () => {
    console.log("Next track")
  }

  const handlePowerOff = () => {
    if (onShutdown) {
      onShutdown()
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }

  return (
    <>
      <audio ref={audioRef} src="/lofi-study-112191.mp3" loop />
      
      <div
        className="fixed top-8 right-4 w-[420px] rounded-[32px] overflow-hidden shadow-2xl z-40"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(135deg, rgba(80, 40, 50, 0.85) 0%, rgba(60, 70, 90, 0.85) 100%)',
          backdropFilter: 'blur(60px)',
          WebkitBackdropFilter: 'blur(60px)',
        }}
      >
        <div className="p-5 space-y-3">
          {/* Header with User Profile */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center overflow-hidden">
                <span className="text-white text-lg font-semibold">HE</span>
              </div>
              <span className="text-white font-medium">Himanshu </span>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                onClick={onClose}
              >
                <Settings className="w-5 h-5 text-white" />
              </button>
              <button 
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                onClick={handlePowerOff}
              >
                <Power className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Connectivity Cards Row */}
          <div className="grid grid-cols-2 gap-3">
            {/* Left Column - 3 cards stacked */}
            <div className="space-y-3">
              {/* Wi-Fi */}
              <button
                className={`w-full p-4 rounded-2xl transition-all ${
                  wifiEnabled 
                    ? "bg-blue-500/95" 
                    : "bg-white/15"
                }`}
                onClick={toggleWifi}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${wifiEnabled ? 'bg-white/20' : 'bg-white/10'}`}>
                    <Wifi className={`w-6 h-6 ${wifiEnabled ? "text-white" : "text-white/60"}`} />
                  </div>
                  <div className="text-left flex-1">
                    <p className={`text-sm font-semibold ${wifiEnabled ? "text-white" : "text-white/70"}`}>
                      Wi-Fi
                    </p>
                    <p className={`text-xs ${wifiEnabled ? "text-white/80" : "text-white/50"}`}>
                      {wifiEnabled ? "Superonline 5G" : "Off"}
                    </p>
                  </div>
                </div>
              </button>

              {/* Bluetooth */}
              <button
                className={`w-full p-4 rounded-2xl transition-all ${
                  bluetoothEnabled 
                    ? "bg-blue-500/95" 
                    : "bg-white/15"
                }`}
                onClick={toggleBluetooth}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${bluetoothEnabled ? 'bg-white/20' : 'bg-white/10'}`}>
                    <Bluetooth className={`w-6 h-6 ${bluetoothEnabled ? "text-white" : "text-white/60"}`} />
                  </div>
                  <div className="text-left flex-1">
                    <p className={`text-sm font-semibold ${bluetoothEnabled ? "text-white" : "text-white/70"}`}>
                      Bluetooth
                    </p>
                    <p className={`text-xs ${bluetoothEnabled ? "text-white/80" : "text-white/50"}`}>
                      {bluetoothEnabled ? "On" : "Off"}
                    </p>
                  </div>
                </div>
              </button>

              {/* AirDrop */}
              <button
                className={`w-full p-4 rounded-2xl transition-all ${
                  airDropEnabled 
                    ? "bg-blue-500/95" 
                    : "bg-white/15"
                }`}
                onClick={toggleAirDrop}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${airDropEnabled ? 'bg-white/20' : 'bg-white/10'}`}>
                    <Radio className={`w-6 h-6 ${airDropEnabled ? "text-white" : "text-white/60"}`} />
                  </div>
                  <div className="text-left flex-1">
                    <p className={`text-sm font-semibold ${airDropEnabled ? "text-white" : "text-white/70"}`}>
                      AirDrop
                    </p>
                    <p className={`text-xs ${airDropEnabled ? "text-white/80" : "text-white/50"}`}>
                      {airDropEnabled ? "Everyone" : "Off"}
                    </p>
                  </div>
                </div>
              </button>
            </div>

            {/* Right Column */}
            <div className="space-y-3">
              {/* Don't Disturb */}
              <button
                className={`w-full p-4 rounded-2xl transition-all ${
                  doNotDisturb 
                    ? "bg-purple-500/95" 
                    : "bg-white/15"
                }`}
                onClick={toggleDoNotDisturb}
              >
                <div className="flex flex-col items-start h-full justify-between">
                  <div className={`p-2 rounded-lg ${doNotDisturb ? 'bg-white/20' : 'bg-white/10'}`}>
                    <Moon className={`w-6 h-6 ${doNotDisturb ? "text-white" : "text-white/60"}`} />
                  </div>
                  <div className="text-left mt-8">
                    <p className={`text-sm font-semibold ${doNotDisturb ? "text-white" : "text-white/70"}`}>
                      Don't Disturb
                    </p>
                    <p className={`text-xs ${doNotDisturb ? "text-white/80" : "text-white/50"}`}>
                      {doNotDisturb ? "On" : "Off"}
                    </p>
                  </div>
                </div>
              </button>

              {/* Bottom buttons row */}
              <div className="grid grid-cols-2 gap-3">
                <button 
                  className={`p-3 rounded-2xl transition-all ${
                    isFullscreen ? 'bg-blue-500/95' : 'bg-white/15'
                  }`}
                  onClick={toggleFullscreen}
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    {isFullscreen ? (
                      <Minimize className={`w-6 h-6 ${isFullscreen ? 'text-white' : 'text-white/80'} mb-1`} />
                    ) : (
                      <Maximize className={`w-6 h-6 ${isFullscreen ? 'text-white' : 'text-white/80'} mb-1`} />
                    )}
                    <p className={`text-[9px] ${isFullscreen ? 'text-white' : 'text-white/70'} text-center leading-tight`}>
                      {isFullscreen ? 'Exit' : 'Fullscreen'}
                    </p>
                  </div>
                </button>
                
                <button 
                  className={`p-3 rounded-2xl transition-all ${
                    isDarkMode ? 'bg-gray-700/95' : 'bg-yellow-500/95'
                  }`}
                  onClick={onToggleDarkMode}
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    {isDarkMode ? (
                      <Moon className="w-6 h-6 text-white mb-1" />
                    ) : (
                      <Sun className="w-6 h-6 text-white mb-1" />
                    )}
                    <p className="text-[9px] text-white text-center leading-tight">
                      {isDarkMode ? 'Dark' : 'Light'}
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Brightness Slider */}
          <div className="bg-white/15 rounded-2xl p-4">
            <div className="flex items-center space-x-3">
              <Sun className="w-5 h-5 text-white/80 flex-shrink-0" />
              <div className="flex-1 relative h-8 flex items-center">
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={displayBrightness}
                  onChange={(e) => handleDisplayChange(Number.parseInt(e.target.value))}
                  className="w-full h-1 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, white 0%, white ${displayBrightness}%, rgba(255,255,255,0.2) ${displayBrightness}%, rgba(255,255,255,0.2) 100%)`,
                  }}
                />
              </div>
              <button 
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  autobrightness ? 'bg-white/30 text-white' : 'bg-white/10 text-white/60'
                }`}
                onClick={() => setAutoBrightness(!autobrightness)}
              >
                Auto
              </button>
            </div>
          </div>

          {/* Volume Slider */}
          <div className="bg-white/15 rounded-2xl p-4">
            <div className="flex items-center space-x-3">
              <Volume2 className="w-5 h-5 text-white/80 flex-shrink-0" />
              <div className="flex-1 relative h-8 flex items-center">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => handleVolumeChange(Number.parseInt(e.target.value))}
                  className="w-full h-1 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, white 0%, white ${volume}%, rgba(255,255,255,0.2) ${volume}%, rgba(255,255,255,0.2) 100%)`,
                  }}
                />
              </div>
              <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
                <Radio className="w-4 h-4 text-white/70" />
              </button>
            </div>
          </div>

          {/* Music Player */}
          <div className="bg-white/15 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <Music className="w-6 h-6 text-white/80" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {currentSong.title}
                  </p>
                  <p className="text-xs text-white/60 truncate">
                    {currentSong.artist}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-1 ml-3">
                <button 
                  onClick={togglePlayPause}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 text-white" fill="white" />
                  ) : (
                    <Play className="w-5 h-5 text-white" fill="white" />
                  )}
                </button>
                
                <button 
                  onClick={handleNext}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <SkipForward className="w-5 h-5 text-white" fill="white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
