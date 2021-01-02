import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import Router, { useRouter } from "next/router"

import { Pagination } from "@material-ui/lab"

import ProductItem from "@components/widget/ProductItem"
import DropdownMenu from "@components/widget/DropdownMenu"
import SelectSort from "@components/DropdownInfo/SelectSort"
import Empty from "@components/utils/Empty"

import "./index.scss"

import { buildQuery } from "@utils"

const ProductPage = (props) => {
  const { t, i18n } = useTranslation("common")
  const router = useRouter()
  const dispatch = useDispatch()
  const dataSort = [
    {
      key: "default",
      value: "default",
      name: t("search.default"),
    },
    {
      key: "newest",
      value: "-created_at",
      name: t("search.newest"),
    },
    {
      key: "price_asc",
      value: "price",
      name: t("search.price_asc"),
    },
    {
      key: "price_desc",
      value: "-price",
      name: t("search.price_desc"),
    },
  ]

  const productData = useSelector((state) => state.home.productData)
  const isLoading = useSelector((state) => state.home.isLoading)

  const { page, sort } = router.query
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentSort, setCurrentSort] = useState("default")

  useEffect(() => {
    setCurrentPage(parseInt(page || 1))
    setCurrentSort(sort)
  }, [page, sort])

  useEffect(() => {
    onChangeConfig(currentPage)
  }, [currentPage])

  useEffect(() => {
    onChangeConfig(1, true)
  }, [currentSort])

  const onChangeConfig = (pageSearch, isSort = false) => {
    if (loading) {
      if (isSort) setCurrentPage(pageSearch)
      const query = buildQuery({
        ...router.query,
        page: pageSearch,
        sort: currentSort,
      })
      Router.push(`${router.pathname}?${query}`)
      window.scrollTo(0, 0)
    }
    setLoading(false)
  }

  const handleChangePage = (e, selectPage) => {
    setLoading(true)
    setCurrentPage(selectPage)
  }

  const getCurrentSortTitle = () => {
    const cur = dataSort.find((e) => e.value === currentSort)
    return cur ? cur.name : t("search.default")
  }

  return (
    <section className="main-section page-apartment">
      <div className="container-houzez">
        <div className="apartment-section">
          <div className="apartment-head">
            <div className="head-left">
              <h2 className="title">
                {t("page.rent")} {t("header.in")} {t("header.ho_chi_minh")}
              </h2>
              <div className="apartment-number">
                <p>
                  <span>
                    {productData.total || 0} {t("page.real_estate")}
                  </span>
                </p>
              </div>
            </div>
            <div className="head-right">
              <DropdownMenu
                className="select-sort handle-overflow"
                options={
                  <SelectSort
                    desktop={true}
                    handleChange={(e) => {
                      setLoading(true)
                      setCurrentSort(e)
                    }}
                    data={dataSort}
                  />
                }
              >
                <span id="select-sort">{getCurrentSortTitle()}</span>
              </DropdownMenu>
            </div>
          </div>
          <div className="apartment-wrap">
            <div className="apartment-page">
              {isLoading ? (
                <div className="project-change">
                  <div className="loader size-40"></div>
                </div>
              ) : productData.total > 0 ? (
                <div className="row">
                  {productData.items.map((e) => (
                    <div className="col-12 col-sm-6 col-lg-4" key={e.uuid}>
                      <ProductItem product={e} />
                    </div>
                  ))}
                </div>
              ) : (
                <Empty className="medium"/>
              )}
            </div>
            <div className="apartment-pagination">
              <Pagination
                count={productData.pages || 0}
                page={currentPage}
                onChange={handleChangePage}
                variant="outlined"
                color="secondary"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductPage
