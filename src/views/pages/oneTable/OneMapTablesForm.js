import React from 'react'
import ImageMarker from "react-image-marker";
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import AddOneTableModal from "./AddOneTableModal";
import EditOneTableModal from "./EditOneTableModal";
export default function OneMapTablesForm({preview,marks}) {

    const [markers,setMarkers]=React.useState(marks);
    const [addModal, setAddModal] = React.useState(false);
    const [editModal, setEditModal] = React.useState(false);
    const [objectToEdit,setObjectToEdit]=React.useState({});
    const [marker,setMarker]=React.useState({});
    

    const CustomMarker = (props) => {
  
        return (
          <>
      
           <div onClick={()=>{setEditModal(true);setObjectToEdit(props)}} 
            style={{display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
          <TableRestaurantIcon htmlColor="#FF7314" size={25}/>
           
           </div>
          </>
      
        );
      };
    
      const addMarker=(marker) => {setAddModal(true); setMarker(marker) }

  return (
    <>
    {
          preview&& <ImageMarker
          src={preview}
          markers={markers}
          onAddMarker={addMarker}
          markerComponent={CustomMarker}
          
        />
        }
        
        <AddOneTableModal isOpen={addModal} 
        setIsOpen={setAddModal} 
        marker={marker} 
        setMarkers={setMarkers}
        markers={markers}
        />  

        <EditOneTableModal isOpen={editModal} 
        setIsOpen={setEditModal} 
        objectToEdit={objectToEdit} 
        setMarkers={setMarkers}
         markers={markers}
     
         />
    </>
  )
}
