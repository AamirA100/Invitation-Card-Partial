import { useState, useRef, useEffect, useCallback } from 'react'
import OpeningScreen from './components/OpeningScreen'
import WeddingHero from './components/WeddingHero'
import GroomSection from './components/GroomSection'
import BrideGroomDivider from './components/BrideGroomDivider'
import BrideSection from './components/BrideSection'
import IslamicQuote from './components/IslamicQuote'
import ScratchDate from './components/ScratchDate'
import Countdown from './components/Countdown'
import EventsSection from './components/EventsSection'
import ComplimentsSection from './components/ComplimentsSection'
import ThankYouEnvelope from './components/ThankYouEnvelope'
import MusicButton from './components/MusicButton'
import { weddingAudio } from './utils/audioPlayer'
import './App.css'

export default function App() {
  const [isOpened, setIsOpened] = useState(false)
  const audioRef = useRef(null)

  // Initialize Audio Controller with the local audio element
  useEffect(() => {
    if (audioRef.current) {
      weddingAudio.init(audioRef.current)
    }
  }, [])

  const handleOpenInvitation = () => {
    setIsOpened(true)
    // Start music on user interaction
    weddingAudio.play()
  }

  const lastHeartTime = useRef(0)

  // Interactive Floating Heart on Tap/Click (Delightful micro-animation)
  const handlePageClick = useCallback((e) => {
    const now = Date.now()
    if (now - lastHeartTime.current < 250) return
    // Avoid triggering when clicking buttons or inputs to maintain clean UX
    if (e.target && e.target.closest && e.target.closest('button, a, input, canvas, .scroll-down-box')) return

    const clientX = e.clientX
    const clientY = e.clientY
    if (clientX === undefined || clientY === undefined) return
    lastHeartTime.current = now

    const heart = document.createElement('span')
    heart.className = 'interactive-click-heart'
    heart.style.left = `${clientX}px`
    heart.style.top = `${clientY}px`
    document.body.appendChild(heart)

    setTimeout(() => {
      if (heart.parentNode) {
        heart.parentNode.removeChild(heart)
      }
    }, 900)
  }, [])

  useEffect(() => {
    window.addEventListener('pointerdown', handlePageClick, { passive: true })
    return () => {
      window.removeEventListener('pointerdown', handlePageClick)
    }
  }, [handlePageClick])

  // Card Reveal on Scroll: cards reveal gracefully with shimmer beam
  useEffect(() => {
    let observer = null

    const timer = setTimeout(() => {
      const cards = document.querySelectorAll('.wedding-card')
      if (!cards.length) return

      if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
        cards.forEach((card) => card.classList.add('card-revealed'))
        return
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('card-revealed')
              observer.unobserve(entry.target)
            }
          })
        },
        {
          threshold: 0.12,
          rootMargin: '0px 0px -50px 0px'
        }
      )

      cards.forEach((card) => {
        if (!card.classList.contains('card-revealed')) {
          observer.observe(card)
        }
      })
    }, 200)

    return () => {
      clearTimeout(timer)
      if (observer) observer.disconnect()
    }
  }, [isOpened])

  return (
    <div className="wedding-app-root">
      {/* Background Audio element pointing to /audio/audio.mp3 */}
      <audio
        ref={audioRef}
        src="/audio/audio.mp3"
        loop
        preload="none"
      >
        <source src="/audio/audio.mp3" type="audio/mpeg" />
      </audio>

      {/* Phase 4 & 5: Cinematic Fullscreen Opening Screen */}
      <OpeningScreen onOpen={handleOpenInvitation} />

      {/* Floating Ambient Blue Floral Petals */}
      <div className="ambient-petals-layer" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className={`floating-petal petal-type-${i % 3}`}
            style={{
              left: `${(i * 12.5 + 4) % 95}%`,
              animationDelay: `${(i * 1.2) % 7}s`,
              animationDuration: `${12 + (i % 4) * 2}s`,
              width: `${12 + (i % 4)}px`,
              height: `${14 + (i % 4)}px`,
              opacity: 0.4 + (i % 3) * 0.15,
              '--sway-x': `${((i % 2 === 0 ? 1 : -1) * (18 + (i % 12)))}px`
            }}
          />
        ))}
      </div>

      {/* Primary Mobile Container (max-width: 480px, centered on desktop) */}
      <div className="invitation-phone-container">
        {/* Section 1: Sacred Bismillah & Invitation Centerpiece */}
        <WeddingHero isOpened={isOpened} />

        {/* Long Scrolling Invitation Flow */}
        <main className="invitation-main-flow">
          {/* Section 2: Groom Details */}
          <GroomSection />

          {/* Decorative Blue Floral Divider */}
          <BrideGroomDivider />

          {/* Section 3: Bride Details */}
          <BrideSection />

          {/* Section 4: Authentic Islamic Hadith Quote */}
          <IslamicQuote />

          {/* Section 5: Interactive Scratch-to-Discover Wedding Date */}
          <ScratchDate />

          {/* Section 6: Events & Venues with Google Maps buttons */}
          <EventsSection />

          {/* Section 7: Live Dynamic Countdown Timer */}
          <Countdown />

          {/* Section 8: Best Compliments From Family Members */}
          <ComplimentsSection />

          {/* Section 9: Swan Floral Wreath Thank You & Modern Footer */}
          <ThankYouEnvelope />
        </main>
      </div>

      {/* Floating Music Toggle Button (bottom right) */}
      <MusicButton />
    </div>
  )
}