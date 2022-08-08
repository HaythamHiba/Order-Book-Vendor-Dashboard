import React from "react";
// import { useGetStatistics } from "api/home";
// import SpinnerComponent from "components/@vuexy/spinner/Fallback-spinner";
import { MapContainer, TileLayer,Marker,useMapEvents } from 'react-leaflet'
import "leaflet/dist/leaflet.css";

import L from "leaflet";
// import Tabels from './Tabels'
export default function HomePage() {
  // const {data,isLoading}=useGetStatistics();
  const [location,setLocation]=React.useState("");
//   if (isLoading) {
//     return <SpinnerComponent />
// }
const position = [33.510414, 36.278336]


const LocationIcon = new L.Icon({
  iconUrl: require("../../../assets/img/svg/map-marker.png"),
  iconRetinaUrl: require("../../../assets/img/svg/map-marker.png"),
  iconSize: new L.Point(45, 45),
});

const MapEvents = () => {
  useMapEvents({
    click(e) {
      setLocation(prev=>{
        const newPos=[e.latlng.lat,e.latlng.lng]
        return newPos
      })
      // setState your coords here
      // coords exist in "e.latlng.lat" and "e.latlng.lng"
      console.log(e.latlng.lat);
      console.log(e.latlng.lng);
    },
  });
  return location?<Marker position={location} icon={LocationIcon}>
 
  </Marker>
  :null;
}

  return (
    <div dir="ltr" style={{height:"100vh",width:"100vh"}}>
  <MapContainer
      center={position}
      scrollWheelZoom={false}
      zoom={13}
      style={{ width: "100%", height: "30rem",zIndex:"10" }}
      
      onClick={(e)=>console.log(e)}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
     
     <MapEvents />

    </MapContainer>

      {/* <Tabels latest_purchased_products={data?.latest_purchased_products} lowest_product_quantities={data?.lowest_product_quantities}/> */}
    </div>
  );
}
