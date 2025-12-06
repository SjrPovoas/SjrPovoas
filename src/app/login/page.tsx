'use client'; 

import React, { useState, CSSProperties } from 'react'; // Removido 'useCallback'
import AuthContainer, { AuthView } from '@/components/auth/AuthContainer'; 

// Estilos básicos
const mainStyle: CSSProperties = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f0f2f5', 
};

export default function LoginPage() {

  const [currentView, setCurrentView] = useState<AuthView>('login');

  return (
    <main style={mainStyle}>
      <AuthContainer setView={setCurrentView} /> 
    </main>
  );
}