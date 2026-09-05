function Tentang() {
  const { useEffect, useRef } = React;
  const ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 50, rotate: -2 },
      {
        opacity: 1,
        y: 0,
        rotate: -0.6,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 82%" },
      }
    );
  }, []);

  return h(
    "section",
    { id: "cerita", className: "section wrap" },
    h("h2", null, "Cerita di Balik Fagtos"),
    h(
      "div",
      { className: "note", ref },
      h(Tape, { rotate: -4 }),
      h(
        "p",
        null,
        "Fagtos Fam bukan cuma grup chat yang dibuat karena gabut. Ini ",
        h("span", { className: "pull" }, "rumah kedua"),
        " — tempat kita cerita pas lagi seneng, curhat pas lagi capek, dan ketawa bareng buat hal-hal receh yang cuma kita yang ngerti."
      ),
      h(
        "p",
        null,
        "Dari mabar sampai muak, nongkrong nggak jelas sampai nggak ada agenda sama sekali, semuanya kesimpen di sini. Halaman ini dibikin biar semua momen itu nggak ilang ditelan waktu."
      )
    )
  );
}
