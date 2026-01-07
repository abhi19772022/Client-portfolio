"use client"

import { Phone, Mail, MessageCircle, Instagram } from "lucide-react"

interface ContactProps {
  isDarkMode?: boolean
}

export default function Contact({ isDarkMode = true }: ContactProps) {
  return (
    <div className="h-full w-full relative bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
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
      <div className="relative z-10 w-full h-full flex items-start justify-center overflow-y-auto py-8 px-6">
        {/* Contact Card Content */}
        <div className="flex flex-col items-center w-full max-w-lg animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
          {/* Profile Image with Glow */}
          <div className="mb-8 relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/50 to-purple-500/50 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500 scale-110"></div>
            <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl ring-4 ring-white/10 group-hover:scale-105 transition-transform duration-300">
              <img
                src="/himmi.png"
                alt="Himashu"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Name with Gradient */}
          <div className="text-center mb-3">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent tracking-tight mb-1">
              Himashu
            </h1>
            <p className="text-gray-300 text-sm font-medium">Video Editor & Creative</p>
          </div>

          {/* Action Buttons with Beautiful Design */}
          <div className="flex items-center justify-center gap-5 my-10">
            {/* Message */}
            <a
              href="sms:+917015246439"
              className="flex flex-col items-center gap-3 group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#E5C085] to-[#D4A574] rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative w-[72px] h-[72px] rounded-full bg-gradient-to-br from-[#E5C085] to-[#D4A574] flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 group-active:scale-95 border border-white/20">
                  <MessageCircle className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <span className="text-xs font-medium text-gray-300">message</span>
            </a>

            {/* Call */}
            <a
              href="tel:+917015246439"
              className="flex flex-col items-center gap-3 group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#E5C085] to-[#D4A574] rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative w-[72px] h-[72px] rounded-full bg-gradient-to-br from-[#E5C085] to-[#D4A574] flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 group-active:scale-95 border border-white/20">
                  <Phone className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <span className="text-xs font-medium text-gray-300">call</span>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/himashu.edits"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#E5C085] to-[#D4A574] rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative w-[72px] h-[72px] rounded-full bg-gradient-to-br from-[#E5C085] to-[#D4A574] flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 group-active:scale-95 border border-white/20">
                  <Instagram className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <span className="text-xs font-medium text-gray-300">instagram</span>
            </a>

            {/* Mail */}
            <a
              href="mailto:himashu@videoeditor.com"
              className="flex flex-col items-center gap-3 group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#E5C085] to-[#D4A574] rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative w-[72px] h-[72px] rounded-full bg-gradient-to-br from-[#E5C085] to-[#D4A574] flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 group-active:scale-95 border border-white/20">
                  <Mail className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <span className="text-xs font-medium text-gray-300">mail</span>
            </a>
          </div>

          {/* Contact Info Cards with Better Design */}
          <div className="w-full space-y-3 px-2 pb-4">
            {/* Contact Photo & Poster */}
            <div className="bg-gradient-to-br from-white/25 to-white/10 backdrop-blur-2xl rounded-2xl p-4 flex items-center justify-between shadow-xl border border-white/20 hover:bg-white/30 transition-all duration-300 group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl overflow-hidden shadow-lg ring-2 ring-white/20">
                  <img
                    src="/himmi.png"
                    alt="Contact"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-white text-base">Contact Photo & Poster</p>
                  <p className="text-sm text-white/70">Shared by Himashu</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>

            {/* Mobile Number */}
            <div className="bg-gradient-to-br from-white/25 to-white/10 backdrop-blur-2xl rounded-2xl p-5 shadow-xl border border-white/20 hover:bg-white/30 transition-all duration-300 cursor-pointer">
              <p className="text-sm text-white/70 mb-1.5 font-medium">mobile</p>
              <a href="tel:+917015246439" className="text-xl font-bold text-white hover:text-blue-200 transition-colors">
                +91 70152 46439
              </a>
            </div>

            {/* WhatsApp */}
            <div className="bg-gradient-to-br from-white/25 to-white/10 backdrop-blur-2xl rounded-2xl p-5 shadow-xl border border-white/20 hover:bg-white/30 transition-all duration-300 cursor-pointer">
              <p className="text-sm text-white/70 mb-1.5 font-medium">WhatsApp</p>
              <a 
                href="https://wa.me/917015246439" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-bold text-white hover:text-green-200 transition-colors flex items-center gap-2"
              >
                Himashu
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>

            {/* Email */}
            <div className="bg-gradient-to-br from-white/25 to-white/10 backdrop-blur-2xl rounded-2xl p-5 shadow-xl border border-white/20 hover:bg-white/30 transition-all duration-300 cursor-pointer">
              <p className="text-sm text-white/70 mb-1.5 font-medium">email</p>
              <a 
                href="mailto:himashu@videoeditor.com"
                className="text-lg font-bold text-white hover:text-blue-200 transition-colors break-all"
              >
                himashu@videoeditor.com
              </a>
            </div>

            {/* Instagram */}
            <div className="bg-gradient-to-br from-white/25 to-white/10 backdrop-blur-2xl rounded-2xl p-5 shadow-xl border border-white/20 hover:bg-white/30 transition-all duration-300 cursor-pointer mb-4">
              <p className="text-sm text-white/70 mb-1.5 font-medium">Instagram</p>
              <a 
                href="https://instagram.com/himashu.edits" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-bold text-white hover:text-pink-200 transition-colors flex items-center gap-2"
              >
                @himashu.edits
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
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
