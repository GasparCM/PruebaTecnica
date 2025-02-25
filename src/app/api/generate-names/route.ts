import { NextResponse } from 'next/server';
import { generateNamesFromDescription } from '@/app/utils/deepSekkService';

export async function POST(req: Request) {
  try {
    
    const { description } = await req.json();
    
    if (!description || description.trim() === '') {
      return NextResponse.json({ error: 'Descripción no válida' }, { status: 400 });
    }

    const names = await generateNamesFromDescription(description);
    
    return NextResponse.json({ names });
  } catch (error) {
    
    console.error('Error en el endpoint:', error);
    return NextResponse.json({ error: 'Error generando nombres' }, { status: 500 });
  }
}
