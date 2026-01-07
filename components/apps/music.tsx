"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Repeat, Shuffle, Heart } from "lucide-react"
import Image from "next/image"

export default function Music() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(75)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [isRepeat, setIsRepeat] = useState(false)
  const [isShuffle, setIsShuffle] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)

  const playlist = [
    {
      title: "Lofi Beats",
      artist: "Chill Vibes",
      album: "Study Session",
      cover: "https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=500&h=500&fit=crop",
      file: "/lofi-study-112191.mp3",
      duration: "3:45",
    },
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
    <div 
      className="h-full w-full flex items-center justify-center p-4"
      style={{
        background: 'rgba(255, 255, 255, 0)',
        backdropFilter: 'blur(10.9px)',
        WebkitBackdropFilter: 'blur(10.9px)',
      }}
    >
      <audio ref={audioRef} src={currentTrack.file} />

      {/* Compact macOS-style Music Player */}
      <div className="w-[320px] bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
        {/* Album Art */}
        <div className="relative aspect-square w-full">
          <Image 
            src={currentTrack.cover} 
            alt={currentTrack.title}
            width={320}
            height={320}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Track Info */}
        <div className="px-5 pt-4 pb-3">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white truncate mb-0.5">
            {currentTrack.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
            {currentTrack.artist}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="px-5 pb-3">
          <div 
            className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer relative overflow-hidden group"
            onClick={handleSeek}
          >
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-pink-500 to-red-500 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-xs text-gray-500 dark:text-gray-400">{formatTime(currentTime)}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="px-5 pb-5">
          <div className="flex items-center justify-between mb-4">
            <button 
              className={`p-2 rounded-lg transition-all ${isShuffle ? 'text-red-500 bg-red-50 dark:bg-red-950/30' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              onClick={() => setIsShuffle(!isShuffle)}
            >
              <Shuffle className="w-3.5 h-3.5" />
            </button>
            
            <div className="flex items-center space-x-2">
              <button 
                className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
                onClick={handlePrevious}
              >
                <SkipBack className="w-5 h-5" fill="currentColor" />
              </button>

              <button
                className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-900 to-gray-700 dark:from-white dark:to-gray-100 hover:scale-105 flex items-center justify-center shadow-lg transition-all active:scale-95"
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-white dark:text-gray-900" fill="currentColor" />
                ) : (
                  <Play className="w-5 h-5 text-white dark:text-gray-900 ml-0.5" fill="currentColor" />
                )}
              </button>

              <button 
                className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
                onClick={handleNext}
              >
                <SkipForward className="w-5 h-5" fill="currentColor" />
              </button>
            </div>

            <button 
              className={`p-2 rounded-lg transition-all ${isRepeat ? 'text-red-500 bg-red-50 dark:bg-red-950/30' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              onClick={() => setIsRepeat(!isRepeat)}
            >
              <Repeat className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Volume & Like */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2 flex-1">
              <button 
                onClick={toggleMute}
                className="p-1.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
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
                className="flex-1 h-1 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${isMuted ? 0 : volume}%, #e5e7eb ${isMuted ? 0 : volume}%, #e5e7eb 100%)`
                }}
              />
            </div>

            <button 
              className={`p-2 rounded-lg transition-all ml-2 ${isLiked ? 'text-red-500 bg-red-50 dark:bg-red-950/30' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className="w-4 h-4" fill={isLiked ? "currentColor" : "none"} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}