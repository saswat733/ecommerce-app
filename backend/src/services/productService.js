import axios from 'axios';
import Product from '../models/allProducts.model.js';
import { ALL_PRODUCTS_API } from '../config/apiConstants.js';

export const fetchAndStoreProducts = async () => {
  try {
    const response = await axios.get(ALL_PRODUCTS_API);
    console.log("first:",response);
    const products = response.data.products;

    for (const product of products) {
      const newProduct = new Product({
        title: product.title,
        description: product.description,
        category: product.category,
        price: product.price,
        discountPercentage: product.discountPercentage,
        rating: product.rating,
        stock: product.stock,
        tags: product.tags,
        brand: product.brand,
        sku: product.sku,
        weight: product.weight,
        dimensions: {
          width: product.dimensions.width,
          height: product.dimensions.height,
          depth: product.dimensions.depth,
        },
        warrantyInformation: product.warrantyInformation,
        shippingInformation: product.shippingInformation,
        availabilityStatus: product.availabilityStatus,
        reviews: product.reviews, // Assuming reviews is already structured correctly
        returnPolicy: product.returnPolicy,
        minimumOrderQuantity: product.minimumOrderQuantity,
        meta: {
          createdAt: product.meta.createdAt,
          updatedAt: product.meta.updatedAt,
          barcode: product.meta.barcode,
          qrCode: product.meta.qrCode,
        },
        images: product.images,
        thumbnail: product.thumbnail,
      });

      await newProduct.save();
    }

    console.log('Products saved to the database');
  } catch (error) {
    console.error('Error fetching or saving products:', error);
    throw error;
  }
};


export const getProductsByCategory=async (req,res)=>{
    try {
        const {category}=req.params;
        //query the database for products with the specified category
        const products=await Product.find({category});
        console.log(products)
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