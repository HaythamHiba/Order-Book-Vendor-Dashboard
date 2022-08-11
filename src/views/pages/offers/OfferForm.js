import React from "react";
import { ValidatedField } from "components/input/ValidatedField";
import { useTranslation } from "utility/language";
import { useFormikContext } from "formik";
import ImagePreview from "components/ImagePreview";
import { Row, Col } from "reactstrap";

const OfferForm = ({ preview, handleImageChange, editMode = false }) => {
  const t = useTranslation();
  const formik = useFormikContext();

  return (
    <>
    <Row xs={1} sm={1} md={2} lg={3} xl={3}>
      <Col>
      <ValidatedField

        name="from_date"
        label={t("offer_start_at")}
        placeholder={t("offer_start_at")}
        type="datetime-local"
        isRequired={true}
      />
        <ValidatedField
          dir="ltr"
          name="name[en]"
          label={`${t("offer_name")} (${t("en")})`}
          placeholder={`${t("offer_name")} (${t("en")})`}
        />
        <ValidatedField
            dir="ltr"
            name="description[en]"
            label={`${t("offer_description")} (${t("en")})`}
            placeholder={`${t("offer_description")} (${t("en")})`}
            as="textarea"
            rows="6"

        />
      
   
      </Col>

      <Col>

  <ValidatedField

    name="to_date"
    label={t("offer_end_at")}
    placeholder={t("offer_end_at")}
    type="datetime-local"
    isRequired={true}

  />
      <ValidatedField
          dir="rtl"
          name="name[ar]"
          label={`${t("offer_name")} (${t("ar")})`}
          placeholder={`${t("offer_name")} (${t("ar")})`}
        />
        <ValidatedField
            dir="rtl"
            name="description[ar]"
            label={`${t("offer_description")} (${t("ar")})`}
            placeholder={`${t("offer_description")} (${t("ar")})`}
            as="textarea"
            rows="6"

        />
      </Col>
   
      <Col>
        <ValidatedField
          id="image"
          type="file"
          label={t("offer_image")}
          name="image"
          accept="image/*"
          onChange={(e) => {
            handleImageChange(e);
            formik.setFieldValue("image", e.target.files[0]);
          }}
        />
        <ImagePreview preview={preview} />
        <ValidatedField
            name="price"
            label={`${t("offer_price")}`}
            placeholder={`${t("offer_price")}`}
        />
        
      </Col>
    </Row>
    {

   editMode&&!formik.values.status &&<ValidatedField
   dir="rtl"
    name="admin_note"
    label={`${t("admin_note")}`}
    placeholder={`${t("admin_note")}`}
    readOnly
    />
    }
    </>

  );
};

export default OfferForm;
