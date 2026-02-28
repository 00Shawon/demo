'use client'

import { useRef } from 'react'
import { getAllDuas, getParentBlessings } from '@/lib/getData'

function DuaCard({ dua, index }) {
  return (
    <div className="mb-20 last:mb-0">
      {/* Arabic Text */}
      <div className="mb-8">
        <blockquote className="fancy-quote hanging-quote font-arabic text-2xl md:text-3xl text-graphite leading-relaxed mb-6 direction-rtl text-right">
          {dua.arabic}
        </blockquote>
      </div>

      <div className="w-20 h-[1px] bg-[#A67C52] mb-6" />

      {/* Translation */}
      <p className="font-body text-lg md:text-xl text-[#2B2B2B]/80 leading-relaxed mb-4">
        {dua.translation}
      </p>

      {/* Reference */}
      <div>
        <p className="font-body text-sm text-[#A67C52] uppercase tracking-wide">
          {dua.reference.en}
        </p>
        <p className="font-arabic text-sm text-[#A67C52]/70 direction-rtl mt-1">
          {dua.reference.ur}
        </p>
      </div>
    </div>
  )
}

export default function DuasSection() {
  const duas = getAllDuas()
  const parentBlessings = getParentBlessings()

  return (
    <section className="py-32 bg-[#FAF9F6]">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center mb-24">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#2B2B2B] tracking-tight mb-4">
            Duas & Blessings
          </h2>
          <p className="font-arabic text-3xl text-[#2B2B2B]/70 direction-rtl mb-8">
            دعائیں اور برکتیں
          </p>

          <div className="h-[1px] w-16 bg-[#A67C52] mx-auto mb-8" />

          <p className="font-body text-base text-[#2B2B2B]/70 leading-relaxed max-w-2xl mx-auto">
            We ask Allah to bless this union with love, mercy, and tranquility
          </p>
        </div>

        {/* Duas List */}
        <div className="max-w-4xl mx-auto">
          {duas.map((dua, index) => (
            <DuaCard key={dua.id} dua={dua} index={index} />
          ))}
        </div>

        {/* Parent Blessings */}
        <div className="mt-32 max-w-3xl mx-auto text-center">
          <h3 className="font-display text-3xl md:text-4xl text-[#2B2B2B] mb-6">
            {parentBlessings.title.en}
          </h3>
          <p className="font-arabic text-2xl text-[#2B2B2B]/70 mb-8 direction-rtl">
            {parentBlessings.title.ur}
          </p>

          <blockquote className="font-body text-lg md:text-xl text-[#2B2B2B]/80 italic leading-relaxed mb-6">
            &ldquo;{parentBlessings.message.en}&rdquo;
          </blockquote>

          <p className="font-arabic text-base text-[#2B2B2B]/60 italic leading-relaxed mb-6 direction-rtl">
            &rdquo;{parentBlessings.message.ur}&ldquo;
          </p>
          
          <p className="font-body text-sm text-[#A67C52] uppercase tracking-wide">
            {parentBlessings.attribution.en}
          </p>
        </div>
      </div>
    </section>
  )
}
