import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useGetProductsByCategory } from "../utils/hooks/useGetAllProductsByCategory";
import ProductCard from "../components/ProductCard";
interface Product {
    id: number;
    price: number;
    title: string;
    images: string[];
    discountPercentage: number;
    brand: string;
  }
  
export default function ProductListPage() {
  const isSideBar = useSelector((store: { app: { isSideBar: boolean } }) => store.app.isSideBar);

  const categoryProducts = useSelector(
    (store: { product: { categoryProducts: Record<string, Product[]> } }) => store.product.categoryProducts
  );

  const filteredProducts = useSelector(
    (store: { product: { filteredProducts: Product[] } }) => store.product.filteredProducts
  );

  const [searchParam] = useSearchParams();
  const category = searchParam.get("c");

  // Fetch products based on category
  useGetProductsByCategory(category || "");

  // Retrieve products for the selected category
  const products: Product[] = categoryProducts[category || ""] || [];

  return (
    <div className={isSideBar ? "opacity-40 pointer-events-none" : ""}>
      <div className="flex flex-wrap">
        {/* Render the product list */}
        {products.map((product) => (
          <ProductCard key={product.id} product={product} category={category || ""} />
        ))}
      </div>
    </div>
  );
}
