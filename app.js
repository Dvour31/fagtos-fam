function App() {
  const { useEffect, useRef, useState, useCallback } = React;
  const tracks = window.SITE_DATA.playlist;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const autoplayTriedRef = useRef(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  // Auto-play musik saat halaman dimuat
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !tracks[0] || autoplayTriedRef.current) return;
    autoplayTriedRef.current = true;

    audio.src = tracks[0].src;
    audio.volume = 0.7;
    var playAttempt = audio.play();
    if (playAttempt !== undefined) {
      playAttempt.then(function () {
        setIsPlaying(true);
      }).catch(function () {
        // Browser blokir autoplay — tunggu user interaksi pertama
        setIsPlaying(false);
        function unlockAudio() {
          audio.play().then(function () {
            setIsPlaying(true);
          }).catch(function () { });
          document.removeEventListener("click", unlockAudio);
          document.removeEventListener("touchstart", unlockAudio);
          document.removeEventListener("scroll", unlockAudio);
        }
        document.addEventListener("click", unlockAudio, { once: false });
        document.addEventListener("touchstart", unlockAudio, { once: false });
        document.addEventListener("scroll", unlockAudio, { once: false });
      });
    }
  }, []);

  // ganti sumber audio tiap kali lagu berpindah
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !tracks[currentIndex]) return;
    // Skip kalau ini mount pertama (sudah dihandle oleh autoplay di atas)
    if (currentIndex === 0 && !isPlaying && autoplayTriedRef.current) return;
    audio.src = tracks[currentIndex].src;
    if (isPlaying) {
      audio.play().catch(() => {
        setIsPlaying(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const selectTrack = (i) => {
    setCurrentIndex(i);
    setIsPlaying(true);
  };

  const nextTrack = () => setCurrentIndex((i) => (i + 1) % tracks.length);
  const prevTrack = () => setCurrentIndex((i) => (i - 1 + tracks.length) % tracks.length);

  return h(
    React.Fragment,
    null,
    h(Header, null),
    h(Hero, null),
    h(Tentang, null),
    h(Roster, null),
    h(Galeri, null),
    h(BacksoundSection, {
      tracks,
      currentIndex,
      isPlaying,
      onSelect: selectTrack,
      onTogglePlay: togglePlay,
    }),
    h(Kontak, null),
    h("footer", { className: "scrawl" }, "Pergi ke pasar membeli ketan, Ketan dimakan di tepi kali, Meski waktu terus berjalan, Semua kenangan selalu di hati — FF(Forever n eFer)"),
    h(MiniPlayer, {
      tracks,
      currentIndex,
      isPlaying,
      onTogglePlay: togglePlay,
      onNext: nextTrack,
      onPrev: prevTrack,
    }),
    h("audio", {
      ref: audioRef,
      onEnded: nextTrack,
      onPause: () => setIsPlaying(false),
      onPlay: () => setIsPlaying(true),
    }),
    h(Lightbox, null)
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(h(App, null));
