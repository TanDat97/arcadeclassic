import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import Router, { useRouter } from "next/router"
import Link from "next/link"

import Modal from "@material-ui/core/Modal"
import Slider from "react-slick"

import { servicesGetDetailProduct } from "@services/homePage"

import ProductRelative from "@components/ProductRelative"
import SearchTop from "@components/SearchTop"
import ImageModal from "@components/utils/ImageModal"
import SimpleCollapse from "@components/widget/SimpleCollapse"
import Empty from "@components/utils/Empty"

import { ReactComponent as Square } from "@assets/images/icons/selection.svg"
import { ReactComponent as DoubleBed } from "@assets/images/icons/double-bed.svg"
import { ReactComponent as Bath } from "@assets/images/icons/bath.svg"
import { ReactComponent as Nightstand } from "@assets/images/icons/nightstand.svg"

import "./index.scss"

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
}

const ProductDetail = (props) => {
  const { t, i18n } = useTranslation("common")
  const { pid } = useRouter().query

  const [open, setOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const handleOpenModal = (index) => {
    setOpen(true)
    setCurrentIndex(index)
  }
  const handleCloseModal = () => {
    setOpen(false)
  }
  const [isSwiping, setSwiping] = useState(false)

  const [loading, setLoading] = useState(true)
  const [apartment, setApartment] = useState({})
  const [additional, setAadditional] = useState({})

  useEffect(() => {
    if (pid) searchProduct(pid)
  }, [pid])

  const searchProduct = async (slug) => {
    const result = await servicesGetDetailProduct(slug)
    const apartmentData = result
      ? result
      : {
          product: {},
          productAdditional: {},
        }
    setApartment(apartmentData.product)
    setAadditional(apartmentData.productAdditional)
    setLoading(false)
  }

  return (
    <div>
      <SearchTop />
      <div className="product-detail">
        {loading ? (
          <div className="apartment-change">
            <div className="loader size-40"></div>
          </div>
        ) : Object.keys(apartment).length > 0 &&
          apartment.constructor === Object ? (
          <>
            {apartment.gallery.length > 0 && (
              <div className="slide-container">
                <Slider {...settings}>
                  {apartment.gallery.map((e, index) => (
                    <div
                      key={index}
                      className="slide-image"
                      onMouseDown={() => {
                        setSwiping(false)
                      }}
                      onMouseMove={() => {
                        setSwiping(true)
                      }}
                      onMouseUp={(e) => {
                        if (!isSwiping && e.button === 0) {
                          handleOpenModal(index)
                        }
                        setSwiping(false)
                      }}
                    >
                      <img src={e} alt={apartment.name_product} />
                    </div>
                  ))}
                </Slider>
              </div>
            )}
            <div className="product-detail-heading"></div>

            <div className="product-detail-page">
              <div className="container-houzez">
                <div className="row">
                  <div className="col-xl-9 col-lg-8 mb-30">
                    <div className="listing-name mb-3">
                      <h1 className="product-name">{apartment.name_product}</h1>
                    </div>
                    <div className="product-heading d-flex pb-3 mb-3">
                      <div className="product-attribute">
                        <ul className="list-info">
                          <li className="code">
                            <p>{apartment.code}</p>
                          </li>
                          <li>
                            <Square />
                            <p>
                              {apartment.area} m<sup>2</sup>
                            </p>
                          </li>
                          <li>
                            <DoubleBed />
                            <p>{apartment.bedroom}</p>
                          </li>
                          <li>
                            <div className="icon bg-bathroom"></div>
                            <Bath />
                            <p>{apartment.bathroom}</p>
                          </li>
                          <li>
                            <Nightstand />
                            <p>{t(`header.${apartment.furniture}`)}</p>
                          </li>
                        </ul>
                      </div>
                      <div className="product-utils">
                        <div className="product-util-item rented-price">
                          <strong>{apartment.price}</strong>
                        </div>
                      </div>
                    </div>
                    <div className="product-info">
                      <div className="product-info-item">
                        <SimpleCollapse title={t("page.overview")}>
                          <div className="product-info-content">
                            {apartment.description}
                          </div>
                        </SimpleCollapse>
                      </div>
                      {apartment.furnitures && apartment.furnitures.length > 0 && (
                        <div className="product-info-item">
                          <SimpleCollapse
                            title={t("page.furniture")}
                          ></SimpleCollapse>
                        </div>
                      )}
                      <div className="product-info-item">
                        <SimpleCollapse title={t("page.area")}></SimpleCollapse>
                      </div>
                    </div>
                    {apartment.project_uuid &&
                      apartment.project_uuid != "0" && (
                        <ProductRelative
                          type_relative={"same_project"}
                          project_uuid={apartment.project_uuid}
                        />
                      )}

                    <ProductRelative type_relative={"same_price"} />
                  </div>
                  <div className="col-xl-3 col-lg-4"></div>
                </div>
              </div>
            </div>

            <Modal
              open={open}
              onClose={handleCloseModal}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              <ImageModal index={currentIndex} listImage={apartment.gallery} />
            </Modal>
          </>
        ) : (
          <Empty className="medium" />
        )}
      </div>
    </div>
  )
}

export default ProductDetail
