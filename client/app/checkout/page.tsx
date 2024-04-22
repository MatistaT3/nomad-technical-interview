'use client';
import { subtitle, title } from '@/components/primitives';
import axios from 'axios';
import React from 'react';
import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';

export default function CheckoutPage() {
  // Iniciamos carrito como nulo para evitar errores
  const [cart, setCart] = React.useState<any>(null);
  // Cargamos el carrito desde el localStorage despues de montar el componente
  React.useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart') || '{}');
    setCart(cartData);
  }, []);

  const handleQuoteShipping = async () => {
    if (!cart) {
      console.error('No se ha generado un carrito.');
      return;
    }

    try {
      console.log({ products: [cart.products] });
      const response = await axios.post('http://localhost:4000/api/cart', {
        products: cart.products,
      });

      // Verificar el resultado y mostrar el mensaje correspondiente
      if (response.data.response.canReceiveCart === true) {
        console.log('Envío Nomad ⚡️ - $3670');
      } else {
        console.error('No hay envíos disponibles :(');
      }
    } catch (error) {
      console.error('Error al cotizar despacho:', error);
      console.error('No hay envíos disponibles :(');
    }
  };

  const handleClearCart = () => {
    localStorage.removeItem('cart');
    setCart(null);
  };
  return (
    <section className='flex flex-col items-center justify-center gap-4 py-8 md:py-10'>
      <div className='inline-block max-w-lg text-center justify-center'>
        <h1 className={title({ color: 'orange' })}>NOMAD&nbsp;</h1>
        <h1 className={title()}>Commerce&nbsp;</h1>
        <div className='flex gap-3'></div>
        <h1 className={title()}>Checkout&nbsp;</h1>
      </div>
      <div className='flex gap-3'></div>
      <div className='flex-direction: row flex gap-3'>
        <div>
          <Button color='secondary' onClick={handleQuoteShipping}>
            Cotizar despacho
          </Button>
        </div>
        <div>
          <Button color='secondary' onClick={handleClearCart}>
            Limpiar carrito
          </Button>
        </div>
        <div>
          <Link href='/'>
            <Button color='secondary'>Volver</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
