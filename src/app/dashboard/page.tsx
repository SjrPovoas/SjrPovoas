// src/app/dashboard/page.tsx

'use client'; 

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Verificação de autenticação no lado do cliente
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (!isLoggedIn) {
      // Se não estiver logado, redireciona para a página de login
      router.replace('/login');
    } else {
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Remove o estado de login
    router.replace('/login'); // Redireciona para o login
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        Carregando... Verificando credenciais.
      </div>
    );
  }

  // Conteúdo da página restrita (o simulado Gerador de Contrato)
  return (
    <div style={{ maxWidth: '800px', margin: '50px auto', padding: '20px', border: '1px solid #0070f3', borderRadius: '8px' }}>

        <Link href="/"><img src="/assets/img/logomarca-SjrPovoaS.png" alt="Logo SjrPovoaS" 
              style={{ width: '196px', height: '196px', objectFit: 'cover', marginTop: '20px', display: 'flex', alignItems: 'center' }}
              // Tipagem do evento de erro (melhor prática em TSX)
              onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  target.onerror = null; 
                  target.src = 'https://placehold.co/196x196/000000/ffffff?text=AG'; // Fallback visual
              }}
        /></Link>

    <div>
      <h1>🛠️ Bem-vindo(a) à área restrita! </h1>
      <h2>Somente usuários logados podem ver este conteúdo.</h2>
    </div> <br />

    <div>
      <p>Para gerar contrato, recibo ou orçamento, cliqui no link abaixo:</p>
      <p><Link href="https://www.almeidagomespaisagismo.com.br/gerador-de-contrato-servico-orcamento.html" target='_blank'>
    Gerador Online de Contratos, Recibos e Orçamentos</Link></p>
    </div> <br />

    <div>
      <p>Para imprimir Cartão de Visita, cliqui no link abaixo:</p>
      <p style={{ marginTop: '20px', textDecoration: 'none' }}><Link href="https://www.almeidagomespaisagismo.com.br/assets/doc/Cartao_de_Visita_Interativo_Almeida_Gomes_Pasagismo.pdf" target='_blank'>
    Cartão de Visita da Almeida Gomes Paisagismo</Link></p>
    </div> <br />

      <button 
        onClick={handleLogout}
        style={{ marginTop: '30px', padding: '10px 20px', backgroundColor: '#ff4d4f', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        Sair (Logout)
      </button>
    </div>
    );
};