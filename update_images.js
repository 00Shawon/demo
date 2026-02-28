const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public/images/New Image');
const dataDir = path.join(__dirname, 'data');

const holudFiles = fs.readdirSync(path.join(publicDir, 'Holud')).filter(f => f.endsWith('.jpg'));
const weddingFiles = fs.readdirSync(path.join(publicDir, 'wedding')).filter(f => f.endsWith('.jpg'));
const reciptionFiles = fs.readdirSync(path.join(publicDir, 'reciption')).filter(f => f.endsWith('.jpg'));

// Build images.json
const gallery = [];
let idCounter = 1;

holudFiles.forEach(f => {
  gallery.push({
    id: `g${idCounter++}`,
    filename: `Holud/${f}`,
    category: 'holud',
    alt: 'Holud ceremony',
    width: 1600,
    height: 2000,
    aspectRatio: '4:5'
  });
});

weddingFiles.forEach(f => {
  gallery.push({
    id: `g${idCounter++}`,
    filename: `wedding/${f}`,
    category: 'wedding',
    alt: 'Wedding ceremony',
    width: 1600,
    height: 2000,
    aspectRatio: '4:5'
  });
});

reciptionFiles.forEach(f => {
  gallery.push({
    id: `g${idCounter++}`,
    filename: `reciption/${f}`,
    category: 'akth', // keeping the category aligned with 'akth' ceremony
    alt: 'Reception / Akth ceremony',
    width: 1600,
    height: 2000,
    aspectRatio: '4:5'
  });
});

const imagesData = {
  basePath: '/images/New Image',
  gallery
};

fs.writeFileSync(path.join(dataDir, 'images.json'), JSON.stringify(imagesData, null, 2));

// Update ceremonies.json
const ceremoniesData = JSON.parse(fs.readFileSync(path.join(dataDir, 'ceremonies.json'), 'utf8'));

// akth = reciption
ceremoniesData.ceremonies[0].heroImage = `reciption/${reciptionFiles[0]}`;
ceremoniesData.ceremonies[0].galleryImages = reciptionFiles.slice(1, 7).map(f => `reciption/${f}`);

// wedding = wedding
ceremoniesData.ceremonies[1].heroImage = `wedding/${weddingFiles[0]}`;
ceremoniesData.ceremonies[1].galleryImages = weddingFiles.slice(1, 7).map(f => `wedding/${f}`);

// holud = Holud
ceremoniesData.ceremonies[2].heroImage = `Holud/${holudFiles[0]}`;
ceremoniesData.ceremonies[2].galleryImages = holudFiles.slice(1, 7).map(f => `Holud/${f}`);

fs.writeFileSync(path.join(dataDir, 'ceremonies.json'), JSON.stringify(ceremoniesData, null, 2));

// Update content.json
const contentData = JSON.parse(fs.readFileSync(path.join(dataDir, 'content.json'), 'utf8'));

contentData.hero.posterPath = `wedding/${weddingFiles[0]}`;
contentData.brideReveal.imagePath = `wedding/${weddingFiles[1]}`;
contentData.story.milestones[0].imagePath = `reciption/${reciptionFiles[1]}`;
contentData.story.milestones[1].imagePath = `Holud/${holudFiles[1]}`;
contentData.story.milestones[2].imagePath = `wedding/${weddingFiles[2]}`;

fs.writeFileSync(path.join(dataDir, 'content.json'), JSON.stringify(contentData, null, 2));

console.log('Update complete.');
