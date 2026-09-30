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
    .map(([key, url]) => ({ name: platformNames[key] ?? key, url: safeUrl(url) }))
    .filter((item): item is { name: string; url: string } => Boolean(item.url))

  const socials = Object.entries(release.socials)
    .map(([key, url]) => ({ name: socialNames[key] ?? key, url: safeUrl(url) }))
    .filter((item): item is { name: string; url: string } => Boolean(item.url))

  const videoId = getYoutubeVideoId(release.youtubeVideoUrl)

  return (
    <main className="release-page">
      {release.isSample && (
        <div className="demo-banner">SAMPLE PAGE · Replace demo details and links in <code>src/release.ts</code> before publishing</div>
      )}
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label={`${release.artist} home`}>
          <span className="wordmark-mark" aria-hidden="true">✳</span>
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
            {platforms.map((platform, index) => (
              <a
                className="platform-link"
                href={platform.url}
                key={platform.name}
                target="_blank"
                rel="noreferrer"
              >
                <span className={`platform-icon platform-icon-${index % 4}`} aria-hidden="true">
                  {platform.name.slice(0, 1)}
                </span>
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
              {social.name}<span aria-hidden="true">↗</span>
            </a>
          ))}
          {socials.length === 0 && <span className="empty-note">Add social links in <code>src/release.ts</code>.</span>}
        </nav>
        <div className="footer-bottom">
          <span>© {release.artist}</span>
          <span>MADE FOR THE MUSIC</span>
        </div>
      </footer>
    </main>
  )
}

export default App
