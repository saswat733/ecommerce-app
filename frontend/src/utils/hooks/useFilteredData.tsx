import { getCalculatedAmount } from "../helper";

export const useFilteredData=(products:any)=>{
    if(products){
        return products.map((product:any)=>{
            return getCalculatedAmount(product.price,product.discountPercentage);
        })
    }
}