import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import Link from "next/link"

import "./index.scss"

const ContactInfo = (props) => {
  const { t, i18n } = useTranslation("common")

  return (
    <section className="main-section home-support">
      <div className="container-houzez">
        <div className="main-support">
          <div className="suppor-item">
            <div className="icon">
              <em className="ri-home-smile-line"></em>
            </div>
            <div className="title">
              <h3>{t("contact.sale_and_rent")}</h3>
            </div>
            <div className="des">
              <p>{t("contact.sale_and_rent_p")}</p>
            </div>
            <div className="button">
              <Link href="/property">{t("contact.post")}</Link>
            </div>
          </div>

          <div className="suppor-item">
            <div className="icon">
              <em className="ri-mail-send-line"></em>
            </div>
            <div className="title">
              <h3>{t("contact.assits")}</h3>
            </div>
            <div className="des">
              <p>{t("contact.assits_p")}</p>
            </div>
            <div className="button">
              <Link href="/contact">{t("contact.contact")}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactInfo
