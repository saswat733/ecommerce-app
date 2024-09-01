import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {Scrollbar} from 'swiper/modules'
import { Link } from "react-router-dom";

interface productType {
  products: [];
  category: string;
}
export default function HomePageSpecialContainer({
  category,
  products,
}: productType) {
  if (products) {
    // let oneProduct = products["mens-shirts"].slice(0, 1);
    console.log(products)
    return (
      <>
      <div className="border">
        <h1 className="text-left ml-4 text-xl font-bold">Fresh In <span className="text-zinc-600">Fashion</span></h1>
      </div>
        <Swiper
          scrollbar={{hide:true}}
          modules={[Scrollbar]}
          className="mySwiper"
        >
            {products.map((product: any) => (
                <SwiperSlide key={product.id}>
                    <Link to={'/product/'+product.id}>
                    <IndividualSpecialProduct product={product}/>
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
      </>
    );
  }
}


function IndividualSpecialProduct({product}:any){
    return (
        <>
        <div className="bg-gray-50 p-3">
                    <div className="flex items-center justify-center">
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-32 h-32"
                    />
                    </div>
                    <div className="text-center">
                    <p className="text-s text-gray-600">{product.brand}</p>
                    <h1 className="text-lg font-semibold text-zinc-700">
                        {product.name}
                    </h1>
                    <p className="text-xs text-gray-400">{product.description}</p>
                    <p className="text-lg font-semibold text-zinc-700">
                    ₹{product.price}
                    </p>
                    </div>
                </div>
        </>
    )
}