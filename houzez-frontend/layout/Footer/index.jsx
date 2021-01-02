import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import Link from "next/link"

import "./index.scss"

const Footer = (props) => {
  const { t, i18n } = useTranslation()

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container-houzez">
          <div className="row">
            <div className="col-12 col-md-6 mt-2 mb-2">
              <div className="logo">
                <Link href="/">
                  <img
                    src="/images/houzez.png"
                    alt="houzez logo"
                    loading="lazy"
                    className="lazyload loading"
                  />
                </Link>
              </div>
              <div className="infor">
                <ul className="left">
                  <li>
                    <address>37 Ký Con, Quận 1, TP. HCM</address>
                  </li>
                  <li>
                    <a href="tel: +84 090 666 3265 ">
                      {t("footer.phone")}: +84 090 666 3265
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-md-6 mt-2 mb-2">
              <p className="title-footer">{t("footer.contact")}</p>
              <ul className="list-sp-footer">
                <li>
                  <p>{t("footer.email")}</p>
                  <Link href="mailto: a@a.com">
                    a@a.com
                  </Link>
                </li>
                <li>
                  <p>Hotline 24/7:</p>
                  <Link href="tel: 1900 3100">1900 3100</Link>
                </li>
                <li></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
