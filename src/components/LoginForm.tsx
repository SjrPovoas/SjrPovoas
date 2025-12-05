// src/components/LoginForm.tsx

'use client'; 

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Definimos o tipo dos dados de entrada do formulário
interface LoginData {
  usuario: string;
  senha: string;
}

export default function LoginForm() {
  const [data, setData] = useState<LoginData>({ usuario: '', senha: '' });
  const [erro, setErro] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter(); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErro('');
    setIsSubmitting(true); // Desativa o botão enquanto a requisição está em curso

    try {
      // 1. Enviar as credenciais para o endpoint de API do Next.js (/api/login)
      const response = await fetch('/api/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Envia usuário e senha
      });

      // 2. Processar a resposta do servidor
      if (response.ok) {
        // Login bem-sucedido (Resposta 200 do servidor)
        localStorage.setItem('isLoggedIn', 'true'); 
        router.push('/dashboard'); 
      } else {
        // Login falhou (Ex: Resposta 401 do servidor)
        const errorData = await response.json();
        setErro(errorData.message || 'Erro de autenticação. Verifique usuário e senha.');
        localStorage.removeItem('isLoggedIn');
      }
    } catch (err) {
      // Erro de rede ou servidor
      console.error('Erro ao tentar login:', err);
      setErro('Erro de conexão com o servidor. Tente novamente mais tarde.');
      localStorage.removeItem('isLoggedIn');
    } finally {
      setIsSubmitting(false); // Reativa o botão
    }
  };

  return (
    
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>

      {/* Bloco do Logo/Marca */}
      <Link href="/login"><img src="/assets/img/logo-SjrPovoaS.png" alt="Logo SjrPovoaS" 
          style={{ width: '196px', height: '196px', objectFit: 'cover', marginTop: '20px', display: 'block', margin: '0 auto' }}
        />
      </Link> 
      
      
      <div><h2>Acesso Restrito</h2></div>
      {erro && <p style={{ color: 'red', border: '1px solid red', padding: '10px', backgroundColor: '#fee' }}>{erro}</p>}
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="usuario" style={{ display: 'block', marginBottom: '5px' }}>Usuário:</label>
          <input
            type="text"
            id="usuario"
            name="usuario"
            value={data.usuario}
            onChange={handleChange}
            required
            disabled={isSubmitting} // Desabilita o input durante o envio
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="senha" style={{ display: 'block', marginBottom: '5px' }}>Senha:</label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={data.senha}
            onChange={handleChange}
            required
            disabled={isSubmitting} // Desabilita o input durante o envio
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
          />
        </div>

          <div><p style={{ marginTop: '20px', textAlign: 'right' }}>
            <Link href="mailto:sjrpovoas@gmail.com" target='_blank'><small>Esqueceu sua senha?</small></Link></p> 
          </div>

        <button 
          type="submit"
          disabled={isSubmitting} // Desabilita o botão durante o envio
          style={{ 
            width: '100%', 
            padding: '10px', 
            backgroundColor: isSubmitting ? '#a0c4ff' : 'gray', // Muda a cor quando desabilitado
            color: 'white', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: isSubmitting ? 'not-allowed' : 'pointer' 
          }}
        >
          {isSubmitting ? 'Verificando...' : 'Entrar'}
        </button>
      </form>
    
    </div>
  );
}