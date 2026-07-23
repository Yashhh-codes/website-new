'use client';

import { ScrollReelTestimonials } from '@/components/ui/scroll-reel-testimonials';

const TESTIMONIALS = [
  {
    quote: "Big effort — high quality. Best creative work out there. They truly understand what modern brands need.",
    author: "Jan Dittrich, Design Director",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop",
    alt: "Portrait of Jan Dittrich",
  },
  {
    quote:
      "I'm building a new brand identity and it's absolutely remarkable how much value their team has delivered from day one.",
    author: "Michael Riddering, Founder",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&auto=format&fit=crop",
    alt: "Portrait of Michael Riddering",
  },
  {
    quote: "Way too much craft and attention to detail honestly. We came for a logo, we got a whole brand system.",
    author: "James Traf, CEO",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80&auto=format&fit=crop",
    alt: "Portrait of James Traf",
  },
  {
    quote: "Their process is unlike any other agency. Clear, fast, and the results genuinely exceeded all our expectations.",
    author: "Sarah Okonkwo, CMO",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&auto=format&fit=crop",
    alt: "Portrait of Sarah Okonkwo",
  },
];

export function ScrollReelSection() {
  return (
    <section
      aria-labelledby="scroll-reel-heading"
      className="bg-[#FAF9F6] border-t border-black/5 py-24 md:py-32 relative z-10"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        {/* Heading */}
        <div className="mb-14 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center rounded-full border border-black/10 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Client Voices
            </div>
            <h2
              id="scroll-reel-heading"
              className="text-4xl font-extrabold tracking-tight text-zinc-900 md:text-5xl"
            >
              Trusted by teams<br className="hidden sm:block" /> who move fast
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-zinc-500">
            Real feedback from real clients who have partnered with us to build brands worth remembering.
          </p>
        </div>

        {/* Scroll Reel Testimonial widget */}
        <ScrollReelTestimonials
          testimonials={TESTIMONIALS}
          charStaggerMs={5}
          className="mx-auto"
        />
      </div>
    </section>
  );
}

export default ScrollReelSection;
