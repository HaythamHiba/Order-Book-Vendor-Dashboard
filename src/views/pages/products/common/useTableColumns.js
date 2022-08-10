import React, { useMemo } from "react";
import { useTranslation } from "utility/language";
import { history } from "../../../../history";

import HovarableImage from "components/HovarableImage";
import { ImageURL } from "api/config";
import { GrView } from "react-icons/gr";
import { getLanguageAttr } from "helpers/language";

const navigateToDetails = (row) => {
   const item_id=row.id;
    const category_id=row?.sub_category_id || row.category_id;
 

    history.push(`/items/view-one/${item_id}/category/${category_id}`);
  
};

const useTableColumns = ({ toggleMutation}) => {
  const t = useTranslation();

  return useMemo(
    () => [

      {
        name: t("image"),
        sortable: false,
        center: true,
        cell: (row) => (
          <HovarableImage
            id={`itam_image_${row.id}`}
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
        name: t("price"),
        selector: "price",
        sortable: true,
        center: true,
      },
    
 
      
      {
        name: "",
        selector: "action",
        sortable: false,
        center: true,
        cell: (row) => (
          <GrView
            onClick={() => navigateToDetails(row)}
            size={22}
            style={{ cursor: "pointer" }}
          />
        ),
      },
    ],
    [t]
  );
};

export default useTableColumns;
