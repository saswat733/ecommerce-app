import { useDispatch } from "react-redux";
import { addFilteredProducts } from "../utils/store/AllProductsSlice";
import { priceHighToLow, priceLowToHigh, topRates } from "../utils/helper";


interface SortOptionsContainerProps {
  products: any;
  filteredProducts: any;
}

export default function SortOptionsContainer({
  products,
  filteredProducts,
}: SortOptionsContainerProps) {
  const dispatch = useDispatch();
    console.log("ge:",products)
  const handleSortProducts = (sortBy: string) => {
    switch (sortBy) {
      case "featured":
        dispatch(addFilteredProducts(products));
        break;
      case "TopRated":
        topRates(filteredProducts, dispatch);
        break;
      case "priceLowToHigh":
        priceLowToHigh(filteredProducts, dispatch);
        break;
      case "priceHighToLow":
        priceHighToLow(filteredProducts, dispatch);
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-white px-2 lg:px-6 py-2 flex items-center justify-between shadow sticky top-0">
      <div className="border w-[160px] sm:w-max px-2 md:px-4 py-1 rounded-full ml-auto text-sm md:text-base">
        <span className="font-semibold">Sort by: </span>
        <select
          name="sort"
          className="outline-none w-[50%] sm:w-max"
          onChange={(e) => handleSortProducts(e.target.value)}
        >
          <option value="featured">Featured</option>
          <option value="TopRated">Top rated</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}
