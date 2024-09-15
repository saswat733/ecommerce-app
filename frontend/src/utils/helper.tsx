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

// Calculate both the discounted and original price
export const getCalculatedAmount = (price: number, discountPercentage: number): [number, number] => {
  const productPrice = Math.round(price * 85);  // Assuming 85 is a conversion factor
  const discountAmount = Math.round((productPrice * discountPercentage) / 100);
  const discountedPrice = productPrice - discountAmount;
  return [discountedPrice, productPrice];
};

// Sort products by rating (Top rated first)
export const topRates = (products: Product[], dispatch: Dispatch) => {
  const sortedProducts = [...products].sort((a, b) => b.rating - a.rating); // Simplified sorting logic
  dispatch(addFilteredProducts(sortedProducts));
};

// Sort products by price (High to Low)
export const priceHighToLow = (products: Product[], dispatch: Dispatch) => {
  const sortedProducts = [...products].sort((a, b) => {
    const priceA = Math.round(a.price - (a.price * a.discountPercentage) / 100);
    const priceB = Math.round(b.price - (b.price * b.discountPercentage) / 100);
    return priceB - priceA;
  });
  dispatch(addFilteredProducts(sortedProducts));
};

// Sort products by price (Low to High)
export const priceLowToHigh = (products: Product[], dispatch: Dispatch) => {
  const sortedProducts = [...products].sort((a, b) => {
    const priceA = Math.round(a.price - (a.price * a.discountPercentage) / 100);
    const priceB = Math.round(b.price - (b.price * b.discountPercentage) / 100);
    return priceA - priceB;
  });
  dispatch(addFilteredProducts(sortedProducts));
};
