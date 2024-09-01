import { TiThMenuOutline } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { toggleSideBar } from "../utils/store/appSlice";

export default function SubHeaderComponent(){
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const handleOnclick = (category:string) => {
        navigate(`/products/search?c=${category}`);
    }
    const subLinks=["smartphones","sports-accessories","sunglasses","mens-watches","clothes"];
    return (
        <>
        <div className="flex items-center gap-4 px-4 bg-gray-100">
            <div onClick={()=>dispatch(toggleSideBar())} className="">
            <TiThMenuOutline className="text-xl text-zinc-800 cursor-pointer"/>
            </div>
        <ul className="flex ">
           <li data-value="smartphones" onClick={()=>handleOnclick(subLinks[0])} className="cursor-pointer mr-4">Mobiles</li>
           <li data-value="sports-accessories" onClick={()=>handleOnclick(subLinks[1])} className="cursor-pointer mr-4">Sports</li>
           <li data-value="sunglasses" onClick={()=>handleOnclick(subLinks[2])} className="cursor-pointer mr-4">Sunglases</li>
           <li data-value="mens-watches" onClick={()=>handleOnclick(subLinks[3])} className="cursor-pointer mr-4">Watches</li>
           <li data-value="clothes" onClick={()=>handleOnclick(subLinks[4])} className="cursor-pointer mr-4">Clothes</li>
        </ul>
        </div>
        </>
    )
}