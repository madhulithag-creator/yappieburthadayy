// src/components/FinalLetter.tsx
import React, { useEffect, useRef, useState } from "react";
import { Mail, Heart, Star } from "lucide-react";
import textConfig from "../textConfig";
import LetterImg from "../imgs/lastletter.png";

interface FinalLetterProps {
  onRestart: () => void;
}

export default function FinalLetter({ onRestart }: FinalLetterProps) {
  const [showLetter, setShowLetter] = useState(false);
  const [showSealing, setShowSealing] = useState(false);
  const [isSealed, setIsSealed] = useState(false);
  const typingTextRef = useRef(textConfig.finalLetter.typedDefault);
  const [typedText, setTypedText] = useState("");
  const typingTimerRef = useRef<number | null>(null);

  // kiss animation state: store an array of kiss particles to render
  const [kisses, setKisses] = useState<
    { id: number; left: number; delay: number; size: number; rotation: number }[]
  >([]);
  const kissIdRef = useRef(0);

  useEffect(() => {
    const t = window.setTimeout(() => setShowLetter(true), 420);
    return () => window.clearTimeout(t);
  }, []);

  // typing for signature
  useEffect(() => {
    if (!isSealed) {
      setTypedText("");
      if (typingTimerRef.current) {
        window.clearInterval(typingTimerRef.current);
        typingTimerRef.current = null;
      }
      return;
    }
    const str = typingTextRef.current;
    let i = 0;
    typingTimerRef.current = window.setInterval(() => {
      i += 1;
      setTypedText(str.slice(0, i));
      if (i >= str.length && typingTimerRef.current) {
        window.clearInterval(typingTimerRef.current);
        typingTimerRef.current = null;
      }
    }, 45);
    return () => {
      if (typingTimerRef.current) {
        window.clearInterval(typingTimerRef.current);
        typingTimerRef.current = null;
      }
    };
  }, [isSealed]);

  const sealLetter = () => {
    setShowSealing(true);
    setTimeout(() => {
      setIsSealed(true);
      setShowSealing(false);
    }, 1400);
  };

  const sendKiss = () => {
    // generate 10 kisses with varied x positions, sizes, delays and small rotations
    const batch: typeof kisses = [];
    for (let i = 0; i < 10; i++) {
      const id = ++kissIdRef.current;
      batch.push({
        id,
        left: 8 + Math.random() * 84, // percent
        delay: i * 80 + Math.random() * 120, // ms
        size: 18 + Math.round(Math.random() * 18), // px (emoji size)
        rotation: -20 + Math.random() * 40, // deg
      });
    }
    setKisses((s) => [...s, ...batch]);

    // cleanup kisses after animation (2.2s + max delay)
    const maxDelay = Math.max(...batch.map((k) => k.delay));
    setTimeout(() => {
      setKisses((s) => s.filter((k) => !batch.find((b) => b.id === k.id)));
    }, 2200 + maxDelay);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF4F8] via-[#FFE4F1] to-[#FFEEF2] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements - matching ActivityPage */}
      <svg className="absolute top-10 left-10 w-6 h-6 text-pink-200 opacity-60 animate-bounce-slow" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21s-6-4.35-8.5-6.5C1.85 12.73 3 9 6 8c2.28-.75 3.5 1 6 1s3.72-1.75 6-1c3 1 4.15 4.73 2.5 6.5C18 16.65 12 21 12 21z" />
      </svg>
      <svg className="absolute top-20 right-16 w-4 h-4 text-pink-300 opacity-50 animate-bounce-slow" viewBox="0 0 24 24" fill="currentColor" style={{ animationDelay: '0.5s' }}>
        <path d="M12 21s-6-4.35-8.5-6.5C1.85 12.73 3 9 6 8c2.28-.75 3.5 1 6 1s3.72-1.75 6-1c3 1 4.15 4.73 2.5 6.5C18 16.65 12 21 12 21z" />
      </svg>
      <svg className="absolute bottom-16 left-20 w-5 h-5 text-pink-200 opacity-40 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21s-6-4.35-8.5-6.5C1.85 12.73 3 9 6 8c2.28-.75 3.5 1 6 1s3.72-1.75 6-1c3 1 4.15 4.73 2.5 6.5C18 16.65 12 21 12 21z" />
      </svg>

      {/* kiss particles (improved animation) */}
      <div className="pointer-events-none fixed inset-0 z-40">
        {kisses.map((k) => (
          <div
            key={k.id}
            className="kiss-particle"
            style={{
              left: `${k.left}%`,
              bottom: 12,
              fontSize: k.size,
              transform: `translateX(-50%) rotate(${k.rotation}deg)`,
              animationDelay: `${k.delay}ms`,
            }}
          >
            <span className="block">💣</span>
            <span className="sparkle" />
          </div>
        ))}
      </div>

      {/* sealing overlay */}
      {showSealing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#fff0f4]/75">
          <div className="flex flex-col items-center gap-3">
            <div className="text-7xl animate-seal-spin">{textConfig.finalLetter.sealingEmoji}</div>
            <div className="text-sm text-[#9a4c73]">{textConfig.finalLetter.sealingText}</div>
          </div>
        </div>
      )}

      {/* Main content container - matching ActivityPage structure */}
      <div className="w-full max-w-3xl">
        {/* Header - matching ActivityPage */}
        <div className="flex items-center justify-center gap-2 mb-6 animate-slideDown">
          <div className="text-center">
            <h2 className="text-[#f04299] text-lg sm:text-xl font-bold leading-tight">
              {textConfig.finalLetter.pageTitle}
            </h2>
            <div className="text-xs text-[#9a4c73] mt-1">
              {textConfig.finalLetter.pageSubtitle}
            </div>
          </div>
        </div>

        {/* Main Panel - matching ActivityPage structure */}
        <div className="bg-[#FFF8E7] rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-pink-200 shadow-xl animate-fadeIn relative">
          
          {/* Transparent floating image at top right - like LandingPage */}
          <div 
            className="absolute -top-6 -right-6 animate-float-slow opacity-80 pointer-events-none z-10"
            style={{
              transform: 'rotate(15deg)',
            }}
          >
            <img
              src={LetterImg}
              alt={textConfig.finalLetter.stickerAlt}
              className="w-28 h-auto object-contain drop-shadow-lg"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>

          {/* main centered letter */}
          <div
            className={`relative transition-all duration-600 ${
              showLetter ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {!isSealed ? (
              <div className="bg-white rounded-xl p-6 sm:p-8 shadow-inner border border-pink-100 min-h-[400px] relative">
                {/* Paper texture background - matching ActivityPage */}
                <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-pink-50 to-transparent rounded-xl" />

                {/* Decorative hearts - matching ActivityPage */}
                <div className="absolute -top-2 -right-2 text-pink-300 text-sm animate-bounce-slow">{textConfig.finalLetter.decorativeEmojis.topRight}</div>
                <div className="absolute -bottom-2 -left-2 text-pink-300 text-xs animate-bounce-slow" style={{ animationDelay: '0.5s' }}>{textConfig.finalLetter.decorativeEmojis.bottomLeft}</div>

                {/* Letter header - matching ActivityPage structure */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-pink-100 relative">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#f04299] flex items-center justify-center text-white text-sm">
                        {textConfig.finalLetter.letterIcon}
                      </div>
                      <span className="text-sm font-semibold text-[#9a4c73]">{textConfig.finalLetter.title}</span>
                    </div>
                  </div>

                  {/* Letter content - matching handwriting style */}
                  <div className="handwriting text-sm sm:text-base leading-relaxed text-[#1b0d14] pb-6 pt-6">
                    {/* Greeting */}
                    <div className="mb-4 text-[#f04299] font-medium">
                      {textConfig.finalLetter.letterGreeting}
                    </div>

                    {/* Letter paragraphs */}
                    <div className="space-y-4 mb-6">
                      {textConfig.finalLetter.letterParagraphs.map((paragraph: string, index: number) => (
                          <p 
                            key={index}
                            className={`${
                              index === 0 ? 'text-[#1b0d14]' :
                              index === 1 ? 'text-[#7fbcd9]' :
                              index === 2 ? 'text-[#1b0d14]' :
                              index === 3 ? 'text-[#cdb4db]' :
                              'text-[#f04299] font-medium'
                            }`}
                          >
                            {paragraph}
                          </p>
                        ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row justify-between gap-3 items-center border-t border-pink-100 pt-4">
                    <div className="text-xs text-[#9a4c73]">{textConfig.finalLetter.sealingNote}</div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          sealLetter();
                        }}
                        className="rounded-full bg-gradient-to-r from-[#ff9aa8] to-[#ffd1dc] px-5 py-2.5 text-sm sm:text-base font-bold shadow-md hover:scale-105 transition text-white"
                      >
                        {textConfig.finalLetter.sealButton}
                      </button>

                      <button
                        onClick={onRestart}
                        className="rounded-full bg-[#9be7c4] px-4 py-2.5 text-sm sm:text-base font-medium shadow-md hover:brightness-95 transition"
                      >
                        {textConfig.finalLetter.restartButton}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Sealed letter state */
              <div className="bg-white rounded-xl p-8 sm:p-10 shadow-inner border border-pink-100 text-center relative min-h-[400px] flex flex-col justify-center">
                {/* Paper texture background */}
                <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-pink-50 to-transparent rounded-xl" />
                
                {/* Decorative elements */}
                <div className="absolute -top-2 -right-2 text-pink-300 text-sm animate-bounce-slow">{textConfig.finalLetter.decorativeEmojis.topRight}</div>
                <div className="absolute -bottom-2 -left-2 text-pink-300 text-xs animate-bounce-slow" style={{ animationDelay: '0.5s' }}>{textConfig.finalLetter.decorativeEmojis.bottomLeft}</div>

                <div className="relative z-10">
                  <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-gradient-to-br from-[#ffbcd2] to-[#ffd1dc] flex items-center justify-center shadow-inner">
                    <div className="text-4xl">{textConfig.finalLetter.sealedEmoji}</div>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-[#f04299] mb-2">
                    {textConfig.finalLetter.sealedTitle}
                  </h2>
                  <p className="text-sm sm:text-base text-[#9a4c73] mb-5">
                    {textConfig.finalLetter.sealedSubtitle}
                  </p>

                  <div className="flex justify-center gap-2 mb-5">
                    {Array.from({ length: textConfig.finalLetter.heartCount || 7 }).map((_, i) => (
                      <Heart
                        key={i}
                        size={18}
                        className="text-[#ffb6c1] animate-pulse-heart"
                        style={{ animationDelay: `${i * 140}ms` }}
                      />
                    ))}
                  </div>

                  <div className="text-lg sm:text-xl font-semibold text-[#1b0d14] mb-1">
                    <span className="text-[#c0396f]">{typedText || textConfig.finalLetter.typedDefault}</span>
                  </div>
                  <div className="text-xs text-[#9a4c73] mb-6">
                    {new Date().toLocaleDateString(textConfig.finalLetter.dateLocale, {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>

                  <div className="flex flex-col sm:flex-row justify-center gap-3">
                    <button
                      onClick={onRestart}
                      className="rounded-full bg-[#f04299] text-white px-5 py-2.5 text-sm sm:text-base font-semibold shadow hover:scale-105 transition"
                    >
                      {textConfig.finalLetter.experienceAgain}
                    </button>

                    <button
                      onClick={() => {
                        sendKiss();
                      }}
                      className="rounded-full bg-[#9be7c4] px-5 py-2.5 text-sm sm:text-base font-medium shadow hover:brightness-95 transition"
                    >
                      {textConfig.finalLetter.sendKissButton}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* styles */}
      <style>{`
        .animate-float-slow { animation: floatSlow 10s ease-in-out infinite; }
        .animate-float-rev { animation: floatRev 9s ease-in-out infinite; }
        .animate-pulse-tiny { animation: pulseTiny 6s ease-in-out infinite; }
        .animate-seal-spin { animation: spinSeal 1.4s ease-in-out; }
        .animate-pulse-heart { animation: pulseHeart 1.1s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce 3s ease-in-out infinite; }
        .animate-slideDown { animation: slideDown 0.6s ease-out; }
        .animate-fadeIn { animation: fadeIn 0.8s ease-out; }

        @keyframes slideDown {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes floatSlow {
          0% { transform: translateY(0) translateX(0); opacity: .9; }
          50% { transform: translateY(-12px) translateX(6px); opacity: 1; }
          100% { transform: translateY(0) translateX(0); opacity: .9; }
        }
        @keyframes floatRev {
          0% { transform: translateY(0) translateX(0); opacity: .9; }
          50% { transform: translateY(10px) translateX(-6px); opacity: 1; }
          100% { transform: translateY(0) translateX(0); opacity: .9; }
        }
        @keyframes pulseTiny {
          0% { transform: scale(1); opacity: .85; }
          50% { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1); opacity: .85; }
        }
        @keyframes spinSeal {
          0% { transform: rotate(0deg) scale(0.8); opacity: 0; }
          50% { transform: rotate(180deg) scale(1.1); opacity: 1; }
          100% { transform: rotate(360deg) scale(1); opacity: 1; }
        }
        @keyframes pulseHeart {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.18); opacity: 1; }
          100% { transform: scale(1); opacity: 0.8; }
        }

        /* Improved kiss particle animation: drift, rotate, fade, sparkle */
        .kiss-particle {
          position: absolute;
          bottom: 0;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          transform-origin: center;
          will-change: transform, opacity;
          animation: kissRise 1600ms cubic-bezier(.2,.8,.2,1) forwards;
        }
        .kiss-particle .sparkle {
          width: 8px;
          height: 8px;
          margin-top: 6px;
          background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(255,255,255,0.6) 40%, transparent 60%);
          border-radius: 50%;
          opacity: 0.9;
          transform-origin: center;
          animation: sparklePop 800ms ease-out forwards;
        }

        @keyframes kissRise {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg) scale(0.9);
            opacity: 0.95;
          }
          30% {
            transform: translateY(-30px) translateX(var(--driftX, 0px)) rotate(var(--rot, 0deg)) scale(1.05);
            opacity: 1;
          }
          100% {
            transform: translateY(-140px) translateX(var(--driftX, 0px)) rotate(calc(var(--rot, 0deg) * 1.3)) scale(0.9);
            opacity: 0;
          }
        }

        @keyframes sparklePop {
          0% { transform: scale(0.6); opacity: 0; }
          30% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(0.8); opacity: 0; transform: translateY(-20px); }
        }

        /* Handwriting font style */
        .handwriting {
          font-family: 'Kalam', cursive;
          line-height: 1.6;
        }

        /* small responsive tweaks */
        @media (max-width: 640px) {
          .font-display { padding: 12px; }
          .kiss-particle { font-size: 18px; }
        }
      `}</style>
    </div>
  );
}
