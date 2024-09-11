import { TbTruckReturn } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { addToCart } from "../utils/store/CartSlice";
import { FaRegUser } from "react-icons/fa6";

export default function ProductPageDetailsComponent({ productDetail }: any) {
  const dispatch=useDispatch()
    const handleToCart = () => {
    dispatch(addToCart(productDetail))
    }
  return (
    <>
      <div className=" md:border md:p-10">
        <div className="">
          <div className="">
            {productDetail.rating < 3 && (
              <>
                <span className="bg-red-600 px-2 py-1 rounded-lg">
                  {productDetail.rating}
                </span>
              </>
            )}
            {productDetail.rating > 3 && productDetail.rating < 4 && (
              <>
                <span className="bg-yellow-400 px-2 py-1 rounded-lg">
                  {productDetail.rating}
                </span>
              </>
            )}
            {productDetail.rating > 4 && (
              <>
                <span className="bg-green-500 px-2 py-1 rounded-lg">
                  ★{productDetail.rating}
                </span>
              </>
            )}
          </div>
          <div className="flex gap-2 mt-2">
            {productDetail.tags.map((tag: any, index: number) => (
              <div key={index} className="bg-gray-900 rounded-sm text-white px-1 opacity-15">
                <p>{tag}</p>
              </div>
            ))}
          </div>
          <div className="">
            <h1 className="text-2xl tracking-wide  uppercase font-bold text-zinc-600 font-sans">
              {productDetail.brand}
            </h1>
            <h2 className="tracking-wide">{productDetail.title}</h2>
          </div>
          <div className="">
            <div className="mt-2 ">
              <p className="text-zinc-500 uppercase text-2xl font-semibold">
                mrp<span className="text-black"> ₹{productDetail.price}</span>
              </p>
              <p className="text-xs text-zinc-700">inclusive of all taxes</p>
            </div>

            <div className="">
              <p className="text-sm font-sans text-justify ">
                {productDetail.description}
              </p>
              <div className="flex mt-4 gap-2 text-green-500">
                <p className="flex items-center justify-center gap-2">
                  <TbTruckReturn className="text-2xl" /> {productDetail.returnPolicy}
                </p>
                |
                <p>
                  {productDetail.warrantyInformation}
                </p>

              </div>
            </div>
            <div className="">
              <div className="flex gap-2 mt-4">
                <button onClick={handleToCart} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                  Add to Cart
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
                  Buy Now
                </button>
              </div>
            </div>

            <div className="mt-2">
            <p className="text-2xl tracking-wide">Customer Reviews</p>
              {
                  productDetail.reviews.map((review:any,index:number)=>(
                      <div key={index} className="border flex flex-col gap-2 p-2 my-2">
                          <div className="flex items-center gap-2">
                          <FaRegUser  className=" rounded"/>
                          <p>{review.reviewerName}</p>
                          <div className="">
                            
                            {
                            (review.rating>4 && review.rating<=5) && (
                              <div className="bg-green-600 px-4 rounded-lg">{review.rating}.0</div>
                            )
                            
                            }
                            {
                            (review.rating>3 && review.rating<=4) && (
                              <div className="bg-yellow-600 px-4 rounded-lg">{review.rating}.0</div>
                            )
                            
                            }
                            {
                            review.rating<=3 && (
                              <div className="bg-red-600 px-4 rounded-lg">{review.rating}.0</div>
                            )
                            
                            }
                          </div>
                          </div>
                          <p>{review.comment}</p>
                      </div>
                  ))
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
