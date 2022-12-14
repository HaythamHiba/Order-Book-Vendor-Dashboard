import React from "react";
import { ValidatedField } from "components/input/ValidatedField";
import { useTranslation } from "utility/language";
import { useFormikContext } from "formik";
import ImagePreview from "components/ImagePreview";
import { Row, Col } from "reactstrap";

const CategoryForm = ({ preview, handleImageChange, editMode = false }) => {
  const t = useTranslation();
  const formik = useFormikContext();
  
  return (
    <Row xs={1} sm={1} md={1} lg={2} xl={2}>
      <Col>
        <ValidatedField
          dir="ltr"
          name="name[en]"
          label={`${t("category_name")} (${t("en")})`}
          placeholder={`${t("category_name")} (${t("en")})`}
        />
        <ValidatedField
          dir="rtl"
          name="name[ar]"
          label={`${t("category_name")} (${t("ar")})`}
          placeholder={`${t("category_name")} (${t("ar")})`}
        />
          {

                editMode&&formik.values.status===false &&<ValidatedField
                dir="rtl"
                name="admin_note"
                label={`${t("admin_note")}`}
                placeholder={`${t("admin_note")}`}
                readOnly
                />
          } 
   
      </Col>
      <Col>
        <ValidatedField
          id="image"
          type="file"
          label={t("category_image")}
          name="image"
          accept="image/*"
          onChange={(e) => {
            handleImageChange(e);
            formik.setFieldValue("image", e.target.files[0]);
          }}
        />
        <ImagePreview preview={preview} />
      </Col>
    </Row>
  );
};

export default CategoryForm;
