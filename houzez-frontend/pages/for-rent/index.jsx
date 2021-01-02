import React, { useEffect } from "react"

import SearchTop from "@components/SearchTop"
import ProductPage from "@components/ProductPage"

import "./index.scss"

const ForRent = () => {

  return (
    <div>
      <SearchTop />
      <ProductPage />
    </div>
  )
}

ForRent.pageTitle = "Rent"
export default ForRent
