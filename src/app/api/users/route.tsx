import { conn } from '@/libs/mysql';
import { NextResponse } from 'next/server';
// import { IOkPacket } from '../../../types/OkPacket';

// listar usuarios
export async function GET() {
  try {
    const select: string = 'SELECT * FROM user;';
    const result = await conn.query(select);
    /* console.log('listar usuarios', result); */

    return NextResponse.json(result);
  } catch (error) {
    console.error('error al listar usuarios', error);

    return NextResponse.json({ message: error }, { status: 500 });
  }
}
