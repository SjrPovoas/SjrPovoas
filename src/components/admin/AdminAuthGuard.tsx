'use client'; 

import { useEffect, useState, CSSProperties } from 'react';
import { useRouter } from 'next/navigation';

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

// Estilo para a tela de carregamento
const loadingStyle: CSSProperties = { 
    padding: '50px', 
    textAlign: 'center', 
    color: '#ffc107', 
    backgroundColor: '#000',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2em'
};

export default function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAdminAuth, setIsAdminAuth] = useState(false);

  useEffect(() => {
    // 1. Verifica o token de administrador no Local Storage
    const adminToken = localStorage.getItem('adminToken');

    if (adminToken === 'true') { 
      // Em produção, você faria uma chamada API para validar o JWT real
      setIsAdminAuth(true);
    } else {
      // 2. Se não estiver autenticado, redireciona para a tela de login admin
      router.push('/admin/login');
    }
    setLoading(false);
  }, [router]);

  // Enquanto verifica o status, exibe uma tela de carregamento
  if (loading) {
    return (
      <div style={loadingStyle}>
        Verificando Acesso... Carregando Painel Administrativo ⏳
      </div>
    );
  }

  // Se autenticado como Admin, renderiza o conteúdo da página protegida
  if (isAdminAuth) {
    return <>{children}</>;
  }

  // Se não autenticado, não renderiza nada (o redirecionamento já foi acionado pelo useEffect)
  return null;
}