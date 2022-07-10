import React from 'react'
import { Badge } from "reactstrap";
import { useTranslation } from 'utility/language';
export default function DiscountStatus({ status }) {
    const t = useTranslation();
    return (
        <Badge color={status ? "primary" : "danger"}>
            {status ? t("active") : t("inactive")}
        </Badge>
    )
}
