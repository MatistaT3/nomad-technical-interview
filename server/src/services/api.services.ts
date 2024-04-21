import axios from 'axios';

const DUMMY_API_URL = 'https://dummyjson.com/products';

export const fetchProductsFromApi = async (): Promise<any[]> => {
  try {
    let allProducts: any[] = [];
    let page = 1;
    let totalPages = 1;
    while (page <= totalPages) {
      const response = await axios.get(
        `${DUMMY_API_URL}?page=${page}&limit=10`
      );
      const data = response.data;
      allProducts = [...allProducts, ...data.products];
      totalPages = data.totalPages;
      page++;
    }
    return allProducts;
  } catch (error) {
    throw new Error('Error fetching products from API');
  }
};
