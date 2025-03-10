
import React from 'react';
import Header from './Header';
import { Busqueda } from './Busqueda';


const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <Busqueda/>

      <main>{children}</main>
    </div>
  );
};

export default Layout;
