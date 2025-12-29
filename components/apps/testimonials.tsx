"use client"

import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"

export default function Testimonials({ isDarkMode }: { isDarkMode?: boolean }) {
  const testimonials = [
    {
      quote:
        "Himanshu's video editing skills are exceptional. His attention to detail and creative vision transformed our content strategy completely.",
      name: "Priya Sharma",
      designation: "Content Director at MediaHub",
      src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Working with Himanshu was seamless. He delivered high-quality edits ahead of schedule and his communication was outstanding.",
      name: "Rahul Verma",
      designation: "Founder at Digital Creators",
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "His creative approach to storytelling through video is remarkable. Every project exceeded our expectations.",
      name: "Ananya Desai",
      designation: "Marketing Lead at TechVentures",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Professional, creative, and incredibly talented. Himanshu brought our vision to life with his expert editing skills.",
      name: "Arjun Kapoor",
      designation: "YouTube Creator - 500k Subscribers",
      src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "The quality of work and turnaround time is exceptional. Highly recommend for any video editing project.",
      name: "Sneha Patel",
      designation: "Brand Manager at Creative Studios",
      src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
