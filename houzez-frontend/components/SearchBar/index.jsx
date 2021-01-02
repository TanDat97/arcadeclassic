import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import Router from "next/router"

import Hidden from "@material-ui/core/Hidden"

import DropdownMenu from "@components/widget/DropdownMenu"
import SearchData from "@components/DropdownInfo/SearchData"
import ButtonSolid from "@components/utils/ButtonSolid"
import "./index.scss"

import { getInitDataFilter, buildQuery } from "@utils"

const SearchBar = (props) => {
  const { t, i18n } = useTranslation("common")
  const [typeBusiness, setTypeBusiness] = useState("for-all")
  const [district, setDistrict] = useState({})
  const [project, setProject] = useState({})
  const [type, setType] = useState({})
  const [bedRoom, setBedRoom] = useState({})

  const dataFilter = useSelector((state) => state.home.dataFilter)
  const districts = getInitDataFilter(dataFilter.origins)
  const projects = getInitDataFilter(dataFilter.projects)
  const types = getInitDataFilter(dataFilter.types)
  const rooms = getInitDataFilter(dataFilter.types)

  const RenderSelect = ({ state, data, handleChange, textTranslate }) => {
    return (
      <div className="form-group">
        <DropdownMenu
          className="search-data handle-overflow"
          options={
            <SearchData
              desktop={true}
              data={data}
              handleChange={handleChange}
              textTranslate={textTranslate}
            />
          }
        >
          <span>
            {state.uuid
              ? state.translate && state.translate[i18n.language].name
                ? state.translate[i18n.language].name
                : state.name
              : textTranslate}
          </span>
        </DropdownMenu>
      </div>
    )
  }

  const onSearch = () => {
    let query = buildQuery({
      type_business: typeBusiness.slice(4),
      district_uuid: district.uuid,
      project_uuid: project.uuid,
      type_uuid: type.uuid,
      bedroom: bedRoom.name,
    })
    Router.push(`/${typeBusiness}?${query}`)
  }

  return (
    <div className="main-search">
      {/* search mobile */}
      <Hidden mdUp>
        <div className="search-mobile">mobile</div>
      </Hidden>

      {/* search desktop */}
      <Hidden smDown>
        <div className="search-desktop">
          <ul className="list-search">
            <li className={typeBusiness === "for-all" ? "active" : ""}>
              <span onClick={() => setTypeBusiness("for-all")}>
                {t("search.all")}
              </span>
            </li>
            <li className={typeBusiness === "for-rent" ? "active" : ""}>
              <span onClick={() => setTypeBusiness("for-rent")}>
                {t("search.rent")}
              </span>
            </li>
            <li className={typeBusiness === "for-sale" ? "active" : ""}>
              <span onClick={() => setTypeBusiness("for-sale")}>
                {t("search.sale")}
              </span>
            </li>
          </ul>
          <div className="search-item">
            <div className="search-box">
              <input
                type="text"
                placeholder={t("search.placeholder_desktop")}
              />
              <ButtonSolid onClick={onSearch}>{t("search.search")}</ButtonSolid>
            </div>
          </div>
          <div className="search-mid">
            <div className="main-select">
              <RenderSelect
                state={district}
                data={districts}
                handleChange={(e) => setDistrict(e)}
                textTranslate={t("search.select_district")}
              />
              <RenderSelect
                state={project}
                data={projects}
                handleChange={(e) => setProject(e)}
                textTranslate={t("search.select_project")}
              />
              <RenderSelect
                state={type}
                data={types}
                handleChange={(e) => setType(e)}
                textTranslate={t("search.select_type")}
              />
              <RenderSelect
                state={bedRoom}
                data={rooms}
                handleChange={(e) => setBedRoom(e)}
                textTranslate={t("search.select_room")}
              />
            </div>
          </div>
        </div>
      </Hidden>
    </div>
  )
}

export default SearchBar
