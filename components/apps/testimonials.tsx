"use client"

import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"

export default function Testimonials({ isDarkMode }: { isDarkMode?: boolean }) {
  const testimonials = [
    
  {
    "quote": "The Journey Club breaks down the creator economy in a way that actually makes execution possible. No fluff, just systems that work.",
    "name": "The Journey Club",
    "designation": "Creator Economy Community",
    "src": "/testimonials/testimonial-1.png"
  },
  {
    "quote": "Everything I do is a/b testing, and the frameworks here align perfectly with how real operators think and execute.",
    "name": "Sagnik Ghosh",
    "designation": "Investor & Entrepreneur",
    "src": "/testimonials/testimonial-2.png"
  },
  {
    "quote": "What stood out was the clarity. Monetization, distribution, and leverage explained without fake hype.",
    "name": "Jatin Naran",
    "designation": "Digital Creator",
    "src": "/testimonials/testimonial-3.png"
  },
  {
    "quote": "If you're not building with AI today, you're already behind. This ecosystem understands that reality deeply.",
    "name": "Serge Gatari",
    "designation": "AI Growth & Product Builder",
    "src": "/testimonials/testimonial-4.png"
  },
  {
    "quote": "Reels are about psychology, not luck. The strategies here respect attention, timing, and repeatability.",
    "name": "Parth Vijayvergiya",
    "designation": "Content & Reel Creator",
    "src": "/testimonials/testimonial-5.png"
  },
  {
    "quote": "Most platforms teach theory. This actually sharpens execution, especially for creators who want consistency.",
    "name": "Stephen Ridley",
    "designation": "Artist & Educator",
    "src": "/testimonials/testimonial-6.png"
  },
  {
    "quote": "Audience growth is engineering, not magic. The thinking here matches how modern creators should build.",
    "name": "Stephen Ridley",
    "designation": "Founder, Ridley Academy",
    "src": "/testimonials/testimonial-7.png"
  },
  {
    "quote": "AI is a leverage multiplier. What matters is how you deploy it, and this approach gets that right.",
    "name": "Serge Gatari",
    "designation": "Founder, CookAI",
    "src": "/testimonials/testimonial-8.png"
  },
  {
    "quote": "Consistency beats virality. The systems focus here help creators stay in the game long enough to win.",
    "name": "Parth Vijayvergiya",
    "designation": "YouTube Creator",
    "src": "/testimonials/testimonial-9.png"
  },
  {
    "quote": "Online income isn’t about hacks. It’s about repeatable funnels and trust, and that’s exactly what’s taught.",
    "name": "Jatz Naran",
    "designation": "Online Business Educator",
    "src": "/testimonials/testimonial-10.png"
  },
    {
    "quote": "Clear thinking beats loud motivation. This ecosystem values depth, not noise.",
    "name": "Tharun Speaks",
    "designation": "Educator & Content Creator",
    "src": "/testimonials/testimonial-11.png"
  },
  {
    "quote": "Skill-first education is the only thing that compounds long-term. This aligns with that philosophy.",
    "name": "Tharun Naik",
    "designation": "Founder, Indian Video School",
    "src": "/testimonials/testimonial-12.png"
  },
  {
    "quote": "Strong communities are built by developers who share, not gatekeep. This does that well.",
    "name": "GDG Chandigarh",
    "designation": "Developer Community",
    "src": "/testimonials/testimonial-13.png"
  },
  {
    "quote": "AI progress accelerates when communities collaborate instead of competing.",
    "name": "AI Community Delhi",
    "designation": "AI & Tech Community",
    "src": "/testimonials/testimonial-14.png"
  },
  {
    "quote": "Building, debugging, and deploying in public is how real engineers grow.",
    "name": "D4 Community",
    "designation": "Developer Community",
    "src": "/testimonials/testimonial-16.png"
  },
  {
    "quote": "India’s developer ecosystem grows fastest when learning stays open and accessible.",
    "name": "GDG India",
    "designation": "Google Developer Community",
    "src": "/testimonials/testimonial-17.png"
  },
  {
    "quote": "Hands-on learning matters more than certificates. Community-driven ML education wins.",
    "name": "ML Chandigarh",
    "designation": "Machine Learning Community",
    "src": "/testimonials/testimonial-18.png"
  },
  {
    "quote": "Student entrepreneurship starts with honest conversations, not polished success stories.",
    "name": "GUESSs India Podcast",
    "designation": "Entrepreneurship Podcast",
    "src": "/testimonials/testimonial-20.png"
  },
  {
    "quote": "Entrepreneurship education works best when students learn by doing, not just listening.",
    "name": "GUESSs India",
    "designation": "Student Entrepreneurship Community",
    "src": "/testimonials/testimonial-21.png"
  },
  {
    "quote": "Real, unscripted conversations are what actually shape young founders.",
    "name": "GUESSs India Podcast",
    "designation": "Student Founder Podcast",
    "src": "/testimonials/testimonial-22.png"
  }
]

  

  return (
    <div className={`h-full w-full overflow-auto ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="py-8">
        <AnimatedTestimonials testimonials={testimonials} />
      </div>
    </div>
  )
}
