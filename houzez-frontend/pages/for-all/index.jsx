import React, { useEffect } from "react"

import SearchTop from "@components/SearchTop"
import ProductPage from "@components/ProductPage"

import "./index.scss"

const ForAll = () => {

  return (
    <div>
      <SearchTop />
      <ProductPage />
    </div>
  )
}

ForAll.pageTitle = "All"
export default ForAll
