import React from "react";
import useTableColumns from "./useTableColumns";
import { useTranslation } from "utility/language";
import DataTable from "components/table/DataTable";
import { Card, CardBody } from "reactstrap";
import { SearchInput } from "components/input/SearchInput";
import { useGetItems } from "api/items";
import { filterItemsBasedOnSearch } from "../common/filters";
import { AddButton } from "components/AddButton";
import { history } from "../../../../history";
import { useIsAuthorized } from "redux/hooks/auth";
import Select from "react-select";
import useCategoryOptions from "utility/selectionOptions/useCategoryOptions";


export default function ViewAllShopProductsPage() {
  const t = useTranslation();
  const isAuthorized = useIsAuthorized();

  const [category,setCategory]=React.useState("");
  const categoriesOptions=useCategoryOptions();

  //Table Content -- Data + Columns
  const { data, isLoading } = useGetItems({id:category});
  const products = data?data:  [];
  const columns = useTableColumns();

  //Data Filters
  const [searchText, setSearchText] = React.useState("");
  const [filteredData, setFilteredData] = React.useState([]);


  React.useEffect(() => {
    if (data && Array.isArray(data)) {
      const products = data;
      if (searchText) {
        setFilteredData(filterItemsBasedOnSearch(products, searchText));
      } else {
        setFilteredData(products);
      }
    }
  }, [searchText, data]);

  return (
    <>
      <h1>{t("items")}</h1>
      <div className="d-flex align-items-center mb-1 justify-content-between flex-wrap">
        <div className="d-flex">
          {isAuthorized && (
            <AddButton onClick={() => history.push(`/items/add`)} />
          )}
        </div>
        <div style={{ width: "15rem" }} className="mr-1">
        <Select
        
        placeholder={t("category")}
        options={categoriesOptions}
        name="category_id"
        onChange={(opt) => {
          setCategory(opt.value ?? "");
        }}
      />
      
    </div>
        
        <div className="d-flex align-items-center">

          <SearchInput
            onChange={setSearchText}
            placeholder={t("_search.item")}
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

                <>{category? t("no_records"):t("select_category_first")}</>


              </h6>
            }
          />
        </CardBody>
      </Card>
    </>
  );
};

