import React, { useState, useEffect } from "react"
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

import './index.scss'

// We can inject some CSS into the DOM.
const ButtonCta = withStyles({
  root: {
    background: "#0078B2",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    "&:hover": {
      background: "#0078B2",
      color: "white",
    },
  },
  label: {
    textTransform: "capitalize",
    fontFamily: `"Roboto", sans-serif`,
    fontSize: "16px",
    lineHeight: "24px",
  },
})(Button)

const ButtonCtaSolid = props => {
  const { className = '' } = props
  const [load, setLoad] = useState(false)
  useEffect(() => {
    setLoad(true)
  }, [])
  return load && <ButtonCta {...props} className={`Custom-ButtonCtaSolid ${className}`} />
}

export default ButtonCtaSolid
