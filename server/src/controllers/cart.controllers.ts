import { Request, Response } from 'express';
import { processCart, checkCartAvailability } from '../services/cart.services';
import Products from '../models/products.models';

export const addToCart = async (req: Request, res: Response) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { products }: { products: Products[] } = req.body;
  try {
    const productsDetails = await processCart(products);

    // Imprimir en consola los detalles del carrito recibido
    console.log('Detalles del carrito recibido:');
    productsDetails.forEach((product) => {
      console.log(`
      ID: ${product.productId}
      Nombre: ${product.name}
      Precio por unidad: ${product.price}
      Descuento total: ${product.discount}
      Cantidad solicitada: ${product.quantity}
      Stock obtenido: ${product.stock}
      Rating: ${product.rating}
      Stock real: ${product.stockReal}
    `);
    });
    const canReceiveCart = checkCartAvailability(productsDetails);

    if (!canReceiveCart) {
      return res.status(400).json({
        message: 'No hay suficiente stock para completar la compra',
        response: { canReceiveCart },
      });
    } else {
      res.status(200).json({
        message: 'Productos recibidos correctamente',
        response: { canReceiveCart },
      });
    }
  } catch (error) {
    console.error('Error processing cart:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
