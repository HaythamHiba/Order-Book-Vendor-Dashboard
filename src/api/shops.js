import {
  useGetQuery,

  useUpdateMutation,

} from "./helpers";

const API = {
  GET: `/api/vendor/my_shop`,
  UPDATE: `/api/vendor/shops/update`,

};

const KEY = "SHOPS";
export const useGetShop = (params) => useGetQuery(KEY, API.GET,params);
export const useUpdateShop = () => useUpdateMutation(KEY, API.UPDATE);

