import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux"; 
import { getCalculatedAmount } from "../utils/helper";
import { addDiscounts, addSubTotalsWithoutDiscount, removeCartItem } from "../utils/store/CartSlice";

// Define the type for the item prop (you can adjust it based on your data structure)
interface ItemDetail {
  id: number;
  title: string;
  brand: string;
  price: number;
  discountPercentage: number;
  availabilityStatus: string;
  minimumOrderQuantity: number;
  images: string[];
}

interface CartItemProps {
  itemDetail: ItemDetail;
}

export default function CartItem({ itemDetail }: CartItemProps) {
  const item = itemDetail;
  const dispatch = useDispatch(); 
  const [orderQuantity, setOrderQuantity] = useState(item.minimumOrderQuantity);
  const [subtotal, setSubtotal] = useState(0);

  // Calculate discount and original price using useMemo
  const [originalPrice, discountPrice] = useMemo(
    () => getCalculatedAmount(item.price, item.discountPercentage),
    [item.price, item.discountPercentage]
  );

  // Update subtotal and dispatch discount actions
  useEffect(() => {
    setSubtotal(orderQuantity * originalPrice);
    
    // Dispatch subtotal without discount
    dispatch(
      addSubTotalsWithoutDiscount({
        index: item.id,
        price: orderQuantity * Math.round(item.price * 85),
      })
    );

    // Dispatch discount calculation
    dispatch(
      addDiscounts({
        index: item.id,
        discount:
          orderQuantity * Math.round(item.price * 85) -
          orderQuantity * originalPrice,
      })
    );
  }, [orderQuantity, originalPrice, dispatch, item.id, item.price]);

  // Handle removing the cart item
  const handleRemove = () => {
    dispatch(removeCartItem(item.id)); 
  };

  return (
    <div className="border p-2 m-2 w-full flex">
      <div className="w-2/5">
        <img
          src={item.images[0]}
          alt={item.title}
          className="w-full mb-5 mr-10 h-40 object-contain"
        />
        <div className="flex justify-between mx-auto w-32 border-2 border-gray-400">
          <button
            className="border-2 p-1 w-10"
            onClick={() => setOrderQuantity(orderQuantity - 1)}
            disabled={orderQuantity <= item.minimumOrderQuantity}
          >
            -
          </button>
          <span>{orderQuantity}</span>
          <button
            className="border-2 p-1 w-10"
            onClick={() => setOrderQuantity(orderQuantity + 1)}
          >
            +
          </button>
        </div>
      </div>

      <div className="flex w-full justify-start flex-col">
        <div className="flex justify-between">
          <h1 className="font-bold">{item.title}</h1>
          <button 
            className="text-red-500 font-semibold" 
            onClick={handleRemove}
          >
            Remove
          </button>
        </div>

        <div className="flex justify-start border flex-col">
          <div className="flex flex-col justify-start">
            <h2 className="font-semibold text-zinc-700">{item.brand}</h2>
            <h4 className="text-md font-bold">
              &#8377;{discountPrice.toLocaleString("en-IN")} 
              <span className="text-gray-600 text-sm line-through ml-2">
                &#8377;{originalPrice.toLocaleString("en-IN")}
              </span>
            </h4>
            <h4 className="text-sm font-bold text-red-700">
              {item.discountPercentage}% off
            </h4>
          </div>

          <div className="flex gap-2 flex-col">
            <h4 className="text-sm font-bold">
              Minimum Order Quantity: {item.minimumOrderQuantity}
            </h4>
          </div>

          <div>
            <h4>
              Subtotal ({orderQuantity} items): &#8377;
              {subtotal.toLocaleString("en-IN")}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
