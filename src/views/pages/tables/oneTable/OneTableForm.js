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
          name="max_number"
          label={`${t("max_number")}`}
          placeholder={`${t("max_number")}`}
          type="number"

        />
        <ValidatedField
          dir="ltr"
          name="min_number"
          label={`${t("min_number")}`}
          placeholder={`${t("min_number")}`}
          type="number"
        />
   <ValidatedField
          id="table_image"
          type="file"
          label={t("table_image")}
          name="table_image"
          accept="image/*"
          onChange={(e) => {
            handleImageChange(e);
            formik.setFieldValue("table_image", e.target.files[0]);
          }}
        />
        <ImagePreview preview={preview} />
   
        
        
        </>
        
    
  );
};

export default ImageWithTableForm;
