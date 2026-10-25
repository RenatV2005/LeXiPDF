import { useEffect, useRef, useState } from 'react'
import * as pdfjsLib from 'pdfjs-dist'

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url
).toString()

interface Props {
  docId: number
}

export default function PDFViewer({ docId }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedWord, setSelectedWord] = useState<string | null>(null)

  useEffect(() => {
    if (!containerRef.current) return
    containerRef.current.innerHTML = ''

    const loadPDF = async () => {
      const url = `/api/documents/${docId}/file`
      const pdf = await pdfjsLib.getDocument(url).promise

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum)
        const scale = 1.4
        const viewport = page.getViewport({ scale })

        const wrapper = document.createElement('div')
        wrapper.style.cssText = `position:relative;margin-bottom:1rem;`

        const canvas = document.createElement('canvas')
        canvas.width = viewport.width
        canvas.height = viewport.height
        canvas.style.cssText = `display:block;`

        const textLayerDiv = document.createElement('div')
        textLayerDiv.className = 'textLayer'
        textLayerDiv.style.cssText = `
          position:absolute;top:0;left:0;
          width:${viewport.width}px;height:${viewport.height}px;
          overflow:hidden;opacity:0.2;line-height:1;
        `

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
    }

    loadPDF()
  }, [docId])

  useEffect(() => {
    const handleMouseUp = () => {
      const selection = window.getSelection()?.toString().trim()
      if (selection && selection.length > 0 && selection.length < 60) {
        setSelectedWord(selection)
        console.log('Ausgewähltes Wort:', selection)
      }
    }
    document.addEventListener('mouseup', handleMouseUp)
    return () => document.removeEventListener('mouseup', handleMouseUp)
  }, [])

  return (
    <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1.5rem' }}>
      <div ref={containerRef} style={{ flex: 1, overflowY: 'auto', maxHeight: '80vh' }} />
      <div style={{
        width: 260, border: '1px solid #ddd', borderRadius: 6,
        padding: '1rem', alignSelf: 'flex-start', minHeight: 120
      }}>
        <strong style={{ fontSize: '0.85rem' }}>Ausgewähltes Wort</strong>
        {selectedWord
          ? <p style={{ marginTop: '0.5rem', fontSize: '1.1rem' }}>{selectedWord}</p>
          : <p style={{ marginTop: '0.5rem', color: '#999', fontSize: '0.85rem' }}>
              Wort im PDF markieren…
            </p>
        }
        <p style={{ marginTop: '1rem', fontSize: '0.75rem', color: '#aaa' }}>
          Übersetzung kommt in Milestone 3
        </p>
      </div>
    </div>
  )
}
