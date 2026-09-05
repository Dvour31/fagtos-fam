function Galeri() {
  const { useEffect, useRef } = React;
  const photoRef = useRef(null);
  const videoRef = useRef(null);
  const { photos, videos } = window.SITE_DATA;

  useEffect(() => {
    gsap.fromTo(
      photoRef.current.children,
      { opacity: 0, y: 40, rotate: () => gsap.utils.random(-6, 6) },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: photoRef.current, start: "top 85%" },
      }
    );
    gsap.fromTo(
      videoRef.current.children,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: videoRef.current, start: "top 85%" },
      }
    );
  }, []);

  function openPhoto(photo) {
    if (window._openLightbox) {
      window._openLightbox(photo.src, photo.caption);
    }
  }

  return h(
    "section",
    { id: "galeri", className: "section wrap" },
    h("h2", null, "Galeri Fagtos"),
    h(
      "div",
      { className: "galeri-sub" },
      h("span", { className: "patch patch--sub" }, "FOTO"),
      h(
        "div",
        { className: "photo-grid", ref: photoRef },
        photos.map((p, i) =>
          h(
            "figure",
            {
              className: "polaroid clickable",
              key: i,
              style: { transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (2 + (i % 3))}deg)` },
              onClick: function () { openPhoto(p); },
            },
            h(Tape, { rotate: i % 2 === 0 ? -6 : 6, top: -14, width: 64 }),
            h("img", { src: p.src, alt: p.caption, loading: "lazy" }),
            h("figcaption", { className: "scrawl" }, p.caption)
          )
        )
      )
    ),
    h(
      "div",
      { className: "galeri-sub galeri-sub--video" },
      h("span", { className: "patch patch--sub patch--video" }, "VIDEO"),
      h(
        "div",
        { className: "video-grid", ref: videoRef },
        videos.map((v, i) =>
          h(VideoCard, { key: i, video: v })
        )
      )
    )
  );
}

/* Video card dengan thumbnail — klik untuk mulai putar */
function VideoCard({ video }) {
  const { useState, useRef, useCallback, useEffect } = React;
  const [playing, setPlaying] = useState(false);
  const videoElRef = useRef(null);

  const handlePlay = useCallback(function () {
    setPlaying(true);
  }, []);

  // Setelah state berubah ke playing, autoplay video
  useEffect(function () {
    if (playing && videoElRef.current) {
      videoElRef.current.play().catch(function () { });
    }
  }, [playing]);

  if (!playing) {
    // Tampilkan thumbnail + tombol play
    return h(
      "figure",
      { className: "video-card" },
      h(
        "div",
        { className: "video-thumb-wrap", onClick: handlePlay },
        h("img", {
          src: video.poster,
          alt: video.caption,
          loading: "lazy",
        }),
        h("button", { className: "video-play-btn", "aria-label": "Putar video" }, "\u25B6")
      ),
      h("figcaption", null, video.caption)
    );
  }

  // Setelah diklik, tampilkan video player
  return h(
    "figure",
    { className: "video-card" },
    h(
      "video",
      { ref: videoElRef, controls: true, preload: "auto" },
      h("source", { src: video.src, type: "Video/mp4" }),
      "Browser kamu tidak mendukung pemutaran video."
    ),
    h("figcaption", null, video.caption)
  );
}
