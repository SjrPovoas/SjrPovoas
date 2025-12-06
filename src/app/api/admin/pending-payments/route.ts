import { NextResponse } from 'next/server';
// ⬅️ Importe o array centralizado
import { usersDB } from '@/lib/mockDatabase'; 

export async function GET(request: Request) {
    try {
        // ... (Verificação de Autenticação Admin)

        // 2. Filtrar Pagamentos Pendentes no array global
        const pendingPayments = usersDB.filter(user => 
            user.paymentStatus === 'PENDING_REVIEW' && user.comprovanteFileName !== null
        );

        // ... (Restante do código: Formatar e Responder)
        const responseData = pendingPayments.map(user => ({
            id: user.id,
            nomeCompleto: user.nomeCompleto,
            email: user.email,
            plano: user.plano,
            comprovanteFileName: user.comprovanteFileName,
        }));

        return NextResponse.json(responseData, { status: 200 });

    } catch (error) {
        // ...
    }
}