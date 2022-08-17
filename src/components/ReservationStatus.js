import React from "react";
import { Badge } from "reactstrap";
import { useTranslation } from "utility/language";

import PropTypes from "prop-types";

const ReservationStatus = ({ reservationStatus }) => {
    const t = useTranslation();
    const all={
        pending:{color:"secondary"},
        accepted:{color:"success"},
        rejected:{color:"danger"},
        cancelled:{color:"danger"},
        finished:{color:"success"},
    
    }
    

    
  return (
        <Badge color={all[reservationStatus].color}>
                {t(reservationStatus)}
        </Badge>
  );
};

ReservationStatus.propTypes = {
    reservationStatus: PropTypes.string.isRequired,
};

export default ReservationStatus;
