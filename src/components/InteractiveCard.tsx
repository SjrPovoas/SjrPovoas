// src/components/InteractiveCard.tsx

'use client'; 

import Link from 'next/link';
import React, { useState } from 'react';

// Define os tipos das props
interface InteractiveCardProps {
    href: string;
    title: string;
    description: string;
    image: string;
    baseStyle: React.CSSProperties; 
}

export default function InteractiveCard({ href, title, description, image, baseStyle }: InteractiveCardProps) {
    
    const [isHovered, setIsHovered] = useState(false);

    const dynamicStyle: React.CSSProperties = {
        transform: isHovered ? 'scale(1.08)' : 'scale(1)', // Aumentei um pouco o scale no hover
        zIndex: isHovered ? 10 : 1,
        boxShadow: isHovered ? '0 10px 20px rgba(0, 0, 0, 0.8)' : '0 4px 8px rgba(0, 0, 0, 0.5)',
    };

    return (
        <Link 
            href={href} 
            style={{ 
                ...baseStyle, 
                ...dynamicStyle, 
                backgroundImage: image,
                textDecoration: 'none',
            }}
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Overlay Escuro para Legibilidade */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.4)', 
            }}></div>
            
            {/* Conteúdo do Card */}
            <div style={{ position: 'relative', zIndex: 2 }}>
                {/* 💡 AJUSTE DE FONTE para melhor visualização em cards menores */}
                <h3 style={{ margin: 0, fontSize: '1.2em', marginBottom: '5px' }}>{title}</h3> 
                <p style={{ margin: 0, fontSize: '0.8em', color: '#bbb' }}>{description}</p>
            </div>
        </Link>
    );
}