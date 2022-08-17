import {
    useGetQuery,

    useUpdateMutation,

  } from "./helpers";

  const API={
    GET:`/reservations`,
  
    UPDATE:(id)=>`reservations/${id}/changeStatus`,
  

  };
  const KEY="RESERVATIONS";
  export const useGetTablesReservations=(params)=>useGetQuery(KEY,API.GET,params);
  export const useUpdateTableReservationStatus=(id)=>useUpdateMutation(KEY,API.UPDATE(id));
