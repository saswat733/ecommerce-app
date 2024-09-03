import BrandSection from "./BrandSection";
import DiscountSection from "./DiscountSection";
import PriceSection from "./PriceSection";
import RatingSection from "./RatingSection";

export default function ShowFiltersComponents(product:any,query:any){
    console.log(query)
    const brands=product["product"].map((product:any)=>product.brand)
    console.log(brands)
    const prices=product["product"].map((product:any)=>product.price)

    const maxPrice=Math.max(...prices);
    
    return (
        <>
         <div className="">
            <h1>Filters</h1>
            <div className="">
                <PriceSection maxPrice={maxPrice}/>
            </div>
            <div className="">
                <BrandSection brandName={query}/>
            </div>
            <div className="">
                <DiscountSection/>
            </div>
            <div className="">
                <RatingSection/>
            </div>
        </div>   
        </>
    )
}