export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(amount);
};

export const calculateDiscountedPrice = (price: number, discount: number) => {
  if (discount <= 0) return price;
  return price - discount;
};

export const getPriceData = (price: number, discount: number) => {
  const finalPrice = calculateDiscountedPrice(price, discount);
  const hasDiscount = discount > 0;
  const discountPercent = hasDiscount ? Math.round((discount / price) * 100) : 0;
  
  return {
    original: price,
    final: finalPrice,
    hasDiscount,
    discountAmount: discount,
    discountPercent
  };
};
