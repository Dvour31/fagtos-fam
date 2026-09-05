function Header() {
  const { useState, useCallback, useEffect } = React;
  const [logoOk, setLogoOk] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const logoPath = window.SITE_DATA.logoPath;

  const links = [
    { href: "#cerita", label: "Cerita" },
    { href: "#anggota", label: "Anggota" },
    { href: "#galeri", label: "Galeri" },
    { href: "#backsound", label: "Backsound" },
    { href: "#kontak", label: "Kontak" },
  ];

  // Smooth scroll handler — works for both desktop nav and mobile drawer
  const handleNav = useCallback(function (e) {
    e.preventDefault();
    var target = document.querySelector(e.currentTarget.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMenuOpen(false);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(function () {
    function onResize() {
      if (window.innerWidth > 680) setMenuOpen(false);
    }
    window.addEventListener("resize", onResize);
    return function () { window.removeEventListener("resize", onResize); };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(function () {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return function () { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return h(
    React.Fragment,
    null,
    // ---- Sticky Header Bar ----
    h(
      "header",
      { className: "site-header" },
      h(
        "div",
        { className: "site-header-inner" },
        h(
          "div",
          { className: "brand" },
          logoOk
            ? h("img", {
              src: logoPath,
              alt: "Logo Fagtos Fam",
              className: "logo-img",
              onError: function () { setLogoOk(false); },
            })
            : h("span", { className: "logo-badge" }, "FF"),
          h("span", { className: "brand-word stamp" }, "FAGTOS FAM")
        ),
        // Desktop nav
        h(
          "nav",
          null,
          h(
            "ul",
            null,
            links.map(function (l) {
              return h("li", { key: l.href }, h("a", { href: l.href, onClick: handleNav }, l.label));
            })
          )
        ),
        // Hamburger button (visible <=680px)
        h(
          "button",
          {
            className: "hamburger" + (menuOpen ? " is-open" : ""),
            onClick: function () { setMenuOpen(!menuOpen); },
            "aria-label": "Menu navigasi",
          },
          h("span", { className: "hamburger-line" }),
          h("span", { className: "hamburger-line" }),
          h("span", { className: "hamburger-line" })
        )
      )
    ),
    // ---- Mobile Nav Overlay (click to close) ----
    h("div", {
      className: "mobile-nav-overlay" + (menuOpen ? " is-visible" : ""),
      onClick: function () { setMenuOpen(false); },
    }),
    // ---- Mobile Nav Drawer ----
    h(
      "nav",
      { className: "mobile-nav" + (menuOpen ? " is-open" : "") },
      h(
        "ul",
        null,
        links.map(function (l) {
          return h("li", { key: l.href }, h("a", { href: l.href, onClick: handleNav }, l.label));
        })
      )
    )
  );
}
