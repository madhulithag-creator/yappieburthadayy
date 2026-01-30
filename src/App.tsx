import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import ActivityPage from './components/ActivityPage';
import CakeCutting from './components/CakeCutting';
import ChillZone from './components/ChillZone';
import CardsSection from './components/CardsSection';
import FinalLetter from './components/FinalLetter';
import { AudioProvider } from './contexts/AudioContext';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToPage = (pageIndex: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(pageIndex);
      setIsTransitioning(false);
    }, 500);
  };

  const pages = [
    <LandingPage onEnter={() => goToPage(1)} />,
    <ActivityPage onNext={() => goToPage(2)} />,
    <CakeCutting onNext={() => goToPage(3)} />,
    <ChillZone onNext={() => goToPage(4)} />,
    <CardsSection onNext={() => goToPage(5)} />,
    <FinalLetter onRestart={() => goToPage(0)} />
  ];

  return (
    <AudioProvider>
      <div className="app">
        {/* Enhanced dreamy gradient background */}
        <div className="dreamy-bg" />
        
        {/* Floating subtle particles */}
        <div className="floating-particles" aria-hidden="true">
          {Array.from({ length: 15 }).map((_, i) => (
            <div 
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 20}s`,
                animationDuration: `${15 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>

        {/* Soft grid overlay for notebook feel */}
        <div className="grid-overlay" aria-hidden="true" />

        {/* Animated decorative icons (background only) */}
        <div className="bg-icons" aria-hidden="true">
          {/* star */}
          <svg className="icon icon-star icon-1" viewBox="0 0 24 24" fill="#FFF7A1" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2l2.39 4.84L19 8.1l-3.5 3.41.82 5.04L12 15.77 7.68 16.55l.82-5.04L5 8.1l4.61-1.26L12 2z" />
          </svg>

          {/* cloud - fixed path */}
          <svg className="icon icon-cloud icon-2" viewBox="0 0 24 24" fill="#B0E0E6" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.5 12c1.38 0 2.5 1.12 2.5 2.5S19.88 17 18.5 17H6.5C4.57 17 3 15.43 3 13.5S4.57 10 6.5 10c.28 0 .5-.22.5-.5C7 6.36 9.36 4 12.5 4S18 6.36 18 9.5c0 .28.22.5.5.5z" />
          </svg>

          {/* sparkle */}
          <svg className="icon icon-sparkle icon-3" viewBox="0 0 24 24" fill="#FFD1DC" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2l1.5 3.5L17 7l-3.5 1L12 12l-1.5-4L7 7l3.5-1L12 2z" />
          </svg>

          {/* small star */}
          <svg className="icon icon-star icon-4" viewBox="0 0 24 24" fill="#CDB4DB" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2l2.39 4.84L19 8.1l-3.5 3.41.82 5.04L12 15.77 7.68 16.55l.82-5.04L5 8.1l4.61-1.26L12 2z" />
          </svg>

          {/* Additional romantic elements */}
          <div className="heart-1">💕</div>
          <div className="heart-2">💖</div>
          <div className="sparkle-text-1">✨</div>
          <div className="sparkle-text-2">🌸</div>
        </div>

        <div className={`page-container ${isTransitioning ? 'transitioning' : ''}`}>
          {pages[currentPage]}
        </div>

        <style>{`
          .app {
            position: relative;
            width: 100%;
            min-height: 100vh;
            overflow: hidden;
            font-family: "Plus Jakarta Sans", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
          }

          /* Enhanced dreamy gradient background */
          .dreamy-bg {
            position: fixed;
            inset: 0;
            background: 
              radial-gradient(circle at 20% 80%, rgba(255, 182, 193, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 240, 245, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(176, 224, 230, 0.2) 0%, transparent 50%),
              linear-gradient(135deg, 
                #FFF8E7 0%, 
                #FFF4F8 25%, 
                #F0F8FF 50%, 
                #FFF0F5 75%, 
                #FFFACD 100%
              );
            z-index: 0;
          }

          /* Floating particles for dreamy effect */
          .floating-particles {
            position: fixed;
            inset: 0;
            pointer-events: none;
            z-index: 1;
            overflow: hidden;
          }

          .particle {
            position: absolute;
            width: 4px;
            height: 4px;
            background: radial-gradient(circle, rgba(255, 182, 193, 0.6), rgba(255, 182, 193, 0.2));
            border-radius: 50%;
            animation: floatParticle linear infinite;
          }

          @keyframes floatParticle {
            0% {
              transform: translateY(100vh) rotate(0deg);
              opacity: 0;
            }
            10% {
              opacity: 0.8;
            }
            90% {
              opacity: 0.8;
            }
            100% {
              transform: translateY(-100px) rotate(360deg);
              opacity: 0;
            }
          }

          /* Soft grid overlay for notebook/diary feel */
          .grid-overlay {
            position: fixed;
            inset: 0;
            pointer-events: none;
            z-index: 2;
            background-image: 
              linear-gradient(rgba(255, 182, 193, 0.08) 1px, transparent 1px),
              linear-gradient(to right, rgba(240, 66, 153, 0.06) 1px, transparent 1px);
            background-size: 30px 30px;
            opacity: 0.7;
          }

          /* background icons container (behind pages) */
          .bg-icons {
            position: fixed;
            inset: 0;
            pointer-events: none;
            z-index: 3;
            overflow: hidden;
          }

          /* base icon style */
          .icon {
            position: absolute;
            opacity: 0.85;
            filter: drop-shadow(0 4px 12px rgba(255, 182, 193, 0.15));
            transform-origin: center;
          }

          /* individual icon placements + animations - adjusted positioning */
          .icon-1 { width: 90px; height: 90px; left: 8%; top: 10%; animation: floatSlow 8s ease-in-out infinite; }
          .icon-2 { width: 120px; height: 120px; right: 10%; top: 16%; animation: floatReverse 10s ease-in-out infinite; }
          .icon-3 { width: 70px; height: 70px; left: 22%; bottom: 14%; animation: pulseTiny 6s ease-in-out infinite; transform-origin: center; }
          .icon-4 { width: 48px; height: 48px; right: 20%; bottom: 24%; animation: floatSlow 9s ease-in-out infinite; }

          /* Additional romantic elements */
          .heart-1, .heart-2, .sparkle-text-1, .sparkle-text-2 {
            position: absolute;
            font-size: 24px;
            opacity: 0.6;
            filter: drop-shadow(0 2px 8px rgba(255, 182, 193, 0.2));
          }

          .heart-1 { 
            left: 15%; 
            top: 60%; 
            animation: gentleBob 7s ease-in-out infinite; 
            animation-delay: 1s;
          }
          .heart-2 { 
            right: 12%; 
            top: 70%; 
            animation: gentleBob 8s ease-in-out infinite; 
            animation-delay: 3s;
          }
          .sparkle-text-1 { 
            left: 70%; 
            top: 25%; 
            animation: twinkle 5s ease-in-out infinite; 
            animation-delay: 2s;
          }
          .sparkle-text-2 { 
            right: 25%; 
            bottom: 35%; 
            animation: twinkle 6s ease-in-out infinite; 
            animation-delay: 4s;
          }

          /* Enhanced animations */
          @keyframes floatSlow {
            0% { transform: translateY(0) rotate(0deg) scale(1); opacity: 0.85; }
            50% { transform: translateY(-12px) rotate(6deg) scale(1.05); opacity: 0.95; }
            100% { transform: translateY(0) rotate(0deg) scale(1); opacity: 0.85; }
          }
          @keyframes floatReverse {
            0% { transform: translateY(0) rotate(0deg) scale(1); opacity: 0.85; }
            50% { transform: translateY(10px) rotate(-6deg) scale(1.03); opacity: 0.95; }
            100% { transform: translateY(0) rotate(0deg) scale(1); opacity: 0.85; }
          }
          @keyframes pulseTiny {
            0% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.15); opacity: 1; }
            100% { transform: scale(1); opacity: 0.8; }
          }
          @keyframes gentleBob {
            0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.6; }
            50% { transform: translateY(-8px) rotate(5deg); opacity: 0.8; }
          }
          @keyframes twinkle {
            0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.6; }
            25% { transform: scale(1.2) rotate(90deg); opacity: 1; }
            50% { transform: scale(0.8) rotate(180deg); opacity: 0.4; }
            75% { transform: scale(1.1) rotate(270deg); opacity: 0.9; }
          }

          /* Ensure the pages render above background */
          .page-container {
            position: relative;
            z-index: 10;
            transition: opacity 0.45s ease, transform 0.45s ease;
          }
          .page-container.transitioning {
            opacity: 0;
            transform: translateY(8px);
          }

          /* Responsive adjustments - better positioning */
          @media (max-width: 640px) {
            .icon-1 { left: 6%; top: 6%; width: 64px; height: 64px; }
            .icon-2 { right: 8%; top: 12%; width: 88px; height: 88px; }
            .icon-3 { left: 14%; bottom: 10%; width: 56px; height: 56px; }
            .icon-4 { right: 14%; bottom: 20%; width: 40px; height: 40px; }
            
            .heart-1, .heart-2, .sparkle-text-1, .sparkle-text-2 {
              font-size: 18px;
            }
            
            .grid-overlay {
              background-size: 20px 20px;
            }
            
            .particle {
              width: 3px;
              height: 3px;
            }
          }

          /* Smooth transitions between pages */
          @media (prefers-reduced-motion: reduce) {
            .particle, .icon, .heart-1, .heart-2, .sparkle-text-1, .sparkle-text-2 {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
            }
          }
        `}</style>
      </div>
    </AudioProvider>
  );
}

export default App;
