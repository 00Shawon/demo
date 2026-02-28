'use client'

import { motion, AnimatePresence, useScroll } from 'framer-motion'
import { useState, useEffect } from 'react'
import { playHoverSound, playClickSound, initAudio } from '@/lib/sounds'
import { getHeroContent } from '@/lib/getData'

const navItems = [
  { label: 'Home', labelUrdu: 'ہوم', href: '#home' },
  { label: 'Our Story', labelUrdu: 'ہماری کہانی', href: '#story' },
  { label: 'Akth', labelUrdu: 'عقد', href: '#akth' },
  { label: 'Wedding', labelUrdu: 'شادی', href: '#wedding' },
  { label: 'Holud', labelUrdu: 'ہلدی', href: '#holud' },
  { label: 'Gallery', labelUrdu: 'گیلری', href: '#gallery' },
  { label: 'Blessings', labelUrdu: 'دعائیں', href: '#duas' },
  { label: 'Messages', labelUrdu: 'پیغامات', href: '#messages' },
]

export default function Navigation() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const heroData = getHeroContent()

  // Hide nav on scroll down, show on scroll up
  useEffect(() => {
    return scrollY.on('change', (latest) => {
      if (latest > lastScrollY && latest > 150) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      setLastScrollY(latest)
    })
  }, [scrollY, lastScrollY])

  // Track active section
  useEffect(() => {
    initAudio()

    const handleScroll = () => {
      const sections = navItems.map(item => item.href.replace('#', ''))
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Smooth scroll to section
  const scrollToSection = (href) => {
    const id = href.replace('#', '')
    const element = document.getElementById(id)
    if (element) {
      const offset = 100 // Account for fixed nav height
      const elementPosition = element.offsetTop - offset
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
    setMobileMenuOpen(false)
  }

  return (
    <>
      {/* Fixed Navigation */}
      <motion.nav
        initial={false}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-40 bg-bone/90 backdrop-blur-md border-b border-warm-grey/30"
      >
        <div className="container-wide max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo / Monogram */}
            <button
              onClick={() => scrollToSection('#home')}
              className="font-display text-[28px] text-graphite tracking-tight hover:text-clay transition-colors cursor-pointer"
            >
              {heroData.coupleNames.en.split(' & ').map(name => name[0]).join(' & ')}
            </button>

            {/* Desktop Nav Items */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace('#', '')
                return (
                  <button
                    key={item.href}
                    onClick={() => {
                      playClickSound()
                      scrollToSection(item.href)
                    }}
                    onMouseEnter={() => playHoverSound()}
                    className={`font-body text-small uppercase tracking-wide transition-colors relative group py-2 ${
                      isActive ? 'text-graphite' : 'text-graphite/60 hover:text-graphite'
                    }`}
                  >
                    {item.label}
                    
                    {/* Active indicator */}
                    <motion.span
                      initial={false}
                      animate={{
                        width: isActive ? '100%' : '0%',
                      }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-0 left-0 h-[1px] bg-clay"
                    />
                    
                    {/* Hover indicator */}
                    {!isActive && (
                      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-clay/50 group-hover:w-full transition-all duration-300" />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center active:scale-95 transition-transform"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-5">
                <motion.span
                  animate={mobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-0 left-0 w-full h-[2px] bg-graphite"
                />
                <motion.span
                  animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-[2px] bg-graphite"
                />
                <motion.span
                  animate={mobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-graphite"
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-20 left-0 right-0 z-30 bg-bone border-b border-warm-grey/30 overflow-hidden lg:hidden"
          >
            <div className="py-8 px-6 space-y-6">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href.replace('#', '')
                return (
                  <motion.button
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    onClick={() => {
                      playClickSound()
                      scrollToSection(item.href)
                      setMobileMenuOpen(false)
                    }}
                    className="font-display text-4xl text-onyx hover:text-clay transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-body text-body uppercase tracking-wide">
                        {item.label}
                      </span>
                      <span className="font-arabic text-body direction-rtl">
                        {item.labelUrdu}
                      </span>
                    </div>
                    {isActive && (
                      <motion.div
                        layoutId="activeMobile"
                        className="h-[1px] bg-clay mt-2"
                      />
                    )}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
