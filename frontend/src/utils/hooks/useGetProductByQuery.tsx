import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SEARCH_PRODUCT_API } from "../../api";
import { addCategoryProducts } from "../store/AllProductsSlice";

// Define the type for the query parameter
type Query = any;

// Define the type for the response data structure
type Product=any

interface ApiResponse {
  products: Product[];
}

export const useGetProductByQuery = (query: Query): void => {
  const dispatch = useDispatch();

  // Use the RootState type to ensure type safety
  const categoryProducts = useSelector((store: any) => store.product.categoryProducts);

  useEffect(() => {
    const getData = async () => {
      try {
        // Fetch the product data from the API
        const res = await axios.get<ApiResponse>(`${SEARCH_PRODUCT_API}${query}`);
        
        // Dispatch the data to the store with the correct type
        dispatch(addCategoryProducts({ [query]: res.data.products }));
      } catch (error) {
        console.error("Error fetching product data:", error);
        // Handle error (optional: dispatch an error action or show an error message)
      }
    };

    // Check if the products for this query are already in the store
    if (!Object.prototype.hasOwnProperty.call(categoryProducts, query)) {
      getData();
    }
  }, [query, categoryProducts, dispatch]);
};
