import axios from 'axios';

const DUMMY_API_URL = 'https://dummyjson.com/products';

export const fetchProductsFromApi = async (): Promise<any[]> => {
  try {
    let productsInStore: any[] = [];
    let page = 1;
    let totalPages = 1;
    while (page <= totalPages) {
      const response = await axios.get(
        `${DUMMY_API_URL}?page=${page}&limit=100`
      );
      const data = response.data;
      productsInStore = [...productsInStore, ...data.products];
      totalPages = data.totalPages;
      page++;
    }
    return productsInStore;
  } catch (error) {
    throw new Error('Error fetching products from API');
  }
};
