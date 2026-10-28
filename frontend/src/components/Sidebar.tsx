import { useRef, useState } from 'react'

export interface Doc {
  id: number
  name: string
  size: number
}

interface Props {
  documents: Doc[]
  activeDocId: number | null
  loading: boolean
  onSelect: (id: number) => void
  onUploaded: () => void
}

export default function Sidebar({ documents, activeDocId, loading, onSelect, onUploaded }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const upload = async (file: File) => {
    setUploading(true)
    setError(null)
    const form = new FormData()
    form.append('file', file)
    try {
      const res = await fetch('/api/documents', { method: 'POST', body: form })
      if (res.ok) {
        onUploaded()
      } else {
        const data = await res.json()
        setError(data.detail ?? 'Upload fehlgeschlagen.')
      }
    } catch {
      setError('Netzwerkfehler.')
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  const fmt = (bytes: number) =>
    bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`

  return (
    <aside style={{
      width: 'var(--sidebar-w)',
      minWidth: 'var(--sidebar-w)',
      background: 'var(--bg-sidebar)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Upload */}
      <div style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          style={{ display: 'none' }}
          onChange={e => e.target.files?.[0] && upload(e.target.files[0])}
        />
        <button
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          style={{
            width: '100%',
            padding: '0.6rem 1rem',
            background: uploading ? 'var(--brand-muted)' : 'var(--brand)',
            color: 'var(--text-on-brand)',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.85rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            opacity: uploading ? 0.7 : 1,
            transition: 'background 0.15s',
          }}
        >
          <span style={{ fontSize: 16 }}>+</span>
          {uploading ? 'Wird hochgeladen…' : 'PDF hochladen'}
        </button>
        {error && (
          <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#dc2626' }}>{error}</p>
        )}
      </div>

      {/* Document list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem' }}>
        <p style={{
          fontSize: '0.68rem',
          fontWeight: 700,
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          padding: '0.5rem 0.5rem 0.4rem',
        }}>
          Dokumente
        </p>

        {loading && (
          <p style={{ padding: '0.75rem 0.5rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Lädt…
          </p>
        )}

        {!loading && documents.length === 0 && (
          <div style={{
            padding: '2rem 1rem',
            textAlign: 'center',
            color: 'var(--text-muted)',
            fontSize: '0.82rem',
            lineHeight: 1.6,
          }}>
            <div style={{ fontSize: 32, marginBottom: '0.5rem' }}>📄</div>
            Noch keine PDFs hochgeladen.
          </div>
        )}

        {documents.map(doc => (
          <button
            key={doc.id}
            onClick={() => onSelect(doc.id)}
            title={doc.name}
            style={{
              width: '100%',
              textAlign: 'left',
              padding: '0.55rem 0.75rem',
              borderRadius: 'var(--radius-sm)',
              border: activeDocId === doc.id
                ? '1px solid var(--brand)'
                : '1px solid transparent',
              background: activeDocId === doc.id ? 'var(--brand-muted)' : 'transparent',
              color: activeDocId === doc.id ? 'var(--brand)' : 'var(--text-primary)',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              marginBottom: 2,
              transition: 'background 0.1s, border-color 0.1s',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              if (activeDocId !== doc.id)
                e.currentTarget.style.background = 'var(--bg-hover)'
            }}
            onMouseLeave={e => {
              if (activeDocId !== doc.id)
                e.currentTarget.style.background = 'transparent'
            }}
          >
            <span style={{
              fontSize: '0.82rem',
              fontWeight: 500,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {doc.name}
            </span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              {fmt(doc.size)}
            </span>
          </button>
        ))}
      </div>
    </aside>
  )
}
