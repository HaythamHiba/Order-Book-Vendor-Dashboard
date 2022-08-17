import React from 'react'

import { LoadingButton } from './input';
import { useTranslation } from 'utility/language';
import ReservationStatus from './ReservationStatus';
export default function ReservationStatusActionController({ reservation_status, reservtionMutation,reservationId }) {

    const t = useTranslation();
    const controll = {
        pending: {
            nextMutation: "accepted",
            nextLabel: "accept",
            nextColor: "primary",
            prevMutation: "rejected",
            prevLabel: "reject",
            prevColor: "danger",
        },
        accepted: {
            nextMutation: "finished",
            nextLabel: "finish",
            nextColor: "danger",

        },
        rejected: {
          

        },
        cancelled: {
          

        },
        finished: {
          

        },


    }
    return (
        <div >
            <div className="d-flex   align-items-center  justify-content-start   m-0.3" style={{ gap: "5px", flexDirection: "column" }}>
                <p >{t("status")}{" : "}{<ReservationStatus reservationStatus={reservation_status} />}</p>
                <div className="d-flex    align-items-center  justify-content-start " style={{ gap: "10px" }}>
                    {
                        controll[reservation_status].nextMutation && controll[reservation_status].nextLabel && <LoadingButton
                            style={{ margin: "10px" }}
                            color={controll[reservation_status].nextColor}
                            isLoading={reservtionMutation.isLoading}
                            onClick={() => reservtionMutation.mutate({ status: controll[reservation_status].nextMutation})}
                        >
                            {t(controll[reservation_status].nextLabel)}
                        </LoadingButton>
                    }

                    {
                        controll[reservation_status].prevMutation && controll[reservation_status].prevLabel && <LoadingButton
                            color={controll[reservation_status].prevColor}
                            isLoading={reservtionMutation.isLoading}
                            onClick={() => reservtionMutation.mutate({ status: controll[reservation_status].prevMutation})}

                        >
                            {t(controll[reservation_status].prevLabel)}
                        </LoadingButton>
                    }
                </div>

            </div>

        </div>
    )
}
