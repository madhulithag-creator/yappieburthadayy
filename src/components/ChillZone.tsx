import React, { useEffect, useRef, useState } from "react";
import textConfig from "../textConfig";

import music1 from "../music/music1.mp3";
import music2 from "../music/music2.mp3";
import music3 from "../music/music3.mp3";

type Track = {
  id: number;
  title: string;
  caption: string;
  src: string;
};

interface ChillZoneProps {
  onNext?: () => void;
}

export default function ChillZone({ onNext }: ChillZoneProps) {
  const tracks: Track[] = [
    { id: 1, title: "Chill Vibes 1", caption: "Relaxing beats", src: music1 },
    { id: 2, title: "Chill Vibes 2", caption: "Smooth groove", src: music2 },
    { id: 3, title: "Chill Vibes 3", caption: "Calm waves", src: music3 },
  ];

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [activeTrack, setActiveTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Handle play / switch track
  const handleTrackClick = (track: Track) => {
    // Same track → toggle
    if (activeTrack?.id === track.id) {
      if (!audioRef.current) return;

      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
      return;
    }

    // New track
    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(track.src);
    audioRef.current = audio;

    audio.play();
    setActiveTrack(track);
    setIsPlaying(true);

    audio.onloadedmetadata = () => {
      setDuration(audio.duration);
    };

    audio.ontimeupdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.onended = () => {
      setIsPlaying(false);
    };
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const val = Number(e.target.value);
    audioRef.current.currentTime = val;
    setCurrentTime(val);
  };

  const formatTime = (s: number) => {
    if (!isFinite(s)) return "0:00";
    const m = Math.floor(s / 60);
    const secs = Math.floor(s % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${secs}`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h2 className="text-pink-500 font-bold mb-2">
        {textConfig.chillZone.heading}
      </h2>

      <p className="text-sm text-pink-400 mb-6">
        {textConfig.chillZone.subheading}
      </p>

      {/* Player */}
      <div className="bg-white p-4 rounded-xl shadow-md w-full max-w-md mb-6">
        {activeTrack ? (
          <>
            <div className="font-bold">{activeTrack.title}</div>
            <div className="text-sm text-gray-500 mb-2">
              {activeTrack.caption}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs">{formatTime(currentTime)}</span>
              <input
                type="range"
                min={0}
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="flex-1"
              />
              <span className="text-xs">{formatTime(duration)}</span>
            </div>

            <button
              onClick={togglePlayPause}
              className="mt-3 px-4 py-2 bg-pink-500 text-white rounded-full"
            >
              {isPlaying ? "Pause" : "Play"}
            </button>
          </>
        ) : (
          <div className="text-center text-gray-400">
            {textConfig.chillZone.chooseTrackHint}
          </div>
        )}
      </div>

      {/* Tracks */}
      <div className="flex gap-4">
        {tracks.map((track) => (
          <button
            key={track.id}
            onClick={() => handleTrackClick(track)}
            className={`px-4 py-3 rounded-xl border ${
              activeTrack?.id === track.id
                ? "border-pink-400 bg-pink-50"
                : "border-gray-200"
            }`}
          >
            <div className="font-semibold">{track.title}</div>
            <div className="text-xs text-gray-500">{track.caption}</div>
          </button>
        ))}
      </div>

      <button
        onClick={onNext}
        className="mt-8 px-6 py-3 rounded-full bg-pink-500 text-white"
      >
        {textConfig.chillZone.continueButton}
      </button>
    </div>
  );
}
