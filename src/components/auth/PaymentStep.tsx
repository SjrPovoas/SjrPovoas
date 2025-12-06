'use client';

import React, { useState, useRef, CSSProperties } from 'react';
import { useRouter } from 'next/navigation';

interface PaymentStepProps {
  userId: number; // O ID do usuário recém-cadastrado
}

// Detalhes do PIX (fixos para simulação)
const PIX_KEY = '61981885715';
// const PIX_CNPJ = '00.000.000/0001-00';
const BANK_INFO = 'Banco de Pagamentos Nubank';

// Estilos
const containerStyle: CSSProperties = {
  maxWidth: '600px',
  margin: '50px auto',
  padding: '30px',
  backgroundColor: '#f9f9f9',
  borderRadius: '10px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
};

const inputStyle: CSSProperties = {
    width: '100%',
    padding: '10px',
    boxSizing: 'border-box',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginTop: '5px',
};

const buttonStyle: CSSProperties = {
    padding: '12px 20px',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
    width: '100%',
    fontWeight: 'bold',
};


export default function PaymentStep({ userId }: PaymentStepProps) {
  const [selectedPlan, setSelectedPlan] = useState<'mensal' | 'anual'>('mensal');
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('');

    if (!file) {
      setStatus('Por favor, anexe o comprovante de pagamento.');
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      // 1. Constrói o FormData (CRÍTICO para uploads de arquivos)
      const formData = new FormData();
      formData.append('userId', userId.toString());
      formData.append('plano', selectedPlan);
      formData.append('comprovante', file); 

      // 2. Envia para o API Route de upload
      const response = await fetch('/api/upload-comprovante', {
        method: 'POST',
        body: formData, // O fetch cuidará do Content-Type: multipart/form-data
      });

      if (response.ok) {
        setStatus('✅ Comprovante enviado com sucesso! Aguarde a confirmação do administrador.');
        // Em um app real, redirecionaria para uma página de status:
        // router.push('/status-pagamento'); 
      } else {
        const errorData = await response.json();
        // Erro do backend: "Usuário não encontrado."
        setStatus(`❌ Erro no envio: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error('Erro de rede/upload:', error);
      setStatus('❌ Erro de conexão com o servidor. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ color: '#0070f3', textAlign: 'center', marginBottom: '20px' }}>Finalizar Pagamento</h2>
      
      <p style={{ textAlign: 'center', marginBottom: '25px', color: '#555' }}>
        Seu cadastro está quase completo! Por favor, efetue o pagamento via PIX e envie o comprovante.
      </p>
      
      {/* --- Detalhes do PIX --- */}
      <div style={{ backgroundColor: '#e9e9e9', padding: '15px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #ddd' }}>
        <h3 style={{ marginBottom: '10px', color: '#333' }}>Dados PIX para Transferência</h3>
        <p><strong>Chave PIX (E-mail):</strong> {PIX_KEY}</p>
        {/* --- <p><strong>CNPJ/Identificador:</strong> {PIX_CNPJ}</p> --- */}
        <p><strong>Instituição:</strong> {BANK_INFO}</p>
      </div>

      <form onSubmit={handleSubmit}>
        
        {/* --- Seleção do Plano --- */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Selecione o Plano:</label>
          <div style={{ display: 'flex', gap: '20px' }}>
            <label>
              <input 
                type="radio" 
                name="plano" 
                value="mensal" 
                checked={selectedPlan === 'mensal'} 
                onChange={() => setSelectedPlan('mensal')} 
              /> Mensal (R$ 4,90)
            </label>
            <label>
              <input 
                type="radio" 
                name="plano" 
                value="anual" 
                checked={selectedPlan === 'anual'} 
                onChange={() => setSelectedPlan('anual')} 
              /> Anual (R$ 49,00)
            </label>
          </div>
        </div>

        {/* --- Upload do Comprovante --- */}
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="comprovante" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Anexar Comprovante (Imagem/PDF):
          </label>
          <input
            id="comprovante"
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleFileChange}
            ref={fileInputRef}
            required
            disabled={isSubmitting}
            style={inputStyle}
          />
          {file && <p style={{ marginTop: '5px', fontSize: '0.9em', color: '#333' }}>Arquivo selecionado: {file.name}</p>}
        </div>

        {/* --- Botão de Submissão --- */}
        <button 
          type="submit" 
          disabled={isSubmitting} 
          style={{ 
            ...buttonStyle, 
            backgroundColor: isSubmitting ? '#ccc' : buttonStyle.backgroundColor,
            cursor: isSubmitting ? 'not-allowed' : 'pointer'
          }}
        >
          {isSubmitting ? 'Enviando Comprovante...' : 'Enviar e Aguardar Confirmação'}
        </button>

        {/* --- Status/Mensagens --- */}
        {status && (
          <p style={{ marginTop: '15px', padding: '10px', borderRadius: '4px', textAlign: 'center', backgroundColor: status.startsWith('✅') ? '#d4edda' : '#f8d7da', color: status.startsWith('✅') ? '#155724' : '#721c24' }}>
            {status}
          </p>
        )}
      </form>
    </div>
  );
}