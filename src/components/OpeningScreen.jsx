import { useState, useRef, useEffect, useCallback } from 'react'
import { weddingData } from '../data/weddingData'
import './OpeningScreen.css'

export default function OpeningScreen({ onOpen }) {
  const videoRef = useRef(null)
  const [hasStarted, setHasStarted] = useState(false)
  const [videoEnded, setVideoEnded] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [isNamesRevealed, setIsNamesRevealed] = useState(false)
  const [isFadingOut, setIsFadingOut] = useState(false)

  // Groom and Bride actual names from weddingData
  const groomFirstName = weddingData.groom.name.split(' ')[0] // "Aamir"
  const brideFirstName = weddingData.bride.name.split(' ')[0] // "Tuba"

  // Ensure video node has required mobile attributes on mount
  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.muted = true
      video.defaultMuted = true
      video.volume = 0
      video.playsInline = true
      video.setAttribute('muted', '')
      video.setAttribute('playsinline', '')
      video.setAttribute('webkit-playsinline', 'true')
    }
  }, [])

  // Start Intro sequence with robust mobile device support
  const handleStartIntro = useCallback(() => {
    if (hasStarted) return
    setHasStarted(true)

    const video = videoRef.current
    if (video) {
      video.muted = true
      video.defaultMuted = true
      video.volume = 0
      video.playsInline = true
      video.setAttribute('muted', '')
      video.setAttribute('playsinline', '')
      video.setAttribute('webkit-playsinline', 'true')
      try {
        video.currentTime = 0
      } catch (e) {
        // Video element may not have loaded metadata yet
      }

      video.playbackRate = 2.5;
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Video play interrupted or restricted, retrying muted:', err)
          video.muted = true
          video.play().catch(() => {
            // If autoplay is strictly restricted by OS/power saver, ensure CSS animations still play smoothly
            setTimeout(() => {
              setIsNamesRevealed(true)
            }, 800)
          })
        })
      }
    } else {
      setIsNamesRevealed(true)
    }

    // Call onOpen to trigger background audio
    onOpen()
  }, [hasStarted, onOpen])

  // Track video playback time to synchronize smooth couple name reveal once doors are open
  const handleTimeUpdate = () => {
    const video = videoRef.current
    if (!video) return
    const t = video.currentTime

    // Trigger smooth orchestrated couple reveal once doors have parted (~6.0s)
    if (t >= 6.0 && !isNamesRevealed) {
      setIsNamesRevealed(true)
    }
  }

  const handleVideoEnded = () => {
    setVideoEnded(true)
    setIsNamesRevealed(true)
  }

  const handleVideoError = () => {
    console.warn('Video failed to load')
    setVideoError(true)
    setIsNamesRevealed(true)
    setVideoEnded(true)
  }

  // Complete transition to main invitation content
  const handleProceedToInvitation = () => {
    if (isFadingOut) return
    setIsFadingOut(true)
    const video = videoRef.current
    if (video) {
      try {
        video.pause()
      } catch (e) {}
    }
    setTimeout(() => {
      // Scroll smoothly to details section or main flow
      const target = document.getElementById('details-section') || document.querySelector('.invitation-main-flow')
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }, 400)
  }

  // Safety timer: visitor must NEVER get stuck on the opening screen under any circumstances
  useEffect(() => {
    if (hasStarted && !isNamesRevealed) {
      const safetyTimer = setTimeout(() => {
        setIsNamesRevealed(true)
        setVideoEnded(true)
      }, 10000)
      return () => clearTimeout(safetyTimer)
    }
  }, [hasStarted, isNamesRevealed])

  return (
    <section className={`intro-hero-section ${isFadingOut ? 'fade-transition' : ''}`} id="hero-section">
      <div className="video-container">
        {/* Cinematic Intro Video */}
        <video
          ref={videoRef}
          src="/intro.mp4"
          poster="/images/intro_poster.jpg"
          playsInline
          webkit-playsinline="true"
          muted
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnded}
          onError={handleVideoError}
          className="intro-video-element"
        />

        {/* Phase 4: Initial Luxurious Entrance Screen Overlay */}
        <div className={`entrance-overlay ${hasStarted ? 'is-faded-out' : ''}`}>
          {/* Subtle floating ambient light particles */}
          <div className="entrance-sparkles" aria-hidden="true">
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className="sparkle-particle"
                style={{
                  top: `${(i * 19 + 7) % 94}%`,
                  left: `${(i * 23 + 11) % 90}%`,
                  animationDelay: `${(i * 0.4) % 3}s`,
                  animationDuration: `${2.8 + (i % 3) * 0.8}s`
                }}
              />
            ))}
          </div>

          {/* Sacred Bismillah Calligraphy */}
          <div className="entrance-bismillah" title="In the Name of Allah, the Most Beneficent, the Most Merciful">
            بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </div>

          <p className="entrance-lead-text">
            <span className="lead-line" />
            <span>DAWAT&#8209;E&#8209;WALIMA</span>
            <span className="lead-line" />
          </p>

          {/* Luxurious Open Invitation Button */}
          <div className="play-button-wrapper">
            <button
              type="button"
              className="play-button"
              onClick={handleStartIntro}
              onTouchEnd={handleStartIntro}
              aria-label="Open Wedding Invitation"
              id="open-invitation-btn"
            >
              <div className="hand-icon-wrap" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="hand-tap-svg">
                  <path d="M12 2v8m0 0a3 3 0 0 1 3 3v4a5 5 0 0 1-10 0v-2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9 10V6a2 2 0 0 1 4 0v4" strokeLinecap="round" />
                </svg>
              </div>
              <span className="tap-text">OPEN INVITATION</span>
            </button>
          </div>

          <p className="entrance-invitation-note">
            ✦ TAP TO ENTER THE CELEBRATION ✦
          </p>
        </div>

        {/* Phase 5: Synchronized Staggered Couple Name Reveal Over Archway/Sky */}
        {hasStarted && (
          <div className={`text-overlay ${isNamesRevealed ? 'names-revealed' : ''}`}>
            {/* Stagger 1: Groom Name */}
            <h1 className="hero-name-stagger groom-stagger">
            <br />
            <br />
              {groomFirstName}
              
            </h1>

            {/* Stagger 2: Ampersand */}
            <span className="hero-ampersand-stagger">
              &amp;
            </span>

            {/* Stagger 3: Bride Name */}
            <h1 className="hero-name-stagger bride-stagger">
              {brideFirstName}
            </h1>

            {/* Stagger 4: Wedding Rings with blossom */}
            <div className="hero-rings-stagger" aria-hidden="true">
            <br />
              <img
                src="/images/ring1-Zb6HDysx.png"
                alt="Golden Wedding Rings"
                className="ring-image"
              />
            </div>
          </div>
        )}

        {/* Phase 5: Scroll Down Prompt Positioned Down Near Stairs of Background Video */}
        {hasStarted && (
          <div className={`scroll-down-container near-stairs ${isNamesRevealed ? 'revealed' : ''}`}>
            <button
              type="button"
              className="scroll-down-box"
              onClick={handleProceedToInvitation}
              aria-label="Scroll down to invitation"
            >
              <span>SCROLL DOWN</span>
              <span className="scroll-arrow">↓</span>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}