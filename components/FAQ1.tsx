"use client";

import React, { useEffect, useMemo, useState } from "react";

const INTRO_STYLE_ID = "faq1-animations";

const faqs = [
  {
    question: "How do you decide which problems to solve first?",
    answer:
      "We map opportunities across impact, feasibility, and effort, then prototype the riskiest assumption within 72 hours to make sure we are shipping momentum, not guesswork.",
    meta: "Discovery",
  },
  {
    question: "What does collaboration look like once we start?",
    answer:
      "A dedicated trio of design, engineering, and strategy meets daily in a shared async dashboard. Decisions are recorded in-line, so the team, stakeholders, and audit trail stay perfectly aligned.",
    meta: "Collaboration",
  },
  {
    question: "Can you adapt to an existing design system or stack?",
    answer:
      "Yes. We map tokens, components, and build steps into our pipeline on day one. If a gap appears, we patch the system with regression tests so velocity never compromises fidelity.",
    meta: "Systems",
  },
  {
    question: "How is quality validated before release?",
    answer:
      "Accessibility sweeps, automated visual diffs, and performance budgets run on every merge. We ship only after the experience hits the expected thresholds on real devices.",
    meta: "Quality",
  },
];

const palettes = {
  dark: {
    surface: "bg-neutral-950 text-neutral-100",
    panel: "bg-neutral-900/30",
    border: "border-white/5",
    heading: "text-white",
    muted: "text-neutral-400",
    iconRing: "border-white/10",
    iconSurface: "bg-white/5",
    icon: "text-white",
    toggle: "border-white/10 text-white hover:border-red-500/40 hover:text-red-500",
    toggleSurface: "bg-white/5",
    glow: "rgba(239, 68, 68, 0.04)",
    aurora: "transparent",
    shadow: "shadow-[0_12px_40px_-20px_rgba(0,0,0,0.5)]",
    overlay: "transparent",
  },
  light: {
    surface: "bg-[#FAF9F6] text-zinc-900",
    panel: "bg-white",
    border: "border-black/5",
    heading: "text-zinc-900",
    muted: "text-zinc-500",
    iconRing: "border-black/5",
    iconSurface: "bg-zinc-50",
    icon: "text-zinc-900",
    toggle: "border-black/10 text-zinc-900 hover:border-red-500/40 hover:text-red-500",
    toggleSurface: "bg-white",
    glow: "rgba(239, 68, 68, 0.04)",
    aurora: "transparent",
    shadow: "shadow-[0_8px_30px_rgba(0,0,0,0.02)]",
    overlay: "transparent",
  },
} as const;

