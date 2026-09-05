/* Kumpulan elemen dekoratif kecil ala corkboard/scrapbook.
   Ditulis pakai React.createElement (bukan JSX) supaya file ini
   bisa dimuat langsung sebagai <script> biasa, tanpa Babel,
   jadi index.html bisa dibuka dobel-klik tanpa server lokal. */

function Tack({ color = "var(--flame)", style = {} }) {
  return h("span", {
    className: "tack",
    style: { background: color, ...style },
    "aria-hidden": "true",
  });
}

function Tape({ rotate = -4, top = -16, left = "50%", width = 90 }) {
  return h("span", {
    className: "tape",
    style: {
      transform: `translateX(-50%) rotate(${rotate}deg)`,
      top,
      left,
      width,
    },
    "aria-hidden": "true",
  });
}

function StarBurst({ size = 46, color = "var(--zest)", style = {} }) {
  return h(
    "svg",
    { width: size, height: size, viewBox: "0 0 100 100", style, "aria-hidden": "true" },
    h("path", {
      d: "M50 0 L61 35 L98 32 L68 54 L79 90 L50 68 L21 90 L32 54 L2 32 L39 35 Z",
      fill: color,
      stroke: "var(--ink)",
      strokeWidth: "3",
    })
  );
}

function ScribbleArrow({ size = 70, color = "var(--ink)", style = {}, flip = false }) {
  return h(
    "svg",
    {
      width: size,
      height: size * 0.6,
      viewBox: "0 0 120 70",
      style: { transform: flip ? "scaleX(-1)" : "none", ...style },
      "aria-hidden": "true",
    },
    h("path", {
      d: "M4 50 C 30 10, 70 65, 100 15",
      fill: "none",
      stroke: color,
      strokeWidth: "4",
      strokeLinecap: "round",
    }),
    h("path", {
      d: "M84 8 L102 14 L92 30",
      fill: "none",
      stroke: color,
      strokeWidth: "4",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    })
  );
}
