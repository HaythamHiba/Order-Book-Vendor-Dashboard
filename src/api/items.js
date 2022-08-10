import {
    useGetQuery,
    useDeleteMutation,
    useUpdateMutation,
    useAddMutation
  } from "./helpers";
  
  const API = {
    ADD: `/items/create`,
    GET_SINGLE_PRODUCT:(category_id,item_id)=> `/categories/${category_id}/items/${item_id}`,
    GET_ALL:(category_id)=> `/categories/${category_id}/items`,
    UPDATE_DETAILS:(item_id)=> `/items/${item_id}/update`,
    DELETE: `/delete`,
  
  };
  
  const KEY = "ITEMS";
  export const useGetItems = (params) =>
    useGetQuery(KEY, API.GET_ALL(params.id),params, { enabled: !!params.id });
  export const useAddItem = () => useAddMutation(KEY, API.ADD);

  export const useDeleteItem = () =>
    useDeleteMutation(KEY, API.DELETE, "product_id", "shops_products");
  
  const SINGLE_PRODUCT_KEY = "SINGLE_ITEM";
  const UPDATE_SINGLE_ITEM_KEY="UPDATE_KEY"
  export const useGetSingleItem = (category_id,item_id) =>
    useGetQuery(SINGLE_PRODUCT_KEY, API.GET_SINGLE_PRODUCT(category_id,item_id),null ,{},{category_id,item_id} );
  export const useUpdateDetailsMutation = (item_id) =>
  useUpdateMutation(UPDATE_SINGLE_ITEM_KEY, API.UPDATE_DETAILS(item_id));
 