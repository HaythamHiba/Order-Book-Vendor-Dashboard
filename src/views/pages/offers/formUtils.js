import * as Yup from "yup";
import { getLanguageAttr } from "helpers/language";
import { buildFormData } from "api/helpers";
import { formatFromBackend, formatToBackend } from "helpers/date";

export const getInitialValues = (objectToEdit = null) => {
  if (!objectToEdit) {
    return {
      name: {
        ar:"",
        en:""
      },
      description: {
        ar:"",
        en:""
      },
      image:"",
      price:"",
      from_date:"",
      to_date:"",
      admin_note:"",
      
    };
  }

  return {
    name: {
      ar:getLanguageAttr(objectToEdit.name,1) || "",
      en:getLanguageAttr(objectToEdit.name,0)|| ""
    },
    description: {
      ar:getLanguageAttr(objectToEdit.description,1) || "",
      en:getLanguageAttr(objectToEdit.description,0)|| ""
    },
    image: "",
    from_date: objectToEdit.from_date !== null ? formatFromBackend(objectToEdit?.from_date) : "",
    to_date: objectToEdit.to_date !== null ? formatFromBackend(objectToEdit?.to_date) : "",
    price:objectToEdit?.price || "",
    admin_note:objectToEdit?.admin_note || ""

  };
};

export const getValidationSchema = (editMode = false) => {
  return Yup.object().shape({
    name: Yup.object({
      ar:Yup.string().required("required"),
      en:Yup.string().required("required")
    }),
    description: Yup.object({
      ar:Yup.string().required("required"),
      en:Yup.string().required("required")
    }),

    ...(!editMode && {
      image: Yup.mixed().required("required"),
    }),
    price:Yup.string().required("required"),
    from_date: Yup.date().required("required"),
    to_date: Yup.date().min(
        Yup.ref('from_date'),
        "validation.to_date"
    ).required("required"),

  });
};

export const getDataToSend = (values) => {
  const data = { ...values };
  if (values.image === "") {
    delete data["image"];
  }
  const from_date=formatToBackend(data.from_date);
  const to_date=formatToBackend(data.to_date);
  const formData = new FormData();
  buildFormData(formData, {...data,from_date,to_date});
  return formData;
};
