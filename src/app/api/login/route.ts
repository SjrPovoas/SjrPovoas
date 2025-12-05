// src/app/api/login/route.ts

import { NextResponse } from 'next/server';

// 🚨 Lendo as variáveis de ambiente do arquivo .env.local
// Elas SÓ SÃO LIDAS no servidor, garantindo a segurança.
const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PASS = process.env.ADMIN_PASS;

// Função que lida com requisições HTTP POST
export async function POST(request: Request) {
    
    // --- LÓGICA DE DEBUG (REMOVA ESTE BLOCO EM PRODUÇÃO) ---
    console.log('--- DEBUG DO SERVIDOR ---');
    console.log('Credenciais esperadas (ADMIN_USER):', ADMIN_USER);
    console.log('Credenciais esperadas (ADMIN_PASS):', ADMIN_PASS);
    // --------------------------------------------------------

    try {
        // Extrai o usuário e a senha enviados pelo formulário (front-end)
        const { usuario, senha } = await request.json();

        // 1. Verificação de Credenciais
        
        // --- LÓGICA DE DEBUG (REMOVA ESTE BLOCO EM PRODUÇÃO) ---
        console.log('Credenciais recebidas (usuário):', usuario);
        console.log('Credenciais recebidas (senha):', senha);
        // --------------------------------------------------------

        // Se as credenciais enviadas forem idênticas às variáveis de ambiente
        if (usuario === ADMIN_USER && senha === ADMIN_PASS) {
            
            // Retorna uma resposta 200 (OK) para o front-end
            return NextResponse.json(
                { message: 'Login bem-sucedido!' },
                { status: 200 } 
            );
        } else {
            
            // Retorna uma resposta 401 (Não Autorizado) para o front-end
            return NextResponse.json(
                { message: 'Credenciais inválidas. Verifique o usuário e a senha.' },
                { status: 401 } 
            );
        }
    } catch (error) {
        
        // Lida com erros de JSON malformado ou outros problemas internos
        console.error('Erro no Route Handler de Login:', error);
        return NextResponse.json(
            { message: 'Erro interno do servidor ao processar o login.' },
            { status: 500 }
        );
    }
}