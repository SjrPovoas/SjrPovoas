import { NextResponse } from 'next/server';

// ⚠️ Importe o array centralizado que simula o banco de dados
import { usersDB } from '@/lib/mockDatabase'; 

// 🛑 IMPORTANTE: No App Router (Next.js 13+), não é necessário exportar 'config'
// para desabilitar o bodyParser; a função request.formData() lida com isso.

export async function POST(request: Request) {
    // ⚠️ Em produção, você deve verificar a autenticação aqui (se o usuário está logado).

    try {
        // 1. Processar o FormData da requisição (Recomendado no App Router)
        const formData = await request.formData();
        
        // 2. Extrair dados
        const comprovante = formData.get('comprovante') as File;
        const userId = formData.get('userId');
        const plano = formData.get('plano');

        if (!comprovante || !userId || !plano) {
            return NextResponse.json(
                { message: 'Dados incompletos (comprovante, userId ou plano faltando).' },
                { status: 400 }
            );
        }

        const userIdInt = parseInt(userId.toString());

        // 3. Localizar o Usuário
        const userIndex = usersDB.findIndex(u => u.id === userIdInt);

        if (userIndex === -1) {
            return NextResponse.json(
                { message: 'Usuário não encontrado.' }, 
                { status: 404 }
            );
        }

        // --- SIMULAÇÃO DE ARMAZENAMENTO DE ARQUIVO ---
        
        // A. Criar um nome de arquivo único para simulação
        const fileExtension = comprovante.name.split('.').pop();
        const fileName = `${userId}_${Date.now()}.${fileExtension}`;

        // B. Simular a escrita do arquivo (em um projeto real, faria o upload para o Cloud Storage)
        console.log(`[UPLOAD SIMULADO] Arquivo salvo como: ${fileName}`);
        
        // C. Obter o registro atual do usuário
        let user = usersDB[userIndex];

        // 4. ATUALIZAR STATUS NO BANCO DE DADOS (Simulação)
        user = {
            ...user,
            plano: plano.toString() as ('mensal' | 'anual'),
            comprovanteFileName: fileName, // Salva o nome do arquivo/URL no DB
            paymentStatus: 'PENDING_REVIEW' as const, // Marca para revisão
        };

        usersDB[userIndex] = user;
        
        console.log(`[DB] Usuário ${userId} atualizado com comprovante. Status: PENDING_REVIEW`);

        // 5. Resposta de Sucesso
        return NextResponse.json(
            { 
                message: 'Comprovante enviado com sucesso! Aguarde a confirmação de pagamento do administrador.',
                fileName: fileName
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Erro ao processar upload do comprovante:', error);
        return NextResponse.json(
            { message: 'Erro interno ao processar o arquivo.' }, 
            { status: 500 }
        );
    }
}