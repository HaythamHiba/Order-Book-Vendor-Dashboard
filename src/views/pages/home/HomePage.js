import React from 'react'
import { useTranslation } from 'utility/language'

export default function HomePage() {
  const t=useTranslation();
  return (

    <h1>{t("welcome_to_dashboard")}</h1>
  )
}
