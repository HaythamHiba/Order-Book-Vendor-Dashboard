import React, { useMemo } from "react";
import { useTranslation } from "utility/language";
import Actions from "components/table/TableActions";
// import { history } from "../../../history";
import HovarableImage from "components/HovarableImage";
import {  ImageURL } from "api/config";
import ReservationStatus from "components/ReservationStatus";
import { Badge } from "reactstrap";

const useTableColumns = (setEditModal, setObjectToEdit) => {
  const t = useTranslation();

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
            id={`rservation_table_image_${row.id}`}
            src={`${ImageURL}${row.table_image}`}
            width="35"
          />
        ),
      },
      {
        name: `${t("table_number")}`,
        sortable: false,
        center: true,
        cell: (row) =><>
        
        {row.table_number}
        </>
      },
      {
        name: `${t("number_of_people")}`,
        sortable: false,
        center: true,
        cell: (row) =><>
        
        {row.number_of_people}
        </>
      },
      {
        name: `${t("username")}`,
        sortable: false,
        center: true,
        cell: (row) =><>
        {row.user.name}
        
        </>
      },
      {
        name: `${t("userPhone")}`,
        sortable: false,
        center: true,
        cell: (row) =><>
        
        {row.user.phone_number}
        </>
      },
      {
        name: `${t("status")}`,
        sortable: false,
        center: true,
        cell: (row) =>
        <ReservationStatus reservationStatus={row.status} />
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
              showDelete={false}
          />
        ),
      },
    ],
    [t, setEditModal, setObjectToEdit]
  );
};

export default useTableColumns;
