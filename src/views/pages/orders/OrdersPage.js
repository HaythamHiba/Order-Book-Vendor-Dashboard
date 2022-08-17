import React from "react";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "react-feather";
import "assets/scss/plugins/extensions/react-paginate.scss";
import { Card, CardBody, CardHeader } from "reactstrap";
import { useTranslation } from "utility/language";
import useTableColumns from "./useTableColumns";
import { usePaginationWithURL } from "hooks/usePaginationWithURL";
import OrderModal from "./OrderModal";
import { TableSpinner } from "views/components/TableSpinner";
import { useGetOrders } from "api/orders";
import { useOrderStatusOptions } from "utility/selectionOptions/useStatusOptions";
import Select from "react-select";
import { usePagination } from "hooks/dataTable/usePagination";


const OrderPage = (props) => {
  const t = useTranslation();
  const [selectedStatus,setSelectedStatus]=React.useState("");


  //pagination
  const { page, handlePageChange } =
    usePaginationWithURL(props.location);
    const filterPagination=usePagination()

    const filterIsApplied = selectedStatus !== "";
  

  //Data Manipulation -- Edit
  const [editModal, setEditModal] = React.useState(false);

  const [objectToEdit, setObjectToEdit] = React.useState(null);
  const orderStatusOptions=useOrderStatusOptions();


  let order_status=null;
  if(selectedStatus!==""){
    order_status=selectedStatus
  }
  

  //data
  const { data, isLoading } = useGetOrders({
    page:  page,
    status:order_status

  });
  const orders = data?.data || [];
  const pages = data?.number_of_pages || 0;
  const columns = useTableColumns({
    setEditModal,
    setObjectToEdit,
  });
  React.useEffect(()=>{
    if(filterIsApplied){
      filterPagination.handlePageChange(0);
    }
  },[filterIsApplied,filterPagination])



  return (
    <>

      <Card>
        <CardHeader>

        <h4 className="pt-2 pl-2 mb-0">{t("orders")}</h4>
        <div style={{ width: "15rem" }} className="mr-1">
         
            
           
         <Select
      
           placeholder={t("status")}
           options={orderStatusOptions}
           name="reservation_status"
           onChange={(opt) => {
             setSelectedStatus(opt.value ?? "");
           }}
         />
         
    
     
    </div>
        </CardHeader>
        <CardBody className="p-1">
          <DataTable
            columns={columns}
            data={orders}
            progressPending={isLoading}
            progressComponent={<TableSpinner />}
            noDataComponent={<h6 className="my-4">{t("no_records")}</h6>}
            noHeader
            pagination
            paginationServer
            paginationComponent={() => (
              <ReactPaginate
                previousLabel={<ChevronLeft size={15} />}
                nextLabel={<ChevronRight size={15} />}
                breakLabel="..."
                breakClassName="break-me"
                pageCount={pages}
                containerClassName="vx-pagination separated-pagination pagination-center pagination-sm mb-0 mt-2"
                activeClassName="active"
                forcePage={
                  filterIsApplied ? filterPagination.page - 1 : page - 1
                }
                onPageChange={(v) => {
                  if (filterIsApplied) {
                    filterPagination.handlePageChange(v);
                  } else {
                    handlePageChange(v);
                  }
                }}
              />
            )}
            
            sortServer
          />
        </CardBody>
      </Card>
      <OrderModal
        isOpen={editModal}
        setIsOpen={setEditModal}
        objectToEdit={objectToEdit}
        setObjectToEdit={setObjectToEdit}
      />

    </>
  );
};

export default OrderPage;
