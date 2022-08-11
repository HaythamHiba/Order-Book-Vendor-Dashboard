import React, { useMemo } from "react";
import { useTranslation } from "utility/language";
import Actions from "components/table/TableActions";
// import { history } from "../../../history";
import { getLanguageAttr } from "helpers/language";
import HovarableImage from "components/HovarableImage";
import {  ImageURL } from "api/config";
import { useDeleteOffer } from "api/offers";
import { Badge } from "reactstrap";

const useTableColumns = (setEditModal, setObjectToEdit) => {
  const t = useTranslation();
  const deleteMutation = useDeleteOffer();

  return useMemo(
    () => [
      {
        name:t("status"),
        sortable: false,
        center: true,
        cell:(row)=><Badge color={row.status?"secondary":"danger"}>{ row.status?t("active"):t("inactive")}</Badge>
      },
     
      {
        name: t("image"),
        sortable: false,
        center: true,
        cell: (row) => (
          <HovarableImage
            id={`offer_image${row.id}`}
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
              offers:row.id
            } )}
          />
        ),
      },
    ],
    [t, deleteMutation, setEditModal, setObjectToEdit]
  );
};

export default useTableColumns;
