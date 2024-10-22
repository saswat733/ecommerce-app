// import React from 'react';
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
    <div className='border-2 m-5 w-96 border-black rounded-lg'>
      <h1 className='text-center text-2xl font-bold uppercase'>Filters</h1>
      <div className='border border-black px-10 '>
        <PriceSection maxPrice={maxPrice} />
      </div>
      <div className='border-2 border-black px-10 '>
        <h1 className='uppercase '>brands</h1>
        {brands.length > 0 && brands.map((brand:any) => (
          <BrandSection key={brand} brandName={brand} />
        ))}
      </div>
      <div className='border-2 border-black px-10'>
        <DiscountSection />
      </div>
      <div className='border-2 border-black px-10'>
        <RatingSection />
      </div>
    </div>
  );
};

export default ShowFiltersComponents;
