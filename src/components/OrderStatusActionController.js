import React from 'react'

import { LoadingButton } from './input';
import { useTranslation } from 'utility/language';
import OrderStatus from './OrderStatus';
export default function OrderStatusActionController({ order_status, orderMutation }) {

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
            <div className="d-flex   align-items-center  justify-content-start   m-1" style={{ gap: "10px", flexDirection: "column" }}>
                <p >{t("status")}{" : "}{<OrderStatus order_status={order_status} />}</p>
                <div className="d-flex    align-items-center  justify-content-start   m-1" style={{ gap: "10px" }}>
                    {
                        controll[order_status].nextMutation && controll[order_status].nextLabel && <LoadingButton
                            style={{ margin: "10px" }}
                            color={controll[order_status].nextColor}
                            isLoading={orderMutation.isLoading}
                            onClick={() => orderMutation.mutate({ status: controll[order_status].nextMutation})}
                        >
                            {t(controll[order_status].nextLabel)}
                        </LoadingButton>
                    }

                    {
                        controll[order_status].prevMutation && controll[order_status].prevLabel && <LoadingButton
                            color={controll[order_status].prevColor}
                            isLoading={orderMutation.isLoading}
                            onClick={() => orderMutation.mutate({ status: controll[order_status].prevMutation})}

                        >
                            {t(controll[order_status].prevLabel)}
                        </LoadingButton>
                    }
                </div>

            </div>

        </div>
    )
}
