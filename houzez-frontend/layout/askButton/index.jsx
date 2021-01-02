import React, { useState, useEffect } from "react"

import { ReactComponent as ContactSupportIcon } from '@assets/images/icons/contact_support.svg'
import Link from 'next/link'

const handleScrollDown = () => {
    const MTButton = document.getElementsByClassName('mt-button-bottom')
    const mobileAsk = document.getElementsByClassName('mobile-ask')
    if (MTButton.length && mobileAsk.length) {
        if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
            mobileAsk[0].style.bottom = "96px"
        } else {
            mobileAsk[0].removeAttribute("style")
        }
        return
    }
    if (mobileAsk.length) mobileAsk[0].removeAttribute("style")
    window.removeEventListener('scroll', handleScrollDown)
}

const windowListenerScroll = () => {
    window.addEventListener('scroll', handleScrollDown)
}

const AskButton = props => {
    const { className } = props
    useEffect(() => {
        windowListenerScroll()
    })
    return (
        <div className={`${className ? className : ''} invoke_ask_button cursor-pointer`}>
            <Link href="/enquiry">
                <a><ContactSupportIcon /></a>
            </Link>
        </div>
    )
}

export default AskButton