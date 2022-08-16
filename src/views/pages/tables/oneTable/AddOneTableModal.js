import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button } from "reactstrap";
import { useTranslation } from "utility/language";
import { LoadingButton } from "components/input/LoadingButton";
import OneTableForm from "./OneTableForm";
import { Formik, Form } from "formik";
import { useImagePreview } from "hooks";

import {
  getInitialValues,
  getValidationSchema,
  
} from "./formUtils";

const AddOneTableModal = ({ isOpen, setIsOpen,marker,setMarkers }) => {
  const t = useTranslation();
  const { preview, handleImageChange, setPreview } = useImagePreview(null);

  const handleSubmit = (values) => {
    setMarkers(prev=>[...prev,{
      
      ...values
      
    }])
    setIsOpen(false);
    setPreview(null);
  };



  return (
    <Modal centered isOpen={isOpen} size="lg">
      <ModalHeader toggle={() => setIsOpen((v) => !v)}>
        {t("add_table")}
      </ModalHeader>
      <Formik
        onSubmit={handleSubmit}
        initialValues={getInitialValues(false,marker)}
        validationSchema={getValidationSchema()}
      >
        {(formik) => (
          <Form>
            <ModalBody>
              <OneTableForm
                preview={preview}
                handleImageChange={handleImageChange}
              />
            </ModalBody>
            <ModalFooter>
              <Button
               
                onClick={() => setIsOpen(false)}
                color="danger"
              >
                {t("cancel")}
              </Button>
              <LoadingButton
                type="submit"
                color="primary"
              
              >
                {t("add")}
              </LoadingButton>
            </ModalFooter>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddOneTableModal;
