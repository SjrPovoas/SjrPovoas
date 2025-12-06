'use client';

import React, { useState, CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie'; 
import { AuthView } from './AuthContainer'; 

// ⚠️ Definição dos estilos no escopo global para evitar erros de referência (Cannot find name '...')
interface LoginFormProps {
    setView: (view: AuthView) => void;
}

const inputStyle: CSSProperties = {
    width: '100%',
    padding: '10px',
    boxSizing: 'border-box',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginTop: '5px',
    marginBottom: '15px',
};

const buttonStyle: CSSProperties = {
    padding: '12px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
    width: '100%',
    fontWeight: 'bold',
};
// ----------------------------------------------------

export default function LoginForm({ setView }: LoginFormProps) {
  const [email, setEmail] = useState('');
  // Usando passwordHash para consistência
  const [passwordHash, setPasswordHash] = useState(''); 
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('');
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Enviando passwordHash no payload
        body: JSON.stringify({ email, passwordHash }), 
      });

      const result = await response.json();

      if (response.ok) {
        // 🚨 CORREÇÃO CRÍTICA: path: '/'
        // Isso garante que o middleware possa ler o cookie em TODAS as rotas
        Cookies.set('userToken', result.token, { 
            expires: 7, 
            path: '/', 
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax'
        });
        
        setStatus('✅ Login bem-sucedido! Redirecionando...');
        
        // Redirecionamento condicional baseado no token para compatibilidade com o middleware
        if (result.token.startsWith('ADMIN_JWT')) {
             router.push('/admin/dashboard');
        } else {
             router.push('/dashboard'); 
        }
        
      } else if (response.status === 403) {
        setStatus(`⚠️ Falha de acesso: ${result.message}`);
        
        if (result.paymentStatus === 'AWAITING_PAYMENT') {
            setView('cadastro'); 
        }

      } else {
        setStatus(`❌ Falha no Login: ${result.message || 'Email ou senha incorretos.'}`);
      }
    } catch (error) {
      console.error('Erro de rede/login:', error);
      setStatus('❌ Erro de conexão com o servidor.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <h3 style={{ textAlign: 'center', color: '#007bff', marginBottom: '20px' }}>Acessar Conta</h3>
        
        {/* Email */}
        <div>
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            disabled={isSubmitting} 
            style={inputStyle} 
          />
        </div>
        
        {/* Senha (Input) */}
        <div>
          <label htmlFor="passwordHash">Senha</label>
          <input 
            type="password" 
            id="passwordHash" 
            value={passwordHash} 
            onChange={(e) => setPasswordHash(e.target.value)} 
            required 
            disabled={isSubmitting} 
            style={inputStyle} 
          />
        </div>
        
        {/* Links de navegação */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9em', marginBottom: '15px' }}>
             <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setView('recuperacao'); }} 
                style={{ color: '#007bff', textDecoration: 'none' }}
            >
                Esqueci a Senha
            </a>
            <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setView('cadastro'); }} 
                style={{ color: '#007bff', textDecoration: 'none' }}
            >
                Ainda não sou cliente
            </a>
        </div>


        {/* Botão de Submissão */}
        <button 
          type="submit" 
          disabled={isSubmitting} 
          style={{ 
            ...buttonStyle, 
            backgroundColor: isSubmitting ? '#ccc' : buttonStyle.backgroundColor,
            cursor: isSubmitting ? 'not-allowed' : 'pointer'
          }} 
        >
          {isSubmitting ? 'Acessando...' : 'Fazer Login'}
        </button>
        
        {/* Status/Mensagens */}
        {status && (
          <p style={{ marginTop: '15px', padding: '10px', borderRadius: '4px', textAlign: 'center', backgroundColor: status.startsWith('✅') ? '#d4edda' : '#f8d7da', color: status.startsWith('✅') ? '#155724' : '#721c24' }}>
            {status}
          </p>
        )}
    </form>
  );
}