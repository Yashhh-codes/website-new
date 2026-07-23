'use client';

import React from 'react';

interface Service {
  title: string;
  count: string;
  date: string;
  colors: string[];
}

const services: Service[] = [
  {
    title: "Web Development",
    count: "12 projects",
    date: "Updated Jul 22",
    colors: ["#6ea8fe", "#4f7fd9", "#8fc1ff", "#3a63b0", "#a9d2ff"]
  },
  {
    title: "CRM Tools",
    count: "6 projects",
    date: "Updated Jul 18",
    colors: ["#7ee787", "#57c26a", "#a3f0ad", "#3f9b50", "#c3f7c9"]
  },
  {
    title: "SaaS Products",
    count: "9 projects",
    date: "Updated Jul 20",
    colors: ["#ffb37b", "#e0925a", "#ffcaa0", "#c17540", "#ffe0c2"]
  },
  {
    title: "Branding",
    count: "8 projects",
    date: "Updated Jul 15",
    colors: ["#f28ba8", "#d46f8c", "#f7aec4", "#b3506c", "#fbd0dd"]
  },
  {
    title: "Digital Strategy",
    count: "5 projects",
    date: "Updated Jul 10",
    colors: ["#c6a6ff", "#a37ce0", "#dcc2ff", "#8657c2", "#eeddff"]
  },
  {
    title: "UI/UX Design",
    count: "11 projects",
    date: "Updated Jul 21",
    colors: ["#7ecbe7", "#57a8c9", "#a3e2f4", "#3f8aab", "#c3f1ff"]
  }
];

export function ServicesFanHover() {
  return (
    <section className="bg-[#FAF9F6] text-[#09090b] font-sans px-6 py-24 sm:px-10 sm:py-32 relative z-10 border-t border-black/5">
      {/* Component Scoped CSS Styles for fan-out animations */}
      <style>{`
        .fan-card {
          position: relative;
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 16px;
          padding: 24px;
          overflow: visible;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
          transition: transform .35s cubic-bezier(0.22, 1, 0.36, 1), border-color .35s ease, box-shadow .35s ease;
        }
        .fan-card:hover {
          z-index: 20;
          transform: translateY(-4px);
          border-color: rgba(0, 0, 0, 0.12);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.05);
        }

        .fan-stack {
          position: relative;
          height: 150px;
          margin-bottom: 20px;
        }

        .fan-chip {
          position: absolute;
          top: 0;
          left: 50%;
          width: 96px;
          height: 130px;
          border-radius: 10px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
          transition: transform .5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow .5s ease;
          will-change: transform;
        }

        /* Default resting state — shallow fan */
        .fan-chip:nth-child(1) { transform: translate(calc(-50% - 55px), 6px)  rotate(-9deg) scale(0.92); z-index: 1; }
        .fan-chip:nth-child(2) { transform: translate(calc(-50% - 28px), 2px)  rotate(-5deg) scale(0.95); z-index: 2; }
        .fan-chip:nth-child(3) { transform: translate(-50%, 0)                 rotate(0deg)  scale(1);    z-index: 4; }
        .fan-chip:nth-child(4) { transform: translate(calc(-50% + 28px), 2px)  rotate(5deg)  scale(0.95); z-index: 2; }
        .fan-chip:nth-child(5) { transform: translate(calc(-50% + 55px), 6px)  rotate(9deg)  scale(0.92); z-index: 1; }

        /* Fan-out on hover */
        .fan-card:hover .fan-chip:nth-child(1) { transform: translate(calc(-50% - 155px), -8px) rotate(-18deg) scale(1); z-index: 3; }
        .fan-card:hover .fan-chip:nth-child(2) { transform: translate(calc(-50% - 80px),  -4px) rotate(-9deg)  scale(1); z-index: 4; }
        .fan-card:hover .fan-chip:nth-child(3) { transform: translate(-50%, -12px) rotate(0deg) scale(1.05); z-index: 5; }
        .fan-card:hover .fan-chip:nth-child(4) { transform: translate(calc(-50% + 80px),  -4px) rotate(9deg)   scale(1); z-index: 4; }
        .fan-card:hover .fan-chip:nth-child(5) { transform: translate(calc(-50% + 155px), -8px) rotate(18deg)  scale(1); z-index: 3; }

        .fan-card:hover .fan-chip { box-shadow: 0 16px 32px rgba(0,0,0,0.45); }

        @media (max-width: 560px) {
          .fan-chip { width: 80px; height: 108px; }
          .fan-card:hover .fan-chip:nth-child(1) { transform: translate(calc(-50% - 90px), -6px) rotate(-14deg) scale(1); }
          .fan-card:hover .fan-chip:nth-child(2) { transform: translate(calc(-50% - 45px), -2px) rotate(-7deg) scale(1); }
          .fan-card:hover .fan-chip:nth-child(4) { transform: translate(calc(-50% + 45px), -2px) rotate(7deg) scale(1); }
          .fan-card:hover .fan-chip:nth-child(5) { transform: translate(calc(-50% + 90px), -6px) rotate(14deg) scale(1); }
        }
      `}</style>

      <div className="max-w-5xl mx-auto">
        <div className="max-w-[600px] mx-auto mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">Our Services</h2>
          <p className="text-zinc-500 text-base">
            Hover a service to preview the work behind it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div key={index} className="fan-card">
              <div className="fan-stack">
                {service.colors.map((color, cIdx) => (
                  <div
                    key={cIdx}
                    className="fan-chip"
                    style={{ background: color }}
                  />
                ))}
              </div>
              <div className="text-[17px] font-semibold mb-1.5">{service.title}</div>
              <div className="flex justify-between items-center text-zinc-500 text-[13px]">
                <span>{service.count}</span>
                <span>{service.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesFanHover;
