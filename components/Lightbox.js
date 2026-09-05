/* Lightbox — preview gambar full-screen.
   Dipanggil lewat window._openLightbox(src, caption)
   dari komponen manapun (Galeri, Roster, dll). */

function Lightbox() {
  const { useState, useEffect, useCallback } = React;
  const [data, setData] = useState(null); // { src, caption }
  const [visible, setVisible] = useState(false);

  // Pasang fungsi global supaya komponen lain bisa trigger
  useEffect(function () {
    window._openLightbox = function (src, caption) {
      setData({ src: src, caption: caption || "" });
      setVisible(true);
    };
    return function () { delete window._openLightbox; };
  }, []);

  // Lock body scroll saat lightbox terbuka
  useEffect(function () {
    document.body.style.overflow = visible ? "hidden" : "";
    return function () { document.body.style.overflow = ""; };
  }, [visible]);

  // Tutup dengan Escape
  useEffect(function () {
    if (!visible) return;
    function onKey(e) {
      if (e.key === "Escape") setVisible(false);
    }
    document.addEventListener("keydown", onKey);
    return function () { document.removeEventListener("keydown", onKey); };
  }, [visible]);

  var close = useCallback(function () { setVisible(false); }, []);

  if (!visible || !data) return null;

  return h(
    "div",
    { className: "lightbox-overlay", onClick: close },
    h(
      "div",
      {
        className: "lightbox-content",
        onClick: function (e) { e.stopPropagation(); },
      },
      h("button", {
        className: "lightbox-close",
        onClick: close,
        "aria-label": "Tutup preview",
      }, "\u2715"),
      h("img", {
        className: "lightbox-img",
        src: data.src,
        alt: data.caption,
      }),
      data.caption
        ? h("div", { className: "lightbox-caption scrawl" }, data.caption)
        : null
    )
  );
}
