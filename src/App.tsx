import { useState } from "react"
import LandingPage from "./components/LandingPage"
import ActivityPage from "./components/ActivityPage"
import CakeCutting from "./components/CakeCutting"
import ChillZone from "./components/ChillZone"
import CardsSection from "./components/CardsSection"
import FinalLetter from "./components/FinalLetter"
import { AudioProvider } from "./contexts/AudioContext"
import "./App.css"

export default function App() {
  const [currentPage, setCurrentPage] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const goToPage = (pageIndex: number) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentPage(pageIndex)
      setIsTransitioning(false)
    }, 500)
  }

  const pages = [
    <LandingPage onEnter={() => goToPage(1)} />,
    <ActivityPage onNext={() => goToPage(2)} />,
    <CakeCutting onNext={() => goToPage(3)} />,
    <ChillZone onNext={() => goToPage(4)} />,
    <CardsSection onNext={() => goToPage(5)} />,
    <FinalLetter onRestart={() => goToPage(0)} />,
  ]

  return (
    <AudioProvider>
      <div className="app">
        {/* MAIN PAGE CONTENT */}
        <div
          className={`page-container ${
            isTransitioning ? "transitioning" : ""
          }`}
        >
          {pages[currentPage]}
        </div>

        {/* 🔊 AUDIO TEST BUTTON */}
        <button
          onClick={() => {
            const audio = new Audio(
              import.meta.env.BASE_URL + "music/music1.mp3"
            )
            audio.play()
          }}
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            padding: "12px 18px",
            fontSize: "14px",
            zIndex: 9999,
          }}
        >
          TEST SOUND
        </button>
      </div>
    </AudioProvider>
  )
}
