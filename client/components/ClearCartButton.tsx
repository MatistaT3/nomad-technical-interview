import React from 'react';
import { Button } from '@nextui-org/button';
import Link from 'next/link';

interface ClearCartButtonProps {
  onClearCart: () => void;
}

const ClearCartButton: React.FC<ClearCartButtonProps> = ({ onClearCart }) => {
  return (
    <Link href='/'>
      <Button color='secondary' onClick={onClearCart}>
        Vaciar carrito
      </Button>
    </Link>
  );
};

export default ClearCartButton;
