import Slider from "react-slick";
import ProductCard from "./ProductCard";

// Custom Arrow Components
const NextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" stroke="black" height="24" viewBox="0 -960 960 960" width="24">
        <path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z"/>
      </svg>
    </div>
  );
};

const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" stroke="black" height="24" viewBox="0 -960 960 960" width="24">
        <path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z"/>
      </svg>
    </div>
  );
};

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 2,
  variableWidth: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

interface productType {
  product: [];
  category: string;
}

const HomePageProductContainer = ({
  product: products,
  category,
}: productType) => {
  return (
    <div className="px-3 py-4 my-3 bg-gray-50">
      <h1 className="text-xl border font-bold mb-3 text-zinc-700 text-center">
        {category==="Brand To Take You Places"&&(<><h1>Brand To Take You <span className="text-black">Places</span></h1></>)}
        {category==="Deal of the Day"&&(<><h1><span className="text-black">Deal's</span> of the Day</h1></>)}
      </h1>
      <div className="">
        <Slider {...settings} className="flex items-center">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} category={category} flag={false} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default HomePageProductContainer;
