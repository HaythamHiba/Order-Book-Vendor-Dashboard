import {
    useGetQuery,
    useDeleteMutation,
    useUpdateMutation
  } from "./helpers";
import { useAddMutationWithVariables } from "./helpers/useAddMutationWithVariables";
  
  const API = {
    ADD: `/items/create`,
    GET_SINGLE_PRODUCT:(category_id,item_id)=> `/categories/${category_id}/items/${item_id}`,
    GET_ALL:(category_id)=> `/categories/${category_id}/items`,
    UPDATE_DETAILS:(category_id,item_id)=> `/categories/${category_id}/items/${item_id}/update`,
    DELETE: `/delete`,
  
  };
  
  const KEY = "ITEMS";
  export const useGetItems = (params) =>
    useGetQuery(KEY, API.GET_ALL(params.id),params, { enabled: !!params.id });
  export const useAddItem = () => useAddMutationWithVariables(KEY, API.ADD);

  export const useDeleteItem = () =>
    useDeleteMutation(KEY, API.DELETE, "product_id", "shops_products");
  
  const SINGLE_PRODUCT_KEY = "SINGLE_ITEM";
  export const useGetSingleItem = (category_id,item_id) =>
    useGetQuery(SINGLE_PRODUCT_KEY, API.GET_SINGLE_PRODUCT(category_id,item_id) );
  export const useUpdateDetailsMutation = (category_id,item_id) =>
  useUpdateMutation(SINGLE_PRODUCT_KEY, API.UPDATE_DETAILS(category_id,item_id));
 