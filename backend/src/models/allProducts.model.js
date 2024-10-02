import mongoose from 'mongoose'

const reviewSchema= new mongoose.Schema({
    rating:{
        type:Number,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    reviewerName:{
        type:String,
        required:true
    },
    reviewerEmail:{
        type:String,
        required:true
    },
})

const metaSchema=new mongoose.Schema({
    createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
  barcode: { type: String, required: true },
  qrCode: { type: String, required: true },
})

const dimensionsSchema=new mongoose.Schema({
    width: { type: Number, required: true },
  height: { type: Number, required: true },
  depth: { type: Number, required: true },
})

const productSchema=new mongoose.Schema({
    title: { type: String },
  description: { type: String },
  category: { type: String },
  price: { type: Number},
  discountPercentage: { type: Number },
  rating: { type: Number},
  stock: { type: Number},
  tags: [{ type: String }],
  brand: { type: String },
  sku: { type: String},
  weight: { type: Number},
  dimensions: dimensionsSchema,
  warrantyInformation: { type: String},
  shippingInformation: { type: String},
  availabilityStatus: { type: String},
  reviews: [reviewSchema],
  returnPolicy: { type: String},
  minimumOrderQuantity: { type: Number},
  meta: metaSchema,
  images: [{ type: String }],
  thumbnail: { type: String},
})

const Product=mongoose.model('Product',productSchema);

export default Product;