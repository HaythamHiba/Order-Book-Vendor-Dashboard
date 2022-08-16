import {
    useGetQuery,
    useDeleteMutation,
    useUpdateMutation,
    useAddMutation
  } from "./helpers";

  const API={
    GET:`/maps`,
    ADD:`/maps/create`,
    UPDATE:(id)=>`maps/${id}/update`,
    DELETE:`/delete`

  };
  const KEY="MAPS";
  export const useGetMaps=()=>useGetQuery(KEY,API.GET);
  export const useAddMap=()=>useAddMutation(KEY,API.ADD);
  export const useUpdateMap=(id)=>useUpdateMutation(KEY,API.UPDATE(id));
  export const useDeleteMap=(id)=>useDeleteMutation(KEY,API.DELETE)