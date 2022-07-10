import React, { useMemo } from "react";
import { useBackendLanguageCode, useTranslation } from "utility/language";
import { history } from "../../../../history";
import { mapTranslatedProperties } from "helpers/language";
import { ToggleStatus } from "components/ToggleStatus";
import HovarableImage from "components/HovarableImage";
import { baseURL } from "api/config";
import { GrView } from "react-icons/gr";

const navigateToDetails = (id) => {


    history.push(`/products/view-one/${id}`);
  
};

const useTableColumns = ({ toggleMutation, additionalColumns = [] }) => {
  const t = useTranslation();
  const languageCode = useBackendLanguageCode();

  return useMemo(
    () => [
      
      {
        name: t("sort"),
        selector: "product_sort",
        sortable: true,
        center: true,
        width: "50px",
      },
      {
        name: t("image"),
        sortable: false,
        center: true,
        cell: (row) => (
          <HovarableImage
            id={`product_main_image_${row.id}`}
            src={`${baseURL}${row.product_main_image}`}
            width="35"
          />
        ),
      },
      {
        name: t("name"),
        sortable: false,
        center: true,
        cell: (row) =>
          mapTranslatedProperties(
            row.product_details,
            "product_name",
            languageCode
          ),
      },
      {
        name: t("price"),
        selector: "product_price",
        sortable: true,
        center: true,
      },
      {
        name: t("quantity"),
        selector: "product_quantity",
        sortable: true,
        center: true,
      },
      ...additionalColumns,
      {
        name: t("status"),
        sortable: false,
        center: true,
        cell: (row) => (
          <ToggleStatus object={row} toggleMutation={toggleMutation} />
        ),
      },
      {
        name: "",
        selector: "action",
        sortable: false,
        center: true,
        cell: (row) => (
          <GrView
            onClick={() => navigateToDetails(row.id)}
            size={22}
            style={{ cursor: "pointer" }}
          />
        ),
      },
    ],
    [t, languageCode, additionalColumns, toggleMutation]
  );
};

export default useTableColumns;
