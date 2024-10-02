import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { getCalculatedAmount } from "../utils/helper";

export default function CartPriceDetails(items:any){
    const item = items.items;
    console.log("item:",item)
    const dispatch = useDispatch(); // Create dispatch instance
    const [OrderQuantity, setOrderQuantity] = useState(
      item.minimumOrderQuantity
    );
    
    const [originalPrice] = useMemo(
      () => getCalculatedAmount(item.price, item.discountPercentage),
      [item.price, item.discountPercentage]
    );
  
   
    const subTotal=OrderQuantity*originalPrice;
  
    return (
        <>
            <div className="">
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

                <div className="">
                    <button className="bg-red-500 text-white p-2 rounded">Place Order</button>
                </div>
            </div>
        </>
    )
}