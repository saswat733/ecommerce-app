import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function HomePageSlider() {
  const Largeimages = [
    "https://cmsimages.shoppersstop.com/static_web_YSL_Burberry_and_more_a8595e6940/static_web_YSL_Burberry_and_more_a8595e6940.png",
    "https://cmsimages.shoppersstop.com/static_web_Stop_Life_10feaf9320/static_web_Stop_Life_10feaf9320.png",
    "https://cmsimages.shoppersstop.com/static_web_Adidas_puma_and_more_fc269fe01d/static_web_Adidas_puma_and_more_fc269fe01d.png",
    "https://cmsimages.shoppersstop.com/static_web_Biba_Global_Desi_and_more_a0e91c950b/static_web_Biba_Global_Desi_and_more_a0e91c950b.png",
    "https://cmsimages.shoppersstop.com/static_web_Tommy_Hilfiger_Levis_and_more_b9ad3310f2/static_web_Tommy_Hilfiger_Levis_and_more_b9ad3310f2.png",
  ];

  const smallImages = [
    "https://cmsimages.shoppersstop.com/static_msite_Adidas_puma_and_more_9e6ca1d196/static_msite_Adidas_puma_and_more_9e6ca1d196.png",
    "https://cmsimages.shoppersstop.com/main_strapi_msite_01d7f13c38/main_strapi_msite_01d7f13c38.png",
    "https://cmsimages.shoppersstop.com/static_msite_Stop_Life_081f8dcdec/static_msite_Stop_Life_081f8dcdec.png",
    "https://cmsimages.shoppersstop.com/static_msite_Casio_Fossil_and_more_b018c20b69/static_msite_Casio_Fossil_and_more_b018c20b69.png",
    "https://cmsimages.shoppersstop.com/static_msite_Biba_Global_Desi_and_more_8b6915ef23/static_msite_Biba_Global_Desi_and_more_8b6915ef23.png",
    "https://cmsimages.shoppersstop.com/static_msite_YSL_Burberry_and_more_e400de4f4b/static_msite_YSL_Burberry_and_more_e400de4f4b.png",
    "https://cmsimages.shoppersstop.com/static_msite_Tommy_Hilfiger_Levis_and_more_9175fa8701/static_msite_Tommy_Hilfiger_Levis_and_more_9175fa8701.png",
  ];

  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(0);

  const isSmallDevice = useMediaQuery({ query: "(max-width: 500px)" });

  const handleOnclick = () => {
    if (isActive === 0) {
      navigate("/products/search?c=smartphones");
    } else if (isActive === 1) {
      navigate("/products/search?c=laptops");
    } else if (isActive === 2) {
      navigate("/products/search?c=accessories");
    } else if (isActive === 3) {
      navigate("/products/search?c=clothing");
    } else if (isActive === 4) {
      navigate("/products/search?c=footwear");
    }
  };

  const images = isSmallDevice ? smallImages : Largeimages;

  return (
    <div onClick={handleOnclick} className="cursor-pointer rounded-3xl border-black">
      <Carousel
        showThumbs={false}
        autoPlay={true}
        interval={3000}
        infiniteLoop={true}
        showArrows={false}
        className="m-5 md:mx-16 rounded-3xl"
        selectedItem={isActive}
        onChange={(index) => setIsActive(index)} // Track the active slide
      >
        {images.map((image, index) => (
          <div key={index} className="md:m-4 rounded-3xl">
            <img
              className="w-[400px] rounded-3xl h-[500px] object-fit md:h-[400px] md:w-[400px] "
              src={image}
              alt="slider"
              onClick={handleOnclick} // Navigate when the image is clicked
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
