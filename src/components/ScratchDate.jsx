import { useEffect, useRef, useState, useCallback } from 'react'
import { weddingData } from '../data/weddingData'
import Confetti from './Confetti'
import './ScratchDate.css'

export default function ScratchDate({ onAllRevealed }) {
  const { scratch } = weddingData
  const [revealed, setRevealed] = useState({
    day: false,
    month: false,
    year: false
  })
  const [showConfetti, setShowConfetti] = useState(false)

  const allRevealed = revealed.day && revealed.month && revealed.year

  const handleCircleRevealed = useCallback((id) => {
    setRevealed((prev) => {
      const updated = { ...prev, [id]: true }
      if (updated.day && updated.month && updated.year) {
        setShowConfetti(true)
        if (onAllRevealed) onAllRevealed()
      }
      return updated
    })
  }, [onAllRevealed])

  const handleRevealAll = () => {
    setRevealed({ day: true, month: true, year: true })
    setShowConfetti(true)
    if (onAllRevealed) onAllRevealed()
  }

  return (
    <section className="invitation-section scratch-section" id="scratch-section">
      <Confetti active={showConfetti} onComplete={() => setShowConfetti(false)} />

      {/* SVG Defs for Heart Shape Clip Path */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <clipPath id="heart-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.5,0.88 C 0.48,0.88 0.05,0.60 0.05,0.34 C 0.05,0.16 0.20,0.06 0.35,0.06 C 0.44,0.06 0.48,0.14 0.5,0.14 C 0.52,0.14 0.56,0.06 0.65,0.06 C 0.80,0.06 0.95,0.16 0.95,0.34 C 0.95,0.60 0.52,0.88 0.5,0.88 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="wedding-card scratch-card-container">
        {/* Shimmer Reveal Button at the top */}
        <div className="reveal-btn-container">
          <button
            type="button"
            className="premium-reveal-btn"
            onClick={handleRevealAll}
            disabled={allRevealed}
            id="reveal-date-btn"
          >
            <span className="btn-icon">✦</span>
            <span>{allRevealed ? 'DATE REVEALED' : 'REVEAL DATE'}</span>
            <span className="btn-icon">✦</span>
          </button>
        </div>

        <p className="discover-text">SCRATCH TO DISCOVER THE DATE</p>

        {/* 3 Interactive Heart Scratch Cards */}
        <div className="heart-scratch-container">
          {scratch.parts.map((part) => (
            <HeartScratchItem
              key={part.id}
              part={part}
              isRevealed={revealed[part.id]}
              onRevealed={() => handleCircleRevealed(part.id)}
            />
          ))}
        </div>

        {allRevealed && (
          <div className="scratch-blessing-note">
            <span className="note-star">🌸</span>
            <span>Mark your calendar for this blessed day</span>
            <span className="note-star">🌸</span>
          </div>
        )}
      </div>
    </section>
  )
}

function HeartScratchItem({ part, isRevealed, onRevealed }) {
  const canvasRef = useRef(null)
  const isDrawing = useRef(false)
  const isDoneRef = useRef(false)
  const moveCountRef = useRef(0)

  // Initialize Canvas Foil
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height

    // Radial gradient icy-blue metallic foil
    const grad = ctx.createRadialGradient(
      width * 0.4,
      height * 0.35,
      10,
      width * 0.5,
      height * 0.5,
      width * 0.65
    )
    grad.addColorStop(0, '#ffffff')
    grad.addColorStop(0.3, '#bae6fd')
    grad.addColorStop(0.7, '#60a5fa')
    grad.addColorStop(1, '#1d4ed8')

    ctx.fillStyle = grad
    ctx.fillRect(0, 0, width, height)

    // Metallic glitter speckles
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
    for (let i = 0; i < 40; i++) {
      const rx = (Math.sin(i * 47) * 0.5 + 0.5) * width
      const ry = (Math.cos(i * 31) * 0.5 + 0.5) * height
      ctx.fillRect(rx, ry, 2, 2)
    }

    // Text on foil
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 10px Montserrat, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.shadowColor = 'rgba(15, 23, 42, 0.6)'
    ctx.shadowBlur = 4
    ctx.fillText('SCRATCH', width / 2, height * 0.38)
    ctx.font = 'bold 8px Montserrat, sans-serif'
    ctx.fillText('✦ HERE ✦', width / 2, height * 0.38 + 14)
    ctx.shadowBlur = 0
  }, [])

  const checkScratchPercentage = () => {
    if (isDoneRef.current) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height

    const imageData = ctx.getImageData(0, 0, width, height)
    const pixels = imageData.data
    let transparentCount = 0
    const totalPixels = pixels.length / 4

    for (let i = 3; i < pixels.length; i += 16) {
      if (pixels[i] === 0) {
        transparentCount += 4
      }
    }

    if (transparentCount / totalPixels > 0.34) {
      isDoneRef.current = true
      onRevealed()
    }
  }

  const scratchAt = (clientX, clientY) => {
    const canvas = canvasRef.current
    if (!canvas || isDoneRef.current) return
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    const x = ((clientX - rect.left) / rect.width) * canvas.width
    const y = ((clientY - rect.top) / rect.height) * canvas.height

    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x, y, 16, 0, Math.PI * 2)
    ctx.fill()
  }

  const handlePointerDown = (e) => {
    isDrawing.current = true
    scratchAt(e.clientX, e.clientY)
  }

  const handlePointerMove = (e) => {
    if (!isDrawing.current) return
    scratchAt(e.clientX, e.clientY)
    moveCountRef.current += 1
    if (moveCountRef.current % 7 === 0) {
      checkScratchPercentage()
    }
  }

  const handlePointerUp = () => {
    isDrawing.current = false
    checkScratchPercentage()
  }

  return (
    <div className={`heart-scratch-card ${isRevealed ? 'scratched-pop' : ''}`}>
      <div className="heart-border">
        <div className="heart-shape">
          {/* Underlying Revealed Date Text */}
          <div className="scratch-date-content">
            <span className="scratch-date-sub">{part.label}</span>
            <span className={`scratch-date ${part.value.length > 5 ? 'long-title' : ''}`}>
              {part.value}
            </span>
          </div>

          {/* Canvas Foil Overlay */}
          {!isRevealed && (
            <canvas
              ref={canvasRef}
              width={120}
              height={120}
              className="heart-canvas"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
            />
          )}
        </div>
      </div>
    </div>
  )
}
