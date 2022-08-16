import React from "react";
import { ValidatedField } from "components/input/ValidatedField";
import { useTranslation } from "utility/language";
import { useFormikContext } from "formik";
import ImageMarker from "react-image-marker";
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import AddOneTableModal from "./oneTable/AddOneTableModal";
import EditOneTableModal from "./oneTable/EditOneTableModal";

  

const ImageWithTableForm = ({ preview, handleImageChange, editMode = false }) => {
  const t = useTranslation();
  const formik = useFormikContext();
  const [markers,setMarkers]=React.useState(formik.values.markers);
  const [addModal, setAddModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const [objectToEdit,setObjectToEdit]=React.useState({});
  const [marker,setMarker]=React.useState({});

  const CustomMarker = (props) => {
  
    return (
      <>
  
       <div onClick={()=>{setEditModal(true);setObjectToEdit(props)}}  style={{display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
        <p style={{color:"#FF7314"}}>{props.itemNumber + 1}</p>
       
  
      <TableRestaurantIcon htmlColor="#FF7314" size={25}/>
       
       </div>
      </>
  
    );
  };

  const addMarker=(marker) => {setAddModal(true); setMarker(marker) }

  console.log(markers)
  return (
    
      <>
        <ValidatedField
          dir="ltr"
          name="name[en]"
          label={`${t("category_name")} (${t("en")})`}
          placeholder={`${t("category_name")} (${t("en")})`}
        />
        <ValidatedField
          dir="rtl"
          name="name[ar]"
          label={`${t("category_name")} (${t("ar")})`}
          placeholder={`${t("category_name")} (${t("ar")})`}
        />
   <ValidatedField
          id="image"
          type="file"
          label={t("tables_image")}
          name="image"
          accept="image/*"
          onChange={(e) => {
            handleImageChange(e);
            formik.setFieldValue("image", e.target.files[0]);
          }}
        />
   
        {
          preview&& <ImageMarker
          src={preview}
          markers={markers}
          onAddMarker={addMarker}
          markerComponent={CustomMarker}
          
        />
        }
        
        <AddOneTableModal isOpen={addModal} setIsOpen={setAddModal} marker={marker} setMarkers={setMarkers}/>  
        <EditOneTableModal isOpen={editModal} setIsOpen={setEditModal} objectToEdit={objectToEdit} marker={marker} setMarkers={setMarkers} markers={markers}/>
        </>
        
    
  );
};

export default ImageWithTableForm;
