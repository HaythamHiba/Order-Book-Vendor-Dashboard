import React from "react";
import { Card, CardHeader, CardTitle, CardBody, Button } from "reactstrap";
import { useTranslation } from "utility/language";
import { Formik, Form } from "formik";
import Tabs from "components/Tabs";
import { getInitialValues, getValidationSchema } from "./utils/formSchema";
import { history } from "../../../../history";

import { buildFormData } from "api/helpers";
import { LoadingButton } from "components/input/LoadingButton";

import useFormTabs from "./utils/useFormTabs";

import PropTypes from "prop-types";

import ProgressBar from "components/ProgressBar";

const navigateToAllProducts = () => {
 

    history.push(`/products/view-all`);
  
};

const AddProductPage = ({ mutation }) => {
  const t = useTranslation();
  const {
    mutate: addProduct,
    isLoading,
    isSuccess,
    isError,
    percentCompleted,
  } = mutation;

  React.useEffect(() => {
    if (isSuccess) {
      navigateToAllProducts();
    }
  }, [isSuccess]);

  const tabs = useFormTabs();

  const handleSubmit = (values) => {
    const data={...values}
    const formData = new FormData();
    buildFormData(formData, data);
    addProduct(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {t("add_product")} 
        </CardTitle>
        <Button
          color="primary"
          onClick={() => navigateToAllProducts()}
          disabled={isLoading}
        >
          {t("back")}
        </Button>
      </CardHeader>
      <CardBody>
        <Formik
          onSubmit={handleSubmit}
          initialValues={getInitialValues()}
          validationSchema={getValidationSchema()}
        >
          {(formik) => (
            <Form>
              <Tabs tabs={tabs} />

              <ProgressBar
                value={percentCompleted}
                isLoading={isLoading}
                isError={isError}
                isSuccess={isSuccess}
              />
              <div className="d-flex justify-content-center align-items-center">
                <LoadingButton
                  type="submit"
                  color="primary"
                  isLoading={isLoading}
                >
                  {t("add")}
                </LoadingButton>
              </div>
            </Form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
};

AddProductPage.propTypes = {
  mutation: PropTypes.object.isRequired,
};

export default AddProductPage;
