import  { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeGeminiIsPriceUnder, removeGeminiPriceFilter } from "../utils/store/appSlice";
import { addPriceFilter } from "../utils/store/AllProductsSlice";

interface PriceSectionProps {
  maxPrice: number;
}

export default function PriceSection({ maxPrice }: PriceSectionProps) {
  const dispatch = useDispatch();

  const { isPriceUnder, price } = useSelector(
    (store: any) => store.app.geminiFilteredSearch
  );

  const maxPriceSlider = Math.floor(maxPrice / 1.5);
  const [currPrice, setCurrPrice] = useState<number>(maxPriceSlider);

  useEffect(() => {
    setCurrPrice(maxPriceSlider);
  }, [maxPriceSlider]);

  useEffect(() => {
    handlePriceFilter();

    return () => {
      dispatch(removeGeminiIsPriceUnder());
      dispatch(removeGeminiPriceFilter());
    };
  }, [currPrice, price]);

  const handlePriceFilter = () => {
    if (isPriceUnder) {
      setCurrPrice(price);
      dispatch(addPriceFilter(price));
    } else {
      const priceToSet = currPrice === maxPriceSlider ? maxPrice : currPrice;
      dispatch(addPriceFilter(priceToSet));
    }
  };

  return (
    <div className=" p-3 w-full border-b-8">
      <h1 className="font-semibold mb-1">PRICE RANGE</h1>

      <p className="font-semibold">
        ₹{currPrice.toLocaleString("en-IN")}
        {currPrice === maxPriceSlider && "+"}
      </p>
      <input
        className="cursor-pointer w-full"
        type="range"
        min="0"
        max={maxPriceSlider}
        value={currPrice}
        onChange={(e) => setCurrPrice(parseInt(e.target.value))}
      />
    </div>
  );
}
