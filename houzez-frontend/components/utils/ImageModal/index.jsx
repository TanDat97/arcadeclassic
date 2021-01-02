import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"

import "./index.scss"

const ImageModal = (props) => {
  const { listImage, index } = props

  return (
    <div className="image-modal">
      <img src={listImage[index]} alt="image modal" />
    </div>
  )
}

export default ImageModal