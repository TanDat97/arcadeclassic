import React from "react"
import { useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import { saveSystemLanguage } from "@actions/user"
import { setLanguage } from "@utils"
import { sysLanguages } from "@constant"
import "./index.scss"

const Languages = (props) => {
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang.key)
    setLanguage(lang)
    dispatch(saveSystemLanguage(lang))
    props.handleToggle()
  }

  return (
    <div className="language-dropdown p-3 mt-5">
      {/* <div className="pb-3 dropdown-title">{props.language.value}</div> */}
      {sysLanguages.map((e) => (
        <div
          key={e.key}
          className="dropdown-hover"
          onClick={() => changeLanguage(e)}
        >
          {e.value}
        </div>
      ))}
    </div>
  )
}

export default Languages
