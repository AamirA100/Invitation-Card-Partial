import { useEffect, useRef } from 'react'

export default function Confetti({ active, onComplete }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Blue watercolor & celebratory palette
    const colors = ['#38bdf8', '#2563eb', '#60a5fa', '#bfdbfe', '#ffffff', '#ffd700', '#fbcfe8', '#1d4ed8']
    const particles = []
    const particleCount = Math.min(window.innerWidth < 480 ? 70 : 120, 130)

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height * 0.8,
        size: Math.random() * 8 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: Math.random() > 0.4 ? (Math.random() > 0.5 ? 'rect' : 'circle') : 'heart',
        vx: (Math.random() - 0.5) * 2.2,
        vy: Math.random() * 2.8 + 2.2,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 4.5,
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.04 + 0.02,
        opacity: 1
      })
    }

    let animFrame = null
    const startTime = Date.now()
    const duration = 4600 // 4.6 seconds

    const render = () => {
      const elapsed = Date.now() - startTime
      if (elapsed > duration) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        if (onComplete) onComplete()
        return
      }

      const fadeStart = duration * 0.65
      const globalAlpha = elapsed > fadeStart ? 1 - (elapsed - fadeStart) / (duration - fadeStart) : 1

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.swayPhase += p.swaySpeed
        p.x += Math.sin(p.swayPhase) * 1.6 + p.vx
        p.y += p.vy
        p.rotation += p.rotSpeed

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.globalAlpha = Math.max(0, globalAlpha)
        ctx.fillStyle = p.color

        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6)
        } else if (p.shape === 'circle') {
          ctx.beginPath()
          ctx.arc(0, 0, p.size * 0.4, 0, Math.PI * 2)
          ctx.fill()
        } else if (p.shape === 'heart') {
          const s = p.size * 0.35
          ctx.beginPath()
          ctx.moveTo(0, s)
          ctx.bezierCurveTo(-s * 2, -s, -s * 2, -s * 2.5, 0, -s * 1.2)
          ctx.bezierCurveTo(s * 2, -s * 2.5, s * 2, -s, 0, s)
          ctx.fill()
        }
        ctx.restore()
      })

      animFrame = requestAnimationFrame(render)
    }

    render()

    return () => {
      if (animFrame) cancelAnimationFrame(animFrame)
    }
  }, [active, onComplete])

  if (!active) return null

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 999999,
        width: '100vw',
        height: '100vh'
      }}
      aria-hidden="true"
    />
  )
}
