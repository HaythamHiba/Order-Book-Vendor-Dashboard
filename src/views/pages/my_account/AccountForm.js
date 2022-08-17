import { ImageURL } from 'api/config';
import ImagePreview from 'components/ImagePreview';
import { ValidatedField } from 'components/input'
import { useFormikContext } from 'formik';
import React from 'react'
import { useTranslation } from 'utility/language'
export default function AccountForm() {
    const t = useTranslation();
    const formik=useFormikContext();
    return (
        <>
            <ValidatedField
                name="username"
                label={t("username")}
                placeholder={t("username")}
                
            />
                   <ValidatedField
                name="name_ar"
                label={`${t("name")} (${t("ar")})`}
                placeholder={`${t("name")} (${t("ar")})`}
                
            />
            
            <ValidatedField
                name="name_en"
                label={`${t("name")} (${t("en")})`}
                placeholder={`${t("name")} (${t("en")})`}
                
            />
            

         
            
      
        <ImagePreview preview={`${ImageURL}${formik.values.logo}`} />
        </>
    )
}
