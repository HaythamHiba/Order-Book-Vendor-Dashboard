

export const getInitialValues = (objectToEdit = null) => {
  if (!objectToEdit) {
    return {
        table_number:"",
        number_of_people:"",
        date:"",
        status:"",
        notes:"",
        name:"",
        phone:""
    };
  }

  return {
    table_number:objectToEdit?.table_number || "",
    number_of_people:objectToEdit?.number_of_people || "",
    date:objectToEdit?.date || "",
    status:objectToEdit?.status || "",
    notes:objectToEdit?.notes || "",
    name:objectToEdit?.user?.name || "",
    phone:objectToEdit?.user?.phone_number || "",

  };
};



