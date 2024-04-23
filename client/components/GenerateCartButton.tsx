import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Button } from '@nextui-org/button';
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/popover';
import { CartContext } from './CartContext';

const GenerateCartButton: React.FC = () => {
  const { setCart } = useContext(CartContext);
  const [cartMessage, setCartMessage] = useState<string | null>(null);

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
      setCartMessage(`Carrito generado con éxito! :D`);
    } catch (error) {
      console.error('Error al generar el carrito:', error);
      setCartMessage(`Error al generar el carrito`);
    }
  };

  return (
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
  );
};

export default GenerateCartButton;
