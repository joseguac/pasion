import Link from 'next/link'

export default function Home() {
  return (
    <main style={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #1a0000, #000000)',
      padding: '20px'
    }}>
      <h1 style={{ 
        fontSize: '4rem', 
        fontWeight: 'bold',
        marginBottom: '1rem',
        background: 'linear-gradient(to right, #ff0000, #ff6666)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        PASIÓN
      </h1>
      <p style={{ 
        fontSize: '1.5rem', 
        marginBottom: '3rem',
        color: '#999'
      }}>
        Enter the nightclub experience
      </p>
      <Link 
        href="/club"
        style={{
          padding: '15px 40px',
          fontSize: '1.2rem',
          background: '#ff0000',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          fontWeight: 'bold'
        }}
      >
        Enter Club
      </Link>
    </main>
  )
}

