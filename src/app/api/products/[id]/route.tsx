import { conn } from '@/libs/mysql';
import { NextRequest, NextResponse } from 'next/server';
import { IOkPacket } from '../../../../types/OkPacket';
import { IProduct } from '../../../../types/product';

// obtener un producto en especifico
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const innerJoinWhere: string =
      'SELECT t1.id_product, name_product, price, reference, size, color, category, URL FROM product AS t1 INNER JOIN img AS t2 ON t1.id_product = t2.id_product WHERE t1.id_product = ?';
    const result: IProduct[] = await conn.query(innerJoinWhere, [params?.id]);
    /* console.log(result); */

    if (result?.length === 0) {
      return NextResponse.json(
        {
          message: `no se puede listar producto que no existe con ID ${params?.id}`,
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('error al obtener un producto en especifico', error);

    return NextResponse.json({ message: error }, { status: 500 });
  }
}

// eliminar imagen y producto
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const deleteInnerJoin: string =
      'DELETE t1, t2 FROM product AS t1 INNER JOIN img AS t2 ON t1.id_product = t2.id_product WHERE t1.id_product = ?';
    const result: IOkPacket = await conn.query(deleteInnerJoin, [params?.id]);
    /* console.log('result', result); */

    if (result?.affectedRows === 0) {
      return NextResponse.json(
        {
          message: `no se puede eliminar producto que no existe con ID ${params?.id}`,
        },
        {
          status: 404,
        }
      );
    }

    return new Response(null, {
      status: 204,
    });
  } catch (error) {
    console.error(`error al eliminar producto con id ${params?.id}`, error);

    return NextResponse.json({ message: error }, { status: 500 });
  }
}

// actualizar imagen y producto
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data: IProduct = await request.json();
    const updateInnerJoin = `
          UPDATE product AS p
          INNER JOIN img AS i
                ON p.id_product = i.id_product
          SET
            p.name_product = '${data?.name_product}',
            p.price = ${data?.price},
            p.reference = '${data?.reference}',
            p.size = '${data?.size}',
            p.color = '${data?.color}',
            p.category = '${data?.category}',
            i.URL = '${data?.URL}'
          WHERE p.id_product = ${params?.id};`;

    const result: IOkPacket = await conn.query(updateInnerJoin);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          message: `no se puede actualizar producto que no existe con ID ${params?.id}`,
        },
        {
          status: 404,
        }
      );
    }

    const innerJoinWhere: string =
      'SELECT t1.id_product, name_product, price, reference, size, color, category, URL FROM product AS t1 INNER JOIN img AS t2 ON t1.id_product = t2.id_product WHERE t1.id_product = ?';
    const updatedProduct: IProduct[] = await conn.query(innerJoinWhere, [params?.id]);
    /* console.log('producto actualizado', updatedProduct); */

    return NextResponse.json(updatedProduct[0]);
  } catch (error) {
    console.error('error al eliminar producto', error);

    return NextResponse.json({ message: error }, { status: 500 });
  }
}
