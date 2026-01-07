"use client"

import { Phone, Mail, MessageCircle, Instagram } from "lucide-react"

interface ContactProps {
  isDarkMode?: boolean
  onAppClick?: (app: any) => void
}

export default function Contact({ isDarkMode = true, onAppClick }: ContactProps) {
  const handleMessageClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (onAppClick) {
      onAppClick({ id: "imessage", title: "Messages", icon: "/imess.png", component: "IMessage" })
    }
  }

  return (
    <div 
      className="h-full w-full relative overflow-hidden"
      style={{
        background: 'rgba(255, 255, 255, 0)',
        backdropFilter: 'blur(10.9px)',
        WebkitBackdropFilter: 'blur(10.9px)',
      }}
    >
      {/* Background Image with Blur - Positioned at top */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1000&h=1400&fit=crop&q=80"
          alt="Contact Background"
          className="w-full h-full object-cover object-top scale-110"
        />
        <div className="absolute inset-0 backdrop-blur-[60px] bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-purple-900/20"></div>
      </div>

      {/* iPhone Style Contact Card */}
      <div className="relative z-10 w-full h-full flex items-start justify-center overflow-y-auto py-6 px-4">
        {/* Contact Card Content */}
        <div className="flex flex-col items-center w-full max-w-md animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
          {/* Profile Image with Glow */}
          <div className="mb-6 relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/50 to-purple-500/50 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500 scale-110"></div>
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl ring-4 ring-white/10 group-hover:scale-105 transition-transform duration-300">
              <img
                src="/himmi.png"
                alt="Himashu"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Name with Gradient */}
          <div className="text-center mb-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent tracking-tight mb-1">
              Himashu
            </h1>
            <p className="text-gray-300 text-sm font-medium">Video Editor & Creative</p>
          </div>

          {/* Action Buttons with Beautiful Design */}
          <div className="flex items-center justify-center gap-4 my-6">
            {/* Message */}
            <button
              onClick={handleMessageClick}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#E5C085] to-[#D4A574] rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#E5C085] to-[#D4A574] flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 group-active:scale-95 border border-white/20">
                  <MessageCircle className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <span className="text-xs font-medium text-gray-300">message</span>
            </button>

            {/* Call */}
            <a
              href="tel:+917015246439"
              className="flex flex-col items-center gap-2 group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#E5C085] to-[#D4A574] rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#E5C085] to-[#D4A574] flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 group-active:scale-95 border border-white/20">
                  <Phone className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <span className="text-xs font-medium text-gray-300">call</span>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/himashu.edits"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#E5C085] to-[#D4A574] rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#E5C085] to-[#D4A574] flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 group-active:scale-95 border border-white/20">
                  <Instagram className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <span className="text-xs font-medium text-gray-300">instagram</span>
            </a>

            {/* Mail */}
            <a
              href="mailto:himashu@videoeditor.com"
              className="flex flex-col items-center gap-2 group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#E5C085] to-[#D4A574] rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#E5C085] to-[#D4A574] flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 group-active:scale-95 border border-white/20">
                  <Mail className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <span className="text-xs font-medium text-gray-300">mail</span>
            </a>
          </div>

          {/* Contact Info Cards with Better Design */}
          <div className="w-full space-y-2.5 px-2 pb-4">
            {/* Contact Photo & Poster */}
            <div className="bg-gradient-to-br from-white/25 to-white/10 backdrop-blur-2xl rounded-xl p-3 flex items-center justify-between shadow-xl border border-white/20 hover:bg-white/30 transition-all duration-300 group cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden shadow-lg ring-2 ring-white/20">
                  <img
                    src="/himmi.png"
                    alt="Contact"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">Contact Photo & Poster</p>
                  <p className="text-xs text-white/70">Shared by Himashu</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>

            {/* Available for Work */}
            <div className="bg-gradient-to-br from-white/25 to-white/10 backdrop-blur-2xl rounded-xl p-4 shadow-xl border border-white/20 hover:bg-white/30 transition-all duration-300">
              <p className="text-xs text-white/70 mb-1 font-medium">status</p>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50"></div>
                <p className="text-lg font-bold text-white">Available for Work</p>
              </div>
            </div>

            {/* Email */}
            <div className="bg-gradient-to-br from-white/25 to-white/10 backdrop-blur-2xl rounded-xl p-4 shadow-xl border border-white/20 hover:bg-white/30 transition-all duration-300 cursor-pointer">
              <p className="text-xs text-white/70 mb-1 font-medium">email</p>
              <a 
                href="mailto:himashu@videoeditor.com"
                className="text-base font-bold text-white hover:text-blue-200 transition-colors break-all"
              >
                himashu@videoeditor.com
              </a>
            </div>

            {/* Instagram */}
            <div className="bg-gradient-to-br from-white/25 to-white/10 backdrop-blur-2xl rounded-xl p-4 shadow-xl border border-white/20 hover:bg-white/30 transition-all duration-300 cursor-pointer mb-4">
              <p className="text-xs text-white/70 mb-1 font-medium">Instagram</p>
              <a 
                href="https://instagram.com/himashu.edits" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-bold text-white hover:text-pink-200 transition-colors flex items-center gap-2"
              >
                @himashu.edits
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
