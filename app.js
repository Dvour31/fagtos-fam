function App() {
  const { useEffect, useRef, useState } = React;
  const tracks = window.SITE_DATA.playlist;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const currentIndexRef = useRef(0);
  const isChangingTrackRef = useRef(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  // Sinkronkan ref agar tidak stale di closure event listener
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  // Fungsi ganti lagu dan putar
  const playTrack = (index, shouldPlay = true) => {
    const audio = audioRef.current;
    if (!audio || !tracks[index]) return;

    isChangingTrackRef.current = true;
    setCurrentIndex(index);
    currentIndexRef.current = index;

    audio.src = tracks[index].src;
    audio.currentTime = 0;

    if (shouldPlay) {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        })
        .finally(() => {
          isChangingTrackRef.current = false;
        });
    } else {
      audio.pause();
      setIsPlaying(false);
      isChangingTrackRef.current = false;
    }
  };

  const nextTrack = () => {
    const nextIdx = (currentIndexRef.current + 1) % tracks.length;
    playTrack(nextIdx, true);
  };

  const prevTrack = () => {
    const prevIdx = (currentIndexRef.current - 1 + tracks.length) % tracks.length;
    playTrack(prevIdx, true);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      if (!audio.src || !audio.src.includes(".mp3")) {
        audio.src = tracks[currentIndexRef.current].src;
      }
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  };

  const selectTrack = (i) => {
    playTrack(i, true);
  };

  // Autoplay saat pertama kali dibuka & unlock untuk mobile/desktop
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !tracks[0]) return;

    audio.volume = 0.7;
    audio.src = tracks[0].src;

    let unlocked = false;

    // 1. Coba autoplay langsung (berhasil di desktop yang mengizinkan)
    const playAttempt = audio.play();
    if (playAttempt !== undefined) {
      playAttempt
        .then(() => {
          setIsPlaying(true);
          unlocked = true;
        })
        .catch(() => {
          // Browser memblokir autoplay otomatis tanpa interaksi
          setIsPlaying(false);
        });
    }

    // 2. Sentuhan/klik pertama pengguna untuk unlock audio di mobile & desktop
    const unlockAudio = () => {
      if (unlocked) return;
      const a = audioRef.current;
      if (!a) return;

      a.play()
        .then(() => {
          setIsPlaying(true);
          unlocked = true;
          cleanupListeners();
        })
        .catch(() => {
          // Jangan remove jika gagal, tunggu interaksi berikutnya
        });
    };

    // Dengarkan event gesture pengguna yang valid (tanpa 'scroll', karena browser menolak audio dari scroll)
    const events = ["click", "touchstart", "touchend", "pointerdown", "keydown"];
    const cleanupListeners = () => {
      events.forEach((evt) => {
        document.removeEventListener(evt, unlockAudio, true);
      });
    };

    events.forEach((evt) => {
      document.addEventListener(evt, unlockAudio, { capture: true, passive: true });
    });

    return () => {
      cleanupListeners();
    };
  }, []);

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
    h(
      "footer",
      { className: "scrawl" },
      "Pergi ke pasar membeli ketan, Ketan dimakan di tepi kali, Meski waktu terus berjalan, Semua kenangan selalu di hati — FF(Forever n eFer)"
    ),
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
      preload: "auto",
      onEnded: nextTrack,
      onPause: () => {
        // Abaikan pause jika sedang proses ganti lagu atau lagu baru saja tamat
        if (isChangingTrackRef.current) return;
        if (audioRef.current && audioRef.current.ended) return;
        setIsPlaying(false);
      },
      onPlay: () => {
        setIsPlaying(true);
      },
    }),
    h(Lightbox, null)
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(h(App, null));
