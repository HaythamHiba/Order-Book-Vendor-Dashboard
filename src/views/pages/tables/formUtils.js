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
      markers:[{
        top:25.55931502535118,
        left:10.932201450153933,
        id:55,
        table_image:"/storage/app/public/categories/TEJZe7YLCkAB9ZCkibMTLk2Af82xypASMk4SVmOY.png",
        max_number:55,
        min_number:15
      }],
      
    };
  }

  return {
    name: {
      ar:getLanguageAttr(objectToEdit.name,1) || "",
      en:getLanguageAttr(objectToEdit.name,0)|| ""
    },
    image: "",
    markers:objectToEdit?.markers || []

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
