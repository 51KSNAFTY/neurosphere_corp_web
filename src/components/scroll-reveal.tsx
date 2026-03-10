'use client'

import { useEffect } from 'react'

export function ScrollReveal() {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.js-reveal-text')

    if (revealElements.length === 0 || !('IntersectionObserver' in window)) {
      revealElements.forEach((el) => el.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('is-visible')
            }, 100)
          }
        })
      },
      { root: null, rootMargin: '0px', threshold: 0.15 },
    )

    revealElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return null
}
