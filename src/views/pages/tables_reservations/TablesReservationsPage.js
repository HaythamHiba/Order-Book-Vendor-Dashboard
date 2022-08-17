import React from "react";
import useTableColumns from "./useTableColumns";
import { useTranslation } from "utility/language";
import DataTable from "react-data-table-component";
import "assets/scss/plugins/extensions/react-paginate.scss";
import { Card, CardBody } from "reactstrap";
import Select from "react-select";
import EditCatModal from "./TableResrvationModal";
import { TableSpinner } from "views/components/TableSpinner";
import { useGetTablesReservations } from "api/tablesReservations";
import { useReservationStatusOptions } from "utility/selectionOptions/useReservationStatusOptions";
import { SearchInput } from "components/input";

const TablesReservationsPage = () => {
  const t = useTranslation();

  //Data Manipulation -- Add + Edit
  const [editModal, setEditModal] = React.useState(false);
  const [objectToEdit, setObjectToEdit] = React.useState(null);
  const [reservationStatus,setReservationStatus]=React.useState("");
  const [search,setSearch]=React.useState("");
  
    let resStatus=null;
    if(reservationStatus!==""){
      resStatus=reservationStatus
    }
  //Table Content -- Data + Columns
  const { data, isLoading } = useGetTablesReservations({
    status:resStatus,
    table_number:search===""?null:search
  });

  const reservations = data?data : [];
  const columns = useTableColumns(setEditModal, setObjectToEdit);

  const reservationStatusOptions=useReservationStatusOptions();


 

  return (
    <>
      <h1>{t("reservations")}</h1>
      <div className="d-flex justify-content-between align-items-center">

      <div style={{ width: "15rem",marginBottom:"15px" }} className="mr-1">
           
           <Select
        
             placeholder={t("status")}
             options={reservationStatusOptions}
             name="reservation_status"
             onChange={(opt) => {
               setReservationStatus(opt.value ?? "");
             }}
           />

         </div>

           <SearchInput onChange={setSearch} placeholder={t("_search_reservation")}/>
      </div>
           
    
      <Card>
        <CardBody className="p-1">
          <DataTable
            columns={columns}
            data={reservations}
            progressPending={isLoading}
            progressComponent={<TableSpinner />}
            noDataComponent={<h6 className="my-4">{t("no_records")}</h6>}
            noHeader
            pagination
          />
        </CardBody>
      </Card>
      <EditCatModal
        isOpen={editModal}
        setIsOpen={setEditModal}
        objectToEdit={objectToEdit}
        setObjectToEdit={setObjectToEdit}
      />
    </>
  );
};

export default TablesReservationsPage;
