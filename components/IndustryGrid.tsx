'use client';

import React from 'react';

interface IndustryItem {
  icon: React.ReactNode;
  title: string;
  href: string;
}

const column1Items: IndustryItem[] = [
  {
    icon: (
      <svg className="w-[60px] h-[60px] text-[#0d9488] stroke-current stroke-[1.25] fill-none transition-transform duration-300 group-hover:scale-110" viewBox="0 0 100 100">
        <polygon points="50,15 80,32 80,68 50,85 20,68 20,32" />
        <path d="M38,50 H62 M54,42 L62,50 L54,58" />
      </svg>
    ),
    title: "Transportation\n& Mobility",
    href: "#"
  },
  {
    icon: (
      <svg className="w-[60px] h-[60px] text-[#0d9488] stroke-current stroke-[1.25] fill-none transition-transform duration-300 group-hover:scale-110" viewBox="0 0 100 100">
        <polygon points="50,15 80,32 80,68 50,85 20,68 20,32" />
        <polygon points="50,35 68,48 68,68 50,80 32,68 32,48" />
      </svg>
    ),
    title: "Sports, Gaming\n& Entertainment",
    href: "#"
  }
];

const column2Items: IndustryItem[] = [
  {
    icon: (
      <svg className="w-[60px] h-[60px] text-[#0d9488] stroke-current stroke-[1.25] fill-none transition-transform duration-300 group-hover:scale-110" viewBox="0 0 100 100">
        <polygon points="50,15 80,32 80,68 50,85 20,68 20,32" />
        <circle cx="50" cy="15" r="3" className="fill-[#0d9488]" />
        <circle cx="80" cy="32" r="3" className="fill-[#0d9488]" />
        <circle cx="80" cy="68" r="3" className="fill-[#0d9488]" />
        <circle cx="50" cy="85" r="3" className="fill-[#0d9488]" />
        <circle cx="20" cy="68" r="3" className="fill-[#0d9488]" />
        <circle cx="20" cy="32" r="3" className="fill-[#0d9488]" />
      </svg>
    ),
    title: "Personal Care\n& Lifestyle",
    href: "#"
  },
  {
    icon: (
      <svg className="w-[60px] h-[60px] text-[#0d9488] stroke-current stroke-[1.25] fill-none transition-transform duration-300 group-hover:scale-110" viewBox="0 0 100 100">
        <path d="M50,80 V40 L70,25 M50,55 L30,40" />
        <circle cx="70" cy="25" r="4" className="fill-[#0d9488]" />
        <circle cx="30" cy="40" r="4" className="fill-[#0d9488]" />
        <circle cx="50" cy="40" r="4" className="fill-[#0d9488]" />
      </svg>
    ),
    title: "Food & Beverage",
    href: "#"
  },
  {
    icon: (
      <svg className="w-[60px] h-[60px] text-[#0d9488] stroke-current stroke-[1.25] fill-none transition-transform duration-300 group-hover:scale-110" viewBox="0 0 100 100">
        <path d="M20,80 V40 C20,25 35,15 50,15 C65,15 80,25 80,40 V80" />
        <path d="M35,80 V45 C35,35 42,30 50,30 C58,30 65,35 65,45 V80" />
      </svg>
    ),
    title: "Infrastructure\n& Real Estate",
    href: "#"
  }
];

const column3Items: IndustryItem[] = [
  {
    icon: (
      <svg className="w-[60px] h-[60px] text-[#0d9488] stroke-current stroke-[1.25] fill-none transition-transform duration-300 group-hover:scale-110" viewBox="0 0 100 100">
        <circle cx="50" cy="25" r="6" />
        <circle cx="25" cy="65" r="6" />
        <circle cx="75" cy="65" r="6" />
        <line x1="50" y1="31" x2="25" y2="59" />
        <line x1="50" y1="31" x2="75" y2="59" />
        <line x1="31" y1="65" x2="69" y2="65" />
      </svg>
    ),
    title: "Consumer Durables",
    href: "#"
  },
  {
    icon: (
      <svg className="w-[60px] h-[60px] text-[#0d9488] stroke-current stroke-[1.25] fill-none transition-transform duration-300 group-hover:scale-110" viewBox="0 0 100 100">
        <path d="M30,30 C30,60 50,75 50,75 C50,75 70,60 70,30" />
        <path d="M40,20 H60 M50,20 V30" />
        <circle cx="30" cy="30" r="3" className="fill-[#0d9488]" />
        <circle cx="70" cy="30" r="3" className="fill-[#0d9488]" />
      </svg>
    ),
    title: "Pharma &\nHealthcare",
    href: "#"
  },
  {
    icon: (
      <svg className="w-[60px] h-[60px] text-[#0d9488] stroke-current stroke-[1.25] fill-none transition-transform duration-300 group-hover:scale-110" viewBox="0 0 100 100">
        <path d="M25,65 L45,45 L60,55 L80,30" />
        <polyline points="70,30 80,30 80,40" />
        <path d="M20,80 H80" />
      </svg>
    ),
    title: "Financial Services\n& Fintech",
    href: "#"
  }
];

