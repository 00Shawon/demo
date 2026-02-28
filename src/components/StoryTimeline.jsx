'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { getStoryMilestones, getImagePath } from '@/lib/getData'

function TimelineMoment({ moment, index }) {
  const isEven = index % 2 === 0

  return (
    <div className={`grid md:grid-cols-12 gap-8 md:gap-16 mb-32 last:mb-0 ${isEven ? '' : 'md:flex-row-reverse'}`}>
      {/* Image Column */}
      <div className={`md:col-span-7 ${isEven ? '' : 'md:col-start-6'}`}>
        <div className="relative aspect-[4/5] overflow-hidden">
         <Image
  src={getImagePath(moment.imagePath)}
  alt={moment.title.en}
  fill
  quality={90}
  className="object-cover"
/>
        </div>
      </div>

      {/* Text Column */}
      <div className={`md:col-span-5 flex flex-col justify-center ${isEven ? '' : 'md:col-start-1 md:row-start-1'}`}>
        <p className="font-body text-sm text-[#A67C52] uppercase tracking-wide mb-3">
          {moment.year}
        </p>

        <h3 className="font-display text-3xl md:text-4xl text-[#2B2B2B] mb-4">
          {moment.title.en}
        </h3>

        <p className="font-arabic text-2xl text-[#2B2B2B]/80 mb-6 direction-rtl">
          {moment.title.ur}
        </p>

        <div className="w-12 h-[1px] bg-[#E8E2DB] mb-6" />

        <p className="drop-cap font-body text-graphite/80 leading-relaxed mb-4">
          {moment.story.en}
        </p>

        <p className="font-arabic text-base text-[#2B2B2B]/60 leading-relaxed direction-rtl">
          {moment.story.ur}
        </p>
      </div>
    </div>
  )
}

export default function StoryTimeline() {
  const storyData = getStoryMilestones()

  return (
    <section className="py-32 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-24">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#2B2B2B] tracking-tight mb-4">
            {storyData.title.en}
          </h2>
          
          <p className="font-arabic text-3xl text-[#2B2B2B]/70 direction-rtl">
            {storyData.title.ur}
          </p>

          <div className="h-[1px] w-16 bg-[#A67C52] mx-auto mt-8" />
        </div>

        {/* Timeline */}
        <div className="max-w-6xl mx-auto">
          {storyData.milestones.map((moment, index) => (
            <TimelineMoment key={index} moment={moment} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
