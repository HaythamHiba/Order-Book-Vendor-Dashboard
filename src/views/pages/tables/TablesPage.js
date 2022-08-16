import React from "react";
import useTableColumns from "./useTableColumns";
import { useTranslation } from "utility/language";
import DataTable from "react-data-table-component";
import "assets/scss/plugins/extensions/react-paginate.scss";
import { Card, CardBody } from "reactstrap";
import { useGetCategories } from "api/categories";
import { AddButton } from "components/AddButton";
import AddCatModal from "./AddTableModal";
import EditCatModal from "./EditTableModal";
import { TableSpinner } from "views/components/TableSpinner";


const TablesPage = () => {
  const t = useTranslation();

  //Data Manipulation -- Add + Edit
  const [addModal, setAddModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const [objectToEdit, setObjectToEdit] = React.useState(null);

  //Table Content -- Data + Columns
  const { data, isLoading } = useGetCategories();

  const categories = data?data : [];
  const columns = useTableColumns(setEditModal, setObjectToEdit);



  return (
    <>
      <h1>{t("categories")}</h1>
      <div className="d-flex align-items-center mb-1 justify-content-between">
        <div className="d-flex">
        <AddButton onClick={() => setAddModal(true)} />
        </div>
       
      </div>
      <Card>
        <CardBody className="p-1">
          <DataTable
            columns={columns}
            data={ categories}
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

export default TablesPage;
