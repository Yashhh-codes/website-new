"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoreVertical, X } from "lucide-react";

const menuItems = [
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Studio", href: "#studio" },
  { label: "Sectors", href: "#sectors" },
  { label: "Insights", href: "#insights" },
] as const;

export function MobileFloatingMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle ESC key press to close menu
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* ── Closed State Floating Button ── */}
      {!isOpen && (
        <button
          type="button"
          onClick={openMenu}
          aria-label="Open menu"
          className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 
          flex items-center gap-3 px-6 py-3 rounded-full 
          bg-zinc-950/40 backdrop-blur-xl border border-white/15
          shadow-[0_12px_40px_-10px_rgba(0,0,0,0.3)] text-white/95 
          font-semibold text-xs tracking-[0.25em] select-none cursor-pointer uppercase 
          hover:scale-105 hover:bg-zinc-900/50 hover:border-white/25 active:scale-95 transition-all duration-300 focus:outline-none"
          style={{ bottom: "calc(1.5rem + env(safe-area-inset-bottom))" }}
        >
          <span>Menu</span>
          <MoreVertical className="w-3.5 h-3.5 text-zinc-300" strokeWidth={2.8} />
        </button>
      )}

      {/* ── Fullscreen Overlay Navigation ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 bg-black/45 backdrop-blur-md z-50 flex items-center justify-center p-6"
            onClick={closeMenu}
          >
            {/* Centered Navigation Card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300, duration: 0.4 }}
              className="bg-white w-full max-w-[320px] rounded-[2.5rem] p-10 shadow-2xl flex flex-col items-center relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Navigation Items */}
              <motion.div
                variants={{
                  animate: {
                    transition: {
                      staggerChildren: 0.05,
                    },
                  },
                }}
                initial="initial"
                animate="animate"
                className="flex flex-col items-center gap-5 w-full"
              >
                {menuItems.map((item) => (
                  <motion.a
                    key={item.label}
                    variants={{
                      initial: { y: 15, opacity: 0 },
                      animate: {
                        y: 0,
                        opacity: 1,
                        transition: { type: "spring", stiffness: 150, damping: 15 },
                      },
                    }}
                    href={item.href}
                    onClick={closeMenu}
                    className="text-zinc-500 font-semibold text-3xl tracking-tight transition-all duration-300 
                    hover:text-red-500 hover:scale-105 hover:-translate-y-0.5 active:scale-95 block"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </motion.div>

              {/* Divider */}
              <div className="w-[120px] h-[1px] bg-zinc-100 my-6" />

              {/* Contact Section */}
              <div className="flex flex-col items-center gap-4 w-full">
                <span className="text-zinc-800 font-bold text-lg tracking-wide">Contact us</span>
                <div className="flex items-center gap-4">
                  <a
                    href="https://www.instagram.com/yourcreative.co/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-500 
                    hover:bg-red-500 hover:border-red-500 hover:text-white transition-all duration-300 hover:scale-110 active:scale-90"
                  >
                    <svg className="w-4 h-4 fill-current" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <title>Instagram</title>
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/your-creative/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-500 
                    hover:bg-red-500 hover:border-red-500 hover:text-white transition-all duration-300 hover:scale-110 active:scale-90"
                  >
                    <svg className="w-4 h-4 fill-current" role="img" viewBox="0 0 28 27" xmlns="http://www.w3.org/2000/svg">
                      <title>LinkedIn</title>
                      <path d="M5.9748 3.27842C5.97442 4.04937 5.67104 4.78858 5.1314 5.33345C4.59177 5.87832 3.86007 6.18421 3.09729 6.18382C2.33451 6.18344 1.60312 5.87681 1.06402 5.3314C0.524923 4.78598 0.222275 4.04646 0.222657 3.27552C0.223038 2.50457 0.526418 1.76535 1.06606 1.22049C1.60569 0.675619 2.33739 0.369732 3.10017 0.370118C3.86295 0.370503 4.59434 0.677129 5.13344 1.22254C5.67254 1.76796 5.97519 2.50748 5.9748 3.27842ZM6.06109 8.33634H0.308939V26.5332H6.06109V8.33634ZM15.1495 8.33634H9.42609V26.5332H15.092V16.9842C15.092 11.6647 21.9514 11.1705 21.9514 16.9842V26.5332H27.6316V15.0076C27.6316 6.03993 17.4791 6.37422 15.092 10.7781L15.1495 8.33634Z" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Floating CLOSE Button */}
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close menu"
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60]
              flex items-center gap-2 px-6 py-3 rounded-full 
              bg-zinc-950/40 backdrop-blur-xl border border-white/15
              shadow-[0_12px_40px_-10px_rgba(0,0,0,0.3)] text-white/95 
              font-semibold text-xs tracking-[0.25em] select-none cursor-pointer uppercase 
              hover:scale-105 hover:bg-zinc-900/50 hover:border-white/25 active:scale-95 transition-all duration-300 focus:outline-none"
              style={{ bottom: "calc(1.5rem + env(safe-area-inset-bottom))" }}
            >
              <span>Close</span>
              <X className="w-3.5 h-3.5 text-zinc-300" strokeWidth={2.8} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default MobileFloatingMenu;
