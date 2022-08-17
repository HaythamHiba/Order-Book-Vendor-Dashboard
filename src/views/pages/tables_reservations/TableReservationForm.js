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
        readOnly
         
          name="table_number"
          label={`${t("table")}`}
          placeholder={`${t("table")}`}
        />
        <ValidatedField
        readOnly
          
          name="number_of_people"
          label={`${t("number_of_people")}`}
          placeholder={`${t("number_of_people")}`}
        />
          <ValidatedField
          readOnly
          
          name="date"
          label={`${t("date")}`}
          placeholder={`${t("date")}`}
        />
           <ValidatedField
           readOnly
          
          name="name"
          label={`${t("name")}`}
          placeholder={`${t("name")}`}
        />
           <ValidatedField
           readOnly
          
          name="phone"
          label={`${t("phone")}`}
          placeholder={`${t("phone")}`}
        />
        
   
      </Col>
      <Col>
        <ValidatedField
        readOnly
          id="image"
          type="file"
          label={t("table_image")}
          name="image"
          accept="image/*"
          onChange={(e) => {
            handleImageChange(e);
            formik.setFieldValue("table_image", e.target.files[0]);
          }}
        />
        <ImagePreview preview={preview} />
        <ValidatedField
         readOnly
          
          name="notes"
          label={`${t("notes")}`}
          placeholder={`${t("notes")}`}
          as="textarea"

        />
      </Col>
    </Row>
  );
};

export default CategoryForm;
