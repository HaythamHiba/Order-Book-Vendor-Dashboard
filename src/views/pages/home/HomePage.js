import React from "react";
import { useGetStatistics } from "api/home";
import SpinnerComponent from "components/@vuexy/spinner/Fallback-spinner";
import Tabels from './Tabels'
export default function HomePage() {
  const {data,isLoading}=useGetStatistics();
  if (isLoading) {
    return <SpinnerComponent />
}
  return (
    <div>
      <Tabels latest_purchased_products={data?.latest_purchased_products} lowest_product_quantities={data?.lowest_product_quantities}/>
    </div>
  );
}
