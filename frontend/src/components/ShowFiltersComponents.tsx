import React from 'react';
import BrandSection from './BrandSection';
import DiscountSection from './DiscountSection';
import PriceSection from './PriceSection';
import RatingSection from './RatingSection';


const ShowFiltersComponents = ( product:any, query:any ) => {
  console.log(query);

  // Extract and deduplicate brands
  const brands = Array.from(new Set(product["product"].map((p:any) => p.brand)));
  console.log(brands);

  // Extract prices and calculate maxPrice
  const prices = product["product"].map((p:any) => p.price);
  const maxPrice = Math.max(...prices);

  return (
    <div>
      <h1>Filters</h1>
      <div>
        <PriceSection maxPrice={maxPrice} />
      </div>
      <div>
        {brands.length > 0 && brands.map((brand:any) => (
          <BrandSection key={brand} brandName={brand} />
        ))}
      </div>
      <div>
        <DiscountSection />
      </div>
      <div>
        <RatingSection />
      </div>
    </div>
  );
};

export default ShowFiltersComponents;
