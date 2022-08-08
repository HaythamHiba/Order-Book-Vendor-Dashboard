import React, { useMemo } from "react";
import { useDeleteCategory } from "api/categories";
import { useTranslation } from "utility/language";
import Actions from "components/table/TableActions";
// import { history } from "../../../history";
import { getLanguageAttr } from "helpers/language";
import HovarableImage from "components/HovarableImage";
import {  ImageURL } from "api/config";

const useTableColumns = (setEditModal, setObjectToEdit) => {
  const t = useTranslation();
  const deleteMutation = useDeleteCategory();

  return useMemo(
    () => [
     
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
          <Actions
            onEdit={() => {
              setEditModal(true);
              setObjectToEdit(row);
            }}
            onDelete={() => deleteMutation.mutate(  {
              categories:row.id
            } )}
          />
        ),
      },
    ],
    [t, deleteMutation, setEditModal, setObjectToEdit]
  );
};

export default useTableColumns;
