import React, { useMemo } from "react";
import { useBackendLanguageCode, useTranslation } from "utility/language";
// import { history } from "../../../history";
import HovarableImage from "components/HovarableImage";
import {  ImageURL } from "api/config";
import { getLanguageAttr } from "helpers/language";

const useItemsTableColumns = () => {
  const t = useTranslation();
const lang=useBackendLanguageCode();
  return useMemo(
    () => [
     
      {
        name: t("image"),
        sortable: false,
        center: true,
        cell: (row) => (
          <HovarableImage
            id={`item_image_${row.id}`}
            src={`${ImageURL}${row.image}`}
            width="35"
          />
        ),
      },
      {
        name: `${t("name")}`,
        sortable: false,
        center: true,
        cell: (row) =>
        <>{getLanguageAttr(row.name,lang)}</>
      },
      {
        name: `${t("quantity")}`,
        sortable: false,
        center: true,
        cell: (row) =>
        <>{row.quantity}</>
      },
      {
        name: `${t("note")}`,
        sortable: false,
        center: true,
        cell: (row) =>
        <>{row.note}</>
      },
      {
        name: `${t("price")}`,
        sortable: false,
        center: true,
        cell: (row) =>
        <>{row.price}</>
      },
    
     

    ],
    [t,lang]
  );
};

export default useItemsTableColumns;
