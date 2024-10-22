import { useMemo, useState } from "react";
// Removed useDispatch as it's not used
import { getCalculatedAmount } from "../utils/helper";

interface Item {
  price: number;
  discountPercentage: number;
  minimumOrderQuantity: number;
}

interface CartPriceDetailsProps {
  items: {
    items: Item;
  };
}

export default function CartPriceDetails({ items }: CartPriceDetailsProps) {
  const item = items.items;
  console.log("item:", item);

  // Initialize OrderQuantity with the minimum order quantity
  const [orderQuantity] = useState<number>(item.minimumOrderQuantity);

  // Calculate the original price using useMemo
  const [originalPrice] = useMemo(
    () => getCalculatedAmount(item.price, item.discountPercentage),
    [item.price, item.discountPercentage]
  );

  // Calculate subtotal
  const subTotal = orderQuantity * originalPrice;

  return (
    <>
      <div>
        <h1>Price Details</h1>
        <div className="flex justify-between">
          <h1>Total MRP</h1>
          <h1>Rs {subTotal}</h1>
        </div>
        <div className="flex justify-between">
          <h1>Discount on MRP</h1>
          <h1>Rs 200</h1>
        </div>
        <div className="flex justify-between">
          <h1>Convenience Fee</h1>
          <h1>Rs 50</h1>
        </div>
        <div className="flex justify-between">
          <h1>Total Amount</h1>
          <h1>Rs 1850</h1>
        </div>

        <div>
          <button className="bg-red-500 text-white p-2 rounded">Place Order</button>
        </div>
      </div>
    </>
  );
}
