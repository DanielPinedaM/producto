/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import Link from 'next/link';
import Buttons from './Buttons';

interface IProductPage {
  params: { id: string };
}

async function loadProduct(id_product: string) {
  try {
    const { data } = await axios.get(`http://localhost:3000/api/products/${id_product}`);
    /* console.log(`ID de la ruta http://localhost:3000/products/${id_product}`); */

    return data;
  } catch (error) {
    console.error('error al obtener un producto en especifico', error);

    return {};
  }
}

async function ProductPage({ params }: IProductPage) {
  const product = await loadProduct(params?.id);
  /* console.log('obtener un producto en especifico', product); */

  return (
    <section className='h-full w-full flex justify-center items-center content-center'>
      <div className='bg-white text-gray-700 shadow-md rounded-md p-3 max-w-[378px] flex flex-col flex-nowrap gap-y-1'>
        <p><span className="font-bold">Nombre: </span><span>{product?.name_product}</span></p>
        <p><span className="font-bold">Precio: </span><span>$ {product?.price}</span></p>
        <p><span className="font-bold">Referencia: </span><span>{product?.reference}</span></p>
        <p><span className="font-bold">Talla: </span><span>{product?.size}</span></p>
        <p><span className="font-bold">Color: </span><span>{product?.color}</span></p>
        <p><span className="font-bold">Categoría: </span><span>{product?.category}</span></p>
        <p className='break-all'>
          <span className="font-bold">URL imagen: </span>
          <Link href={product?.URL} target='_blank' className="underline text-blue-600">
            {product?.URL}
          </Link>
        </p>

        <img
          src={product?.URL}
          alt={product?.name_product ?? 'ropa interior Feria del Brasier y Solo Kukos'}
          className='rounded-xl w-7/12'
        />

        <Buttons id_product={product?.id_product} />
      </div>
    </section>
  );
}

export default ProductPage;
