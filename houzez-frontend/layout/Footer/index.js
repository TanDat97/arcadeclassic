import { useDispatch, useSelector } from "react-redux"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"
import { getCategoryExcludeCovid19 } from "@actions/home"

const renderCategories = (categoriesData) => {
  if (categoriesData.length > 0) {
    return categoriesData?.map((e, i) => (
      <li key={i}>
        <h3 className="Footer--title">{e.name}</h3>
        <ol>
          {e.children.map((c, j) => (
            <Link href="/[slug]" as={`/${e.slug}`} key={j}>
              <li className="Footer--text cursor-pointer">{c.name}</li>
            </Link>
          ))}
        </ol>
      </li>
    ))
  } else return false
}
const Footer = (props) => {
  const { t, i18n } = useTranslation("common")
  const dispatch = useDispatch()

  const [categoriesData, setCategoriesData] = useState()
  const categoriesDataSelector = useSelector(
    (state) => state.home.categoriesDataExcludeCovid19
  )

  useEffect(() => {
    if (!categoriesDataSelector) {
      dispatch(getCategoryExcludeCovid19())
    }
  }, [])

  useEffect(() => {
    if (categoriesDataSelector) {
      setCategoriesData(categoriesDataSelector)
    }
  }, [categoriesDataSelector])

  // if (!categoriesData) return false

  const { withoutDesktopFooter } = props

  return (
    <div className={`Footer ${props.className}`}>
      <div className="mt-content Footer--content">
        {!withoutDesktopFooter && (
          <div className="grid grid-cols-2">
            <ul className="w-full grid grid-cols-2 gap-5">
              {categoriesData && renderCategories(categoriesData)}
            </ul>

            <ul className="flex justify-between">
              <li>
                <h3 className="Footer--title">{t("our_services")}</h3>
                <ol>
                  {/* <li className="Footer--text">
                    <Link href="/services">
                      <a>{t("meet_and_greet_at_airport")}</a>
                    </Link>
                  </li> */}

                  <li className="Footer--text">
                    <Link href="/">
                      <a>{t("companion")}</a>
                    </Link>
                  </li>

                  <li className="Footer--text">
                    <Link href="/airasia-assist">
                      <a>{t("airAsia_assist")}</a>
                    </Link>
                  </li>

                  <li className="Footer--text" style={{ marginTop: "45px" }}>
                    <Link href="/medical-journey">
                      <a>{t("your_medical_journey")}</a>
                    </Link>
                  </li>

                  <li className="Footer--text">
                    <Link href="/healthcare-package">
                      <a>{t("airAsia_healthcare_packages")}</a>
                    </Link>
                  </li>

                  <li className="Footer--text">
                    <Link href="/enquiry">
                      <a>{t("have_a_question_ask_us_now")}</a>
                    </Link>
                  </li>
                </ol>
              </li>
              <li>
                <h3 className="Footer--title">{t("about_airAsia_health")}</h3>
                <ol>
                  <li className="Footer--text">
                    <Link href="/about-us">
                      <a>{t("about_airAsia_health")}</a>
                    </Link>
                  </li>
                  <li className="Footer--text">
                    <Link href="/press-release">
                      <a>{t("press_release")}</a>
                    </Link>
                  </li>
                  <li className="Footer--text">
                    <Link href="/general-faqs">
                      <a>{t("general_FAQ")}</a>
                    </Link>
                  </li>
                  <li className="Footer--text">
                    <Link href="/medical-partner">
                      <a>{t("medical_partners")}</a>
                    </Link>
                  </li>
                  <li className="Footer--text">
                    <Link href="/panel-advisors">
                      <a>{t("panel_advisors")}</a>
                    </Link>
                  </li>
                  <li className="Footer--text">
                    <Link href="/terms-conditions">
                      <a>{t("terms_n_conditions")}</a>
                    </Link>
                  </li>
                </ol>
              </li>
            </ul>
          </div>
        )}

        <p className="Footer--end-text">
          {t("airAsia_intro")}
          <Link href="/terms">
            <span className="color-blue cursor-pointer">
              {" "}
              {t("terms_of_use")}{" "}
            </span>
          </Link>
          and
          <Link href="/privacy-policy">
            <span className="color-blue cursor-pointer">
              {" "}
              {t("privacy_policy")}
            </span>
          </Link>
          <br />
          {t("website_owned_operated")}
        </p>
      </div>
    </div>
  )
}

export default Footer
