function MemberAvatar({ member }) {
  const { useState } = React;
  const [photoOk, setPhotoOk] = useState(Boolean(member.photo));

  function handleClick() {
    if (photoOk && window._openLightbox) {
      window._openLightbox(member.photo, member.name + " — " + member.role);
    }
  }

  if (photoOk) {
    return h("img", {
      src: member.photo,
      alt: member.name,
      className: "avatar avatar--photo clickable",
      onError: () => setPhotoOk(false),
      onClick: handleClick,
    });
  }
  return h("div", { className: "avatar", style: { background: member.color } }, member.name[0]);
}

function Roster() {
  const { useEffect, useRef } = React;
  const gridRef = useRef(null);
  const members = window.SITE_DATA.members;

  useEffect(() => {
    gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: { trigger: gridRef.current, start: "top 85%" },
      }
    );
  }, []);

  return h(
    "section",
    { id: "anggota", className: "section wrap" },
    h("h2", null, "Membership"),
    h(
      "div",
      { className: "roster-note scrawl" },
      "Dia Masa Lalumu, Aku Masa Depanmu *weng weng"
    ),
    h(
      "div",
      { className: "roster-grid", ref: gridRef },
      members.map((m, i) =>
        h(
          "div",
          {
            className: "card",
            key: i,
            style: { transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (1.5 + (i % 3))}deg)` },
          },
          h(Tack, { color: m.color, style: { top: -9, left: "50%", marginLeft: -7 } }),
          h(MemberAvatar, { member: m }),
          h("h3", null, m.name),
          h("div", { className: "role" }, m.role),
          h("div", { className: "quote" }, m.quote)
        )
      )
    )
  );
}
