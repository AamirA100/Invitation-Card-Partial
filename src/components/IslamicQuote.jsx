import { useState, useEffect, useRef } from 'react'
import { weddingData } from '../data/weddingData'
import './IslamicQuote.css'

export default function IslamicQuote() {
  const { islamicQuote } = weddingData
  const [isFocused, setIsFocused] = useState(false)
  const quoteRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFocused(entry.isIntersecting)
      },
      {
        threshold: 0.35,
        rootMargin: '0px 0px -40px 0px'
      }
    )

    if (quoteRef.current) {
      observer.observe(quoteRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      className={`invitation-section quote-section ${isFocused ? 'is-focused' : ''}`}
      ref={quoteRef}
      aria-label="Islamic Wedding Quote"
    >
      <div className="wedding-card quote-card">
        {/* Divine Radiant Aura when focused */}
        <div className="quote-divine-aura" aria-hidden="true" />

        {/* Top Islamic Arch / Floral Ornament */}
        <div className="quote-islamic-arch" aria-hidden="true">
          <svg viewBox="0 0 120 40" fill="none" className="arch-svg">
            <path d="M 10 38 Q 60 5 110 38" stroke="#93c5fd" strokeWidth="1.2" />
            <path d="M 25 38 Q 60 16 95 38" stroke="#bfdbfe" strokeWidth="0.8" strokeDasharray="3 3" />
            <circle cx="60" cy="18" r="4" fill="#2563eb" />
            <circle cx="60" cy="18" r="8" stroke="#93c5fd" strokeWidth="0.8" />
          </svg>
        </div>

        {/* Lead Narrator in subtle Arabic */}
        <p className="quote-hadith-lead" dir="rtl" lang="ar">{islamicQuote.hadithLead}</p>

        {/* Dominant Arabic Hadith */}
        <div className="quote-arabic-main" dir="rtl" lang="ar">
          « {islamicQuote.arabic} »
        </div>

        {/* Decorative Divider */}
        <div className="quote-divider" aria-hidden="true">
          <span className="quote-line" />
          <span className="quote-diamond">❖</span>
          <span className="quote-line" />
        </div>

        {/* English Translation */}
        <blockquote className="quote-translation">
          &ldquo;{islamicQuote.translation}&rdquo;
        </blockquote>

        {/* Attribution Badge */}
        <div className="quote-attribution-badge">
          <span className="attr-star">✦</span>
          <span className="attr-text">{islamicQuote.attribution}</span>
          <span className="attr-star">✦</span>
        </div>

        {/* Corner Floral Motifs */}
        <div className="quote-corner-flower bl" aria-hidden="true">
          <QuoteBlossom />
        </div>
        <div className="quote-corner-flower br" aria-hidden="true">
          <QuoteBlossom mirrored />
        </div>
      </div>
    </section>
  )
}

function QuoteBlossom({ mirrored = false }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={`quote-blossom-svg ${mirrored ? 'is-mirrored' : ''}`}
    >
      <circle cx="20" cy="20" r="10" fill="#dbeafe" stroke="#3b82f6" strokeWidth="0.9" />
      <circle cx="20" cy="20" r="4" fill="#1e40af" />
      <path d="M 8 20 Q 20 8 32 20" stroke="#93c5fd" strokeWidth="0.8" />
    </svg>
  )
}
