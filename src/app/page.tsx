// src/app/page.tsx

import Link from 'next/link';
import React from 'react';
import InteractiveCard from '@/components/InteractiveCard'; 

const cardStyle: React.CSSProperties = {
  width: 'calc(20% - 5px)', 
  minWidth: '250px', 
  height: '250px', 
  backgroundColor: '#252525',
  borderRadius: '8px',
  overflow: 'hidden',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  position: 'relative',
  padding: '15px',
  textAlign: 'left',
  color: 'white',
};

const exclusiveAreas = [
  { title: 'Gerador de Contratos', description: 'Ferramentas de geração de documentos e orçamentos.', href: '/login', image: 'url("/assets/img/card-contratos.png")' },
  { title: 'Base de Conhecimento', description: 'Arquivos PDF e guias de referência rápida.', href: '/login', image: 'url("/assets/img/card-conhecimento.png")' },
  { title: 'Treinamento Rápido', description: 'Vídeos e tutoriais de uso das ferramentas.', href: '/login', image: 'url("/assets/img/card-treinamento1.png")' },
  { title: 'Treinamento Rápido', description: 'Vídeos e tutoriais de uso das ferramentas.', href: '/login', image: 'url("/assets/img/card-treinamento2.png")' },
  { title: 'Treinamento Rápido', description: 'Vídeos e tutoriais de uso das ferramentas.', href: '/login', image: 'url("/assets/img/card-treinamento3.png")' },
  { title: 'Suporte VIP', description: 'Contato direto com a equipe de suporte exclusivo.', href: '/login', image: 'url("/assets/img/card-suporteVIP1.png")' },
  { title: 'Suporte VIP', description: 'Contato direto com a equipe de suporte exclusivo.', href: '/login', image: 'url("/assets/img/card-suporteVIP2.png")' },
  { title: 'Suporte VIP', description: 'Contato direto com a equipe de suporte exclusivo.', href: '/login', image: 'url("/assets/img/card-suporteVIP3.png")' },
];

export default function Home() {
  return (
    <main style={{ backgroundColor: '#000', minHeight: '100vh', padding: '30px 20px' }}>
      
      {/* HEADER: LOGOMARCA E BOTÃO DE LOGIN */}
      <header style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          paddingBottom: '40px',
          borderBottom: '1px solid #333'
      }}>
          <Link href="/">
              <img src="/assets/img/marca-SjrPovoaS.png" alt="Marca SjrPovoaS" 
                  style={{ height: '60px', objectFit: 'contain' }} />
          </Link>
          
          <Link href="/login" 
            style={{ padding: '8px 16px', backgroundColor: 'white', color: '#888', 
              textDecoration: 'none', borderRadius: '4px', fontSize: '1em' }} >
            Entrar
          </Link>
      </header>

      {/* TÍTULO E INTRODUÇÃO */}
      <div style={{ maxWidth: '1200px', margin: '60px auto 30px', color: 'white', textAlign: 'left' }}>
        <h1 style={{ fontSize: '2.5em', marginBottom: '10px' }}>Áreas Exclusivas para Parceiros</h1>
        <h2 style={{ fontSize: '1.2em', fontWeight: '400', color: '#aaa' }}>
            Acesso a ferramentas e conteúdos exclusivos para usuários autorizados.
        </h2>
      </div>

      {/* ÁREA DOS CARDS */}
      <div 
        style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '20px', 
          justifyContent: 'flex-start',
          maxWidth: '1200px', 
          margin: '0 auto' 
        }}
      >
        
        {exclusiveAreas.map((area, index) => (
          <InteractiveCard 
            key={index}
            href={area.href}
            title={area.title}
            description={area.description}
            image={area.image}
            baseStyle={cardStyle} 
          />
        ))}

      </div>
      {/* Fim da Área dos Cards */}

      {/* --- INÍCIO DO NOVO RODAPÉ --- */}
      <footer 
        style={{ 
          maxWidth: '1200px', 
          margin: '80px auto 0', 
          paddingTop: '30px', 
          borderTop: '1px solid #333', 
          color: '#888', 
          fontSize: '0.9em',
          textAlign: 'center' 
        }}
      >
        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '30px', 
            marginBottom: '15px' 
          }}
        >
          <Link href="mailto:sjrpovoas@gmail.com" target="_blank" style={{ color: '#888', textDecoration: 'none' }}>
            Contato
          </Link>
          {/* Links fictícios. Substitua os '#' pelos caminhos reais. */}
          <Link href="#" style={{ color: '#888', textDecoration: 'none' }}>
            Termos de Uso
          </Link>
          <Link href="#" style={{ color: '#888', textDecoration: 'none' }}>
            Política de Privacidade
          </Link>
        </div>

        <p style={{ margin: '10px 0 0' }}>
          &copy; {new Date().getFullYear()} SjrPovoaS. Todos os direitos reservados.
        </p>
        <p style={{ margin: '5px 0 0', fontSize: '0.8em', color: '#666' }}>
          Plataforma de acesso exclusivo.
        </p>

      </footer>
      {/* --- FIM DO NOVO RODAPÉ --- */}

    </main>
  );
}