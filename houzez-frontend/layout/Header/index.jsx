import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import Router from "next/router"
import Link from "next/link"

import Hidden from "@material-ui/core/Hidden"

import DropdownMenu from "@components/widget/DropdownMenu"
import Language from "@components/DropdownInfo/Language"
import "./index.scss"

import { ReactComponent as PersonIcon } from "@assets/images/icons/person.svg"
import { ReactComponent as SearchIcon } from "@assets/images/icons/search.svg"
import { ReactComponent as LanguageIcon } from "@assets/images/icons/language_2.svg"
import { ReactComponent as CallIcon } from "@assets/images/icons/call.svg"

const Header = (props) => {
  const { t, i18n } = useTranslation("common")
  const userCurrency = useSelector((state) => state.user.userCurrency)
  const userLanguage = useSelector((state) => state.user.userLanguage)

  const {
    headerTransparent,
    withoutDesktopHeader,
    withoutMobileHeader,
    customMobileHeader,
  } = props

  const exeScrollPage = () => {
    const scrollDistance = window.scrollY
    const header = document.getElementsByClassName("header")
    if (
      scrollDistance > 0 &&
      header[0].classList.value.indexOf("active") === -1
    ) {
      header[0].classList.add("active")
    } else if (scrollDistance === 0) {
      header[0].classList.remove("active")
    }
  }

  useEffect(() => {
    window.removeEventListener("scroll", exeScrollPage, true)

    window.addEventListener("scroll", exeScrollPage, true)

    return () => {
      window.removeEventListener("scroll", exeScrollPage, true)
    }
  }, [])

  return (
    <header className={`header ${headerTransparent ? "transparent" : ""}`}>
      {/* Mobile Header */}
      <Hidden mdUp>
        {!withoutMobileHeader && (
          <div className="lg:hidden">
            {customMobileHeader ? (
              customMobileHeader
            ) : (
              <div className="header-mobile custom-header">
                <div className="logo">
                  <Link href="/">
                    <img src="/images/houzez.png" alt="houzez logo" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </Hidden>
      {/* . Mobile Header */}

      {/* Desktop Header */}
      <Hidden smDown>
        <div>
          <div className="header-wrapper">
            <div className="left-wrap">
              <div className="logo">
                <Link className="logo-home" href="/">
                  <a>
                    <img src="/images/houzez.png" alt="houzez logo" />
                  </a>
                </Link>
              </div>
            </div>

            <div className="right-wrap">
              <div className="main-menu">
                <ul className="menu">
                  <li>
                    <Link href="/for-rent">{t("header.rent")}</Link>
                  </li>
                  <li>
                    <Link href="/for-sale">{t("header.sale")}</Link>
                  </li>
                  <li>
                    <Link href="/projects">{t("header.project")}</Link>
                  </li>
                  <li>
                    <Link href="/property">{t("header.send")}</Link>
                  </li>
                </ul>
              </div>

              <div className="main-language">
                <DropdownMenu
                  className="select-language"
                  options={<Language desktop={true} language={userLanguage} />}
                >
                  <span id="language">{userLanguage.value}</span>
                </DropdownMenu>
              </div>

              <div className="main-phone">
                <a href="tel:19003100">
                  <CallIcon />
                  <span>1900 3100</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Hidden>
      {/* Desktop Header */}
    </header>
  )
}

export default Header
