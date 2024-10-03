import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import SubHeaderComponent from "./SubHeader";
import { useSelector } from "react-redux";
import CategorySideBar from "./CategorySideBar";
import SearchComponent from "./SearchCompnent";
import { useState } from "react";

export default function HeaderComponent() {
  
  const [success, setsuccess] = useState(false)
  const token=localStorage.getItem('token')

  
  

  // Select sidebar visibility and cart items from the Redux store
  const isSideBar = useSelector((store: any) => store.app.isSideBar);
  const cartItems = useSelector((store: any) => store.cart.cartItems);

  return (
    <>
      <div className="bg-zinc-950 text-gray-400">
      <div className="flex justify-between items-center p-2">
      <div>
          <h1 className="text-center md:text-3xl font-bold">SHOPPERS STOP</h1>
        </div>
        <div className="flex md:text-lg justify-between md:my-2 p-2">
          <div className="gap-4 flex items-center">
            {/* Cart Icon with Items Count */}
            <Link to="/cart">
              <div className="relative">
                <FaCartShopping className="text-2xl md:text-3xl" />
                {cartItems.length > 0 && (
                  <div className="bg-red-700 p-2 rounded-full h-6 w-6 absolute left-2 bottom-4 md:left-4 md:bottom-5">
                    <span className="absolute bottom-[1px] text-xs">{cartItems.length}</span>
                  </div>
                )}
              </div>
            </Link>

            {/* Login Button */}
            <Link to="/login">
              <button className="border py-1 px-1 md:px-2 rounded-md">Login</button>
            </Link>
          </div>
        </div>
      </div>
      </div>

      {/* Search Component */}
      <SearchComponent />

      {/* Sub Header Component */}
      <SubHeaderComponent />

      {/* Sidebar Toggle */}
      {isSideBar && <CategorySideBar />}
    </>
  );
}
