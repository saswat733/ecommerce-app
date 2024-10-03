import Product from "../models/allProducts.model.js";
import { fetchAndStoreProducts } from "../services/productService.js";

export const allProducts=async(req,res)=>{
 
    
    try {
        const products=await Product.find({});
        if(!products || products.length===0){
            return res.status(404).json({message:'No products found'});
        }
        res.status(200).json({products});
    } catch (error) {
        res.status(500).json({message:'Error fetching products',error});
    } 
  
}


export const getProductsByCategory=async (req,res)=>{
    try {
        const {category}=req.params;

        //query the database for products with the specified category
        const products=await Product.find({category});

        //if no products found for the specified category
        if(products.length===0||!products){
            return res.status(404).json({message:'No products found for the specified category'});
        }

        //return the found products
        res.status(200).json({products});
    } catch (error) {
        res.status(500).json({message:'Error fetching products',error});
    }
}

export const getSingleProducts=async (req,res)=>{
    try {
        const product=await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({message:'Product not found'});
        }
        res.status(200).json({product});
    } catch (error) {
        res.status(500).json({message:'Error fetching single product',error});
    }
}

export const searchProducts=async (req,res)=>{
    try {
        const {query}=req.params;
        console.log(query)

        if(typeof query!=='string' || query.trim===''){
            return res.status(400).json({message:'Invalid query'});
        }
        const products=await Product.find({
            $or:[
                {title:{$regex:query,$options:'i'}},
                {description:{$regex:query,$options:'i'}},
                {brand:{$regex:query,$options:'i'}},
            ]
        });

        if(!products || products.length===0){
            return res.status(404).json({message:'No products found for the specified query'});
        }

        res.status(200).json({products});
    } catch (error) {
        console.error("Error fetching products",error);
        res.status(500).json({message:'Error fetching products',error:error.message});
    }
}

