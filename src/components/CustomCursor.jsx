'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [cursorText, setCursorText] = useState('')

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 300 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    // Only run on desktop
    if (window.innerWidth < 1024) return

    const moveCursor = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setIsVisible(true)
    }

    const handleMouseOver = (e) => {
      const target = e.target
      
      // Hovering over links, buttons
      if (target.closest('a') || target.closest('button')) {
        setIsHovering(true)
        
        // Special cursor text for specific elements
        if (target.closest('[data-cursor-text]')) {
          setCursorText(target.closest('[data-cursor-text]').dataset.cursorText)
        } else {
          setCursorText('')
        }
      } 
      // Hovering over images
      else if (target.closest('img') || target.closest('[data-cursor="view"]')) {
        setIsHovering(true)
        setCursorText('View')
      } 
      else {
        setIsHovering(false)
        setCursorText('')
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleMouseOver)
    document.body.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleMouseOver)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [cursorX, cursorY])

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[60]">
      {/* Main cursor dot */}
      <motion.div
        className="absolute"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            scale: isHovering ? 1.5 : 1,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="w-2 h-2 rounded-full bg-clay"
        />
      </motion.div>

      {/* Outer cursor ring */}
      <motion.div
        className="absolute"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            scale: isHovering ? 1.8 : 1,
            opacity: isVisible ? 0.5 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="w-8 h-8 rounded-full border-2 border-clay mix-blend-difference"
        />
      </motion.div>

      {/* Cursor text (for images) */}
      {cursorText && (
        <motion.div
          className="absolute pointer-events-none"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: '-50%',
            translateY: '-150%',
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          <div className="bg-graphite text-pure-white px-4 py-2 rounded-full font-body text-tiny uppercase tracking-wide whitespace-nowrap">
            {cursorText}
          </div>
        </motion.div>
      )}
    </div>
  )
}
