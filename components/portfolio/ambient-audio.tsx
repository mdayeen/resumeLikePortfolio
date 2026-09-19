"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import s from "./ambient-audio.module.css";

// An original generative C-major ambient arrangement. No samples or third-party audio.
const chords = [
  [130.81, 164.81, 196, 246.94],
  [110, 164.81, 220, 261.63],
  [87.31, 130.81, 174.61, 220],
  [98, 146.83, 196, 246.94],
];

export function AmbientAudio() {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(25);
  const [error, setError] = useState(false);
  const audio = useRef<{
    context: AudioContext;
    master: GainNode;
    timer: ReturnType<typeof setInterval>;
    notes: Set<OscillatorNode>;
  } | null>(null);
  const playingRef = useRef(false);
  const volumeRef = useRef(25);
  const stop = () => {
    const state = audio.current;
    if (!state) return;
    state.master.gain.cancelScheduledValues(state.context.currentTime);
    state.master.gain.setTargetAtTime(0, state.context.currentTime, 0.2);
    void state.context.suspend();
  };
  useEffect(() => {
    const visibility = () => {
      const state = audio.current;
      if (!state) return;
      if (document.hidden) stop();
      else if (playingRef.current) {
        void state.context
          .resume()
          .then(() =>
            state.master.gain.setTargetAtTime(
              (volumeRef.current / 100) * 0.1,
              state.context.currentTime,
              0.7,
            ),
          )
          .catch(() => {
            playingRef.current = false;
            setPlaying(false);
            setError(true);
          });
      }
    };
    document.addEventListener("visibilitychange", visibility);
    return () => {
      document.removeEventListener("visibilitychange", visibility);
      const state = audio.current;
      if (state) {
        clearInterval(state.timer);
        state.notes.forEach((note) => {
          try {
            note.stop();
          } catch {}
        });
        void state.context.close();
      }
    };
  }, []);

  const toggle = async () => {
    if (playingRef.current) {
      playingRef.current = false;
      setPlaying(false);
      stop();
      return;
    }
    try {
      if (!audio.current) {
        const context = new AudioContext();
        const master = context.createGain();
        master.gain.value = 0;
        const filter = context.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = 1200;
        const compressor = context.createDynamicsCompressor();
        master.connect(filter);
        filter.connect(compressor);
        compressor.connect(context.destination);
        const notes = new Set<OscillatorNode>();
        let index = 0,
          next = context.currentTime + 0.1;
        const schedule = () => {
          if (context.state !== "running") return;
          while (next < context.currentTime + 1) {
            const frequencies = chords[index % chords.length];
            frequencies.forEach((frequency, i) => {
              const oscillator = context.createOscillator();
              const gain = context.createGain();
              oscillator.type = "sine";
              oscillator.frequency.value = frequency;
              oscillator.detune.value = (i - 1.5) * 3;
              const start = next + i * 0.12;
              gain.gain.setValueAtTime(0, start);
              gain.gain.linearRampToValueAtTime(0.35, start + 1.8);
              gain.gain.setTargetAtTime(0, start + 4.5, 1.2);
              oscillator.connect(gain);
              gain.connect(master);
              oscillator.start(start);
              oscillator.stop(start + 9);
              notes.add(oscillator);
              oscillator.onended = () => {
                notes.delete(oscillator);
                gain.disconnect();
                oscillator.disconnect();
              };
            });
            const bell = context.createOscillator(),
              envelope = context.createGain();
            bell.type = "sine";
            bell.frequency.value = frequencies[(index + 2) % 4] * 4;
            envelope.gain.setValueAtTime(0, next + 2);
            envelope.gain.linearRampToValueAtTime(0.1, next + 2.06);
            envelope.gain.exponentialRampToValueAtTime(0.0001, next + 6.5);
            bell.connect(envelope);
            envelope.connect(master);
            bell.start(next + 2);
            bell.stop(next + 7);
            notes.add(bell);
            bell.onended = () => {
              notes.delete(bell);
              envelope.disconnect();
              bell.disconnect();
            };
            next += 6;
            index++;
          }
        };
        audio.current = {
          context,
          master,
          notes,
          timer: setInterval(schedule, 250),
        };
        await context.resume();
        schedule();
      } else await audio.current.context.resume();
      playingRef.current = true;
      setPlaying(true);
      setError(false);
      const state = audio.current;
      state.master.gain.setTargetAtTime(
        (volumeRef.current / 100) * 0.1,
        state.context.currentTime,
        0.7,
      );
    } catch {
      playingRef.current = false;
      setPlaying(false);
      setError(true);
    }
  };

  return (
    <div className={s.dock} data-playing={playing}>
      {playing && (
        <label className={s.volume}>
          <span className={s.srOnly}>Ambient music volume</span>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(event) => {
              const value = Number(event.target.value);
              setVolume(value);
              volumeRef.current = value;
              const state = audio.current;
              if (state)
                state.master.gain.setTargetAtTime(
                  (value / 100) * 0.1,
                  state.context.currentTime,
                  0.15,
                );
            }}
          />
        </label>
      )}
      <button
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? "Pause ambient music" : "Play soft ambient music"}
      >
        <span className={s.bars} aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
        {playing ? <Volume2 size={14} /> : <VolumeX size={14} />}
        <span>
          {error ? "RETRY SOUND" : playing ? "SOUND ON" : "SOUND OFF"}
        </span>
      </button>
      <span className={s.srOnly} role="status">
        {error ? "Audio could not start. Tap to retry." : ""}
      </span>
    </div>
  );
}
