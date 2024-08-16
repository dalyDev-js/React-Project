export const sortProductsByRating = (products) => {
  return [...products].sort((a, b) => b.rating - a.rating);
};

export const sortProductsByDiscount = (products) => {
  return [...products].sort(
    (a, b) => b.discountPercentage - a.discountPercentage
  );
};

export const sortProductsByPriceHL = (products) => {
  return [...products].sort((a, b) => b.price - a.price);
};

export const sortProductsByPriceLH = (products) => {
  return [...products].sort((a, b) => a.price - b.price);
};

export const sortDefault = (products) => {
  return [...products].sort((a, b) => a.id - b.id);
};

export const filterCategory = (products, category) => {
  return category === "All Products"
    ? products
    : products.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
};
