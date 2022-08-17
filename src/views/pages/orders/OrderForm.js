import React from "react";
import { ValidatedField } from "components/input/ValidatedField";
import { useTranslation } from "utility/language";

import { Col, Row } from "reactstrap";

const OrderForm = ({ editMode = false }) => {
  const t = useTranslation();

  return (
    <>
    <Row xs={1} sm={1} md={1} lg={2} xl={2}>
      <Col>
        <ValidatedField
        readOnly
         
          name="table_number"
          label={`${t("table")}`}
          placeholder={`${t("table")}`}
        />

           <ValidatedField
           readOnly
          
          name="name"
          label={`${t("name")}`}
          placeholder={`${t("name")}`}
        />
           <ValidatedField
           readOnly
          
          name="phone"
          label={`${t("phone")}`}
          placeholder={`${t("phone")}`}
        />
  
        
   
      </Col>
      <Col>

        <ValidatedField
         readOnly
          
          name="notes"
          label={`${t("notes")}`}
          placeholder={`${t("notes")}`}
          as="textarea"
          rows="4"

        />
                    <ValidatedField
           readOnly
          
          name="total_price"
          label={`${t("total_price")}`}
          placeholder={`${t("total_price")}`}
        />
      </Col>
    </Row>

    </>
  );
};

export default OrderForm;
