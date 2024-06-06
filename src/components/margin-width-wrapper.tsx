import { ReactNode } from 'react';

export default function MarginWidthWrapper({
  children,
}: {
  children: ReactNode;
}) {
  //Aqui é onde se está a definir o tamanho da pagina lateral à sidebar
  return (
    <div className="flex flex-col md:ml-72 sm:border-r sm:border-zinc-700 min-h-screen"> 
      {children}
    </div>
  );
}