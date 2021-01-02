import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useTranslation } from 'react-i18next'

import ButtonCtaOutline from '@components/utils/ButtonCtaOutline'
import ButtonCtaSolid from '@components/utils/ButtonCtaSolid'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { dialogCreate } from "@actions/dialog"

/**
 * AlertDialog
 * {boolean} @open get from store
 * {string} @title get from store
 * {string} @content get from store
 * {function} @callBack get from store
 */
export default function AlertDialog() {
    const { t, i18n } = useTranslation('common')

    const open = useSelector((state) => state.dialog.open)
    const title = useSelector((state) => state.dialog.title)
    const content = useSelector((state) => state.dialog.content)
    const callBack = useSelector((state) => state.dialog.callBack)

    const dispatch = useDispatch()
    const handleClose = () => {
        dispatch(dialogCreate({}))
    }

    const handleSubmit = () => {
        dispatch(dialogCreate({}))
        callBack()
    }

    return (
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle className="fs-24-24 font-medium">{t(title)}</DialogTitle>
            <DialogContent>
                <DialogContentText className="fs-16-20 color-gray">
                    {t(content)}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <ButtonCtaOutline onClick={handleClose}>
                    {t('no')}
                </ButtonCtaOutline>
                <ButtonCtaSolid onClick={handleSubmit}>
                    {t('yes')}
                </ButtonCtaSolid>
            </DialogActions>
        </Dialog>
    );
}
