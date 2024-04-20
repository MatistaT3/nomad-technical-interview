import { Request, Response } from 'express';
import axios from 'axios';
import  Product  from '../models/product.models';
import DummyProduct from '../models/dummy-product.models';

export const addToCart = async (req: Request, res: Response) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
      }
    
      const { products }: { products: Product[] } = req.body;
    
      // Hacer solicitud a la API dummyjson para obtener todos los productos
      let allProducts: DummyProduct[] = [];
      try {
        let page = 1;
        let totalPages = 10;
        while (page <= totalPages) {
          const response = await axios.get(`https://dummyjson.com/products?page=${page}&limit=10`);
          const data = response.data;
          allProducts = [...allProducts, ...data.products];
          totalPages = data.totalPages;
          page++;
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
      // Lógica para obtener el nombre, stock y rating de cada producto del carrito
  const productsDetails = products.map((product) => {
    const dummyProduct = allProducts.find((dp) => dp.id === product.productId);
    if (dummyProduct) {
      const stock = dummyProduct.stock;
      const rating = dummyProduct.rating;
      const stockReal = Math.floor(stock / rating);
      return {
        productId: product.productId,
        name: dummyProduct.name,
        price: product.price,
        discount: product.discount,
        quantity: product.quantity,
        stock,
        rating,
        stockReal,
      };
    } else {
      // Manejar el caso en el que el producto no se encuentre en dummyjson
      return {
        productId: product.productId,
        name: 'Producto no encontrado',
        price: product.price,
        discount: product.discount,
        quantity: product.quantity,
        stock: 0,
        rating: 0,
        stockReal: 0,
      };
    }
  });
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
    // Verificar si el carrito puede ser recibido por Nomad
  let canReceiveCart = true;
  productsDetails.forEach((product) => {
    if (product.stockReal < product.quantity) {
      canReceiveCart = false;
    }
  });
  if (!canReceiveCart) {
    return res.status(400).json({ message: 'No hay suficiente stock para completar la compra' });
  } else {
  res.status(200).json({ message: 'Productos recibidos correctamente' });
  }
  };