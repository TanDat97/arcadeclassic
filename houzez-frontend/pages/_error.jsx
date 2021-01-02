import { GTMPageName } from "@constant"
import TagManager from "@services/TagManager"
import Router from "next/router"
import React, { useEffect } from "react"

function Error(props) {
  const { statusCode = "" } = props

  if (props) {
    console.log(">>>> ~ Error ~ props", props)
  }

  const { route = "" } = Router.router || {}

  useEffect(() => {
    TagManager.pushError(GTMPageName(route), statusCode)
  }, [])

  return (
    <div className="h-screen flex items-center justify-center">
      <div>
        <h1
          className="inline-block align-top mr-5 py-2 pr-6 fs-24-24 font-medium"
          style={{ borderRight: "1px solid rgba(0, 0, 0,.3)" }}
        >
          {statusCode || "Error"}
        </h1>
        <div className="inline-block py-2">
          <h2 className="m-auto fs-14-22">
            {statusCode === 404
              ? "This page could not be found"
              : "An error occurred on client"}
          </h2>
        </div>
      </div>
    </div>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
