import VideoHero from '@/components/VideoHero'
import BrideReveal from '@/components/BrideReveal'
import StoryTimeline from '@/components/StoryTimeline'
import CeremonySection from '@/components/CeremonySection'
import CinematicGallery from '@/components/CinematicGallery'
import DuasSection from '@/components/DuasSection'
import MessageBoard from '@/components/MessageBoard'
import Navigation from '@/components/Navigation'
import ScrollProgress from '@/components/ScrollProgress'
import BackToTop from '@/components/BackToTop'
import SectionDivider from '@/components/SectionDivider'
import { getAllCeremonies } from '@/lib/getData'

export default function Home() {
  const ceremonies = getAllCeremonies()
  console.log('-----------------------------------', ceremonies)
  
  // Get ceremonies by ID in chronological order
  const reciptionCeremony = ceremonies.find(c => c.id === 'Reciption')
  const holudCeremony = ceremonies.find(c => c.id === 'holud')
  const weddingCeremony = ceremonies.find(c => c.id === 'wedding')

  return (
    <>
      <Navigation />
      <ScrollProgress />
      <BackToTop />
      
      <main>
        {/* HOME SECTION */}
        <div id="home">
          <VideoHero />
      
        </div>
        
        <SectionDivider variant="ornament" />
        
        {/* STORY SECTION */}
        <div id="story">
          <StoryTimeline />
        </div>
        
        <SectionDivider variant="line" accentColor="clay" />
         <div id="home" className='mb-20'>
         
          <BrideReveal />
        </div>
        {/* HOLUD CEREMONY */}
        <div id="holud">
          {holudCeremony && <CeremonySection ceremony={holudCeremony} />}
        </div>
        
        <SectionDivider variant="line" accentColor="deep-wine" />
        
        {/* WEDDING CEREMONY */}
        <div id="wedding">
          {weddingCeremony && <CeremonySection ceremony={weddingCeremony} />}
        </div>
        
        <SectionDivider variant="ornament" />

        {/* RECIPTION CEREMONY */}
        <div id="reciption">
          {reciptionCeremony && <CeremonySection ceremony={reciptionCeremony} />}
        </div>
        
        <SectionDivider variant="ornament" />
        
        {/* GALLERY SECTION */}
        <div id="gallery">
          <CinematicGallery />
        </div>
        
        <SectionDivider variant="line" />
        
        {/* DUAS SECTION */}
        <div id="duas">
          <DuasSection />
        </div>
        
        <SectionDivider variant="text" />
        
        {/* MESSAGES SECTION */}
        <div id="messages">
          <MessageBoard />
        </div>
      </main>
    </>
  )
}