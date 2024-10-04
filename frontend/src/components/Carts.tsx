import { useSelector } from "react-redux";
import CartItem from "./CartItems";
import { Link, useNavigate } from "react-router-dom";

export default function Carts() {
    const navigate = useNavigate();

    const user = useSelector((store: any) => store.user);
    const cartItems = useSelector((store: any) => store.cart.cartItems);
    const subTotals = useSelector((store: any) => store.cart.subTotals);
    const discounts = useSelector((store: any) => store.cart.discounts);
    console.log(cartItems)
    // Calculate total amount and discount
    const totalAmount = subTotals.reduce((acc: number, curr: number) => acc + curr, 0);
    const totalDiscount = discounts.reduce((acc: number, curr: number) => acc + curr, 0);
    console.log(subTotals)
    // useEffect(() => {
    //     if (!user) {
    //         navigate("/login");
    //     }
    // }, [user, navigate]);

    return (
        <div>
            <h1 className="text-center font-sans uppercase font-bold text-gray-500 text-2xl">Cart</h1>
          {cartItems.length===0?(
            <div className="text-center font-semibold text-2xl py-6">
            <p>Your cart is empty!</p>

            <Link to="/">
              <button className="my-4 text-lg border px-4 py-1.5 bg-green-700 text-white rounded">
                Shop Now
              </button>
            </Link>
          </div>
          ):(
            <div className=" md:flex">
            <div className="flex flex-wrap md:w-6/12">
                {cartItems.map((item: any) => (
                    
                    <CartItem key={item.id} itemDetail={item} />
                   
                ))}
            </div>
            <div className=" mt-1.5 md:w-6/12 lg:mt-0 lg:ml-2 bg-white sticky top-2 h-max">
                <h1 className="font-semibold text-lg px-6 pt-4">PRICE DETAILS</h1>
                <hr className="my-4" />

                <div className="mx-6 font-semibold text-lg">
                    <div className="flex items-center justify-between">
                        <span>{`Price (${cartItems.length} items):`}</span>
                        <span>{"₹" + totalAmount.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex items-center justify-between my-3">
                        <span>Discount</span>
                        <span className="text-green-600">
                            {"- ₹" + totalDiscount.toLocaleString("en-IN")}
                        </span>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                        <span>Delivery Charges</span>
                        <span className="text-green-600">Free</span>
                    </div>

                    <hr />

                    <div className="flex items-center justify-between my-3">
                        <span>Total Amount</span>
                        <span className="text-xl">
                            ₹{(totalAmount - totalDiscount).toLocaleString("en-IN")}
                        </span>
                    </div>

                    <hr />

                    <p className="text-base my-3">
                        You will save{" "}
                        <span className="text-green-600">
                            ₹{totalDiscount.toLocaleString("en-IN")}
                        </span>{" "}
                        on this order
                    </p>
                </div>
                <button className="w-11/12 block mx-auto my-3 py-2 rounded font-semibold bg-red-600 text-white">
                    PLACE ORDER
                </button>
            </div>
            </div>

          )
}
        </div>
    );
}
