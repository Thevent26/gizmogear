'use client'

import { useEffect } from 'react'

export default function ReadingProgress() {
  useEffect(() => {
    const updateProgress = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0
      const progressBar = document.getElementById('progress')
      if (progressBar) progressBar.style.width = scrolled + '%'
    }

    window.addEventListener('scroll', updateProgress)
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return null
}
