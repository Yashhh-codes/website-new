'use client';

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, CheckCircle2, RefreshCw, Fingerprint, Printer, Code2, TrendingUp, Palette, Box, Film, Gift } from "lucide-react";
import { heroHtml } from "../page";
import HoverGradientNavBar from "@/components/HoverGradientNavBar";
import MobileFloatingMenu from "@/components/MobileFloatingMenu";
import CinematicFooter from "@/components/CinematicFooter";

interface ServiceItem {
  title: string;
  slug: string;
  description: string;
  count: string;
  tag: string;
  color: string;
}

const servicesList: ServiceItem[] = [
  {
    title: "Branding",
    slug: "branding",
    description: "Crafting iconic brand identities, guidelines, and visual narratives that resonate with target audiences.",
    count: "18 projects",
    tag: "Strategy & Identity",
    color: "rgba(242, 139, 168, 0.1)",
  },
  {
    title: "Printing",
    slug: "printing",
    description: "Premium physical assets, bespoke editorial layouts, corporate stationery, and high-end collateral.",
    count: "12 projects",
    tag: "Editorial & Print",
    color: "rgba(255, 179, 123, 0.1)",
  },
  {
    title: "Web Development",
    slug: "web-development",
    description: "Next-gen web applications, corporate websites, e-commerce storefronts, and premium custom development.",
    count: "24 projects",
    tag: "Code & Strategy",
    color: "rgba(110, 168, 254, 0.1)",
  },
  {
    title: "Digital Marketing",
    slug: "digital-marketing",
    description: "Data-driven performance campaigns, SEO strategy, social media growth, and content marketing funnels.",
    count: "15 projects",
    tag: "Growth & Visibility",
    color: "rgba(126, 203, 231, 0.1)",
  },
  {
    title: "Graphic Design",
    slug: "graphic-design",
    description: "Sophisticated editorial systems, marketing assets, layouts, and illustrative design solutions.",
    count: "20 projects",
    tag: "Art Direction",
    color: "rgba(198, 166, 255, 0.1)",
  },
  {
    title: "Packaging Design",
    slug: "packaging-design",
    description: "Eco-friendly, tactile, and highly memorable product packaging that commands shelf presence.",
    count: "9 projects",
    tag: "Industrial & Visual",
    color: "rgba(126, 244, 203, 0.1)",
  },
  {
    title: "Video Production",
    slug: "video-production",
    description: "Cinematic commercial spots, brand storytelling, social content, and dynamic motion graphics.",
    count: "11 projects",
    tag: "Motion & Film",
    color: "rgba(242, 139, 230, 0.1)",
  },
  {
    title: "Corporate Gifting",
    slug: "corporate-gifting",
    description: "Bespoke, curated physical merchandise and premium corporate gifts that build lasting relationships.",
    count: "7 projects",
    tag: "Merchandise & Curation",
    color: "rgba(126, 231, 135, 0.1)",
  },
];

interface ServiceRowProps {
  rowCards: ServiceItem[];
  rowIndex: number;
  cols: number;
}

