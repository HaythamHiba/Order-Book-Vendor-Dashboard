import {
    useGetQuery,
    useAddMutation,
    useUpdateMutation,
    useDeleteMutation,
    useToggleStatus,
  } from "./helpers";
  
  const API = {
    GET: `/api/vendor/discounts`,
    ADD: `/api/vendor/discount/add`,
    UPDATE: `/api/vendor/discount/update`,
    DELETE: `/api/vendor/discount/delete`,
    UPDATE_STATUS: `/api/vendor/discount/update_status`,
  };
  const KEY="DISCOUNTS";
  export const useGetDiscounts=()=>useGetQuery(KEY,API.GET);
  export const useAddDiscount = () => useAddMutation(KEY, API.ADD);
export const useUpdateDiscount = () => useUpdateMutation(KEY, API.UPDATE);
export const useDeleteDiscount = () =>
  useDeleteMutation(KEY, API.DELETE, "discount_id", );
export const useUpdateDiscountStatus = () =>
  useToggleStatus(KEY, API.UPDATE_STATUS, "discount_id", );