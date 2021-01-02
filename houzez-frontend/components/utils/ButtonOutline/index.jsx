import React, { useState, useEffect } from "react"
import Button from "@material-ui/core/Button"
import { withStyles } from "@material-ui/core/styles"

// We can inject some CSS into the DOM.
const ButtonCta = withStyles({
  root: {
    background: "#fff",
    borderRadius: 3,
    border: "1px solid #0078B2",
    color: "#0078B2",
    height: 48,
    padding: "0 30px",
    "&:hover": {
      background: "#fff",
      color: "#0078B2",
    },
  },

  label: {
    textTransform: "capitalize",
    fontFamily: "Roboto",
    fontSize: "16px",
    lineHeight: "24px",
  },
})(Button)

const ButtonCtaOutline = (props) => {
  const [load, setLoad] = useState(false)

  useEffect(() => {
    setLoad(true)
  }, [])

  return load && <ButtonCta {...props} />
}

export default ButtonCtaOutline
