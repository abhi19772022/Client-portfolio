"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Repeat, Shuffle, Heart, Airplay, Music2, Library, Radio, Search, Plus, MoreHorizontal } from "lucide-react"
import Image from "next/image"

export default function Music() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(75)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [selectedView, setSelectedView] = useState("listening-now")
  const [isLiked, setIsLiked] = useState(false)
  const [isRepeat, setIsRepeat] = useState(false)
  const [isShuffle, setIsShuffle] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)

  const playlist = [
    {
      title: "Naacho Naacho",
      artist: "Vishal Mishra & Rahul Sipligunj",
      album: "RRR",
      cover: "https://c.saavncdn.com/191/RRR-Hindi-2022-20220310191436-500x500.jpg",
      file: "/lofi-study-112191.mp3",
      duration: "3:45",
    },
  ]

  const sidebarItems = [
    { id: "listening-now", label: "Listening Now", icon: Music2 },
    { id: "radio", label: "Radio", icon: Radio },
    { id: "library", label: "Library", icon: Library },
  ]

  const currentTrack = playlist[currentTrackIndex]

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => {
      if (isRepeat) {
        audio.currentTime = 0
        audio.play()
      } else {
        handleNext()
      }
    }

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("loadedmetadata", updateDuration)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("loadedmetadata", updateDuration)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [currentTrackIndex, isRepeat])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error("Error playing audio:", error)
        setIsPlaying(false)
      })
    } else {
      audio.pause()
    }
  }, [isPlaying, currentTrackIndex])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = isMuted ? 0 : volume / 100
  }, [volume, isMuted])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const handlePrevious = () => {
    const audio = audioRef.current
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0
    } else {
      setCurrentTrackIndex((prev) => (prev === 0 ? playlist.length - 1 : prev - 1))
      setIsPlaying(true)
    }
  }

  const handleNext = () => {
    if (!isShuffle) {
      setCurrentTrackIndex((prev) => (prev === playlist.length - 1 ? 0 : prev + 1))
    }
    setIsPlaying(true)
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    if (!audio || !duration) return

    const rect = e.currentTarget.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    const newTime = percent * duration
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value)
    setVolume(newVolume)
    if (newVolume > 0) setIsMuted(false)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="h-full w-full flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <audio ref={audioRef} src={currentTrack.file} />

      {/* Top Control Bar */}
      <div className="flex-shrink-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          {/* Left: Playback Controls */}
          <div className="flex items-center space-x-3">
            <button 
              className={`p-1.5 rounded-md transition-colors ${isShuffle ? 'text-red-500 bg-red-50 dark:bg-red-950' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
              onClick={() => setIsShuffle(!isShuffle)}
            >
              <Shuffle className="w-4 h-4" />
            </button>
            
            <button 
              className="p-1.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
              onClick={handlePrevious}
            >
              <SkipBack className="w-5 h-5" fill="currentColor" />
            </button>

            <button
              className="w-9 h-9 rounded-full bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 flex items-center justify-center shadow-md transition-all hover:scale-105"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-white dark:text-gray-900" fill="currentColor" />
              ) : (
                <Play className="w-4 h-4 text-white dark:text-gray-900 ml-0.5" fill="currentColor" />
              )}
            </button>

            <button 
              className="p-1.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
              onClick={handleNext}
            >
              <SkipForward className="w-5 h-5" fill="currentColor" />
            </button>

            <button 
              className={`p-1.5 rounded-md transition-colors ${isRepeat ? 'text-red-500 bg-red-50 dark:bg-red-950' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
              onClick={() => setIsRepeat(!isRepeat)}
            >
              <Repeat className="w-4 h-4" />
            </button>
          </div>

          {/* Center: Track Info */}
          <div className="flex-1 text-center px-6">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">{currentTrack.title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{currentTrack.artist}</p>
          </div>

          {/* Right: Volume & More */}
          <div className="flex items-center space-x-3">
            <button 
              className={`p-1.5 rounded-md transition-colors ${isLiked ? 'text-red-500 bg-red-50 dark:bg-red-950' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className="w-4 h-4" fill={isLiked ? "currentColor" : "none"} />
            </button>

            <button className="p-1.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
              <Airplay className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-2">
              <button 
                onClick={toggleMute}
                className="p-1.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${isMuted ? 0 : volume}%, #d1d5db ${isMuted ? 0 : volume}%, #d1d5db 100%)`
                }}
              />
            </div>

            <button className="p-1.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500 dark:text-gray-400 w-10 text-right">{formatTime(currentTime)}</span>
          <div 
            className="flex-1 h-1 bg-gray-200 dark:bg-gray-800 rounded-full cursor-pointer relative overflow-hidden group"
            onClick={handleSeek}
          >
            <div 
              className="absolute top-0 left-0 h-full bg-red-500 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
              style={{ left: `calc(${progress}% - 6px)` }}
            />
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 w-10">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-52 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm border-r border-gray-200 dark:border-gray-800 flex flex-col">
          {/* Search */}
          <div className="p-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search"
                className="w-full pl-8 pr-3 py-1.5 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500/50"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              const isActive = selectedView === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedView(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg mb-1 transition-colors ${
                    isActive 
                      ? 'bg-red-500 text-white' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              )
            })}

            <div className="mt-6 mb-2 px-3">
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Playlists</h3>
            </div>

            <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors mb-1">
              <Plus className="w-4 h-4" />
              <span className="text-sm">New Playlist</span>
            </button>
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto">
          {selectedView === "listening-now" && (
            <div className="p-8">
              {/* Now Playing Card */}
              <div className="max-w-2xl mx-auto">
                <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Now Playing</h2>
                
                <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
                  {/* Album Art */}
                  <div className="relative aspect-square w-full max-w-md mx-auto mb-6 rounded-xl overflow-hidden shadow-2xl">
                    <Image 
                      src={currentTrack.cover} 
                      alt={currentTrack.title}
                      width={500}
                      height={500}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Track Details */}
                  <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{currentTrack.title}</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-1">{currentTrack.artist}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">{currentTrack.album}</p>
                  </div>

                  {/* Additional Info */}
                  <div className="flex items-center justify-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Music2 className="w-4 h-4" />
                      <span>Lossless</span>
                    </div>
                    <div>•</div>
                    <div>{currentTrack.duration}</div>
                  </div>
                </div>

                {/* Up Next Section */}
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Up Next</h3>
                    <button className="text-xs text-red-500 hover:text-red-600 font-medium">Clear</button>
                  </div>
                  
                  <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">No upcoming songs</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedView === "library" && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Library</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Library items would go here */}
                <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                  <Music2 className="w-12 h-12 text-gray-400" />
                </div>
              </div>
            </div>
          )}

          {selectedView === "radio" && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Radio</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {/* Radio stations would go here */}
                <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                  <Radio className="w-12 h-12 text-gray-400" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}