function FAQ1() {
  const getRootTheme = (): "dark" | "light" => {
    if (typeof document === "undefined") return "dark";
    if (document.documentElement.classList.contains("dark")) return "dark";
    if (document.documentElement.classList.contains("light")) return "light";
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
  };

  const [theme, setTheme] = useState<"dark" | "light">(getRootTheme);
  const [introReady, setIntroReady] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById(INTRO_STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = INTRO_STYLE_ID;
    style.innerHTML = `
      @keyframes faq1-fade-up {
        0% { transform: translate3d(0, 20px, 0); opacity: 0; filter: blur(6px); }
        60% { filter: blur(0); }
        100% { transform: translate3d(0, 0, 0); opacity: 1; filter: blur(0); }
      }
      @keyframes faq1-beam-spin {
        0% { transform: rotate(0deg) scale(1); }
        100% { transform: rotate(360deg) scale(1); }
      }
      @keyframes faq1-pulse {
        0% { transform: scale(0.7); opacity: 0.55; }
        60% { opacity: 0.1; }
        100% { transform: scale(1.25); opacity: 0; }
      }
      @keyframes faq1-meter {
        0%, 20% { transform: scaleX(0); transform-origin: left; }
        45%, 60% { transform: scaleX(1); transform-origin: left; }
        80%, 100% { transform: scaleX(0); transform-origin: right; }
      }
      @keyframes faq1-tick {
        0%, 30% { transform: translateX(-6px); opacity: 0.4; }
        50% { transform: translateX(2px); opacity: 1; }
        100% { transform: translateX(20px); opacity: 0; }
      }
      .faq1-intro {
        position: relative;
        display: flex;
        align-items: center;
        gap: 0.85rem;
        padding: 0.85rem 1.4rem;
        border-radius: 9999px;
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(20, 20, 20, 0.6);
        color: rgba(239, 68, 68, 0.9);
        text-transform: uppercase;
        letter-spacing: 0.35em;
        font-size: 0.65rem;
        width: 100%;
        max-width: 24rem;
        margin: 0 auto;
        opacity: 0;
        transform: translate3d(0, 12px, 0);
        filter: blur(8px);
        transition: opacity 720ms ease, transform 720ms ease, filter 720ms ease;
        isolation: isolate;
      }
      .faq1-intro--light {
        border-color: rgba(0, 0, 0, 0.08);
        background: rgba(255, 255, 255, 0.9);
        color: rgba(239, 68, 68, 0.9);
      }
      .faq1-intro--active {
        opacity: 1;
        transform: translate3d(0, 0, 0);
        filter: blur(0);
      }
      .faq1-intro__beam,
      .faq1-intro__pulse {
        position: absolute;
        inset: -110%;
        pointer-events: none;
        border-radius: 50%;
      }
      .faq1-intro__beam {
        background: conic-gradient(from 160deg, rgba(239, 68, 68, 0.15), transparent 32%, rgba(239, 68, 68, 0.1) 58%, transparent 78%, rgba(239, 68, 68, 0.1));
        animation: faq1-beam-spin 18s linear infinite;
        opacity: 0.55;
      }
      .faq1-intro--light .faq1-intro__beam {
        background: conic-gradient(from 180deg, rgba(239, 68, 68, 0.15), transparent 30%, rgba(239, 68, 68, 0.1) 58%, transparent 80%, rgba(239, 68, 68, 0.1));
      }
      .faq1-intro__pulse {
        border: 1px solid currentColor;
        opacity: 0.15;
        animation: faq1-pulse 3.4s ease-out infinite;
      }
      .faq1-intro__label {
        position: relative;
        z-index: 1;
        font-weight: 600;
        letter-spacing: 0.4em;
      }
      .faq1-intro__meter {
        position: relative;
        z-index: 1;
        flex: 1 1 auto;
        height: 1px;
        background: linear-gradient(90deg, transparent, currentColor 35%, transparent 85%);
        transform: scaleX(0);
        transform-origin: left;
        animation: faq1-meter 5.8s ease-in-out infinite;
        opacity: 0.7;
      }
      .faq1-intro__tick {
        position: relative;
        z-index: 1;
        width: 0.55rem;
        height: 0.55rem;
        border-radius: 9999px;
        background: currentColor;
        box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
        animation: faq1-tick 3.2s ease-in-out infinite;
      }
      .faq1-intro--light .faq1-intro__tick {
        box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.08);
      }
      .faq1-fade {
        opacity: 0;
        transform: translate3d(0, 24px, 0);
        filter: blur(12px);
        transition: opacity 700ms ease, transform 700ms ease, filter 700ms ease;
      }
      .faq1-fade--ready {
        animation: faq1-fade-up 860ms cubic-bezier(0.22, 0.68, 0, 1) forwards;
      }
    `;

    document.head.appendChild(style);

    return () => {
      if (style.parentNode) style.remove();
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      setIntroReady(true);
      return;
    }
    const frame = window.requestAnimationFrame(() => setIntroReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const applyThemeFromRoot = () => setTheme(getRootTheme());

    applyThemeFromRoot();

    const observer = new MutationObserver(applyThemeFromRoot);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    const handleStorage = (event: StorageEvent) => {
      if (event.key === "bento-theme") applyThemeFromRoot();
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      observer.disconnect();
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const palette = useMemo(() => palettes[theme], [theme]);

  const toggleTheme = () => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const next = root.classList.contains("dark") ? "light" : "dark";
    root.classList.toggle("dark", next === "dark");
    setTheme(next);
    try {
      window.localStorage?.setItem("bento-theme", next);
    } catch (_err) {
      /* ignore */
    }
  };
  const toggleQuestion = (index: number) => setActiveIndex((prev) => (prev === index ? -1 : index));

  useEffect(() => {
    if (typeof window === "undefined") {
      setHasEntered(true);
      return;
    }

    let timeout: number;
    const onLoad = () => {
      timeout = window.setTimeout(() => setHasEntered(true), 120);
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }

    return () => {
      window.removeEventListener("load", onLoad);
      window.clearTimeout(timeout);
    };
  }, []);

  const setCardGlow = (event: React.MouseEvent<HTMLLIElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--faq-x", `${event.clientX - rect.left}px`);
    target.style.setProperty("--faq-y", `${event.clientY - rect.top}px`);
  };

  const clearCardGlow = (event: React.MouseEvent<HTMLLIElement>) => {
    const target = event.currentTarget;
    target.style.removeProperty("--faq-x");
    target.style.removeProperty("--faq-y");
  };

  return (
    <div className={`relative w-full overflow-hidden transition-colors duration-700 ${palette.surface}`}>
      <div className="absolute inset-0 z-0" style={{ background: palette.aurora }} />
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-80"
        style={{ background: palette.overlay, mixBlendMode: theme === "dark" ? "screen" : "multiply" }}
      />

      <section
        className={`relative z-10 mx-auto flex max-w-4xl flex-col gap-12 px-6 py-24 lg:max-w-5xl lg:px-12 ${
          hasEntered ? "faq1-fade--ready" : "faq1-fade"
        }`}
      >
        <div
          className={`faq1-intro ${introReady ? "faq1-intro--active" : ""} ${
            theme === "light" ? "faq1-intro--light" : "faq1-intro--dark"
          }`}
        >
          <span className="faq1-intro__beam" aria-hidden="true" />
          <span className="faq1-intro__pulse" aria-hidden="true" />
          <span className="faq1-intro__label">Signal FAQ</span>
          <span className="faq1-intro__meter" aria-hidden="true" />
          <span className="faq1-intro__tick" aria-hidden="true" />
        </div>

        <header className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <p className={`text-xs uppercase tracking-[0.35em] ${palette.muted}`}>Questions</p>
            <h1 className={`text-4xl font-semibold leading-tight md:text-5xl ${palette.heading}`}>
              Focus on the signal, not the noise.
            </h1>
            <p className={`max-w-xl text-base ${palette.muted}`}>
              Everything you need to know about partnering with our team, condensed into calm monochrome clarity.
            </p>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className={`relative inline-flex h-11 items-center gap-3 rounded-full border px-5 text-sm font-medium transition-colors duration-500 cursor-pointer ${palette.toggleSurface} ${palette.toggle}`}
            aria-pressed={theme === "dark" ? "true" : "false"}
          >
            <span className="relative flex h-6 w-6 items-center justify-center">
              <span
                className={`pointer-events-none absolute inset-0 rounded-full border opacity-40 ${
                  theme === "dark" ? "border-red-500/30 animate-pulse" : "border-neutral-400/30"
                }`}
              />
              <span
                className={`h-3 w-3 rounded-full transition-all duration-500 ${
                  theme === "dark" ? "bg-red-500" : "bg-zinc-800"
                }`}
              />
            </span>
            {theme === "dark" ? "Night" : "Day"} mode
          </button>
        </header>

        <ul className="space-y-4">
          {faqs.map((item, index) => {
            const open = activeIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-trigger-${index}`;

            return (
              <li
                key={item.question}
                className={`group relative overflow-hidden rounded-3xl border backdrop-blur-xl transition-all duration-500 hover:-translate-y-0.5 focus-within:-translate-y-0.5 ${palette.border} ${palette.panel} ${palette.shadow} hover:border-red-500/30 focus-within:border-red-500/40`}
                onMouseMove={setCardGlow}
                onMouseLeave={clearCardGlow}
              >
                <div
                  className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
                    open ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                  style={{
                    background: `radial-gradient(240px circle at var(--faq-x, 50%) var(--faq-y, 50%), ${palette.glow}, transparent 70%)`,
                  }}
                />

                <button
                  type="button"
                  id={buttonId}
                  aria-controls={panelId}
                  aria-expanded={open}
                  onClick={() => toggleQuestion(index)}
                  style={{ "--faq-outline": "rgba(239, 68, 68, 0.4)" } as React.CSSProperties}
                  className="relative flex w-full items-start gap-6 px-8 py-7 text-left transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--faq-outline)]"
                >
                  <span
                    className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all duration-500 group-hover:scale-105 ${
                      open ? "border-red-500 bg-red-500/5 text-red-500" : `${palette.iconRing} ${palette.iconSurface}`
                    } group-hover:border-red-500/40`}
                  >
                    <span
                      className={`pointer-events-none absolute inset-0 rounded-full border opacity-30 ${
                        open ? "border-red-500" : palette.iconRing
                      } ${open ? "animate-ping" : ""}`}
                    />
                    <svg
                      className={`relative h-5 w-5 transition-transform duration-500 ${
                        open ? "text-red-500" : palette.icon
                      } ${open ? "rotate-45" : ""}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 5v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>

                  <div className="flex flex-1 flex-col gap-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                      <h2 className={`text-lg font-medium leading-tight sm:text-xl ${palette.heading}`}>
                        {item.question}
                      </h2>
                      {item.meta && (
                        <span
                          className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.35em] transition-opacity duration-300 sm:ml-auto ${palette.border} ${palette.muted} group-hover:border-red-500/30 group-hover:text-red-500`}
                        >
                          {item.meta}
                        </span>
                      )}
                    </div>

                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className={`overflow-hidden text-sm leading-relaxed transition-[max-height] duration-500 ease-out ${
                        open ? "max-h-64" : "max-h-0"
                      } ${palette.muted}`}
                    >
                      <p className="pr-2">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export default FAQ1;
export { FAQ1 };
