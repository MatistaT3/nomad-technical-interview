import Product from '../models/product.models';
import ProductDetails from '../models/product-details.models';
import DummyProduct from '../models/dummy-product.models';
import { fetchProductsFromApi } from './api.services';

export const processCart = async (products: Product[]): Promise<any[]> => {
  const allProducts = await fetchProductsFromApi();
  const productsDetails = products.map((product) => {
    const dummyProduct: DummyProduct = allProducts.find(
      (dp) => dp.id == product.productId
    );
    if (dummyProduct) {
      const stock = dummyProduct.stock;
      const rating = dummyProduct.rating;
      const stockReal = Math.floor(stock / rating);
      const name = dummyProduct.title;
      return {
        productId: product.productId,
        name,
        price: product.price,
        discount: product.discount,
        quantity: product.quantity,
        stock,
        rating,
        stockReal,
      };
    } else {
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
  return productsDetails;
};

export const checkCartAvailability = (
  productsDetails: ProductDetails[]
): boolean => {
  return productsDetails.every(
    (product) => product.stockReal >= product.quantity
  );
};
