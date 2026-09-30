import './App.css'
import { release } from './release'

const platformNames: Record<string, string> = {
  spotify: 'Spotify',
  appleMusic: 'Apple Music',
  youtubeMusic: 'YouTube Music',
  amazonMusic: 'Amazon Music',
  deezer: 'Deezer',
  tidal: 'TIDAL',
  bandcamp: 'Bandcamp',
  soundcloud: 'SoundCloud',
}

const socialNames: Record<string, string> = {
  instagram: 'Instagram',
  tiktok: 'TikTok',
  youtube: 'YouTube',
  x: 'X',
  facebook: 'Facebook',
}

function PlatformIcon({ name }: { name: string }) {
  const common = { width: 26, height: 26, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': true as const }

  switch (name) {
    case 'spotify':
      return <svg {...common} viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.2" fill="currentColor"/><path d="M6.5 9.3c3.8-1.1 8-.7 11.1 1.2M7.1 12.2c3.2-.9 6.6-.5 9.3 1M7.8 15c2.5-.7 5-.4 7 .8" stroke="#101010" strokeWidth="1.35" strokeLinecap="round"/></svg>
    case 'appleMusic':
      return <svg {...common}><path fill="currentColor" d="M16.4 3.2c.1 1.2-.4 2.5-1.2 3.4-.8.9-2.1 1.6-3.3 1.5-.2-1.2.4-2.5 1.1-3.3.8-.9 2.2-1.6 3.4-1.6Zm4.2 14.1c-.6 1.3-.9 1.9-1.7 3.1-1.1 1.6-2.6 3.7-4.4 3.7-1.6 0-2-.9-4.1-.9s-2.6.9-4.2.9c-1.8 0-3.2-1.9-4.3-3.5-3-4.3-3.3-9.4-1.5-12.1 1.3-1.9 3.4-3 5.4-3 2.1 0 3.3.9 4.9.9 1.5 0 2.4-.9 4.8-.9 1.8 0 3.8 1 5.1 2.7-4.5 2.5-3.8 8.9 0 11.1Z" transform="translate(2 0) scale(.82)"/></svg>
    case 'youtubeMusic':
      return <svg {...common}><circle cx="12" cy="12" r="9.4" stroke="currentColor" strokeWidth="1.8"/><path d="m10 8.6 5.5 3.4-5.5 3.4V8.6Z" fill="currentColor"/></svg>
    case 'amazonMusic':
      return <svg {...common}><path d="M5 16.7c4.2 2.4 9.3 2.7 13.7 1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/><path d="m16.7 15.9 2.4 1.8-2.9 1.1M8.2 13.9V9.8c0-2.1 1.2-3.3 3.3-3.3s3.2 1.1 3.2 3v4.4m-6.5-2.6c.6-.7 1.2-1 2.1-1 1 0 1.7.5 2 1.3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
    case 'deezer':
      return <svg {...common}><path d="M3 15h3v5H3zM7.5 12h3v8h-3zM12 9h3v11h-3zM16.5 6h3v14h-3z" fill="currentColor"/><path d="M3 21h16.5" stroke="currentColor" strokeWidth="1.2"/></svg>
    case 'tidal':
      return <svg {...common}><path d="m4 8 3-3 3 3-3 3-3-3Zm7 0 3-3 3 3-3 3-3-3Zm7 0 2-2 2 2-2 2-2-2ZM7.5 12l3-3 3 3-3 3-3-3Zm7 0 3-3 3 3-3 3-3-3Z" fill="currentColor"/></svg>
    case 'bandcamp':
      return <svg {...common}><path d="M6.5 18 12.7 6h5L11.5 18h-5Z" fill="currentColor"/><path d="M4.5 21h15" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
    case 'soundcloud':
      return <svg {...common}><path d="M4 14v4m3-7v7m3-10v10m3-13v13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M14 10a4.6 4.6 0 0 1 8.1 3 3.5 3.5 0 0 1-3.5 3.5H13V10h1Z" fill="currentColor"/></svg>
    case 'instagram':
      return <svg {...common}><rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5.2" stroke="currentColor" strokeWidth="1.8"/><circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="1.8"/><circle cx="17.7" cy="6.6" r="1.15" fill="currentColor"/></svg>
    case 'tiktok':
      return <svg {...common}><path d="M14.3 3.5v11.2a3.4 3.4 0 1 1-3.1-3.4m3.1-5.2c1 2.1 2.6 3.3 5 3.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    default:
      return <svg {...common}><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7"/><path d="M8 12h8m-3-3 3 3-3 3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
  }
}

function safeUrl(url: string | undefined) {
  if (!url) return undefined
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'https:' || parsed.protocol === 'http:'
      ? parsed.href
      : undefined
  } catch {
    return undefined
  }
}

