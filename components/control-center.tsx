"use client"

import { useState, useEffect, useRef } from "react"
import { Wifi, Bluetooth, Moon, Sun, Volume2, Volume2 as VolumeIcon, Radio, Monitor, Music, Play, Pause, SkipForward, Power, Settings, Maximize, Minimize } from "lucide-react"
import Image from "next/image"

interface ControlCenterProps {
  onClose: () => void
  isDarkMode: boolean
  onToggleDarkMode: () => void
  brightness: number
  onBrightnessChange: (value: number) => void
  onShutdown?: () => void
  sfxEnabled: boolean
  onToggleSFX: () => void
}

export default function ControlCenter({
  onClose,
  isDarkMode,
  onToggleDarkMode,
  brightness,
  onBrightnessChange,
  onShutdown,
  sfxEnabled,
  onToggleSFX,
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
        className="fixed top-8 right-4 w-[360px] overflow-hidden z-40"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'rgba(255, 255, 255, 0)',
          borderRadius: '16px',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10.9px)',
          WebkitBackdropFilter: 'blur(10.9px)',
          border: '1px solid rgba(255, 255, 255, 0.09)',
        }}
      >
        <div className="p-4 space-y-2.5">
          {/* Header with User Profile */}
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center overflow-hidden">
                <span className="text-white text-base font-semibold">HE</span>
              </div>
              <span className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-black'}`}>Himanshu </span>
            </div>
            <div className="flex items-center space-x-1.5">
              <button 
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                onClick={onClose}
              >
                <Settings className={`w-4 h-4 ${isDarkMode ? 'text-white' : 'text-black'}`} />
              </button>
              <button 
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                onClick={handlePowerOff}
              >
                <Power className={`w-4 h-4 ${isDarkMode ? 'text-white' : 'text-black'}`} />
              </button>
            </div>
          </div>

          {/* Connectivity Cards Row */}
          <div className="grid grid-cols-2 gap-2">
            {/* Left Column - 3 cards stacked */}
            <div className="space-y-2">
              {/* Wi-Fi */}
              <button
                className={`w-full p-3 rounded-xl transition-all ${
                  wifiEnabled 
                    ? "bg-blue-500/95" 
                    : "bg-white/15"
                }`}
                onClick={toggleWifi}
              >
                <div className="flex items-center space-x-2.5">
                  <div className={`p-1.5 rounded-lg ${wifiEnabled ? 'bg-white/20' : 'bg-white/10'}`}>
                    <Wifi className={`w-5 h-5 ${wifiEnabled ? "text-white" : isDarkMode ? "text-white/60" : "text-black/60"}`} />
                  </div>
                  <div className="text-left flex-1">
                    <p className={`text-xs font-semibold ${wifiEnabled ? "text-white" : isDarkMode ? "text-white/70" : "text-black/70"}`}>
                      Wi-Fi
                    </p>
                    <p className={`text-[10px] ${wifiEnabled ? "text-white/80" : isDarkMode ? "text-white/50" : "text-black/50"}`}>
                      {wifiEnabled ? "Superonline 5G" : "Off"}
                    </p>
                  </div>
                </div>
              </button>

              {/* Bluetooth */}
              <button
                className={`w-full p-3 rounded-xl transition-all ${
                  bluetoothEnabled 
                    ? "bg-blue-500/95" 
                    : "bg-white/15"
                }`}
                onClick={toggleBluetooth}
              >
                <div className="flex items-center space-x-2.5">
                  <div className={`p-1.5 rounded-lg ${bluetoothEnabled ? 'bg-white/20' : 'bg-white/10'}`}>
                    <Bluetooth className={`w-5 h-5 ${bluetoothEnabled ? "text-white" : isDarkMode ? "text-white/60" : "text-black/60"}`} />
                  </div>
                  <div className="text-left flex-1">
                    <p className={`text-xs font-semibold ${bluetoothEnabled ? "text-white" : isDarkMode ? "text-white/70" : "text-black/70"}`}>
                      Bluetooth
                    </p>
                    <p className={`text-[10px] ${bluetoothEnabled ? "text-white/80" : isDarkMode ? "text-white/50" : "text-black/50"}`}>
                      {bluetoothEnabled ? "On" : "Off"}
                    </p>
                  </div>
                </div>
              </button>

              {/* Click Sound Effects */}
              <button
                className={`w-full p-3 rounded-xl transition-all ${
                  sfxEnabled 
                    ? "bg-green-500/95" 
                    : "bg-white/15"
                }`}
                onClick={onToggleSFX}
              >
                <div className="flex items-center space-x-2.5">
                  <div className={`p-1.5 rounded-lg ${sfxEnabled ? 'bg-white/20' : 'bg-white/10'}`}>
                    <VolumeIcon className={`w-5 h-5 ${sfxEnabled ? "text-white" : isDarkMode ? "text-white/60" : "text-black/60"}`} />
                  </div>
                  <div className="text-left flex-1">
                    <p className={`text-xs font-semibold ${sfxEnabled ? "text-white" : isDarkMode ? "text-white/70" : "text-black/70"}`}>
                      Click SFX
                    </p>
                    <p className={`text-[10px] ${sfxEnabled ? "text-white/80" : isDarkMode ? "text-white/50" : "text-black/50"}`}>
                      {sfxEnabled ? "On" : "Off"}
                    </p>
                  </div>
                </div>
              </button>
            </div>

            {/* Right Column */}
            <div className="space-y-2">
              {/* Don't Disturb */}
              <button
                className={`w-full p-3 rounded-xl transition-all ${
                  doNotDisturb 
                    ? "bg-purple-500/95" 
                    : "bg-white/15"
                }`}
                onClick={toggleDoNotDisturb}
              >
                <div className="flex flex-col items-start h-full justify-between">
                  <div className={`p-1.5 rounded-lg ${doNotDisturb ? 'bg-white/20' : 'bg-white/10'}`}>
                    <Moon className={`w-5 h-5 ${doNotDisturb ? "text-white" : isDarkMode ? "text-white/60" : "text-black/60"}`} />
                  </div>
                  <div className="text-left mt-6">
                    <p className={`text-xs font-semibold ${doNotDisturb ? "text-white" : isDarkMode ? "text-white/70" : "text-black/70"}`}>
                      Don't Disturb
                    </p>
                    <p className={`text-[10px] ${doNotDisturb ? "text-white/80" : isDarkMode ? "text-white/50" : "text-black/50"}`}>
                      {doNotDisturb ? "On" : "Off"}
                    </p>
                  </div>
                </div>
              </button>

              {/* Bottom buttons row */}
              <div className="grid grid-cols-2 gap-2">
                <button 
                  className={`p-2.5 rounded-xl transition-all ${
                    isFullscreen ? 'bg-blue-500/95' : 'bg-white/15'
                  }`}
                  onClick={toggleFullscreen}
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    {isFullscreen ? (
                      <Minimize className={`w-5 h-5 ${isFullscreen ? 'text-white' : isDarkMode ? 'text-white/80' : 'text-black/80'} mb-0.5`} />
                    ) : (
                      <Maximize className={`w-5 h-5 ${isFullscreen ? 'text-white' : isDarkMode ? 'text-white/80' : 'text-black/80'} mb-0.5`} />
                    )}
                    <p className={`text-[8px] ${isFullscreen ? 'text-white' : isDarkMode ? 'text-white/70' : 'text-black/70'} text-center leading-tight`}>
                      {isFullscreen ? 'Exit' : 'Fullscreen'}
                    </p>
                  </div>
                </button>
                
                <button 
                  className={`p-2.5 rounded-xl transition-all ${
                    isDarkMode ? 'bg-gray-700/95' : 'bg-yellow-500/95'
                  }`}
                  onClick={onToggleDarkMode}
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    {isDarkMode ? (
                      <Moon className="w-5 h-5 text-white mb-0.5" />
                    ) : (
                      <Sun className="w-5 h-5 text-white mb-0.5" />
                    )}
                    <p className="text-[8px] text-white text-center leading-tight">
                      {isDarkMode ? 'Dark' : 'Light'}
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Brightness Slider */}
          <div className="bg-white/15 rounded-xl p-3">
            <div className="flex items-center space-x-2.5">
              <Sun className={`w-4 h-4 flex-shrink-0 ${isDarkMode ? 'text-white/80' : 'text-black/80'}`} />
              <div className="flex-1 relative h-6 flex items-center">
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={displayBrightness}
                  onChange={(e) => handleDisplayChange(Number.parseInt(e.target.value))}
                  className="w-full h-1 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: isDarkMode 
                      ? `linear-gradient(to right, white 0%, white ${displayBrightness}%, rgba(255,255,255,0.2) ${displayBrightness}%, rgba(255,255,255,0.2) 100%)` 
                      : `linear-gradient(to right, black 0%, black ${displayBrightness}%, rgba(0,0,0,0.2) ${displayBrightness}%, rgba(0,0,0,0.2) 100%)`,
                  }}
                />
              </div>
              <button 
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium transition-colors ${
                  autobrightness 
                    ? isDarkMode ? 'bg-white/30 text-white' : 'bg-black/30 text-black'
                    : isDarkMode ? 'bg-white/10 text-white/60' : 'bg-black/10 text-black/60'
                }`}
                onClick={() => setAutoBrightness(!autobrightness)}
              >
                Auto
              </button>
            </div>
          </div>

          {/* Volume Slider */}
          <div className="bg-white/15 rounded-xl p-3">
            <div className="flex items-center space-x-2.5">
              <Volume2 className={`w-4 h-4 flex-shrink-0 ${isDarkMode ? 'text-white/80' : 'text-black/80'}`} />
              <div className="flex-1 relative h-6 flex items-center">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => handleVolumeChange(Number.parseInt(e.target.value))}
                  className="w-full h-1 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: isDarkMode
                      ? `linear-gradient(to right, white 0%, white ${volume}%, rgba(255,255,255,0.2) ${volume}%, rgba(255,255,255,0.2) 100%)`
                      : `linear-gradient(to right, black 0%, black ${volume}%, rgba(0,0,0,0.2) ${volume}%, rgba(0,0,0,0.2) 100%)`,
                  }}
                />
              </div>
              <button className="p-1 hover:bg-white/10 rounded-full transition-colors">
                <Radio className={`w-3.5 h-3.5 ${isDarkMode ? 'text-white/70' : 'text-black/70'}`} />
              </button>
            </div>
          </div>

          {/* Music Player */}
          <div className="bg-white/15 rounded-xl p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5 flex-1 min-w-0">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <Music className={`w-5 h-5 ${isDarkMode ? 'text-white/80' : 'text-black/80'}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-medium truncate ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    {currentSong.title}
                  </p>
                  <p className={`text-[10px] truncate ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>
                    {currentSong.artist}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-0.5 ml-2">
                <button 
                  onClick={togglePlayPause}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  {isPlaying ? (
                    <Pause className={`w-4 h-4 ${isDarkMode ? 'text-white' : 'text-black'}`} fill={isDarkMode ? 'white' : 'black'} />
                  ) : (
                    <Play className={`w-4 h-4 ${isDarkMode ? 'text-white' : 'text-black'}`} fill={isDarkMode ? 'white' : 'black'} />
                  )}
                </button>
                
                <button 
                  onClick={handleNext}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <SkipForward className={`w-4 h-4 ${isDarkMode ? 'text-white' : 'text-black'}`} fill={isDarkMode ? 'white' : 'black'} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
