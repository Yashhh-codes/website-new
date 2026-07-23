'use client';

import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

export interface Contributor {
  username: string;
  avatarUrl: string;
  profileUrl?: string;
}

export interface ContributorsWallProps {
  title?: string;
  subtitle?: ReactNode;
  contributors?: Contributor[];
  totalCount?: number;
  columns?: number;
  tilt?: number;
  perspective?: number;
  speed?: number;
  height?: number | string;
  className?: string;
}

interface TooltipState {
  username: string;
  left: number;
  top: number;
}

const GAP = 12;

// Default dummy contributors to make the wall look amazing out of the box
const defaultContributors: Contributor[] = Array.from({ length: 48 }, (_, i) => ({
  username: `creator_${i + 1}`,
  avatarUrl: `https://images.unsplash.com/photo-${[
    '1534528741775-53994a69daeb', '1507003211169-0a1dd7228f2d', '1500648767791-00dcc994a43e', '1494790108377-be9c29b29330',
    '1522075469751-3a6694fb2f61', '1539571696357-5a69c17a67c6', '1501196354995-cbb51c65aaea', '1438761681033-6461ffad8d80',
    '1544005313-94ddf0286df2', '1517841905240-472988babdf9', '1506794778202-cad84cf45f1d', '1524504388940-b1c1722653e1'
  ][i % 12]}?w=150&auto=format&fit=crop&q=60`,
  profileUrl: '#'
}));

// Répète les avatars jusqu'à compléter la dernière rangée pour garder une grille rectangulaire.
function padToGrid(items: Contributor[], columns: number): Contributor[] {
  if (items.length === 0) return items;
  const remainder = items.length % columns;
  if (remainder === 0) return items;
  const fill = columns - remainder;
  return items.concat(
    Array.from({ length: fill }, (_, i) => items[i % items.length]),
  );
}

