import { useSelector } from "react-redux";
import { useGetAllProducts } from "../utils/hooks/useGetAllProducts";
import HomePageProductContainer from "./HomePageNormalProductContainer";
import { useGetProductsByCategory } from "../utils/hooks/useGetAllProductsByCategory";
import HomePageSpecialContainer from "./HomePageSpecialProductContainer";

export default function HomeAllProduct() {
  const dealProducts = useSelector((store: any) => store.product.dealProducts);
  console.log("deal Products:",dealProducts)
  const categoryProducts = useSelector((store: any) => store.product.categoryProducts);

  useGetAllProducts();
  useGetProductsByCategory("mens-shirts");
  useGetProductsByCategory("womens-shoes");

  return (
    <>
      {dealProducts && <HomePageProductContainer category="Deal of the Day" product={dealProducts} />}
      {categoryProducts["mens-shirts"] && (
        <HomePageSpecialContainer category="men's shirts" products={categoryProducts["mens-shirts"]} />
      )}
      {categoryProducts["womens-shoes"] && (
        <HomePageProductContainer category="Brand To Take You Places" product={categoryProducts["womens-shoes"]} />
      )}
    </>
  );
}
