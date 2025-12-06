import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({ message: 'Rota de Teste OK' }, { status: 200 });
}