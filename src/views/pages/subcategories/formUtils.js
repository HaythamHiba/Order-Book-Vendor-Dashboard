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
      parent_id:"",
      
    };
  }

  return {
    name: {
      ar:getLanguageAttr(objectToEdit.name,1) || "",
      en:getLanguageAttr(objectToEdit.name,0)|| ""
    },
    image: "",
    parent_id:objectToEdit?.parent_id || "",

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
      parent_id:Yup.string().required("required")
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
