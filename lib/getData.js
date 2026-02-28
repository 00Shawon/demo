import contentData from '@/data/content.json'
import ceremoniesData from '@/data/ceremonies.json'
import imagesData from '@/data/images.json'
import duasData from '@/data/duas.json'

// Get hero content
export function getHeroContent() {
  return contentData.hero
}

// Get bride reveal content
export function getBrideRevealContent() {
  return contentData.brideReveal
}

// Get story milestones
export function getStoryMilestones() {
  return contentData.story
}

// Get all ceremonies
export function getAllCeremonies() {
  return ceremoniesData.ceremonies
}

// Get ceremony by ID
export function getCeremonyById(id) {
  return ceremoniesData.ceremonies.find(c => c.id === id)
}

// Get all gallery images
export function getAllGalleryImages() {
  const basePath = imagesData.basePath
  return imagesData.gallery.map(img => ({
    ...img,
    src: `${basePath}/${img.filename}`
  }))
}

// Get gallery images by category
export function getGalleryImagesByCategory(category) {
  const allImages = getAllGalleryImages()
  if (category === 'all') return allImages
  return allImages.filter(img => img.category === category)
}

// Get all duas
export function getAllDuas() {
  return duasData.duas
}

// Get parent blessings
export function getParentBlessings() {
  return duasData.parentBlessings
}

// Get footer content
export function getFooterContent() {
  return contentData.footer
}

export function getImagePath(filename) {
  if (!filename) return '/images/placeholder.jpg';
  
  // 1. Remove any leading slashes
  const clean = filename.startsWith('/') ? filename.slice(1) : filename;
  
  // 2. The JSON files now contain the subfolder directly (e.g. "Holud/filename.jpg")
  const finalPath = `/images/New Image/${clean}`;
  
  // This will show up in your terminal/console so you can verify the path
  console.log("Image Requesting Path:", finalPath);
  
  return finalPath;
}

// Helper: Get video path
export function getVideoPath(filename) {
  return `/videos/${filename}`
}

// Helper: Get audio path
export function getAudioPath(filename) {
  return `/audio/${filename}`
}
