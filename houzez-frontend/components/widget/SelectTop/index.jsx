import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"

import DropdownMenu from "@components/widget/DropdownMenu"
import SearchData from "@components/DropdownInfo/SearchData"
import "./index.scss"

const SelectTop = ({ state, data, handleChange, textTranslate }) => {
  const { t, i18n } = useTranslation("common")
  const [active, setActive] = useState(false)
  useEffect(() => {
    if (state.uuid && data.findIndex((e) => e.uuid === state.uuid) > -1) {
      setActive(true)
    } else {
      setActive(false)
    }
  }, [state])

  return (
    <div className="form-group-top">
      <DropdownMenu
        className={`search-data top handle-overflow ${active ? "active" : ""}`}
        options={
          <SearchData
            desktop={true}
            data={data}
            handleChange={handleChange}
            textTranslate={textTranslate}
          />
        }
      >
        <span>
          {state.uuid
            ? state.translate && state.translate[i18n.language].name
              ? state.translate[i18n.language].name
              : state.name
            : textTranslate}
        </span>
      </DropdownMenu>
    </div>
  )
}

export default SelectTop
