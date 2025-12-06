'use client';

import React, { useState, CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import PaymentStep from '@/components/auth/PaymentStep'; 

// ⚠️ ESTILOS DEFINIDOS NO NÍVEL SUPERIOR PARA GARANTIR O ESCOPO
const containerStyle: CSSProperties = {
  maxWidth: '500px',
  margin: '50px auto',
  padding: '30px',
  backgroundColor: '#ffffff',
  borderRadius: '10px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
};

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
    backgroundColor: '#28a745', 
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
    width: '100%',
    fontWeight: 'bold',
};
// ----------------------------------------------------


export default function RegisterForm() {
  const [data, setData] = useState({
    nomeCompleto: '',
    email: '',
    passwordHash: '', 
    dataNascimento: '',
    cpf: '',
    telefone: '',
  });
  const [status, setStatus] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccessId, setRegistrationSuccessId] = useState<number | null>(null);
  
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('');
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus(`✅ Cadastro realizado com sucesso! Prossiga para o pagamento.`);
        setRegistrationSuccessId(result.userId); 
      } else {
        setStatus(`❌ Erro no cadastro: ${result.message || 'Ocorreu um erro desconhecido.'}`);
      }
    } catch (error) {
      console.error('Erro de rede/registro:', error);
      setStatus('❌ Erro de conexão com o servidor. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (registrationSuccessId !== null) {
    return <PaymentStep userId={registrationSuccessId} />;
  }

  return (
    <div style={containerStyle}>
      <h2 style={{ color: '#28a745', textAlign: 'center', marginBottom: '25px' }}>🚀 Criar Conta</h2>
      
      <form onSubmit={handleSubmit}>
        
        {/* Nome Completo */}
        <div>
          <label htmlFor="nomeCompleto">Nome Completo</label>
          <input 
            type="text" 
            id="nomeCompleto" 
            name="nomeCompleto" 
            value={data.nomeCompleto} 
            onChange={handleChange} 
            required 
            disabled={isSubmitting} 
            style={inputStyle} 
          />
        </div>
        
        {/* Email */}
        <div>
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={data.email} 
            onChange={handleChange} 
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
            name="passwordHash" 
            value={data.passwordHash} 
            onChange={handleChange} 
            required 
            disabled={isSubmitting} 
            style={inputStyle} 
          />
        </div>

        {/* CPF */}
        <div>
          <label htmlFor="cpf">CPF</label>
          <input 
            type="text" 
            id="cpf" 
            name="cpf" 
            value={data.cpf} 
            onChange={handleChange} 
            required 
            disabled={isSubmitting} 
            style={inputStyle} 
          />
        </div>
        
        {/* Data de Nascimento */}
        <div>
          <label htmlFor="dataNascimento">Data de Nascimento</label>
          <input 
            type="date" 
            id="dataNascimento" 
            name="dataNascimento" 
            value={data.dataNascimento} 
            onChange={handleChange} 
            required 
            disabled={isSubmitting} 
            style={inputStyle} 
          />
        </div>
        
        {/* Telefone */}
        <div>
          <label htmlFor="telefone">Telefone</label>
          <input 
            type="tel" 
            id="telefone" 
            name="telefone" 
            value={data.telefone} 
            onChange={handleChange} 
            disabled={isSubmitting} 
            style={inputStyle} 
          />
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
          {isSubmitting ? 'Cadastrando...' : 'Cadastrar e Pagar'}
        </button>
      </form>
      
      {/* Status/Mensagens */}
      {status && (
        <p style={{ marginTop: '15px', padding: '10px', borderRadius: '4px', textAlign: 'center', backgroundColor: status.startsWith('✅') ? '#d4edda' : '#f8d7da', color: status.startsWith('✅') ? '#155724' : '#721c24' }}>
          {status}
        </p>
      )}
      
    </div>
  );
}