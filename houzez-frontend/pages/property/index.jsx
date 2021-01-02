import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"

import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormControl from '@material-ui/core/FormControl';

import SearchTop from "@components/SearchTop"
import ButtonOutline from "@components/utils/ButtonOutline"

import "./index.scss"

const Property = () => {
  const { t, i18n } = useTranslation("common")
  const dispatch = useDispatch()

  return (
    <div>
      <SearchTop />
      <div className="main-section property">
        <div className="container-houzez">
          <h1 className="houzez-title">{t("property.title")}</h1>
          <div className="box-form">
            <div className="row no-gutters">
              <div className="col-lg-6">
                <div className="main-tabslet">
                  <ul className="tabslet-tab">
                    <li className=" active">
                      <a>{t("property.customer")}</a>
                    </li>
                  </ul>

                  <div className="tabslet-content" id="tab-1">
                    <div className="main-form">
                      <h2 className="title-form">
                        {t("property.personal_info")}
                      </h2>
                      <div className="form-wrap">
                        <div className="form-group">
                          <div className="input-group">
                            <label className="sr-only">
                              {t("property.name")}
                            </label>
                            <div className="input-group-prepend">
                              <div className="input-group-text"></div>
                            </div>
                            <input
                              className="form-control"
                              type="text"
                              placeholder={t("property.name")}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="input-group">
                            <label className="sr-only">
                              {t("property.email")}
                            </label>
                            <div className="input-group-prepend">
                              <div className="input-group-text"></div>
                            </div>
                            <input
                              className="form-control"
                              type="text"
                              placeholder={t("property.email")}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="input-group">
                            <label className="sr-only">
                              {t("property.phone")}
                            </label>
                            <div className="input-group-prepend">
                              <div className="input-group-text"></div>
                            </div>
                            <input
                              className="form-control"
                              type="text"
                              placeholder={t("property.phone")}
                            />
                          </div>
                        </div>
                      </div>
                      <h2 className="title-form">{t("property.register")}</h2>
                      <div className="form-wrap form-wrap-radio">
                        <div className="form-group form-text-p">
                          <p>{t("property.type_business")}</p>
                        </div>
                        <RadioGroup
                          row
                          aria-label="position"
                          name="position"
                          defaultValue="top"
                        >
                          <FormControlLabel
                            value="end"
                            control={<Radio color="primary" />}
                            label={t("property.sale")}
                          />
                          <FormControlLabel
                            value="start"
                            control={<Radio color="primary" />}
                            label={t("property.rent")}
                          />
                        </RadioGroup>
                      </div>
                      <div className="form-wrap form-wrap-radio">
                        <div className="form-group form-text-p">
                          <p>{t("property.type")}</p>
                        </div>
                        <RadioGroup
                          row
                          aria-label="position"
                          name="position"
                          defaultValue="top"
                        >
                          <FormControlLabel
                            value="end"
                            control={<Radio color="primary" />}
                            label={t("property.house")}
                          />
                          <FormControlLabel
                            value="start"
                            control={<Radio color="primary" />}
                            label={t("property.apartment")}
                          />
                        </RadioGroup>
                      </div>
                      <div className="form-wrap form-wrap-file">
                        <div className="form-group form-text-p">
                          <p>{t("property.images")}</p>
                        </div>
                        <div className="form-group">
                          <div className="input-group">
                            <div className="custom-file">
                              <input
                                type="file"
                                className="form-control-file custom-file-input"
                                multiple=""
                                _bl_5d5b32dd-2b2e-40e4-8552-eab4554bfbd0=""
                              />
                              <label
                                className="custom-file-label"
                                htmlFor="validatedCustomFile"
                              >
                                <em className="ri-folder-3-line"></em>
                                {t("property.upload")}
                              </label>
                            </div>
                          </div>
                          <div>
                            <p>{t("property.assit")}</p>
                          </div>
                        </div>
                      </div>
                      <div className="form-wrap form-wrap-image">
                        <div className="list-image"></div>
                      </div>
                      <div className="form-wrap form-wrap-textarea">
                        <div className="form-group form-textarea">
                          <textarea
                            className="form-control"
                            placeholder={t("property.content")}
                          ></textarea>
                        </div>
                      </div>
                      <div className="form-wrap form-wrap-submit">
                        <div className="form-group form-submit">
                          <ButtonOutline onClick={()=> {}}>{t("property.send")}</ButtonOutline>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="main-image">
                  <img src="/images/kygui.png" alt="kygui" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Property.pageTitle = "Property"
export default Property
