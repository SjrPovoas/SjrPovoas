// Definição da interface de Usuário
export interface User {
    id: number;
    nomeCompleto: string;
    email: string;
    passwordHash: string; 
    dataNascimento: string;
    cpf: string;
    telefone: string;
    paymentStatus: 'AWAITING_PAYMENT' | 'PENDING_REVIEW' | 'ACTIVE' | 'COMPLETED' | 'REJECTED';
    plano: string; 
    
    // ⚠️ A interrogação (?) a torna opcional, pois nem todos terão um comprovante inicial
    comprovanteFileName?: string; 
  }
  
  // -----------------------------------------------------------
  // Banco de Dados Simulado (Mock Database)
  // -----------------------------------------------------------
  
  export const usersDB: User[] = [
    {
      id: 101,
      nomeCompleto: 'João da Silva',
      email: 'joao.silva@teste.com',
      passwordHash: 'password123', 
      dataNascimento: '1990-01-01',
      cpf: '111.111.111-11',
      telefone: '999999999',
      paymentStatus: 'ACTIVE',
      plano: 'Mensal', 
      // ⚠️ Inicializando a propriedade (opcional)
      comprovanteFileName: 'joao_comprovante_01.pdf', 
    },
    {
      id: 102,
      nomeCompleto: 'Maria Souza',
      email: 'maria.souza@teste.com',
      passwordHash: 'password123', 
      dataNascimento: '1995-05-15',
      cpf: '222.222.222-22',
      telefone: '988888888',
      paymentStatus: 'PENDING_REVIEW',
      plano: 'Anual',
      comprovanteFileName: undefined, // Ou simplesmente omitir, por ser opcional
    },
    {
      id: 103,
      nomeCompleto: 'Carlos Ferreira',
      email: 'carlos.ferreira@teste.com',
      passwordHash: 'password123', 
      dataNascimento: '1985-11-30',
      cpf: '333.333.333-33',
      telefone: '977777777',
      paymentStatus: 'AWAITING_PAYMENT',
      plano: 'Trimestral',
      comprovanteFileName: undefined,
    },
  ];
  
  // Lógica para obter o próximo ID (mantida)
  let currentId = usersDB.reduce((max, user) => (user.id > max ? user.id : max), 100);
  
  export function getNextUserId(): number {
      currentId += 1;
      return currentId;
  }