import React from "react";
import { Card, CardHeader, CardTitle, CardBody, Badge } from "reactstrap";
import { useTranslation } from "utility/language";
import AdditionalImagesForm from "./AdditionalImagesForm";
import { Formik, Form } from "formik";
import { ExistingImage } from "./ExistingImage";
import { LoadingButton } from "components/input/LoadingButton";
import { buildFormData } from "api/helpers";
import ProgressBar from "components/ProgressBar";


import { MAX_NUMBER_OF_VENDOR_ADDITIONAL_IMAGES } from "configs/global";
const maxNumber = MAX_NUMBER_OF_VENDOR_ADDITIONAL_IMAGES;

const AdditionalImages = ({ data, mutation }) => {
  const t = useTranslation();
  const [deletedImages, setDeletedImages] = React.useState([]);
  const [images, setImages] = React.useState([]);
  const resetRef = React.useRef(null);

  React.useEffect(() => {
    if (mutation.isSuccess) {
      resetRef.current.click();
      setDeletedImages([]);
      setImages([]);
    }
  }, [mutation.isSuccess]);

  const handleSubmit = (values) => {
  


    const dataToSend = {
      ...values,

      deleted_images:[...deletedImages]
    };
    if(deletedImages.length===0){
      delete dataToSend["deleted_images"]
    }

    const formData = new FormData();
    buildFormData(formData, dataToSend);
    mutation.mutate(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          
         <h1>
          
         {t("additional_images")}
          </h1>
      
          </CardTitle>
          <div  style={{width:"100%",float:"right"}}>

          <Badge color={data.status?"success":"danger"}>{ data[0].status?t("active"):t("inactive")}</Badge>

                    {
                      data[0].status===false?<div >

                      <p >
                            {data[0].admin_note}
                      </p>
                      </div>:null

                    }
          </div>
      </CardHeader>
      <CardBody>
        <div className="d-flex flex-wrap">
          {data.length === 0 && (
            <div
              className="d-flex w-100 align-items-center justify-content-center"
              style={{ height: "10rem" }}
            >
              <h3>{t("no_images")}</h3>
            </div>
          )}
          {data.map((img) => (
            <ExistingImage
              key={img.id}
              image={img}
              deletedImages={deletedImages}
              onDelete={() => setDeletedImages((arr) => [...arr, img.id])}
            />
          ))}
        </div>
        <hr />
      
          <Formik
            onSubmit={handleSubmit}
            initialValues={{ created_images: [] }}
          >
            {(formik) => (
              <Form>
                {data.length < maxNumber && (
                  <>
                    <h4>{t("add_new_images")}</h4>
                    <AdditionalImagesForm
                    length_of_data={data.length}
                    length_of_deleted_data={deletedImages.length}
                      images={images}
                      setImages={setImages}
                    />
                  </>
                )}

                <button
                  ref={resetRef}
                  type="reset"
                  style={{ display: "none" }}
                ></button>
                <ProgressBar
                  value={mutation.percentCompleted}
                  isLoading={mutation.isLoading}
                  isError={mutation.isError}
                  isSuccess={mutation.isSuccess}
                />
                <div className="d-flex justify-content-center align-items-center">
                  <LoadingButton
                    type="submit"
                    color="primary"
                    isLoading={mutation.isLoading}
                  >
                    {t("save")}
                  </LoadingButton>
                </div>
              </Form>
            )}
          </Formik>
       
      </CardBody>
    </Card>
  );
};

export default AdditionalImages;
