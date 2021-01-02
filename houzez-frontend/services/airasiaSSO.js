import { airasiaConfiguration } from '@constant'

export const ssoInit = (successCallback, failureFunction, options = {}) => {
    if (typeof aaWidget !== 'undefined') {
      // console.log('aaWidget initialize')
      const ssoWidget = document.getElementById("airasia_widget")
      if (ssoWidget) ssoWidget.innerHTML = ""
      const config = { ...airasiaConfiguration, ...options }
      aaWidget.initialize({
        elementRoot: config.elementRoot,
        hideSignupTab: config.hideSignupTab,
        successCallback: successCallback,
        failureCallback: failureFunction,
        orientation: config.orientation,
      })
    }
}
