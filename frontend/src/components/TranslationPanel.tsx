
interface Props {
  selectedWord: string | null
}

export default function TranslationPanel({ selectedWord }: Props) {
  return (
    <aside
      style={{
        width: '300px',
        minWidth: '260px',
        padding: '1.25rem',
        background: 'var(--bg-sidebar)',
        borderLeft: '1px solid var(--border)',
        color: 'var(--text-primary)',
        overflowY: 'auto',
      }}
    >
      <h2
        style={{
          margin: '0 0 0.5rem',
          fontSize: '1rem',
          fontWeight: 700,
        }}
      >
        Übersetzung
      </h2>

      <p
        style={{
          margin: '0 0 1.5rem',
          fontSize: '0.82rem',
          color: 'var(--text-muted)',
          lineHeight: 1.5,
        }}
      >
        Wähle ein Wort oder einen Text im PDF aus.
      </p>

      {selectedWord ? (
        <section
          style={{
            padding: '1rem',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--bg-app)',
          }}
        >
          <div
            style={{
              fontSize: '0.7rem',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '0.5rem',
            }}
          >
            Ausgewählter Text
          </div>

          <p
            style={{
              margin: 0,
              fontWeight: 600,
              overflowWrap: 'anywhere',
            }}
          >
            {selectedWord}
          </p>

          <p
            style={{
              margin: '1rem 0 0',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              lineHeight: 1.5,
            }}
          >
            Die Übersetzungsfunktion wird in einer späteren Entwicklungsphase
            implementiert.
          </p>
        </section>
      ) : (
        <div
          style={{
            padding: '1.5rem 1rem',
            textAlign: 'center',
            border: '1px dashed var(--border)',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--text-muted)',
            fontSize: '0.85rem',
            lineHeight: 1.6,
          }}
        >
          <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>
            文
          </div>
          Hier erscheint später die Übersetzung deines ausgewählten Textes.
        </div>
      )}
    </aside>
  )
}
