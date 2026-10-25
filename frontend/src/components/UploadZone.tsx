import { useRef, useState } from 'react'

interface Props {
  onUploaded: () => void
}

export default function UploadZone({ onUploaded }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [status, setStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const upload = async (file: File) => {
    setLoading(true)
    setStatus(null)
    const form = new FormData()
    form.append('file', file)
    const res = await fetch('/api/documents', { method: 'POST', body: form })
    setLoading(false)
    if (res.ok) {
      setStatus('Hochgeladen.')
      onUploaded()
    } else {
      const err = await res.json()
      setStatus(`Fehler: ${err.detail}`)
    }
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        style={{ display: 'none' }}
        onChange={e => e.target.files?.[0] && upload(e.target.files[0])}
      />
      <button
        onClick={() => inputRef.current?.click()}
        disabled={loading}
        style={{ padding: '0.5rem 1.2rem', cursor: 'pointer' }}
      >
        {loading ? 'Lädt...' : 'PDF hochladen'}
      </button>
      {status && <span style={{ marginLeft: '1rem', fontSize: '0.9rem' }}>{status}</span>}
    </div>
  )
}
