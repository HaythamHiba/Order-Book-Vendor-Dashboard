import {
    useGetQuery,
    useUpdateMutation,
    
  } from "./helpers";

  const API={
    GET:(id)=>`/maps/${id}`,
   
    UPDATE:(id)=>`maps/${id}/tables/create`,
   

  };
  const KEY="MAPTABLES";
  export const useGetMapTables=(id)=>useGetQuery(KEY,API.GET(id),{},{endbled:!!id});

  export const useUpdateMapTables=(id)=>useUpdateMutation(KEY,API.UPDATE(id));
