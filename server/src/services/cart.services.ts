import Products from '../models/products.models';
import ProductDetails from '../models/product-details.models';
import ProductInStore from '../models/product-in-store.models';
import { fetchProductsFromApi } from './api.services';

export const processCart = async (products: Products[]): Promise<any[]> => {
  const productsInStore = await fetchProductsFromApi();
  return products.map((product) => {
    const productInStore: ProductInStore = productsInStore.find(
      (dp) => dp.id == product.id
    );
    return productInStore
      ? {
          productId: product.id,
          name: productInStore.title,
          price: product.price,
          discount: product.discountPercentage,
          quantity: product.quantity,
          stock: productInStore.stock,
          rating: productInStore.rating,
          stockReal: Math.floor(productInStore.stock / productInStore.rating),
        }
      : {
          productId: product.id,
          name: 'Producto no encontrado',
          price: product.price,
          discount: product.discountPercentage,
          quantity: product.quantity,
          stock: 0,
          rating: 0,
          stockReal: 0,
        };
  });
};

export const checkCartAvailability = (
  productDetails: ProductDetails[]
): boolean => {
  return productDetails.every(
    (product) => product.stockReal >= product.quantity
  );
};
