import { useGetImages,useUpdateImages } from 'api/images';
import { StatusCard } from 'components/StatusCard';
import React from 'react'

import AdditionalImages from './AdditionalImages';


export default function ImagesPage() {
    const updateMutation=useUpdateImages();
   const {data :images,isLoading}=useGetImages();
   const data=images?images:[];

   if(isLoading){
    return <StatusCard isLoading={isLoading}/>
   }
  return (
    <>
    
    <AdditionalImages data={data} mutation={updateMutation}/>
    </>
  )
}
