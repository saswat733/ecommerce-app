import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {  API_ENDPOINTS } from '../../api';
import { addCategoryProducts } from '../store/AllProductsSlice';

export const useGetProductsByCategory = (category: string) => {
  const dispatch = useDispatch();
  const categoryProducts = useSelector((state: any) => state.product.categoryProducts);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINTS.PRODUCTS_BY_CATEGORY}${category}`);
        console.log("api resposne:",response.data.products);
        dispatch(addCategoryProducts({ [category]: response.data.products }));
      } catch (error) {
        console.log('Error fetching products by category:', error);
      }
    };
    getData()
    if (categoryProducts.length === 0) {
      getData();
    }
  }, [category, dispatch, categoryProducts.length]);
};