export function ContributorsWall({
  title = 'Contributors',
  subtitle,
  contributors = defaultContributors,
  totalCount,
  columns = 16,
  tilt = 18,
  perspective = 1100,
  speed = 24,
  height = 600,
  className,
}: ContributorsWallProps) {
  const wallRef = useRef<HTMLDivElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [blockHeight, setBlockHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const tiles = useMemo(
    () => padToGrid(contributors, columns),
    [contributors, columns],
  );
  const count = totalCount ?? contributors.length;

  // Mesure la hauteur d'une copie de la grille et du conteneur pour un défilement sans couture.
  useLayoutEffect(() => {
    const block = blockRef.current;
    const wall = wallRef.current;
    if (!block || !wall) return;
    const measure = () => {
      setBlockHeight(block.offsetHeight);
      setContainerHeight(wall.offsetHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(block);
    ro.observe(wall);
    return () => ro.disconnect();
  }, [tiles, columns]);

  const copiesCount = useMemo(() => {
    if (blockHeight === 0 || containerHeight === 0) return 2;
    return Math.max(2, Math.ceil(containerHeight / (blockHeight + GAP)) + 1);
  }, [blockHeight, containerHeight]);

  const duration = useMemo(() => {
    if (blockHeight === 0) return 0;
    return (blockHeight + GAP) / speed;
  }, [blockHeight, speed]);

  const handleEnter = (
    e: React.MouseEvent<HTMLElement>,
    username: string,
  ) => {
    const wall = wallRef.current;
    if (!wall) return;
    const tile = e.currentTarget.getBoundingClientRect();
    const box = wall.getBoundingClientRect();
    setTooltip({
      username,
      left: tile.left - box.left + tile.width / 2,
      top: tile.top - box.top,
    });
  };

  const planeStyle: CSSProperties = {
    transform: `rotateX(${tilt}deg)`,
    transformStyle: 'preserve-3d',
  };
  const gridStyle: CSSProperties = {
    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
    gap: GAP,
  };

  const renderGrid = (copy: number, ref?: React.Ref<HTMLDivElement>) => (
    <div ref={ref} className="grid w-full" style={gridStyle}>
      {tiles.map((c, i) => {
        const Tile = (c.profileUrl ? 'a' : 'div') as 'a';
        return (
          <Tile
            key={`${copy}-${c.username}-${i}`}
            {...(c.profileUrl
              ? { href: c.profileUrl, target: '_blank', rel: 'noreferrer' }
              : {})}
            aria-label={c.username}
            onMouseEnter={(e) => handleEnter(e, c.username)}
            className="group relative block aspect-square outline-none"
          >
            {/* La zone cliquable reste fixe et seule cette couche interne s'agrandit, pour que le curseur ne sorte jamais pendant le survol. */}
            <span className="absolute inset-0 overflow-hidden rounded-[3px] transition-transform duration-300 ease-out group-hover:z-20 group-hover:scale-[1.28] group-focus-visible:z-20 group-focus-visible:scale-[1.28]">
              <img
                src={c.avatarUrl}
                alt={c.username}
                loading="eager"
                draggable={false}
                className="h-full w-full select-none object-cover grayscale brightness-95 transition duration-300 group-hover:grayscale-0 group-hover:brightness-100 group-focus-visible:grayscale-0 group-focus-visible:brightness-100 dark:brightness-[0.72] dark:group-hover:brightness-110 dark:group-focus-visible:brightness-110"
              />
              <span className="pointer-events-none absolute inset-0 rounded-[3px] ring-1 ring-inset ring-black/[0.08] transition group-hover:ring-black/30 dark:ring-white/[0.06] dark:group-hover:ring-white/40" />
            </span>
          </Tile>
        );
      })}
    </div>
  );

  return (
    <div
      className={`w-full min-h-[80vh] flex flex-col justify-center px-6 py-24 sm:px-10 sm:py-32 bg-[var(--wall-bg)] text-zinc-900 [--wall-bg:#FAF9F6] dark:bg-[var(--wall-bg)] dark:text-white dark:[--wall-bg:#0a0a0a] ${className ?? ''}`}
    >
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold tracking-tight whitespace-nowrap">
            {title}
          </h2>
          <span className="h-px flex-1 bg-black/10 dark:bg-white/10" />
        </div>
        <p className="mt-2 text-sm text-zinc-500 dark:text-white/45">
          {subtitle ?? (
            <>
              Built by a community of{' '}
              <span className="font-semibold text-zinc-900/80 dark:text-white/70">
                {count}+
              </span>{' '}
              contributors.
            </>
          )}
        </p>
      </div>

      <div
        ref={wallRef}
        className="relative mx-auto mt-12 w-full max-w-6xl overflow-hidden"
        style={{
          perspective: `${perspective}px`,
          perspectiveOrigin: '50% 50%',
          height,
        }}
        onMouseLeave={() => setTooltip(null)}
      >
        <div className="h-full" style={planeStyle}>
          <div
            className="flex w-full flex-col"
            style={{
              gap: GAP,
              transform: blockHeight > 0 ? undefined : 'translateY(0)',
              animation: blockHeight > 0 ? `marquee-down ${duration}s linear infinite` : 'none',
              animationPlayState: tooltip ? 'paused' : 'running',
              WebkitBackfaceVisibility: 'hidden',
              backfaceVisibility: 'hidden',
              willChange: 'transform',
              transformStyle: 'preserve-3d',
              ...({
                '--marquee-translate': `-${blockHeight + GAP}px`,
              } as CSSProperties),
            }}
          >
            {Array.from({ length: copiesCount }).map((_, idx) =>
              renderGrid(idx, idx === 0 ? blockRef : undefined)
            )}
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `
              radial-gradient(130% 95% at 50% 50%, transparent 30%, var(--wall-bg) 82%),
              linear-gradient(to bottom, var(--wall-bg) 0%, transparent 16%, transparent 84%, var(--wall-bg) 100%),
              linear-gradient(to right, var(--wall-bg) 0%, transparent 12%, transparent 88%, var(--wall-bg) 100%)
            `,
          }}
        />

        {tooltip && (
          <div
            className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-[calc(100%+8px)] whitespace-nowrap rounded-md border border-black/10 bg-white px-2.5 py-1 text-xs font-medium text-zinc-900 shadow-lg shadow-black/10 dark:border-white/10 dark:bg-[#161616] dark:text-white dark:shadow-black/40"
            style={{ left: tooltip.left, top: tooltip.top }}
          >
            {tooltip.username}
            <span className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r border-black/10 bg-white dark:border-white/10 dark:bg-[#161616]" />
          </div>
        )}
      </div>
    </div>
  );
}

export default ContributorsWall;
