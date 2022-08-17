import * as Yup from "yup";
import { getLanguageAttr } from "helpers/language";
import { buildFormData } from "api/helpers";

export const getInitialValues = (objectToEdit = null) => {
 
  if (!objectToEdit) {
    return {
      name: {
        ar:"",
        en:""
      },
      image:"",
      admin_note:"",
      status:"",
      
    };
  }

  return {
    name: {
      ar:getLanguageAttr(objectToEdit.name,1) || "",
      en:getLanguageAttr(objectToEdit.name,0)|| ""
    },
    image: "",
    status:objectToEdit?.status ,
    admin_note:objectToEdit?.admin_note || "",


  };
};

export const getValidationSchema = (editMode = false) => {
  return Yup.object().shape({
    name: Yup.object({
      ar:Yup.string().required("required"),
      en:Yup.string().required("required")
    }),

    ...(!editMode && {
      image: Yup.mixed().required("required"),
    }),
  });
};

export const getDataToSend = (values) => {
  const data = { ...values };
  if (values.image === "") {
    delete data["image"];
  }
  const formData = new FormData();
  buildFormData(formData, data);
  return formData;
};