function getYoutubeVideoId(url: string | undefined) {
  const validUrl = safeUrl(url)
  if (!validUrl) return undefined

  const parsed = new URL(validUrl)
  const host = parsed.hostname.replace(/^www\./, '')
  if (host === 'youtu.be') return parsed.pathname.split('/').filter(Boolean)[0]
  if (host !== 'youtube.com' && host !== 'm.youtube.com') return undefined
  if (parsed.pathname === '/watch') return parsed.searchParams.get('v') ?? undefined

  const [, format, id] = parsed.pathname.split('/')
  return ['embed', 'shorts', 'live'].includes(format) ? id : undefined
}

function App() {
  const platforms = Object.entries(release.platforms)
    .map(([key, url]) => ({ key, name: platformNames[key] ?? key, url: safeUrl(url) }))
    .filter((item): item is { key: string; name: string; url: string } => Boolean(item.url))

  const socials = Object.entries(release.socials)
    .map(([key, url]) => ({ key, name: socialNames[key] ?? key, url: safeUrl(url) }))
    .filter((item): item is { key: string; name: string; url: string } => Boolean(item.url))

  const videoId = getYoutubeVideoId(release.youtubeVideoUrl)

  return (
    <main className="release-page">
      {release.isSample && (
        <div className="demo-banner">SAMPLE PAGE · Replace demo details and links in <code>src/release.ts</code> before publishing</div>
      )}
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label={`${release.artist} home`}>
          <span>{release.artist}</span>
        </a>
        <span className="topbar-note">THE LATEST RELEASE</span>
      </header>

      <section className="hero" id="top" aria-labelledby="release-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="live-dot" /> OUT NOW</p>
          <h1 id="release-title">{release.title}</h1>
          <p className="hero-artist">A new single by <strong>{release.artist}</strong></p>
          {release.releaseDate && <p className="release-date">{release.releaseDate}</p>}
        </div>
        <div className="hero-art-wrap">
          <img className="hero-art" src={release.artwork} alt={`${release.title} single artwork`} />
          <span className="art-caption">SINGLE · {release.artist}</span>
        </div>
      </section>

      <section className="video-section" aria-labelledby="video-heading">
        <div className="section-heading video-heading">
          <p className="eyebrow">THE OFFICIAL VIDEO</p>
          <h2 id="video-heading">Watch {release.title}</h2>
        </div>
        <div className="video-frame">
          {videoId ? (
            <iframe
              src={`https://www.youtube.com/embed/${encodeURIComponent(videoId)}?rel=0`}
              title={`${release.title} — official video by ${release.artist}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <div className="video-placeholder">
              <span className="play-mark" aria-hidden="true">▶</span>
              <p>Add a YouTube video URL in <code>src/release.ts</code></p>
            </div>
          )}
        </div>
      </section>

      <section className="listen-section" aria-labelledby="listen-heading">
        <div className="listen-intro">
          <p className="eyebrow">TAKE IT WITH YOU</p>
          <h2 id="listen-heading">Listen everywhere</h2>
          <p>Choose your favorite platform and press play.</p>
        </div>
        {platforms.length > 0 ? (
          <div className="platform-grid">
            {platforms.map((platform) => (
              <a
                className="platform-link"
                href={platform.url}
                key={platform.name}
                target="_blank"
                rel="noreferrer"
              >
                <span className="platform-icon"><PlatformIcon name={platform.key} /></span>
                <span className="platform-name">{platform.name}</span>
                <span className="platform-arrow" aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        ) : (
          <p className="empty-note">Add streaming links in <code>src/release.ts</code> to show them here.</p>
        )}
      </section>

      <footer className="footer">
        <p className="eyebrow">FOLLOW ALONG</p>
        <nav className="social-links" aria-label="Social media">
          {socials.map((social) => (
            <a href={social.url} key={social.name} target="_blank" rel="noreferrer">
              <PlatformIcon name={social.key} />
              {social.name}<span aria-hidden="true">↗</span>
            </a>
          ))}
          {socials.length === 0 && <span className="empty-note">Add social links in <code>src/release.ts</code>.</span>}
        </nav>
      </footer>
    </main>
  )
}

export default App
