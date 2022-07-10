import React from "react";
import useTableColumns from "./useTableColumns";
import { useTranslation } from "utility/language";
import DataTable from "components/table/DataTable";
import { Card, CardBody } from "reactstrap";
import { SearchInput } from "components/input/SearchInput";
import { useGetProducts } from "api/products";
import { filterProductsBasedOnSearch } from "../common/filters";
import { AddButton } from "components/AddButton";
import { history } from "../../../../history";
import { useIsAuthorized } from "redux/hooks/auth";


export default function ViewAllShopProductsPage() {
  const t = useTranslation();
  const isAuthorized = useIsAuthorized();

  //Table Content -- Data + Columns
  const { data, isLoading } = useGetProducts(1);
  const products = data?.products || [];
  const columns = useTableColumns();

  //Data Filters
  const [searchText, setSearchText] = React.useState("");
  const [filteredData, setFilteredData] = React.useState([]);

  React.useEffect(() => {
    if (data && Array.isArray(data?.products)) {
      const products = data.products;
      if (searchText) {
        setFilteredData(filterProductsBasedOnSearch(products, searchText));
      } else {
        setFilteredData(products);
      }
    }
  }, [searchText, data]);

  return (
    <>
      <h1>{t("shop_products")}</h1>
      <div className="d-flex align-items-center mb-1 justify-content-between flex-wrap">
        <div className="d-flex">
          {isAuthorized && (
            <AddButton onClick={() => history.push(`/products/add`)} />
          )}
        </div>
        <div className="d-flex align-items-center">

          <SearchInput
            onChange={setSearchText}
            placeholder={t("_search.product")}
          />
        </div>
      </div>
      <Card>
        <CardBody className="p-1">
          <DataTable
            columns={columns}
            data={searchText ? filteredData : products}
            progressPending={isLoading}
            noHeader
            pagination
            noDataComponent={
              <h6 className="my-4">

                <>{t("no_records")}</>


              </h6>
            }
          />
        </CardBody>
      </Card>
    </>
  );
};

