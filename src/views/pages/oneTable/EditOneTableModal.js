import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button } from "reactstrap";
import { useTranslation } from "utility/language";
import { LoadingButton } from "components/input/LoadingButton";
import OneTableForm from "./OneTableForm";
import { Formik, Form, useFormikContext } from "formik";
import { useImagePreview } from "hooks";
import {  ImageURL } from "api/config";

import {
  getInitialValues,
  getValidationSchema,
} from "./formUtils";

const EditOneTableModal = ({ isOpen, setIsOpen, objectToEdit, setMarkers,markers }) => {
  const t = useTranslation();
  const formik=useFormikContext();



  const image = objectToEdit?.table_image;

  const { preview, handleImageChange, setPreview } =
    useImagePreview(image);

  const handleSubmit = (values) => {
    const data={...values};
    if(formik.values.table_image==="")
    {
      delete data["table_image"]
    }
    
      const newData= markers.map(obj=>{
        if(obj.top===data.top&&obj.left===data.left){
            if(obj.id){

              return {...data,id:obj.id}
            }
            return {...data}
        }
        return obj
      })
    setMarkers(newData)
    formik.setFieldValue("markers",newData)
    setIsOpen(false);
    setPreview(null);
  };
  const handledelete = () => {
   
 
      const newData=markers.filter(fliterderMarker=>fliterderMarker.top!==objectToEdit.top&&fliterderMarker.left!==objectToEdit.left)
      const deletedMarker=markers.filter(fliterderMarker=>
        fliterderMarker.top === objectToEdit.top &&
        fliterderMarker.left === objectToEdit.left &&
        fliterderMarker.id === objectToEdit.id)
        
        if(deletedMarker){

          const deletedArr=[...formik.values.deleted_markers,deletedMarker[0].id]
          formik.setFieldValue("deleted_markers",deletedArr)
        }
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
              <LoadingButton
                  type="button"
                  color="primary"
                  onClick={handledelete}
                 
                >
                  {t("delete")}
                </LoadingButton>
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
