/**
 * Audio Controller for Wedding Invitation
 * Supports:
 * 1. Playing local `/audio/wedding-music.mp3`
 * 2. If the MP3 file is absent or fails, falls back gracefully to a gentle,
 *    romantic procedural Web Audio acoustic chime/harp chord progression
 *    reminiscent of royal wedding background music.
 */

class WeddingAudioController {
  constructor() {
    this.audioElement = null
    this.audioContext = null
    this.synthInterval = null
    this.isPlaying = false
    this.isMuted = false
    this.listeners = new Set()
    this.isUsingSynth = false
  }

  init(audioEl) {
    this.audioElement = audioEl
    this.isUsingSynth = false
    if (this.audioElement) {
      // Auto preset high volume and endless loop for client device
      this.audioElement.loop = true
      this.audioElement.volume = 1.0
      this.audioElement.addEventListener('play', () => this.notify(true))
      this.audioElement.addEventListener('pause', () => this.notify(false))
      this.audioElement.addEventListener('ended', () => {
        // Enforce loop replay across all browser devices
        this.audioElement.currentTime = 0
        this.audioElement.play().catch(() => {})
      })
      this.audioElement.addEventListener('error', (e) => {
        console.warn('Audio element error, falling back to synth if needed:', e)
      })
    }
  }

  subscribe(listener) {
    this.listeners.add(listener)
    listener(this.isPlaying)
    return () => this.listeners.delete(listener)
  }

  notify(status) {
    this.isPlaying = status
    this.listeners.forEach((cb) => {
      try {
        cb(status)
      } catch (e) {
        console.error(e)
      }
    })
  }

  async play() {
    if (this.audioElement) {
      try {
        this.audioElement.loop = true
        this.audioElement.volume = 1.0
        const promise = this.audioElement.play()
        if (promise !== undefined) {
          await promise
          this.notify(true)
          return
        }
      } catch (err) {
        console.info('Audio play error, using synth fallback:', err.message)
        this.fallbackToSynth()
      }
    } else {
      this.fallbackToSynth()
    }
  }

  pause() {
    if (this.audioElement && !this.isUsingSynth) {
      this.audioElement.pause()
    }
    if (this.isUsingSynth) {
      this.stopSynth()
    }
    this.notify(false)
  }

  toggle() {
    if (this.isPlaying) {
      this.pause()
    } else {
      this.play()
    }
  }

  fallbackToSynth() {
    this.isUsingSynth = true
    this.startSynth()
    this.notify(true)
  }

  startSynth() {
    if (this.synthInterval) return
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (!AudioCtx) return
      if (!this.audioContext) {
        this.audioContext = new AudioCtx()
      }
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume()
      }

      // Elegant pentatonic acoustic notes (Raag Yaman / romantic scale)
      // D4, F#4, A4, B4, C#5, D5, E5, F#5
      const scale = [293.66, 369.99, 440.0, 493.88, 554.37, 587.33, 659.25, 739.99]
      const arpeggios = [
        [0, 2, 4, 5],
        [1, 3, 5, 7],
        [2, 4, 6, 7],
        [0, 2, 5, 7]
      ]

      let chordIndex = 0
      let noteIndex = 0

      // Master gain preset for high volume
      const masterGain = this.audioContext.createGain()
      masterGain.gain.setValueAtTime(0.24, this.audioContext.currentTime)
      masterGain.connect(this.audioContext.destination)
      this.masterGain = masterGain

      const playChime = () => {
        if (!this.audioContext || this.audioContext.state !== 'running') return
        const currentChord = arpeggios[chordIndex % arpeggios.length]
        const noteFreq = scale[currentChord[noteIndex % currentChord.length]]

        const osc = this.audioContext.createOscillator()
        const noteGain = this.audioContext.createGain()

        // Warm sine + subtle overtone for harp/santoor sound
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(noteFreq, this.audioContext.currentTime)

        const now = this.audioContext.currentTime
        noteGain.gain.setValueAtTime(0.001, now)
        noteGain.gain.exponentialRampToValueAtTime(0.25, now + 0.08)
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8)

        osc.connect(noteGain)
        noteGain.connect(this.masterGain)

        osc.start(now)
        osc.stop(now + 1.85)

        noteIndex++
        if (noteIndex >= currentChord.length) {
          noteIndex = 0
          chordIndex++
        }
      }

      // Play first note immediately, then on interval
      playChime()
      this.synthInterval = setInterval(playChime, 700)
    } catch (e) {
      console.warn('Web Audio synth could not initialize', e)
    }
  }

  stopSynth() {
    if (this.synthInterval) {
      clearInterval(this.synthInterval)
      this.synthInterval = null
    }
  }
}

export const weddingAudio = new WeddingAudioController()
