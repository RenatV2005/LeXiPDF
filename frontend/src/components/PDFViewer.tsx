import { useEffect, useRef, useState } from 'react'
import * as pdfjsLib from 'pdfjs-dist'

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url
).href

interface Props {
  docId: number
  onWordSelected: (word: string) => void
}

export default function PDFViewer({ docId, onWordSelected }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!containerRef.current) return
    containerRef.current.innerHTML = ''
    setLoading(true)
    setError(null)

    const loadPDF = async () => {
      try {
        const url = `/api/documents/${docId}/file`
        const pdf = await pdfjsLib.getDocument(url).promise

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum)
          const scale = 1.4
          const viewport = page.getViewport({ scale })

          const wrapper = document.createElement('div')
          wrapper.style.cssText = `
            position: relative;
            margin: 0 auto 1.5rem;
            box-shadow: var(--shadow-md);
            border-radius: 2px;
            width: ${viewport.width}px;
            background: #fff;
          `

          const canvas = document.createElement('canvas')
          canvas.width = viewport.width
          canvas.height = viewport.height
          canvas.style.cssText = `display: block;`

          const textLayerDiv = document.createElement('div')
          textLayerDiv.className = 'textLayer'
          textLayerDiv.style.height = `${viewport.height}px`
          textLayerDiv.style.width = `${viewport.width}px`

          wrapper.appendChild(canvas)
          wrapper.appendChild(textLayerDiv)
          containerRef.current!.appendChild(wrapper)

          const ctx = canvas.getContext('2d')!
          await page.render({ canvasContext: ctx, viewport }).promise

          const textContent = await page.getTextContent()

          const textLayer = new pdfjsLib.TextLayer({
            textContentSource: textContent,
            container: textLayerDiv,
            viewport,
          })
          await textLayer.render()
        }
        setLoading(false)
        } catch (err) {
          setLoading(false)
          console.error('PDF loading/rendering failed:', err)

          setError(
            err instanceof Error
            ? `PDF-Fehler: ${err.message}`
            : `PDF-Fehler: ${String(err)}`
          )
        }
    }

    loadPDF()
  }, [docId])

  useEffect(() => {
    const handleMouseUp = () => {
      const sel = window.getSelection()?.toString().trim()
      if (sel && sel.length > 0 && sel.length < 80 && /\S/.test(sel)) {
        onWordSelected(sel)
      }
    }
    document.addEventListener('mouseup', handleMouseUp)
    return () => document.removeEventListener('mouseup', handleMouseUp)
  }, [onWordSelected])

  return (
    <div style={{
      flex: 1,
      overflowY: 'auto',
      padding: '1.5rem',
      background: 'var(--bg-app)',
    }}>
      {loading && (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          height: 200, color: 'var(--text-muted)', fontSize: '0.9rem',
        }}>
          PDF wird geladen…
        </div>
      )}
      {error && (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          height: 200, color: '#dc2626', fontSize: '0.9rem',
        }}>
          {error}
        </div>
      )}
      <div ref={containerRef} />
    </div>
  )
}
