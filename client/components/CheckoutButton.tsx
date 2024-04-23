import React from 'react';
import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';

const CheckoutButton: React.FC = () => {
  return (
    <Link href='/checkout'>
      <Button color='secondary'>Finalizar Compra</Button>
    </Link>
  );
};

export default CheckoutButton;
