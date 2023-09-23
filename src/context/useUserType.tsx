/* Guardar en estado global el tipo de usuario seleccionado en http://localhost:3000/users */
'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface useUserProps {
  userIsAdmin: number | undefined;
  setUserIsAdmin: (option: number) => void;
}

const useUser = createContext<useUserProps | undefined>(undefined);

export function RadioProvider({ children }: { children: ReactNode }) {
  const [userIsAdmin, setUserIsAdmin] = useState<number | undefined>();

  return (
    <useUser.Provider value={{ userIsAdmin, setUserIsAdmin }}>
      {children}
    </useUser.Provider>
  );
}

export function useUserType() {
  const context = useContext(useUser);
  if (!context) {
    const mensaje: string = 'useUserType() debe usarse dentro de un RadioProvider()';
    console.error(mensaje);

    throw new Error(mensaje);
  }

  return context;
}
