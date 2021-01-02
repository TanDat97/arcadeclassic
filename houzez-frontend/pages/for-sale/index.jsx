import React, { useEffect } from "react"

import SearchTop from "@components/SearchTop"
import ProductPage from "@components/ProductPage"

import "./index.scss"

const ForSale = () => {

  return (
    <div>
      <SearchTop />
      <ProductPage />
    </div>
  )
}

ForSale.pageTitle = "Sale"
export default ForSale
