'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { getHeroContent } from '@/lib/getData'

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const heroData = getHeroContent()

  useEffect(() => {
    // Add loading class to body
    document.body.classList.add('loading')

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 30)

    // Minimum display time for elegance
    const timer = setTimeout(() => {
      setIsLoading(false)
      document.body.classList.remove('loading')
    }, 2500)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
      document.body.classList.remove('loading')
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-bone flex flex-col items-center justify-center"
        >
          <div className="text-center max-w-2xl px-6">
            
            {/* Arabic Blessing (appears first) */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-arabic text-arabic text-graphite/70 mb-8 direction-rtl"
            >
              {heroData.blessing.ar}
            </motion.p>

            {/* Couple Names */}
            <motion.h1
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ 
                duration: 1, 
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="font-display text-display md:text-hero text-graphite tracking-tight mb-6"
            >
              {heroData.coupleNames.en}
            </motion.h1>

            {/* Animated Progress Line */}
            <div className="relative w-full max-w-xs mx-auto h-[1px] bg-warm-grey overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
                className="absolute left-0 top-0 h-full bg-clay"
              />
            </div>

            {/* Loading Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="font-body text-small text-graphite/50 uppercase tracking-wide mt-6"
            >
              Preparing your journey
            </motion.p>

            {/* Urdu subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="font-arabic text-small text-graphite/40 mt-2 direction-rtl"
            >
              آپ کے سفر کی تیاری
            </motion.p>
          </div>

          {/* Decorative corner elements */}
          <motion.div
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 0.1, rotate: 45 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute top-8 left-8"
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-clay">
              <path d="M20 0L20 40M0 20L40 20" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="20" cy="20" r="15" stroke="currentColor" strokeWidth="0.5" />
            </svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 0.1, rotate: 45 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute bottom-8 right-8"
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-clay">
              <path d="M20 0L20 40M0 20L40 20" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="20" cy="20" r="15" stroke="currentColor" strokeWidth="0.5" />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
