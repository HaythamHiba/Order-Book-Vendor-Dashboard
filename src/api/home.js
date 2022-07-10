import { useGetQuery } from './helpers'
const API = {

    STATISTICS: "/api/vendor/statistics",
   

}
const KEY = {
    STATISTICS: "STATISTICS",
    YEARLY_STATISTICS: "YEARLYSTATISTICS"
}
export const useGetStatistics = () => useGetQuery(KEY.STATISTICS, API.STATISTICS);
