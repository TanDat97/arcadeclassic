import React from "react"
import { useTranslation } from "react-i18next"

import "./index.scss"

const SelectStatus = (props) => {
  const { t, i18n } = useTranslation()
  const { handleToggle, handleChange, data } = props

  const changeSelected = (e) => {
    handleToggle(e)
    handleChange(e.value)
  }

  return (
    <div className="select-status p-1 mt-1">
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

export default SelectStatus
