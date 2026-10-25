import { useState, useEffect } from 'react'
import UploadZone from './components/UploadZone'
import PDFViewer from './components/PDFViewer'

interface Document {
  id: number
  name: string
  size: number
}

export default function App() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [activeDocId, setActiveDocId] = useState<number | null>(null)

  const fetchDocuments = async () => {
    const res = await fetch('/api/documents')
    if (res.ok) setDocuments(await res.json())
  }

  useEffect(() => { fetchDocuments() }, [])

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: 1100, margin: '0 auto', padding: '1rem' }}>
      <h1 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>LexiPDF</h1>

      <UploadZone onUploaded={fetchDocuments} />

      {documents.length > 0 && (
        <div style={{ marginTop: '1.5rem' }}>
          <h2 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Dokumente</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {documents.map(doc => (
              <li key={doc.id} style={{ marginBottom: '0.4rem' }}>
                <button
                  onClick={() => setActiveDocId(doc.id)}
                  style={{
                    background: activeDocId === doc.id ? '#0066cc' : '#eee',
                    color: activeDocId === doc.id ? '#fff' : '#000',
                    border: 'none', borderRadius: 4, padding: '0.4rem 0.8rem', cursor: 'pointer'
                  }}
                >
                  {doc.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeDocId !== null && (
        <PDFViewer docId={activeDocId} />
      )}
    </div>
  )
}
