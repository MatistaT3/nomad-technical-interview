'use client';
import React, { useState, useEffect } from 'react';
import { title } from '@/components/primitives';
import CartContextProvider from '@/components/CartContext';
import GenerateCartButton from '@/components/GenerateCartButton';
import CheckoutButton from '@/components/CheckoutButton';
import RenderCartProducts from '@/components/RenderCartProducts';
import axios from 'axios';

export default function Home() {
  // Inicializa carrito como nulo para evitar errores
  const [cart, setCart] = React.useState<any>(null);
  // Inicializa cartMessage como nulo
  const [cartMessage, setCartMessage] = React.useState<string | null>(null);
  // Cargamos el carrito desde el localStorage despues de montar el componente
  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart') || '{}');
    setCart(cartData);
  }, []);

  const generateRandomCartNumber = (): number => {
    return Math.floor(Math.random() * 20) + 1;
  };

  const handleGenerateCart = async () => {
    try {
      const cartNumber = generateRandomCartNumber();
      // Realiza una solicitud GET para generar el carrito aleatorio
      const response = await axios.get(
        `https://dummyjson.com/carts/${cartNumber}`
      );
      const cartData = response.data;

      localStorage.setItem('cart', JSON.stringify(cartData));
      setCart(cartData);
      setCartMessage(
        `Carrito generado con éxito! :D Si no te gusta, puedes generar otro! 🛒`
      );
    } catch (error) {
      console.error('Error al generar el carrito:', error);
      setCartMessage(`Error al generar el carrito`);
    }
  };
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
            <GenerateCartButton
              onGenerateCart={handleGenerateCart}
              cartMessage={cartMessage}
            />
          </div>
          <div>
            <CheckoutButton />
          </div>
        </div>
        <div className='mt-4'></div>
        <div>
          <RenderCartProducts cart={cart} />
        </div>
      </section>
    </CartContextProvider>
  );
}
