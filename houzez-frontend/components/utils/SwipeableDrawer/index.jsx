import React, { useState, useEffect } from "react"
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { ReactComponent as BackIcon } from '@assets/images/icons/arrow_back.svg'
import Link from 'next/link'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import './index.scss'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  }
})

const CustomSwipeableDrawer = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false)
  }, [props.forceClose])

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return
    setOpen(open)
  };

  const {
    autoClose,
    swipeClassName,
    position,
    children,
    className,
    withHeader,
    titleHeader,
    options
  } = props
  return (
    <div className={className ? className : ''}>
      <div onClick={toggleDrawer(true)}>
        {children}
      </div>
      <SwipeableDrawer
        className={`CustomSwipeableDrawer ${swipeClassName ? swipeClassName : ''}`}
        anchor={position || 'left'}
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <div
          className={clsx(classes.list, {
            [classes.fullList]: position === 'top' || position === 'bottom'
          })}
          role="presentation"
          onClick={autoClose ? toggleDrawer(false) : () => { }}
          onKeyDown={autoClose ? toggleDrawer(false) : () => { }}
        >
          {withHeader && (
            <div className="Header Header-mobile flex">
              <BackIcon className="mt-icon" onClick={() => toggleDrawer(false)} />
              {titleHeader ? (
                <div className="ml-5 header-title">
                  {titleHeader}
                </div>
              ) : (
                  <span className="app-title w-full text-center">
                    <Link href='/'><a>Health</a></Link>
                  </span>
                )}
            </div>
          )}
          {options}
        </div>
      </SwipeableDrawer>
    </div>
  );
}

export default CustomSwipeableDrawer
