import * as Yup from "yup";

export const getInitialValues = (objectToEdit = null,marker=null) => {
  if (!objectToEdit) {
    return {
        max:"",
        min:"",
      table_image:"",
      top:marker?.top || "",
      left:marker?.left||"",
      qrCode:"",
      table_number:"",
      
    };
  }

  return {
    max:objectToEdit?.max || "",
        min:objectToEdit?.min || "",
        top:objectToEdit?.top || "",
        left:objectToEdit?.left||"",
        table_image:"",
        image_toView:objectToEdit?.table_image || "",
        qrCode:objectToEdit?.qrCode || "",
        table_number:objectToEdit?.table_number||"",
  };
};

export const getValidationSchema = (editMode = false) => {
  return Yup.object().shape({
    min:Yup.number().required("required"),
    max:Yup.number().min(
        Yup.ref('min'),
        "validation.max_number"
    ).required("required"),
    table_number:Yup.number().required("required"),
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
