import React, { useMemo } from "react";
import { useTranslation } from "utility/language";

import { GrView } from "react-icons/gr";
import { history } from "../../../../history";


const useTableColumns = () => {
    const t = useTranslation();

    return useMemo(
        () => [
            {
                name: t("product_name"),
                selector: "product_name",
                sortable: false,
                center: true,
            },
            {
                name: t("product_purchasing_count"),
                selector: "product_purchasing_count",
                sortable: true,
                center: true,

            },

           
            {
                name: "#",
                selector: "action",
                sortable: false,
                center: true,
                cell: (row) => (
                   <GrView
                        onClick={() => history.push(`/products/view-one/${row.id}`)}
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
