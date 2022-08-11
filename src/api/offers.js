import {
    useGetQuery,
    useDeleteMutation,
    useUpdateMutation,
    useAddMutation
  } from "./helpers";

  const API={
    GET:`/offers`,
    ADD:`/offers/create`,
    UPDATE:(id)=>`offers/${id}/update`,
    DELETE:`/delete`

  };
  const KEY="CATEGORIES";
  export const useGetOffers=()=>useGetQuery(KEY,API.GET);
  export const useAddOffer=()=>useAddMutation(KEY,API.ADD);
  export const useUpdateOffer=(id)=>useUpdateMutation(KEY,API.UPDATE(id));
  export const useDeleteOffer=(id)=>useDeleteMutation(KEY,API.DELETE)