function CassetteIcon({ size = 40 }) {
  return h(
    "svg",
    { width: size, height: size * 0.65, viewBox: "0 0 100 65", "aria-hidden": "true" },
    h("rect", { x: 2, y: 2, width: 96, height: 61, fill: "var(--zest)", stroke: "var(--ink)", strokeWidth: "4" }),
    h("circle", { cx: 30, cy: 32, r: 12, fill: "var(--white)", stroke: "var(--ink)", strokeWidth: "3" }),
    h("circle", { cx: 70, cy: 32, r: 12, fill: "var(--white)", stroke: "var(--ink)", strokeWidth: "3" }),
    h("circle", { cx: 30, cy: 32, r: 3, fill: "var(--ink)" }),
    h("circle", { cx: 70, cy: 32, r: 3, fill: "var(--ink)" }),
    h("rect", { x: 14, y: 48, width: 72, height: 6, fill: "var(--ink)" })
  );
}

/* Segmen penuh di dalam alur halaman: daftar playlist lengkap.
   Sumber datanya SITE_DATA.playlist di data.js — nambah/hapus lagu
   di sana otomatis muncul di sini, tanpa ubah kode ini. */
function BacksoundSection({ tracks, currentIndex, isPlaying, onSelect, onTogglePlay }) {
  const { useEffect, useRef } = React;
  const ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
      }
    );
  }, []);

  return h(
    "section",
    { id: "backsound", className: "section wrap" },
    h("h2", null, "Backsound Kita"),
    h(
      "div",
      { className: "backsound-box", ref },
      h(
        "div",
        { className: "backsound-head" },
        h(CassetteIcon, null),
        h(
          "div",
          null,
          h("div", { className: "backsound-title stamp" }, "TEMAN MUTER-MUTER WEB"),
          h("div", { className: "scrawl", style: { fontSize: 18 } }, "pilih lagu, terus scroll sampek bosen")
        )
      ),
      h(
        "ul",
        { className: "playlist" },
        tracks.map((t, i) =>
          h(
            "li",
            {
              key: i,
              className: "playlist-item" + (i === currentIndex ? " is-active" : ""),
              onClick: () => onSelect(i),
            },
            h("span", { className: "playlist-num" }, i === currentIndex && isPlaying ? "▶" : i + 1),
            h(
              "span",
              { className: "playlist-info" },
              h("span", { className: "playlist-title" }, t.title),
              h("span", { className: "playlist-artist" }, t.artist)
            )
          )
        )
      ),
      h(
        "button",
        { className: "btn", onClick: onTogglePlay, style: { marginTop: 20 } },
        isPlaying ? "Pause Backsound" : "Putar Backsound"
      ),
      h(
        "p",
        { className: "hint-text scrawl" },
        ""
      )
    )
  );
}

/* Widget mengambang, tetap kelihatan walau udah scroll jauh dari
   segmen Backsound, supaya musiknya beneran nemenin selama di web. */
function MiniPlayer({ tracks, currentIndex, isPlaying, onTogglePlay, onNext, onPrev }) {
  const track = tracks[currentIndex];
  if (!track) return null;
  return h(
    "div",
    { className: "mini-player" },
    h("button", { className: "mini-btn", onClick: onPrev, "aria-label": "Lagu sebelumnya" }, "\u23EE"),
    h(
      "button",
      { className: "mini-btn mini-btn--play", onClick: onTogglePlay, "aria-label": "Play/Pause" },
      isPlaying ? "\u23F8" : "\u25B6"
    ),
    h("button", { className: "mini-btn", onClick: onNext, "aria-label": "Lagu berikutnya" }, "\u23ED"),
    h(
      "div",
      { className: "mini-track" },
      h("span", { className: "mini-track-title" }, track.title),
      h("span", { className: "mini-track-artist" }, track.artist)
    )
  );
}
