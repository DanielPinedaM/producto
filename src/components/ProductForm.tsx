/* eslint-disable @next/next/no-img-element */

'use client';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { IProduct } from '../types/product';
import Spinner from './../assets/Spinner';

interface IParams {
  id?: string;
}

function ProductForm() {
  const initialValueDataForm: IProduct = {
    /* id_product: 0, */
    /* el usuario administrador esta quemado porque en la prueba tecnica dice "el registro de los usuarios será de forma manual en la BD" */
    id_user: 1,
    name_product: '',
    price: 1,
    reference: '',
    size: '',
    color: '',
    category: '',
    URL: '',
  };
  const form = useRef<HTMLFormElement | null>(null);
  const router = useRouter();
  const params: IParams = useParams();

  const [dataForm, setDataForm] = useState<IProduct>(initialValueDataForm);
  const [loading, setLoading] = useState<boolean>(false);

  /* Si el producto existe, mostrar datos en <form> para actualizar producto */
  useEffect(() => {
    if (params?.id) {
      axios.get(`/api/products/${params.id}`).then((res) => {
        setDataForm({
          id_user: 1,
          name_product: res.data.name_product,
          price: res.data.price,
          reference: res.data.reference,
          size: res.data.size,
          color: res.data.color,
          category: res.data.category,
          URL: res.data.URL,
        });
      });

      /* console.log(`datos existentes del producto con ID ${params.id}`, dataForm); */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formElements = [
    {
      label: 'Nombre:',
      name: 'name_product',
      value: 'name_product',
      type: 'text',
      id: 'htmlFor_name_product',
      required: true,
    },
    {
      label: 'Precio:',
      name: 'price',
      value: 'price',
      type: 'number',
      id: 'htmlFor_price',
      required: true,
      min: 1,
    },
    {
      label: 'Referencia:',
      name: 'reference',
      value: 'reference',
      type: 'select',
      id: 'htmlFor_reference',
      options: [
        { value: '', label: 'Seleccione una opción' },
        { value: 'A', label: 'A' },
        { value: 'B', label: 'B' },
        { value: 'C', label: 'C' },
      ],
      required: true,
    },
    {
      label: 'Talla:',
      name: 'size',
      value: 'size',
      type: 'select',
      id: 'htmlFor_size',
      options: [
        { value: '', label: 'Seleccione una opción' },
        { value: 'XS', label: 'XS' },
        { value: 'S', label: 'S' },
        { value: 'M', label: 'M' },
        { value: 'L', label: 'L' },
        { value: 'XL', label: 'XL' },
      ],
      required: true,
    },
    {
      label: 'Color:',
      name: 'color',
      value: 'color',
      type: 'text',
      id: 'htmlFor_color',
      required: true,
    },
    {
      label: 'Categoría:',
      name: 'category',
      value: 'category',
      type: 'select',
      id: 'htmlFor_category',
      options: [
        { value: '', label: 'Seleccione una opción' },
        { value: 'C1', label: 'Categoría 1' },
        { value: 'C2', label: 'Categoría 2' },
        { value: 'C3', label: 'Categoría 3' },
      ],
      required: true,
    },
    {
      label: 'URL:',
      name: 'URL',
      value: 'URL',
      type: 'text',
      id: 'htmlFor_URL',
      required: true,
      placeholder: 'https://www.',
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ): void => {
    /* console.log(e.target.name, e.target.value); */
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  };

  const saveOrUpdateProduct = async (): Promise<void> => {
    setLoading(true);

    try {
      /* SI existe producto lo actualizo,
         SINO existe lo creo */
      if (params?.id) {
        const response = await axios.put(`/api/products/${params?.id}`, dataForm);
        /* console.log('actualizar producto', response); */
      } else {
        const response = await axios.post('/api/products', dataForm);
        /* console.log('guardar producto', response); */
      }

      // limpiar campos despues de enviar <form>
      form?.current?.reset();
      setDataForm(initialValueDataForm);

      router.refresh();
      router.push('/products');
    } catch (error) {
      console.error('error al guardar producto', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    /* console.log('dataForm', dataForm); */
    saveOrUpdateProduct();
  };

  return (
    <div className='h-full w-full flex justify-center items-center content-center'>
      <div className='bg-white shadow-md rounded-md p-3 max-w-[378px] w-full'>
        <p className='mb-2'>
          <span className='text-gray-700 text-sm font-bold'>ID usuario administrador: </span>
          <span>1</span>
        </p>

        <form
          className='flex flex-col gap-y-2 flex-nowrap'
          onSubmit={handleSubmit}
          autoComplete='off'
          ref={form}
        >
          {formElements?.map((element, i: number) => (
            <div
              className='flex flex-col flex-nowrap gap-2'
              key={i}
            >
              <label className='text-gray-700 text-sm font-bold inline-block flex-initial w-fit' htmlFor={element?.id}>
                <span>{element?.label}</span>{' '}
                {element?.required && <span className='text-[#f04c58]'>*</span>}
              </label>
              {element?.type === 'select' ? (
                <select
                  className='shadow border rounded py-2 px-3'
                  name={element?.name}
                  id={element?.id}
                  value={dataForm[element?.value]}
                  onChange={handleChange}
                  required={element?.required}
                >
                  {element?.options?.map((option, i: number) => (
                    <option key={i} value={option?.value}>
                      {option?.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  className='shadow appearance-none border rounded py-2 px-3 inline-block'
                  type={element?.type}
                  name={element?.name}
                  id={element?.id}
                  value={dataForm[element?.value]}
                  required={element?.required}
                  min={element?.min}
                  placeholder={element?.placeholder}
                  onChange={handleChange}
                />
              )}
            </div>
          ))}

          {params?.id && (
            <div className='mx-auto max-w-[200px]'>
              <img
                src={dataForm?.URL}
                alt={dataForm?.name_product ?? 'ropa interior Feria del Brasier y Solo Kukos'}
                className='rounded-xl w-7/12'
              />
            </div>
          )}

          <button
            className={`${loading ? 'cursor-not-allowed' : 'cursor-pointer'} ${
              params?.id ? 'bg-green-500 hover:bg-green-700' : 'bg-blue-500 hover:bg-blue-700'
            } inline-block w-fit mx-auto text-white px-3 py-2 rounded-lg font-bold  transition-all duration-300 active:relative active:top-0.5`}
            type='submit'
            disabled={loading}
          >
            {loading ? <Spinner /> : params?.id ? <span>Editar</span> : <span>Guardar</span>}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
