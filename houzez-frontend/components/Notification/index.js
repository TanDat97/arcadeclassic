import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { notificationCreate } from "@actions/notification"
import { ReactComponent as CheckCircle } from '@assets/images/icons/check_circle_big.svg'
import './index.scss'

/**
 * AlertDialog
 * {boolean} @open get from store
 * {string} @status get from store
 * {string} @message get from store
 */
export default function Notification() {
    const open = useSelector((state) => state.notification.open)
    const message = useSelector((state) => state.notification.message)
    const dispatch = useDispatch()
    useEffect(() => {
        if (open) {
          setTimeout(() => {
            dispatch(notificationCreate({}))
          }, 2000)
        }
    });

    // icon depend on status | default is success
    const icon = <CheckCircle className="mt-icon" />;
    return open && (
        <div className="notification">
            <div className="notification-info">
                <div className="notification-status">
                    {icon}
                </div>
                <div className="notification-message">
                    {message}
                </div>
            </div>
        </div>
    )
}
