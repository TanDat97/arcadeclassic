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
    height: 36,
    padding: "0 0",
    "&:hover": {
      background: "#0078B2",
      color: "white",
    },
  },
})(Button)

const ButtonCtaSolid = props => {
  const { className = '' } = props
  const [load, setLoad] = useState(false)
  useEffect(() => {
    setLoad(true)
  }, [])
  return load && <ButtonCta {...props} className={`${className}`} />
}

export default ButtonCtaSolid
