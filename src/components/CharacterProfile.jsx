import { useState } from 'react'
import { statLabels } from '../data/characters.js'
import '../profile.css'

const ABILITY_ICONS = ['💉', '🌿', '🏛️']

export default function CharacterProfile({ character, user, onLogout }) {
  const [lightbox, setLightbox] = useState(null)

  return (
    <div className="page">
      <header className="navbar">
        <div className="navbar-inner">
          <a className="brand" href="#top" onClick={(e) => e.preventDefault()}>
            <span className="brand-icon" aria-hidden="true">
              🦸
            </span>
            <span className="brand-text">
              ประวัติบุคคล <small>Biography Profile</small>
            </span>
          </a>

          <div className="navbar-actions">
            <div className="user-chip" title={user.role}>
              <span className="user-avatar" aria-hidden="true">
                {user.name.charAt(0)}
              </span>
              <span className="user-name">{user.name}</span>
            </div>
            <button type="button" className="btn btn-ghost" onClick={onLogout}>
              ออกจากระบบ
            </button>
          </div>
        </div>
      </header>

      <section className="profile-hero" id="top">
        <img className="profile-hero-bg" src={character.images[0].src} alt="" />
        <div className="profile-hero-overlay" />
        <div className="profile-hero-content">
          <p className="hero-tagline">{character.role}</p>
          <h1 className="profile-name">
            {character.name}
            <span>{character.nameEn}</span>
          </h1>
          <p className="profile-quote">{character.quote}</p>
          <div className="profile-tags">
            {character.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <main className="content profile-content">
        <section className="profile-section">
          <h2 className="section-title">🖼️ แกลเลอรีภาพ</h2>
          <p className="section-sub">ทั้งหมด 3 ภาพ · คลิกที่ภาพเพื่อขยาย</p>
          <div className="profile-gallery">
            {character.images.map((image, i) => (
              <button
                type="button"
                key={image.src}
                className="photo-card"
                onClick={() => setLightbox(image)}
              >
                <img src={image.src} alt={image.alt} loading="lazy" />
                <span className="photo-num">ภาพที่ {i + 1}</span>
                <span className="photo-caption">{image.caption}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="profile-section">
          <h2 className="section-title">📖 ประวัติความเป็นมา</h2>
          <div className="story-list">
            {character.story.map((block, i) => (
              <div className="story-block" key={block.heading}>
                <span className="story-index">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3>{block.heading}</h3>
                  <p>{block.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="profile-cols">
          <section className="profile-section">
            <h2 className="section-title">🎭 ลักษณะนิสัย</h2>
            <div className="personality-grid">
              {character.personality.map((item) => (
                <div className="personality-card" key={item.trait}>
                  <h3>{item.trait}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="profile-section">
            <h2 className="section-title">🏆 ผลงานสำคัญ</h2>
            <div className="ability-list">
              {character.abilities.map((ability, i) => (
                <div className="ability-card" key={ability.name}>
                  <span className="ability-icon" aria-hidden="true">
                    {ABILITY_ICONS[i] || '⭐'}
                  </span>
                  <div>
                    <h3>{ability.name}</h3>
                    <p>{ability.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="profile-cols">
          <section className="profile-section">
            <h2 className="section-title">🪪 ข้อมูลส่วนตัว</h2>
            <div className="info-grid">
              {character.info.map((item) => (
                <div className="info-card" key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </section>

          <section className="profile-section">
            <h2 className="section-title">📊 คะแนนโดยรวม</h2>
            <div className="stat-list">
              {Object.entries(character.stats).map(([key, value]) => (
                <div className="stat-row" key={key}>
                  <span className="stat-label">{statLabels[key]}</span>
                  <div className="stat-bar">
                    <div className="stat-fill" style={{ width: `${value}%` }} />
                  </div>
                  <span className="stat-value">{value}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

      </main>

      <footer className="site-footer">
        <p>
          © {new Date().getFullYear()} Biography · ประวัติ นายอนุทิน ชาญวีรกูล
        </p>
      </footer>

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <div
            className="lightbox-inner"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="lightbox-close"
              onClick={() => setLightbox(null)}
              aria-label="ปิด"
            >
              ✕
            </button>
            <img src={lightbox.src} alt={lightbox.alt} />
            <p>{lightbox.caption}</p>
          </div>
        </div>
      )}
    </div>
  )
}