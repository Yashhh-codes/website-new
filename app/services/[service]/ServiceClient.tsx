'use client';

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { ArrowLeft, Sparkles, CheckCircle2, Plus, Minus, ArrowRight, ChevronDown, Code2, ShoppingBag, BarChart3, Rocket } from "lucide-react";
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

  const headerHtml = heroHtml.split("</header>")[0] + "</header>";



  return (
    <main className="w-full min-h-screen bg-[#FAF9F6] text-slate-900 font-sans overflow-x-hidden">
      {/* Exact Same Header Shell */}
      <div className="relative w-full">
        <div
          ref={containerRef}
          className="w-full relative singlefile-root"
          dangerouslySetInnerHTML={{ __html: headerHtml }}
        />
        <HoverGradientNavBar />
        <MobileFloatingMenu />
      </div>

      {service === "web-development" ? (
        /* Redesigned Premium Sticky Parallax Hero for Web Development */
        <div className="relative h-screen w-full z-0">
          <div className="relative h-full w-full flex flex-col justify-between overflow-hidden bg-[#FAF9F6] pt-24 pb-8">
            {/* Breadcrumbs */}
            <div className="relative z-10 px-6 max-w-6xl mx-auto w-full flex flex-col items-start gap-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                <Link href="/" className="hover:text-zinc-800 transition-colors">Home</Link>
                <span>/</span>
                <Link href="/services" className="hover:text-zinc-800 transition-colors">Services</Link>
                <span>/</span>
                <span className="text-zinc-800">{data.title}</span>
              </div>
              <Link href="/services" className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 hover:border-black/20 bg-white/50 text-xs font-bold uppercase tracking-wider text-zinc-600 transition-all duration-200 w-fit">
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Services
              </Link>
            </div>

            {/* Giant Heading */}
            <div className="flex flex-col items-center justify-center select-none w-full px-6 mt-auto mb-auto">
              <h1 className="flex flex-col items-center justify-center font-black tracking-tighter leading-[0.82] text-zinc-950 text-center uppercase gap-2">
                <RevealText 
                  text="WEB"
                  textColor="text-zinc-950"
                  overlayColor="text-pink-500"
                  fontSize="text-[clamp(2.2rem,8.2vw,7.2rem)]"
                  letterImages={[
                    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                    "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  ]}
                />
                <RevealText 
                  text="DEVELOPMENT"
                  textColor="text-zinc-950"
                  overlayColor="text-pink-500"
                  fontSize="text-[clamp(2.2rem,8.2vw,7.2rem)]"
                  letterDelay={0.04}
                  overlayDelay={0.03}
                  letterImages={[
                    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                    "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                    "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                    "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                    "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  ]}
                />
              </h1>
            </div>

            {/* Subtitle & Scroll Indicator */}
            <div className="w-full flex flex-col items-center mt-auto">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="max-w-xl mx-auto px-6 text-center"
              >
                <p className="text-zinc-500 text-sm md:text-lg font-medium leading-relaxed">
                  We engineer high-performance digital experiences built to scale.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="flex flex-col items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-widest text-zinc-400 mt-6 cursor-pointer"
                onClick={() => {
                  const nextSec = document.getElementById("capabilities");
                  if (nextSec) {
                    nextSec.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <ChevronDown className="w-4 h-4 animate-bounce" />
              </motion.div>
            </div>
          </div>
        </div>
      ) : (
        /* Standard Service Hero Banner */
        <>
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
        </>
      )}

      {service === "web-development" && (
        <>
          <ScrollStorytellingShowcase />
          <WebDevServicesGrid />
          <ProcessStorytellingTimeline />
        </>
      )}

      {/* Features & Benefits Grid */}
      <section id="capabilities" className="relative z-10 px-6 py-12 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
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

const features = [
  {
    label: "PERFORMANCE",
    title: "Lightning Fast Engine",
    description: "We build high-performance, edge-rendered applications optimized for speed, core web vitals, and perfect SEO indexing.",
    bullets: ["Instant page load states", "99+ PageSpeed scores", "Globally distributed CDN caching"],
    screen: (
      <div className="absolute inset-0 bg-[#FAF9F6] text-zinc-950 p-2 sm:p-4 flex flex-col justify-between select-none h-full">
        <div className="flex items-center justify-between border-b border-black/5 pb-1 sm:pb-2">
          <span className="text-[7px] sm:text-[9px] font-bold tracking-tight">VANGUARD™</span>
          <div className="flex gap-1.5">
            <div className="w-0.5 sm:w-1 h-0.5 sm:h-1 rounded-full bg-zinc-300" />
            <div className="w-0.5 sm:w-1 h-0.5 sm:h-1 rounded-full bg-zinc-300" />
            <div className="w-0.5 sm:w-1 h-0.5 sm:h-1 rounded-full bg-zinc-300" />
          </div>
        </div>
        <div className="my-auto flex flex-col gap-1 sm:gap-1.5 text-left">
          <span className="text-[5px] sm:text-[7px] font-black uppercase tracking-wider text-zinc-400">STUDIO FOCUS</span>
          <h2 className="text-[9px] sm:text-lg font-black tracking-tight leading-[1.1] text-zinc-900">
            Form follows function.<br />Always.
          </h2>
          <p className="text-[5px] sm:text-[7px] text-zinc-500 max-w-[80%] leading-normal">
            Crafting visual identities and interactive digital platforms for world-class brands.
          </p>
        </div>
        <div className="flex justify-between items-center text-[5px] sm:text-[7px] text-zinc-400 pt-1 sm:pt-2 border-t border-black/5">
          <span>© 2026</span>
          <span className="font-bold">EXPLORE PORTFOLIO</span>
        </div>
      </div>
    )
  },
  {
    label: "INTEGRATIONS",
    title: "Headless Commerce",
    description: "Scale your store with custom checkout funnels, headless shop architecture, and payment processing interfaces.",
    bullets: ["Stripe & PayPal API integration", "Real-time stock management", "Multi-currency checkout support"],
    screen: (
      <div className="absolute inset-0 bg-white text-zinc-950 p-2 sm:p-4 flex flex-col justify-between select-none h-full">
        <div className="flex items-center justify-between border-b border-black/5 pb-1 sm:pb-2">
          <span className="text-[7px] sm:text-[9px] font-black tracking-tight">MODERNE.</span>
          <div className="flex gap-2 text-[5px] sm:text-[7px] font-bold text-zinc-400">
            <span>SHOP</span>
            <span>STORY</span>
          </div>
        </div>
        <div className="my-auto grid grid-cols-3 gap-1 sm:gap-2">
          {[
            { name: "Chrono 01", price: "$450", bg: "bg-zinc-100" },
            { name: "Pods II", price: "$299", bg: "bg-zinc-100" },
            { name: "Portfolio", price: "$180", bg: "bg-zinc-100" }
          ].map((prod, i) => (
            <div key={i} className="flex flex-col gap-0.5 sm:gap-1 text-left">
              <div className={`aspect-square w-full rounded-sm sm:rounded-md ${prod.bg} flex items-center justify-center`}>
                <div className="w-2 sm:w-4 h-2 sm:h-4 rounded-full bg-zinc-800/5" />
              </div>
              <span className="text-[5px] sm:text-[7px] font-bold text-zinc-800 leading-tight truncate">{prod.name}</span>
              <span className="text-[4px] sm:text-[6px] text-zinc-400 font-medium">{prod.price}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center text-[5px] sm:text-[7px] pt-1 sm:pt-2 border-t border-black/5">
          <span className="text-zinc-400">3 Items</span>
          <span className="font-bold text-zinc-900 bg-zinc-100 px-1 sm:px-1.5 py-0.5 rounded">CHECKOUT</span>
        </div>
      </div>
    )
  },
  {
    label: "SYSTEMS",
    title: "Data Dashboards",
    description: "Empower your workflows with high-density data visualizations, secure analytics portals, and admin screens.",
    bullets: ["WebSocket real-time data sync", "Custom charting & graphs", "Role-based authentication"],
    screen: (
      <div className="absolute inset-0 bg-[#0F0F11] text-zinc-100 p-2 sm:p-4 flex flex-col justify-between select-none h-full">
        <div className="flex items-center justify-between border-b border-white/5 pb-1 sm:pb-2">
          <div className="flex items-center gap-1">
            <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-emerald-500" />
            <span className="text-[6px] sm:text-[8px] font-bold tracking-tight">PULSE CLOUD</span>
          </div>
          <span className="text-[4px] sm:text-[6px] text-zinc-400 uppercase tracking-widest bg-white/5 px-1 py-0.5 rounded">STABLE</span>
        </div>
        <div className="my-auto grid grid-cols-2 gap-2 sm:gap-3">
          <div className="flex flex-col gap-1 sm:gap-1.5 text-left bg-white/5 p-1 sm:p-2 rounded-md sm:rounded-lg border border-white/5">
            <span className="text-[4px] sm:text-[6px] text-zinc-400 uppercase font-bold">Admissions</span>
            <span className="text-xs sm:text-sm font-black text-emerald-400 tracking-tight">1,482</span>
            <div className="h-4 sm:h-6 flex items-end gap-0.5">
              {[10, 15, 8, 22, 14, 18, 25].map((val, idx) => (
                <div key={idx} className="w-full bg-emerald-500/20 rounded-t" style={{ height: `${val * 4}%` }}>
                  {idx === 6 && <div className="w-full h-0.5 sm:h-1 bg-emerald-400 rounded-t" />}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1 sm:gap-2">
            <div className="bg-white/5 p-1 sm:p-1.5 rounded-md sm:rounded-lg border border-white/5 flex items-center justify-between">
              <div className="flex flex-col text-left">
                <span className="text-[4px] sm:text-[5px] text-zinc-400 uppercase font-bold">RATE</span>
                <span className="text-[6px] sm:text-[9px] font-black text-pink-500">72 bpm</span>
              </div>
            </div>
            <div className="bg-white/5 p-1 sm:p-1.5 rounded-md sm:rounded-lg border border-white/5 flex items-center justify-between">
              <div className="flex flex-col text-left">
                <span className="text-[4px] sm:text-[5px] text-zinc-400 uppercase font-bold">SPEED</span>
                <span className="text-[6px] sm:text-[9px] font-black text-cyan-400">99.8%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center text-[4px] sm:text-[6px] text-zinc-500 pt-1 sm:pt-2 border-t border-white/5">
          <span>SYNCED</span>
          <span className="text-zinc-400">EXCELLENT</span>
        </div>
      </div>
    )
  },
  {
    label: "EXPERIENCE",
    title: "Cinematic Portals",
    description: "Deliver immersive storytelling through micro-interactions, canvas-driven graphics, and completely fluid layouts.",
    bullets: ["WebGL & Canvas components", "Scroll-linked parallax reveals", "100% fluid vector rendering"],
    screen: (
      <div className="absolute inset-0 bg-[#08080a] text-zinc-100 p-2 sm:p-4 flex flex-col justify-between select-none h-full">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-700/10 via-zinc-900 to-black opacity-80 pointer-events-none" />
        <div className="flex items-center justify-between border-b border-white/5 pb-1 sm:pb-2 relative z-10">
          <span className="text-[6px] sm:text-[8px] font-bold tracking-widest text-zinc-300">DOMUS™</span>
          <span className="text-[4px] sm:text-[6px] font-bold text-yellow-500 bg-yellow-500/10 px-1 py-0.5 rounded">EXCLUSIVE</span>
        </div>
        <div className="my-auto flex flex-col gap-0.5 sm:gap-1 text-left relative z-10">
          <span className="text-[4px] sm:text-[5px] font-black uppercase tracking-wider text-yellow-500">FEATURED ESTATE</span>
          <h2 className="text-[9px] sm:text-sm font-black tracking-tight leading-[1.1] text-white">
            THE BRUTALIST VILLA
          </h2>
          <span className="text-[5px] sm:text-[7px] text-zinc-400">GENEVA, SWITZERLAND</span>
          <div className="flex gap-2 items-center mt-1">
            <span className="text-[6px] sm:text-[8px] font-black text-white">$4,250,000</span>
          </div>
        </div>
        <div className="flex justify-between items-center text-[4px] sm:text-[6px] text-zinc-500 pt-1 sm:pt-2 border-t border-white/5 relative z-10">
          <span>© 2026 DOMUS</span>
          <span>EXCLUSIVE LISTING</span>
        </div>
      </div>
    )
  }
];

function ScrollStorytellingShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const laptopXRaw = useTransform(scrollYProgress, [0.1, 0.45], [25, 0]);
  const laptopX = useTransform(laptopXRaw, (val) => isMobile ? "0vw" : `${val}vw`);
  const laptopY = useTransform(scrollYProgress, [0.1, 0.45], [-120, 0]);
  const laptopOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const laptopScale = useTransform(scrollYProgress, [0.1, 0.45], [1.15, 1.0]);

  const textOpacity = useTransform(scrollYProgress, [0.25, 0.55], [0, 1]);
  const textX = useTransform(scrollYProgress, [0.25, 0.55], [40, 0]);

  return (
    <div ref={containerRef} className="relative h-screen w-full bg-[#FAF9F6] z-10 overflow-hidden">
      <div className="relative h-full w-full flex items-center justify-center" style={{ perspective: "1000px" }}>
        {/* Soft background glows */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-pink-100/5 blur-[100px] -z-10 pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-blue-100/5 blur-[100px] -z-10 pointer-events-none" />

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full items-center justify-items-center px-6 md:px-16 max-w-7xl mx-auto gap-12">
          {/* Left Column (50% on Desktop) - Laptop Mockup */}
          <div className="w-full flex items-center justify-center relative z-10">
            <motion.div
              style={{
                x: laptopX,
                y: laptopY,
                opacity: laptopOpacity,
                scale: laptopScale,
                willChange: "transform, opacity"
              }}
              className="flex flex-col items-center justify-center origin-center"
            >
              {/* Screen frame */}
              <div className="relative w-[280px] h-[175px] sm:w-[420px] sm:h-[262px] lg:w-[480px] lg:h-[300px] bg-[#0c0c0e] rounded-t-xl p-[5px] sm:p-[6px] border-[4px] sm:border-[5px] border-[#2d2d30] shadow-2xl flex flex-col overflow-hidden">
                {/* Notched camera */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 sm:w-16 h-2 sm:h-3 bg-black rounded-b-md z-30 flex items-center justify-center">
                  <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-zinc-800" />
                </div>

                {/* Inner Screen Canvas */}
                <div className="relative w-full h-full bg-[#18181b] rounded-md overflow-hidden z-10">
                  {features[0].screen}
                </div>
              </div>

              {/* Base/Keyboard frame */}
              <div className="w-[330px] h-[6px] sm:w-[470px] sm:h-[10px] lg:w-[540px] lg:h-[12px] bg-[#2d2d30] rounded-b-xl relative shadow-md flex justify-center border-t border-zinc-600">
                <div className="w-[60px] h-[3px] sm:w-[90px] sm:h-[4px] lg:w-[110px] lg:h-[5px] bg-[#1a1a1c] mx-auto rounded-t-sm -mt-[1px] absolute top-0" />
                <div className="w-[40px] h-[2px] sm:w-[60px] sm:h-[3px] lg:w-[70px] lg:h-[4px] bg-[#121213] rounded-b-md absolute top-0" />
              </div>
            </motion.div>
          </div>

          {/* Right Column (50% on Desktop) - Feature Content */}
          <motion.div 
            style={{
              opacity: textOpacity,
              x: textX,
              willChange: "transform, opacity"
            }}
            className="w-full flex flex-col justify-center items-start px-4 sm:px-8 bg-transparent relative z-20"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-pink-500 mb-2">
              {features[0].label}
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-zinc-900 tracking-tight leading-tight uppercase mb-4">
              {features[0].title}
            </h3>
            <p className="text-zinc-500 text-sm md:text-base leading-relaxed font-medium mb-6">
              {features[0].description}
            </p>
            <ul className="flex flex-col gap-3">
              {features[0].bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-zinc-600 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-pink-500 flex-shrink-0" />
                  {bullet}
                </li>
              ))}
            </ul>
            <Link
              href="#capabilities"
              className="mt-8 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-pink-500 hover:text-pink-600 transition-colors"
            >
              Learn More
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ProcessStorytellingTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the timeline section to animate the center line
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const steps = [
    {
      number: "01",
      title: "Discovery",
      description: "Understanding business goals, users and competitors."
    },
    {
      number: "02",
      title: "Strategy",
      description: "Planning architecture, technology stack and project roadmap."
    },
    {
      number: "03",
      title: "UI / UX Design",
      description: "Designing intuitive interfaces focused on usability and conversion."
    },
    {
      number: "04",
      title: "Development",
      description: "Building fast, scalable and maintainable applications."
    },
    {
      number: "05",
      title: "Testing & QA",
      description: "Cross-browser testing, performance optimization and bug fixing."
    },
    {
      number: "06",
      title: "Launch & Growth",
      description: "Deployment, monitoring, analytics and continuous improvements."
    }
  ];

  // Variants for timeline card entrance animations
  const cardVariantsLeft = {
    hidden: { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
  };

  const cardVariantsRight = {
    hidden: { opacity: 0, x: 80 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
  };

  // Variants for timeline dot scale & fade
  const dotVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: [0.8, 1.2, 1], 
      transition: { duration: 0.6, ease: "easeOut" as const, delay: 0.15 } 
    }
  };

  return (
    <section 
      ref={timelineRef} 
      className="relative w-full bg-white pt-4 pb-12 md:pt-6 md:pb-16 overflow-hidden z-10 select-none"
    >
      {/* Subtle radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-50/20 via-white to-white pointer-events-none -z-10" />

      {/* Section Title */}
      <div className="max-w-3xl mx-auto px-6 text-center mb-20 md:mb-28">
        <span className="text-[10px] font-bold uppercase tracking-widest text-pink-500 mb-3 block">
          OUR PROCESS
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-900 tracking-tight leading-none uppercase mb-6">
          How We Build Digital Products
        </h2>
        <p className="text-zinc-500 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          From idea to launch, every project follows a structured process focused on performance, scalability and user experience.
        </p>
      </div>

      {/* Timeline Wrapper */}
      <div className="max-w-5xl mx-auto px-6 relative">
        {/* Dynamic vertical connector line */}
        <div className="absolute left-[22px] md:left-1/2 -translate-x-1/2 top-4 bottom-4 w-[2px] bg-zinc-100">
          <motion.div
            style={{ scaleY, transformOrigin: "top" }}
            className="w-full h-full bg-pink-500 origin-top"
          />
        </div>

        {/* Steps loop */}
        <div className="flex flex-col gap-12 md:gap-20">
          {steps.map((step, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="relative flex flex-row items-start md:justify-center md:items-center gap-6 md:gap-12 w-full"
              >
                {/* Left Side Column (Desktop: Card or Spacer) */}
                <div className="hidden md:flex md:w-[calc(50%-2.5rem)] justify-end order-1">
                  {isEven ? (
                    <motion.div 
                      variants={cardVariantsLeft}
                      className="w-full max-w-md bg-white rounded-2xl p-6 md:p-8 shadow-lg shadow-zinc-100 border border-zinc-100/80 text-right flex flex-col items-end gap-3"
                    >
                      <span className="text-xs font-black tracking-widest text-pink-500 bg-pink-50 px-2.5 py-1 rounded-full w-fit">
                        {step.number}
                      </span>
                      <h3 className="text-xl md:text-2xl font-black text-zinc-900 tracking-tight leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-zinc-500 text-xs sm:text-sm font-medium leading-relaxed max-w-[90%]">
                        {step.description}
                      </p>
                    </motion.div>
                  ) : (
                    <div className="w-full max-w-md h-10" />
                  )}
                </div>

                {/* Center dot wrapper */}
                <div className="relative z-10 w-8 md:w-12 flex justify-center items-center order-1 md:order-2 flex-shrink-0 mt-2 md:mt-0">
                  <motion.div
                    variants={dotVariants}
                    className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-pink-500 border-4 border-white shadow-md ring-2 ring-pink-500/20"
                  />
                </div>

                {/* Right Side Column (Desktop: Card or Spacer | Mobile: Card always) */}
                <div className="flex w-full md:w-[calc(50%-2.5rem)] justify-start order-2 md:order-3">
                  {/* Desktop Card (Odd index) */}
                  {!isEven && (
                    <motion.div 
                      variants={cardVariantsRight}
                      className="w-full max-w-md bg-white rounded-2xl p-6 md:p-8 shadow-lg shadow-zinc-100 border border-zinc-100/80 text-left hidden md:flex flex-col items-start gap-3"
                    >
                      <span className="text-xs font-black tracking-widest text-pink-500 bg-pink-50 px-2.5 py-1 rounded-full w-fit">
                        {step.number}
                      </span>
                      <h3 className="text-xl md:text-2xl font-black text-zinc-900 tracking-tight leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-zinc-500 text-xs sm:text-sm font-medium leading-relaxed max-w-[90%]">
                        {step.description}
                      </p>
                    </motion.div>
                  )}

                  {/* Mobile Card (Always visible on mobile viewports) */}
                  <motion.div 
                    variants={cardVariantsRight}
                    className="w-full max-w-md bg-white rounded-2xl p-6 md:p-8 shadow-lg shadow-zinc-100 border border-zinc-100/80 text-left flex md:hidden flex-col items-start gap-3"
                  >
                    <span className="text-xs font-black tracking-widest text-pink-500 bg-pink-50 px-2.5 py-1 rounded-full w-fit">
                      {step.number}
                    </span>
                    <h3 className="text-xl md:text-2xl font-black text-zinc-900 tracking-tight leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-zinc-500 text-xs sm:text-sm font-medium leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

interface RevealTextProps {
  text?: string;
  textColor?: string;
  overlayColor?: string;
  fontSize?: string;
  letterDelay?: number;
  overlayDelay?: number;
  overlayDuration?: number;
  springDuration?: number;
  letterImages?: string[];
}

function RevealText({
  text = "STUNNING",
  textColor = "text-white",
  overlayColor = "text-red-500",
  fontSize = "text-[250px]",
  letterDelay = 0.08,
  overlayDelay = 0.05,
  overlayDuration = 0.4,
  springDuration = 600,
  letterImages = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  ]
}: RevealTextProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showRedText, setShowRedText] = useState(false);
  
  useEffect(() => {
    const lastLetterDelay = (text.length - 1) * letterDelay;
    const totalDelay = (lastLetterDelay * 1000) + springDuration;
    
    const timer = setTimeout(() => {
      setShowRedText(true);
    }, totalDelay);
    
    return () => clearTimeout(timer);
  }, [text.length, letterDelay, springDuration]);

  return (
    <div className="flex items-center justify-center relative">
      <div className="flex">
        {text.split("").map((letter, index) => (
          <motion.span
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`${fontSize} font-black tracking-tight cursor-pointer relative overflow-hidden`}
            initial={{ 
              scale: 0,
              opacity: 0,
            }}
            animate={{ 
              scale: 1,
              opacity: 1,
            }}
            transition={{
              delay: index * letterDelay,
              type: "spring" as const,
              damping: 8,
              stiffness: 200,
              mass: 0.8,
            }}
          >
            {/* Base text layer */}
            <motion.span 
              className={`absolute inset-0 ${textColor}`}
              animate={{ 
                opacity: hoveredIndex === index ? 0 : 1 
              }}
              transition={{ duration: 0.1 }}
            >
              {letter}
            </motion.span>
            {/* Image text layer with background panning */}
            <motion.span
              className="text-transparent bg-clip-text bg-cover bg-no-repeat"
              animate={{ 
                opacity: hoveredIndex === index ? 1 : 0,
                backgroundPosition: hoveredIndex === index ? "10% center" : "0% center"
              }}
              transition={{ 
                opacity: { duration: 0.1 },
                backgroundPosition: { 
                  duration: 3,
                  ease: "easeInOut" as const
                }
              }}
              style={{
                backgroundImage: `url('${letterImages[index % letterImages.length]}')`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {letter}
            </motion.span>
            
            {/* Overlay text layer that sweeps across each letter */}
            {showRedText && (
              <motion.span
                className={`absolute inset-0 ${overlayColor} pointer-events-none`}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 1, 1, 0]
                }}
                transition={{
                  delay: index * overlayDelay,
                  duration: overlayDuration,
                  times: [0, 0.1, 0.7, 1],
                  ease: "easeInOut" as const
                }}
              >
                {letter}
              </motion.span>
            )}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

function WebDevServicesGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      category: "ARCHITECTURE",
      title: "Frontend Engineering",
      description: "Bespoke Next.js and React architectures built for fluid performance, optimized for server-side rendering, type-safety, and interactive web elements.",
      icon: Code2,
    },
    {
      category: "COMMERCE",
      title: "Headless E-Commerce",
      description: "Ultra-fast headless architectures integrating Shopify or custom databases with Stripe, real-time inventory management, and tailored multi-step checkout solutions.",
      icon: ShoppingBag,
    },
    {
      category: "ANALYTICS",
      title: "Data Dashboards & SaaS",
      description: "Secure visual control centers featuring interactive charting, real-time metrics powered by WebSockets, and customized multi-tier access roles.",
      icon: BarChart3,
    },
    {
      category: "OPTIMIZATION",
      title: "Performance & SEO Audit",
      description: "Granular engineering adjustments ensuring sub-second load times, 99+ Core Web Vitals, globally distributed edge caching, and structured schema SEO markup.",
      icon: Rocket,
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.15,
        duration: 0.6,
        ease: "easeOut" as const
      }
    })
  };

  return (
    <section ref={containerRef} className="relative w-full bg-[#FAF9F6] py-16 md:py-24 overflow-hidden z-10 select-none border-b border-zinc-100">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-[10px] font-bold uppercase tracking-widest text-pink-500 mb-3 block">
            CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-900 tracking-tight leading-none uppercase mb-6">
            Engineering Tailored Web Services
          </h2>
          <p className="text-zinc-500 text-sm sm:text-base leading-relaxed max-w-2xl font-medium">
            We build high-performance web products that scale. From interactive web apps to robust transactional architectures, our systems are designed to deliver flawless experiences.
          </p>
        </div>

        {/* 2x2 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl p-8 border border-zinc-100 shadow-md shadow-zinc-200/40 hover:shadow-xl hover:shadow-zinc-200/50 hover:border-pink-500/10 transition-shadow duration-300 flex flex-col justify-between min-h-[220px]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-pink-500">
                      {svc.category}
                    </span>
                    <h3 className="text-xl md:text-2xl font-black text-zinc-800 tracking-tight">
                      {svc.title}
                    </h3>
                  </div>
                  <div className="p-3 bg-pink-50/50 rounded-xl text-pink-500 flex-shrink-0">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                </div>
                
                <p className="text-zinc-500 text-xs sm:text-sm font-medium leading-relaxed mt-4 mb-6">
                  {svc.description}
                </p>

                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-800 hover:text-pink-500 transition-colors cursor-pointer mt-auto">
                  Explore Tech Stack
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
