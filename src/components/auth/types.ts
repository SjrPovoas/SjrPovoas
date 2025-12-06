// Tipos
export interface LoginData {
    usuario: string;
    senha: string;
}

export interface RegisterData {
    nomeCompleto: string;
    dataNascimento: string;
    cpf: string;
    telefone: string;
    email: string;
    senha: string;
}

export interface FormProps {
    setView: (view: 'login' | 'cadastro' | 'recuperacao') => void;
}

// Estilos Padronizados para Alertas
export const errorStyle: React.CSSProperties = {
    padding: '10px',
    backgroundColor: '#fee',
    color: '#A94442',
    borderRadius: '4px',
    marginBottom: '15px',
    border: '1px solid #ebccd1'
};

export const successStyle: React.CSSProperties = {
    padding: '10px',
    backgroundColor: '#dff0d8',
    color: '#3c763d',
    borderRadius: '4px',
    marginBottom: '15px',
    border: '1px solid #d6e9c6'
};