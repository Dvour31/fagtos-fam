function Hero() {
  const { useEffect, useRef } = React;
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const tagRef = useRef(null);
  const patchRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: -30, rotate: -3 },
      { opacity: 1, y: 0, rotate: -3, duration: 0.5 }
    )
      .fromTo(
        titleRef.current,
        { opacity: 0, scale: 2.4, rotate: -16 },
        { opacity: 1, scale: 1, rotate: 0, duration: 0.85, ease: "back.out(1.6)" },
        "-=0.15"
      )
      .fromTo(
        tagRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.25"
      )
      .fromTo(
        patchRef.current.children,
        { opacity: 0, y: -90, rotate: () => gsap.utils.random(-25, 25) },
        { opacity: 1, y: 0, rotate: 0, duration: 0.7, ease: "bounce.out", stagger: 0.14 },
        "-=0.1"
      );
  }, []);

  return h(
    "div",
    { className: "hero" },
    h(StarBurst, { size: 54, style: { position: "absolute", top: 24, left: 24 } }),
    h(StarBurst, { size: 34, color: "var(--cobalt)", style: { position: "absolute", bottom: 24, right: 40 } }),
    h("span", { className: "hero-badge", ref: badgeRef }, "DOKSLI ASLI LAWOWOK"),
    h("h1", { className: "stamp", ref: titleRef }, h("span", null, "FAGTOS"), "FAM"),
    h("div", { className: "hero-tagline scrawl", ref: tagRef }, "rumah kedua sejak masa putih abu-abu"),
    h(
      "div",
      { className: "patch-row", ref: patchRef },
      h("span", { className: "patch" }, "MABAR"),
      h("span", { className: "patch" }, "NONGSKUY"),
      h("span", { className: "patch" }, "EGILUY")
    )
  );
}
