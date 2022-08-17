import React from "react";
import { ValidatedField } from "components/input/ValidatedField";
import { useTranslation } from "utility/language";
import { useFormikContext } from "formik";

import ImagePreview from "components/ImagePreview";
import { ImageURL } from "api/config";



const OneTableForm = ({ preview, handleImageChange, editMode = false }) => {
  const t = useTranslation();
  const formik = useFormikContext();
  
 

  return (
    
      <>
      
      
      <ValidatedField
        
        name="table_number"
        label={`${t("table_number")}`}
        placeholder={`${t("table_number")}`}
        type="number"

      />
        <ValidatedField
        
          name="max"
          label={`${t("max_number")}`}
          placeholder={`${t("max_number")}`}
          type="number"

        />
        <ValidatedField
        
          name="min"
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
            formik.setFieldValue("image_toView", e.target.files[0]);
          }}
        />
        <ImagePreview preview={preview} />
        {
          formik.values.qrCode!==""&&<>
          <ImagePreview preview={`${ImageURL}${formik.values.qrCode}`}/>
          
          </> 
        }
   
        
        
        </>
        
    
  );
};

export default OneTableForm;
