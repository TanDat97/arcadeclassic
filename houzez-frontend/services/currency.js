import { numberFormat } from '@utils'

export const servicesGetCurrencyTransfer = (uuid, value, format = true) => {
    try {
        return (dispatch, getState) => {
            const { home: homeState, user: userState } = getState()
            const currencyData = homeState.currencyData

            // get product currency info from currency uuid of product
            const productCurrency = getCurrencyById(uuid, currencyData)

            // get user currency
            const userCurrency = userState.userCurrency

            // check product currency and user currency
            if (productCurrency.code === userCurrency.code) {
              return {
                code: productCurrency.code,
                value: numberFormat(value, 2),
              }
            }

            // Get Currency Transfer
            const currencyTransfer = userState.currencyTransfer || {}
            if (currencyTransfer[productCurrency.code]) {
                const priceValue = parseFloat(value) / currencyTransfer[productCurrency.code]
                return {
                  code: userCurrency.code,
                    value: format ? numberFormat(priceValue, 2) : priceValue
                }
            }

            return { code: productCurrency.code, value }
        }
    } catch (error) {
        console.log('servicesGetCurrencyTransfer ERROR', error)
        return { code: "", value }
    }
}

const getCurrencyById = (id, data) => {
    for (let i = 0; i < data.length; i++) {
        const c = data[i]
        if (c.uuid === id) return c
    }
    return false
}
