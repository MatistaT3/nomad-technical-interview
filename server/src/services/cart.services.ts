import Items from '../models/items.models';
import ProductDetails from '../models/product-details.models';
import ProductInStore from '../models/product-in-store.models';
import { fetchProductsFromApi } from './api.services';

export const processCart = async (items: Items[]): Promise<any[]> => {
  const productsInStore = await fetchProductsFromApi();
  return items.map((product) => {
    const productInStore: ProductInStore = productsInStore.find(
      (dp) => dp.id == product.productId
    );
    return productInStore
      ? {
          productId: product.productId,
          name: productInStore.title,
          price: product.price,
          discount: product.discount,
          quantity: product.quantity,
          stock: productInStore.stock,
          rating: productInStore.rating,
          stockReal: Math.floor(productInStore.stock / productInStore.rating),
        }
      : {
          productId: product.productId,
          name: 'Producto no encontrado',
          price: product.price,
          discount: product.discount,
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
