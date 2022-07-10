export const filterProductsBasedOnSearch = (products, searchText) =>
  products.filter((product) =>
    product.product_details.some(({ product_name }) =>
      product_name.toLowerCase().includes(searchText.toLowerCase())
    )
  );

