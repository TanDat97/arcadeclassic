import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import Router from "next/router"
import Link from "next/link"

import { ReactComponent as Square } from "@assets/images/icons/selection.svg"
import { ReactComponent as DoubleBed } from "@assets/images/icons/double-bed.svg"
import { ReactComponent as Bath } from "@assets/images/icons/bath.svg"
import { ReactComponent as Nightstand } from "@assets/images/icons/nightstand.svg"

import "./index.scss"

const ProductItem = (props) => {
  const { t, i18n } = useTranslation("common")
  const {
    product
  } = props
  return (
    <div className="product-item">
      <div className="product-image">
        <Link href={`/product/${product.slug}`}>
          <div className="image">
            <div className="image-link">
              <img src={product.image || ""} alt="image apartment" width="390" height="290" />
            </div>
            <div className="view-detail">
              <span className="btn-view-detail">{t("group.see_detail")}</span>
            </div>
          </div>
        </Link>
      </div>
      <div className="product-description">
        <div className="top-description">
          <Link href={`/product/${product.slug}`}>
            <div className="title">{product.name_product}</div>
          </Link>
          <div className="address">
            <address>{product.location}</address>
          </div>
          <ul className="list-info">
            <li>
              <Square />
              <p>
                {product.area} m<sup>2</sup>
              </p>
            </li>
            <li>
              <DoubleBed />
              <p>{product.bedroom}</p>
            </li>
            <li>
              <div className="icon bg-bathroom"></div>
              <Bath />
              <p>{product.bathroom}</p>
            </li>
            <li>
              <Nightstand />
              <p>{t(`header.${product.furniture}`)}</p>
            </li>
          </ul>
        </div>
        <div className="bottom-description">
          <div className="bottom-left">
            <div className="price">
              <p>{product.price}</p>
            </div>
          </div>
          <div className="bottom-right">
            <div className="code">
              <p>{product.code}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductItem
