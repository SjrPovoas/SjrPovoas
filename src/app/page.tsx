// src/app/page.tsx

import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Bem-vindo ao Next.js e TypeScript!</h1>
      <p>Este é o ponto de partida do seu projeto.</p>

      {/* --- Link de Acesso ao Login --- */}
      <div style={{ marginTop: '30px' }}>
        <Link 
          href="/login" 
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#0070f3', 
            color: 'white', 
            textDecoration: 'none', 
            borderRadius: '5px',
            fontSize: '1.2em'
          }}
        >
          Acessar Gerador de Contrato (Login)
        </Link>
      </div>
      {/* ---------------------------------- */}
      
      <p style={{ marginTop: '20px' }}>
        Tente acessar o caminho restrito: <Link href="/dashboard">/dashboard</Link>
      </p>
    </main>
  );
}