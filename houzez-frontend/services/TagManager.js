import TagManager from "react-gtm-module"
import { GTMId } from "@constant"

const confirmationPageKeyMapping = {
  confirmation: "Booking Receipt Download",
  view_booking: "View Booking",
  view_more: "View More SNAP",
  book_now: "Book SNAP Now",
  ask: "Ask a Question",
  go_to_homepage: "Go to Homepage",
}

const initialize = () => {
  if (!GTMId) return false
  const tagManagerArgs = {
    gtmId: GTMId,
  }
  TagManager.initialize(tagManagerArgs)
}

const pushLayer = (event) => {
  if (!GTMId) return false
  TagManager.dataLayer({
    dataLayer: event,
  })
}

const pushError = (page, status) => {
  pushLayer({
    event: "trackEventNoEcommerce",
    "eventDetails.category": "Error Tracking - " + page,
    "eventDetails.action": "click",
    "eventDetails.label": status || "Client error",
  })
}

const trackingSearchTreatments = (category, label) => {
  pushLayer({
    event: "trackEventNoEcommerce",
    "eventDetails.category": `Package Search - ${category}`,
    "eventDetails.action": "click",
    "eventDetails.label": label,
  })
}

const trackingConfirmationPage = (bookingNumber, eventKey) => {
  pushLayer({
    event: "trackEventNoEcommerce",
    "eventDetails.category": "Booking Confirmation Page Interaction",
    "eventDetails.action": "click",
    "eventDetails.label":
      bookingNumber + " | " + confirmationPageKeyMapping[eventKey],
  })
}

const trackingInfoPatientDetailPage = ({ gender, packageId, packageName }) => {
  pushLayer({
    event: "trackEventNoEcommerce",
    "eventDetails.category": "Patient Detail Page Interaction",
    "eventDetails.action": "click",
    "eventDetails.label": `${packageId} | ${packageName} | Patient Details | ${gender}`,
  })
}

const trackingContactPatientDetailPage = ({ packageId, packageName }) => {
  pushLayer({
    event: "trackEventNoEcommerce",
    "eventDetails.category": "Patient Detail Page Interaction",
    "eventDetails.action": "click",
    "eventDetails.label": `${packageId} | ${packageName} | Contact Details`,
  })
}

const trackingProductImpression = (data) => {
  pushLayer({
    event: "productImpressions",
    ecommerce: data,
  })
}

const trackingProductClick = (data) => {
  pushLayer({
    event: "productClick",
    ecommerce: {
      currencyCode: data.currencyCode,
      click: {
        actionField: {
          list: `${data.categoryName} Packages - Recommendation `,
        },
        products: data.product,
      },
    },
  })
}

const trackingBookingClick = () => {
  pushLayer({
    event: "trackEventNoEcommerce",
    "eventDetails.category": "Package Detail Page Interaction",
    "eventDetails.action": "click",
    "eventDetails.label": "Book Appointment",
  })
}

const trackingProductFilter = (name, value) => {
  pushLayer({
    event: "trackEventNoEcommerce",
    "eventDetails.category": name,
    "eventDetails.action": "filter applied",
    "eventDetails.label": value,
  })
}

const trackingProductDetail = (data) => {
  pushLayer({
    event: "productDetails",
    ecommerce: {
      currencyCode: data.currencyCode,
      detail: {
        products: [
          {
            id: data.id,
            name: data.name,
            price: data.price,
            brand: data.brand,
            category: data.category,
            variant: data.variant,
            position: data.position,
            dimension11: data.dimension11,
            dimension12: data.dimension12,
            dimension13: data.dimension13,
          },
        ],
      },
    },
  })
}

const trackingScheduleAppointment = ({ date, morningOrEvening, time }) => {
  pushLayer({
    event: "trackEventNoEcommerce",
    "eventDetails.category": "Scheduled Appointment Page Interaction",
    "eventDetails.action": "Appointment scheduled",
    "eventDetails.label": `${date} | ${morningOrEvening} ${time}`,
  })
}

export default {
  initialize,
  pushLayer,
  pushError,
  trackingSearchTreatments,
  trackingConfirmationPage,
  trackingContactPatientDetailPage,
  trackingInfoPatientDetailPage,
  trackingProductImpression,
  trackingProductClick,
  trackingBookingClick,
  trackingProductFilter,
  trackingProductDetail,
  trackingScheduleAppointment,
}
