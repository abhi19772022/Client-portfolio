"use client"

import { useState } from "react"
import { ChevronRight, Folder, FileText, Video } from "lucide-react"

type FileItem = {
  id: string
  name: string
  type: "folder" | "file"
  fileType?: "video" | "document" | "figma"
  link?: string
  children?: FileItem[]
}

const fileStructure: FileItem[] = [
  {
    id: "work",
    name: "Work",
    type: "folder",
    children: [
      {
        id: "long-form-videos",
        name: "Long Form Videos",
        type: "folder",
        children: [
          { 
            id: "guesss-india-podcast", 
            name: "Guesss India - Podcast", 
            type: "folder", 
            children: [
              { id: "ep2-guess-india", name: "ep 2 guess india.mp4", type: "file", fileType: "video", link: "https://drive.google.com/file/d/1mrWl3w0HMW2Mm-iPY0c_jPXdS1y1zYuX/view?usp=sharing" },
              { id: "siddhart", name: "siddhart.mp4", type: "file", fileType: "video", link: "https://drive.google.com/file/d/1nvDsBiyjqcMY0Ib2-lqwSsX4kqd3MWdI/view?usp=drive_link" },
              { id: "sohan", name: "sohan.mp4", type: "file", fileType: "video", link: "https://drive.google.com/file/d/1t94Lvki1Ojh5OgLGWEThn_2Zujy1jWzp/view?usp=drive_link" },
              { id: "tubruk-2", name: "Tubruk 2.mp4", type: "file", fileType: "video", link: "https://drive.google.com/file/d/1p8AFkTKkqm-CzCCiNuCohlrYSQCv7K8Z/view?usp=drive_link" },
            ]
          },
          { 
            id: "intel-llmware", 
            name: "Intel x LLmware", 
            type: "folder", 
            children: [
              { id: "llmware-video", name: "llmware.mp4", type: "file", fileType: "video", link: "https://drive.google.com/file/d/1GHaqZVkvkqQQC-qewxW6lRnZVG_4mxkS/view?usp=sharing" },
              { id: "website-display-proof", name: "On website display proof.png", type: "file", fileType: "document", link: "https://drive.google.com/file/d/14h6DmXzStnmck7m6-hiirCg9aVfaNwHy/view?usp=drive_link" },
            ]
          },
          { 
            id: "jatz-naran", 
            name: "Jatz naran - 280k subs", 
            type: "folder", 
            children: [
              { id: "jatz-intro-v2", name: "jatz intro v2.mp4", type: "file", fileType: "video", link: "https://drive.google.com/file/d/1McnnGShx0mj7frSHkVlvZgCKFzpdlnvA/view?usp=drive_link" },
              { id: "jatz", name: "Jatz.mp4", type: "file", fileType: "video", link: "https://drive.google.com/file/d/1dq-QYUD_bOx7lH140kUAJ9kFtdK0EG0R/view?usp=drive_link" },
              { id: "vsl", name: "VSL.mp4", type: "file", fileType: "video", link: "https://drive.google.com/file/d/1dq-QYUD_bOx7lH140kUAJ9kFtdK0EG0R/view?usp=drive_link" },
              { id: "vsl2", name: "vsl2.mp4", type: "file", fileType: "video", link: "https://drive.google.com/file/d/1g24LQAnzUayixzsejRhs3GoASWPg8dmA/view?usp=drive_link" },
            ]
          },
          { 
            id: "parth-vijayvergiya", 
            name: "Parth Vijayvergiya - 186k subs", 
            type: "folder", 
            children: [
              { id: "parth-lf", name: "parth LF.mp4", type: "file", fileType: "video", link: "https://drive.google.com/file/d/1aV5hTdzflxqVP5-rGrWhklv7XNJDxlGm/view?usp=drive_link" },
              { id: "startup2", name: "STARTUP2.mp4", type: "file", fileType: "video", link: "https://drive.google.com/file/d/1yOCn0HnmGPl_6NXwo656x8jLmR4xPmfp/view?usp=drive_link" },
            ]
          },
          { 
            id: "sagniik", 
            name: "sagniik", 
            type: "folder", 
            children: [
              { id: "changed-life", name: "Here's How I Changed My Life [uhZ-BzGgam!].mp4", type: "file", fileType: "video", link: "https://drive.google.com/file/d/1M3PyjJBdAAHfr3tzDlE0xL3I5oKVud8c/view?usp=drive_link" },
              { id: "sagnik-final", name: "sagnik final.mp4", type: "file", fileType: "video", link: "https://drive.google.com/file/d/13jOoDHgZQGrWqRdPuk2fd7ApEsolmb6y/view?usp=drive_link" },
            ]
          },
          { 
            id: "serge-gatari", 
            name: "Serge Gatari - 65k subs", 
            type: "folder", 
            children: [
              { id: "serge-launch", name: "serge launch.mp4", type: "file", fileType: "video", link: "https://drive.google.com/file/d/1CNz2vY7eJ9PiF_d6Jpr-sDtISuayeiWB/view?usp=drive_link" },
            ]
          },
          { 
            id: "stephen-ridley", 
            name: "Stephen Ridley - 525k subs", 
            type: "folder", 
            children: [
              { id: "piano-ad-2", name: "PIANO ad 2 H1 B1.mp4", type: "file", fileType: "video", link: "https://drive.google.com/file/d/19_gFLiJTqhCdIJ4aK9rIMH0uMywDRgSe/view?usp=drive_link" },
              { id: "piano-class", name: "piano class ad.mp4", type: "file", fileType: "video", link: "https://drive.google.com/file/d/1N3_I08k8pJbAXhgGbz9Z_8BCrC2eoD9t/view?usp=drive_link" },
            ]
          },
          { 
            id: "top-sample-edits", 
            name: "TOP Sample Edits", 
            type: "folder", 
            children: [
              { id: "dabba", name: "dabba.mp4", type: "file", fileType: "video", link: "https://drive.google.com/file/d/1QoedxJtkoxrptHPzAE_CaDIIlrN7Aeqm/view?usp=drive_link" },
              { id: "helping-business", name: "helping business v2.mp4", type: "file", fileType: "video", link: "https://drive.google.com/file/d/1qg6SSuApEZnjVsAl-QZrQPrVbi6N2LfI/view?usp=drive_link" },
              { id: "india-1971", name: "india 1971 demo.mp4", type: "file", fileType: "video", link: "https://drive.google.com/file/d/1KNh7kiAkokfLaQyVNJGwrPOAoXunnAMA/view?usp=drive_link" },
              { id: "nfx", name: "Nfx.mp4", type: "file", fileType: "video", link: "https://drive.google.com/file/d/1HWshm9f0niEabt_8jCXTo1PVnBkoFdqm/view?usp=drive_link" },
              { id: "thanking", name: "thanking.mp4", type: "file", fileType: "video", link: "https://drive.google.com/file/d/1JT0-a5E5MNFhMNHpBp90vrcK2q9znHsk/view?usp=drive_link" },
              { id: "typei", name: "TYPEI.mp4", type: "file", fileType: "video", link: "https://drive.google.com/file/d/1NjtFkH7hu4Cb2pqK2o004qBM2XzqBwZN/view?usp=drive_link   " },
            ]
          },
        ]
      },
      {
        id: "short-form-videos",
        name: "Short Form Videos",
        type: "folder",
        children: [
          { 
            id: "guess-india-podcast", 
            name: "Guess india podcast", 
            type: "folder", 
            children: [
              { id: "podcast-edit-1", name: "Podcast edit 1.mp4", type: "file", fileType: "video", link: "https://drive.google.com/file/d/1aPI4vROvxRg3pd7vQnwpCOYwV2WDsIJT/view?usp=drive_link" },
              { id: "podcast-edit-2", name: "Podcast edit 2.mp4", type: "file", fileType: "video", link: "https://drive.google.com/file/d/15bmUwg_sEsh5rtKZd_ddAE7rGYMfosFX/view?usp=drive_link" },
              { id: "podcast-edit-3", name: "Podcast edit 3.mp4", type: "file", fileType: "video", link: "https://drive.google.com/file/d/1dzhF1gK3_NIBb-bWlZBRabVV89ZZ9YAi/view?usp=drive_link" },
            ]
          },
          { 
            id: "jatznaran", 
            name: "Jatznaran - 240k followers", 
            type: "folder", 
            children: [
              { id: "20s", name: "20s.mp4", type: "file", fileType: "video", link: "https://drive.google.com/file/d/1haRdMnzLRjp_K9AsqQQNuWV2Tjy2A_Ky/view?usp=drive_link" },
              { id: "a5-h1", name: "A5 H1.mp4", type: "file", fileType: "video", link: "https://drive.google.com/file/d/1YCNlddPo2Q89oJh-xaX9MZlLX93DwKZW/view?usp=drive_link" },
              { id: "alongside-job", name: "alongside job.mp4", type: "file", fileType: "video", link: "https://drive.google.com/file/d/1mIu8QMJUdj-u1LqF-AkGYuK-qT45LqiF/view?usp=drive_link" },
              { id: "amazonfba-3", name: "amazonfba 3.mp4", type: "file", fileType: "video", link: "https://drive.google.com/file/d/1D3IIU4mbgTJU-SNDv7gO_jiGRGpSWZCZ/view?usp=drive_link" },
              { id: "fba", name: "fba .mp4", type: "file", fileType: "video", link: "https://drive.google.com/file/d/1t36Nba6NLM3i8jY0wUQvfPaIgmbMb5b2/view?usp=drive_link" },
              { id: "jatz-5120-1080-trend", name: "Jatz 5120 1080 trend.mp4", type: "file", fileType: "video", link: "https://drive.google.com/file/d/1fdaPjyqzR7-YoksNfxcTQXkgv0VKrl6S/view?usp=drive_link" },
              { id: "money", name: "money.mp4", type: "file", fileType: "video", link: "https://drive.google.com/file/d/1_8FtDIeG3yl53A5GeEbuCZpg51vkDByh/view?usp=drive_link" },
            ]
          },
          { 
            id: "journey-club", 
            name: "Journey Club", 
            type: "folder", 
            children: [
              { id: "journey-club-best", name: "1 thejourneyclub - One of Best.mp4", type: "file", fileType: "video", link: "https://drive.google.com/file/d/1eae1q0tL5-OinoPEKDng525oE0J-_eiw/view?usp=drive_link" },
              { id: "jc-ep1", name: "Ep 1.mp4", type: "file", fileType: "video", link: "https://drive.google.com/file/d/1sOjwrwtcdJWGZhOI2UWZTSoCeRauE7vY/view?usp=drive_link" },
              { id: "jc-ep2", name: "Ep 2.mp4", type: "file", fileType: "video", link: "https://drive.google.com/file/d/1uF1HB0iFOxL11ES8wrGki2KfRX_1S1sU/view?usp=drive_link" },
              { id: "jc-ep3", name: "Ep 3.mp4", type: "file", fileType: "video", link: "https://drive.google.com/file/d/1ztNZuURIVYa6RLDz-9N--B2xH2TFCGJr/view?usp=drive_link" },
              { id: "jc-ep4", name: "Ep 4.mp4", type: "file", fileType: "video", link: "https://drive.google.com/file/d/1we5PLgX1CBpgG43m0v8Eq5ek_yMn17nN/view?usp=drive_link" },
              { id: "jc-ep5", name: "Ep 5.mp4", type: "file", fileType: "video", link: "https://drive.google.com/file/d/17113DUam09gDSN4FC18X3S2NOTxn91W9/view?usp=drive_link" },
              { id: "jc-ep6", name: "Ep 6.mp4", type: "file", fileType: "video", link: "https://drive.google.com/file/d/1DXupMS7Uz7Bwjpp1vWc8PoNugQSkksmL/view?usp=drive_link" },
              { id: "jc-ep7", name: "Ep 7.mp4", type: "file", fileType: "video", link: "https://drive.google.com/file/d/1bLyQn7kn2G7NKOJa_6xcTtuZgkTRkZXo/view?usp=drive_link" },
            ]
          },
          { 
            id: "parthvijayvergiya", 
            name: "parthvijayvergiya - 216k followers", 
            type: "folder", 
            children: [
              { id: "parthvijayvergiya-sf", name: "parthvijayvergiya.mp4", type: "file", fileType: "video", link: "https://drive.google.com/file/d/1pTeD_t_VBJuQfTuEKN41RKOi75onMYfS/view?usp=drive_link" },
            ]
          },
          { 
            id: "sagniik-short", 
            name: "sagniik", 
            type: "folder", 
            children: [
              { id: "sagniik-sf", name: "sagniik.mp4", type: "file", fileType: "video", link: "https://drive.google.com/file/d/1r9pLranqUYWn0ubr3ZDrivQq1opy3fbb/view?usp=drive_link" },
            ]
          },
         
          { 
            id: "vishwamitra", 
            name: "Vishwamitra", 
            type: "folder", 
            children: [
              { id: "check-out-views", name: "Check out Views these vids got", type: "folder", children: [] },
              { id: "vishi-ep2", name: "Ep 2.mp4", type: "file", fileType: "video", link: "https://drive.google.com/file/d/1S5hmSPxQlxzENtaHgyPzVx4lzrgktjrI/view?usp=drive_link" },
              { id: "vishi-ep4", name: "Ep 4.mp4", type: "file", fileType: "video", link: "https://drive.google.com/file/d/1cU6x-C-sNoIXpSJbUsqmeRsRn9o6J1Ha/view?usp=drive_link" },
              { id: "vishi-ep5", name: "Ep 5.mp4", type: "file", fileType: "video", link: "https://drive.google.com/file/d/1NxPqMsX4rps9R0jfAlj_y3PIXJPMV5Z1/view?usp=drive_link" },
              { id: "vishi-ep6", name: "Ep 6.mp4", type: "file", fileType: "video", link: "https://drive.google.com/file/d/1NBnOtfoF0mGZ6lImi4oZYD9TyyEI0hAj/view?usp=drive_link" },
              { id: "vishi-ep8", name: "Ep 8.mp4", type: "file", fileType: "video", link: "https://drive.google.com/file/d/1QfnypF7DlPE5phpSWKxFGP0s6Q7HfA6E/view?usp=drive_link" },
              { id: "puch-limits", name: "puch limits v4.mp4", type: "file", fileType: "video", link: "https://drive.google.com/file/d/1igNwh6qiREdKEP5xd1c_5vOIns3ersAd/view?usp=drive_link" },
              { id: "vishi", name: "Vishi.mp4", type: "file", fileType: "video", link: "https://drive.google.com/file/d/1TgCZlSkvyLtNEk9nQNVphZ46YQxIsQgL/view?usp=drive_link" },
            ]
          },
        ] 
      },
    ]
  },
  {
    id: "about-me",
    name: "About Me",
    type: "folder",
    children: [
      { id: "intro", name: "Introduction.mov", type: "file", fileType: "video", link: "https://drive.google.com/file/d/1l_48bv_SR3xEBQ5dRhKY_dbw62DSBFfV/view?usp=drive_link" },

    ]
  },
  {
    id: "resume",
    name: "Resume",
    type: "folder",
    children: [
      { id: "cv", name: "Himanshu_Resume.pdf", type: "file", fileType: "document", link: "https://drive.google.com/your-link-13" },
      { id: "cover", name: "Cover Letter.pdf", type: "file", fileType: "document", link: "https://drive.google.com/your-link-14" },
    ]
  },
  {
    id: "trash",
    name: "Trash",
    type: "folder",
    children: []
  },
]

