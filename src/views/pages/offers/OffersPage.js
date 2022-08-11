import React from "react";
import useTableColumns from "./useTableColumns";
import { useTranslation } from "utility/language";
import DataTable from "react-data-table-component";
import "assets/scss/plugins/extensions/react-paginate.scss";
import { Card, CardBody } from "reactstrap";
import { SearchInput } from "components/input/SearchInput";
import { filterOffersBasedOnSearch } from "./filters";
import { AddButton } from "components/AddButton";
import AddCatModal from "./AddOfferModal";
import EditCatModal from "./EditOfferModal";
import { TableSpinner } from "views/components/TableSpinner";
import { useIsAuthorized } from "redux/hooks/auth";
import { useGetOffers } from "api/offers";


const OfferPage = () => {
  const t = useTranslation();
  const isAuthorized = useIsAuthorized();

  //Data Manipulation -- Add + Edit
  const [addModal, setAddModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const [objectToEdit, setObjectToEdit] = React.useState(null);

  //Table Content -- Data + Columns
  const { data, isLoading } = useGetOffers();

  const categories = data?data : [];
  const columns = useTableColumns(setEditModal, setObjectToEdit);

  //Data Filters
  const [searchText, setSearchText] = React.useState("");
  const [filteredData, setFilteredData] = React.useState([]);

  React.useEffect(() => {
    if (Array.isArray(data)) {
      if (searchText) {
        setFilteredData(
          filterOffersBasedOnSearch(data, searchText)
        );
      } else {
        setFilteredData(data);
      }
    }
  }, [searchText, data]);
 

  return (
    <>
      <h1>{t("offers")}</h1>
      <div className="d-flex align-items-center mb-1 justify-content-between">
        <div className="d-flex">
          {isAuthorized && <AddButton onClick={() => setAddModal(true)} />}
        </div>
        <SearchInput
          onChange={setSearchText}
          placeholder={t("_search.offer")}
        />
      </div>
      <Card>
        <CardBody className="p-1">
          <DataTable
            columns={columns}
            data={searchText ? filteredData : categories}
            progressPending={isLoading}
            progressComponent={<TableSpinner />}
            noDataComponent={<h6 className="my-4">{t("no_records")}</h6>}
            noHeader
            pagination
          />
        </CardBody>
      </Card>
      <AddCatModal isOpen={addModal} setIsOpen={setAddModal} />
      <EditCatModal
        isOpen={editModal}
        setIsOpen={setEditModal}
        objectToEdit={objectToEdit}
        setObjectToEdit={setObjectToEdit}
      />
    </>
  );
};

export default OfferPage;
