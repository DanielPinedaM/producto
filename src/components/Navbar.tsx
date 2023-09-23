'use client';
import { useUserType } from '@/context/useUserType';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Navbar() {
  const pathname = usePathname();
  const { userIsAdmin } = useUserType();

  const RenderNavbar = () => {
    return (
      <nav className='page_wrap mx-auto block h-[3rem] text-white font-bold px-4 xsm:px-6 text-lg'>
        <ul className='flex flex-row flex-wrap items-center content-center justify-between h-full gap-2'>
          <li>
            <Link href='/products' className='text-sky-500 hover:text-sky-400'>
              Productos
            </Link>
          </li>
          <li>
            <Link href='/users' className='text-sky-500 hover:text-sky-400'>
              Usuarios
            </Link>
          </li>
          {userIsAdmin ? (
            <li>
              <Link href='/new' className='text-sky-500 hover:text-sky-400'>
                Nuevo
              </Link>
            </li>
            /* cuando no escribo esto se muestra en pantalla un "0" */
          ) : null}
        </ul>
      </nav>
    );
  };

  return <>{!pathname?.includes('users') && <RenderNavbar />}</>;
}

export default Navbar;
