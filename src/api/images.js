import {
    useGetQuery,
   

    useUploadWithProgress,
   
  } from "./helpers";
  
  const API = {
    UPDATE_IMAGES: `/images`,
   
    GET_ALL: `/images`,
  
  };
  
  const KEY = "VENDOR_IMAGES";
  export const useGetImages = () => useGetQuery(KEY, API.GET_ALL);
 

  export const useUpdateImages = () =>
    useUploadWithProgress(KEY, API.UPDATE_IMAGES);
