import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button } from "reactstrap";
import { useTranslation } from "utility/language";
import { LoadingButton } from "components/input/LoadingButton";
import OneTableForm from "./OneTableForm";
import { Formik, Form } from "formik";
import { useImagePreview } from "hooks";
import {  ImageURL } from "api/config";

import {
  getInitialValues,
  getValidationSchema,
} from "./formUtils";

const EditOneTableModal = ({ isOpen, setIsOpen, objectToEdit, setObjectToEdit,marker,setMarkers,markers }) => {
  const t = useTranslation();


  const image = objectToEdit?.table_image;
  console.log(image)
  const { preview, handleImageChange, setPreview } =
    useImagePreview(image);

  const handleSubmit = (values) => {
    console.log(values.table_image)
      const newData= markers.map(obj=>{
        if(obj.top===values.top&&obj.left===values.left){
          return {...values}
        }
        return obj
      })
    setMarkers(newData)
    setIsOpen(false);
    setPreview(null);
  };


  React.useEffect(() => {
    if (isOpen) {
      setPreview(`${ImageURL}${image}`);
    }
  }, [isOpen, setPreview, image]);


  return (
    <Modal centered isOpen={isOpen} size="md">
      <ModalHeader toggle={() => setIsOpen((v) => !v)}>
        {t("edit_table")}
      </ModalHeader>
      {objectToEdit && (
        <Formik
          onSubmit={handleSubmit}
          initialValues={getInitialValues(objectToEdit)}
          validationSchema={getValidationSchema(true)}
        >
          {(formik) => (
            <Form>
              <ModalBody>
                <OneTableForm
                  editMode={true}
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
                  {t("save")}
                </LoadingButton>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      )}
    </Modal>
  );
};

export default EditOneTableModal;
