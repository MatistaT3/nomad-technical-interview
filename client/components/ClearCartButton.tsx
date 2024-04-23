import React from 'react';
import { Button } from '@nextui-org/button';

interface ClearCartButtonProps {
  onClearCart: () => void;
}

const ClearCartButton: React.FC<ClearCartButtonProps> = ({ onClearCart }) => {
  return (
    <Button color='secondary' onClick={onClearCart}>
      Vaciar carrito
    </Button>
  );
};

export default ClearCartButton;
