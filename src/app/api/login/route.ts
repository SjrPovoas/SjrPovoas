import { NextResponse } from 'next/server';
import * as bcrypt from 'bcryptjs';

// ----------------------------------------------------------------------
// 1. DEFINIÇÃO DA INTERFACE (Tipagem Segura)
// ----------------------------------------------------------------------

// Define a estrutura esperada do corpo da requisição JSON.
interface AdminLoginBody {
    email: string;
    // Aceitamos 'passwordHash' ou 'senha' para maior robustez no frontend
    passwordHash?: string;
    senha?: string;
}

// ----------------------------------------------------------------------
// 2. CONFIGURAÇÃO DE SEGURANÇA (Leitura do .env.local)
// ----------------------------------------------------------------------

const ADMIN_EMAIL_EXPECTED = process.env.ADMIN_EMAIL;
const ADMIN_HASH_EXPECTED = process.env.ADMIN_HASH;

/**
 * 🔑 Manipula a requisição POST para o login exclusivo do administrador.
 * Garante a verificação segura da senha usando bcrypt.
 */
export async function POST(request: Request) {
    let email: string = '';
    let passwordInput: string = ''; 
    
    // ----------------------------------------------------------------------
    // 3. LEITURA E VALIDAÇÃO DO CORPO DA REQUISIÇÃO (Leitura Única)
    // ----------------------------------------------------------------------
    try {
        // Leitura única e tipada do corpo da requisição
        const requestBody: AdminLoginBody = await request.json(); 

        email = requestBody.email;
        // Pega a senha do campo 'passwordHash' (padrão) ou 'senha' (alternativa)
        passwordInput = requestBody.passwordHash || requestBody.senha || '';

    } catch (error) {
        // Captura erro se o corpo da requisição não for JSON válido
        return NextResponse.json(
            { message: 'Formato de requisição inválido.' }, 
            { status: 400 } // 400 Bad Request
        );
    }
    
    // ----------------------------------------------------------------------
    // 🚨 LOGS DE DEBUG CRÍTICO (Para diagnosticar o 401) 🚨
    // ----------------------------------------------------------------------
   
    const hashLength = ADMIN_HASH_EXPECTED ? ADMIN_HASH_EXPECTED.length : 0;
    
    console.log("--- TENTATIVA DE LOGIN ADMIN ---");
    console.log("Email Recebido:", email);
    console.log("Senha Recebida (Tamanho):", passwordInput?.length || 0);
    console.log("Hash Esperado (Tamanho):", hashLength);
    console.log("Hash Esperado (Valor Completo):", ADMIN_HASH_EXPECTED); 
    console.log("--------------------------------");

    try {
        // 4. Validação de Credenciais do .env
        if (!ADMIN_EMAIL_EXPECTED || !ADMIN_HASH_EXPECTED) {
            console.error('ADMIN_EMAIL ou ADMIN_HASH não configurado no .env.local.');
            return NextResponse.json({ message: 'Erro interno de configuração do servidor.' }, { status: 500 });
        }
        
        // 5. Validação Básica da Entrada do Usuário
        if (!email || !passwordInput) {
            return NextResponse.json({ message: 'Email e senha são obrigatórios.' }, { status: 400 });
        }

        // 6. Verifica se o email corresponde ao esperado
        if (email !== ADMIN_EMAIL_EXPECTED) {
            return NextResponse.json({ message: 'Credenciais inválidas.' }, { status: 401 });
        }
        
        // 7. Comparação Segura da Senha (Onde o 401 ocorre)
        const isPasswordValid = await bcrypt.compare(passwordInput, ADMIN_HASH_EXPECTED);
        
        if (!isPasswordValid) {
            return NextResponse.json({ message: 'Credenciais inválidas.' }, { status: 401 }); // 401 Unauthorized
        }
        
        // 8. Login de Sucesso Admin
        const adminToken = `ADMIN_JWT_${Date.now()}_admin`; 
        
        console.log(`✅ Login Admin bem-sucedido. Token gerado: ${adminToken.substring(0, 20)}...`);
        
        return NextResponse.json(
            { 
                message: 'Login Admin bem-sucedido.', 
                token: adminToken, // O token é crucial para o middleware
                role: 'admin',
                isAdmin: true
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('❌ ERRO NA ROTA /api/admin-login:', error);
        return NextResponse.json(
            { message: 'Erro interno do servidor durante o processamento do login.' }, 
            { status: 500 }
        );
    }
}