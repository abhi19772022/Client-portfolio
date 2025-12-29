"use client"

import { CometCard } from "@/components/ui/comet-card"
import { Mail, Instagram, Youtube, Dribbble, Twitter } from "lucide-react"

interface ContactProps {
  isDarkMode?: boolean
}

export default function Contact({ isDarkMode = true }: ContactProps) {
  return (
    <div className="h-full bg-black flex items-center justify-center overflow-auto p-4">
      <CometCard>
        <div
          className="relative flex w-[700px] cursor-pointer rounded-[24px] bg-black border border-gray-800/50 shadow-2xl overflow-hidden"
          style={{
            transformStyle: "preserve-3d",
            transform: "none",
            opacity: 1,
          }}
        >
          {/* Decorative Shapes */}
          <div className="absolute top-4 left-4 w-6 h-6 rounded-full bg-pink-500 opacity-80 z-10"></div>
          <div className="absolute bottom-[45%] left-8 w-10 h-10 rounded-full bg-pink-600 opacity-70 z-10"></div>
          <div className="absolute bottom-[30%] left-2 w-16 h-16 rounded-tl-full bg-purple-600 opacity-60 z-10"></div>

          {/* Left Side - Image */}
          <div className="w-[45%] relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-black"></div>
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop"
              alt="Himashu"
              className="w-full h-full object-cover relative z-0"
              style={{ filter: "brightness(0.85) contrast(1.1)" }}
            />
          </div>

          {/* Right Side - Content */}
          <div className="w-[55%] p-10 flex flex-col justify-center relative">
            {/* Name & Title */}
            <div className="mb-8">
              <h1 className="text-5xl font-bold mb-3">
                <span className="text-white">Himashu </span>
                <span className="text-white">Sharma</span>
              </h1>
              <p className="text-pink-500 text-lg font-medium leading-tight">
                Your Friendly Neighborhood<br />Video Editor
              </p>
            </div>

            {/* Find me on section */}
            <div className="mb-6">
              <p className="text-gray-400 text-sm mb-4">Find me on</p>
              
              <div className="bg-gray-900/50 rounded-2xl p-5 space-y-3 border border-gray-800/50">
                <a 
                  href="https://dribbble.com/himashu" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white hover:text-pink-500 transition-colors group"
                >
                  <Dribbble className="w-5 h-5 text-pink-500" />
                  <span className="text-base font-medium">/himashusharma</span>
                </a>

                <a 
                  href="https://instagram.com/himashu.edits" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white hover:text-pink-500 transition-colors group"
                >
                  <Instagram className="w-5 h-5 text-pink-500" />
                  <span className="text-base font-medium">@himashu.edits</span>
                </a>

                <a 
                  href="https://twitter.com/himashu" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white hover:text-pink-500 transition-colors group"
                >
                  <Twitter className="w-5 h-5 text-pink-500" />
                  <span className="text-base font-medium">@himashu</span>
                </a>
              </div>
            </div>

            {/* Let's Chat Button */}
            <a
              href="mailto:himashu@videoeditor.com"
              className="inline-block w-full"
            >
              <button className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-pink-500/30">
                Let's Chat
              </button>
            </a>
          </div>
        </div>
      </CometCard>
    </div>
  )
}
