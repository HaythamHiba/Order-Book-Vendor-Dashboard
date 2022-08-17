import {
    useGetQuery,

    useUpdateMutation,

  } from "./helpers";

  const API={
    GET:`/orders`,
  
    UPDATE:(id)=>`orders/${id}/changeStatus`,
  

  };
  const KEY="ORDERS";
  export const useGetOrders=(params)=>useGetQuery(KEY,API.GET,params);
  export const useUpdateOrder=(id)=>useUpdateMutation(KEY,API.UPDATE(id));