const GridCell = ({ item }: { item: IndustryItem }) => {
  return (
    <a
      href={item.href}
      className="group flex flex-col justify-between items-start p-8 md:p-12 w-full min-h-[260px] md:min-h-[300px] 
      bg-[#FAF9F6] border-b border-r border-black/5 hover:bg-[#F5F4EF]/60 
      transition-all duration-300 ease-in-out focus:outline-none"
    >
      <div>
        {item.icon}
      </div>
      <div className="mt-8">
        <h3 className="text-2xl md:text-3xl font-extrabold text-[#09090b] leading-none tracking-tight whitespace-pre-line inline-flex items-center gap-1.5">
          {item.title}
          <span className="text-[#0d9488] inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1">
            ↘
          </span>
        </h3>
      </div>
    </a>
  );
};

const IllustrationCell = () => {
  return (
    <div className="relative w-full min-h-[340px] bg-[#FAF9F6] border-b border-r border-black/5 p-8 md:p-12 flex flex-col justify-between overflow-hidden group">
      
      {/* Exploration Text Overlay background */}
      <div className="absolute top-10 left-10 pointer-events-none opacity-[0.03] select-none">
        <span className="text-7xl font-black text-black tracking-widest uppercase">
          EXPLORE
        </span>
      </div>

      {/* Scattered line elements & circles background */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
        <circle cx="90%" cy="20%" r="2" fill="#0d9488" />
        <circle cx="80%" cy="80%" r="3" fill="#ff9048" />
        <line x1="75%" y1="15%" x2="85%" y2="25%" stroke="#000" strokeWidth="0.5" strokeDasharray="3 3" />
        <line x1="10%" y1="75%" x2="25%" y2="85%" stroke="#0d9488" strokeWidth="0.5" />
      </svg>

      {/* Custom Vector Line Character kneeling with telescope */}
      <div className="absolute right-6 bottom-4 w-[160px] h-[180px] pointer-events-none opacity-80 md:opacity-100 transition-transform duration-500 group-hover:scale-105">
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#0d9488] stroke-[1.25] fill-none">
          {/* Kneeling Legs */}
          <path d="M20,90 H50 L40,75 L20,90 Z" />
          <path d="M50,90 H80 L70,70 L50,90 Z" />
          {/* Torso */}
          <path d="M45,75 V50 H60 V70" />
          {/* Arms holding Telescope */}
          <path d="M58,50 L75,40" />
          <path d="M50,55 L70,42" />
          {/* Telescope */}
          <line x1="55" y1="48" x2="85" y2="35" strokeWidth="2" stroke="#0d9488" />
          <polygon points="82,33 88,31 87,38 81,40" className="fill-[#0d9488]/10" />
          {/* Head */}
          <circle cx="50" cy="40" r="7" />
          {/* Floating dots & dashes around telescope path */}
          <circle cx="92" cy="32" r="1.5" className="fill-[#0d9488]" />
          <line x1="88" y1="30" x2="94" y2="28" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="relative z-10">
        {/* Empty spacing to allow illustration room */}
      </div>

      {/* Floating search input */}
      <div className="relative z-10 w-full max-w-[280px] bg-zinc-50 border border-black/10 rounded-xl p-3 flex items-center gap-3 transition-colors duration-300 focus-within:border-[#0d9488]/40">
        <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input 
          type="text" 
          placeholder="What are you looking for?" 
          className="bg-transparent text-sm text-[#09090b] placeholder-zinc-400 focus:outline-none w-full"
        />
      </div>
    </div>
  );
};

export function IndustryGrid() {
  return (
    <section className="bg-[#FAF9F6] border-t border-black/5 relative z-10 w-full pb-20">
      <div className="flex flex-col md:flex-row w-full border-l border-black/5">
        
        {/* Column 1 - ~40% width */}
        <div className="w-full md:w-[38%] flex flex-col">
          <GridCell item={column1Items[0]} />
          <IllustrationCell />
          <GridCell item={column1Items[1]} />
        </div>

        {/* Column 2 - ~31% width */}
        <div className="w-full md:w-[31%] flex flex-col border-l border-black/5">
          <GridCell item={column2Items[0]} />
          <GridCell item={column2Items[1]} />
          <GridCell item={column2Items[2]} />
        </div>

        {/* Column 3 - ~31% width */}
        <div className="w-full md:w-[31%] flex flex-col border-l border-black/5">
          <GridCell item={column3Items[0]} />
          <GridCell item={column3Items[1]} />
          <GridCell item={column3Items[2]} />
        </div>

      </div>

      {/* Segmented Floating Pill Nav */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
        <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-[#0d131a]/90 border border-black/5 shadow-2xl backdrop-blur-md">
          {/* Grid Layout Icon Button */}
          <button className="p-2.5 rounded-full text-zinc-500 hover:text-white transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="9" />
              <rect x="14" y="3" width="7" height="5" />
              <rect x="14" y="12" width="7" height="9" />
              <rect x="3" y="16" width="7" height="5" />
            </svg>
          </button>
          
          {/* Services Button */}
          <a
            href="#services"
            className="px-5 py-1.5 text-xs font-semibold rounded-full text-zinc-400 hover:text-white transition-colors"
          >
            Services
          </a>

          {/* Industry active Button */}
          <button
            className="px-5 py-1.5 text-xs font-semibold rounded-full bg-[#0d9488]/10 text-[#0d9488] border border-[#0d9488]/20 shadow-sm"
          >
            Industry
          </button>
        </div>
      </div>
    </section>
  );
}

export default IndustryGrid;
