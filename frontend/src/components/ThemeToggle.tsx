interface Props {
  isDark: boolean
  onToggle: () => void
}

export default function ThemeToggle({ isDark, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      title={isDark ? 'Zum hellen Modus wechseln' : 'Zum dunklen Modus wechseln'}
      aria-label="Theme umschalten"
      style={{
        width: 36,
        height: 36,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-sm)',
        background: 'var(--bg-input)',
        color: 'var(--text-secondary)',
        fontSize: 17,
        cursor: 'pointer',
        transition: 'border-color 0.15s, background 0.15s',
        flexShrink: 0,
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--brand)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  )
}