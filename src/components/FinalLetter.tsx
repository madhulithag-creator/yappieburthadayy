import { useEffect, useRef, useState } from "react";
import bombsSound from "../music/music1.mp3";
import LetterImg from "../assets/letter.png";

type Bomb = {
  id: number;
  left: number;
  delay: number;
  size: number;
  rotation: number;
};

type FinalLetterProps = {
  onRestart: () => void;
};

export default function FinalLetter({ onRestart }: FinalLetterProps) {
  const [bombs, setBombs] = useState<Bomb[]>([]);
  const [showLetter, setShowLetter] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const bombIdRef = useRef(0);

  // create audio ONCE
  useEffect(() => {
    audioRef.current = new Audio(bombsSound);
    audioRef.current.preload = "auto";
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setShowLetter(true), 400);
    return () => clearTimeout(t);
  }, []);

  const sendBomb = () => {
    // 🔊 PLAY SOUND (user click = allowed)
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }

    // 💣 create bombs
    const batch: Bomb[] = [];

    for (let i = 0; i < 10; i++) {
      batch.push({
        id: ++bombIdRef.current,
        left: 5 + Math.random() * 90,
        delay: i * 80,
        size: 22 + Math.random() * 16,
        rotation: -30 + Math.random() * 60,
      });
    }

    setBombs((prev) => [...prev, ...batch]);

    setTimeout(() => {
      setBombs((prev) =>
        prev.filter((b) => !batch.some((x) => x.id === b.id))
      );
    }, 2600);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#fff7ec] overflow-hidden">
      {bombs.map((b) => (
        <div
          key={b.id}
          className="absolute animate-bomb"
          style={{
            left: `${b.left}%`,
            bottom: "-40px",
            fontSize: `${b.size}px`,
            transform: `rotate(${b.rotation}deg)`,
            animationDelay: `${b.delay}ms`,
          }}
        >
          💣
        </div>
      ))}

      {showLetter && (
        <div className="w-full max-w-3xl bg-[#fff8e7] rounded-3xl p-8 shadow-xl relative">
          <img
            src={LetterImg}
            alt="Letter"
            className="absolute -top-6 -right-6 w-24 rotate-12"
          />

          <p className="text-lg leading-relaxed text-gray-800">
            This is your final letter 💛  
            I hope this made you smile.
          </p>

          <div className="mt-6 flex gap-4 justify-center">
            <button
              onClick={onRestart}
              className="bg-pink-400 text-white px-6 py-2 rounded-full"
            >
              Restart
            </button>

            <button
              onClick={sendBomb}
              className="bg-green-300 px-6 py-2 rounded-full"
            >
              Send Bombs 💣
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
