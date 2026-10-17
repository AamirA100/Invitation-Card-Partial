import { useEffect, useState } from 'react'
import { weddingData } from '../data/weddingData'
import './Countdown.css'

export default function Countdown() {
  const calculateTimeLeft = () => {
    // Target is Friday, 25th December 2026, 7:00 PM
    const targetISO = weddingData.wedding.targetISO || '2026-12-25T19:00:00+05:30'
    const fixedTarget = new Date(targetISO).getTime()
    const now = Date.now()

    let targetTime = fixedTarget
    if (now >= fixedTarget) {
      const targetYear = new Date(now).getFullYear() + 1
      targetTime = new Date(`${targetYear}-12-25T19:00:00+05:30`).getTime()
    }

    const difference = Math.max(0, targetTime - now)

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    }
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatNum = (n) => String(n).padStart(2, '0')

  return (
    <section className="invitation-section countdown-section" aria-label="Wedding Countdown">
      <div className="wedding-card countdown-card">
        {/* Header Badge */}
        <p className="countdown-eyebrow">SAVE THE DATE</p>
        <h2 className="countdown-date-header">25 . 12 . 2026</h2>

        {/* 4 Countdown Blocks Live */}
        <div className="timer-grid">
          <div className="time-block">
            <span>{formatNum(timeLeft.days)}</span>
            <p>DAYS</p>
          </div>
          <div className="time-block">
            <span>{formatNum(timeLeft.hours)}</span>
            <p>HOURS</p>
          </div>
          <div className="time-block">
            <span>{formatNum(timeLeft.minutes)}</span>
            <p>MINUTES</p>
          </div>
          <div className="time-block seconds-block">
            <span>{formatNum(timeLeft.seconds)}</span>
            <p>SECS</p>
          </div>
        </div>

        <p className="countdown-footer-note">
          <span className="cd-dot">✦</span>
          <span>Friday, 25th December 2026 · 7:00 PM</span>
          <span className="cd-dot">✦</span>
        </p>
      </div>
    </section>
  )
}
