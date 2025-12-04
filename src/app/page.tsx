// src/app/page.tsx

import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ textAlign: 'center', padding: '50px' }}>

<div style={{ maxWidth: '800px', margin: '50px auto', padding: '20px', border: '1px solid #0070f3', borderRadius: '8px' }}>

<Link href="/" target='_blank'><img src="/assets/img/logomarca-SjrPovoaS.png" alt="Logo SjrPovoaS"></img>
</Link>

    <div>
      <h1>🛠️ Bem-vindo(a) à área de acesso! </h1>
      <h2>Somente usuários autorizados(as) poderão ver os conteúdos.</h2>
    </div> <br />

      {/* --- Link de Acesso ao Login --- */}
      <div style={{ marginTop: '30px' }}>
        <Link href="/login" 
          style={{ padding: '10px 20px', backgroundColor: '#0070f3', color: 'white', 
            textDecoration: 'none', borderRadius: '5px', fontSize: '1.2em' }}
        > (Entrar)
        </Link>
      </div>
      {/* ---------------------------------- */}
</div>
    </main>
  );
}