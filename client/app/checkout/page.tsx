'use client';
import { title } from '@/components/primitives';
import React from 'react';
import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';
import RenderCartProducts from '@/components/RenderCartProducts';
import QuoteShippingButton from '@/components/QuoteShippingButton';
import ClearCartButton from '@/components/ClearCartButton';
import ReturnHomeButton from '@/components/ReturnHomeButton';
import axios from 'axios';

export default function CheckoutPage() {
  // Inicializa carrito como nulo para evitar errores
  const [cart, setCart] = React.useState<any>(null);

  // Inicializa shippingQuote como nulo
  const [shippingQuote, setShippingQuote] = React.useState<string | null>(null);

  // Cargamos el carrito desde el localStorage despues de montar el componente
  React.useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart') || '{}');
    setCart(cartData);
  }, []);

  const handleClearCart = () => {
    localStorage.removeItem('cart');
    setCart(null);
    setShippingQuote('No hay envíos disponibles :(');
  };

  const handleQuoteShipping = async () => {
    if (!cart) {
      console.error('No se ha generado un carrito.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/cart', {
        products: cart.products,
      });

      if (response.data.response.canReceiveCart === true) {
        setShippingQuote('Envío Nomad ⚡️ - $3670');
      } else {
        setShippingQuote('No hay envíos disponibles :(');
      }
    } catch (error) {
      console.error('Error al cotizar despacho:', error);
      setShippingQuote('No hay envíos disponibles :(');
    }
  };
  return (
    <section className='flex flex-col items-center justify-center gap-4 py-8 md:py-10'>
      <div className='inline-block max-w-[25rem] text-center justify-center'>
        <h1 className={title({ color: 'orange' })}>NOMAD&nbsp;</h1>
        <h1 className={title()}>Commerce&nbsp;</h1>
        <div className='flex gap-3'></div>
        <h1 className={title()}>Checkout&nbsp;</h1>
      </div>
      <div className='flex gap-3'></div>
      <RenderCartProducts cart={cart} />
      <div className='mt-5'></div>
      <div className='flex-direction: row flex gap-3'>
        <div>
          <QuoteShippingButton
            cart={cart}
            onQuoteShipping={handleQuoteShipping}
            shippingQuote={shippingQuote}
          />
        </div>
        <div>
          <ClearCartButton onClearCart={handleClearCart} />
        </div>
        <div>
          <ReturnHomeButton />
        </div>
      </div>
    </section>
  );
}
