import React from "react"
import { useTranslation } from "react-i18next"

import "./index.scss"

const Languages = (props) => {
  const { t, i18n } = useTranslation()
  const { data = [], handleToggle, handleChange, textTranslate } = props
  const changeSelected = (e) => {
    handleToggle(e)
    handleChange(e)
  }

  return (
    <div className="search-dropdown p-1 mt-1">
      {/* <div className="pb-3 dropdown-title">{labelSearch}</div> */}
      {data.map((e, index) => (
        <div
          key={e.uuid + index}
          className="dropdown-hover"
          onClick={() => changeSelected(e)}
        >
          {e.translate && e.translate[i18n.language].name
            ? e.translate[i18n.language].name
            : e.name || textTranslate}
        </div>
      ))}
    </div>
  )
}

export default Languages
