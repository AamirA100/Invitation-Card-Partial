import { useEffect, useState } from 'react'
import { weddingAudio } from '../utils/audioPlayer'
import './MusicButton.css'

export default function MusicButton() {
  const [isPlaying, setIsPlaying] = useState(weddingAudio.isPlaying)

  useEffect(() => {
    const unsubscribe = weddingAudio.subscribe((status) => {
      setIsPlaying(status)
    })
    return unsubscribe
  }, [])

  const handleToggle = () => {
    weddingAudio.toggle()
  }

  return (
    <div className="floating-music-wrapper">
      <button
        type="button"
        className={`music-toggle ${isPlaying ? 'playing' : ''}`}
        onClick={handleToggle}
        aria-label={isPlaying ? 'Pause Wedding Music' : 'Play Wedding Music'}
        title={isPlaying ? 'Pause Music' : 'Play Music'}
        id="floating-music-btn"
      >
        {isPlaying ? (
          <svg viewBox="0 0 24 24" fill="currentColor" className="music-icon-svg" aria-hidden="true">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" className="music-icon-svg" aria-hidden="true">
            <path d="M4.27 3L3 4.27l9 9v.28c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4v-1.73l4 4V13.8l2.95 2.95c-.32.14-.65.25-1 .3v2.05c.87-.16 1.68-.51 2.37-1.02L19.73 21 21 19.73 4.27 3zM14 7h4V3h-6v5.18l2 2V7z" />
          </svg>
        )}
      </button>
    </div>
  )
}