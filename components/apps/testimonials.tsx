"use client"

import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"

export default function Testimonials({ isDarkMode }: { isDarkMode?: boolean }) {
  const testimonials = [
    {
      quote:
        "Exceptional video editor! Himanshu delivered outstanding content for our community events. His creativity brought our vision to life perfectly.",
      name: "The Journey Club",
      designation: "Creator Economy Community - 6,155 followers",
      src: "/testimonials/testimonial-1.png",
    },
    {
      quote:
        "Working with Himanshu was a game-changer. His editing skills elevated our content quality and helped us reach new audiences.",
      name: "Sagnik Ghosh",
      designation: "Entrepreneur & Investor - 15.4K followers",
      src: "/testimonials/testimonial-2.png",
    },
    {
      quote:
        "Himanshu's expertise in video editing is remarkable. He helped us generate 7-figure results with compelling visual storytelling.",
      name: "Jatin Naran",
      designation: "Digital Creator - 241K followers",
      src: "/testimonials/testimonial-3.png",
    },                    
    {
      quote:
        "His attention to detail and creative vision transformed our AI content. Professional work that exceeded expectations every time.",
      name: "Serge Gatari",
      designation: "AI Builder & Content Creator - 67.1K followers",
      src: "/testimonials/testimonial-4.png",
    },
    {
      quote:
        "Incredible editing quality! Himanshu helped create engaging reels that resonated with our 214K followers. Highly recommended!",
      name: "Parth Vijayvergiya",
      designation: "Reel Creator - 214K followers",
      src: "/testimonials/testimonial-5.png",
    },
    {
      quote:
        "As a British artist, finding quality video editors is crucial. Himanshu delivered exceptional work for our academy's promotional content.",
      name: "Stephen Ridley",
      designation: "British Artist & Founder - 526K followers",
      src: "/testimonials/testimonial-6.png",
    },
    {
      quote:
        "Clear vision meets expert execution! Himanshu's editing brought clarity to our educational content and enhanced viewer engagement significantly.",
      name: "Tharun Naik",
      designation: "IIT Kharagpur '23 & Founder - 258K followers",
      src: "/testimonials/testimonial-7.png",
    },
    {
      quote:
        "Outstanding work for our community events! Himanshu's editing captured the essence of our developer meetups perfectly.",
      name: "GDG Chandigarh",
      designation: "Google Developer Groups - 1,376 followers",
      src: "/testimonials/testimonial-8.png",
    },
    {
      quote:
        "Professional and dedicated! Himanshu helped us create engaging AI content that resonated with our growing community.",
      name: "AI Community Delhi",
      designation: "AI Community - 233 followers",
      src: "/testimonials/testimonial-9.png",
    },
    {
      quote:
        "Exceptional editing for our D4 Community content. Himanshu understood our vision and delivered beyond expectations.",
      name: "D4 Community",
      designation: "Discite Develop Debug Deploy - 371 followers",
      src: "/testimonials/testimonial-10.png",
    },
    {
      quote:
        "Empowering content through great editing! Himanshu's work helped showcase our community events to 19.8K followers effectively.",
      name: "GDG India",
      designation: "Google Developer Groups India - 19.8K followers",
      src: "/testimonials/testimonial-11.png",
    },
    {
      quote:
        "High-quality video editing for our machine learning events. Himanshu captured the technical excellence of our community perfectly.",
      name: "ML Chandigarh",
      designation: "ML Community by Google - 265 followers",
      src: "/testimonials/testimonial-12.png",
    },
    {
      quote:
        "Partnership success! Himanshu's video editing helped us present our AI solutions with clarity and professional appeal.",
      name: "LLMware.ai",
      designation: "AI Technology Company",
      src: "/testimonials/testimonial-13.png",
    },
    {
      quote:
        "Real, bold & unscripted content made better! Himanshu's editing enhanced our podcast quality and viewer engagement tremendously.",
      name: "GUESSS India Podcast",
      designation: "Student Entrepreneurship Podcast - 470 subscribers",
      src: "/testimonials/testimonial-14.png",
    },
  ]

  return (
    <div className={`h-full w-full overflow-auto ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="py-8">
        <AnimatedTestimonials testimonials={testimonials} />
      </div>
    </div>
  )
}
