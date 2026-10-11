import { useEffect, useRef, useState } from "react";
import { Pause, Play, SkipBack, SkipForward, Upload, Volume2 } from "lucide-react";
import Flower from "../components/Flower";
import Reveal from "../components/Reveal";
import TextReveal from "../components/TextReveal";
import { playlist } from "../data/content";

function formatTime(sec) {
  if (!Number.isFinite(sec)) return "--:--";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function Music() {
  const audioRef = useRef(null);
  const [tracks, setTracks] = useState(playlist);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [error, setError] = useState("");

  const track = tracks[index];

  // Keep the volume in sync with the slider
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  // When the track changes, reset the timer and continue playing if already playing
  useEffect(() => {
    setError("");
    setProgress(0);
    setCurrent(0);
    setDuration(0);
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.play().catch(() => {
        setPlaying(false);
        setError("This track could not start. Check the audio file.");
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track.id]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.play()
        .then(() => {
          setPlaying(true);
          setError("");
        })
        .catch(() => {
          setPlaying(false);
          setError("This audio file is not available yet. Add it to public/audio or choose a file from your device.");
        });
    } else {
      a.pause();
      setPlaying(false);
    }
  };

  const go = (dir) => setIndex((i) => (i + dir + tracks.length) % tracks.length);

  const onFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const newTrack = {
      id: `local-${Date.now()}`,
      title: file.name.replace(/\.[^.]+$/, ""),
      artist: "From your device",
      src: URL.createObjectURL(file),
    };
    setTracks((t) => [...t, newTrack]);
    setIndex(tracks.length);
    setPlaying(false);
    e.target.value = "";
  };

  const seek = (e) => {
    const a = audioRef.current;
    if (!a || !duration) return;
    a.currentTime = (Number(e.target.value) / 100) * duration;
  };

  return (
    <section className="page-section music">
      <div className="container center">
        <p className="eyebrow">Music and mood</p>
        <h1 className="display">
          <TextReveal text="A Soundtrack for Your Little World" />
        </h1>
        <Reveal delay={0.3}>
          <p className="lead">Press play when you are ready. Music never starts on its own.</p>
        </Reveal>
      </div>

      <div className="music-layout">
        <Reveal>
          <div className="player glass">
            <div className="vinyl-wrap">
              <div className={`vinyl ${playing ? "spinning" : ""}`}>
                <div className="vinyl-label">
                  <Flower size={64} variant="plum" />
                </div>
              </div>
            </div>

            <div className="eq" aria-hidden="true">
              {Array.from({ length: 7 }).map((_, i) => (
                <span key={i} className={`eq-bar ${playing ? "on" : ""}`} style={{ animationDelay: `${i * 0.12}s` }} />
              ))}
            </div>

            <div className="track-info">
              <h2>{track.title}</h2>
              <p>{track.artist}</p>
            </div>

            <audio
              ref={audioRef}
              src={track.src || undefined}
              preload="metadata"
              onTimeUpdate={(e) => {
                const a = e.currentTarget;
                setCurrent(a.currentTime);
                setProgress(a.duration ? (a.currentTime / a.duration) * 100 : 0);
              }}
              onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
              onEnded={() => {
                if (tracks.length > 1) go(1);
                else setPlaying(false);
              }}
              onError={() => {
                setPlaying(false);
                setError("This audio file is not available yet. Add it to public/audio or choose a file from your device.");
              }}
            />

            <label className="sr-only" htmlFor="seek">
              Seek
            </label>
            <input
              id="seek"
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={progress}
              onChange={seek}
              className="range"
              aria-valuetext={`${formatTime(current)} of ${formatTime(duration)}`}
            />
            <div className="time-row">
              <span>{formatTime(current)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            <div className="controls">
              <button className="icon-btn" onClick={() => go(-1)} aria-label="Previous track">
                <SkipBack size={20} />
              </button>
              <button className="icon-btn big" onClick={toggle} aria-label={playing ? "Pause" : "Play"}>
                {playing ? <Pause size={26} /> : <Play size={26} />}
              </button>
              <button className="icon-btn" onClick={() => go(1)} aria-label="Next track">
                <SkipForward size={20} />
              </button>
            </div>

            <div className="volume">
              <Volume2 size={18} aria-hidden="true" />
              <label className="sr-only" htmlFor="volume">
                Volume
              </label>
              <input
                id="volume"
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="range"
              />
            </div>

            {error && (
              <p className="audio-error" role="alert">
                {error}
              </p>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <aside className="playlist glass">
            <h2 className="card-title">Playlist</h2>
            <ol className="track-list">
              {tracks.map((t, i) => (
                <li key={t.id}>
                  <button
                    className={`track-btn ${i === index ? "active" : ""}`}
                    onClick={() => {
                      setIndex(i);
                      setPlaying(false);
                    }}
                    aria-current={i === index ? "true" : undefined}
                  >
                    <span className="track-num">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <strong>{t.title}</strong>
                      <small>{t.artist}</small>
                    </span>
                  </button>
                </li>
              ))}
            </ol>

            <label className="upload">
              <Upload size={18} />
              <span>Choose a song from your device</span>
              <input type="file" accept="audio/*" onChange={onFile} />
            </label>
            <p className="small-note">
              To add songs to the playlist, place audio files in <code>public/audio/</code> and update the list in{" "}
              <code>src/data/content.js</code>.
            </p>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
