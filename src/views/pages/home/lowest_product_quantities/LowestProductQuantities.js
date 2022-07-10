import React from 'react'
import DataTable from "react-data-table-component";
import { Card, CardBody, CardHeader } from 'reactstrap';
import { useTranslation } from 'utility/language';
import useTableColumns from './useTableColumns';

export default function LatestProductQuantities({ lowest_product_quantities }) {
    const columns = useTableColumns();
    const t = useTranslation();
    return (<Card>
        <CardHeader>
            {t("lowest_product_quantities")}
        </CardHeader>
        <CardBody>

        <DataTable
            columns={columns}
            data={lowest_product_quantities}
            noDataComponent={<h6 className="my-4">{t("no_records")}</h6>}
            noHeader
        />
        </CardBody>
    </Card>

    )
}
