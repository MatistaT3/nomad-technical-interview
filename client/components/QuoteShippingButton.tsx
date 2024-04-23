import axios from 'axios';
import React from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/popover';
import { Button } from '@nextui-org/button';

interface QuoteShippingButtonProps {
  cart: any;
  onQuoteShipping: () => void;
  shippingQuote: string | null;
}

const QuoteShippingButton: React.FC<QuoteShippingButtonProps> = ({
  cart,
  onQuoteShipping,
  shippingQuote,
}) => {
  const handleQuoteShipping = async () => {
    onQuoteShipping();
  };

  return (
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
  );
};

export default QuoteShippingButton;
