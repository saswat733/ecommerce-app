import { FaCartShopping } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import SubHeaderComponent from "./SubHeader";
import { useSelector } from "react-redux";
import CategorySideBar from "./CategorySideBar";
import SearchComponent from "./SearchCompnent";

export default function HeaderComponent() {
  
  
  const localTime = new Date().getHours();
  if (localTime >= 1 && localTime < 12) {
    var GreetingMessage = "Good Morning";
  } else if (localTime >= 12 && localTime < 17) {
    var GreetingMessage = "Good Afternoon";
  } else if (localTime >= 17 && localTime < 21) {
    var GreetingMessage = "Good Evening";
  } else {
    var GreetingMessage = "Good Night";
  }
  const isSideBar = useSelector((store:any) => store.app.isSideBar);
  const cartItems=useSelector((store:any)=>store.cart.cartItems)
  console.log(cartItems)
  return (
    <>
      <div className="bg-zinc-950 text-gray-400">
        <div className="">
          <h1 className=" text-center md:text-3xl font-bold">SHOPPERS STOP</h1>
        </div>
        <div className="flex md:text-lg justify-between md:my-2 p-2">
          <h1>Hello, {GreetingMessage}</h1>
          <div className="gap-4 flex items-center ">
            <Link to={'/cart'}>
            <div className="relative">
              <FaCartShopping className="text-2xl md:text-3xl" />
              <div className="bg-red-700 p-2 rounded-full h-6 w-6 absolute left-2 bottom-4 md:left-4 md:bottom-5 ">
                <span className="absolute bottom-[1px] ">{cartItems.length}</span>
              </div>
            </div>
            </Link>

            <Link to={'/login'}>
                <button className="border py-1 px-1 md:px-2 rounded-md ">Login</button>
            </Link>
          </div>
        </div>
      </div>
      <SearchComponent/>

      <SubHeaderComponent/>

      {isSideBar && <CategorySideBar/>}
    </>
  );
}
