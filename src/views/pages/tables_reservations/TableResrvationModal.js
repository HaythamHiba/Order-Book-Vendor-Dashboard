import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button } from "reactstrap";
import { useTranslation } from "utility/language";

import CategoryForm from "./TableReservationForm";
import { Formik, Form } from "formik";
import { useImagePreview } from "hooks";
import {  ImageURL } from "api/config";

import {
  getInitialValues,
  
  
} from "./formUtils";
import ReservationStatusActionController from "components/ReservationStatusActionController";
import { useUpdateTableReservationStatus } from "api/tablesReservations";

const EditCatModal = ({ isOpen, setIsOpen, objectToEdit, setObjectToEdit }) => {
  const t = useTranslation();
  
  const updateMutation=useUpdateTableReservationStatus(objectToEdit?.id)
  const table_image = objectToEdit?.table_image;
  const { preview, handleImageChange, setPreview } =
    useImagePreview(table_image);



  React.useEffect(() => {
    if (updateMutation.isSuccess) {
      setIsOpen(false);
    }
  }, [updateMutation.isSuccess, setIsOpen]);
  React.useEffect(() => {
    if (isOpen) {
      setPreview(`${ImageURL}${table_image}`);
    }
  }, [isOpen, setPreview, table_image]);

  return (
    <Modal centered isOpen={isOpen} size="lg">
      <ModalHeader toggle={() => setIsOpen((v) => !v)}>
        {t("reservation")}


      </ModalHeader>
      <ReservationStatusActionController reservationId={objectToEdit?.id} reservtionMutation={updateMutation}  reservation_status={objectToEdit?.status}/>

      {objectToEdit && (
        <Formik
          
          initialValues={getInitialValues(objectToEdit)}
        
        >
          {(formik) => (
            <Form>
              <ModalBody>
                <CategoryForm
                  editMode={true}
                  preview={preview}
                  handleImageChange={handleImageChange}
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

export default EditCatModal;
