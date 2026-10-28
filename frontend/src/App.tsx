import { useState, useEffect, useCallback } from 'react'
import Sidebar, { Doc } from './components/Sidebar'
import PDFViewer from './components/PDFViewer'
import TranslationPanel from './components/TranslationPanel'
import ThemeToggle from './components/ThemeToggle'

// ── Theme helpers ──────────────────────────────────────────────
function getInitialDark(): boolean {
  try {
    const saved = localStorage.getItem('lexipdf-theme')
    if (saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  } catch { return false }
}

function applyTheme(dark: boolean) {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  try { localStorage.setItem('lexipdf-theme', dark ? 'dark' : 'light') } catch { }
}

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(getInitialDark)
  const [documents, setDocuments] = useState<Doc[]>([])
  const [docsLoading, setDocsLoading] = useState(true)
  const [activeDocId, setActiveDocId] = useState<number | null>(null)
  const [selectedWord, setSelectedWord] = useState<string | null>(null)

  // Apply theme whenever it changes
  useEffect(() => { applyTheme(isDark) }, [isDark])

  const fetchDocuments = useCallback(async () => {
    setDocsLoading(true)
    try {
      const res = await fetch('/api/documents')
      if (res.ok) setDocuments(await res.json())
    } catch { }
    finally { setDocsLoading(false) }
  }, [])

  useEffect(() => { fetchDocuments() }, [fetchDocuments])

  // Logo switches immediately on theme change
  const logoSrc = isDark ? '/images/lexipdf-dark.png' : '/images/lexipdf-logo.png'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>

      {/* ── Header ── */}
      <header style={{
        height: 'var(--header-h)',
        minHeight: 'var(--header-h)',
        background: 'var(--bg-header)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 1.25rem',
        gap: '1rem',
        boxShadow: 'var(--shadow-sm)',
        zIndex: 10,
      }}>
        <img
          src={logoSrc}
          alt="IT FOR ALL — LexiPDF"
          style={{
            height: 34,
            width: 'auto',
            objectFit: 'contain',
            display: 'block',
          }}
        />

        <div style={{ flex: 1 }} />

        {activeDocId !== null && (
          <span style={{
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: '50%',
              background: '#22c55e', display: 'inline-block',
            }} />
            PDF geöffnet
          </span>
        )}

        {/* ThemeToggle bekommt State + Setter als Props */}
        <ThemeToggle isDark={isDark} onToggle={() => setIsDark(d => !d)} />
      </header>

      {/* ── Body ── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        <Sidebar
          documents={documents}
          activeDocId={activeDocId}
          loading={docsLoading}
          onSelect={(id) => { setActiveDocId(id); setSelectedWord(null) }}
          onUploaded={fetchDocuments}
        />

        <main style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {activeDocId === null ? (
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-muted)',
              gap: '1rem',
              padding: '2rem',
            }}>
              {/* App-Icon als zentrales leeres-State-Visual */}
              <img
                src="/images/lexipdf-icon.png"
                alt="LexiPDF"
                style={{ width: 72, height: 72, opacity: 0.35, borderRadius: 16 }}
              />
              <p style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
                Wähle ein Dokument aus der Seitenleiste
              </p>
              <p style={{ fontSize: '0.82rem', textAlign: 'center', maxWidth: 320, lineHeight: 1.6 }}>
                oder lade ein neues PDF hoch, um es hier zu lesen.
              </p>
            </div>
          ) : (
            <PDFViewer
              docId={activeDocId}
              onWordSelected={setSelectedWord}
            />
          )}
        </main>

        <TranslationPanel selectedWord={selectedWord} />
      </div>
    </div>
  )
}