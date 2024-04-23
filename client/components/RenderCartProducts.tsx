import React from 'react';
import { Card, CardBody, CardFooter } from '@nextui-org/card';
import { Image } from '@nextui-org/image';

interface RenderCartProductsProps {
  cart: any;
}

const RenderCartProducts: React.FC<RenderCartProductsProps> = ({ cart }) => {
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

  const totalProductsPrice = productList.reduce(
    (acc, product) => acc + product.discountedPrice,
    0
  );

  return (
    <div>
      {cart && cart.products ? (
        <div>
          <h2 className='text-left'>
            🛒 Tienes {totalProductsQuantity} productos en el carrito
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
          <div className='mt-2'></div>
          <Card>
            <CardBody>
              <p>💸 El total del carrito es: ${totalProductsPrice}</p>
            </CardBody>
          </Card>
        </div>
      ) : (
        <div>
          <p className='text-left'>🛒 No hay productos en el carrito</p>
        </div>
      )}
    </div>
  );
};

export default RenderCartProducts;
