import React, { useState, useEffect, useRef, useContext } from "react"
import { CursorContext } from "../CustomCursor/CursorManager"
import cn from "classnames"
import "./gallery.css"

const images = [
  "https://2ho4f5klzmi1xz49c18txd0p-wpengine.netdna-ssl.com/wp-content/uploads/ART-at-Berlin-Courtesy-of-Galerie-feinart-Berlin-Thomas-Kleemann-Reihe-Optimisten-des-Willens-I.jpg",
  "https://2ho4f5klzmi1xz49c18txd0p-wpengine.netdna-ssl.com/wp-content/uploads/ART-at-Berlin-Courtesy-of-BBA-Gallery-Renata-Kudlacek-Spectacular-Specimen-min.jpg",
  "https://2ho4f5klzmi1xz49c18txd0p-wpengine.netdna-ssl.com/wp-content/uploads/ART-at-Berlin-Courtesy-of-68-projects-You-Jin-2021.jpg",
]

function GalleryItem({ src }) {
  const ref = useRef(null)
  const mouseContext = useContext(CursorContext)

  const [clipMaskRadius, setClipMaskRadius] = useState(0)
  const [clipMask, setClipMask] = useState({ x: 0, y: 0 })
  const [reveal, setReveal] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setReveal(true)
    }, 100)
  }, [])

  useEffect(() => {
    function getCoordinates(mouse) {
      const imagePosition = {
        posX: ref.current.offsetLeft,
        posY: ref.current.offsetTop,
      }

      const posX = mouse.pageX - imagePosition.posX
      const posY = mouse.pageY - imagePosition.posY

      setClipMask({
        x: (posX / ref.current.clientWidth) * 100,
        y: (posY / ref.current.clientHeight) * 100,
      })
    }

    ref.current.addEventListener("mousemove", mouse => {
      window.requestAnimationFrame(() => {
        getCoordinates(mouse)
      })
    })
  }, [])

  return (
    <div
      className={cn("gallery-item-wrapper", { "is-reveal": reveal })}
      ref={ref}
      onMouseEnter={() => {
        setClipMaskRadius(25)
        mouseContext.setSize("hide")
      }}
      onMouseLeave={() => {
        setClipMaskRadius(0)
        mouseContext.setSize("small")
      }}
    >
      <div className="gallery-item">
        <div
          className="gallery-item-image sepia"
          style={{ backgroundImage: `url(${src})` }}
        ></div>

        <div
          className="gallery-item-image masked"
          style={{
            backgroundImage: `url(${src})`,
            clipPath: `circle(${clipMaskRadius}% at ${clipMask.x}% ${clipMask.y}%)`,
          }}
        ></div>
      </div>
    </div>
  )
}

function Gallery() {
  return (
    <div className="gallery">
      {images.map(src => (
        <GalleryItem key={src} src={src} />
      ))}
    </div>
  )
}

export default Gallery
