"use client";

import { useEffect, useRef, useState } from "react";

type Reel = {
  id: number;
  src: string;
  title: string;
  software: string;
  isLandscape?: boolean;
};

const reels: Reel[] = [
  {
    id: 1,
    src: "https://res.cloudinary.com/dbya8iwlw/video/upload/v1766087342/Luck_factor_kgrcoo.mp4",
    title: "Cinematic Short Film",
    software: "Adobe Premiere Pro & After Effects",
    isLandscape: false,
  },
  {
    id: 2,
    src: "https://res.cloudinary.com/dbya8iwlw/video/upload/v1766087328/austin_reel_revised_2_k9e9be.mp4",
    title: "Product Commercial",
    software: "DaVinci Resolve & Blender",
    isLandscape: false,
  },
  {
    id: 3,
    src: "https://res.cloudinary.com/dbya8iwlw/video/upload/v1766087322/Grow_l5w81i.mp4",
    title: "Social Media Reel",
    software: "Final Cut Pro",
    isLandscape: false,
  },
    {
    id: 4,
    src: "https://res.cloudinary.com/dbya8iwlw/video/upload/v1766087318/money_rules_r58nt6.mp4",
    title: "Social Media Reel",
    software: "Final Cut Pro",
    isLandscape: false,
  },
    {
    id: 5,
    src: "https://res.cloudinary.com/dbya8iwlw/video/upload/v1766087314/canva_gsfhmy.mp4",
    title: "Social Media Reel",
    software: "Final Cut Pro",
    isLandscape: false,
  },
    {
    id: 6,
    src: "https://res.cloudinary.com/dbya8iwlw/video/upload/v1766088133/dabba_fj7zz8.mp4",
    title: "Social Media Reel",
    software: "Final Cut Pro",
    isLandscape: true,
  },
   {
    id: 7,
    src: "https://res.cloudinary.com/dbya8iwlw/video/upload/v1766088129/thanking_kmlsqj.mp4",
    title: "Social Media Reel",
    software: "Final Cut Pro",
    isLandscape: true,
  },
   {
    id: 8,
    src: "https://res.cloudinary.com/dbya8iwlw/video/upload/v1766088063/TYPEI_rkvllb.mp4",
    title: "Social Media Reel",
    software: "Final Cut Pro",
    isLandscape: true,
  },
   {
    id: 9,
    src: "https://res.cloudinary.com/dbya8iwlw/video/upload/v1766088111/Nfx_eigxoq.mp4",
    title: "Social Media Reel",
    software: "Final Cut Pro",
    isLandscape: true,
  },
];

export default function Photos() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const observer = useRef<IntersectionObserver | null>(null);

  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [visibleVideos, setVisibleVideos] = useState<Set<number>>(new Set());

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));

          if (entry.isIntersecting) {
            setVisibleVideos((prev) => new Set(prev).add(index));
          } else {
            const video = videoRefs.current[index];
            if (video) {
              video.pause();
              video.currentTime = 0;
            }
          }
        });
      },
      {
        threshold: 0.4,
      }
    );

    containerRefs.current.forEach((el) => {
      if (el) observer.current?.observe(el);
    });

    return () => observer.current?.disconnect();
  }, []);

  const playVideo = (index: number) => {
    videoRefs.current.forEach((video, i) => {
      if (video && i !== index) {
        video.pause();
        video.currentTime = 0;
      }
    });

    const video = videoRefs.current[index];
    if (video) {
      video.play();
      setActiveVideo(index);
    }
  };

  const pauseVideo = (index: number) => {
    const video = videoRefs.current[index];
    if (video) video.pause();
    setActiveVideo(null);
  };

  const toggleVideo = (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;

    if (video.paused) playVideo(index);
    else pauseVideo(index);
  };

  const handleFullscreen = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const container = containerRefs.current[index];
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="h-full w-full overflow-y-auto overflow-x-hidden bg-white dark:bg-gray-900">
      {/* macOS Photos Header */}
      <div className="sticky top-0 z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
        <div className="w-full px-3 sm:px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white truncate">
                Library
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                All Videos • {reels.length} items
              </p>
            </div>
            <div className="flex items-center gap-2 md:gap-3 ml-4">
              <button className="px-2 sm:px-3 md:px-4 py-1.5 md:py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                Select
              </button>
              <button className="px-2 sm:px-3 md:px-4 py-1.5 md:py-2 text-xs sm:text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors">
                <span className="hidden sm:inline">+ Add</span>
                <span className="sm:hidden">+</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-2 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
        {/* Videos Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
            {reels.map((reel, index) => (
              <div
                key={reel.id}
                className={`group relative ${reel.isLandscape ? 'sm:col-span-2 sm:row-span-2' : 'col-span-1 row-span-2'}`}
              >
                <div
                  ref={(el) => { containerRefs.current[index] = el }}
                  data-index={index}
                  className={`relative overflow-hidden bg-gray-100 dark:bg-gray-800 cursor-pointer transition-all duration-300 ease-out rounded-md sm:rounded-lg ${
                    reel.isLandscape ? "aspect-video" : "aspect-[9/16]"
                  } hover:scale-[1.03] hover:z-10 hover:shadow-xl hover:shadow-black/20 dark:hover:shadow-black/40`}
                  onMouseEnter={() => playVideo(index)}
                  onMouseLeave={() => pauseVideo(index)}
                  onClick={() => toggleVideo(index)}
                >
                  {visibleVideos.has(index) && (
                    <video
                      ref={(el) => { videoRefs.current[index] = el }}
                      src={reel.src}
                      loop
                      playsInline
                      preload="metadata"
                      className={`w-full h-full transition-all duration-300 ${reel.isLandscape ? 'object-cover' : 'object-cover'}`}
                    />
                  )}

                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Fullscreen Button */}
                  <button
                    onClick={(e) => handleFullscreen(index, e)}
                    className="absolute top-1.5 sm:top-2 md:top-3 right-1.5 sm:right-2 md:right-3 w-7 sm:w-8 md:w-9 h-7 sm:h-8 md:h-9 bg-black/50 hover:bg-black/70 backdrop-blur-xl rounded-md sm:rounded-lg flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 z-10 shadow-lg"
                    aria-label="Fullscreen"
                  >
                    <svg
                      className="w-3 sm:w-4 h-3 sm:h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                      />
                    </svg>
                  </button>

                  {/* Video Duration Badge */}
                  <div className="absolute top-1.5 sm:top-2 md:top-3 left-1.5 sm:left-2 md:left-3 px-1.5 sm:px-2 md:px-2.5 py-0.5 sm:py-1 bg-black/70 backdrop-blur-xl rounded sm:rounded-md text-xs text-white font-medium opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg">
                    1:24
                  </div>

                  {/* Play Icon Overlay */}
                  {activeVideo !== index && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 bg-white/95 dark:bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                        <svg
                          className="w-5 sm:w-5 md:w-6 h-5 sm:h-5 md:h-6 text-gray-900 ml-0.5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Video Info on Hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <h3 className="text-xs sm:text-sm font-semibold text-white drop-shadow-2xl line-clamp-1">
                      {reel.title}
                    </h3>
                    <p className="text-xs text-white/95 drop-shadow-2xl line-clamp-1 mt-0.5 sm:mt-1 hidden sm:block">
                      {reel.software}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-12 sm:h-16 md:h-20"></div>
      </div>
    </div>
  );
}
