import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetProductInfo } from "../utils/hooks/useGetProduct";
import ProductImagesCarousel from "./ProductInfoImageCarousel";
import ProductPageDetailsComponent from "./ProductPageDetailsComponent";
import SimilarProductsSuggestions from "./SimilarProductsSuggestions";

export default function ProductDetailsComponent() {
  const productInfo = useSelector((store: any) => store.product.productInfo);

  const params = useParams();
  useGetProductInfo(params.id);

  if (productInfo) {
    console.log(productInfo)
    return( 
    <>
   <div className="mx-5 md:flex mt-10 md:mx-20">
   <ProductImagesCarousel images={productInfo.images}/>
   <ProductPageDetailsComponent productDetail={productInfo}/>
   </div>
    <SimilarProductsSuggestions category={productInfo.category}/>
    </>
    )
  }
}
