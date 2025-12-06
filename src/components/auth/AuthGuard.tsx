'use client'; 

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    // 1. Verifica a autenticação no lado do cliente
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
      setIsAuth(true);
    } else {
      // 2. Se não estiver autenticado, redireciona para a página de login
      router.push('/login');
    }
    setLoading(false);
  }, [router]);

  // Enquanto verifica o status (para evitar piscar a tela)
  if (loading) {
    return (
      <div style={{ padding: '50px', textAlign: 'center', color: 'white' }}>
        Carregando...
      </div>
    );
  }

  // Se autenticado, renderiza o conteúdo da página
  if (isAuth) {
    return <>{children}</>;
  }

  // Caso contrário, não renderiza nada (o redirecionamento já foi feito)
  return null;
}