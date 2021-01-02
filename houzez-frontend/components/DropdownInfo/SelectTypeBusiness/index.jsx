import React from "react"
import { useTranslation } from "react-i18next"

import "./index.scss"

const SelectTypeBusiness = (props) => {
  const { t, i18n } = useTranslation()
  const { handleToggle, handleChange, textTranslate } = props
  const data = [
    {
      key: "rent",
      value: "rent",
      name: t("search.rent"),
    },
    {
      key: "sale",
      value: "sale",
      name: t("search.sale"),
    },
  ]
  const changeSelected = (e) => {
    handleToggle(e)
    handleChange(e.value)
  }

  return (
    <div className="search-type p-1 mt-1">
      {/* <div className="pb-3 dropdown-title">{labelSearch}</div> */}
      {data.map((e, index) => (
        <div
          key={e.key + index}
          className="dropdown-hover"
          onClick={() => changeSelected(e)}
        >
          {e.name}
        </div>
      ))}
    </div>
  )
}

export default SelectTypeBusiness
