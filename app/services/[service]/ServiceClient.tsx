'use client';

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Sparkles, CheckCircle2, Plus, Minus, ArrowRight } from "lucide-react";
import { heroHtml } from "../../page";
import HoverGradientNavBar from "@/components/HoverGradientNavBar";
import MobileFloatingMenu from "@/components/MobileFloatingMenu";
import CinematicFooter from "@/components/CinematicFooter";

interface FAQ {
  q: string;
  a: string;
}

interface ServiceData {
  title: string;
  tag: string;
  overview: string;
  features: string[];
  benefits: string[];
  process: { step: string; title: string; desc: string }[];
  faqs: FAQ[];
  color: string;
}

const servicesData: Record<string, ServiceData> = {
  "branding": {
    title: "Branding",
    tag: "Strategy & Identity",
    overview: "Establish a profound identity. We develop complete brand systems including logo design, color typography, corporate guidelines, and visual assets designed to set your brand apart.",
    features: [
      "Logo & Visual Identity System",
      "Brand Strategy & Market Positioning",
      "Corporate Typography Selection",
      "Comprehensive Brand Guidelines (PDF)"
    ],
    benefits: [
      "Consistent look and feel across channels",
      "Instant brand recognition in crowded markets",
      "Increased company valuation & premium positioning",
      "Deep alignment of values and visuals"
    ],
    process: [
      { step: "01", title: "Discovery Workshop", desc: "Aligning on your brand's core values, mission, target audience, and positioning strategy." },
      { step: "02", title: "Visual Concepts", desc: "Exploring diverse art directions, mood boards, and typographic frameworks." },
      { step: "03", title: "System Finalization", desc: "Refining the chosen logo mark, compiling color palettes, and creating design patterns." },
      { step: "04", title: "Asset Handover", desc: "Exporting print-ready and digital formats, alongside your complete guidelines document." }
    ],
    faqs: [
      { q: "What deliverables do I receive?", a: "You receive all vector source files for the logo, secondary marks, custom color guidelines, font recommendations, brand pattern assets, and a comprehensive Brand Style Guide PDF." },
      { q: "How long does a branding project take?", a: "Typically, branding projects require 4 to 6 weeks from discovery workshops to the final delivery of assets." }
    ],
    color: "rgba(242, 139, 168, 0.15)",
  },
  "printing": {
    title: "Printing",
    tag: "Editorial & Print",
    overview: "Tangible brand experiences. We design and deliver premium physical print assets, bespoke editorial catalogs, corporate collateral, and tactile stationery utilizing fine paper stocks and advanced finishes.",
    features: [
      "Bespoke Editorial & Catalogs",
      "High-End Corporate Collateral",
      "Tactile Letterpress Business Cards",
      "Specialty Packaging Print Coordination"
    ],
    benefits: [
      "Tactile brand interaction that builds credibility",
      "Premium customer perception of physical touchpoints",
      "Cohesive offline marketing presence",
      "Assurance of professional print production and quality control"
    ],
    process: [
      { step: "01", title: "Dielines & Paper Stock", desc: "Selecting texture, thickness, weight, and layout specifications for print templates." },
      { step: "02", title: "Visual Layout", desc: "Designing grid systems, typographic layouts, and ink density tests for absolute legibility." },
      { step: "03", title: "Print Setup & Proofing", desc: "Creating color-corrected, print-ready files (PDF/X-4) and reviewing physical proofs." },
      { step: "04", title: "Manufacturing", desc: "Overseeing printing presses, foil stampers, embossing, and direct shipping logistics." }
    ],
    faqs: [
      { q: "Do you handle the actual printing?", a: "Yes, we coordinate directly with high-end print houses, choosing paper stocks, finishes (like spot UV, embossing, foil stamping), and managing final delivery to your doorstep." },
      { q: "Can I bring my own printer?", a: "Absolutely. We will prepare exact technical print-ready files matching your printer's specifications." }
    ],
    color: "rgba(255, 179, 123, 0.15)",
  },
  "web-development": {
    title: "Web Development",
    tag: "Code & Strategy",
    overview: "Next-gen digital interfaces. We engineer high-performance web applications, server-rendered websites, e-commerce stores, and tailored React applications using modern architectural standards.",
    features: [
      "Next.js & React Framework Architecture",
      "Server-Side Rendering (SSR) & Speed Opt",
      "Headless CMS Integration (Sanity, Contentful)",
      "Dynamic Framer Motion Visual Animations"
    ],
    benefits: [
      "Ultra-fast loading speeds for lower bounce rates",
      "Flawless responsive layouts across mobile & desktop",
      "Scalable, clean code that is easy to maintain",
      "Intuitive content administration dashboard for non-technical users"
    ],
    process: [
      { step: "01", title: "Architecture & Sitemaps", desc: "Mapping user journeys, URL structures, data schemas, and API integration flows." },
      { step: "02", title: "Fidelity Mockups", desc: "Designing responsive UI layouts with interactive prototypes using our creative theme." },
      { step: "03", title: "Frontend Engineering", desc: "Coding the page components in React, configuring state, and adding smooth animation hooks." },
      { step: "04", title: "Deploy & Optimize", desc: "Testing performance scores (LCP, FID), setting up serverless hosting, and index optimization." }
    ],
    faqs: [
      { q: "What stack do you use?", a: "Our default stack is Next.js/React, TypeScript, Tailwind CSS, and Framer Motion, integrated with modern headless CMS platforms." },
      { q: "Will the site be SEO optimized?", a: "Yes, our server-side rendering setup, metadata config, and semantic HTML ensure maximum search crawlability right out of the box." }
    ],
    color: "rgba(110, 168, 254, 0.15)",
  },
  "digital-marketing": {
    title: "Digital Marketing",
    tag: "Growth & Visibility",
    overview: "Accelerate your market presence. We design performance marketing campaigns, search engine optimization strategy, conversion tracking, and social content growth engines.",
    features: [
      "Meta, Google, & LinkedIn Performance Ads",
      "Technical Search Engine Optimization (SEO)",
      "High-Converting Landing Pages",
      "Automated Email Marketing Strategy"
    ],
    benefits: [
      "Continuous inbound lead generation channels",
      "Elevated search engine rankings for key terms",
      "Enhanced user conversions and optimized ad budgets",
      "Structured analytics attribution dashboards"
    ],
    process: [
      { step: "01", title: "Funnel Analysis", desc: "Auditing current customer acquisition cost, keyword rankings, and tracking setups." },
      { step: "02", title: "SEO & Ads Setup", desc: "Writing landing page copy, designing creative ad units, and doing keyword research." },
      { step: "03", title: "Campaign Launch", desc: "Activating campaigns, tracking audience metrics, and scaling winning ad variants." },
      { step: "04", title: "Analytics Sync", desc: "Reviewing metrics, running A/B conversion tests, and reporting ROI." }
    ],
    faqs: [
      { q: "How do we track success?", a: "We set up tracking pixels (Google Analytics 4, Meta Pixel) and construct a custom looker studio dashboard so you can view conversions and acquisition cost in real-time." },
      { q: "Do you create the ad creatives?", a: "Yes, we design all ad imagery, copy, and video assets needed for performance campaigns." }
    ],
    color: "rgba(126, 203, 231, 0.15)",
  },
  "graphic-design": {
    title: "Graphic Design",
    tag: "Art Direction",
    overview: "Artistic direction for digital and print. We create sophisticated visual assets, marketing layouts, and custom illustrations for websites and marketing collateral.",
    features: [
      "Custom Editorial Layouts",
      "Social Media Asset Design System",
      "Bespoke Brand Illustrations",
      "Creative Marketing Collateral"
    ],
    benefits: [
      "Distinct visual aesthetic that aligns with your brand",
      "Increased user engagement on social media campaigns",
      "Bespoke storytelling illustrations that default themes cannot match",
      "Clean visual consistency across pitch decks and sales kits"
    ],
    process: [
      { step: "01", title: "Visual Audit", desc: "Understanding the design requirements, asset dimensions, and tone of voice." },
      { step: "02", title: "Mood Boards", desc: "Defining styles, illustration guidelines, and typographic weights." },
      { step: "03", title: "Draft Creation", desc: "Generating high-quality graphic mockups and editorial layouts for review." },
      { step: "04", title: "Delivery", desc: "Exporting high-resolution web formats, print PDFs, and editable project source files." }
    ],
    faqs: [
      { q: "What design tools do you use?", a: "We primarily work with Figma, Adobe Illustrator, Photoshop, and InDesign, depending on the asset requirements." },
      { q: "How many revisions are included?", a: "All graphic design scopes include 3 complete rounds of feedback and revisions to guarantee alignment." }
    ],
    color: "rgba(198, 166, 255, 0.15)",
  },
  "packaging-design": {
    title: "Packaging Design",
    tag: "Industrial & Visual",
    overview: "Tactile boxes and packages that stand out. We design memorable boxes, bags, labels, and product unboxing experiences focused on tactile appeal and brand alignment.",
    features: [
      "3D Package Visualizations & Mockups",
      "Custom Structural Box Dielines",
      "Eco-Friendly Material Coordination",
      "Premium Label & Bottle Finishes"
    ],
    benefits: [
      "Stunning shelf presence that attracts premium buyers",
      "High shareability of product unboxing experiences",
      "Eco-conscious positioning via material engineering",
      "Absolute template accuracy, preventing printing misalignments"
    ],
    process: [
      { step: "01", title: "Dieline Engineering", desc: "Acquiring structural dimensions and manufacturing templates from package suppliers." },
      { step: "02", title: "3D Prototyping", desc: "Creating high-fidelity 3D package models to test label positioning and graphic flows." },
      { step: "03", title: "Tactile Artistry", desc: "Integrating unique paper finishes, custom embossing areas, and debossing." },
      { step: "04", title: "Production Co-op", desc: "Conducting print-proofing runs and delivering technical layouts to box manufacturers." }
    ],
    faqs: [
      { q: "Do you supply the packaging templates?", a: "Yes, we coordinate directly with your box factory or bottle supplier to acquire and design on their exact dieline blueprints." },
      { q: "Can we review 3D renders first?", a: "Yes, all packaging designs include high-fidelity 3D structural mockups before print." }
    ],
    color: "rgba(126, 244, 203, 0.15)",
  },
  "video-production": {
    title: "Video Production",
    tag: "Motion & Film",
    overview: "Storytelling in motion. We script, film, and produce cinematic brand films, social video campaigns, corporate commercials, and animated explainer videos.",
    features: [
      "Commercial Creative Directing & Scriptwriting",
      "High-End Cinematography & Lighting",
      "Premium Post-Production & Color Grading",
      "Dynamic 2D/3D Motion Graphics"
    ],
    benefits: [
      "Higher customer conversion rates via video storytelling",
      "Deep emotional connection between customers and brand",
      "Highly shareable social video content assets",
      "Adaptable outputs for Instagram Reels, YouTube, and Web headers"
    ],
    process: [
      { step: "01", title: "Pre-Production", desc: "Writing custom scripts, drawing storyboards, casting actors, and scouting locations." },
      { step: "02", title: "On-Site Production", desc: "Filming with professional directors of photography, camera crews, and cinema gear." },
      { step: "03", title: "Editing & Grading", desc: "Stitching narrative, adding audio soundscapes, and doing cinematic color grading." },
      { step: "04", title: "Export Formatting", desc: "Generating specialized ratios (16:9, 9:16) optimized for web platforms." }
    ],
    faqs: [
      { q: "Do you travel for video shoots?", a: "Yes, our film crew is mobile and shoots corporate commercials and brand films globally." },
      { q: "What is the typical video production timeline?", a: "From scripting to final video color grading, the timeline is usually 4 to 8 weeks." }
    ],
    color: "rgba(242, 139, 230, 0.15)",
  },
  "corporate-gifting": {
    title: "Corporate Gifting",
    tag: "Merchandise & Curation",
    overview: "Build deep professional bonds. We curate high-end corporate gifts, custom-made merchandise, and tactile packages that reinforce brand relationships.",
    features: [
      "Bespoke High-End Gift Selection",
      "Custom Brand Merchandising Assets",
      "Sustainable Tactile Gift Packaging",
      "Global Shipping & Logistics Management"
    ],
    benefits: [
      "Reinforced B2B relationships and client retention",
      "Highly memorable brand physical touchpoints",
      "Bespoke merchandise people actually want to use",
      "Stress-free curation, wrapping, and delivery logistics"
    ],
    process: [
      { step: "01", title: "Curated Cataloging", desc: "Presenting a bespoke list of premium gifts, tech items, notebook styles, and merchandise." },
      { step: "02", title: "Visual Mockups", desc: "Designing how the logos and branding will look on selected premium items." },
      { step: "03", title: "Gift Box Packaging", desc: "Designing customized box sleeves, cards, and tissue wrapping templates." },
      { step: "04", title: "Fulfillment Run", desc: "Kitting box items, packing customized cards, and shipping worldwide." }
    ],
    faqs: [
      { q: "Is there a minimum order quantity?", a: "Yes, because of product sourcing and customization setup, minimum orders start at 50 gift units." },
      { q: "Do you ship individually to clients?", a: "Yes, we handle worldwide drop-shipping directly to individual home addresses or corporate offices." }
    ],
    color: "rgba(126, 231, 135, 0.15)",
  },
};

