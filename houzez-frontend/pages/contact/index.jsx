import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import getConfig from "next/config"

import SearchTop from "@components/SearchTop"
import ProductGroup from "@components/ProductGroup"

import "./index.scss"

const { publicRuntimeConfig } = getConfig()
const Contact = () => {
  const { t, i18n } = useTranslation("common")
  const dispatch = useDispatch()


  return (
    <div>
      <SearchTop />
      <ProductGroup />
      <ProductGroup />
    </div>
  )
}

Contact.pageTitle = "Contact"
export default Contact
