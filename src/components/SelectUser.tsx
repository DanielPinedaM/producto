/* eslint-disable react/no-unescaped-entities */
'use client';
import { IUser } from '../types/user';
import { useRouter } from 'next/navigation';
import { useUserType } from '../context/useUserType';

interface ISelectUser {
  users: IUser[];
}

function SelectUser({ users }: ISelectUser) {
  const router = useRouter();

  /* Desde MySQL el campo user_type de tabla user viene como tipo number
  Tipo de usuario:
  TRUE  =1=administrador
  FALSE =0=cliente */
  const { userIsAdmin, setUserIsAdmin } = useUserType();

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUserIsAdmin(Number(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log('¿El usuario es administrador?', userIsAdmin);

    router.push('/products');
    router.refresh();
  };

  const RenderUsers = () => {
    return (
      <div className='bg-white shadow-md rounded-md px-[5vw] py-6 w-fit'>
        <p className='mb-2 text-center'>
          <span>Selecciona un usuario: </span>
          <span className='text-[#f04c58]'>*</span>
        </p>

        <form className='flex flex-col gap-y-2 flex-nowrap' onSubmit={handleSubmit}>
          {users?.map((user, i: number) => (
            <div key={user?.id_user ?? i} className='flex flex-row gap-2'>
              <input
                type='radio'
                id={String(i)}
                name='user'
                value={user?.user_type}
                onChange={handleOptionChange}
                required
              />
              <label htmlFor={String(i)}>
                <p>
                  <span>Nombre: </span>
                  <span>{user?.full_name}</span>
                </p>
                <p>
                  <span>¿Es admin?: </span>
                  {user?.user_type ? <span>si</span> : <span>no</span>}
                </p>
              </label>
            </div>
          ))}
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 inline-block w-fit mx-auto text-white px-3 py-2 rounded-lg font-bold  transition-all duration-300 active:relative active:top-0.5'
          >
            Continuar
          </button>
        </form>
      </div>
    );
  };

  const NoUsers = () => {
    return (
      <div className='max-w-[400px] flex flex-col flex-nowrap gap-y-2'>
        <p className='font-bold text-center text-[#f04c58] text-xl xsm:text-2xl '>
          No hay usuarios guardados en la base de datos, ejecute esta consulta de MySQL para guardar
          usuarios:
        </p>
        <code className='text-white'>use product_db;</code>
        <code className='text-white'>ALTER TABLE user AUTO_INCREMENT = 1;</code>
        <code className='text-white'>
          INSERT INTO user (full_name, mail, passcode, user_type) <br />
          VALUES ('Admin', 'admin@example.com', 'clave_admin', TRUE);
        </code>
        <code className='text-white'>
          INSERT INTO user (full_name, mail, passcode, user_type) <br />
          VALUES ('Cliente 1', 'cliente1@example.com', 'clave_cliente1', FALSE);
        </code>
      </div>
    );
  };

  return (
    <div className='h-full w-full flex items-center content-center justify-center'>
      {users?.length > 0 ? <RenderUsers /> : <NoUsers />}
    </div>
  );
}

export default SelectUser;
