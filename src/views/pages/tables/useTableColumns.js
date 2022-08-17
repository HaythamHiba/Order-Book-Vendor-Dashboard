import React, { useMemo } from "react";
import { useDeleteCategory } from "api/categories";
import { useTranslation } from "utility/language";
import Actions from "components/table/TableActions";
// import { history } from "../../../history";
import { getLanguageAttr } from "helpers/language";
import HovarableImage from "components/HovarableImage";
import {  ImageURL } from "api/config";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { history } from "../../../history";
import { Badge } from "reactstrap";

const useTableColumns = (setEditModal, setObjectToEdit) => {
  const t = useTranslation();
  const deleteMutation = useDeleteCategory();

  return useMemo(
    () => [
      
        {
          name:t("status"),
          sortable: false,
          center: true,
          cell:(row)=><Badge color={row.status?"success":"danger"}>{ row.status?t("active"):t("inactive")}</Badge>
        
      },
     
      {
        name: t("image"),
        sortable: false,
        center: true,
        cell: (row) => (
          <HovarableImage
            id={`category_image_${row.id}`}
            src={`${ImageURL}${row.image}`}
            width="35"
          />
        ),
      },
      {
        name: `${t("name")} (${t("en")})`,
        sortable: false,
        center: true,
        cell: (row) =>
          getLanguageAttr(row.name, 0),
      },
      {
        name: `${t("name")} (${t("ar")})`,
        sortable: false,
        center: true,
        cell: (row) =>
        getLanguageAttr(row.name, 1),
      },
    
     
      {
        name: "#",
        sortable: false,
        center: true,
        cell: (row) => (
          <>
          <div style={{padding:"0 15px",cursor:"pointer"}}>

            <AddLocationAltIcon onClick={()=>history.push(`map/${row.id}/chart`)} size={20}/>
          </div>
          <Actions
            onEdit={() => {
              setEditModal(true);
              setObjectToEdit(row);
            }}
            onDelete={() => deleteMutation.mutate(  {
              maps:row.id
            } )}
          />
          </>
        ),
      },
    ],
    [t, deleteMutation, setEditModal, setObjectToEdit]
  );
};

export default useTableColumns;
