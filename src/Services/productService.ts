import axios from 'axios';

export const productService = {
  getProducts: async (limit: number = 8) => {
    const response = await axios.get(`https://fakestoreapi.com/products?limit=${limit}`);
    const formattedProducts = response.data.map((item: any) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      thumbnail: item.image,
    }));
    return { products: formattedProducts };
  },
};