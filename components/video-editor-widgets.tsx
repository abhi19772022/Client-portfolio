"use client"

import React, { useState, useEffect } from "react"
import { Play, Film, Clock, TrendingUp, Award, Zap } from "lucide-react"

interface VideoEditorWidgetsProps {
  isDarkMode?: boolean
}

export default function VideoEditorWidgets({ isDarkMode = true }: VideoEditorWidgetsProps) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
  }

  // Mock data for video editor stats
  const stats = {
    projectsCompleted: 147,
    activeProjects: 3,
    renderTime: "2h 34m",
    storageUsed: "1.2TB",
    thisWeekEdits: 12,
    totalRenders: 423,
  }

  const recentProjects = [
    { name: "Wedding Highlight Reel", status: "Rendering", progress: 67 },
    { name: "Brand Commercial", status: "In Progress", progress: 45 },
    { name: "Social Media Reel", status: "Review", progress: 100 },
  ]

  return (
    <div className="fixed left-4 md:left-6 lg:left-8 top-20 md:top-24 z-10 w-[320px] sm:w-[360px] lg:w-[380px] space-y-3 md:space-y-4 pointer-events-auto">
      {/* Date & Time Widget */}
      <div
        className={`rounded-2xl md:rounded-3xl p-5 md:p-6 backdrop-blur-2xl border shadow-2xl transition-all duration-300 hover:scale-[1.02] ${
          isDarkMode
            ? "bg-white/[0.1] border-white/[0.2] hover:bg-white/[0.12]"
            : "bg-white/[0.75] border-white/[0.5] hover:bg-white/[0.85]"
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="w-full">
            <div className={`text-sm md:text-base font-semibold tracking-tight mb-2 ${isDarkMode ? "text-white/70" : "text-gray-700"}`}>
              {formatDate(currentTime).toUpperCase()}
            </div>
            <div className={`text-5xl md:text-6xl leading-none font-light tracking-tight ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              {formatTime(currentTime)}
            </div>
          </div>
        </div>
      </div>

      {/* Active Projects Widget */}
      <div
        className={`rounded-2xl md:rounded-3xl p-5 md:p-6 backdrop-blur-2xl border shadow-2xl transition-all duration-300 hover:scale-[1.02] ${
          isDarkMode
            ? "bg-white/[0.1] border-white/[0.2] hover:bg-white/[0.12]"
            : "bg-white/[0.75] border-white/[0.5] hover:bg-white/[0.85]"
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-base md:text-lg font-bold tracking-tight ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Active Projects
          </h3>
          <Film className={`w-5 md:w-6 h-5 md:h-6 ${isDarkMode ? "text-white/50" : "text-gray-600"}`} />
        </div>
        <div className="space-y-4">
          {recentProjects.slice(0, 2).map((project, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm md:text-base font-semibold truncate pr-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {project.name}
                </span>
                <span className={`text-sm md:text-base font-bold tabular-nums flex-shrink-0 ${isDarkMode ? "text-white/70" : "text-gray-700"}`}>
                  {project.progress}%
                </span>
              </div>
              <div className={`h-2 rounded-full overflow-hidden ${isDarkMode ? "bg-white/[0.15]" : "bg-black/[0.1]"}`}>
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
              <span className={`text-xs md:text-sm font-medium mt-1.5 inline-block ${isDarkMode ? "text-white/50" : "text-gray-600"}`}>
                {project.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Widget */}
      <div
        className={`rounded-2xl md:rounded-3xl p-5 md:p-6 backdrop-blur-2xl border shadow-2xl transition-all duration-300 hover:scale-[1.02] ${
          isDarkMode
            ? "bg-white/[0.1] border-white/[0.2] hover:bg-white/[0.12]"
            : "bg-white/[0.75] border-white/[0.5] hover:bg-white/[0.85]"
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-base md:text-lg font-bold tracking-tight ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            This Week
          </h3>
          <TrendingUp className={`w-5 md:w-6 h-5 md:h-6 ${isDarkMode ? "text-white/50" : "text-gray-600"}`} />
        </div>
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          <div className={`p-4 md:p-5 rounded-2xl transition-all duration-200 hover:scale-105 ${isDarkMode ? "bg-white/[0.08]" : "bg-black/[0.06]"}`}>
            <div className={`text-3xl md:text-4xl font-bold leading-none mb-2 tracking-tight ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              {stats.thisWeekEdits}
            </div>
            <div className={`text-xs md:text-sm font-semibold tracking-tight ${isDarkMode ? "text-white/60" : "text-gray-700"}`}>
              Edits Done
            </div>
          </div>
          <div className={`p-4 md:p-5 rounded-2xl transition-all duration-200 hover:scale-105 ${isDarkMode ? "bg-white/[0.08]" : "bg-black/[0.06]"}`}>
            <div className={`text-3xl md:text-4xl font-bold leading-none mb-2 tracking-tight ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              {stats.activeProjects}
            </div>
            <div className={`text-xs md:text-sm font-semibold tracking-tight ${isDarkMode ? "text-white/60" : "text-gray-700"}`}>
              In Progress
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
