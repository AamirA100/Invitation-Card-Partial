import { useEffect, useRef } from 'react'
import { weddingData } from '../data/weddingData'
import './WeddingHero.css'

export default function WeddingHero({ isOpened }) {
  const cardRef = useRef(null)

  return (
    <section
      className={`details-section ${isOpened ? 'is-opened' : ''}`}
      id="details-section"
      aria-label="Invitation Details"
      ref={cardRef}
    >
      {/* Background Soft Watercolor Overlay */}
      <div className="details-bg-watermark" aria-hidden="true" />

      {/* Main Blue Watercolor Floral Invitation Card */}
      <div className="content-wrapper">
        <div className="invitation-ornate-card wedding-card">
          {/* Top Delicate Dusty-Rose & Gold Double Border */}
          <div className="card-inner-border" aria-hidden="true" />

          {/* Corner Botanical Watercolor Decorations */}
          <div className="corner-floral corner-top-left" aria-hidden="true">
            <FloralCornerGraphic />
          </div>
          <div className="corner-floral corner-top-right" aria-hidden="true">
            <FloralCornerGraphic mirrored />
          </div>

          {/* Sacred Bismillah Calligraphy */}
          <div className="bismillah-wrapper" dir="rtl" lang="ar">
            <h2 className="arabic-bismillah">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ</h2>
          </div>

          <p className="bismillah-translation">
            In the Name of Allah, the Most Beneficent, the Most Merciful.
          </p>

          {/* Invitation Calligraphy Heading */}
          <div className="invitation-title-block">
            <h1 className="event-script-title">Daawat - e - Walima</h1>
          </div>

          {/* Invitation Lead Text */}
          <p className="invitation-lead-text">
            Together with our families<br />
            we request the honour of your presence at the
          </p>

          <p className="reception-tag">✦ Reception Of ✦</p>

          {/* Couple Names */}
          <div className="couple-names-block">
            <h2 className="names-couple">
              <span className="groom-highlight">{weddingData.groom.name.split(' ')[0]}</span>
              <span className="couple-ampersand">&amp;</span>
              <span className="bride-highlight">{weddingData.bride.name.split(' ')[0]}</span>
            </h2>
            {/* <p className="full-names-sub">
              {weddingData.groom.name} &amp; {weddingData.bride.name}
            </p> */}
          </div>

          {/* Bottom Corner Florals */}
          <div className="corner-floral corner-bottom-left" aria-hidden="true">
            <FloralCornerGraphic flipVertical />
          </div>
          <div className="corner-floral corner-bottom-right" aria-hidden="true">
            <FloralCornerGraphic mirrored flipVertical />
          </div>
        </div>
      </div>
    </section>
  )
}

function FloralCornerGraphic({ mirrored = false, flipVertical = false }) {
  const transform = `${mirrored ? 'scaleX(-1)' : ''} ${flipVertical ? 'scaleY(-1)' : ''}`.trim()

  return (
    <svg
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="corner-floral-svg"
      style={{ transform: transform || undefined }}
    >
      <defs>
        <linearGradient id="roseBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#dbeafe" />
          <stop offset="50%" stopColor="#93c5fd" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="leafSoftGreen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d1e7dd" />
          <stop offset="100%" stopColor="#7ba185" />
        </linearGradient>
      </defs>

      {/* Delicate botanical branches and eucalyptus leaves */}
      <path d="M 12 12 C 35 15 65 30 90 70 C 105 95 115 125 125 135" stroke="#c08497" strokeWidth="1" strokeDasharray="3 2" />
      <path d="M 18 18 C 45 40 70 80 80 120" stroke="#d4af37" strokeWidth="0.8" />

      {/* Eucalyptus Leaves */}
      <path d="M 40 28 C 48 20 62 25 58 36 C 54 44 42 38 40 28 Z" fill="url(#leafSoftGreen)" opacity="0.85" />
      <path d="M 68 45 C 78 38 90 44 86 54 C 82 62 70 56 68 45 Z" fill="url(#leafSoftGreen)" opacity="0.85" />
      <path d="M 28 42 C 22 52 26 64 36 62 C 44 58 38 44 28 42 Z" fill="url(#leafSoftGreen)" opacity="0.85" />

      {/* Hydrangea Cluster Mini Florets */}
      <circle cx="22" cy="78" r="7" fill="#bfdbfe" opacity="0.9" />
      <circle cx="34" cy="85" r="8" fill="#93c5fd" opacity="0.9" />
      <circle cx="26" cy="94" r="6.5" fill="#60a5fa" opacity="0.85" />
      <circle cx="38" cy="98" r="6" fill="#bfdbfe" opacity="0.85" />

      {/* Main Soft Watercolor Blue Rose Blossom */}
      <g transform="translate(18, 18)">
        <circle cx="16" cy="16" r="15" fill="#e0f2fe" opacity="0.95" />
        <circle cx="16" cy="16" r="10" fill="url(#roseBlueGrad)" opacity="0.9" />
        <circle cx="16" cy="16" r="5" fill="#1e40af" opacity="0.75" />
        {/* Rose Petal Curves */}
        <path d="M 6 16 C 6 9 12 6 16 6 C 22 6 26 11 26 16" stroke="#ffffff" strokeWidth="1" fill="none" opacity="0.8" />
        <path d="M 10 20 C 12 24 18 25 22 22" stroke="#ffffff" strokeWidth="0.9" fill="none" opacity="0.8" />
      </g>

      {/* Dusty Rose Subtle Accent Bud */}
      <circle cx="68" cy="22" r="5" fill="#fbcfe8" opacity="0.9" />
      <circle cx="68" cy="22" r="2.5" fill="#db2777" opacity="0.75" />

      {/* Fine gold sparkle dots */}
      <circle cx="50" cy="65" r="1.5" fill="#d4af37" />
      <circle cx="85" cy="88" r="1.5" fill="#d4af37" />
    </svg>
  )
}
