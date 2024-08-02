import { sanityClient } from 'sanity:client'
import React, { useEffect, useState } from 'react'

import imageUrlBuilder from '@sanity/image-url'
const page = await sanityClient
  .fetch(`*[_type == "page"]`)
  .catch((err) => new Error(err))

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}
const CollectionReactComp = () => {
  const [shuffledPage, setShuffledPage] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  
  useEffect(() => {
    const shuffledGallery = page.map((data) => ({
      ...data,
      gallery: data.gallery ? shuffleArray([...data.gallery]) : [],
    }))

    setShuffledPage(shuffledGallery)
  }, [page])

  const builder = imageUrlBuilder(sanityClient)

  function urlFor(source) {
    if (source === undefined) {
      return null
    } else return builder.image(source)
  }

  const openImage = (imageData) => {
    setSelectedImage(imageData)
  }

  const closeImage = () => {
    setSelectedImage(null)
  }

  // function filter() {
  //   const canvas = document.getElementsByTagName('canvas')[0]

  //   canvas.className = 'filter grayscale blur-sm contrast-200'
  // }

  // filter()

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {shuffledPage.map((data, pageIndex) => (
          <div key={pageIndex}>
            {data.gallery ? (
              data.gallery.map((imageData, imageIndex) => (
                <div key={imageIndex} className="relative overflow-hidden">
                  <img
                    className="w-full h-auto transition ease-in delay-0 duration-50 cursor-pointer opacity-75 hover:opacity-100"
                    src={urlFor(imageData)}
                    alt={`Gallery Image ${imageIndex}`}
                    onClick={() => openImage(imageData)}
                  />
                </div>
              ))
            ) : (
              <div className="relative overflow-hidden">
                <img src="/bird.JPG" alt="Default Image" />
              </div>
            )}
          </div>
        ))}

        {selectedImage && (
          <div
            className="fixed top-[40px] left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-75"
            onClick={closeImage}
          >
            <img
              src={urlFor(selectedImage)}
              alt="Selected Image"
              className="object-contain max-h-full max-w-full"
            />
          </div>
        )}
      </div>
    </>
  )
}

export default CollectionReactComp
