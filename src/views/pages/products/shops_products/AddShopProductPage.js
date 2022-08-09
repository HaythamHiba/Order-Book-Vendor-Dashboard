import React from "react";

import AddProductPage from "../common/AddProductPage";

import { useAddItem } from "api/items";

const AddShopProductPage = () => {
  const mutation = useAddItem();
  return (
      <AddProductPage mutation={mutation} />
  );
};

export default AddShopProductPage;
