function Kontak() {
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
    { id: "kontak", className: "section wrap", ref },
    h("h2", null, "Sosmed Nich"),
    h(
      "p",
      { style: { fontSize: 18, maxWidth: 560, marginBottom: 12 } },
      "Grup boleh sepi, tapi jangan sampai beneran ilang. Mampir terus, ya."

    ),
    h("div", { className: "kontak-doodle" }, h(ScribbleArrow, null)),
    h(
      "div",
      { className: "kontak-box" },
      h("a", { className: "btn alt1", href: "https://www.instagram.com/fagtos_?igsi=MWY1aDVkNXF1ZWs1cg==" }, "Follow IGE Wok"),
      h("a", { className: "btn alt2", href: "https://discord.gg/suJaEBKrWu" }, "Join Discord Wok")
    )
  );
}
