/* eslint-disable @next/next/no-img-element */
'use client';
import Link from 'next/link';
import { IProduct } from '../types/product';
import { useUserType } from '../context/useUserType';

interface IProductCard {
  product: IProduct;
}

function ProductCard({ product }: IProductCard) {
  const { userIsAdmin } = useUserType();

  return (
    <Link
      className={`
     ${
       userIsAdmin
         ? 'hover:border hover:relative hover:bottom-1 hover:bg-gray-200 hover:cursor-pointer'
         : 'hover:cursor-not-allowed'
     } mx-auto w-10/12 xsm:w-full h-full bg-white rounded-lg border border-gray-800 px-[8%] xsm:px-[3%] py-2`}
      href={`${userIsAdmin ? `/products/${product?.id_product}` : ''} `}
    >
      <li>
        <img
          src={product?.URL}
          alt={product?.name_product ?? 'ropa interior Feria del Brasier y Solo Kukos'}
          className='rounded-xl'
        />
      </li>
      <li>
        <h3 className='text-lg font-bold text-center'>{product?.name_product}</h3>
      </li>
      <li className='text-2xl text-slate-2000'>
        <span>$ </span>
        <span>{product?.price}</span>
      </li>
      <li className='flex flex-row xsm:justify-between'>
        <span className='font-semibold'>Referencia: </span>
        <span>{product?.reference}</span>
      </li>
      <li className='flex flex-row xsm:justify-between'>
        <span className='font-semibold'>Talla: </span>
        <span>{product?.size}</span>
      </li>
      <li className='flex flex-row xsm:justify-between'>
        <span className='font-semibold'>Color: </span>
        <span>{product?.color}</span>
      </li>
      <li className='flex flex-row xsm:justify-between'>
        <span className='font-semibold'>Categoría: </span>
        <span>{product?.category}</span>
      </li>
    </Link>
  );
}

export default ProductCard;
