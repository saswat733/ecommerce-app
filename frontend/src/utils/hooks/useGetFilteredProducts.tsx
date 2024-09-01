import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFilteredProducts } from "../store/AllProductsSlice";

export const useGetFilteredProducts = (products: any) => {
  const dispatch = useDispatch();

  const filters = useSelector((store: any) => store.product.filters);

  useEffect(() => {
    if (products && products.length > 0) {
      const filtered = products
        .filter(
          (product: any) =>
            Math.round(product.price * 85) -
              (Math.round(product.price * 85) *
                Math.round(product.discountPercentage * 3)) /
                100 <= filters.price
        )
        .filter((product: any) => {
          if (filters.brands.length > 0) {
            return filters.brands.includes(product.brand);
          }
          return true;
        })
        .filter((product: any) => {
          if (filters.discounts.length > 0) {
            return filters.discounts.some(
              (discount: any) =>
                discount < Math.round(product.discountPercentage * 3)
            );
          }
          return true;
        })
        .filter((product: any) => {
          if (filters.ratings.length > 0) {
            return filters.ratings.some(
              (rating: any) => rating <= Math.round(product.rating)
            );
          }
          return true;
        });

      // Dispatch filtered products immediately
      dispatch(addFilteredProducts(filtered));
    }
  }, [products, filters, dispatch]);
};
