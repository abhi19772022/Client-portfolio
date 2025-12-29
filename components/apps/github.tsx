"use client"

import { useState } from "react"
import { Star, GitFork, Eye, Code, ExternalLink } from "lucide-react"

interface Repository {
  id: string
  name: string
  description: string
  stars: number
  forks: number
  language: string
  url: string
}

export default function GitHub({ isDarkMode }: { isDarkMode?: boolean }) {
  const [selectedTab, setSelectedTab] = useState<"repos" | "profile">("repos")

  const repositories: Repository[] = [
    {
      id: "1",
      name: "portfolio-website",
      description: "My personal portfolio website built with Next.js and TypeScript",
      stars: 42,
      forks: 8,
      language: "TypeScript",
      url: "https://github.com/yourusername/portfolio-website",
    },
    {
      id: "2",
      name: "video-editor-app",
      description: "Professional video editing application with advanced features",
      stars: 156,
      forks: 23,
      language: "React",
      url: "https://github.com/yourusername/video-editor-app",
    },
    {
      id: "3",
      name: "ai-content-generator",
      description: "AI-powered content generation tool using GPT-4",
      stars: 89,
      forks: 15,
      language: "Python",
      url: "https://github.com/yourusername/ai-content-generator",
    },
  ]

  const bgClass = isDarkMode ? "bg-gray-900" : "bg-white"
  const textClass = isDarkMode ? "text-white" : "text-gray-900"
  const secondaryTextClass = isDarkMode ? "text-gray-400" : "text-gray-600"
  const borderClass = isDarkMode ? "border-gray-700" : "border-gray-200"
  const hoverClass = isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"

  return (
    <div className={`h-full ${bgClass} ${textClass}`}>
      {/* Header */}
      <div className={`border-b ${borderClass} p-4`}>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold">
            H
          </div>
          <div>
            <h1 className="text-2xl font-bold">Himanshu</h1>
            <p className={secondaryTextClass}>@himanshu</p>
          </div>
        </div>

        <div className="flex items-center space-x-6 mt-4">
          <button
            onClick={() => setSelectedTab("repos")}
            className={`pb-2 border-b-2 transition-colors ${
              selectedTab === "repos"
                ? "border-blue-500 text-blue-500"
                : `border-transparent ${secondaryTextClass}`
            }`}
          >
            Repositories
          </button>
          <button
            onClick={() => setSelectedTab("profile")}
            className={`pb-2 border-b-2 transition-colors ${
              selectedTab === "profile"
                ? "border-blue-500 text-blue-500"
                : `border-transparent ${secondaryTextClass}`
            }`}
          >
            Profile
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 overflow-auto h-[calc(100%-180px)]">
        {selectedTab === "repos" && (
          <div className="space-y-4">
            {repositories.map((repo) => (
              <div
                key={repo.id}
                className={`p-4 rounded-lg border ${borderClass} ${hoverClass} transition-colors cursor-pointer`}
                onClick={() => window.open(repo.url, "_blank")}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Code className="w-4 h-4" />
                      <h3 className="font-semibold text-blue-500">{repo.name}</h3>
                      <ExternalLink className="w-3 h-3 opacity-50" />
                    </div>
                    <p className={`mt-2 text-sm ${secondaryTextClass}`}>{repo.description}</p>
                    <div className="flex items-center space-x-4 mt-3 text-sm">
                      <span className="flex items-center space-x-1">
                        <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                        <span className={secondaryTextClass}>{repo.language}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Star className="w-4 h-4" />
                        <span className={secondaryTextClass}>{repo.stars}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <GitFork className="w-4 h-4" />
                        <span className={secondaryTextClass}>{repo.forks}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedTab === "profile" && (
          <div className="space-y-6">
            <div className={`p-4 rounded-lg border ${borderClass}`}>
              <h3 className="font-semibold mb-2">About</h3>
              <p className={secondaryTextClass}>
                Video Editor & Developer passionate about creating amazing digital experiences.
                Specializing in video editing, web development, and creative content production.
              </p>
            </div>

            <div className={`p-4 rounded-lg border ${borderClass}`}>
              <h3 className="font-semibold mb-3">Stats</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-2xl font-bold text-blue-500">287</div>
                  <div className={`text-sm ${secondaryTextClass}`}>Total Stars</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-500">46</div>
                  <div className={`text-sm ${secondaryTextClass}`}>Total Forks</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-500">15</div>
                  <div className={`text-sm ${secondaryTextClass}`}>Repositories</div>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-lg border ${borderClass}`}>
              <h3 className="font-semibold mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {["TypeScript", "React", "Next.js", "Python", "Node.js", "Video Editing", "DaVinci Resolve", "After Effects"].map((skill) => (
                  <span
                    key={skill}
                    className={`px-3 py-1 rounded-full text-sm ${
                      isDarkMode ? "bg-gray-800" : "bg-gray-100"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
