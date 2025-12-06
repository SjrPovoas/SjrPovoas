import Link from 'next/link';
import React from 'react';
import InteractiveCard from '@/components/InteractiveCard';
import Carousel from '@/components/Carousel';
import "./globals.css";

// IMPORTANTE: Assumimos que o Bootstrap Icons CSS está carregado globalmente no seu projeto.

// =======================================================================
// ESTILOS E DADOS
// =======================================================================

const cardStyle: React.CSSProperties = {
  // Ajuste de width e minWidth para que o carrossel funcione bem
  flexShrink: 0,
  width: '240px',
  height: '350px',
  minWidth: '240px',
  backgroundColor: '#444',
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
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

// Dados separados por seção para o carrossel
const trainingAreas = [
  { title: 'Treinamento Rápido', description: 'Uso de Tecnologia para Celulares.', href: '/login', image: 'url("/assets/img/card-treinamento1.png")' },
  { title: 'Treinamento Rápido', description: 'Uso de Tecnologia para Celulares.', href: '/login', image: 'url("/assets/img/card-treinamento2.png")' },
  { title: 'Treinamento Rápido', description: 'Uso de Tecnologia para Celulares.', href: '/login', image: 'url("/assets/img/card-treinamento3.png")' },
  { title: 'Treinamento Rápido', description: 'Uso de Tecnologia para Celulares.', href: '/login', image: 'url("/assets/img/card-treinamento4.png")' },
  { title: 'Treinamento Rápido', description: 'Uso de Tecnologia para Celulares.', href: '/login', image: 'url("/assets/img/card-treinamento5.png")' },
];

const vipContentAreas = [
  { title: 'Conteúdo VIP', description: 'Conteúdo exclusivo.', href: '/login', image: 'url("/assets/img/card-suporteVIP1.png")' },
  { title: 'Conteúdo VIP', description: 'Conteúdo exclusivo.', href: '/login', image: 'url("/assets/img/card-suporteVIP2.png")' },
  { title: 'Conteúdo VIP', description: 'Conteúdo exclusivo.', href: '/login', image: 'url("/assets/img/card-suporteVIP3.png")' },
  { title: 'Conteúdo VIP', description: 'Conteúdo exclusivo.', href: '/login', image: 'url("/assets/img/card-suporteVIP4.png")' },
  { title: 'Conteúdo VIP', description: 'Conteúdo exclusivo.', href: '/login', image: 'url("/assets/img/card-suporteVIP5.png")' },
];

// URLs para mídias sociais
const socialMediaLinks = {
  instagram: 'https://www.instagram.com/silviopovoasjunior/',
  facebook: 'https://www.facebook.com/sjrpovoas',
  twitter: 'https://www.twitter.com/sjrpovaoas',
  linkedin: 'https://www.linkedin.com/in/sjrpovoas',
  discord: 'https://discord.com/invite/8QKN7R5dt5',
  linktree: 'https://linktr.ee/sjrpovoas',
};

// =======================================================================
// NOVO COMPONENTE SOCIALICON USANDO CLASSES DO BOOTSTRAP ICONS
// =======================================================================
interface SocialIconProps {
  href: string;
  label: string;
  iconClass: string; // Nova prop para a classe do ícone Bootstrap
}

const SocialIcon: React.FC<SocialIconProps> = ({ href, label, iconClass }) => (
  <Link
    href={href}
    target="_blank"
    style={{
      color: '#aaa', // Cor dos ícones
      fontSize: '1.5em',
      textDecoration: 'none',
      transition: 'color 0.3s' // Efeito de transição
    }}
    title={label}
  // Adicionamos um estilo de hover que só funciona em CSS/bibliotecas, mas incluímos a classe
  >
    <i className={`bi ${iconClass}`}></i>
  </Link>
);


// =======================================================================
// COMPONENTE PRINCIPAL
// =======================================================================

export default function Home() {
  return (
    <main style={{ backgroundColor: '#000', minHeight: '100vh', padding: '30px 20px' }}>

      {/* HEADER: LOGOMARCA E BOTÃO DE LOGIN */}
      <header style={{
        maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', paddingBottom: '20px', borderBottom: '1px solid #333'
      }}>
        <Link href="/">
          <img src="/assets/img/marca-SjrPovoaS.png" alt="Marca SjrPovoaS"
            style={{ height: '60px', objectFit: 'contain' }} />
        </Link>

        {/* 🚀 CALL TO ACTION (CTA) */}
        <div style={{
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#333',
          borderRadius: '8px',
          // ALTERADO: Removemos display: flex e adicionamos textAlign: right
          textAlign: 'right',
        }}>
          {/* Botão Área Exclusiva */}
          <Link href="/login"
            style={{
              display: 'inline-block',
              padding: '10px 25px',
              backgroundColor: '#0070f3',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px',
              fontWeight: 'bold',
              // REMOVIDO: marginRight: '15px' não é mais necessário
            }}
          >
            Área Exclusiva!
          </Link>

          {/* Texto Libere seu login agora! */}
          <p style={{ margin: 0, fontSize: '1.1em', fontWeight: '500', marginTop: '5px' }}>
            <small style={{ fontWeight: '400', color: '#aaa' }}>Libere seu login agora!</small>
          </p>
        </div>
      </header>


      {/* TÍTULO, INTRODUÇÃO E CTA - Seção Principal */}
      <div style={{ maxWidth: '1200px', margin: '60px auto 30px', color: 'white', textAlign: 'left' }}>
        <h1 style={{ fontSize: '2.5em', marginBottom: '10px' }}>Criamos a solução que você procura</h1>

        {/* CTA Block Principal */}
        <div style={{
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#333',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ fontSize: '1.2em', fontWeight: '400', color: '#aaa', margin: 0 }}>
            Acesso a conteúdos explicativos, interessantes e divertidos para usuários exclusivos.
          </h2>
        </div>
      </div>


      {/* ÁREA DOS CARROSSEIS */}
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* CARROSSEL 1: TREINAMENTO RÁPIDO */}
        <Carousel title="🎓 Treinamento Rápido">
          {trainingAreas.map((area, index) => (
            <InteractiveCard
              key={index}
              href={area.href}
              title={area.title}
              description={area.description}
              image={area.image}
              baseStyle={cardStyle}
            />
          ))}
        </Carousel>

        {/* CARROSSEL 2: CONTEÚDO VIP */}
        <Carousel title="🌟 Conteúdo VIP">
          {vipContentAreas.map((area, index) => (
            <InteractiveCard
              key={index}
              href={area.href}
              title={area.title}
              description={area.description}
              image={area.image}
              baseStyle={cardStyle}
            />
          ))}
        </Carousel>

      </div>
      {/* Fim da Área dos Carrosseis */}

      {/* --- RODAPÉ COM MÍDIAS SOCIAIS --- */}
      <footer
        style={{
          maxWidth: '1200px', margin: '80px auto 0', paddingTop: '30px', borderTop: '1px solid #333',
          color: '#888', fontSize: '0.9em', textAlign: 'center'
        }}
      >
        <div style={{ marginBottom: '20px' }}>
          <p style={{ margin: '0 0 10px 0', fontSize: '1em', color: 'white' }}>Siga-nos nas Redes Sociais:</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>

            {/* Ícones do Bootstrap Icons */}
            <SocialIcon href={socialMediaLinks.instagram} label="Instagram" iconClass="bi-instagram" />
            <SocialIcon href={socialMediaLinks.facebook} label="Facebook" iconClass="bi-facebook" />
            <SocialIcon href={socialMediaLinks.twitter} label="Twitter / X" iconClass="bi-twitter-x" /> {/* Ícone atualizado para 'X' */}
            <SocialIcon href={socialMediaLinks.linkedin} label="Linkedin" iconClass="bi-linkedin" />
            <SocialIcon href={socialMediaLinks.discord} label="Discord" iconClass="bi-discord" />
            <SocialIcon href={socialMediaLinks.linktree} label="Linktree" iconClass="bi-tree-fill" />

          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '15px' }}>
          <Link href="mailto:sjrpovoas@gmail.com" target="_blank" style={{ color: '#888', textDecoration: 'none' }}>
            Contato
          </Link>
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
      {/* --- FIM DO RODAPÉ --- */}

    </main>
  );
}