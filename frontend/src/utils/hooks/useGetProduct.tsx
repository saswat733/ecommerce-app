import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SINGLE_PRODUCT_API } from "../../api";
import { addProductInfo } from "../store/AllProductsSlice";

export const useGetProductInfo = (id:any) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!id) return;

    const getData = async () => {
      try {
        const response = await axios.get(`${SINGLE_PRODUCT_API}${id}`);
        console.log(response);
        dispatch(addProductInfo(response.data));
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    getData();
  }, [id, dispatch]);
};
