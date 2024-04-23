import React, { createContext, useState } from 'react';

// Creamos un contexto para el carrito
export const CartContext = createContext<any>({ cart: {}, setCart: () => {} });

// Proveedor del contexto del carrito
const CartContextProvider = ({ children }: any) => {
  const [cart, setCart] = useState<any>(null);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
