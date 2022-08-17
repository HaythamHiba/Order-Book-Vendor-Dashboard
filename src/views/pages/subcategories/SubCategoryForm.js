import React from "react";
import { ValidatedField } from "components/input/ValidatedField";
import { useTranslation } from "utility/language";
import { useFormikContext } from "formik";
import ImagePreview from "components/ImagePreview";
import { Row, Col } from "reactstrap";
import { SelectField } from "components/input/SelectField";
import useCategoryOptions from "utility/selectionOptions/useCategoryOptions";


const SubCategoryForm = ({ preview, handleImageChange, editMode = false }) => {
  const t = useTranslation();
  const formik = useFormikContext();
  const categoriesOptions=useCategoryOptions();

  return (
    <Row xs={1} sm={1} md={1} lg={2} xl={2}>
      <Col>
      <SelectField
          label={t("category")}
          options={categoriesOptions}
          name="parent_id"
          onChange={(opt) => {
            formik.setFieldValue("parent_id", opt.value);
          }}
          required
        />
        
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
              formik.values.status===false&&    <ValidatedField
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

export default SubCategoryForm;