export default function ServiceClient({ service }: { service: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    // Keep header video autoplay active if present
    if (containerRef.current) {
      const video = containerRef.current.querySelector("video");
      if (video) {
        video.muted = true;
        video.play().catch((err) => console.log("Autoplay log:", err));
      }
    }
  }, []);

  const data = servicesData[service];

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#FAF9F6] text-zinc-800">
        Service Not Found
      </div>
    );
  }

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main className="w-full min-h-screen bg-[#FAF9F6] text-slate-900 font-sans">
      {/* Exact Same Header Shell */}
      <div className="relative w-full">
        <div
          ref={containerRef}
          className="w-full relative singlefile-root"
          dangerouslySetInnerHTML={{ __html: heroHtml }}
        />
        <HoverGradientNavBar />
        <MobileFloatingMenu />
      </div>

      {/* Service Breadcrumbs */}
      <div className="relative z-10 px-6 pt-32 max-w-6xl mx-auto">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
          <Link href="/" className="hover:text-zinc-800 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-zinc-800 transition-colors">Services</Link>
          <span>/</span>
          <span className="text-zinc-800">{data.title}</span>
        </div>
      </div>

      {/* Service Hero Banner */}
      <section className="relative z-10 px-6 pt-8 pb-16 md:pt-12 md:pb-24 max-w-6xl mx-auto">
        <div className="absolute top-12 right-6 w-32 h-32 rounded-full pointer-events-none z-0 blur-[60px]" style={{ backgroundColor: data.color }} />
        
        <div className="relative z-10 flex flex-col items-start gap-4">
          <Link href="/services" className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 hover:border-black/20 bg-white/50 text-xs font-bold uppercase tracking-wider text-zinc-600 transition-all duration-200 mb-4">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Services
          </Link>
          <div className="text-xs font-bold uppercase tracking-widest text-zinc-400">
            {data.tag}
          </div>
          <h1 className="text-4xl md:text-7xl font-black tracking-tight text-zinc-900 leading-none">
            {data.title}
          </h1>
          <p className="text-zinc-500 text-base md:text-xl max-w-3xl mt-4 leading-relaxed">
            {data.overview}
          </p>
        </div>
      </section>

      {/* Features & Benefits Grid */}
      <section className="relative z-10 px-6 py-12 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Features Card */}
        <div className="p-8 rounded-2xl bg-white border border-black/5">
          <h2 className="text-2xl font-black text-zinc-800 tracking-tight mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-pink-500" />
            What We Deliver
          </h2>
          <ul className="flex flex-col gap-4">
            {data.features.map((feat, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                <span className="text-zinc-600 text-sm md:text-base leading-relaxed">{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Benefits Card */}
        <div className="p-8 rounded-2xl bg-white border border-black/5">
          <h2 className="text-2xl font-black text-zinc-800 tracking-tight mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-blue-500" />
            Why It Matters
          </h2>
          <ul className="flex flex-col gap-4">
            {data.benefits.map((benefit, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span className="text-zinc-600 text-sm md:text-base leading-relaxed">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Specific Process Timeline */}
      <section className="relative z-10 px-6 py-24 max-w-6xl mx-auto">
        <div className="text-center mb-16 max-w-[600px] mx-auto">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-zinc-900 mb-4">
            The {data.title} Process
          </h2>
          <p className="text-zinc-500 text-sm md:text-base leading-relaxed">
            Our step-by-step workflow customized to ensure the highest fidelity and delivery standards for your design.
          </p>
        </div>

        <div className="relative border-l border-zinc-200 ml-4 md:ml-12 pl-8 md:pl-16 flex flex-col gap-12">
          {data.process.map((stepItem, i) => (
            <motion.div
              key={stepItem.step}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="relative group animate-reveal-item"
            >
              <div className="absolute -left-[45px] md:-left-[81px] top-0 w-8 h-8 rounded-full border-2 border-zinc-200 bg-[#FAF9F6] flex items-center justify-center text-xs font-bold text-zinc-400 group-hover:border-pink-500 group-hover:text-pink-500 transition-colors duration-300">
                {stepItem.step}
              </div>
              <h3 className="text-xl md:text-2xl font-black text-zinc-800 tracking-tight">
                {stepItem.title}
              </h3>
              <p className="text-zinc-500 text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
                {stepItem.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 px-6 py-24 bg-white/40 border-t border-black/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-zinc-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="flex flex-col gap-4">
            {data.faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl border border-black/5 bg-white p-6 md:p-8 cursor-pointer transition-all duration-300 hover:border-black/10"
                onClick={() => toggleFaq(index)}
              >
                <div className="flex justify-between items-center w-full text-left">
                  <h3 className="text-lg md:text-xl font-bold tracking-tight text-zinc-800">
                    {faq.q}
                  </h3>
                  <button className="text-zinc-400 hover:text-zinc-700 transition-colors focus:outline-none">
                    {openFaq === index ? (
                      <Minus className="w-5 h-5" />
                    ) : (
                      <Plus className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <AnimatePresence initial={false}>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden border-t border-black/5 pt-4 text-zinc-500 text-sm md:text-base leading-relaxed"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-24 max-w-5xl mx-auto text-center">
        <div className="p-12 rounded-3xl bg-zinc-900 text-white flex flex-col items-center gap-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-[-50px] right-[-50px] w-64 h-64 rounded-full bg-pink-500/10 blur-[60px]" />
          <div className="absolute bottom-[-50px] left-[-50px] w-64 h-64 rounded-full bg-blue-500/10 blur-[60px]" />
          
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white max-w-2xl leading-none">
            Ready to scale {data.title.toLowerCase()}?
          </h2>
          <p className="text-zinc-400 text-sm md:text-base max-w-xl leading-relaxed">
            Let's start curating concepts, coding layouts, or mapping strategies together. Contact us today.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <a
              href="mailto:hello@virrat.co"
              className="px-8 py-4 rounded-full bg-white text-zinc-900 font-bold text-sm md:text-base hover:bg-zinc-100 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Start a Project
            </a>
            <a
              href="#"
              className="px-8 py-4 rounded-full bg-zinc-800 text-white border border-zinc-700 font-bold text-sm md:text-base hover:bg-zinc-700 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Book a Call
            </a>
          </div>
        </div>
      </section>

      {/* Exact Same Footer Shell */}
      <CinematicFooter />
    </main>
  );
}
