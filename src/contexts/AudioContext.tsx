import React, { createContext, useContext, useRef } from "react";

type AudioCtx = {
  play: (src: string) => void;
  stop: () => void;
};

const Ctx = createContext<AudioCtx | null>(null);

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = (src: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(src);
    audio.volume = 0.9;
    audio.loop = true;

    audio.play().catch(err => {
      console.error("Audio blocked until user interaction", err);
    });

    audioRef.current = audio;
  };

  const stop = () => {
    audioRef.current?.pause();
    audioRef.current = null;
  };

  return (
    <Ctx.Provider value={{ play, stop }}>
      {children}
    </Ctx.Provider>
  );
};

export const useAudio = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAudio must be used inside AudioProvider");
  return ctx;
};
