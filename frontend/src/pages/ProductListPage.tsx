import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useGetProductsByCategory } from "../utils/hooks/useGetAllProductsByCategory";
import ProductCard from "../components/ProductCard";
import { useGetFilteredProducts } from "../utils/hooks/useGetFilteredProducts";
import { useEffect, useState, useCallback, useMemo } from "react";
import { addBrandFilter, addDiscountFilter, addPriceFilter, addRatingFilter } from "../utils/store/AllProductsSlice";
import SortOptionsContainer from "../components/SortOptionsContainer";
import { CiFilter } from "react-icons/ci";
import ShowFiltersComponents from "../components/ShowFiltersComponents";
import { useGetProductByQuery } from "../utils/hooks/useGetProductByQuery";

// Define the Product interface
interface Product {
  id: number;
  price: number;
  title: string;
  images: string[];
  discountPercentage: number;
  brand: string;
  rating: number;
}

export default function ProductListPage() {
  const dispatch = useDispatch();
  const [showFilters, setShowFilters] = useState(false);

  // Selector for isSideBar
  const isSideBar = useSelector((store: any) => store.app.isSideBar);

  // Selector for categoryProducts
  const categoryProducts = useSelector((store: any) => store.product.categoryProducts);

  // Selector for filteredProducts
  const filteredProducts = useSelector((store: any) => store.product.filteredProducts);

  // Get the category from the URL search params
  const [searchParams] = useSearchParams();
  const category = searchParams.get("c");
  const query = searchParams.get("q");

  

  // Fetch products based on category
  useGetProductsByCategory(category || "");
  useGetProductByQuery(query || "");
  // Retrieve products for the selected category
  const products: Product[] = useMemo(() => {
    if (query && category) {
      // Prioritize query over category if both are present
      return categoryProducts[query] || [];
    }
    return categoryProducts[category || ""] || [];
  }, [categoryProducts, category, query]);
  console.log("pro:",products)

  // Memoize the filter application
  const applyFilters = useCallback(() => {
    dispatch(addPriceFilter(Infinity));
    dispatch(addBrandFilter(""));
    dispatch(addDiscountFilter(0));
    dispatch(addRatingFilter(0));
  }, [dispatch]);

  // Apply filters to products
  useGetFilteredProducts(products);

  // Manage body overflow based on sidebar visibility and filters
  useEffect(() => {
    document.body.style.overflow = isSideBar || showFilters ? "hidden" : "auto";
  }, [isSideBar, showFilters]);

  // Reset filters when products or category changes
  useEffect(() => {
    if (products.length === 0) return; // Prevent resetting filters if products are not loaded yet

    applyFilters();
  }, [category, products, applyFilters]);

  // Avoid rendering issues when products are not yet available
  if (!products) return null;

  return (
    <div className={isSideBar ? "opacity-40 pointer-events-none" : ""}>
      <div className="">
        {/* Display SortOptionsContainer when there are products */}
        {products.length > 0 && (
          <SortOptionsContainer products={products} filteredProducts={filteredProducts} />
        )}
      </div>

      <div className="">
        {/* Display filter button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="bg-gray-800 text-white px-4 py-2 rounded-md"
        >
          {showFilters ? (<div>Hide filters</div>) :  (<div>Show filters</div>)}
        </button>
      </div>
      {
        showFilters && (
          <>
          <ShowFiltersComponents product={products} query={query}/>
          </>
        )
      }
      <div className="flex flex-wrap">
        {/* Render the filtered product list */}
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} category={category || ""} />
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
}
