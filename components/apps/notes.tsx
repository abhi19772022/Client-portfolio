"use client"

import type React from "react"

import { useState } from "react"

interface NotesProps {
  isDarkMode?: boolean
}

export default function Notes({ isDarkMode = true }: NotesProps) {
  // Update the notes state with enhanced content
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "About Me",
      content: `# Himashu
Professional Video Editor & Creative Storyteller

## Skills
### Video Editing
- Adobe Premiere Pro
- DaVinci Resolve
- Final Cut Pro
- Color Grading & Correction
- Audio Mixing & Sweetening
- Multi-cam Editing
- Cinematic Storytelling

### Motion Graphics & VFX
- Adobe After Effects
- Motion Design & Animation
- Logo Animations
- Lower Thirds & Titles
- Visual Effects (VFX)
- 2D & 3D Motion Graphics

### Creative Suite
- Adobe Photoshop
- Adobe Illustrator
- Adobe Audition
- Figma (for storyboarding)
- Blender (basic 3D)

### Specializations
- Social Media Reels (IG, TikTok, YT Shorts)
- Commercial & Brand Videos
- Wedding Films & Highlights
- Corporate Videos
- Music Videos
- Documentary Editing

## Experience
Professional video editor with 5+ years of experience crafting compelling visual stories. Specialized in commercial edits, wedding cinematography, social media content, and motion graphics. Successfully completed 147 projects with 423 total renders.

## Services
- Basic Reel Edit - Quick social media content
- Cinematic Edit - Story-driven with advanced grading
- Commercial Edit - Brand-focused advertising content
- Motion Graphics - Animated logos and titles
- Wedding Edit - Emotional storytelling for couples

## Contact
Email: himashu@videoeditor.com
Instagram: @himashu.edits
YouTube: youtube.com/@himashu
Portfolio: himashu.com`,
      date: "Today, 10:30 AM",
    },
    {
      id: 2,
      title: "Current Projects",
      content: `# Active Projects

## Wedding Highlight Reel
**Status:** Rendering (67% complete)
**Client:** Sarah & Michael
**Duration:** 8-10 minutes
**Deliverables:** 
- Main highlight reel
- 60s social media version
- Raw ceremony footage backup

**Notes:**
- Golden hour shots are stunning
- Client loves the emotional music choice
- Need to add final color grade
- Estimated completion: Tomorrow

## Brand Commercial
**Status:** In Progress (45% complete)
**Client:** TechStart Inc.
**Duration:** 30 seconds
**Deliverables:**
- 16:9 for YouTube
- 9:16 for Instagram Stories
- 1:1 for Instagram Feed

**Notes:**
- Modern, fast-paced editing style
- Corporate blue color palette
- Add motion graphics logo intro
- Voice-over recording scheduled for tomorrow

## Social Media Reel
**Status:** Review (100% complete)
**Client:** Fashion Brand X
**Duration:** 15 seconds
**Deliverables:**
- Vertical format optimized
- Trending audio sync

**Notes:**
- Client requested minor color adjustments
- Awaiting final approval
- Quick turnaround project - completed in 2 days`,
      date: "Yesterday, 3:15 PM",
    },
    {
      id: 3,
      title: "Learning & Goals",
      content: `# Professional Development

## Current Learning
- Advanced color grading techniques in DaVinci Resolve
- 3D motion graphics with Cinema 4D
- AI-powered editing workflows
- Sound design fundamentals
- Cinematic camera movements and transitions

## 2025 Goals
- Reach 200 completed projects
- Launch YouTube channel for editing tutorials
- Master Unreal Engine for virtual production
- Collaborate with international brands
- Build a team of fellow creatives

## Skills to Develop
- Advanced VFX compositing
- 360° video editing
- Virtual reality content creation
- Live streaming production
- Documentary filmmaking techniques

## Equipment Wishlist
- New M3 MacBook Pro for faster rendering
- Color calibrated monitor
- Professional audio interface
- Gimbal stabilizer for b-roll
- Studio lighting kit

## Community Goals
- Share editing knowledge through tutorials
- Mentor aspiring video editors
- Contribute to open-source editing projects
- Network with other creatives in the industry`,
      date: "Dec 1, 9:00 AM",
    },
  ])

  const [selectedNoteId, setSelectedNoteId] = useState(1)
  const [editableContent, setEditableContent] = useState("")

  const selectedNote = notes.find((note) => note.id === selectedNoteId)

  const handleNoteSelect = (id: number) => {
    setSelectedNoteId(id)
    const note = notes.find((n) => n.id === id)
    if (note) {
      setEditableContent(note.content)
    }
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditableContent(e.target.value)

    // Update the note content
    setNotes(
      notes.map((note) => {
        if (note.id === selectedNoteId) {
          return { ...note, content: e.target.value }
        }
        return note
      }),
    )
  }

  const textColor = isDarkMode ? "text-white" : "text-gray-800"
  const bgColor = isDarkMode ? "bg-gray-900" : "bg-white"
  const sidebarBg = isDarkMode ? "bg-gray-800" : "bg-gray-100"
  const borderColor = isDarkMode ? "border-gray-700" : "border-gray-200"
  const hoverBg = isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
  const selectedBg = isDarkMode ? "bg-gray-700" : "bg-gray-300"

  return (
    <div className={`flex h-full ${bgColor} ${textColor}`}>
      {/* Sidebar */}
      <div className={`w-64 ${sidebarBg} border-r ${borderColor} flex flex-col`}>
        <div className="p-3 border-b border-gray-700 flex justify-between items-center">
          <h2 className="font-medium">Notes</h2>
          <button className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="overflow-y-auto flex-1">
          {notes.map((note) => (
            <div
              key={note.id}
              className={`p-3 cursor-pointer ${selectedNoteId === note.id ? selectedBg : hoverBg}`}
              onClick={() => handleNoteSelect(note.id)}
            >
              <h3 className="font-medium truncate">{note.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{note.date}</p>
              <p className={`text-sm mt-1 truncate ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                {note.content.split("\n")[0].replace(/^#+ /, "")}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Note content */}
      <div className="flex-1 flex flex-col">
        {selectedNote && (
          <>
            <div className={`p-3 border-b ${borderColor}`}>
              <h2 className="font-medium">{selectedNote.title}</h2>
              <p className="text-xs text-gray-500">{selectedNote.date}</p>
            </div>
            <div className="flex-1 p-4 overflow-auto">
              <textarea
                className={`w-full h-full resize-none ${bgColor} ${textColor} focus:outline-none`}
                value={selectedNote.content}
                onChange={handleContentChange}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
