import React, { useRef } from "react"
// import Layout from "../components/layout"
// import SEO from "../components/seo"
// import Cursor from "../components/Cursor"
import CustomCursor from "../CustomCursor"
import CursorManager from "../CustomCursor/CursorManager"
import Gallery from "../components/gallery"
import "../styles/home.css"

const IndexPage = () => {
  const ref = useRef(null)

  if (typeof window === "undefined" || !window.document) {
    return null
  }
  return (
    <>
      <CursorManager>
        <CustomCursor />
        <div className="home" ref={ref}>
          <Gallery />
        </div>
      </CursorManager>
    </>
  )
}

export default IndexPage
