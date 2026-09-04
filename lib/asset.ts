/* GitHub Pages serves the site from /STEMTSA, so any URL we write by hand needs
   that prefix. next/link and next/image handle it themselves; this is for the
   rest (logo files, favicons, downloads).

   Usage: asset("/logos/tsa.svg")  ->  "/STEMTSA/logos/tsa.svg" in production,
   "/logos/tsa.svg" locally. */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string) => `${BASE}${path.startsWith("/") ? path : `/${path}`}`;
