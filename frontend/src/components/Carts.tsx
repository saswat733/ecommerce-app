import { useSelector } from "react-redux"
import CartItem from "./CartItems"

export default function Carts(){
//     Object { id: 121, title: "iPhone 5s", description: "The iPhone 5s is a classic smartphone known for its compact design and advanced features during its release. While it's an older model, it still provides a reliable user experience.", … }
// ​​
// availabilityStatus: "In Stock"
// ​​
// brand: "Apple"
// ​​
// category: "smartphones"
// ​​
// description: "The iPhone 5s is a classic smartphone known for its compact design and advanced features during its release. While it's an older model, it still provides a reliable user experience."
// ​​
// dimensions: Object { width: 8.49, height: 25.34, depth: 18.12 }
// ​​
// discountPercentage: 11.85
// ​​
// id: 121
// ​​
// images: Array(3) [ "https://cdn.dummyjson.com/products/images/smartphones/iPhone%205s/1.png", "https://cdn.dummyjson.com/products/images/smartphones/iPhone%205s/2.png", "https://cdn.dummyjson.com/products/images/smartphones/iPhone%205s/3.png" ]
// ​​
// meta: Object { createdAt: "2024-05-23T08:56:21.625Z", updatedAt: "2024-05-23T08:56:21.625Z", barcode: "2903942810911", … }
// ​​
// minimumOrderQuantity: 2
// ​​
// price: 199.99
// ​​
// rating: 3.92
// ​​
// returnPolicy: "No return policy"
// ​​
// reviews: Array(3) [ {…}, {…}, {…} ]
// ​​
// shippingInformation: "Ships in 1 week"
// ​​
// sku: "AZ1L68SM"
// ​​
// stock: 65
// ​​
// tags: Array [ "smartphones", "apple" ]
// ​​
// thumbnail: "https://cdn.dummyjson.com/products/images/smartphones/iPhone%205s/thumbnail.png"
// ​​
// title: "iPhone 5s"
// ​​
// warrantyInformation: "1 week warranty"
// ​​
// weight: 4
// ​​
// <prototype>: Object { … }
    const cartItems=useSelector((store:any)=>store.cart.cartItems)
   console.log("cart:",cartItems)
    return (
        <div>
            <h1>Cart</h1>
            <div className="flex flex-wrap">
                {cartItems.map((item:any)=>(
                    <CartItem itemDetail={item} />
                ))}
            </div>
        </div>
    )
}