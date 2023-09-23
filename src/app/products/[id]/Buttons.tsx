'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Spinner from './../../../assets/Spinner';

interface IButtons {
  id_product: number;
}

interface ButtonItem {
  key: number;
  onClick: () => void;
  disabled?: boolean;
  className: string;
  span: string;
}

function Buttons({ id_product }: IButtons) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  async function handleDelete(): Promise<void> {
    if (confirm('¿esta seguro que desea eliminar producto?')) {
      setLoading(true);

      try {
        const response = await axios.delete(`/api/products/${id_product}`);
        /* console.log(`eliminar producto con ID ${id_product}`, response); */

        if (response?.status === 204) {
          router.push('/products');
          router.refresh();
        }
      } catch (error) {
        console.error(`error al eliminar producto con ID ${id_product}`);
      } finally {
        setLoading(false);
      }
    }
  }

  function handleEdit(): void {
    router.push(`/products/edit/${id_product}`);
  }

  const handleBack = (): void => {
    router.push('/products');
  };

  const buttons: ButtonItem[] = [
    {
      key: 0,
      onClick: () => handleDelete(),
      disabled: loading,
      className: `${
        loading ? 'cursor-not-allowed' : 'cursor-pointer'
      } bg-[#f04c58] hover:bg-red-600`,
      span: 'Eliminar',
    },
    {
      key: 1,
      onClick: () => handleEdit(),
      disabled: loading,
      className: `${
        loading ? 'cursor-not-allowed' : 'cursor-pointer'
      } bg-green-500 hover:bg-green-700`,
      span: 'Editar',
    },
  ];

  return (
    <div>
      <div className='flex flex-row flex-wrap justify-center items-center content-center gap-3 mt-2'>
        {buttons?.map((button) => (
          <button
            key={button?.key}
            onClick={button?.onClick}
            type='button'
            disabled={button?.disabled}
            className={`${button?.className} w-fit text-white px-3 py-2 rounded-lg font-bold transition-all duration-300 active:relative active:top-0.5`}
          >
            <span>{button?.span}</span>
          </button>
        ))}
      </div>
      {loading && (
        <div className='bg-emerald-600 w-fit mx-auto rounded-full p-2 mt-2'>
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default Buttons;
