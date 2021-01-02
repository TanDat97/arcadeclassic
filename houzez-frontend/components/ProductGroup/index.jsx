import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import Router from "next/router"
import Link from "next/link"

import ProductItem from "@components/widget/ProductItem"
import Empty from "@components/utils/Empty"

import "./index.scss"

import { servicesGetAllProduct } from "@services/homePage"
import { getInitDataFilter, buildQuery } from "@utils"

const ProductGroup = (props) => {
  const { t, i18n } = useTranslation("common")

  const { type_business = "rent" } = props
  const title = t(`page.for_${type_business}`)

  const [currentType, setCurrentType] = useState(null)
  const [loading, setLoading] = useState(false)
  const [init, setInit] = useState(false)
  const [aparmentData, setApartmentData] = useState([])
  const [apartments, setApartments] = useState([])

  const dataFilter = useSelector((state) => state.home.dataFilter)
  const types = getInitDataFilter(dataFilter.types)

  useEffect(() => {
    getAllProductForGroup(type_business, currentType)
    setInit(true)
  }, [])

  const getAllProductForGroup = async (type_business, type_uuid) => {
    setLoading(true)
    const query = buildQuery({ type_business, type_uuid })
    const apartmentData = await servicesGetAllProduct(query)
    setApartmentData(apartmentData)
    setApartments(apartmentData)
    changeTabApartment(null)
    setLoading(false)
  }

  const onClickTab = (e) => {
    setCurrentType(e.uuid)
    changeTabApartment(e.uuid)
  }

  const changeTabApartment = (type_uuid) => {}

  const clickSeeAll = () => {
    Router.push(
      `/for-${type_business}?type_uuid=${currentType ? currentType : ""}`
    )
  }

  return (
    <section className="main-section list-apartment">
      <div className="container-houzez">
        <div className="apartment-section">
          <h2 className="houzez-title">{title}</h2>
          <div className="apartment-tab">
            <span onClick={clickSeeAll} className="btn-link btn-see-all">
              {t("group.see_all")}
            </span>

            <ul className="tabs-list">
              {types.map((e) => (
                <li
                  className={currentType === e.uuid ? "active" : ""}
                  key={e.uuid}
                  onClick={(event) => onClickTab(e)}
                >
                  <span className="btn-link">
                    {e.translate && e.translate[i18n.language].name
                      ? e.translate[i18n.language].name
                      : e.name || t("group.all")}
                  </span>
                </li>
              ))}
            </ul>

            <div className="apartment-wrap">
              <div className="apartment-list">
                {loading || !init ? (
                  <div className="apartment-change">
                    <div className="loader size-40"></div>
                  </div>
                ) : apartments.total > 0 ? (
                  <div className="row">
                    {apartments.items.map((e) => (
                      <div className="col-12 col-sm-6 col-lg-4" key={e.uuid}>
                        <ProductItem product={e} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <Empty className="medium"/>
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
