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
    flag:boolean
  }


export default function ProductCard({ product, category,flag }: ProductCardProps) {
    const dispatch = useDispatch()

    const { id, price, title, images, discountPercentage } = product;
  const [] = useMemo(
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
              {flag==true && (
                <p className="bg-green-400 gap-2 opacity-80 uppercase w-full absolute top-20  flex items-center justify-center text-center">
                  <span className="">discount</span>
                  {product.discountPercentage}%
                </p>
              )}
              
            </div>
          </div>
        </div>
      </Link>
      <div className="w-full  flex flex-col justify-center">
        <button onClick={handleAddToCart} className="border w-full my-1 p-1 uppercase  bg-zinc-800 text-gray-500 rounded-lg ">
          Add To Bag
        </button>
        {
          flag==true && (
            <button className="border-gray-600 border-2 w-full my-1 p-1 uppercase  text-gray-500 rounded-lg ">
              Buy Now
            </button>
          )
        }
      </div>
    </div>
  );
}
