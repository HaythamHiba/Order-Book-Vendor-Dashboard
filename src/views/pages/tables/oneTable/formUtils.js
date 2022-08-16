import * as Yup from "yup";

export const getInitialValues = (objectToEdit = null,marker=null) => {
  if (!objectToEdit) {
    return {
        max_number:"",
        min_number:"",
      table_image:"",
      top:marker?.top || "",
      left:marker?.left||"",
      
    };
  }

  return {
    max_number:objectToEdit?.max_number || "",
        min_number:objectToEdit?.min_number || "",
        top:objectToEdit?.top || "",
        left:objectToEdit?.left||"",
        table_image:"",
  };
};

export const getValidationSchema = (editMode = false) => {
  return Yup.object().shape({
    min_number:Yup.number().required("required"),
    max_number:Yup.number().min(
        Yup.ref('min_number'),
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
