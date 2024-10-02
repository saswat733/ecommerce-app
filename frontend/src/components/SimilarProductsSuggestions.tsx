import Slider from "react-slick";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import { useGetProductsByCategory } from "../utils/hooks/useGetAllProductsByCategory";

interface SimilarProductsSuggestionsProps {
  category: string;
}

// Custom Arrow Components
const NextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" stroke="black" height="24" viewBox="0 -960 960 960" width="24">
        <path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z"/>
      </svg>
    </div>
  );
};

const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" stroke="black" height="24" viewBox="0 -960 960 960" width="24">
        <path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z"/>
      </svg>
    </div>
  );
};

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 2,
  variableWidth: true, // Set this to false if you want equal slide widths
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

export default function SimilarProductsSuggestions({ category }: SimilarProductsSuggestionsProps) {
  // Fetching category products from Redux store
  const categoryProducts = useSelector((store: any) => store.product.categoryProducts);

  // Fetch products by category
  useGetProductsByCategory(category);
  
  const products = categoryProducts[category] || []; // Default to empty array if undefined
  
  return (
    <div className="px-3 py-4 my-3 bg-gray-50">
      <h1 className="text-2xl border uppercase font-bold mb-3 text-zinc-700 ">
        similar <span className="text-gray-600">products</span>
      </h1>
      <div>
        <Slider {...settings} className="flex items-center">
          {products.map((product: any) => (
            <ProductCard
              key={product.id}
              product={product}
              category={category}
              flag={true}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
}
