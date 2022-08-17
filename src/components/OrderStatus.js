import React from "react";
import { Badge } from "reactstrap";
import { useTranslation } from "utility/language";

import PropTypes from "prop-types";

const OrderStatus = ({ order_status }) => {
    const t = useTranslation();
    const all={
        pending:{color:"secondary"},
        accepted:{color:"success"},
        rejected:{color:"danger"},
        cancelled:{color:"danger"},
        finished:{color:"success"},
    
    }
    

    
  return (
        <Badge color={all[order_status].color}>
                {t(order_status)}
        </Badge>
  );
};

OrderStatus.propTypes = {
    order_status: PropTypes.string.isRequired,
};

export default OrderStatus;
