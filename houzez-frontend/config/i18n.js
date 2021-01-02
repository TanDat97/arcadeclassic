import React, { useEffect } from 'react'
import i18n from 'i18next'
import commonEn from '@assets/translations/en/common.json'
import commonVi from '@assets/translations/vi/common.json'
import validatorEn from '@assets/translations/en/validator.json'
import validatorVi from '@assets/translations/vi/validator.json'
import { defaultLanguage } from '@constant'
import { setLanguage, getLanguage } from '@utils'

const language = getLanguage() === '' ? defaultLanguage : getLanguage()

i18n.init({
  interpolation: {
    escapeValue: false // react already safes from xss
  },
  ns: ['common', 'validator'],
  defaultNS: 'common',
  lng: language.key,
  resources: {
    en: {
      common: commonEn,
      validator: validatorEn,
    },
    vi: {
      common: commonVi,
      validator: validatorVi,
    },
  },
})

export { i18n as i18nInit }
