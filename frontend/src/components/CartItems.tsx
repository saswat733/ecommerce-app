import { useMemo, useState } from "react";
import { useDispatch } from "react-redux"; // Import useDispatch
import { getCalculatedAmount } from "../utils/helper";
import { removeCartItem } from "../utils/store/CartSlice";

export default function CartItem(itemDetail: any) {
  const item = itemDetail.itemDetail;
  const dispatch = useDispatch(); // Create dispatch instance
  const [OrderQuantity, setOrderQuantity] = useState(
    itemDetail.itemDetail.minimumOrderQuantity
  );
  
  const [originalPrice] = useMemo(
    () => getCalculatedAmount(item.price, item.discountPercentage),
    [item.price, item.discountPercentage]
  );

  // Handle removing the cart item
  const handleRemove = () => {
    dispatch(removeCartItem(item.id)); // Dispatch the action with item id
  };

  const subTotal=OrderQuantity*originalPrice;

  return (
    <>
      <div className="border p-2 m-2 w-full flex">
        <div className="w-2/5">
          <img
            src={itemDetail.itemDetail.images[0]}
            alt=""
            className="w-full mb-5 mr-10 h-40 object-cover"
          />
          <div className="flex justify-between mx-auto w-32 border-2 border-gray-400">
            <button
              className="border-2 p-1 w-10"
              onClick={() => setOrderQuantity(OrderQuantity - 1)}
              disabled={OrderQuantity <= item.minimumOrderQuantity} // Prevent quantity below minimum
            >
              -
            </button>
            <span>{OrderQuantity}</span>
            <button
              className="border-2 p-1 w-10"
              onClick={() => setOrderQuantity(OrderQuantity + 1)}
            >
              +
            </button>
          </div>
        </div>
        <div className="flex w-full justify-start flex-col">
          <div className="flex justify-between  ">
            <h1 className="font-bold">{itemDetail.itemDetail.title}</h1>
            <button 
              className="text-red-500 font-semibold" 
              onClick={handleRemove} // Attach handleRemove function
            >
              Remove
            </button>
          </div>
          <div className="flex justify-start border flex-col ">
            <div className="flex flex-col justify-start ">
              <h2 className="font-semibold text-zinc-700 font-sans">
                {item.brand}
              </h2>
              <h4 className="text-md font-bold">&#8377;{originalPrice}</h4>
              <h4 className="text-sm font-bold text-red-700">
                {item.discountPercentage}% off
              </h4>
            </div>
            <div className="flex gap-2 flex-col">
              <h4 className="text-sm font-bold">
                Minimum Order Quantity: {OrderQuantity}
              </h4>
            </div>
            <div className="">
              <h4>Subtotal ({OrderQuantity}) items: {subTotal} </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
