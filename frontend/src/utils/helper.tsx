export const getCalculatedAmount = (price:any, discountPercentage:any) => {
    const productPrice = Math.round(price * 85);
    const discount = Math.round(discountPercentage * 10);
    // console.log(productPrice, discount);
    const originalPrice = Math.round(
      productPrice - (productPrice * discount) / 100
    );
    // console.log(originalPrice)
    return [originalPrice];
  };