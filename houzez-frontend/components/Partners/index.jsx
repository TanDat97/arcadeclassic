import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"

import "./index.scss"

const RenderPartner = (props) => {
  return (
    <div className="col-4 col-sm-4 col-md-3 col-lg-2-3 col-xl-2 customer-item">
      <div className="image">
        <img
          alt=""
          loading="lazy"
          className="lazyload loading"
          src="https://img.hoozing.com/400/HoozingWebsite/GeneralSettings/dbd38743-06d5-471e-855f-88dd42d612c4/fa72d37d-297e-4a39-a05f-3bfc946adebc.jpg"
          data-ll-status="loading"
        />
      </div>
    </div>
  )
}

const Partners = (props) => {
  const { t, i18n } = useTranslation("common")

  return (
    <section className="main-section home-customer">
      <div className="container-houzez">
        <h2 className="title-center houzez-title">{t("partners")}</h2>
        <div className="row list-partner">
          <RenderPartner />
          <RenderPartner />
          <RenderPartner />
          <RenderPartner />
          <RenderPartner />
          <RenderPartner />
          <RenderPartner />
          <RenderPartner />
        </div>
      </div>
    </section>
  )
}

export default Partners
