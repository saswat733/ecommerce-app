import { useState, useEffect } from "react";

interface ProductImagesCarouselProps {
  images: string[];
}

const ProductImagesCarousel = ({ images }: ProductImagesCarouselProps) => {
  const [currImg, setCurrImg] = useState(0);
  const [isOutline, setIsOutline] = useState(0);

  useEffect(() => {
    // Scroll to top when the component mounts
    window.scroll({ top: 0, behavior: "smooth" });
  }, []);

  if (!images || images.length === 0) {
    return <div>No images available</div>;
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row bg-white p-2 lg:p-4">
        <div className="mr-2  w-full cursor-pointer md:w-24 flex items-center h-16 md:block my-2 md:my-0">
          {images.map((url: string, i: number) => (
            <img
              src={url}
              alt={`product-image-${i}`}
              key={i}
              className={`w-full h-full my-1 mr-1 rounded-lg p-1 border outline outline-2 border-zinc-400 ${
                isOutline === i ? "outline-sky-900" : "outline-transparent"
              }`}
              onMouseEnter={() => {
                setCurrImg(i);
                setIsOutline(i);
              }}
              loading="eager"
            />
          ))}
        </div>

        <div className="flex flex-col  md:w-[400px]  md:flex-row">
          <div className="w-full sm:w-[90%]  ">
            <div className="w-full  border-zinc-200 h-[350px] md:h-[450px] flex justify-center">
              <img
                src={images[currImg]}
                alt="selected-product"
                className="h-full w-full p-1 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductImagesCarousel;
