// src/app/api/login/route.ts

import { NextResponse } from 'next/server';

// 🚨 IMPORTANTE: Mover as credenciais para variáveis de ambiente
// Isso impede que elas sejam expostas no código, mesmo no servidor.
const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PASS = process.env.ADMIN_PASS;

// Função que lida com requisições POST
export async function POST(request: Request) {
    try {
        const { usuario, senha } = await request.json();

        // 1. Verificação de Credenciais
        if (usuario === ADMIN_USER && senha === ADMIN_PASS) {
            // Se as credenciais estiverem corretas (VERIFICADO NO SERVIDOR)
            return NextResponse.json(
                { message: 'Login bem-sucedido!' },
                { status: 200 } // Retorna 200 OK
            );
        } else {
            // Credenciais inválidas
            return NextResponse.json(
                { message: 'Credenciais inválidas.' },
                { status: 401 } // Retorna 401 Unauthorized (Não Autorizado)
            );
        }
    } catch (error) {
        // Erro genérico no servidor
        return NextResponse.json(
            { message: 'Erro interno do servidor.' },
            { status: 500 }
        );
    }
}