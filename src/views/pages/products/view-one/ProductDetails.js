import React from "react";
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import { useTranslation } from "utility/language";
import { Formik, Form } from "formik";
import Tabs from "components/Tabs";
import {
  getInitialValues,
  getValidationSchema,
} from "../common/utils/formSchema";
import useFormTabs from "../common/utils/useFormTabs";
import { LoadingButton } from "components/input/LoadingButton";

import { useUpdateDetailsMutation, useDeleteProduct } from "api/products";
import { buildFormData } from "api/helpers";
import { history } from "../../../../history";
import confirmAlert from "extensions/confirm-alert";
import { useTranslatedLabels } from "extensions/confirm-alert/useTranslatedLabels";
import { useIsAuthorized } from "redux/hooks/auth";

const ProductDetails = ({ product,
  commentQuery,
  reviewsQuery,
  commentMuation,
  reviewsMutation }) => {
  const t = useTranslation();
  const confirmOptions = useTranslatedLabels();
  const tabs = useFormTabs(true,commentQuery,
    reviewsQuery,
    commentMuation,
    reviewsMutation,);
  const updateDetailsMutation = useUpdateDetailsMutation();
  const deleteMutation = useDeleteProduct();
  const isAuthorized = useIsAuthorized();

  React.useEffect(() => {
    if (deleteMutation.isSuccess) {
      history.replace(`/products/view-all`);
    }
  }, [deleteMutation.isSuccess]);

  const handleDelete = () => {
    confirmAlert({
      onConfirm: () => {
        deleteMutation.mutate({
          id: product.id,
        });
      },
      ...confirmOptions,
    });
  };

  const handleSubmit = (values) => {
    const formData = new FormData();
    buildFormData(formData, { product_id: product.id, ...values, shop_id: 1 });
    updateDetailsMutation.mutate(formData);
  };

  return (
    <Card>
      <CardHeader className="d-flex justify-content-between align-items-center">
        <CardTitle>{t("product")}</CardTitle>
        {isAuthorized && (
          <LoadingButton
            color="danger"
            isLoading={deleteMutation.isLoading}
            onClick={handleDelete}
          >
            {t("delete")}
          </LoadingButton>
        )}
      </CardHeader>
      <CardBody>
        <Formik
          validationSchema={getValidationSchema(true)}
          onSubmit={handleSubmit}
          initialValues={getInitialValues(product, true)}
        >
          {(formik) => (
            <Form>
              <Tabs tabs={tabs} />
              {isAuthorized && (
                <LoadingButton
                  type="submit"
                  color="primary"
                  isLoading={updateDetailsMutation.isLoading || deleteMutation.isLoading}
                >
                  {t("save")}
                </LoadingButton>
              )}
            </Form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
};

export default ProductDetails;
