import { NextResponse } from 'next/server';

// ⚠️ Importe o array centralizado que simula o banco de dados
import { usersDB } from '@/lib/mockDatabase';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        // Espera receber o userId e a ação ('confirmar' ou 'rejeitar') do painel admin
        const { userId, action } = body; 
        
        // ⚠️ 1. VERIFICAÇÃO DE PERMISSÃO (CRÍTICO)
        // Em produção, a requisição que chega aqui DEVE ter um Token JWT válido
        // que comprove que quem a enviou é um ADMINISTRADOR.
        console.log("⚠️ Segurança: Verificação de token Admin deve ocorrer aqui!");
        
        if (!userId || !action) {
            return NextResponse.json({ message: 'Parâmetros incompletos (userId ou action faltando).' }, { status: 400 });
        }

        const userIdInt = parseInt(userId);

        // 2. Localizar o Usuário
        const userIndex = usersDB.findIndex(u => u.id === userIdInt);

        if (userIndex === -1) {
            return NextResponse.json({ message: 'Usuário não encontrado.' }, { status: 404 });
        }

        let updateData: any = {};
        let message: string;

        // 3. Executar a Ação no Registro
        if (action === 'confirmar') {
            // CONFIRMAR: Libera o acesso do assinante
            updateData = {
                isSubscriber: true, // ⬅️ CHAVE PARA LIBERAÇÃO DE ACESSO
                paymentStatus: 'COMPLETED',
                subscriptionConfirmedAt: new Date(),
            };
            message = 'Assinatura confirmada com sucesso! Acesso liberado para o usuário.';
            
            // ⚠️ Ação de Sucesso: Aqui você enviaria um e-mail de confirmação ao usuário!
            
        } else if (action === 'rejeitar') {
            // REJEITAR: Mantém o acesso bloqueado e move para o status de rejeitado
            updateData = {
                isSubscriber: false,
                paymentStatus: 'REJECTED',
                comprovanteFileName: null, // Opcional: limpa o comprovante para novo envio
            };
            message = 'Pagamento rejeitado. O usuário precisa enviar um novo comprovante ou pagar novamente.';
        } else {
            return NextResponse.json({ message: 'Ação inválida.' }, { status: 400 });
        }
        
        // 4. Atualizar o Banco de Dados (Simulação)
        usersDB[userIndex] = {
            ...usersDB[userIndex],
            ...updateData,
        };

        console.log(`[DB Admin] Status do usuário ${userId} alterado para: ${updateData.paymentStatus}`);

        return NextResponse.json({ message: message }, { status: 200 });

    } catch (error) {
        console.error('Erro ao processar confirmação de assinatura:', error);
        return NextResponse.json({ message: 'Erro interno do servidor.' }, { status: 500 });
    }
}