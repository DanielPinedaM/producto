import { conn } from '@/libs/mysql';
import { NextResponse } from 'next/server';
import { IOkPacket } from '../../../types/OkPacket';

// listar productos
export async function GET() {
  try {
    const innerJoin: string = 'SELECT t1.id_product, name_product, price, reference, size, color, category, URL FROM product AS t1 INNER JOIN img AS t2 ON t1.id_product = t2.id_product';
    const result = await conn.query(innerJoin);
    /* console.log('listar productos', result); */

    return NextResponse.json(result);
  } catch (error) {
    console.error('error al listar tablas imagen y producto', error);

    return NextResponse.json({ message: error }, { status: 500 });
  }
}

// guardar imagen y producto
export async function POST(request: any) {
  try {
    const { id_user, name_product, price, reference, size, color, category, URL } = await request.json();

    const insertProduct: IOkPacket = await conn.query('INSERT INTO product SET ?', {
      id_user,
      name_product,
      price,
      reference,
      size,
      color,
      category,
    });
    /* console.log('insertProduct', insertProduct); */

    const insertImg = await conn.query('INSERT INTO img SET ?', {
      URL,
      id_product: insertProduct.insertId,
    });
    /* console.log('insertImg', insertImg); */

    return NextResponse.json({
      id: insertProduct.insertId,
      id_user,
      name_product,
      price,
      reference,
      size,
      color,
      category,
      URL,
    });
  } catch (error) {
    console.error('error al guardar tabla producto', error);

    return NextResponse.json({ message: error }, { status: 500 });
  }
}
