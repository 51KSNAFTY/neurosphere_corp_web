'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

/* ========== Network Canvas (2D Particles) ========== */
export function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return

    let animId: number
    let w = 0
    let h = 0
    const MAX_DIST = 150

    interface Node {
      x: number
      y: number
      vx: number
      vy: number
    }
    let nodes: Node[] = []

    function resize() {
      w = c!.width = window.innerWidth
      h = c!.height = window.innerHeight
    }

    function init() {
      const sp = window.innerWidth < 768
      const count = Math.min(
        sp
          ? Math.floor((window.innerWidth * window.innerHeight) / 100 / 2)
          : Math.floor((window.innerWidth * window.innerHeight) / 100),
        200,
      )
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
      }))
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h)
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        a.x += a.vx
        a.y += a.vy
        if (a.x < 0 || a.x > w) a.vx *= -1
        if (a.y < 0 || a.y > h) a.vy *= -1
        ctx!.beginPath()
        ctx!.arc(a.x, a.y, 1.5, 0, Math.PI * 2)
        ctx!.fillStyle = 'rgba(47,187,140,0.4)'
        ctx!.fill()
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MAX_DIST) {
            ctx!.beginPath()
            ctx!.moveTo(a.x, a.y)
            ctx!.lineTo(b.x, b.y)
            ctx!.strokeStyle = `rgba(47,187,140,${(1 - dist / MAX_DIST) * 0.1})`
            ctx!.lineWidth = 0.5
            ctx!.stroke()
          }
        }
      }
      animId = requestAnimationFrame(draw)
    }

    resize()
    init()
    draw()

    const handleResize = () => {
      resize()
      init()
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return <canvas ref={canvasRef} className="network-canvas" />
}

/* ========== Scroll Reveal Observer ========== */
export function ScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      { threshold: 0.15 },
    )
    document
      .querySelectorAll('.aistudio-lp .js-reveal')
      .forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
  return null
}

/* ========== Number Counter Animation ========== */
export function NumberCounter() {
  useEffect(() => {
    const els = document.querySelectorAll('.aistudio-lp .number-val')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement
          if (entry.isIntersecting && !el.dataset.counted) {
            el.dataset.counted = '1'
            const target = parseInt(el.dataset.target || '0')
            const suffix = el.dataset.suffix || ''
            const prefix = el.dataset.prefix || ''
            const duration = 1500
            const start = performance.now()
            function step(now: number) {
              const progress = Math.min((now - start) / duration, 1)
              const eased = 1 - Math.pow(1 - progress, 3)
              el.textContent = prefix + Math.round(eased * target) + suffix
              if (progress < 1) requestAnimationFrame(step)
            }
            requestAnimationFrame(step)
          }
        })
      },
      { threshold: 0.5 },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
  return null
}

/* ========== FAQ Accordion ========== */
export function FaqAccordion() {
  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget
    const item = btn.parentElement
    if (!item) return
    const answer = item.querySelector('.faq-answer') as HTMLElement | null
    const isOpen = item.classList.contains('is-open')

    // Close all open items
    document
      .querySelectorAll('.aistudio-lp .faq-item.is-open')
      .forEach((openItem) => {
        openItem.classList.remove('is-open')
        const openAnswer = openItem.querySelector(
          '.faq-answer',
        ) as HTMLElement | null
        if (openAnswer) openAnswer.style.maxHeight = '0'
        const openBtn = openItem.querySelector(
          '.faq-question',
        ) as HTMLElement | null
        if (openBtn) openBtn.setAttribute('aria-expanded', 'false')
      })

    if (!isOpen && answer) {
      item.classList.add('is-open')
      answer.style.maxHeight = answer.scrollHeight + 'px'
      btn.setAttribute('aria-expanded', 'true')
    }
  }, [])

  return { handleClick }
}

/* ========== Video Modal ========== */
export function VideoModal() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const open = useCallback((videoSrc: string) => {
    console.log('[VideoModal] opening:', videoSrc)
    setActiveVideo(videoSrc)
    document.body.style.overflow = 'hidden'
  }, [])

  const close = useCallback(() => {
    console.log('[VideoModal] closing')
    setActiveVideo(null)
    document.body.style.overflow = ''
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }, [])

  // Escキーで閉じる
  useEffect(() => {
    if (!activeVideo) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [activeVideo, close])

  const modal = activeVideo ? (
    <div className="video-modal-overlay" onClick={close}>
      <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="video-modal-close"
          onClick={close}
          aria-label="閉じる"
        >
          ✕
        </button>
        <video
          ref={videoRef}
          src={activeVideo}
          controls
          autoPlay
          playsInline
          className="video-modal-player"
        >
          お使いのブラウザは動画再生に対応していません。
        </video>
      </div>
    </div>
  ) : null

  return { open, modal }
}

/* ========== Sticky CTA ========== */
export function StickyCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const threshold = window.innerHeight * 0.3
    const handleScroll = () => {
      setVisible(window.scrollY > threshold)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { visible }
}
