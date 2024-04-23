'use client';
import React, { useState, useEffect } from 'react';
import { title } from '@/components/primitives';
import CartContextProvider from '@/components/CartContext';
import GenerateCartButton from '@/components/GenerateCartButton';
import CheckoutButton from '@/components/CheckoutButton';

export default function Home() {
  // Inicializa carrito como nulo para evitar errores
  const [cart, setCart] = useState<any>(null);
  // Cargamos el carrito desde el localStorage despues de montar el componente
  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart') || '{}');
    setCart(cartData);
  }, []);

  // Inicializa cartMessage como nulo
  const [cartMessage, setCartMessage] = React.useState<string | null>(null);
  return (
    <CartContextProvider>
      <section className='flex flex-col items-center justify-center gap-4 py-8 md:py-10'>
        <div className='inline-block max-w-lg text-center justify-center'>
          <h1 className={title({ color: 'orange' })}>NOMAD&nbsp;</h1>
          <h1 className={title()}>Commerce&nbsp;</h1>
          <br />
        </div>

        <div className='flex gap-3'></div>

        <div className='flex-direction: row flex gap-3'>
          <div>
            <GenerateCartButton />
          </div>
          <div>
            <CheckoutButton />
          </div>
        </div>
      </section>
    </CartContextProvider>
  );
}
