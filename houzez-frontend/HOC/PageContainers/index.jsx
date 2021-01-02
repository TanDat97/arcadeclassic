import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import getConfig from "next/config"

import "./index.scss"

const { publicRuntimeConfig } = getConfig()
const PageContainers = () => {
  const { t, i18n } = useTranslation("common")
  const dispatch = useDispatch()

  const exeScrollPage = () => {
    const scrollDistance = window.scrollY
    const header = document.getElementsByClassName("header")
    if (scrollDistance > 0 && header[0].classList.value.indexOf("active") === -1) {
      header[0].classList.add("active")
    } else if(scrollDistance === 0) {
      header[0].classList.remove("active")
    }
  }

  useEffect(() => {
    window.removeEventListener("scroll", exeScrollPage, true)

    window.addEventListener("scroll", exeScrollPage, true)
    
    return () => {
      window.removeEventListener("scroll", exeScrollPage, true)
    }
  }, [])

  return (
    <div>
      
    </div>
  )
}

export default PageContainers
