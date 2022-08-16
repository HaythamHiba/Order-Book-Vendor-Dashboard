import { useGetMapTables, useUpdateMapTables } from 'api/mapTables';
import { LoadingButton } from 'components/input';
import { StatusCard } from 'components/StatusCard';
import { getLanguageAttr } from 'helpers/language';
import { useImagePreview } from 'hooks';
import React from 'react'
import { useParams } from 'react-router-dom'
import { Card, CardBody, CardFooter, CardHeader } from 'reactstrap';
import { useBackendLanguageCode, useTranslation } from 'utility/language';
import { Formik, Form } from "formik";
import OneMapTablesForm from './OneMapTablesForm';
import { ImageURL } from 'api/config';
import { buildFormData } from 'api/helpers';


export default function OneTableChartPage() {
    const {id}=useParams();
    const {data,isLoading,isSuccess}=useGetMapTables(id);
    const mutation=useUpdateMapTables(id);
    const lang=useBackendLanguageCode();
    const t=useTranslation();

    if(isLoading){
        <StatusCard isLoading={isLoading}/>
    }
    const mapData=data?data:{};
    const chartImage = mapData?.image;
    const { preview,setPreview } =
      useImagePreview(chartImage);

      React.useEffect(() => {
        if (isSuccess) {
          setPreview(`${ImageURL}${chartImage}`);
        }
      }, [isSuccess, setPreview, chartImage]);
    const  handleSubmit=(values)=>{
           
           const formData = new FormData();
           buildFormData(formData, values);
           mutation.mutate(formData);
        
      }
  return (
   isSuccess&& <>
    
    <Card>
        <CardHeader>
    <h1>{getLanguageAttr(mapData.name,lang)}</h1>
            
        </CardHeader>
       
        <Formik
        onSubmit={handleSubmit}
        initialValues={{markers:[],deleted_markers:[]}}
        
      >
        {(formik) => (
          <Form>
           <CardBody>
              <OneMapTablesForm
                preview={preview}
                marks={mapData?.markers}
                
              />
           </CardBody>
            <CardFooter>
        
              <LoadingButton
                type="submit"
                color="primary"
               isLoading={mutation.isLoading}
              >
                {t("save")}
              </LoadingButton>
            </CardFooter>
          </Form>
        )}
      </Formik>

       

    </Card>
   
  </>
  )
}
