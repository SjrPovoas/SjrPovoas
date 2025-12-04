// src/components/LoginForm.tsx

'use client'; // Indica que este é um Componente Cliente (para usar Hooks)

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
  const router = useRouter(); // Hook para navegação programática

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // --- LÓGICA DE AUTENTICAÇÃO SIMPLIFICADA ---
    // Simula credenciais válidas. Na vida real, você faria uma chamada API.
    if (data.usuario === 'admin' && data.senha === '123456') {
      setErro('');
      // Armazena um token/flag de login (na vida real, use um token JWT)
      localStorage.setItem('isLoggedIn', 'true'); 
      
      // Redireciona para a página restrita (o "Gerador de Contrato")
      router.push('/dashboard'); 
    } else {
      setErro('Credenciais inválidas. Tente novamente.');
      localStorage.removeItem('isLoggedIn');
    }
  };

  return (
    
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
    <div>
    <Link href="https://almeidagomespaisagismo.com.br" target='_blank'><img src="/assets/img/logo-escura.webp" alt="Logo Almeida Gomes Paisagismo Escura" 
              style={{ width: '56px', height: '56px', objectFit: 'cover', marginTop: '20px', display: 'flex', alignItems: 'center' }}
              // Tipagem do evento de erro (melhor prática em TSX)
              onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  target.onerror = null; 
                  target.src = 'https://placehold.co/56x56/000000/ffffff?text=AG'; // Fallback visual
              }}
        /></Link> 
    </div>
    
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
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
          />
        </div>

         <div><p style={{ marginTop: '20px', textAlign: 'right' }}>
            <Link href="mailto:=sjrpovoas@gmail.com" target='_blank'><small>Esqueceu sua senha?</small></Link></p> 
         </div>

        <button 
          type="submit"
          style={{ width: '100%', padding: '10px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Entrar
        </button>
      </form>
    
    </div>
  );
}