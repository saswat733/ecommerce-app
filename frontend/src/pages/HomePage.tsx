import FooterComponent from "../components/Footer";
import HomeAllProduct from "../components/HomeAllProduct";
import HomePageSlider from "../components/HomePageSlider";

export default function HomePage(){
    return (
        <>
        <HomePageSlider/>
        <HomeAllProduct/>
        <FooterComponent/>
        </>
    )
}