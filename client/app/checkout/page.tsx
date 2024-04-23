'use client';
import { title } from '@/components/primitives';
import axios from 'axios';
import React from 'react';
import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';
import { Card, CardBody, CardFooter } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/popover';

export default function CheckoutPage() {
  // Iniciamos carrito como nulo para evitar errores
  const [cart, setCart] = React.useState<any>(null);
  // Cargamos el carrito desde el localStorage despues de montar el componente
  React.useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart') || '{}');
    setCart(cartData);
  }, []);

  const [shippingQuote, setShippingQuote] = React.useState<string | null>(null);
  const handleQuoteShipping = async () => {
    if (!cart) {
      console.error('No se ha generado un carrito.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/cart', {
        products: cart.products,
      });

      // Verificar el resultado y mostrar el mensaje correspondiente
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

  const handleClearCart = () => {
    localStorage.removeItem('cart');
    setCart(null);
    setShippingQuote('No hay envíos disponibles :(');
  };
  // Inicializa productList como un arreglo vacío
  const [productList, setProductList] = React.useState<any[]>([]);

  // Actualiza productList cuando cart y cart.products cambien
  React.useEffect(() => {
    const updatedProductList =
      cart && cart.products
        ? cart.products.map((product: any) => ({
            title: product.title,
            quantity: product.quantity,
            total: product.total,
            discountedPrice: product.discountedPrice,
            img: product.thumbnail,
          }))
        : [];
    setProductList(updatedProductList);
  }, [cart]);
  const totalProductsQuantity = productList.reduce(
    (acc, product) => acc + product.quantity,
    0
  );

  return (
    <section className='flex flex-col items-center justify-center gap-4 py-8 md:py-10'>
      <div className='inline-block max-w-[25rem] text-center justify-center'>
        <h1 className={title({ color: 'orange' })}>NOMAD&nbsp;</h1>
        <h1 className={title()}>Commerce&nbsp;</h1>
        <div className='flex gap-3'></div>
        <h1 className={title()}>Checkout&nbsp;</h1>
      </div>
      <div className='flex gap-3'></div>
      {cart && cart.products ? (
        <div>
          <h2 className='text-left'>
            🛒 tienes {totalProductsQuantity} productos en el carrito
          </h2>
          <div className='gap-2 grid grid-cols-2 sm:grid-cols-1'>
            {productList.map((item, index) => (
              <Card shadow='sm' key={index}>
                <CardBody className='overflow-visible p-0'>
                  <Image
                    shadow='sm'
                    radius='lg'
                    width='100%'
                    alt={item.title}
                    className='w-full object-cover h-[140px]'
                    src={item.img}
                  />
                </CardBody>
                <CardFooter className='text-small flex-column justify-between'>
                  <div className='text-left'>
                    <b>{item.title}</b>
                    <p className='text-blue-500 '>{item.quantity} Un</p>
                  </div>
                  <div>
                    <p className='text-red-500 line-through'>${item.total}</p>
                    <p className='text-green-500'>${item.discountedPrice}</p>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <p className='text-left'>🛒 No hay productos en el carrito</p>
        </div>
      )}
      <div className='mt-5'></div>
      <div className='flex-direction: row flex gap-3'>
        <div>
          <Popover placement='top' showArrow={true}>
            <PopoverTrigger>
              <Button color='secondary' onClick={handleQuoteShipping}>
                Calcular despacho
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className='px-1 py-2'>
                <div className='text-small font-bold'>{shippingQuote}</div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Button color='secondary' onClick={handleClearCart}>
            Vaciar carrito
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
