import React, { useState, useEffect } from "react"
import Button from "@material-ui/core/Button"
import { withStyles } from "@material-ui/core/styles"

// We can inject some CSS into the DOM.
const ButtonCta = withStyles({
  root: {
    background: "#fff",
    borderRadius: 3,
    border: "1px solid #0077B6",
    color: "#0077B6",
    height: 48,
    padding: "0 30px",
    "&:hover": {
      background: "#fff",
      color: "#0077B6",
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
