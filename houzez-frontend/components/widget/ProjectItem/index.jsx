import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import Router from "next/router"
import Link from "next/link"

import { ReactComponent as Location } from "@assets/images/icons/place.svg"

import "./index.scss"

const ProjectItem = (props) => {
  const { t, i18n } = useTranslation("common")
  const {
    project
  } = props
  
  return (
    <div className="project-item">
      <div className="image">
        <a href="/vinhomes-central-park">
          <img
            src={project.image}
            alt={project.name}
            loading="lazy"
          />
        </a>
      </div>
      <div className="caption">
        <div className="title">
          <a href="/vinhomes-central-park">{project.name}</a>
        </div>
        <div className="address">
          <Location />
          <address>{project.Location}</address>
        </div>
      </div>
    </div>
  )
}

export default ProjectItem
