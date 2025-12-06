'use client';

import React, { useState, useEffect, useCallback, CSSProperties } from 'react';

// Tipagem baseada na resposta da sua API /api/admin/pending-payments
interface PendingPayment {
  id: number;
  nomeCompleto: string;
  email: string;
  plano: 'mensal' | 'anual' | null;
  comprovanteFileName: string; // Nome ou URL do arquivo
}

// Estilos
const containerStyle: CSSProperties = {
  maxWidth: '1000px',
  margin: '50px auto',
  padding: '30px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
};

const tableStyle: CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '20px',
};

const thStyle: CSSProperties = {
  backgroundColor: '#007bff',
  color: 'white',
  padding: '12px 15px',
  textAlign: 'left',
  borderBottom: '1px solid #ddd',
};

const tdStyle: CSSProperties = {
  padding: '10px 15px',
  borderBottom: '1px solid #eee',
  verticalAlign: 'middle',
};

const buttonConfirmStyle: CSSProperties = {
  padding: '8px 12px',
  backgroundColor: '#28a745', // Verde
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginRight: '10px',
};

const buttonRejectStyle: CSSProperties = {
    padding: '8px 12px',
    backgroundColor: '#dc3545', // Vermelho
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
};


export default function AdminPagamentosPage() {
  const [payments, setPayments] = useState<PendingPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar a lista de pagamentos pendentes
  const fetchPayments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // ⚠️ CHAMA O API ROUTE QUE FILTRA OS PENDING_REVIEW
      const response = await fetch('/api/admin/pending-payments');
      
      if (!response.ok) {
        throw new Error('Falha ao carregar pagamentos pendentes. Talvez você não esteja logado como Admin.');
      }

      const data: PendingPayment[] = await response.json();
      setPayments(data);

    } catch (err) {
      console.error(err);
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  // Função para confirmar ou rejeitar um pagamento
  const handleAction = async (userId: number, action: 'confirmar' | 'rejeitar') => {
    const confirmation = action === 'confirmar' 
        ? 'Tem certeza que deseja confirmar esta assinatura?'
        : 'Tem certeza que deseja REJEITAR este pagamento?';

    if (!window.confirm(confirmation)) {
      return;
    }

    try {
      // ⚠️ CHAMA O API ROUTE DE CONFIRMAÇÃO
      const response = await fetch('/api/confirm-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, action }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erro ao ${action} o pagamento.`);
      }

      // Se a ação for bem-sucedida, remove o item da lista
      alert(`Assinatura ${action} com sucesso!`);
      setPayments(prev => prev.filter(p => p.id !== userId));

    } catch (err) {
      console.error(err);
      alert(`Erro: ${(err as Error).message}`);
    }
  };

  if (loading) {
    return <div style={containerStyle}>Carregando pagamentos pendentes...</div>;
  }

  if (error) {
    return <div style={{...containerStyle, color: 'red'}}>Erro: {error}</div>;
  }

  return (
    <div style={containerStyle}>
      <h1 style={{ color: '#007bff', borderBottom: '2px solid #007bff', paddingBottom: '10px', marginBottom: '30px' }}>
        💰 Pagamentos Pendentes de Revisão ({payments.length})
      </h1>

      {payments.length === 0 ? (
        <p style={{ fontSize: '1.2em', textAlign: 'center', padding: '50px', backgroundColor: '#e9f7ef', borderRadius: '5px' }}>
          🎉 Não há pagamentos pendentes no momento.
        </p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Nome</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Plano</th>
              <th style={thStyle}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment.id}>
                <td style={tdStyle}>{payment.id}</td>
                <td style={tdStyle}>{payment.nomeCompleto}</td>
                <td style={tdStyle}>{payment.email}</td>
                <td style={tdStyle}>{payment.plano?.toUpperCase()}</td>
                <td style={tdStyle}>
                  {/* Simula o link do comprovante. Em um app real, abriria a imagem/pdf */}
                  <a 
                    href={`/comprovantes/${payment.comprovanteFileName}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{ color: '#007bff', marginRight: '15px', textDecoration: 'underline' }}
                  >
                    Ver Comprovante
                  </a>

                  <button 
                    onClick={() => handleAction(payment.id, 'confirmar')} 
                    style={buttonConfirmStyle}
                  >
                    Confirmar
                  </button>
                  <button 
                    onClick={() => handleAction(payment.id, 'rejeitar')} 
                    style={buttonRejectStyle}
                  >
                    Rejeitar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}