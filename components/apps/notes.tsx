"use client"

import type React from "react"

import { useState } from "react"
import { 
  Folder,
  Star,
  Trash2,
  Search,
  ChevronRight,
  Image as ImageIcon,
  Video,
  Award,
  Users,
  Briefcase,
  Sparkles,
  GraduationCap,
  Film,
  Hash,
  Calendar,
  TrendingUp,
  Menu,
  X,
  ChevronLeft,
  Heart,
  Clapperboard,
  Smartphone,
  Music,
  CheckCircle2
} from "lucide-react"

interface NotesProps {
  isDarkMode?: boolean
}

export default function Notes({ isDarkMode = true }: NotesProps) {
  const [selectedFolder, setSelectedFolder] = useState("all")
  const [selectedNoteId, setSelectedNoteId] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [showSidebar, setShowSidebar] = useState(false)
  const [showNotesList, setShowNotesList] = useState(false)

  const folders = [
    { id: "all", name: "All Notes", icon: Folder, count: 12 },
    { id: "portfolio", name: "Portfolio", icon: Sparkles, count: 4 },
    { id: "projects", name: "Video Projects", icon: Film, count: 5 },
    { id: "clients", name: "Client Work", icon: Users, count: 3 },
  ]

  const notes = [
    {
      id: 1,
      folder: "portfolio",
      title: "About Himashu",
      preview: "Professional Video Editor with 5+ years of experience specializing in brand commercials, corporate videos...",
      content: "full",
      date: "Jan 7, 2026",
      time: "10:30 AM",
      tags: ["#portfolio", "#personalbranding"],
      hasImage: true,
    },
    {
      id: 2,
      folder: "projects",
      title: "Corporate Training Series - TechCorp",
      preview: "Professional training video series with interviews, product demonstrations, and educational content...",
      content: "project1",
      date: "Jan 6, 2026",
      time: "3:45 PM",
      tags: ["#videoediting", "#cinematography"],
      hasImage: true,
    },
    {
      id: 3,
      folder: "clients",
      title: "TechStart Brand Commercial",
      preview: "30-second commercial for tech startup. Includes product shots, testimonials, and call-to-action...",
      content: "project2",
      date: "Jan 5, 2026",
      time: "11:20 AM",
      tags: ["#brand", "#editing"],
      hasImage: false,
    },
    {
      id: 4,
      folder: "portfolio",
      title: "Skills & Expertise",
      preview: "Adobe Premiere Pro, DaVinci Resolve, After Effects, Final Cut Pro, Color Grading, Motion Graphics...",
      content: "skills",
      date: "Jan 4, 2026",
      time: "9:15 AM",
      tags: ["#portfolio", "#editing"],
      hasImage: false,
    },
    {
      id: 5,
      folder: "projects",
      title: "Music Video - Urban Dreams",
      preview: "High-energy music video with creative transitions, color grading, and visual effects...",
      content: "project3",
      date: "Jan 3, 2026",
      time: "2:30 PM",
      tags: ["#cinematography", "#brand"],
      hasImage: true,
    },
  ]

  const filteredNotes = notes.filter((note) => {
    const matchesFolder = selectedFolder === "all" || note.folder === selectedFolder
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         note.preview.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFolder && matchesSearch
  })

  const selectedNote = notes.find((note) => note.id === selectedNoteId)

  const renderNoteContent = () => {
    if (!selectedNote) return null

    switch (selectedNote.content) {
      case "full":
        return (
          <div className="space-y-4 md:space-y-6">
            <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 mb-4 bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-amber-200">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden ring-4 ring-amber-400/30 shadow-xl flex-shrink-0">
                <img src="/himmi.png" alt="Himashu" className="w-full h-full object-cover" />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-1">Himashu</h1>
                <p className="text-sm md:text-base text-gray-600">Professional Video Editor</p>
              </div>
            </div>

            <div className="prose max-w-none">
              <p className="text-sm md:text-base text-gray-800 leading-relaxed bg-white rounded-xl p-4 md:p-6 shadow-md border border-amber-100">
                Creative storyteller with 5+ years of experience transforming raw footage into compelling visual narratives. 
                Specialized in brand commercials, corporate videos, and social media content that connects with audiences.
              </p>

              <div className="grid grid-cols-3 gap-2 md:gap-4 my-4 md:my-6 not-prose">
                <div className="bg-white rounded-xl p-3 md:p-4 border border-amber-200 text-center shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-2xl md:text-3xl font-bold text-amber-600">147</div>
                  <div className="text-xs md:text-sm text-gray-600 mt-1">Projects</div>
                </div>
                <div className="bg-white rounded-xl p-3 md:p-4 border border-amber-200 text-center shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-2xl md:text-3xl font-bold text-green-600">5+</div>
                  <div className="text-xs md:text-sm text-gray-600 mt-1">Years</div>
                </div>
                <div className="bg-white rounded-xl p-3 md:p-4 border border-amber-200 text-center shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-2xl md:text-3xl font-bold text-purple-600">98%</div>
                  <div className="text-xs md:text-sm text-gray-600 mt-1">Satisfaction</div>
                </div>
              </div>

              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mt-4 md:mt-6 mb-3">What I Do</h3>
              <ul className="space-y-2 text-sm md:text-base text-gray-800 bg-white rounded-xl p-4 md:p-6 shadow-md border border-amber-100">
                <li className="flex items-start gap-2">
                  <Briefcase className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                  <span><strong>Full-Cycle Post-Production:</strong> Taking your raw footage from "assembly" to a polished, high-impact final cut.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Clapperboard className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                  <span><strong>Strategic Storytelling:</strong> Structuring content to capture attention in the first 3 seconds and maintain it until the CTA.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Smartphone className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                  <span><strong>Precision Technical Grading:</strong> Professional color correction and audio mastering to ensure your brand looks and sounds premium.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Music className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Visual Rhythm:</strong> Expertly pacing cuts to match the mood, message, and music of your project.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Film className="w-4 h-4 text-amber-600 mt-1 flex-shrink-0" />
                  <span><strong>Atmospheric Color & Sound:</strong> Using color science and soundscapes to immerse your audience in the story.</span>
                </li>
              </ul>

              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-4 md:p-6 mt-4 md:mt-6 border border-amber-200 shadow-md">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 md:w-5 md:h-5 text-amber-600" />
                  Why Choose Me
                </h3>
                <ul className="space-y-2 text-gray-700 text-xs md:text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Efficiency First:</strong> I respect your deadlines. My workflow is optimized for speed without sacrificing creative quality.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Brand Alignment:</strong> I don't just edit; I study your brand guidelines to ensure every frame feels like "you."</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Reliability:</strong> With 3 years of experience, I've seen every technical glitch imaginable—and I know how to fix them.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Clear Communication:</strong> No "editor ghosting." You get consistent updates and a streamlined revision process.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Algorithm Aware:</strong> I understand what keeps people watching on modern platforms.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )

      case "project1":
        return (
          <div className="space-y-4 md:space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Corporate Training Series</h1>
              <span className="px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-yellow-100 text-yellow-800 text-xs md:text-sm border border-yellow-300 shadow-sm">
                In Progress
              </span>
            </div>

            <div className="bg-white rounded-xl p-1 border border-amber-200 overflow-hidden shadow-md">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Video className="w-12 h-12 md:w-16 md:h-16 text-blue-600 mx-auto mb-2 md:mb-3" />
                  <p className="text-xs md:text-sm text-gray-600">Training Video Preview</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 md:space-y-4">
              <div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 md:mb-3">Project Details</h3>
                <div className="grid grid-cols-2 gap-2 md:gap-3">
                  <div className="bg-white rounded-lg p-2 md:p-3 border border-amber-200 shadow-sm">
                    <div className="text-xs md:text-sm text-gray-500">Client</div>
                    <div className="text-sm md:text-base text-gray-900 font-medium">TechCorp Inc.</div>
                  </div>
                  <div className="bg-white rounded-lg p-2 md:p-3 border border-amber-200 shadow-sm">
                    <div className="text-xs md:text-sm text-gray-500">Duration</div>
                    <div className="text-sm md:text-base text-gray-900 font-medium">12-15 minutes</div>
                  </div>
                  <div className="bg-white rounded-lg p-2 md:p-3 border border-amber-200 shadow-sm">
                    <div className="text-xs md:text-sm text-gray-500">Deadline</div>
                    <div className="text-sm md:text-base text-gray-900 font-medium">Jan 15, 2026</div>
                  </div>
                  <div className="bg-white rounded-lg p-2 md:p-3 border border-amber-200 shadow-sm">
                    <div className="text-xs md:text-sm text-gray-500">Status</div>
                    <div className="text-sm md:text-base text-gray-900 font-medium">67% Complete</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-3 md:p-4 border border-amber-200 shadow-sm">
                <div className="flex justify-between text-xs md:text-sm mb-2">
                  <span className="text-gray-600">Progress</span>
                  <span className="text-gray-900 font-semibold">67%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-full bg-gradient-to-r from-pink-400 to-rose-400 rounded-full" style={{ width: '67%' }}></div>
                </div>
              </div>

              <div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 md:mb-3">Deliverables</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-white rounded-lg border border-amber-200 shadow-sm">
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 text-sm md:text-base">✓</span>
                    </div>
                    <span className="text-xs md:text-sm text-gray-900">Main Highlight Reel (8-10 min)</span>
                  </div>
                  <div className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-white rounded-lg border border-amber-200 shadow-sm">
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-yellow-600 text-sm md:text-base">⏱</span>
                    </div>
                    <span className="text-xs md:text-sm text-gray-900">Social Media Version (60s)</span>
                  </div>
                  <div className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-white rounded-lg border border-amber-200 shadow-sm">
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                      <span className="text-gray-500 text-sm md:text-base">○</span>
                    </div>
                    <span className="text-xs md:text-sm text-gray-900">Raw Footage Archive</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case "project2":
        return (
          <div className="space-y-4 md:space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Brand Commercial</h1>
              <span className="px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-blue-100 text-blue-800 text-xs md:text-sm border border-blue-300 shadow-sm">
                Active
              </span>
            </div>

            <div className="prose max-w-none">
              <p className="text-sm md:text-base text-gray-800 leading-relaxed bg-white rounded-xl p-4 md:p-6 shadow-md border border-amber-100">
                Creating a dynamic 30-second commercial for TechStart Inc. featuring their latest product launch. 
                The video combines sleek product shots with customer testimonials to build trust and drive conversions.
              </p>

              <h3 className="text-base md:text-xl font-semibold text-gray-900 mt-4 md:mt-6 mb-2 md:mb-3">Project Scope</h3>
              <ul className="space-y-2 text-sm md:text-base text-gray-800 bg-white rounded-xl p-4 md:p-6 shadow-md border border-amber-100">
                <li>Product showcase with dynamic camera movements</li>
                <li>Customer testimonials and B-roll footage</li>
                <li>Professional color grading matching brand identity</li>
                <li>Custom motion graphics and logo animations</li>
              </ul>

              <div className="grid grid-cols-3 gap-2 md:gap-3 my-4 md:my-6 not-prose">
                <div className="bg-white rounded-lg p-3 md:p-4 border border-amber-200 shadow-md">
                  <div className="text-xs md:text-sm text-gray-500 mb-1">Format</div>
                  <div className="text-sm md:text-base text-gray-900 font-semibold">16:9 YouTube</div>
                </div>
                <div className="bg-white rounded-lg p-3 md:p-4 border border-amber-200 shadow-md">
                  <div className="text-xs md:text-sm text-gray-500 mb-1">Stories</div>
                  <div className="text-sm md:text-base text-gray-900 font-semibold">9:16 Vertical</div>
                </div>
                <div className="bg-white rounded-lg p-3 md:p-4 border border-amber-200 shadow-md">
                  <div className="text-xs md:text-sm text-gray-500 mb-1">Feed</div>
                  <div className="text-sm md:text-base text-gray-900 font-semibold">1:1 Square</div>
                </div>
              </div>
            </div>
          </div>
        )

      case "skills":
        return (
          <div className="space-y-4 md:space-y-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">Skills & Expertise</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 md:p-6 border border-blue-200 shadow-md">
                <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-blue-200 flex items-center justify-center">
                    <Film className="w-4 h-4 md:w-5 md:h-5 text-blue-700" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-base md:text-lg">Video Editing</h3>
                </div>
                <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-gray-800">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    Adobe Premiere Pro
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    DaVinci Resolve
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    Final Cut Pro
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    Color Grading
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 md:p-6 border border-purple-200 shadow-md">
                <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-purple-200 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-purple-700" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-base md:text-lg">Motion Graphics</h3>
                </div>
                <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-gray-800">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                    After Effects
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                    Motion Design
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                    Logo Animations
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                    Visual Effects
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 md:p-6 border border-green-200 shadow-md">
                <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-green-200 flex items-center justify-center">
                    <ImageIcon className="w-4 h-4 md:w-5 md:h-5 text-green-700" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-base md:text-lg">Creative Suite</h3>
                </div>
                <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-gray-800">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                    Photoshop
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                    Illustrator
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                    Audition
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                    Figma
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 md:p-6 border border-orange-200 shadow-md">
                <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-orange-200 flex items-center justify-center">
                    <Award className="w-4 h-4 md:w-5 md:h-5 text-orange-700" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-base md:text-lg">Specializations</h3>
                </div>
                <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-gray-800">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span>
                    Wedding Films
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span>
                    Brand Videos
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span>
                    Social Media Reels
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span>
                    Music Videos
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 md:p-6 border border-amber-200 shadow-md mt-4 md:mt-6">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">Experience Level</h3>
              <div className="space-y-3 md:space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs md:text-sm text-gray-700">Video Editing</span>
                    <span className="text-xs md:text-sm text-gray-900 font-semibold">Expert</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs md:text-sm text-gray-700">Color Grading</span>
                    <span className="text-xs md:text-sm text-gray-900 font-semibold">Advanced</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs md:text-sm text-gray-700">Motion Graphics</span>
                    <span className="text-xs md:text-sm text-gray-900 font-semibold">Advanced</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="h-full bg-gradient-to-r from-green-400 to-emerald-400 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return <div className="text-gray-600 text-center py-8">Select a note to view</div>
    }
  }

  return (
    <div 
      className="h-full w-full flex items-center justify-center p-2 md:p-4"
      style={{
        background: 'rgba(255, 255, 255, 0)',
        backdropFilter: 'blur(10.9px)',
        WebkitBackdropFilter: 'blur(10.9px)',
      }}
    >
      {/* Notes App Container with larger default size */}
      <div className="w-full max-w-[95vw] h-full max-h-[95vh] flex relative bg-[#f5f5f5] rounded-xl shadow-2xl overflow-hidden">
        {/* Mobile Menu Button - Top Left */}
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="md:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-lg bg-amber-500 text-white shadow-lg flex items-center justify-center hover:bg-amber-600 transition-colors"
        >
          {showSidebar ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Overlay for mobile */}
        {showSidebar && (
          <div
            className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => {
            setShowSidebar(false)
          }}
        />
      )}

      {/* Sidebar - Folders */}
      <div className={`${
        showSidebar ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 fixed md:relative z-40 w-64 md:w-56 h-full border-r border-gray-200 bg-[#fafafa] flex flex-col shadow-lg md:shadow-sm transition-transform duration-300 ease-in-out`}>
        {/* Header */}
        <div className="p-3 md:p-4 border-b border-gray-200 mt-16 md:mt-0">
          <h2 className="text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wider">Folders</h2>
        </div>

        {/* Folders List */}
        <div className="flex-1 overflow-y-auto p-2">
          {folders.map((folder) => {
            const Icon = folder.icon
            return (
              <button
                key={folder.id}
                onClick={() => setSelectedFolder(folder.id)}
                className={`w-full flex items-center gap-2 md:gap-3 px-2 md:px-3 py-2 md:py-2.5 rounded-lg mb-1 transition-all ${
                  selectedFolder === folder.id
                    ? 'bg-amber-100 text-amber-900 border border-amber-200 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" />
                <span className="flex-1 text-left text-xs md:text-sm font-medium truncate">{folder.name}</span>
                <span className="text-xs bg-gray-200 text-gray-600 px-1.5 md:px-2 py-0.5 rounded-full">{folder.count}</span>
              </button>
            )
          })}
        </div>

        {/* Tags Section */}
        <div className="p-3 md:p-4 border-t border-gray-200">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 md:mb-3">Tags</h3>
          <div className="flex flex-wrap gap-1 md:gap-1.5">
            <span className="text-xs px-1.5 md:px-2 py-1 rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300 cursor-pointer transition-colors">
              #portfolio
            </span>
            <span className="text-xs px-1.5 md:px-2 py-1 rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300 cursor-pointer transition-colors">
              #cinematography
            </span>
            <span className="text-xs px-1.5 md:px-2 py-1 rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300 cursor-pointer transition-colors">
              #brand
            </span>
            <span className="text-xs px-1.5 md:px-2 py-1 rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300 cursor-pointer transition-colors">
              #editing
            </span>
            <span className="text-xs px-1.5 md:px-2 py-1 rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300 cursor-pointer transition-colors">
              #videoediting
            </span>
            <span className="text-xs px-1.5 md:px-2 py-1 rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300 cursor-pointer transition-colors">
              #personalbranding
            </span>
          </div>
        </div>
      </div>

      {/* Right - Notes List & Content */}
      <div className="flex-1 bg-gradient-to-br from-amber-50 to-yellow-50 overflow-y-auto">
        {selectedNoteId ? (
          // Show selected note content
          <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8 mt-16 md:mt-0">
            <button
              onClick={() => setSelectedNoteId(null)}
              className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Notes</span>
            </button>
            {renderNoteContent()}
          </div>
        ) : (
          // Show notes list
          <div className="p-4 md:p-6 lg:p-8 mt-16 md:mt-0">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              {folders.find(f => f.id === selectedFolder)?.name || "All Notes"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredNotes.map((note) => (
                <div
                  key={note.id}
                  onClick={() => setSelectedNoteId(note.id)}
                  className="bg-white rounded-xl p-4 border border-amber-200 shadow-md hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 text-base flex-1 pr-2 line-clamp-2 group-hover:text-amber-700 transition-colors">
                      {note.title}
                    </h3>
                    {note.hasImage && <ImageIcon className="w-5 h-5 text-amber-500 flex-shrink-0" />}
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{note.date} {note.time}</p>
                  <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed mb-3">{note.preview}</p>
                  <div className="flex gap-1.5 flex-wrap">
                    {note.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 rounded-md bg-amber-100 text-amber-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {filteredNotes.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No notes found in this folder</p>
              </div>
            )}
          </div>
        )}
      </div>
      </div>
    </div>
  )
}
