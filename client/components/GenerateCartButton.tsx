import React from 'react';
import { Button } from '@nextui-org/button';
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/popover';

interface GenerateCartButtonProps {
  onGenerateCart: () => void;
  cartMessage: any;
}
const GenerateCartButton: React.FC<GenerateCartButtonProps> = ({
  onGenerateCart,
  cartMessage,
}) => {
  return (
    <Popover placement='bottom' showArrow={true}>
      <PopoverTrigger>
        <Button color='secondary' onClick={onGenerateCart}>
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
