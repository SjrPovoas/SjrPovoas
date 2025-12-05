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
      router.replace('/login');
    } else {
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); 
    router.replace('/login'); 
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
    // 🔑 CONTAINER EXTERNO: Ocupa 100% da largura, sem largura fixa
    <div style={{ backgroundColor: '#000', color: 'white', minHeight: '100vh', padding: '1px' }}> 
      
      {/* 🔑 CONTAINER PRINCIPAL: Centralizado e Responsivo */}
      <div style={{ 
          backgroundColor: 'white', 
          color: '#000', 
          maxWidth: '800px', // Limite máximo de largura (responsivo)
          width: '90%', // Ocupa 90% da largura do pai em telas menores
          margin: '50px auto', // Centraliza horizontalmente e dá margem superior/inferior
          padding: '20px', 
          border: '2px solid #0070f3', 
          borderRadius: '12px' 
      }}>

        <Link href="/dashboard" target='_blank'>
          <img 
            src="/assets/img/logomarca-SjrPovoaS.png" 
            alt="Logo SjrPovoaS"  
            style={{ 
              width: '196px', 
              height: '196px', 
              objectFit: 'cover', 
              marginTop: '20px', 
              display: 'block', // Garante que a imagem se comporta como um bloco centralizado
              margin: '0 auto 20px auto' // Centraliza a imagem
            }}
            onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                target.onerror = null; 
                target.src = 'https://placehold.co/196x196/000000/ffffff?text=SjrPovoaS';
            }}
          />
        </Link>

        <div>
          <h1>🛠️ Bem-vindo(a) à área restrita! </h1>
          <h2>Somente usuários logados podem ver este conteúdo.</h2>
        </div> <br />

        <div>
          <p>Para gerar contrato, recibo ou orçamento, clique no link abaixo:</p>
          <p>
            <Link href="https://www.almeidagomespaisagismo.com.br/gerador-de-contrato-servico-orcamento.html" target='_blank'>
              Gerador Online de Contratos, Recibos e Orçamentos
            </Link>
          </p>
        </div> <br />

        <div>
          <p>Para imprimir Cartão de Visita, clique no link abaixo:</p>
          <p style={{ marginTop: '20px', textDecoration: 'none' }}>
            <Link href="https://www.almeidagomespaisagismo.com.br/assets/doc/Cartao_de_Visita_Interativo_Almeida_Gomes_Pasagismo.pdf" target='_blank'>
              Cartão de Visita da Almeida Gomes Paisagismo
            </Link>
          </p>
        </div> <br />

        {/* 🔑 Botão de Logout com a cor cinza */}
        <button 
          onClick={handleLogout}
          style={{ 
            marginTop: '30px', 
            padding: '10px 20px', 
            backgroundColor: 'gray', // Cor alterada para cinza
            color: 'white', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer' 
          }}
        >
          Sair (Logout)
        </button>
      </div>
    </div>
  );
};