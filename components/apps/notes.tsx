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
  ChevronLeft
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
      preview: "Professional Video Editor with 5+ years of experience specializing in wedding films, brand commercials...",
      content: "full",
      date: "Jan 7, 2026",
      time: "10:30 AM",
      tags: ["#portfolio", "#about"],
      hasImage: true,
    },
    {
      id: 2,
      folder: "projects",
      title: "Wedding Film - Sarah & Michael",
      preview: "Cinematic wedding highlight reel featuring drone shots, emotional vows, and reception celebrations...",
      content: "project1",
      date: "Jan 6, 2026",
      time: "3:45 PM",
      tags: ["#wedding", "#inprogress"],
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
      tags: ["#brand", "#commercial"],
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
      tags: ["#skills", "#software"],
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
      tags: ["#musicvideo", "#completed"],
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
                Specialized in wedding films, brand commercials, and social media content that connects with audiences.
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
                <li className="flex items-center gap-2">
                  <span>❤️</span> Wedding Films & Cinematic Highlights
                </li>
                <li className="flex items-center gap-2">
                  <span>🎬</span> Brand Commercials & Product Videos
                </li>
                <li className="flex items-center gap-2">
                  <span>📱</span> Social Media Reels & Shorts
                </li>
                <li className="flex items-center gap-2">
                  <span>🎵</span> Music Videos & Creative Content
                </li>
              </ul>

              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-4 md:p-6 mt-4 md:mt-6 border border-amber-200 shadow-md">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 md:w-5 md:h-5 text-amber-600" />
                  Why Choose Me
                </h3>
                <ul className="space-y-2 text-gray-700 text-xs md:text-sm">
                  <li>✓ Quick turnaround without compromising quality</li>
                  <li>✓ Unlimited revisions until you're 100% satisfied</li>
                  <li>✓ Professional color grading and sound design</li>
                  <li>✓ Multiple format delivery (YouTube, Instagram, etc.)</li>
                </ul>
              </div>
            </div>
          </div>
        )

      case "project1":
        return (
          <div className="space-y-4 md:space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Wedding Film</h1>
              <span className="px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-yellow-100 text-yellow-800 text-xs md:text-sm border border-yellow-300 shadow-sm">
                In Progress
              </span>
            </div>

            <div className="bg-white rounded-xl p-1 border border-amber-200 overflow-hidden shadow-md">
              <div className="aspect-video bg-gradient-to-br from-pink-100 to-rose-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Video className="w-12 h-12 md:w-16 md:h-16 text-pink-500 mx-auto mb-2 md:mb-3" />
                  <p className="text-xs md:text-sm text-gray-600">Wedding Highlight Reel Preview</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 md:space-y-4">
              <div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 md:mb-3">Project Details</h3>
                <div className="grid grid-cols-2 gap-2 md:gap-3">
                  <div className="bg-white rounded-lg p-2 md:p-3 border border-amber-200 shadow-sm">
                    <div className="text-xs md:text-sm text-gray-500">Client</div>
                    <div className="text-sm md:text-base text-gray-900 font-medium">Sarah & Michael</div>
                  </div>
                  <div className="bg-white rounded-lg p-2 md:p-3 border border-amber-200 shadow-sm">
                    <div className="text-xs md:text-sm text-gray-500">Duration</div>
                    <div className="text-sm md:text-base text-gray-900 font-medium">8-10 minutes</div>
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
    <div className="h-full w-full flex relative bg-[#f5f5f5]">
      {/* Mobile Menu Button - Top Left */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="md:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-lg bg-amber-500 text-white shadow-lg flex items-center justify-center hover:bg-amber-600 transition-colors"
      >
        {showSidebar ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Notes List Toggle - Top Right */}
      <button
        onClick={() => setShowNotesList(!showNotesList)}
        className="md:hidden fixed top-4 right-4 z-50 w-10 h-10 rounded-lg bg-amber-500 text-white shadow-lg flex items-center justify-center hover:bg-amber-600 transition-colors"
      >
        {showNotesList ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
      </button>

      {/* Overlay for mobile */}
      {(showSidebar || showNotesList) && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => {
            setShowSidebar(false)
            setShowNotesList(false)
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
              #wedding
            </span>
            <span className="text-xs px-1.5 md:px-2 py-1 rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300 cursor-pointer transition-colors">
              #brand
            </span>
            <span className="text-xs px-1.5 md:px-2 py-1 rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300 cursor-pointer transition-colors">
              #completed
            </span>
          </div>
        </div>
      </div>

      {/* Middle - Notes List */}
      <div className={`${
        showNotesList ? 'translate-x-0' : 'translate-x-full'
      } md:translate-x-0 fixed md:relative right-0 z-40 w-80 md:w-80 h-full border-r border-gray-200 bg-white flex flex-col shadow-lg md:shadow-sm transition-transform duration-300 ease-in-out`}>
        {/* Search Bar */}
        <div className="p-3 md:p-4 border-b border-gray-200 mt-16 md:mt-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 md:pl-10 pr-3 md:pr-4 py-1.5 md:py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 text-xs md:text-sm transition-all"
            />
          </div>
        </div>

        {/* Notes List */}
        <div className="flex-1 overflow-y-auto">
          {filteredNotes.map((note) => (
            <button
              key={note.id}
              onClick={() => setSelectedNoteId(note.id)}
              className={`w-full p-3 md:p-4 border-b border-gray-100 text-left transition-all hover:bg-amber-50/50 ${
                selectedNoteId === note.id ? 'bg-amber-50 border-l-4 border-l-amber-400' : ''
              }`}
              onClick={() => {
                setSelectedNoteId(note.id)
                setShowNotesList(false)
              }}
            >
              <div className="flex items-start justify-between mb-1.5 md:mb-2">
                <h3 className="font-semibold text-gray-900 text-xs md:text-sm flex-1 pr-2 line-clamp-1">{note.title}</h3>
                {note.hasImage && <ImageIcon className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-500 flex-shrink-0" />}
              </div>
              <p className="text-xs text-gray-500 mb-1 md:mb-2">{note.date} {note.time}</p>
              <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">{note.preview}</p>
              <div className="flex gap-1 md:gap-1.5 mt-1.5 md:mt-2">
                {note.tags.map((tag) => (
                  <span key={tag} className="text-xs px-1.5 md:px-2 py-0.5 rounded-md bg-amber-100 text-amber-700">
                    {tag}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right - Note Content */}
      <div className="flex-1 bg-gradient-to-br from-amber-50 to-yellow-50 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8 mt-16 md:mt-0">
          {renderNoteContent()}
        </div>
      </div>
    </div>
  )
}
