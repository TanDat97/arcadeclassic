const env = process.env.NEXT_PUBLIC_BASE_ENV

const desktopScreen = 840

const hostV1 = process.env.NEXT_PUBLIC_LOCAL_API + "/api/v1"

const clientID = "0d0f2bb8-df7c-4d6f-afb0-438065ced75d"
const platform = "web"
const deviceID = "0d0f2bb8-df7c-4d6f-afb0-438065ced75d"
const deviceType = "phone"
const lang = "vi"
const channel = 1

const successCode = 200
const headers = {
  "X-PLATFORM": platform,
  "X-DEVICE-ID": deviceID,
  "X-DEVICE-TYPE": deviceType,
  "X-CHANNEL": channel,
  "X-LANG": lang,
  "CLIENT_ID": clientID,
}

const cartCacheLiveTime = 6 //hours
const defaultCurrency = {
  code: "VND",
  name: "Vietnam Dong",
  symbol: "VND",
}
const defaultDialingCode = "+84"

const sysLanguages = [
  { key: "en", value: "English", webKey: "en/gb", urlKey: "en-gb" },
  { key: "vi", value: "Tiếng Việt", webKey: "vi/vi", urlKey: "vi-vi" },
]
const defaultLanguage = {
  key: "vi",
  value: "Tiếng Việt",
  webKey: "vi/vi",
  urlKey: "vi-vi",
}
const getSysLanguagesDetails = (value, key) => {
  for (let i = 0; i < sysLanguages.length; i++) {
    const lang = sysLanguages[i]
    if (lang.key === value) return key ? lang[key] : lang
  }
  return false
}

const pageNameMapping = {
  "/_error": "Unknown Page",
  "/": "Home page",
  "/aesthetics": "Aesthetics details",
  "health-screening": "Health screening details",
  "/wellness": "Wellness details",
  "/fertility": "Fertility details",
  "/aesthetics/packages": "Aesthetics packages",
  "health-screening/packages": "Health screening packages",
  "/wellness/packages": "Wellness packages",
  "/fertility/packages": "Fertility packages",
  "/about-us": "About us",
  "/enquiry": "Enquiry",
  "/general-faqs": "General faqs",
  "/booking-confirmation": "Booking confirmation",
  "/healthcare-package": "Healthcare package",
  "/medical-journey": "Medical journey",
  "/medical-partner/[pid]": "Medical partner",
  "/menu": "User menu",
  "/my-account": "My account",
  "/my-booking": "My booking",
  "/order/booking": "Booking",
  "/order/confirmation": "Booking",
  "/our-doctors": "Booking",
  "/panel-advisors": "Panel advisors",
  "/press-release": "Press release",
  "/search": "Search page",
  "/select-appointment": "Select appointment",
  "/services": "Services",
  "/terms": "Terms",
  "/why-malaysia": "Why malaysia",
}

const pageNameLike = (asPath) => {
  if (!asPath) return ""
  const nameMapping = {
    "/aesthetics/conditions": "Aesthetics conditions",
    "health-screening/conditions": "Health screening conditions",
    "/wellness/conditions": "Wellness conditions",
    "/fertility/conditions": "Fertility conditions",
    "/aesthetics/solutions": "Aesthetics solutions",
    "health-screening/solutions": "Health screening solutions",
    "/wellness/solutions": "Wellness solutions",
    "/fertility/solutions": "Fertility solutions",
    "/aesthetics/packages": "Aesthetics Packages details",
    "health-screening/packages": "Health screening Packages details",
    "/wellness/packages": "Wellness Packages details",
    "/fertility/packages": "Fertility Packages details",
  }
  const keys = Object.keys(nameMapping)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (asPath.includes(key)) return nameMapping[key]
  }
  return ""
}

const GTMPageName = (route, asPath) => {
  return (
    pageNameMapping[route] || pageNameMapping[asPath] || pageNameLike(asPath)
  )
}

const GTMGetTraffic = (key) => {
  const traffic = {
    email: "Email",
    Email: "Email",
    "affiliate-PartnerName": "affiliate-PartnerName",
  }
  if (traffic[key]) return traffic[key]
  return "Organic"
}

module.exports = {
  successCode,
  env,
  headTitle: "Houzez - Apartment For Rent In HCMC",
  hostV1,
  desktopScreen,
  successCode,
  headers,
  cartCacheLiveTime,
  defaultLanguage,
  defaultCurrency,
  defaultDialingCode,
  clientID,
  platform,
  pageNameMapping,
  GTMPageName,
  GTMGetTraffic,
  sysLanguages,
  getSysLanguagesDetails,
}
