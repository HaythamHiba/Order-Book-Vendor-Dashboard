import React from "react";
import useTableColumns from "./useTableColumns";
import { useTranslation } from "utility/language";
import DataTable from "react-data-table-component";
import "assets/scss/plugins/extensions/react-paginate.scss";
import { Card, CardBody } from "reactstrap";
import { SearchInput } from "components/input/SearchInput";
import { filterCategoriesBasedOnSearch } from "./filters";
import { AddButton } from "components/AddButton";
import AddSubCatModal from "./AddSubCatModal";
import EditSubCatModal from "./EditSubCatModal";
import { TableSpinner } from "views/components/TableSpinner";
import { useIsAuthorized } from "redux/hooks/auth";
import { useGetSubcategories } from "api/subcategories";
import Select from "react-select";
import useCategoryOptions from "utility/selectionOptions/useCategoryOptions";

const SubCategoriesPage = () => {
  const t = useTranslation();
  const isAuthorized = useIsAuthorized();

  const [category,setSelectedCategory]=React.useState(null);
  const categoriesOptions=useCategoryOptions();

  //Data Manipulation -- Add + Edit
  const [addModal, setAddModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const [objectToEdit, setObjectToEdit] = React.useState(null);

  //Table Content -- Data + Columns
  const { data, isLoading } = useGetSubcategories({parent_id:category});

  const categories = data?data : [];
  const columns = useTableColumns(setEditModal, setObjectToEdit);

  //Data Filters
  const [searchText, setSearchText] = React.useState("");
  const [filteredData, setFilteredData] = React.useState([]);
  

  React.useEffect(() => {
    if (Array.isArray(data)) {
      if (searchText) {
        setFilteredData(
          filterCategoriesBasedOnSearch(data, searchText)
        );
      } else {
        setFilteredData(data);
      }
    }
  }, [searchText, data]);


  return (
    <>
      <h1>{t("subcategories")}</h1>
      <div className="d-flex align-items-center mb-1 justify-content-between">
        <div className="d-flex">
          {isAuthorized && <AddButton onClick={() => setAddModal(true)} />}
        </div>
        <div style={{ width: "15rem" }} className="mr-1">
           
           <Select
        
             placeholder={t("category")}
             options={categoriesOptions}
             name="category_id"
             onChange={(opt) => {
               setSelectedCategory(opt.value ?? "");
             }}
           />
           
         </div>
        <SearchInput
          onChange={setSearchText}
          placeholder={t("_search.subcategory")}
        />
      </div>
      <Card>
        <CardBody className="p-1">
          <DataTable
            columns={columns}
            data={searchText ? filteredData : categories}
            progressPending={isLoading}
            progressComponent={<TableSpinner />}
            noDataComponent={<h6 className="my-4">{category?t("no_records"):t("select_category_first")}</h6>}
            noHeader
            pagination
          />
        </CardBody>
      </Card>
      <AddSubCatModal isOpen={addModal} setIsOpen={setAddModal} />
      <EditSubCatModal
        isOpen={editModal}
        setIsOpen={setEditModal}
        objectToEdit={objectToEdit}
        setObjectToEdit={setObjectToEdit}
      />
    </>
  );
};

export default SubCategoriesPage;
