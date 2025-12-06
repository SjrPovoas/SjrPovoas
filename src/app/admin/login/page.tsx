'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
// Ícones para o visual profissional
import { Mail, Lock, LogIn, Loader, AlertTriangle, Shield, User } from 'lucide-react'; 

/**
 * ⚠️ Lembre-se de instalar 'js-cookie' e 'lucide-react'
 * npm install js-cookie lucide-react
 */

// Define as rotas válidas para o redirecionamento
type AdminRoute = 'pagamentos' | 'assinantes';

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [passwordHash, setPasswordHash] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        if (!email || !passwordHash) {
            setError('Por favor, preencha o email e a senha.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/admin-login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, passwordHash }),
            });

            const result = await response.json();

            if (response.ok) {
                if (result.token) {
                    Cookies.set('userToken', result.token, { 
                        expires: 7, 
                        path: '/', 
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'Lax'
                    });
                    
                    // 🔑 LÓGICA DE REDIRECIONAMENTO CONDICIONAL
                    const defaultRoute: AdminRoute = result.defaultRoute === 'assinantes' ? 'assinantes' : 'pagamentos';

                    console.log(`Login bem-sucedido. Redirecionando para: /admin/${defaultRoute}`);
                    router.push(`/admin/${defaultRoute}`);
                    
                } else {
                    setError('Erro: Token não foi recebido na resposta do servidor.');
                }
            } else {
                setError(result.message || 'Credenciais inválidas. Tente novamente.');
            }
        } catch (err) {
            console.error('Erro de conexão durante o login:', err);
            setError('Não foi possível conectar ao servidor.');
        } finally {
            setIsLoading(false);
        }
    };

return (
        // 🔑 Contêiner principal garantindo altura total e flexibilidade
        <div className="flex min-h-screen bg-white">
            
            {/* 1. Lado Esquerdo (Fundo do Administrador) - CORRIGIDO AS CORES DO TEXTO */}
            <div className="hidden lg:flex lg:w-1/2 bg-indigo-600 justify-center items-center relative">
                <div className="text-center p-10 text-black z-10"> {/* 🔑 text-white para contraste */}
                    <Shield className="w-16 h-16 mx-auto mb-4" />
                    <h1 className="text-4xl text-black font-extrabold mb-2">Painel de Administração</h1> {/* 🔑 text-white para contraste */}
                    <p className="text-indigo-200 mt-4"> {/* 🔑 text-indigo-200 (cor clara) para contraste */}
                        Gerencie a **Confirmação de Pagamentos** e o **Cadastro de Assinantes** do sistema.
                    </p>
                </div>
                <div className="absolute inset-0 bg-black opacity-10"></div> {/* Aumentei a opacidade para 10% para um efeito mais perceptível */}
            </div>

            {/* 2. Lado Direito (Formulário) - CENTRALIZADO */}
            <div className="flex w-full lg:w-1/2 justify-center items-center p-8 lg:p-12 bg-gray-50">
                {/* O max-w-md p-8 já centraliza o conteúdo dentro da metade da tela */}
                <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-2xl border border-gray-100">
                    
                    {/* Cabeçalho */}
                    <div className="text-center">
                        <User className="w-10 h-10 mx-auto text-indigo-600 mb-3" />
                        <h2 className="text-2xl font-bold text-gray-900">
                            Login de Administrador
                        </h2>
                    </div>
                    <div className="text-center w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-2xl border border-gray-100">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        {/* Mensagem de Erro */}
                        {error && (
                            <div className="flex items-center p-3 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                                <AlertTriangle className="w-4 h-4 mr-2" />
                                {error}
                            </div>
                        )}

                        {/* Campo Email com Ícone */}
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="pl-10 w-full p-3 border border-gray-300 rounded-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                            />
                        </div>
                        
                        {/* Campo Senha com Ícone */}
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                placeholder="Senha"
                                value={passwordHash}
                                onChange={(e) => setPasswordHash(e.target.value)}
                                className="pl-10 w-full p-3 border border-gray-300 rounded-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                            />
                        </div>

                        {/* Botão de Submissão com Loader */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            // 🔑 Corrigido text-gray para text-white
                            className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-full text-sm font-semibold text-black transition duration-200 ${
                                isLoading 
                                    ? 'bg-indigo-400 cursor-not-allowed' 
                                    : 'bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg'
                            }`}
                        >
                            {isLoading ? (
                                <>
                                    <Loader className="w-5 h-5 mr-2 animate-spin" />
                                    Entrando...
                                </>
                            ) : (
                                <>
                                    <LogIn className="w-5 h-5 mr-2" />
                                    Acessar Painel
                                </>
                            )}
                        </button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    );
}