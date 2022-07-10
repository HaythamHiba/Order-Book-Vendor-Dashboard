import React from "react";

import AddProductPage from "../common/AddProductPage";

import { useAddProduct } from "api/products";

const AddShopProductPage = () => {
  const mutation = useAddProduct();
  return (
      <AddProductPage mutation={mutation} />
  );
};

export default AddShopProductPage;
