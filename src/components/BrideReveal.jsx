'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { getBrideRevealContent, getImagePath } from '@/lib/getData'

export default function BrideReveal() {
  const revealData = getBrideRevealContent()
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  // Subtle parallax and smooth scale
  const imageY = useTransform(scrollYProgress, [0, 1], ['-2%', '2%'])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1])
  const textBlur = useTransform(scrollYProgress, [0, 0.2], [10, 0])

  return (
    <section ref={containerRef} className="relative h-[110vh] bg-[#0a0a0a] overflow-hidden">
      {/* Background Layer */}
      <motion.div 
        style={{ y: imageY, scale: imageScale }} 
        className="absolute inset-0 z-0"
      >
       <Image
  src={getImagePath(revealData.imagePath)}
  alt="Bride portrait"
  fill
  quality={90}  // ✅ In config
  sizes="100vw"
  className="object-cover object-center"
/>
        {/* Layered Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
      </motion.div>

      {/* Content Overlay - Asymmetric Layout */}
      <div className="relative z-10 h-full w-full max-w-[1400px] mx-auto px-10 md:px-24 flex flex-col justify-center">
        <div className="max-w-2xl">
          
          {/* Floating Label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 0.5, x: 0 }}
            transition={{ duration: 1.5 }}
            className="font-body text-[9px] uppercase tracking-[0.8em] text-white mb-12 border-l border-clay pl-4"
          >
            A Moment Captured
          </motion.div>

          {/* Refined Title - Sophisticated serif spacing */}
          <motion.h2 
            initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
            className="font-display text-3xl md:text-5xl text-white tracking-[-0.04em] leading-[0.9] mb-12"
          >
            {revealData.title.en}
          </motion.h2>
          
          <div className="space-y-12">
            {/* English Description - Narrower column for readability */}
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.8 }}
              transition={{ delay: 0.8, duration: 1.5 }}
              className="font-body text-base md:text-md text-white/70 leading-relaxed font-light max-w-md italic border-clay/30"
            >
              {revealData.description.en}
            </motion.p>

            {/* Urdu - Offset for visual interest */}
            <motion.p 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 0.6, x: 0 }}
              transition={{ delay: 1.2, duration: 1.5 }}
              className="font-arabic text-md md:text-xl text-clay direction-rtl leading-[2.2] max-w-lg ml-auto md:ml-0"
            >
              {revealData.description.ur}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Decorative Corner Element */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.2 }}
        className="absolute bottom-12 right-12 font-body text-[8px] text-white tracking-[1em] uppercase vertical-text hidden md:block"
        style={{ writingMode: 'vertical-rl' }}
      >
        Est. 2024
      </motion.div>
    </section>
  )
}