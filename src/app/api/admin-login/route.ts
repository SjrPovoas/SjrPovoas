import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

// --- CONFIGURAÇÃO DE SEGURANÇA ---
// ⚠️ Prioriza a leitura do .env.local; usa valores fixos como fallback.
const ADMIN_EMAIL_EXPECTED = process.env.ADMIN_EMAIL || 'sjrpovoas@gmail.com'; 
const ADMIN_HASH_EXPECTED = process.env.ADMIN_HASH || '$2a$12$1yAMdHhHVAf.9SWOkDOTMeisnRlNc0hkkXtBcmpiA6AWUU3BPj7OG'; 

export async function POST(request: Request) {
    let email = '';
    let passwordHash = ''; // Usaremos 'passwordHash' como nome padrão para a senha
    
    try {
        // Leitura ÚNICA do corpo da requisição
        const body = await request.json(); 

        // ⚠️ ATENÇÃO: Corrigimos a desestruturação para aceitar 'senha' ou 'passwordHash'
        // Isso impede o erro 400 se o frontend estiver enviando { email, senha: '...' }
        email = body.email;
        passwordHash = body.passwordHash || body.senha; // Tenta 'passwordHash' e, se não encontrar, tenta 'senha'

    } catch (error) {
        // Captura erro se o corpo da requisição não for JSON válido
        console.error('Erro ao ler o corpo da requisição (JSON inválido):', error);
        return NextResponse.json(
            { message: 'Formato de requisição inválido.' }, 
            { status: 400 }
        );
    }
    
    // 🚨 LOGS DE DEBUG 🚨
    console.log("--- TENTATIVA DE LOGIN ADMIN ---");
    console.log("Email Recebido:", email);
    console.log("Hash Esperado (ADMIN_HASH do .env):", ADMIN_HASH_EXPECTED.substring(0, 10) + '...');
    console.log("--------------------------------");
    
    try {
        // 1. Validação Básica
        if (!email || !passwordHash) {
            return NextResponse.json(
                { message: 'Email e senha são obrigatórios.' },
                { status: 400 }
            );
        }

        // 2. Localizar o administrador (Verifica o email)
        if (email !== ADMIN_EMAIL_EXPECTED) {
            return NextResponse.json(
                { message: 'Credenciais inválidas.' },
                { status: 401 }
            );
        }

        // 3. Verificação Segura da Senha (comparação com o hash salvo)
        const isPasswordValid = await bcrypt.compare(passwordHash, ADMIN_HASH_EXPECTED);

        if (!isPasswordValid) {
            return NextResponse.json(
                { message: 'Credenciais inválidas.' },
                { status: 401 }
            );
        }

        // 4. Login BEM-SUCEDIDO: Geração do Token Mockado
        const adminToken = `ADMIN_JWT_${Date.now()}_admin`; 
        
        console.log(`✅ Login Admin bem-sucedido. Token gerado: ${adminToken.substring(0, 20)}...`);

        return NextResponse.json(
            { 
                message: 'Login de administrador bem-sucedido!',
                token: adminToken, // ⬅️ Essencial para o Middleware
                role: 'admin',
                isAdmin: true 
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('❌ Erro no processamento do login admin:', error);
        return NextResponse.json(
            { message: 'Erro interno do servidor.' },
            { status: 500 }
        );
    }
}