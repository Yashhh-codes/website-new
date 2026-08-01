'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Home, Briefcase, Folder, Compass, Layers, MessageSquare } from 'lucide-react';

// --- HoverGradientNavBar Component ---

interface HoverGradientMenuItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  gradient: string;
  iconColor: string;
}

const menuItems: HoverGradientMenuItem[] = [
  { icon: <Home className="h-4 w-4" />, label: "Home", href: "/", gradient: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)", iconColor: "group-hover:text-blue-500 dark:group-hover:text-blue-400" },
  { icon: <Briefcase className="h-4 w-4" />, label: "Services", href: "/services", gradient: "radial-gradient(circle, rgba(236,72,153,0.15) 0%, rgba(219,39,119,0.06) 50%, rgba(190,24,93,0) 100%)", iconColor: "group-hover:text-pink-500 dark:group-hover:text-pink-400" },
  { icon: <Folder className="h-4 w-4" />, label: "Projects", href: "/#projects", gradient: "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)", iconColor: "group-hover:text-green-500 dark:group-hover:text-green-400" },
  { icon: <Compass className="h-4 w-4" />, label: "Studio", href: "/#studio", gradient: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)", iconColor: "group-hover:text-orange-500 dark:group-hover:text-orange-400" },
  { icon: <Layers className="h-4 w-4" />, label: "Sectors", href: "/#sectors", gradient: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)", iconColor: "group-hover:text-blue-500 dark:group-hover:text-blue-400" },
  { icon: <MessageSquare className="h-4 w-4" />, label: "Insights", href: "/#insights", gradient: "radial-gradient(circle, rgba(147,51,234,0.15) 0%, rgba(126,34,206,0.06) 50%, rgba(88,28,135,0) 100%)", iconColor: "group-hover:text-purple-500 dark:group-hover:text-purple-400" },
];

// Animation variants
const itemVariants: Variants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
};

const backVariants: Variants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
};

const glowVariants: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      scale: { duration: 0.5, type: "spring", stiffness: 300, damping: 25 },
    },
  },
};

const sharedTransition = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
  duration: 0.5,
};

export function HoverGradientNavBar(): React.JSX.Element {
  return (
    <div className="hidden md:block absolute top-6 left-0 w-full md:left-1/2 md:-translate-x-1/2 z-50">
      <motion.nav
        className="w-[92%] md:w-fit mx-auto px-1.5 md:px-3 py-1.5 md:py-2 rounded-xl md:rounded-2xl 
        bg-white/95 dark:bg-black/90 backdrop-blur-lg 
        border border-gray-200/80 dark:border-gray-800/80 
        shadow-lg md:shadow-xl relative"
        initial="initial"
        whileHover="hover"
      >
        <ul className="flex items-center justify-around md:justify-center gap-0.5 md:gap-2 relative z-10">
          {menuItems.map((item: HoverGradientMenuItem) => (
            <motion.li key={item.label} className="relative flex-1 md:flex-none">
              <motion.div
                className="block rounded-lg md:rounded-xl overflow-visible group relative"
                style={{ perspective: "600px" }}
                whileHover="hover"
                initial="initial"
              >
                {/* Per-item glow */}
                <motion.div
                  className="absolute inset-0 z-0 pointer-events-none rounded-lg md:rounded-xl"
                  variants={glowVariants}
                  style={{
                    background: item.gradient,
                    opacity: 0,
                  }}
                />
                {/* Front-facing */}
                <motion.a
                  href={item.href}
                  className="flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-1.5 
                  px-1.5 py-1 md:px-3 md:py-1.5 relative z-10 
                  bg-transparent text-gray-600 dark:text-gray-300 
                  group-hover:text-gray-900 dark:group-hover:text-white 
                  transition-colors rounded-lg md:rounded-xl text-[10px] md:text-xs"
                  variants={itemVariants}
                  transition={sharedTransition}
                  style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: "center bottom"
                  }}
                >
                  <span className={`transition-colors duration-300 ${item.iconColor}`}>
                    {item.icon}
                  </span>
                  <span className="hidden md:inline font-medium">{item.label}</span>
                </motion.a>
                {/* Back-facing */}
                <motion.a
                  href={item.href}
                  className="flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-1.5 
                  px-1.5 py-1 md:px-3 md:py-1.5 absolute inset-0 z-10 
                  bg-transparent text-gray-600 dark:text-gray-300 
                  group-hover:text-gray-900 dark:group-hover:text-white 
                  transition-colors rounded-lg md:rounded-xl text-[10px] md:text-xs"
                  variants={backVariants}
                  transition={sharedTransition}
                  style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: "center top",
                    transform: "rotateX(90deg)"
                  }}
                >
                  <span className={`transition-colors duration-300 ${item.iconColor}`}>
                    {item.icon}
                  </span>
                  <span className="hidden md:inline font-medium">{item.label}</span>
                </motion.a>
              </motion.div>
            </motion.li>
          ))}
        </ul>
      </motion.nav>
    </div>
  );
}

export default HoverGradientNavBar;
