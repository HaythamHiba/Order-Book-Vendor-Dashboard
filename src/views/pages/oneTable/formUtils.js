import * as Yup from "yup";

export const getInitialValues = (objectToEdit = null,marker=null) => {
  if (!objectToEdit) {
    return {
        max:"",
        min:"",
      table_image:"",
      top:marker?.top || "",
      left:marker?.left||"",
      
    };
  }

  return {
    max:objectToEdit?.max || "",
        min:objectToEdit?.min || "",
        top:objectToEdit?.top || "",
        left:objectToEdit?.left||"",
        table_image:"",
  };
};

export const getValidationSchema = (editMode = false) => {
  return Yup.object().shape({
    min:Yup.number().required("required"),
    max:Yup.number().min(
        Yup.ref('min'),
        "validation.max_number"
    ).required("required"),
  
    ...(!editMode && {
      table_image: Yup.mixed().required("required"),
    }),
  });
};

export const getDataToSend = (values) => {
  const data = { ...values };
  if (values.table_image === "") {
    delete data["table_image"];
  }
 
  return data;
};
