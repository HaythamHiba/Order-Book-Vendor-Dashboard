import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button } from "reactstrap";
import { useTranslation } from "utility/language";
import { LoadingButton } from "components/input/LoadingButton";
import CategoryForm from "./OfferForm";
import { Formik, Form } from "formik";
import { useImagePreview } from "hooks";
import {  ImageURL } from "api/config";

import {
  getInitialValues,
  getValidationSchema,
  getDataToSend,
} from "./formUtils";
import { useUpdateOffer } from "api/offers";

const EditOfferModal = ({ isOpen, setIsOpen, objectToEdit, setObjectToEdit }) => {
  const t = useTranslation();
  const { mutate: updateCategory, isLoading, isSuccess } = useUpdateOffer(objectToEdit?.id);

  const offer_image = objectToEdit?.image;
  const { preview, handleImageChange, setPreview } =
    useImagePreview(offer_image);

  const handleSubmit = (values) => {
    updateCategory(
      
      getDataToSend({ ...values}),
      
      );
  };

  React.useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
    }
  }, [isSuccess, setIsOpen]);
  React.useEffect(() => {
    if (isOpen) {
      setPreview(`${ImageURL}${offer_image}`);
    }
  }, [isOpen, setPreview, offer_image]);

  return (
    <Modal centered isOpen={isOpen} size="xl">
      <ModalHeader toggle={() => setIsOpen((v) => !v)}>
        {t("edit_offer")}
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
                <CategoryForm
                  editMode={true}
                  preview={preview}
                  handleImageChange={handleImageChange}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  disabled={isLoading}
                  onClick={() => setIsOpen(false)}
                  color="danger"
                >
                  {t("cancel")}
                </Button>
                <LoadingButton
                  type="submit"
                  color="primary"
                  isLoading={isLoading}
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

export default EditOfferModal;
