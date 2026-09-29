import localFont from "next/font/local";

/**
 * Latin webfonts previously fetched by next/font/google during `next build`.
 * The files under src/fonts are those unmodified Google Fonts cuts (SIL OFL;
 * see each family's OFL.txt), so export does not call fonts.googleapis.com.
 * Weights, styles, and CSS variables match the previous google loader config.
 * Discrete faces (not a single weight range) keep the same font-matching:
 * a requested weight that was not loaded still snaps to the nearest loaded face.
 */
export const display = localFont({
  src: [
    {
      path: "../fonts/fraunces/Fraunces-latin.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/fraunces/Fraunces-latin.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/fraunces/Fraunces-latin.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-display",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

export const sans = localFont({
  src: [
    {
      path: "../fonts/ibm-plex-sans/IBMPlexSans-latin.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/ibm-plex-sans/IBMPlexSans-latin.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/ibm-plex-sans/IBMPlexSans-latin.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/ibm-plex-sans/IBMPlexSans-latin.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "swap",
  adjustFontFallback: "Arial",
});

export const mono = localFont({
  src: [
    {
      path: "../fonts/ibm-plex-mono/IBMPlexMono-400-latin.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/ibm-plex-mono/IBMPlexMono-600-latin.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-mono",
  display: "swap",
  adjustFontFallback: "Arial",
});
