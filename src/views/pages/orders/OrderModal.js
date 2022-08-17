import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from "reactstrap";
import { Button } from "reactstrap";
import { useTranslation } from "utility/language";
import DataTable from "react-data-table-component";
import "assets/scss/plugins/extensions/react-paginate.scss";
import { Formik, Form } from "formik";


import {
  getInitialValues,
  
  
} from "./formUtils";
import OrderForm from "./OrderForm";
import { useUpdateOrder } from "api/orders";
import OrderStatusActionController from "components/OrderStatusActionController";
import useTableColumns from "./useOffersTableColumns";
import useItemsTableColumns from "./useItemsTableColumns";
import { TableSpinner } from "views/components/TableSpinner";

const OrderModal = ({ isOpen, setIsOpen, objectToEdit, setObjectToEdit }) => {
  const t = useTranslation();
  
  const updateMutation=useUpdateOrder(objectToEdit?.id)

    const offers = objectToEdit?.offers || [];
    const offersColumns = useTableColumns();
    const items = objectToEdit?.items || [];
    const itemsColumns = useItemsTableColumns();
    console.log(items,offers)


  React.useEffect(() => {
    if (updateMutation.isSuccess) {
      setIsOpen(false);
    }
  }, [updateMutation.isSuccess, setIsOpen]);



  return (
    <Modal centered isOpen={isOpen} size="xl">
      <ModalHeader toggle={() => setIsOpen((v) => !v)}>
        {t("orders")}


      </ModalHeader>
      <OrderStatusActionController  orderMutation={updateMutation}  order_status={objectToEdit?.status}/>

      {objectToEdit && (
        <Formik
          
          initialValues={getInitialValues(objectToEdit)}
        
        >
          {(formik) => (
            <Form>
              <ModalBody>
              <Row xs={1} sm={1} md={1} lg={1} xl={1}>
                   {
                     offers&& <Col>
                     <p>{t("offers")}</p>

                      <DataTable
                          columns={offersColumns}
                          data={offers}
                        
                          progressComponent={<TableSpinner />}
                          noDataComponent={<h6 className="my-4">{t("no_records")}</h6>}
                          noHeader
                          pagination
                        />
                      </Col>

                   } 
                      {
                     items&& <Col>
                     <p>{t("items")}</p>
                      <DataTable
                          columns={itemsColumns}
                          data={items}
                        
                          progressComponent={<TableSpinner />}
                          noDataComponent={<h6 className="my-4">{t("no_records")}</h6>}
                          noHeader
                          pagination
                        />
                      </Col>

                   } 
                  </Row>
                <OrderForm
                  editMode={true}
          
                />
      
              </ModalBody>
              <ModalFooter>
                <Button
                  disabled={updateMutation.isLoading}
                  onClick={() => setIsOpen(false)}
                  color="danger"
                >
                  {t("cancel")}
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      )}
    </Modal>
  );
};

export default OrderModal;
