import { Dispatch } from "@reduxjs/toolkit";
import { addFilteredProducts } from "./store/AllProductsSlice";

interface Product {
  id: number;
  price: number;
  title: string;
  images: string[];
  discountPercentage: number;
  brand: string;
  rating: number;
}

export const getCalculatedAmount = (price: number, discountPercentage: number): number[] => {
  const productPrice = Math.round(price * 85);
  const discount = Math.round(discountPercentage * 10);
  const originalPrice = Math.round(productPrice - (productPrice * discount) / 100);
  return [originalPrice];
};

export const topRates = (products: Product[], dispatch: Dispatch) => {
  const newProducts = [...products];
  dispatch(addFilteredProducts(newProducts.sort((a, b) => (a.rating < b.rating ? 1 : -1))));
};

export const priceHighToLow = (products: Product[], dispatch: Dispatch) => {
  const newProducts = [...products];
  dispatch(
    addFilteredProducts(
      newProducts.sort((a, b) => {
        const priceA = Math.round(a.price) - Math.round(a.price * a.discountPercentage / 100);
        const priceB = Math.round(b.price) - Math.round(b.price * b.discountPercentage / 100);

        return priceA < priceB ? 1 : -1;
      })
    )
  );
};

export const priceLowToHigh = (products: Product[], dispatch: Dispatch) => {
  const newProducts = [...products];
  dispatch(
    addFilteredProducts(
      newProducts.sort((a, b) => {
        const priceA = Math.round(a.price * 85) - (Math.round(a.price * 85) * Math.round(a.discountPercentage * 3)) / 100;
        const priceB = Math.round(b.price * 85) - (Math.round(b.price * 85) * Math.round(b.discountPercentage * 3)) / 100;

        return priceA < priceB ? -1 : 1;
      })
    )
  );
};
