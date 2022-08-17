

export const getInitialValues = (objectToEdit = null) => {
    if (!objectToEdit) {
      return {
          table_number:"",
       

          status:"",
          notes:"",
          name:"",
          phone:"",
          total_price:""
      };
    }
  
    return {
      table_number:objectToEdit?.table_number || "",
  

      status:objectToEdit?.status ,
      notes:objectToEdit?.notes || "",
      name:objectToEdit?.user?.name || "",
      phone:objectToEdit?.user?.phone_number || "",
      total_price:objectToEdit?.total_price || ""

  
    };
  };
  
  
  
  