/**
 * Photographic section image. Static export, so plain <img> with explicit
 * width/height (no layout shift). Hero images load eagerly; the rest lazily.
 */
export type PhotoKey =
  | "hero"
  | "turf"
  | "yardline"
  | "winter"
  | "bowl"
  | "helmets";

const PHOTOS: Record<PhotoKey, { src: string; width: number; height: number; alt: string }> = {
  hero: {
    src: "/images/hero-stadium-dusk.webp",
    width: 1280,
    height: 720,
    alt: "Empty football stadium at dusk with floodlights glowing over the turf and yard lines",
  },
  turf: {
    src: "/images/football-on-turf.webp",
    width: 1000,
    height: 750,
    alt: "Close-up of a leather football with white laces resting on green turf beside a white yard line",
  },
  yardline: {
    src: "/images/football-yard-line.webp",
    width: 1000,
    height: 750,
    alt: "Football resting on a painted white yard line on natural grass in warm evening light",
  },
  winter: {
    src: "/images/stadium-winter-snow.webp",
    width: 1200,
    height: 675,
    alt: "Empty floodlit football stadium on a snowy winter night with snow on the seats and field",
  },
  bowl: {
    src: "/images/stadium-bowl-season.webp",
    width: 1200,
    height: 675,
    alt: "Empty football stadium under a bright blue afternoon sky with a pristine green field",
  },
  helmets: {
    src: "/images/helmets-locker-room.webp",
    width: 1000,
    height: 750,
    alt: "Row of plain black football helmets on a bench in a dim locker-room corridor",
  },
};

export function PhotoFigure({ photo, priority = false }: { photo: PhotoKey; priority?: boolean }) {
  const p = PHOTOS[photo];
  return (
    <figure className={priority ? "photo-figure photo-hero" : "photo-figure"}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={p.src}
        width={p.width}
        height={p.height}
        alt={p.alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
      />
    </figure>
  );
}