function ServiceRow({ rowCards, rowIndex, cols }: ServiceRowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const direction = rowIndex % 2 === 0 ? 1 : -1;
  const initialXValue = direction === 1 ? "100vw" : "-100vw";
  const x = useTransform(scrollYProgress, [0, 0.45], [initialXValue, "0vw"]);
  const opacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);

  return (
    <div ref={ref} className="w-full overflow-hidden">
      <motion.div
        style={{ x, opacity, willChange: "transform, opacity" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {rowCards.map((service) => (
          <motion.div
            key={service.slug}
            whileHover={{ y: -8, scale: 1.015, boxShadow: `0 20px 40px ${service.color.replace('0.1', '0.25')}` }}
            className="group relative flex flex-col justify-between p-8 rounded-2xl bg-white border border-black/5 hover:border-black/10 transition-all duration-300 min-h-[280px] cursor-pointer"
          >
            <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-3xl rounded-tr-2xl transition-all duration-500 pointer-events-none group-hover:scale-125 group-hover:rotate-6" style={{ backgroundColor: service.color }} />
            
            <div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-3 group-hover:text-zinc-500 transition-colors duration-300">
                {service.tag}
              </div>
              <h3 className="text-2xl font-black text-zinc-800 tracking-tight group-hover:text-pink-500 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-zinc-500 text-sm mt-3 leading-relaxed max-w-[90%] transition-colors duration-300">
                {service.description}
              </p>
            </div>

            <div className="flex items-center justify-between mt-8 pt-4 border-t border-black/5">
              <span className="text-xs font-semibold text-zinc-400">{service.count}</span>
              <Link
                href={`/services/${service.slug}`}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-800 hover:text-pink-500 transition-colors duration-200"
              >
                Explore Service
                <ArrowRight className="w-4 h-4 text-pink-500 group-hover:translate-x-2 transition-transform duration-300 ease-out" />
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default function ServicesClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cols, setCols] = useState(3);

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setCols(3);
      } else if (window.innerWidth >= 768) {
        setCols(2);
      } else {
        setCols(1);
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

      {/* Services Landing Hero Banner - Premium Redesign */}
      <section className="relative z-10 px-6 pt-24 pb-16 md:pt-40 md:pb-24 max-w-6xl mx-auto overflow-hidden">
        {/* Soft abstract mesh glow behind hero */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-pink-100/20 blur-[100px] -z-10 pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-100/20 blur-[100px] -z-10 pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column - Headline & Description */}
          <div className="lg:col-span-6 flex flex-col items-start text-left gap-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 px-3 py-1 rounded-full border border-black/10 bg-white/50 backdrop-blur-sm text-xs font-semibold tracking-wider uppercase text-zinc-600"
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-500" />
              Holistic Capabilities
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-6xl font-black tracking-tight text-zinc-950 leading-tight"
            >
              A Synergy of Brand, Code, and Physical Craft.
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-zinc-500 text-sm md:text-base leading-relaxed max-w-xl"
            >
              We dissolve the boundaries between physical craftsmanship and digital precision, delivering a unified suite of services that elevate your brand and engage customers across every touchpoint.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex items-center gap-4 mt-2"
            >
              <a
                href="#capabilities"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("capabilities")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-950 text-white font-semibold text-xs md:text-sm hover:bg-zinc-800 transition-all duration-200"
              >
                View Capabilities
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>

          {/* Right Column - Interactive Floating Node Grid */}
          <div className="lg:col-span-6 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-4 max-w-lg mx-auto"
            >
              {[
                { name: "Branding", icon: <Fingerprint className="w-5 h-5 text-pink-500" />, desc: "Visual identity systems", color: "hover:border-pink-500/30 hover:bg-pink-500/[0.02]", link: "/services/branding" },
                { name: "Printing", icon: <Printer className="w-5 h-5 text-orange-500" />, desc: "Premium tangible assets", color: "hover:border-orange-500/30 hover:bg-orange-500/[0.02]", link: "/services/printing" },
                { name: "Web Dev", icon: <Code2 className="w-5 h-5 text-blue-500" />, desc: "Next-gen code", color: "hover:border-blue-500/30 hover:bg-blue-500/[0.02]", link: "/services/web-development" },
                { name: "Marketing", icon: <TrendingUp className="w-5 h-5 text-cyan-500" />, desc: "Performance strategy", color: "hover:border-cyan-500/30 hover:bg-cyan-500/[0.02]", link: "/services/digital-marketing" },
                { name: "Design", icon: <Palette className="w-5 h-5 text-purple-500" />, desc: "Art direction & systems", color: "hover:border-purple-500/30 hover:bg-purple-500/[0.02]", link: "/services/graphic-design" },
                { name: "Packaging", icon: <Box className="w-5 h-5 text-emerald-500" />, desc: "Tactile unboxing flows", color: "hover:border-emerald-500/30 hover:bg-emerald-500/[0.02]", link: "/services/packaging-design" },
                { name: "Video", icon: <Film className="w-5 h-5 text-rose-500" />, desc: "Storytelling & motion", color: "hover:border-rose-500/30 hover:bg-rose-500/[0.02]", link: "/services/video-production" },
                { name: "Gifting", icon: <Gift className="w-5 h-5 text-green-500" />, desc: "Premium merchandise", color: "hover:border-green-500/30 hover:bg-green-500/[0.02]", link: "/services/corporate-gifting" },
              ].map((node, i) => (
                <Link
                  key={node.name}
                  href={node.link}
                  className={`flex items-start gap-3 p-4 rounded-xl bg-white border border-black/5 ${node.color} transition-all duration-300 hover:shadow-[0_8px_20px_rgba(0,0,0,0.02)] group cursor-pointer`}
                >
                  <div className="p-2 rounded-lg bg-zinc-50 group-hover:bg-transparent transition-colors duration-300 flex-shrink-0">
                    {node.icon}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-bold text-sm text-zinc-950 group-hover:text-zinc-800">
                      {node.name}
                    </span>
                    <span className="text-[10px] text-zinc-400 mt-0.5 leading-tight">
                      {node.desc}
                    </span>
                  </div>
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section id="capabilities" className="relative z-10 px-6 py-12 max-w-6xl mx-auto">
        <div className="flex flex-col gap-8">
          {(() => {
            const rows = [];
            for (let i = 0; i < servicesList.length; i += cols) {
              rows.push(servicesList.slice(i, i + cols));
            }
            return rows.map((rowCards, rowIndex) => (
              <ServiceRow
                key={rowIndex}
                rowCards={rowCards}
                rowIndex={rowIndex}
                cols={cols}
              />
            ));
          })()}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative z-10 px-6 py-24 bg-white/40 border-y border-black/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 max-w-[600px] mx-auto">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-zinc-900 mb-4">
              Why Partner With Us
            </h2>
            <p className="text-zinc-500 text-sm md:text-base leading-relaxed">
              We operate at the intersection of creative mastery and conversion strategy. Our work is purpose-built to scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white border border-black/5 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-pink-500">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-zinc-800">Brand-First Thinking</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Everything we build starts with defining a clear brand identity and strategic positioning, ensuring long-term shelf power.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-white border border-black/5 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-500">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-zinc-800">Pixel-Perfect Craft</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                From luxury print packaging to fast dynamic web applications, our quality bar is exceptionally high. We do not skip details.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-white border border-black/5 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-500">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-zinc-800">Result-Driven Flow</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                We manage project lifecycles from start to finish with automated steps, structured feedback, and agile sprint-based delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative z-10 px-6 py-24 max-w-6xl mx-auto">
        <div className="text-center mb-20 max-w-[600px] mx-auto">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-zinc-900 mb-4">
            Our Client Journey
          </h2>
          <p className="text-zinc-500 text-sm md:text-base leading-relaxed">
            Our strategic methodology ensures transparent progress, fast timelines, and world-class product delivery.
          </p>
        </div>

        <div className="relative border-l border-zinc-200 ml-4 md:ml-12 pl-8 md:pl-16 flex flex-col gap-12">
          {[
            { step: "01", title: "Discovery & Alignment", desc: "Understanding your vision, business parameters, target audience, and project goals." },
            { step: "02", title: "Identity & Visual Strategy", desc: "Crafting visual concepts, art direction, and digital architectural frameworks." },
            { step: "03", title: "Iterative Engineering & Production", desc: "Bringing the designs to life using high-end development frameworks and print manufacturing." },
            { step: "04", title: "Quality Assurance & Launch", desc: "Rigorous testing across screen resolutions and visual inspects prior to production deployment." },
          ].map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative group"
            >
              <div className="absolute -left-[45px] md:-left-[81px] top-0 w-8 h-8 rounded-full border-2 border-zinc-200 bg-[#FAF9F6] flex items-center justify-center text-xs font-bold text-zinc-400 group-hover:border-pink-500 group-hover:text-pink-500 transition-colors duration-300">
                {item.step}
              </div>
              <h3 className="text-xl md:text-2xl font-black text-zinc-800 tracking-tight">
                {item.title}
              </h3>
              <p className="text-zinc-500 text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-24 max-w-5xl mx-auto text-center">
        <div className="p-12 rounded-3xl bg-zinc-900 text-white flex flex-col items-center gap-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-[-50px] right-[-50px] w-64 h-64 rounded-full bg-pink-500/10 blur-[60px]" />
          <div className="absolute bottom-[-50px] left-[-50px] w-64 h-64 rounded-full bg-blue-500/10 blur-[60px]" />
          
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white max-w-2xl leading-none">
            Ready to bring your project to life?
          </h2>
          <p className="text-zinc-400 text-sm md:text-base max-w-xl leading-relaxed">
            Let's construct an identity and user experience that sets your brand apart. Contact our creative directors to schedule a call.
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
