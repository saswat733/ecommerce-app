import { useState, useEffect } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";

interface ProductImagesCarouselProps {
  images: string[];
}

const ProductImagesCarousel = ({ images }: ProductImagesCarouselProps) => {
  const [currImg, setCurrImg] = useState(0);
  const [isOutline, setIsOutline] = useState(0);

  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  }, []);

  if (!images || images.length === 0) {
    return <div>No images available</div>;
  }

  // const handleNextImage = () => {
  //   setCurrImg((prev) => (prev + 1) % images.length);
  //   setIsOutline((prev) => (prev + 1) % images.length);
  // };

  // const handlePrevImage = () => {
  //   setCurrImg((prev) => (prev - 1 + images.length) % images.length);
  //   setIsOutline((prev) => (prev - 1 + images.length) % images.length);
  // };

  return (
    <div>
      <div className="flex flex-col md:flex-row bg-white p-2 lg:p-4">
        {/* Thumbnail Images */}
        <div className="mr-2 w-16 cursor-pointer md:w-24 flex items-center h-16 md:block my-2 md:my-0">
          {images.map((url: string, i: number) => (
            <img
              src={url}
              alt={`product-thumbnail-${i}`}
              key={i}
              className={`w-40 my-1 mr-1 rounded-lg p-1 border outline outline-2 border-zinc-400 ${
                isOutline === i ? "outline-red-500" : "outline-transparent"
              }`}
              onMouseEnter={() => {
                setCurrImg(i);
                setIsOutline(i);
              }}
              loading="eager"
            />
          ))}
        </div>

        {/* Main Image with Zoom */}
        <div className="flex flex-col md:w-[400px] md:flex-row">
          <div className="w-full sm:w-[90%] relative">
            <div className="w-full border-zinc-200 h-[350px] md:h-[450px] flex justify-center">
              <InnerImageZoom
                src={images[currImg]}
                zoomSrc={images[currImg]}
                zoomType="hover"
                zoomPreload={true}
                className="h-full w-full p-1 object-cover"
              />
            </div>

            {/* Navigation Arrows */}
            {/* <button
              className="absolute top-1/2 left-0 transform -translate-y-1/2 text-2xl p-2 bg-gray-200 rounded-full hover:bg-gray-300"
              onClick={handlePrevImage}
              aria-label="Previous Image"
            >
              &lt;
            </button>
            <button
              className="absolute top-1/2 right-0 transform -translate-y-1/2 text-2xl p-2 bg-gray-200 rounded-full hover:bg-gray-300"
              onClick={handleNextImage}
              aria-label="Next Image"
            >
              &gt;
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductImagesCarousel;
