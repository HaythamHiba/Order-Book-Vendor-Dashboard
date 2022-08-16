import React from "react";
import { ValidatedField } from "components/input/ValidatedField";
import { useTranslation } from "utility/language";
import { useFormikContext } from "formik";

import ImagePreview from "components/ImagePreview";

  

const ImageWithTableForm = ({ preview, handleImageChange, editMode = false }) => {
  const t = useTranslation();
  const formik = useFormikContext();

 



  return (
    
      <>
        <ValidatedField
          dir="ltr"
          name="name[en]"
          label={`${t("map_name")} (${t("en")})`}
          placeholder={`${t("map_name")} (${t("en")})`}
        />
        <ValidatedField
          dir="rtl"
          name="name[ar]"
          label={`${t("map_name")} (${t("ar")})`}
          placeholder={`${t("map_name")} (${t("ar")})`}
        />
   <ValidatedField
          id="image"
          type="file"
          label={t("maps_image")}
          name="image"
          accept="image/*"
          onChange={(e) => {
            handleImageChange(e);
            formik.setFieldValue("image", e.target.files[0]);
          }}
        />
            <ImagePreview preview={preview} />
             </>
        
    
  );
};

export default ImageWithTableForm;