export default function Files() {
  const [selectedFolder, setSelectedFolder] = useState<string>("work")
  const [openFolders, setOpenFolders] = useState<string[]>(["work"])
  const [breadcrumb, setBreadcrumb] = useState<string[]>(["work"])
  const [currentItems, setCurrentItems] = useState<FileItem[]>(fileStructure[0].children || [])

  // Helper function to find an item by ID in the entire structure
  const findItemById = (items: FileItem[], id: string): FileItem | null => {
    for (const item of items) {
      if (item.id === id) return item
      if (item.children) {
        const found = findItemById(item.children, id)
        if (found) return found
      }
    }
    return null
  }

  const toggleFolder = (folderId: string) => {
    setOpenFolders(prev => 
      prev.includes(folderId) 
        ? prev.filter(id => id !== folderId)
        : [...prev, folderId]
    )
  }

  const handleSidebarClick = (folder: FileItem) => {
    setSelectedFolder(folder.id)
    setBreadcrumb([folder.id])
    setCurrentItems(folder.children || [])
    if (folder.children && folder.children.length > 0) {
      setOpenFolders([folder.id])
    }
  }

  const handleItemClick = (item: FileItem) => {
    if (item.type === "folder") {
      setBreadcrumb([...breadcrumb, item.id])
      setCurrentItems(item.children || [])
    } else if (item.link) {
      window.open(item.link, "_blank")
    }
  }

  const getFileIcon = (item: FileItem) => {
    if (item.type === "folder") {
      return (
        <div className="w-20 h-20 flex items-center justify-center relative">
          <img 
            src="/files.png" 
            alt="Folder" 
            className="w-16 h-16 object-contain"
          />
        </div>
      )
    }

    switch (item.fileType) {
      case "video":
        return (
          <div className="w-20 h-20 flex items-center justify-center relative">
            <svg viewBox="0 0 64 64" className="w-16 h-16">
              <defs>
                <linearGradient id="videoGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: "#5DADE2", stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: "#2E86AB", stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              {/* Rounded document background */}
              <rect x="12" y="8" width="40" height="48" rx="3" ry="3" fill="url(#videoGradient)" stroke="#2471A3" strokeWidth="1"/>
              {/* QuickTime logo circle */}
              <circle cx="32" cy="28" r="8" fill="white" opacity="0.9"/>
              {/* Play triangle */}
              <path d="M 29 24 L 29 32 L 36 28 Z" fill="#2E86AB"/>
              {/* Bottom label bar */}
              <rect x="12" y="44" width="40" height="12" rx="0" ry="0" fill="#1F618D" opacity="0.7"/>
            </svg>
          </div>
        )
      case "document":
        return (
          <div className="w-20 h-20 flex items-center justify-center relative">
            <svg viewBox="0 0 64 64" className="w-16 h-16">
              {/* White document with folded corner */}
              <path d="M 16 8 L 16 56 L 48 56 L 48 20 L 36 8 Z" fill="white" stroke="#D0D0D0" strokeWidth="1"/>
              {/* Folded corner */}
              <path d="M 36 8 L 36 20 L 48 20 Z" fill="#E8E8E8" stroke="#D0D0D0" strokeWidth="1"/>
              {/* Text lines */}
              <rect x="20" y="26" width="24" height="2" fill="#666" rx="1"/>
              <rect x="20" y="32" width="24" height="2" fill="#666" rx="1"/>
              <rect x="20" y="38" width="18" height="2" fill="#666" rx="1"/>
            </svg>
          </div>
        )
      case "figma":
        return (
          <div className="w-20 h-20 flex items-center justify-center relative">
            <svg viewBox="0 0 64 64" className="w-16 h-16">
              {/* White document base */}
              <path d="M 16 8 L 16 56 L 48 56 L 48 20 L 36 8 Z" fill="white" stroke="#D0D0D0" strokeWidth="1"/>
              <path d="M 36 8 L 36 20 L 48 20 Z" fill="#E8E8E8" stroke="#D0D0D0" strokeWidth="1"/>
              {/* Figma colored circles (simplified logo) */}
              <circle cx="26" cy="30" r="3" fill="#F24E1E"/>
              <circle cx="26" cy="38" r="3" fill="#A259FF"/>
              <circle cx="34" cy="30" r="3" fill="#1ABCFE"/>
              <circle cx="34" cy="38" r="3" fill="#0ACF83"/>
              <circle cx="30" cy="34" r="3" fill="#FF7262"/>
            </svg>
          </div>
        )
      default:
        return (
          <div className="w-20 h-20 flex items-center justify-center">
            <FileText className="w-14 h-14 text-gray-400" />
          </div>
        )
    }
  }

  const renderSidebarItem = (item: FileItem, level: number = 0) => {
    const isOpen = openFolders.includes(item.id)
    const isSelected = selectedFolder === item.id

    return (
      <div key={item.id}>
        <div
          className={`flex items-center px-3 py-1.5 cursor-pointer rounded-md transition-colors ${
            isSelected 
              ? "bg-blue-500 text-white" 
              : "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}
          style={{ paddingLeft: `${level * 12 + 12}px` }}
          onClick={() => {
            if (item.type === "folder") {
              handleSidebarClick(item)
              toggleFolder(item.id)
            }
          }}
        >
          {item.children && item.children.length > 0 && (
            <ChevronRight 
              className={`w-4 h-4 mr-1 transition-transform ${isOpen ? "rotate-90" : ""}`}
            />
          )}
          {!item.children || item.children.length === 0 && <span className="w-4 mr-1"></span>}
          <span className="text-sm font-medium truncate">{item.name}</span>
        </div>
        {isOpen && item.children && (
          <div>
            {item.children.map(child => renderSidebarItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="h-full w-full flex bg-white dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-52 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex flex-col">
        {/* Sidebar Header */}
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Favorites
          </h2>
        </div>

        {/* Sidebar Items */}
        <div className="flex-1 overflow-y-auto py-2">
          {fileStructure.map(item => renderSidebarItem(item))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="h-12 border-b border-gray-200 dark:border-gray-700 flex items-center px-4 bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            {breadcrumb.map((crumb, index) => (
              <div key={crumb} className="flex items-center">
                {index > 0 && <ChevronRight className="w-4 h-4 mx-1" />}
                <span className="capitalize">{crumb.replace(/-/g, " ")}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Files Grid - Scattered Layout */}
        <div className="flex-1 overflow-y-auto p-6 relative">
          <div className="relative min-h-[600px]">
            {currentItems.map((item, index) => {
              // Create scattered positions for items
              const positions = [
                { top: '10%', left: '8%' },
                { top: '15%', left: '35%' },
                { top: '8%', left: '62%' },
                { top: '35%', left: '12%' },
                { top: '32%', left: '45%' },
                { top: '38%', left: '75%' },
                { top: '58%', left: '6%' },
                { top: '62%', left: '38%' },
                { top: '55%', left: '68%' },
                { top: '78%', left: '15%' },
                { top: '82%', left: '48%' },
                { top: '75%', left: '80%' },
              ]
              const position = positions[index % positions.length]
              
              return (
                <div
                  key={item.id}
                  className="absolute flex flex-col items-center cursor-pointer group"
                  style={{ top: position.top, left: position.left }}
                  onClick={() => handleItemClick(item)}
                >
                  <div className="transform transition-all duration-200 group-hover:scale-110">
                    {getFileIcon(item)}
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-sm text-gray-800 dark:text-gray-200 truncate max-w-[120px] px-2 py-1 rounded group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30">
                      {item.name}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {currentItems.length === 0 && (
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-400 dark:text-gray-500">This folder is empty</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
