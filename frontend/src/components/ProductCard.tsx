import { useMemo } from "react";
import { getCalculatedAmount } from "../utils/helper";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../utils/store/CartSlice";

interface ProductCardProps {
    product: {
      id: number;
      price: number;
      title: string;
      images: string[];
      discountPercentage: number;
      brand: string;
    };
    category: string;
  }


export default function ProductCard({ product, category }: ProductCardProps) {
    const dispatch = useDispatch()

    const { id, price, title, images, discountPercentage } = product;
  const [originalPrice, discount] = useMemo(
    () => getCalculatedAmount(price, discountPercentage),
    [price, discountPercentage]
  );

  const handleAddToCart=()=>{
    dispatch(addToCart(product))
  }

  return (
    <div className="w-44 mx-3 flex flex-col items-center">
      <Link to={"/product/" + id}>
        <div className="m-3 relative  rounded-2xl ">
          <div className="w-44 h-52">
            <img
              loading="lazy"
              className="border-2 rounded-xl h-full object-contain w-full "
              src={images[0]}
              alt={title}
            />
          </div>
          <div className="">
            <div className="">
              {category == "Deal of the Day" && (
                <>
                  <p className="uppercase font-thin text-gray-900">
                    {product.brand}
                  </p>
                  <p className="text-sm text-gray-600 font-thin">
                    {title.length > 18 ? title.substr(0, 18) + "..." : title}
                  </p>
                  <p className="text-center text-sm">
                    Up to {discountPercentage}%{" "}
                  </p>
                </>
              )}
              {category === "Brand To Take You Places" && (
                <p className="bg-gray-200 opacity-80 uppercase w-full absolute top-20  flex items-center justify-center text-center">
                  {product.brand}
                </p>
              )}
            </div>
          </div>
        </div>
      </Link>
      <div className="w-full  flex justify-center">
        <button onClick={handleAddToCart} className="border w-full my-1 p-1 uppercase  bg-zinc-800 text-gray-500 rounded-lg ">
          Add To Bag
        </button>
      </div>
    </div>
  );
}
