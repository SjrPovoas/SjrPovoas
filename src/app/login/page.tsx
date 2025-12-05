// src/app/login/page.tsx

import LoginForm from '@/components/LoginForm'; // Use o alias @/ se configurado

export default function LoginPage() {
  return (
    <main style={{ backgroundColor: '#000', minHeight: '100vh', padding: '30px 20px', color: 'white' }}>
      <LoginForm />
    </main>
  );
}