'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { getImagePath } from '@/lib/getData'
import { blurReveal, staggerContainer } from '@/lib/animations'

export default function CeremonySection({ ceremony }) {
  const heroRef = useRef(null)
  const galleryRef = useRef(null)
  const isGalleryInView = useInView(galleryRef, { once: true, margin: "-100px" })
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  // Parallax effect for background image
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Color mapping
  const accentColors = {
    'deep-wine': 'bg-deep-wine',
    'saffron': 'bg-saffron',
    'terracotta': 'bg-terracotta',
    'clay': 'bg-clay'
  }

  const borderColors = {
    'deep-wine': 'border-deep-wine',
    'saffron': 'border-saffron',
    'terracotta': 'border-terracotta',
    'clay': 'border-clay'
  }

  const accentClass = accentColors[ceremony.accentColor] || 'bg-clay'
  const borderClass = borderColors[ceremony.accentColor] || 'border-clay'

  return (
    <section className="relative">
      {/* PARALLAX HERO */}
      <div ref={heroRef} className="relative h-[80vh] overflow-hidden bg-onyx">
        
        {/* Background Image with Parallax */}
        <div className="absolute inset-0 w-full h-full">
          <motion.div
            style={{ y: heroY }}
            className="relative w-full h-[120%] -top-[10%]"
          >
            <Image
              src={getImagePath(ceremony.heroImage)}
               alt="Bride portrait"
  fill
  quality={90}  // ✅ In config
  sizes="100vw"
  className="object-cover object-center"
            />
          </motion.div>
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-onyx/50 via-transparent to-onyx/50 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)] z-10" />

        {/* Hero Content */}
        <motion.div
          className="relative z-20 h-full flex items-center justify-center px-6"
          style={{ opacity: heroOpacity }}
        >
          <div className="text-center max-w-4xl">
            
            {/* Urdu Title */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}  
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-arabic text-2xl md:text-3xl text-pure-white/90 mb-6 direction-rtl"
            >
              {ceremony.title.ur}
            </motion.p>

            {/* English Title */}
            <motion.h2
              initial={{ opacity: 0, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="font-display text-5xl md:text-7xl lg:text-8xl text-pure-white tracking-tight mb-8"
            >
              {ceremony.title.en}
            </motion.h2>

            {/* Accent Line */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className={`h-[2px] ${accentClass} mx-auto mb-8`}
            />

            {/* Date & Venue */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-2"
            >
              <p className="font-body text-xs md:text-sm text-pure-white/90 uppercase tracking-[0.3em]">
                {ceremony.date.en} • {ceremony.venue.en}
              </p>
              <p className="font-arabic text-sm text-pure-white/80 direction-rtl">
                {ceremony.date.ur} • {ceremony.venue.ur}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* CONTENT SECTION */}
      <div className="py-24 md:py-32 bg-bone">
        <div className="container-standard max-w-6xl mx-auto px-6 md:px-12">
          
          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h3 className="font-display text-3xl md:text-4xl text-graphite mb-4">
              {ceremony.subtitle.en}
            </h3>
            <p className="font-arabic text-2xl text-graphite/70 direction-rtl">
              {ceremony.subtitle.ur}
            </p>
          </motion.div>

          {/* Description */}
          <div className="max-w-3xl mx-auto mb-20">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-body text-lg md:text-xl text-graphite/80 leading-relaxed mb-6 italic"
            >
              "{ceremony.description.en}"
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-arabic text-lg md:text-xl text-graphite/70 leading-relaxed direction-rtl"
            >
              {ceremony.description.ur}
            </motion.p>

            {/* Cultural Note */}
            {ceremony.culturalNote && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className={`mt-12 border-l-2 ${borderClass} pl-6`}
              >
                <p className="font-body text-base text-graphite/60 italic leading-relaxed mb-3">
                  {ceremony.culturalNote.en}
                </p>
                <p className="font-arabic text-base text-graphite/50 italic leading-relaxed direction-rtl">
                  {ceremony.culturalNote.ur}
                </p>
              </motion.div>
            )}
          </div>

          {/* Gallery Grid */}
          <motion.div
            ref={galleryRef}
            variants={staggerContainer}
            initial="hidden"
            animate={isGalleryInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24"
          >
            {ceremony.galleryImages.map((img, index) => (
              <motion.div
                key={index}
                variants={blurReveal}
                className={`relative aspect-[4/5] overflow-hidden group cursor-pointer ${
                  index === 1 ? 'md:mt-12' : ''
                }`}
              >
                <Image
                  src={getImagePath(img)}
                  alt={`${ceremony.title.en} moment ${index + 1}`}
                  fill
                  quality={90}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Dua/Quote */}
          {ceremony.dua && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="max-w-3xl mx-auto text-center"
            >
              <blockquote className="font-arabic text-2xl md:text-3xl text-graphite leading-relaxed mb-6 direction-rtl">
                {ceremony.dua.ar}
              </blockquote>
              <p className="font-body text-lg text-graphite/70 italic leading-relaxed">
                {ceremony.dua.en}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}