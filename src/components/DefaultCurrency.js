import React from 'react'
import { LoadingButton } from './input';
import PaidIcon from '@mui/icons-material/Paid';
export default function DefaultCurrency({ defaultMutation, row }) {

  return (
    <LoadingButton
      color={row.is_default ? "primary" : "danger"}
      onClick={() => defaultMutation.mutate({ currency_id: row.id })}
      isLoading={defaultMutation.isLoading}
      style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <PaidIcon />
    </LoadingButton>
  )
}
