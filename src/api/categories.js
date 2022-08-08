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
  export const useGetCategories=()=>useGetQuery(KEY,API.GET);
  export const useAddCategory=()=>useAddMutation(KEY,API.ADD);
  export const useUpdateCategory=(id)=>useUpdateMutation(KEY,API.UPDATE(id));
  export const useDeleteCategory=(id)=>useDeleteMutation(KEY,API.DELETE)