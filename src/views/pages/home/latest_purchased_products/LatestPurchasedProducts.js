import React from 'react'
import DataTable from "react-data-table-component";
import { Card, CardBody, CardHeader } from 'reactstrap';
import { useTranslation } from 'utility/language';
import useTableColumns from './useTableColumns';

export default function LatestOrdersTable({ latest_purchased_products }) {
    const columns = useTableColumns();
    const t = useTranslation();
    return (<Card>
        <CardHeader>
            {t("latest_purchased_products")}
        </CardHeader>
        <CardBody>

            <DataTable
                columns={columns}
                data={latest_purchased_products}
                noDataComponent={<h6 className="my-4">{t("no_records")}</h6>}
                noHeader
            />
        </CardBody>

    </Card>
    )
}
