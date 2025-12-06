'use client';

import React, { Dispatch, SetStateAction, useState, CSSProperties } from 'react';
import LoginForm from './LoginForm'; 
import RegisterForm from './RegisterForm'; 
// Assumindo que você tem um RecoveryForm, ou substitua por um placeholder
import RecoveryForm from './RecoveryForm'; 

// 1. Defina os tipos de visualização
export type AuthView = 'login' | 'cadastro' | 'recuperacao'; // Exportamos o tipo para uso externo

// 2. Crie a interface de Props para o AuthContainer, usando o tipo Dispatch do React
interface AuthContainerProps {
  // A prop 'setView' é o setter do estado que o componente pai pode querer usar
  setView: Dispatch<SetStateAction<AuthView>>; 
}

// Estilos
const containerStyle: CSSProperties = {
  maxWidth: '550px',
  margin: '50px auto',
  padding: '40px',
  backgroundColor: '#fff',
  borderRadius: '12px',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
};

const headerStyle: CSSProperties = {
    textAlign: 'center',
    marginBottom: '20px',
    borderBottom: '2px solid #ddd',
    paddingBottom: '15px',
};


export default function AuthContainer({ setView }: AuthContainerProps) {
  // O AuthContainer gerencia o estado da visualização que será exibida
  const [currentView, setCurrentView] = useState<AuthView>('login');
  
  // Função que muda a visualização localmente e notifica o componente pai
  const handleViewChange = (view: AuthView) => {
    setCurrentView(view);
    // Notifica o componente pai (LoginPage)
    setView(view); 
  };


  let ContentComponent;
  switch (currentView) {
    case 'cadastro':
      ContentComponent = RegisterForm;
      break;
    case 'login':
      ContentComponent = LoginForm;
      break;
    case 'recuperacao':
      ContentComponent = RecoveryForm; // Ou um componente de placeholder
      break;
  }
  
  // Asseguramos que o ContentComponent receba a função setView
  const Content = ContentComponent as React.ComponentType<{ setView: (view: AuthView) => void }>;

  return (
    <div style={containerStyle}>
        <div style={headerStyle}>
            <button 
                onClick={() => handleViewChange('login')} 
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: currentView === 'login' ? 'bold' : 'normal', marginRight: '15px' }}
            >
                Login
            </button>
            <button 
                onClick={() => handleViewChange('cadastro')} 
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: currentView === 'cadastro' ? 'bold' : 'normal' }}
            >
                Criar Conta
            </button>
        </div>
        
        {/* Passamos o setter para que os formulários possam mudar a tela (ex: após cadastro) */}
        <Content setView={handleViewChange} />
        
    </div>
  );
}