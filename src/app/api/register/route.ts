import { NextResponse } from 'next/server';
// ⚠️ IMPORTAÇÃO CORRIGIDA: Importamos a função getNextUserId
import { usersDB, User, getNextUserId } from '@/lib/mockDatabase'; 

// ⚠️ REMOVIDA: Variável 'currentId' não é mais necessária aqui
// let currentId = 104; 

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
        nomeCompleto, 
        email, 
        passwordHash, 
        dataNascimento, 
        cpf, 
        telefone 
    } = body;

    // 2. Validação básica de entrada
    if (!email || !passwordHash || !nomeCompleto || !cpf) {
      return NextResponse.json({ message: 'Campos obrigatórios faltando.' }, { status: 400 });
    }

    // 3. Checar se o usuário já existe
    const existingUser = usersDB.find(u => u.email === email);
    if (existingUser) {
      return NextResponse.json({ 
        message: 'Este email já está cadastrado.' 
      }, { status: 409 });
    }

    // 4. Criar Novo Usuário (Mock)
    const newUser: User = {
        // ⚠️ USO CORRIGIDO: Chamamos a função exportada
        id: getNextUserId(),
        nomeCompleto,
        email,
        passwordHash,
        dataNascimento,
        cpf,
        telefone,
        paymentStatus: 'AWAITING_PAYMENT',
        plano: ''
    };

    // Adicionar o novo usuário ao mock database
    usersDB.push(newUser);
    
    console.log(`✅ Novo usuário cadastrado: ${newUser.email}`);
    
    // 5. Resposta de Sucesso
    return NextResponse.json(
      { 
        message: 'Cadastro realizado com sucesso.', 
        userId: newUser.id,
        paymentStatus: newUser.paymentStatus 
      }, 
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ ERRO NA ROTA /api/register:', error);
    
    return NextResponse.json(
      { message: 'Erro interno do servidor ao tentar cadastrar o usuário.' }, 
      { status: 500 }
    );
  }
}