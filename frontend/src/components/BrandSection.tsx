import  { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeGeminiBrandFilter,
} from "../utils/store/appSlice";
import {
  addBrandFilter,
  removeBrandFilter,
} from "../utils/store/AllProductsSlice";

interface BrandSectionProps {
  brandName: string;
}

export default function BrandSection({ brandName }: BrandSectionProps) {
  const dispatch = useDispatch();

  const [isChecked, setIsChecked] = useState<boolean>(false);

  const filteredBrand = useSelector(
    (store: any) => store.app.geminiFilteredSearch.brand
  );

  useEffect(() => {
    if (filteredBrand && filteredBrand.toUpperCase() === brandName.toUpperCase()) {
      setIsChecked(true);
    }

    return () => {
      // Clear the brand filter when component unmounts or when filteredBrand changes
      dispatch(removeGeminiBrandFilter());

      // Uncheck the checkbox if it was checked
      if (isChecked) {
        setIsChecked(false);
      }
    };
  }, [filteredBrand, brandName, dispatch, isChecked]);

  useEffect(() => {
    if (isChecked) {
      dispatch(addBrandFilter(brandName));
    } else {
      dispatch(removeBrandFilter(brandName));
    }
  }, [isChecked, brandName, dispatch]);

  const handleCheckboxChange = () => {
    setIsChecked((prevState) => !prevState);
  };
  console.log(brandName)
  return (
    <div className="flex items-center my-2">
      <input
        type="checkbox"
        value={brandName}
        id={brandName}
        checked={isChecked}
        onChange={handleCheckboxChange}
        className="cursor-pointer"
      />
      <label htmlFor={brandName} className="ml-2 cursor-pointer">
        {brandName}
      </label>
    </div>
  );
}
