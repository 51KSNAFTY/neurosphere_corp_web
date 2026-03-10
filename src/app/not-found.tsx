import Link from 'next/link'

export default function NotFound() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        padding: '2em',
      }}
    >
      <h1 style={{ fontSize: '3rem', marginBottom: '0.5em' }}>404</h1>
      <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '2em' }}>
        ページが見つかりませんでした
      </p>
      <Link
        href="/"
        style={{
          background: '#05A8B3',
          color: '#fff',
          padding: '0.7em 2em',
          borderRadius: '4px',
          textDecoration: 'none',
          fontWeight: 'bold',
        }}
      >
        トップページに戻る
      </Link>
    </div>
  )
}
