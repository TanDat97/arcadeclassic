import React from 'react'
import { ReactComponent as ArrowDown } from '@assets/images/icons/arrow_drop_down.svg'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'

import './index.scss'

const iconStyle = {
    marginLeft: '4px',
    width: '24px',
    height: '24px',
    display: 'inline-block'
}

const DropdownMenu = (props) => {
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event) => {
    const checkSelect = document.getElementsByClassName("customSelect")
    if (event.target.contains(checkSelect[0])) return
    if (anchorRef.current && anchorRef.current.contains(event.target)) return
    setOpen(false)
  }

  const showIcon = typeof props.showIcon === "undefined" ? true : props.showIcon
  const active = typeof props.active === "undefined" ? true : props.act

  return (
    <div className={`DropdownMenuContainer ${props.className ? props.className : ""}`}>
      <div
        variant="contained"
        color="primary"
        ref={anchorRef}
        aria-label="split button"
        onClick={handleToggle}
        className={open && active ? "active" : ""}
      >
        {props.children}
        {showIcon && (
          <ArrowDown className={open ? "active" : ""} style={iconStyle} />
        )}
      </div>
      <Popper
        className={`DropdownMenu ${props.className ? props.className : ""}`}
        style={{ zIndex: "999" }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        // disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <div>{React.cloneElement(props.options, { handleToggle })}</div>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  )
}

export default DropdownMenu
