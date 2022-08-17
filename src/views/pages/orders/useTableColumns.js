import React, { useMemo } from "react";
import { useTranslation } from "utility/language";
import Actions from "components/table/TableActions";

import ReservationStatus from "components/ReservationStatus";

const useTableColumns = ({
  setEditModal,
  setObjectToEdit,
  
}) => {
  const t = useTranslation();

  return useMemo(
    () => [
    
      {
        name: `${t("table_number")}`,
        sortable: false,
        center: true,
        cell: (row) =><>
        
        {row.table_number}
        </>
      },
      {
        name: `${t("name")}`,
        sortable: false,
        center: true,
        cell: (row) =><>
        {row.user.name}
        
        </>
      },
      {
        name: `${t("phone")}`,
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
    [t,  setEditModal, setObjectToEdit]
  );
};

export default useTableColumns;
