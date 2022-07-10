import {
  useGetQuery,

} from "./helpers";

const API = {
  GET: `/api/vendor/currencies`,

};
const KEY = "CURRENCY";
export const useGetCurrencies = () => useGetQuery(KEY, API.GET);
