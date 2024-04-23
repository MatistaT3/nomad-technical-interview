'use client';
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from '@nextui-org/link';
import { title } from '@/components/primitives';
import { Button } from '@nextui-org/button';
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/popover';

// Creamos un contexto para el carrito
export const CartContext = createContext<any>({ cart: {}, setCart: () => {} });

export default function Home() {
  const [cart, setCart] = useState<any>(null); // Estado del carrito

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart') || '{}');
    setCart(cartData);
  }, []); // Se ejecuta solo una vez al montar el componente

  function generateRandomCartNumber(): number {
    return Math.floor(Math.random() * 20) + 1;
  }
  const [cartMessage, setCartMessage] = React.useState<string | null>(null);
  const handleGenerateCart = async () => {
    try {
      const cartNumber = generateRandomCartNumber();
      // Realiza una solicitud GET para generar el carrito aleatorio
      const response = await axios.get(
        `https://dummyjson.com/carts/${cartNumber}`
      );
      const cartData = response.data;

      localStorage.setItem('cart', JSON.stringify(cartData));
      setCart(cartData); // Guarda el carrito en el estado
      setCartMessage(`Carrito generado con éxito! :D`);
    } catch (error) {
      console.error('Error al generar el carrito:', error);
      setCartMessage(`Error al generar el carrito`);
    }
  };
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <section className='flex flex-col items-center justify-center gap-4 py-8 md:py-10'>
        <div className='inline-block max-w-lg text-center justify-center'>
          <h1 className={title({ color: 'orange' })}>NOMAD&nbsp;</h1>
          <h1 className={title()}>Commerce&nbsp;</h1>
          <br />
        </div>

        <div className='flex gap-3'></div>

        <div className='flex-direction: row flex gap-3'>
          <div>
            <Popover placement='bottom' showArrow={true}>
              <PopoverTrigger>
                <Button color='secondary' onClick={handleGenerateCart}>
                  Generar Carrito
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className='px-1 py-2'>
                  <div className='text-small font-bold'>{cartMessage}</div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Link href='/checkout'>
              <Button color='secondary'>Finalizar Compra</Button>
            </Link>
          </div>
        </div>
      </section>
    </CartContext.Provider>
  );
}
