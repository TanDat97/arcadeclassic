import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"

import "./index.scss"

const Empty = (props) => {
  const { t, i18n } = useTranslation("common")
  const { className } = props
  return (
    <div className="empty-section">
      <img
        src="/images/empty.png"
        alt="empty section"
        className={`${className ? className : ""}`}
      />
    </div>
  )
}

export default Empty
