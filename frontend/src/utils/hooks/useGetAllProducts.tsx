import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ALL_PRODUCTS_API, API_ENDPOINTS } from "../../api";
import { addDealProducts } from "../store/AllProductsSlice";

export const useGetAllProducts = () => {
  const dealProducts = useSelector((state:any) => state.product.dealProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`${ALL_PRODUCTS_API}/`);
        console.log("All Products:", res.data.products);
        dispatch(addDealProducts(res.data.products));
        console.log(res)
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (dealProducts.length === 0) {
      getData();
    }
  }, [dealProducts, dispatch]);
};
