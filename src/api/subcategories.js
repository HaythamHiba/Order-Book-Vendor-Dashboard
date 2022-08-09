import {
    useGetQuery,
    useDeleteMutation,
    useUpdateMutation,
    useAddMutation
  } from "./helpers";

  const API={
    GET:`/categories`,
    ADD:`/categories/create`,
    UPDATE:(id)=>`categories/${id}/update`,
    DELETE:`/delete`

  };
  const KEY="CATEGORIES";
  export const useGetSubcategories=(params)=>useGetQuery(KEY,API.GET,params,{enabled:!!params.parent_id});
  export const useAddSubcategory=()=>useAddMutation(KEY,API.ADD);
  export const useUpdateSubcategory=(id)=>useUpdateMutation(KEY,API.UPDATE(id));
  export const useDeleteSubcategory=(id)=>useDeleteMutation(KEY,API.DELETE)