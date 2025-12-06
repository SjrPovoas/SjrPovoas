'use client'; 

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// Importando tipos e estilos do seu arquivo central
import { FormProps, LoginData, errorStyle } from './types'; 

export default function InnerLoginForm({ setView }: FormProps) {
    const [data, setData] = useState<LoginData>({ usuario: '', senha: '' });
    const [erro, setErro] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const router = useRouter(); 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErro('');
        setIsSubmitting(true); 

        try {
            // Chamada REAL à API de Login
            const response = await fetch('/api/login', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data), // Envia usuário e senha
            });

            if (response.ok) {
                // Autenticação BEM-SUCEDIDA
                const result = await response.json();
                
                // Em produção, você salvaria o token JWT aqui.
                localStorage.setItem('isLoggedIn', 'true'); 
                
                console.log('Login OK:', result.user);
                
                // Redireciona o usuário para a área exclusiva
                router.push('/dashboard'); 
            } else {
                // Falha na Autenticação (usuário/senha inválidos)
                const errorData = await response.json();
                setErro(errorData.message || 'Erro de autenticação. Verifique usuário e senha.');
                localStorage.removeItem('isLoggedIn');
            }
        } catch (err) {
            console.error('Erro ao tentar login:', err);
            setErro('Erro de conexão com o servidor. Tente novamente mais tarde.');
            localStorage.removeItem('isLoggedIn');
        } finally {
            setIsSubmitting(false); 
        }
    };

    return (
        <>
            <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Acesso à Área Exclusiva</h2>
            
            {erro && <p style={{ ...errorStyle, marginBottom: '20px' }}>{erro}</p>}
            
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="usuario" style={{ display: 'block', marginBottom: '5px' }}>Usuário ou E-mail:</label>
                    <input
                        type="text"
                        id="usuario"
                        name="usuario"
                        value={data.usuario}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #555', backgroundColor: '#222', color: 'white', borderRadius: '4px' }}
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
                        disabled={isSubmitting}
                        style={{ 
                            width: '100%', 
                            padding: '10px', 
                            boxSizing: 'border-box', 
                            border: '1px solid #555', 
                            backgroundColor: '#222', 
                            color: 'white', 
                            borderRadius: '4px' 
                        }}
                    />
                </div>
                
                <button 
                    type="submit" 
                    disabled={isSubmitting} 
                    style={{ 
                        width: '100%', 
                        padding: '10px', 
                        backgroundColor: isSubmitting ? '#444' : '#0070f3', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '5px', 
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        fontWeight: 'bold' 
                    }} 
                >
                    {isSubmitting ? 'Verificando...' : 'Entrar'}
                </button>
            </form>
            
            <p style={{ textAlign: 'center', marginTop: '20px' }}>
                <Link 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); setView('recuperacao'); }}
                    style={{ color: '#0070f3', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.9em' }}
                >
                    Esqueceu sua senha?
                </Link>
            </p> 

            <div style={{ borderTop: '1px solid #333', marginTop: '30px', paddingTop: '20px', textAlign: 'center' }}>
                <p style={{ margin: '0 0 10px 0', fontSize: '0.9em' }}>Ainda não é assinante?</p>
                <button
                    onClick={() => setView('cadastro')}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#28a745', 
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                    }}
                >
                    Assinar Agora
                </button>
            </div>
        </>
    );
}