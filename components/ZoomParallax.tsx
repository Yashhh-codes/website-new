'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

export interface Image {
  src: string;
  alt?: string;
}

export interface ZoomParallaxProps {
  /** Array of images to be displayed in the parallax effect max 7 images */
  images?: Image[];
}

const defaultImages: Image[] = [
  {
    src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    alt: 'Creative Branding Design'
  },
  {
    src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop',
    alt: 'Agency Collaboration'
  },
  {
    src: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop',
    alt: 'Modern Workspace'
  },
  {
    src: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=800&auto=format&fit=crop',
    alt: 'Digital Design Interfaces'
  },
  {
    src: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop',
    alt: 'UX Process Mapping'
  },
  {
    src: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=800&auto=format&fit=crop',
    alt: 'UI Wireframing'
  },
  {
    src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop',
    alt: 'Creative Agency Studio'
  }
];

export function ZoomParallax({ images = defaultImages }: ZoomParallaxProps) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

  return (
    <div ref={container} className="relative h-[300vh] bg-[#FAF9F6] z-10">
      <div className="sticky top-0 h-screen overflow-hidden">
        {images.map(({ src, alt }, index) => {
          const scale = scales[index % scales.length];

          return (
            <motion.div
              key={index}
              style={{ scale }}
              className={`absolute top-0 flex h-full w-full items-center justify-center ${index === 1 ? '[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]' : ''} ${index === 2 ? '[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]' : ''} ${index === 3 ? '[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]' : ''} ${index === 4 ? '[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]' : ''} ${index === 5 ? '[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]' : ''} ${index === 6 ? '[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]' : ''} `}
            >
              <div className="relative h-[25vh] w-[25vw]">
                <img
                  src={src || '/placeholder.svg'}
                  alt={alt || `Parallax image ${index + 1}`}
                  className="h-full w-full object-cover rounded-lg shadow-2xl"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default ZoomParallax;
