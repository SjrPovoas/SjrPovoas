// src/components/Carousel.tsx

'use client';

import React from 'react';

interface CarouselProps {
  title: string;
  children: React.ReactNode;
}

export default function Carousel({ title, children }: CarouselProps) {
  
  // Estilo do container que permite a rolagem horizontal
  const scrollContainerStyle: React.CSSProperties = {
    display: 'flex',
    overflowX: 'auto', // Habilita a rolagem horizontal
    gap: '20px',
    paddingBottom: '20px', // Espaço para a barra de rolagem
    // Opcional: Estilo para esconder a barra de rolagem (WebKit/Chrome/Safari)
    WebkitOverflowScrolling: 'touch', 
  };
  
  // Estilo para o título da seção
  const titleStyle: React.CSSProperties = {
    color: 'white',
    fontSize: '1.8em',
    fontWeight: '700',
    marginBottom: '15px',
    marginTop: '40px',
  };

  return (
    <section>
      <h2 style={titleStyle}>{title}</h2>
      <div style={scrollContainerStyle}>
        {children}
      </div>
    </section>
  );
}