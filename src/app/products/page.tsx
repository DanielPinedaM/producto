/* eslint-disable @next/next/no-img-element */
import ProductCard from '@/components/ProductCard';
import axios from 'axios';
import { IProduct } from './../../types/product';

async function loadProducts() {
  const { data } = await axios.get('http://localhost:3000/api/products');

  return data;
}

async function ProductsPage() {
  const products: IProduct[] = await loadProducts();
  /* console.log('listar productos', products); */

  return (
    <div>
      {products?.length > 0 ? (
        <ul className='grid grid-cols-1 xsm:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-[2%] gap-y-2.5 items-center auto-rows-fr py-5 sm:py-6'>
          {products?.map((product, i: number) => (
            <ProductCard key={product?.id_product ?? i} product={product} />
          ))}
        </ul>
      ) : (
        <div className='flex justify-center content-center items-center w-full h-full'>
          <p className='font-bold text-center text-[#f04c58] text-xl xsm:text-2xl'>
            No hay productos, guarde nuevos productos para poderlos mostrar
          </p>
        </div>
      )}
    </div>
  );
}

export default ProductsPage;
