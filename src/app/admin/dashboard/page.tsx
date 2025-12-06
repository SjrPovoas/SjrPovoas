// src/app/admin/dashboard/page.tsx

import React from 'react';

export default function AdminDashboardPage() {
  return (
    <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f0f0f0' }}>
      <h1>🔑 Dashboard de Administração</h1>
      <p>Você está logado como Administrador. Acesso a relatórios e configurações.</p>
      <p style={{ fontSize: '1.1em', color: '#555', marginBottom: '30px' }}>
        Bem-vindo(a)! Utilize o menu abaixo para gerenciar usuários, pagamentos e configurações do sistema.
      </p>

      <div style={{ display: 'flex', gap: '20px' }}>
        
        {/* Card de Pagamentos Pendentes */}
        <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '6px', flex: 1, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)' }}>
          <h2 style={{ color: '#0056b3' }}>Pagamentos</h2>
          <p>Acesse a lista de comprovantes pendentes para confirmar novas assinaturas.</p>
          <a href="/admin/pagamentos" style={{ display: 'inline-block', marginTop: '15px', color: '#fff', backgroundColor: '#007bff', padding: '8px 15px', borderRadius: '4px', textDecoration: 'none' }}>
            Ver Pendências
          </a>
        </div>
        {/* Card de Gerenciamento de Usuários */}
        <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '6px', flex: 1, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)' }}>
          <h2 style={{ color: '#333' }}>Usuários</h2>
          <p>Visualize e gerencie todos os usuários cadastrados e seus planos.</p>
          <a href="/admin/users" style={{ display: 'inline-block', marginTop: '15px', color: '#fff', backgroundColor: '#6c757d', padding: '8px 15px', borderRadius: '4px', textDecoration: 'none' }}>
            Gerenciar
          </a>
        </div>
      </div>
    </div>
  );
}