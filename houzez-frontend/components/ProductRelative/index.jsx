import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import Router from "next/router"
import Link from "next/link"

import ProductItem from "@components/widget/ProductItem"

import "./index.scss"

import { servicesGetAllProduct } from "@services/homePage"
import { getInitDataFilter, buildQuery } from "@utils"
import Empty from "@components/utils/Empty"

const ProductGroup = (props) => {
  const { t, i18n } = useTranslation("common")

  const {
    type_relative = "same_price",
    project_uuid,
    price_from,
    price_to,
    className,
  } = props
  const title = t(`page.${type_relative}`)

  const [init, setInit] = useState(false)
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])

  useEffect(() => {
    getAllProductForGroup()
    setInit(true)
  }, [])

  const getAllProductForGroup = async () => {
    setLoading(true)
    let query = ""
    if (project_uuid) {
      query = `project_uuid=${project_uuid}`
    } else if (price_from && price_to) {
      query = `price_from=${price_from}&price_to=${price_to}`
    }
    if (query !== "") {
      const productData = await servicesGetAllProduct(query)
      setProducts(productData.items)
    }
    setLoading(false)
  }

  const clickSeeAll = () => {
    Router.push(
      `/for-${type_business}?type_uuid=${currentType ? currentType : ""}`
    )
  }

  return (
    <section className={`${className ? className : ""} list-project`}>
      <div className="container-houzez">
        <div className="project-section">
          <h2 className="houzez-title small">{title}</h2>
          <span onClick={clickSeeAll} className="btn-link btn-see-all">
            {t("group.see_all")}
          </span>
          <div className="project-tab">
            <div className="project-wrap">
              <div className="project-list">
                {loading || !init ? (
                  <div className="project-change">
                    <div className="loader size-40"></div>
                  </div>
                ) : products.length > 0 ? (
                  <div className="row">
                    {products.map((e) => (
                      <div className="col-12 col-sm-6 col-lg-4" key={e.uuid}>
                        <ProductItem product={e} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <Empty className="small"/>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductGroup
