'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FormProps, errorStyle, successStyle } from './types'; // Importando tipos e estilos

export default function RecoveryForm({ setView }: FormProps) {
    const [erro, setErro] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErro('');
        setSuccess('Instruções de redefinição de senha foram enviadas para o seu e-mail.');
    };

    return (
        <>
            <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Recuperar Senha</h2>

            {erro && <p style={errorStyle}>{erro}</p>}
            {success && <p style={successStyle}>{success}</p>}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="email_recover" style={{ display: 'block', marginBottom: '5px' }}>E-mail de Cadastro:</label>
                    <input
                        type="email"
                        id="email_recover"
                        name="email_recover"
                        required
                        placeholder="Digite seu e-mail"
                        style={{
                            width: '100%',
                            padding: '10px',
                            boxSizing: 'border-box',
                            border: '1px solid #555',
                            backgroundColor: '#222',
                            color: 'white',
                            borderRadius: '4px'
                        }}
                    />
                </div>

                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#ffc107', color: '#333', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Enviar Link de Redefinição
                </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '20px' }}>
                <Link
                    href="#"
                    onClick={(e) => { e.preventDefault(); setView('login'); }}
                    style={{ color: '#0070f3', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.9em' }}
                >
                    Voltar para o Login
                </Link>
            </p>
        </>
    );
}