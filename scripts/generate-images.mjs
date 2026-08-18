// ใช้สร้างภาพตัวอย่าง (SVG Placeholder) สำหรับหน้าประวัติบุคคล
// รันด้วย: node scripts/generate-images.mjs
// หากมีภาพจริง ให้วางไฟล์ชื่อเดียวกับที่สร้าง (เช่น anutin-1.svg) ที่ public/images/characters/
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public', 'images', 'characters')
mkdirSync(outDir, { recursive: true })

const person = {
  id: 'anutin',
  name: 'นายอนุทิน ชาญวีรกูล',
  nameEn: 'Anutin Charnvirakul',
  c1: '#1a2b6d',
  c2: '#e11d2e',
  scenes: [
    ['🇹🇭', 'ภาพเหมือน · โปรไฟล์', 'Anutin Charnvirakul'],
    ['🏛️', 'การบริหารราชการแผ่นดิน', 'Public Administration'],
    ['🤝', 'เยี่ยมเยียนประชาชนในพื้นที่', 'Meeting the People Nationwide'],
  ],
}

const circles = [
  'cx="1050" cy="90" r="140"',
  'cx="140" cy="560" r="180"',
  'cx="980" cy="500" r="70"',
  'cx="300" cy="140" r="60"',
]

let count = 0
person.scenes.forEach(([emoji, label, sub], i) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${person.c1}"/>
      <stop offset="100%" stop-color="${person.c2}"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="42%" r="55%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.28)"/>
      <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#bg)"/>
  <circle ${circles[0]} fill="rgba(255,255,255,0.10)"/>
  <circle ${circles[1]} fill="rgba(255,255,255,0.08)"/>
  <circle ${circles[2]} fill="rgba(255,255,255,0.14)"/>
  <circle ${circles[3]} fill="rgba(255,255,255,0.07)"/>
  <rect width="1200" height="675" fill="url(#glow)"/>
  <text x="600" y="320" font-size="230" text-anchor="middle" dominant-baseline="middle">${emoji}</text>
  <rect x="430" y="470" width="340" height="3" fill="rgba(255,255,255,0.35)"/>
  <text x="600" y="520" font-size="46" font-weight="700" fill="#ffffff" text-anchor="middle" font-family="'Segoe UI','Noto Sans Thai',sans-serif">${label}</text>
  <text x="600" y="565" font-size="24" fill="rgba(255,255,255,0.85)" text-anchor="middle" font-family="'Segoe UI',sans-serif" letter-spacing="1">${sub}</text>
  <text x="600" y="625" font-size="28" font-weight="700" fill="#ffffff" text-anchor="middle" font-family="'Segoe UI','Noto Sans Thai',sans-serif">${person.name} · ${person.nameEn}</text>
</svg>
`
  writeFileSync(join(outDir, `${person.id}-${i + 1}.svg`), svg, 'utf8')
  count += 1
})

console.log(`Generated ${count} images in ${outDir}`)